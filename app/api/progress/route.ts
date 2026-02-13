import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type LessonsProgress = Record<string, any>;

function normId(id: string) {
  return String(id ?? "")
    .trim()
    .toLowerCase();
}

function parseLevelId(id: string) {
  const m = /^([a-z]\d)-(\d+)$/.exec(normId(id));
  if (!m) return null;
  return { band: m[1], n: Number(m[2]) };
}

function nextLevelId(id: string) {
  const p = parseLevelId(id);
  if (!p) return id;

  if (p.band === "a0" && Number.isFinite(p.n) && p.n >= 30) return "a1-1";
  return `${p.band}-${p.n + 1}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDone(v: any) {
  if (v === true) return true;
  if (v && typeof v === "object" && v.done === true) return true;
  return false;
}

/**
 * Знаходимо "новий" завершений урок:
 * - є done зараз
 * - не було done раніше
 * Якщо їх багато — це підозріло (спроба намалювати прогрес).
 */
function findNewlyDoneLessonId(
  prev: LessonsProgress | null | undefined,
  next: LessonsProgress | null | undefined
): string | null | "MULTI" {
  if (!next || typeof next !== "object") return null;

  const prevObj = prev && typeof prev === "object" ? prev : {};
  const nextObj = next;

  const newly: string[] = [];

  for (const k of Object.keys(nextObj)) {
    if (!isDone(nextObj[k])) continue;
    if (!isDone((prevObj as any)[k])) newly.push(normId(k));
  }

  if (newly.length === 0) return null;
  if (newly.length > 1) return "MULTI";
  return newly[0];
}

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ ok: false, code: "USER_NOT_FOUND" }, { status: 404 });
  }

  const row = await prisma.userProgress.findUnique({ where: { userId: user.id } });

  return NextResponse.json({
    ok: true,
    userId: user.id,
    lessonsProgress: row?.lessonsProgress ?? null,
    updatedAt: row?.updatedAt ?? null,

    // корисно для UI (можеш не використовувати)
    lastUnlockedLevel: row?.lastUnlockedLevel ?? null,
    dailyDate: row?.dailyDate ?? null,
    dailyCount: row?.dailyCount ?? 0,
  });
}

export async function PUT(req: Request) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ ok: false, code: "USER_NOT_FOUND" }, { status: 404 });
  }

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "INVALID_JSON" }, { status: 400 });
  }

  // ✅ супер-важливо: userId має співпасти
  const bodyUserId = typeof body?.userId === "string" ? body.userId : null;
  if (!bodyUserId || bodyUserId !== user.id) {
    return NextResponse.json({ ok: false, code: "USER_ID_MISMATCH" }, { status: 409 });
  }

  const lessonsProgress: LessonsProgress =
    body?.lessonsProgress && typeof body.lessonsProgress === "object"
      ? body.lessonsProgress
      : {};

  const today = new Date();

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        // беремо попередній прогрес (для перевірки "нового done")
        const prevRow = await tx.userProgress.findUnique({
          where: { userId: user.id },
          select: {
            lessonsProgress: true,
            lastUnlockedLevel: true,
            dailyDate: true,
            dailyCount: true,
          },
        });

        const prevLessons = (prevRow?.lessonsProgress ?? {}) as any;

        // 🔍 що нове стало done?
        const newlyDone = findNewlyDoneLessonId(prevLessons, lessonsProgress);

        // ❌ якщо намагаються разом відмітити багато уроків done — блокуємо
        if (newlyDone === "MULTI") {
          return {
            ok: false as const,
            status: 409,
            payload: { ok: false, code: "TOO_MANY_NEW_DONE" },
          };
        }

        const sameDay = prevRow?.dailyDate ? isSameDay(prevRow.dailyDate, today) : false;
        const currentDailyCount = sameDay ? (prevRow?.dailyCount ?? 0) : 0;

        const allowed = prevRow?.lastUnlockedLevel
          ? nextLevelId(prevRow.lastUnlockedLevel)
          : "a0-1";

        // ✅ Якщо з’явився новий "done" — це означає спробу пройти новий урок.
        if (typeof newlyDone === "string" && newlyDone) {
          // додаткова валідація формату
          if (!parseLevelId(newlyDone)) {
            return {
              ok: false as const,
              status: 400,
              payload: { ok: false, code: "INVALID_LESSON_ID" },
            };
          }

          // 1) строгий порядок
          if (newlyDone !== allowed) {
            return {
              ok: false as const,
              status: 409,
              payload: { ok: false, code: "LESSON_NOT_ALLOWED", allowed },
            };
          }

          // 2) ліміт 2/день
          if (currentDailyCount >= 2) {
            return {
              ok: false as const,
              status: 429,
              payload: { ok: false, code: "DAILY_LIMIT", limit: 2 },
            };
          }

          // ✅ все ок — зберігаємо прогрес + оновлюємо gate поля
          const saved = await tx.userProgress.upsert({
            where: { userId: user.id },
            create: {
              userId: user.id,
              lessonsProgress,
              lastUnlockedLevel: newlyDone,
              dailyDate: today,
              dailyCount: 1, // перший урок за день
            },
            update: {
              lessonsProgress,
              lastUnlockedLevel: newlyDone,
              dailyDate: today,
              dailyCount: currentDailyCount + 1,
            },
            select: {
              updatedAt: true,
              lastUnlockedLevel: true,
              dailyCount: true,
            },
          });

          return {
            ok: true as const,
            status: 200,
            payload: {
              ok: true,
              updatedAt: saved.updatedAt,
              lastUnlockedLevel: saved.lastUnlockedLevel,
              dailyCount: saved.dailyCount,
            },
          };
        }

        // ✅ Якщо нового done нема — це просто синк (наприклад статистика), зберігаємо як є
        const saved = await tx.userProgress.upsert({
          where: { userId: user.id },
          create: { userId: user.id, lessonsProgress },
          update: { lessonsProgress },
          select: { updatedAt: true },
        });

        return {
          ok: true as const,
          status: 200,
          payload: { ok: true, updatedAt: saved.updatedAt },
        };
      },
      // ✅ робимо максимально жорстко, щоб паралельні PUT не пробивали ліміт
      { isolationLevel: "Serializable" }
    );

    return NextResponse.json(result.payload, { status: result.status });
  } catch (e) {
    console.error("PUT /api/progress error:", e);
    return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type LessonsProgress = Record<string, any>;

function normId(id: string) {
  return String(id ?? "").trim().toLowerCase();
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

function hasPremium(user: { isPremium: boolean; premiumUntil: Date | null }) {
  return user.isPremium && (!user.premiumUntil || user.premiumUntil > new Date());
}

// ✅ Retry helper for Prisma deadlocks / write conflicts (P2034)
async function withRetry<T>(fn: () => Promise<T>, retries = 5) {
  let lastErr: any;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e: any) {
      lastErr = e;

      // Prisma P2034 = write conflict / deadlock
      if (e?.code !== "P2034") throw e;

      // backoff: 50, 100, 200, 400, 800 ms
      const delay = 50 * Math.pow(2, i);
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw lastErr;
}

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ ok: false, code: "USER_NOT_FOUND" }, { status: 404 });
  }

  const row = await prisma.userProgress.findUnique({ where: { userId: user.id } });

  return NextResponse.json({
    ok: true,
    userId: user.id,
    lessonsProgress: row?.lessonsProgress ?? null,
    updatedAt: row?.updatedAt ?? null,
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

  // ✅ user + premium
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, isPremium: true, premiumUntil: true },
  });

  if (!user) {
    return NextResponse.json({ ok: false, code: "USER_NOT_FOUND" }, { status: 404 });
  }

  const userHasPremium = hasPremium({
    isPremium: user.isPremium,
    premiumUntil: user.premiumUntil ?? null,
  });

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "INVALID_JSON" }, { status: 400 });
  }

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
    const result = await withRetry(
      () =>
        prisma.$transaction(
          async (tx) => {
            const prevRow = await tx.userProgress.findUnique({
              where: { userId: user.id },
              select: {
                lessonsProgress: true,
                lastUnlockedLevel: true,
                dailyDate: true,
                dailyCount: true,
              },
            });

            const prevLessons = (prevRow?.lessonsProgress ?? {}) as LessonsProgress;

            const sameDay = prevRow?.dailyDate ? isSameDay(prevRow.dailyDate, today) : false;
            const currentDailyCount = sameDay ? (prevRow?.dailyCount ?? 0) : 0;

            const allowed = prevRow?.lastUnlockedLevel
              ? nextLevelId(prevRow.lastUnlockedLevel)
              : "a0-1";

            // ✅ супер-важливо: перевіряємо тільки allowed
            const doneNow = isDone(lessonsProgress[allowed]);
            const donePrev = isDone(prevLessons[allowed]);

            // Якщо урок "allowed" став done зараз — це завершення нового уроку
            if (doneNow && !donePrev) {
              // додаткова валідація
              if (!parseLevelId(allowed)) {
                return {
                  status: 400,
                  payload: { ok: false, code: "INVALID_LESSON_ID" },
                };
              }

              // free ліміт (premium bypass)
              if (!userHasPremium && currentDailyCount >= 2) {
                return {
                  status: 429,
                  payload: { ok: false, code: "DAILY_LIMIT", limit: 2 },
                };
              }

              const saved = await tx.userProgress.upsert({
                where: { userId: user.id },
                create: {
                  userId: user.id,
                  lessonsProgress,
                  lastUnlockedLevel: allowed,
                  dailyDate: today,
                  dailyCount: userHasPremium ? 0 : 1,
                },
                update: {
                  lessonsProgress,
                  lastUnlockedLevel: allowed,
                  dailyDate: userHasPremium ? prevRow?.dailyDate ?? today : today,
                  dailyCount: userHasPremium ? prevRow?.dailyCount ?? 0 : currentDailyCount + 1,
                },
                select: {
                  updatedAt: true,
                  lastUnlockedLevel: true,
                  dailyCount: true,
                },
              });

              return {
                status: 200,
                payload: {
                  ok: true,
                  updatedAt: saved.updatedAt,
                  lastUnlockedLevel: saved.lastUnlockedLevel,
                  dailyCount: saved.dailyCount,
                },
              };
            }

            // ✅ інакше — просто синк (без unlock)
            const saved = await tx.userProgress.upsert({
              where: { userId: user.id },
              create: { userId: user.id, lessonsProgress },
              update: { lessonsProgress },
              select: { updatedAt: true },
            });

            return {
              status: 200,
              payload: { ok: true, updatedAt: saved.updatedAt },
            };
          },
          { isolationLevel: "Serializable" }
        ),
      5
    );

    return NextResponse.json(result.payload, { status: result.status });
  } catch (e) {
    console.error("PUT /api/progress error:", e);
    return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}

/**
 * ⚠️ CRITICAL FILE — LESSON PROGRESS + XP SYNC (НЕ ЛАМАТИ БЕЗ РОЗУМІННЯ)
 *
 * Це головний файл, який відповідає за:
 * - прогрес уроків (lessonsProgress)
 * - розблокування наступного уроку (lastUnlockedLevel)
 * - daily limit (2 уроки для free)
 * - XP користувача (xp)
 *
 * 👉 Це core-логіка всього навчання.
 */

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

// ✅ Перші 10 уроків A0 не рахуються в daily limit для free користувачів
function isFreeStarterUnlimitedLesson(levelId: string) {
  const p = parseLevelId(levelId);
  return p?.band === "a0" && p.n >= 1 && p.n <= 10;
}

// ✅ Retry helper for Prisma deadlocks / write conflicts (P2034)
async function withRetry<T>(fn: () => Promise<T>, retries = 5) {
  let lastErr: any;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e: any) {
      lastErr = e;

      if (e?.code !== "P2034") throw e;

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
    xpTotal: row?.xp ?? 0,
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

  const clientLessonsProgress: LessonsProgress =
    body?.lessonsProgress && typeof body.lessonsProgress === "object"
      ? body.lessonsProgress
      : {};

  const xpTotal =
    typeof body?.xpTotal === "number"
      ? Math.max(0, Math.floor(body.xpTotal))
      : null;

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
                xp: true,
              },
            });

            const prevLessons = (prevRow?.lessonsProgress ?? {}) as LessonsProgress;
            const lessonsProgress: LessonsProgress = {
              ...prevLessons,
              ...clientLessonsProgress,
            };
            const prevXp = prevRow?.xp ?? 0;
            const nextXp = xpTotal === null ? prevXp : Math.max(prevXp, xpTotal);

            const sameDay = prevRow?.dailyDate ? isSameDay(prevRow.dailyDate, today) : false;
            const currentDailyCount = sameDay ? (prevRow?.dailyCount ?? 0) : 0;

            const allowed = prevRow?.lastUnlockedLevel
              ? nextLevelId(prevRow.lastUnlockedLevel)
              : "a0-1";

            const doneNow = isDone(lessonsProgress[allowed]);
            const donePrev = isDone(prevLessons[allowed]);

            if (doneNow && !donePrev) {
              if (!parseLevelId(allowed)) {
                return {
                  status: 400,
                  payload: { ok: false, code: "INVALID_LESSON_ID" },
                };
              }

              const isStarterUnlimited = isFreeStarterUnlimitedLesson(allowed);
              const shouldCountDaily = !userHasPremium && !isStarterUnlimited;

              // free ліміт після перших 10 уроків A0
              if (shouldCountDaily && currentDailyCount >= 2) {
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
                  dailyDate: shouldCountDaily ? today : null,
                  dailyCount: shouldCountDaily ? 1 : 0,
                  xp: nextXp,
                },
                update: {
                  lessonsProgress,
                  lastUnlockedLevel: allowed,
                  dailyDate: shouldCountDaily ? today : prevRow?.dailyDate ?? null,
                  dailyCount: shouldCountDaily
                    ? currentDailyCount + 1
                    : prevRow?.dailyCount ?? 0,
                  xp: nextXp,
                },
                select: {
                  updatedAt: true,
                  lastUnlockedLevel: true,
                  dailyCount: true,
                  xp: true,
                },
              });

              return {
                status: 200,
                payload: {
                  ok: true,
                  updatedAt: saved.updatedAt,
                  lastUnlockedLevel: saved.lastUnlockedLevel,
                  dailyCount: saved.dailyCount,
                  xpTotal: saved.xp,
                },
              };
            }

            const saved = await tx.userProgress.upsert({
              where: { userId: user.id },
              create: { userId: user.id, lessonsProgress, xp: nextXp },
              update: { lessonsProgress, xp: nextXp },
              select: { updatedAt: true, xp: true },
            });

            return {
              status: 200,
              payload: { ok: true, updatedAt: saved.updatedAt, xpTotal: saved.xp },
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
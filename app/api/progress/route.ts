/**
 * ⚠️ CRITICAL FILE — LESSON PROGRESS + XP SYNC
 *
 * Відповідає за:
 * - прогрес уроків lessonsProgress
 * - course-aware sync
 * - lastUnlockedLevel
 * - XP користувача
 *
 * Monetization model:
 * - A0 is free without daily limit.
 * - A1/A2/B1/B2 are Premium.
 * - Daily lesson limit is no longer used for access.
 *
 * lessonsProgress зберігається course-aware:
 * {
 *   byCourse: {
 *     sk: { "a0-1": {...} },
 *     cs: { "a0-1": {...} },
 *     pl: { "a0-1": {...} }
 *   }
 * }
 *
 * Старий flat формат автоматично мігрується як sk.
 */

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type CourseId = "sk" | "cs" | "pl";
type LessonsProgress = Record<string, any>;
type LessonsProgressByCourse = Partial<Record<CourseId, LessonsProgress>>;

type CourseAwareProgress = {
  byCourse: LessonsProgressByCourse;
};

const COURSE_IDS: CourseId[] = ["sk", "cs", "pl"];

function isCourseId(value: unknown): value is CourseId {
  return value === "sk" || value === "cs" || value === "pl";
}

function getCourseIdFromUrl(req: Request): CourseId {
  try {
    const url = new URL(req.url);
    const raw = url.searchParams.get("courseId");

    return isCourseId(raw) ? raw : "sk";
  } catch {
    return "sk";
  }
}

function getCourseIdFromBody(body: any): CourseId {
  const raw = body?.courseId;

  return isCourseId(raw) ? raw : "sk";
}

function isPlainObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCourseAwareProgress(value: unknown): value is CourseAwareProgress {
  return isPlainObject(value) && isPlainObject((value as any).byCourse);
}

function normalizeProgressStore(raw: unknown): CourseAwareProgress {
  if (isCourseAwareProgress(raw)) {
    const byCourse: LessonsProgressByCourse = {};

    for (const courseId of COURSE_IDS) {
      const lessons = (raw as any).byCourse?.[courseId];
      byCourse[courseId] = isPlainObject(lessons) ? lessons : {};
    }

    return { byCourse };
  }

  if (isPlainObject(raw)) {
    return {
      byCourse: {
        sk: raw as LessonsProgress,
        cs: {},
        pl: {},
      },
    };
  }

  return {
    byCourse: {
      sk: {},
      cs: {},
      pl: {},
    },
  };
}

function getLessonsForCourse(raw: unknown, courseId: CourseId): LessonsProgress {
  const store = normalizeProgressStore(raw);
  const lessons = store.byCourse[courseId];

  return isPlainObject(lessons) ? lessons : {};
}

function updateLessonsForCourse(
  raw: unknown,
  courseId: CourseId,
  lessons: LessonsProgress
): CourseAwareProgress {
  const store = normalizeProgressStore(raw);

  return {
    byCourse: {
      sk: store.byCourse.sk ?? {},
      cs: store.byCourse.cs ?? {},
      pl: store.byCourse.pl ?? {},
      [courseId]: lessons,
    },
  };
}

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
  if (p.band === "a1" && Number.isFinite(p.n) && p.n >= 40) return "a2-1";
  if (p.band === "a2" && Number.isFinite(p.n) && p.n >= 50) return "b1-1";
  if (p.band === "b1" && Number.isFinite(p.n) && p.n >= 35) return "b2-1";
  if (p.band === "b2" && Number.isFinite(p.n) && p.n >= 50) return "b2-50";

  return `${p.band}-${p.n + 1}`;
}

function isDone(v: any) {
  if (v === true) return true;
  if (v && typeof v === "object" && v.done === true) return true;
  return false;
}

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

export async function GET(req: Request) {
  const courseId = getCourseIdFromUrl(req);

  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json(
      { ok: false, code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json(
      { ok: false, code: "USER_NOT_FOUND" },
      { status: 404 }
    );
  }

  const row = await prisma.userProgress.findUnique({
    where: { userId: user.id },
  });

  return NextResponse.json({
    ok: true,
    userId: user.id,
    courseId,
    lessonsProgress: getLessonsForCourse(row?.lessonsProgress ?? null, courseId),
    xpTotal: row?.xp ?? 0,
    updatedAt: row?.updatedAt ?? null,
    lastUnlockedLevel: row?.lastUnlockedLevel ?? null,

    /**
     * Legacy response fields.
     * Daily limits are no longer used for lesson access,
     * but returning these keeps old client code safe.
     */
    dailyDate: null,
    dailyCount: 0,
  });
}

export async function PUT(req: Request) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json(
      { ok: false, code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json(
      { ok: false, code: "USER_NOT_FOUND" },
      { status: 404 }
    );
  }

  let body: any = null;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const courseId = getCourseIdFromBody(body);

  const bodyUserId = typeof body?.userId === "string" ? body.userId : null;

  if (!bodyUserId || bodyUserId !== user.id) {
    return NextResponse.json(
      { ok: false, code: "USER_ID_MISMATCH" },
      { status: 409 }
    );
  }

  const clientLessonsProgress: LessonsProgress =
    body?.lessonsProgress && typeof body.lessonsProgress === "object"
      ? body.lessonsProgress
      : {};

  const xpTotal =
    typeof body?.xpTotal === "number"
      ? Math.max(0, Math.floor(body.xpTotal))
      : null;

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
                xp: true,
              },
            });

            const prevCourseLessons = getLessonsForCourse(
              prevRow?.lessonsProgress ?? null,
              courseId
            );

            const lessonsForCourse: LessonsProgress = {
              ...prevCourseLessons,
              ...clientLessonsProgress,
            };

            const fullLessonsProgress = updateLessonsForCourse(
              prevRow?.lessonsProgress ?? null,
              courseId,
              lessonsForCourse
            );

            const prevXp = prevRow?.xp ?? 0;
            const nextXp = xpTotal === null ? prevXp : Math.max(prevXp, xpTotal);

            const allowed = prevRow?.lastUnlockedLevel
              ? nextLevelId(prevRow.lastUnlockedLevel)
              : "a0-1";

            const doneNow = isDone(lessonsForCourse[allowed]);
            const donePrev = isDone(prevCourseLessons[allowed]);

            if (doneNow && !donePrev) {
              if (!parseLevelId(allowed)) {
                return {
                  status: 400,
                  payload: { ok: false, code: "INVALID_LESSON_ID" },
                };
              }

              const saved = await tx.userProgress.upsert({
                where: { userId: user.id },
                create: {
                  userId: user.id,
                  lessonsProgress: fullLessonsProgress,
                  lastUnlockedLevel: allowed,

                  /**
                   * Legacy fields.
                   * Daily lesson limit is disabled.
                   */
                  dailyDate: null,
                  dailyCount: 0,

                  xp: nextXp,
                },
                update: {
                  lessonsProgress: fullLessonsProgress,
                  lastUnlockedLevel: allowed,

                  /**
                   * Legacy fields.
                   * Daily lesson limit is disabled.
                   */
                  dailyDate: null,
                  dailyCount: 0,

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
                  courseId,
                  updatedAt: saved.updatedAt,
                  lastUnlockedLevel: saved.lastUnlockedLevel,
                  dailyCount: 0,
                  xpTotal: saved.xp,
                },
              };
            }

            const saved = await tx.userProgress.upsert({
              where: { userId: user.id },
              create: {
                userId: user.id,
                lessonsProgress: fullLessonsProgress,
                dailyDate: null,
                dailyCount: 0,
                xp: nextXp,
              },
              update: {
                lessonsProgress: fullLessonsProgress,
                dailyDate: null,
                dailyCount: 0,
                xp: nextXp,
              },
              select: { updatedAt: true, xp: true },
            });

            return {
              status: 200,
              payload: {
                ok: true,
                courseId,
                updatedAt: saved.updatedAt,
                dailyCount: 0,
                xpTotal: saved.xp,
              },
            };
          },
          { isolationLevel: "Serializable" }
        ),
      5
    );

    return NextResponse.json(result.payload, { status: result.status });
  } catch (e) {
    console.error("PUT /api/progress error:", e);
    return NextResponse.json(
      { ok: false, code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
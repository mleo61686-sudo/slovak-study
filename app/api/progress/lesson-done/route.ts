/**
 * API route для фіксації завершення уроку користувачем.
 *
 * Course-aware version:
 * lessonsProgress зберігається у форматі:
 * {
 *   byCourse: {
 *     sk: { "a0-1": {...} },
 *     cs: { "a0-1": {...} },
 *     pl: { "a0-1": {...} }
 *   }
 * }
 *
 * Старий flat формат автоматично мігрується як sk.
 *
 * Monetization model:
 * - A0 is free without daily limit.
 * - A1/A2/B1/B2 are Premium, checked before opening lesson pages.
 * - This endpoint only saves completed lessons.
 */

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { safelyRecordLessonLeaderboardScore } from "@/lib/leaderboard/recordLessonLeaderboardScore";

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

function toDayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function isLessonDone(value: any) {
  if (value === true) return true;
  return !!(value && typeof value === "object" && value.done === true);
}

function getLessonResult(body: any) {
  const rawCorrect = body?.correctAnswers;
  const rawTotal = body?.totalQuestions;

  if (
    typeof rawCorrect !== "number" ||
    !Number.isFinite(rawCorrect) ||
    typeof rawTotal !== "number" ||
    !Number.isFinite(rawTotal)
  ) {
    return null;
  }

  const totalQuestions = Math.floor(rawTotal);
  const correctAnswers = Math.floor(rawCorrect);

  if (
    totalQuestions < 1 ||
    totalQuestions > 1000 ||
    correctAnswers < 0 ||
    correctAnswers > totalQuestions
  ) {
    return null;
  }

  const resultPercent = Math.round((correctAnswers / totalQuestions) * 100);
  const leaderboardScore = Math.round((correctAnswers / totalQuestions) * 70);

  return {
    correctAnswers,
    totalQuestions,
    resultPercent,
    leaderboardScore,
  };
}

function getStoredLessonResult(value: Record<string, any>) {
  const candidates = [
    {
      correctAnswers: value.correctAnswers,
      totalQuestions: value.totalQuestions,
    },
    {
      correctAnswers: value.bestCorrect,
      totalQuestions: value.bestTotal,
    },
  ];

  let best: { correctAnswers: number; totalQuestions: number } | null = null;

  for (const candidate of candidates) {
    if (
      typeof candidate.correctAnswers !== "number" ||
      !Number.isFinite(candidate.correctAnswers) ||
      typeof candidate.totalQuestions !== "number" ||
      !Number.isFinite(candidate.totalQuestions)
    ) {
      continue;
    }

    const correctAnswers = Math.floor(candidate.correctAnswers);
    const totalQuestions = Math.floor(candidate.totalQuestions);

    if (
      totalQuestions < 1 ||
      correctAnswers < 0 ||
      correctAnswers > totalQuestions
    ) {
      continue;
    }

    const normalized = { correctAnswers, totalQuestions };

    if (!best || isBetterLessonResult(normalized, best)) {
      best = normalized;
    }
  }

  return best;
}

function isBetterLessonResult(
  next: { correctAnswers: number; totalQuestions: number },
  previous: { correctAnswers: number; totalQuestions: number } | null,
) {
  if (!previous) return true;

  return (
    next.correctAnswers * previous.totalQuestions >
    previous.correctAnswers * next.totalQuestions
  );
}

export async function POST(req: Request) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  const { levelId } = body;
  const courseId = getCourseIdFromBody(body);
  const lessonResult = getLessonResult(body);

  const id = String(levelId || "").trim().toLowerCase();

  if (!id) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  /**
   * The browser sends the raw number of correct answers and questions.
   * The server calculates the leaderboard score itself and clamps it to 0..70.
   * This avoids awarding 70 points to every completed lesson.
   */
  if (!lessonResult) {
    return NextResponse.json(
      { ok: false, code: "INVALID_LESSON_RESULT" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const today = new Date();
  const todayKey = toDayKey(today);
  const nowIso = new Date().toISOString();

  const row = await prisma.userProgress.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      lessonsProgress: {
        byCourse: {
          sk: {},
          cs: {},
          pl: {},
        },
      },

      /**
       * Legacy fields.
       * We keep them because Prisma schema still has them,
       * but lesson monetization no longer uses daily limits.
       */
      dailyCount: 0,
      dailyDate: null,
      lastUnlockedLevel: null,
    },
    select: {
      lessonsProgress: true,
      lastUnlockedLevel: true,
    },
  });

  const courseLessons = getLessonsForCourse(
    row.lessonsProgress ?? null,
    courseId
  );

  const wasDone = isLessonDone(courseLessons[id]);
  const prevObj =
    typeof courseLessons[id] === "object" && courseLessons[id]
      ? courseLessons[id]
      : courseLessons[id] === true
        ? { done: true }
        : {};

  const previousResult = getStoredLessonResult(prevObj);
  const hasBetterResult = isBetterLessonResult(lessonResult, previousResult);

  const nextLessonValue = {
    ...prevObj,
    done: true,
    doneAt:
      typeof prevObj.doneAt === "string" && prevObj.doneAt
        ? prevObj.doneAt
        : todayKey,
    updatedAt: nowIso,
    lastCorrect: lessonResult.correctAnswers,
    lastTotal: lessonResult.totalQuestions,
    lastWrong: Math.max(
      0,
      lessonResult.totalQuestions - lessonResult.correctAnswers,
    ),
    ...(hasBetterResult
      ? {
          correctAnswers: lessonResult.correctAnswers,
          totalQuestions: lessonResult.totalQuestions,
          resultPercent: lessonResult.resultPercent,
          leaderboardScore: lessonResult.leaderboardScore,
          bestCorrect: lessonResult.correctAnswers,
          bestTotal: lessonResult.totalQuestions,
        }
      : {}),
  };

  const nextCourseLessons = {
    ...courseLessons,
    [id]: nextLessonValue,
  };

  const nextLessonsProgress = updateLessonsForCourse(
    row.lessonsProgress ?? null,
    courseId,
    nextCourseLessons,
  );

  await prisma.userProgress.update({
    where: { userId: user.id },
    data: {
      lessonsProgress: nextLessonsProgress,
      dailyCount: 0,
      dailyDate: null,
      ...(!wasDone ? { lastUnlockedLevel: id } : {}),
    },
  });

  await safelyRecordLessonLeaderboardScore({
    userId: user.id,
    courseId,
    activityKey: id,
    score: lessonResult.leaderboardScore,
  });

  return NextResponse.json({
    ok: true,
    courseId,
    dailyCount: 0,
    alreadyDone: wasDone,
    resultPercent: lessonResult.resultPercent,
    leaderboardScore: lessonResult.leaderboardScore,
    bestResultUpdated: hasBetterResult,
  });
}

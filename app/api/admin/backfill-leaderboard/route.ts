import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type CourseId = "sk" | "cs" | "pl";
type LessonsProgress = Record<string, any>;

const COURSE_IDS: CourseId[] = ["sk", "cs", "pl"];
const BACKFILL_SCORE_PER_LESSON = 70;

/**
 * Важливо:
 * історичний прогрес НЕ записуємо в поточний тиждень,
 * щоб не зіпсувати weekly leaderboard.
 *
 * Для all-time це буде рахуватися,
 * а для period=week — ні.
 */
const HISTORIC_WEEK_START = new Date(Date.UTC(2020, 0, 6));

function isPlainObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLessonDone(value: any) {
  if (value === true) return true;
  return !!(value && typeof value === "object" && value.done === true);
}

function normalizeLessonsProgressByCourse(
  raw: unknown
): Record<CourseId, LessonsProgress> {
  if (isPlainObject(raw) && isPlainObject(raw.byCourse)) {
    return {
      sk: isPlainObject(raw.byCourse.sk) ? raw.byCourse.sk : {},
      cs: isPlainObject(raw.byCourse.cs) ? raw.byCourse.cs : {},
      pl: isPlainObject(raw.byCourse.pl) ? raw.byCourse.pl : {},
    };
  }

  /**
   * Старий flat формат вважаємо словацьким курсом.
   */
  if (isPlainObject(raw)) {
    return {
      sk: raw,
      cs: {},
      pl: {},
    };
  }

  return {
    sk: {},
    cs: {},
    pl: {},
  };
}

function cleanLessonId(value: string) {
  return String(value || "").trim().toLowerCase();
}

export async function POST() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.isAdmin === true;

  if (!isAdmin) {
    return NextResponse.json(
      {
        ok: false,
        code: "FORBIDDEN",
      },
      { status: 403 }
    );
  }

  try {
    const rows = await prisma.userProgress.findMany({
      select: {
        userId: true,
        lessonsProgress: true,
      },
    });

    let usersScanned = 0;
    let completedLessonsFound = 0;
    let createdActivities = 0;
    let skippedExisting = 0;

    for (const row of rows) {
      usersScanned += 1;

      const byCourse = normalizeLessonsProgressByCourse(row.lessonsProgress);

      const existingActivities = await prisma.leaderboardActivity.findMany({
        where: {
          userId: row.userId,
          type: "LESSON",
        },
        select: {
          courseId: true,
          activityKey: true,
        },
      });

      const existingKeys = new Set(
        existingActivities.map(
          (activity) => `${activity.courseId}:${activity.activityKey}`
        )
      );

      const activitiesToCreate: {
        userId: string;
        type: "LESSON";
        courseId: CourseId;
        activityKey: string;
        score: number;
        weekStart: Date;
      }[] = [];

      for (const courseId of COURSE_IDS) {
        const lessons = byCourse[courseId];

        for (const [lessonId, value] of Object.entries(lessons)) {
          if (!isLessonDone(value)) continue;

          const activityKey = cleanLessonId(lessonId);

          if (!activityKey) continue;

          completedLessonsFound += 1;

          const uniqueKey = `${courseId}:${activityKey}`;

          if (existingKeys.has(uniqueKey)) {
            skippedExisting += 1;
            continue;
          }

          existingKeys.add(uniqueKey);

          activitiesToCreate.push({
            userId: row.userId,
            type: "LESSON",
            courseId,
            activityKey,
            score: BACKFILL_SCORE_PER_LESSON,
            weekStart: HISTORIC_WEEK_START,
          });
        }
      }

      if (activitiesToCreate.length > 0) {
        const result = await prisma.leaderboardActivity.createMany({
          data: activitiesToCreate,
          skipDuplicates: true,
        });

        createdActivities += result.count;
      }
    }

    return NextResponse.json({
      ok: true,
      usersScanned,
      completedLessonsFound,
      createdActivities,
      skippedExisting,
      historicWeekStart: HISTORIC_WEEK_START.toISOString(),
    });
  } catch (error) {
    console.error("POST /api/admin/backfill-leaderboard error:", error);

    return NextResponse.json(
      {
        ok: false,
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type CourseId = "sk" | "cs" | "pl";

const REVIEW_DAILY_SCORE_LIMIT = 100;
const DEFAULT_REVIEW_POINTS = 1;

function isCourseId(value: unknown): value is CourseId {
  return value === "sk" || value === "cs" || value === "pl";
}

function getCourseIdFromBody(body: any): CourseId {
  return isCourseId(body?.courseId) ? body.courseId : "sk";
}

function clampPoints(value: unknown) {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : DEFAULT_REVIEW_POINTS;

  if (!Number.isFinite(n)) return DEFAULT_REVIEW_POINTS;

  return Math.max(1, Math.min(10, Math.floor(n)));
}

function getDayKeyUtc(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getWeekStartUtc(date = new Date()) {
  const utcMidnight = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );

  const utcDay = utcMidnight.getUTCDay();
  const mondayBasedDay = utcDay === 0 ? 7 : utcDay;

  utcMidnight.setUTCDate(utcMidnight.getUTCDate() - (mondayBasedDay - 1));

  return utcMidnight;
}

async function addReviewLeaderboardPoints(args: {
  userId: string;
  courseId: CourseId;
  points: number;
}) {
  const dayKey = getDayKeyUtc();
  const weekStart = getWeekStartUtc();

  /**
   * Один запис REVIEW на день.
   * Так ми можемо обмежити повторення максимумом 100 балів/день,
   * але all-time leaderboard все одно буде сумувати всі дні.
   */
  const activityKey = `review:${dayKey}`;

  const where = {
    userId_type_courseId_activityKey_weekStart: {
      userId: args.userId,
      type: "REVIEW" as const,
      courseId: args.courseId,
      activityKey,
      weekStart,
    },
  };

  const existing = await prisma.leaderboardActivity.findUnique({
    where,
    select: {
      score: true,
    },
  });

  if (!existing) {
    try {
      const score = Math.min(args.points, REVIEW_DAILY_SCORE_LIMIT);

      await prisma.leaderboardActivity.create({
        data: {
          userId: args.userId,
          type: "REVIEW",
          courseId: args.courseId,
          activityKey,
          score,
          weekStart,
        },
      });

      return {
        acceptedPoints: score,
        dailyScore: score,
        capped: score >= REVIEW_DAILY_SCORE_LIMIT,
      };
    } catch (error: any) {
      if (error?.code !== "P2002") {
        throw error;
      }
    }
  }

  const latest = await prisma.leaderboardActivity.findUnique({
    where,
    select: {
      score: true,
    },
  });

  const currentScore = latest?.score ?? 0;
  const roomLeft = Math.max(0, REVIEW_DAILY_SCORE_LIMIT - currentScore);
  const acceptedPoints = Math.min(args.points, roomLeft);

  if (acceptedPoints <= 0) {
    return {
      acceptedPoints: 0,
      dailyScore: currentScore,
      capped: true,
    };
  }

  const nextScore = currentScore + acceptedPoints;

  await prisma.leaderboardActivity.update({
    where,
    data: {
      score: nextScore,
    },
  });

  return {
    acceptedPoints,
    dailyScore: nextScore,
    capped: nextScore >= REVIEW_DAILY_SCORE_LIMIT,
  };
}

export async function POST(req: Request) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  const courseId = getCourseIdFromBody(body);
  const points = clampPoints(body?.points);

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });

  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const result = await addReviewLeaderboardPoints({
      userId: user.id,
      courseId,
      points,
    });

    return NextResponse.json({
      ok: true,
      type: "REVIEW",
      courseId,
      ...result,
    });
  } catch (error) {
    console.error("POST /api/leaderboard/review error:", error);

    return NextResponse.json(
      {
        ok: false,
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
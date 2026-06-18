import { prisma } from "@/lib/prisma";

const LESSON_MAX_SCORE = 70;

type RecordLessonLeaderboardScoreArgs = {
  userId: string;
  courseId: string;
  activityKey: string;
  score?: number | null;
};

function clampScore(value: unknown) {
  const n = typeof value === "number" && Number.isFinite(value) ? value : LESSON_MAX_SCORE;

  return Math.max(0, Math.min(LESSON_MAX_SCORE, Math.round(n)));
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

async function recordLessonLeaderboardScore({
  userId,
  courseId,
  activityKey,
  score,
}: RecordLessonLeaderboardScoreArgs) {
  const cleanActivityKey = String(activityKey || "").trim().toLowerCase();

  if (!userId || !courseId || !cleanActivityKey) {
    return;
  }

  const nextScore = clampScore(score);
  const weekStart = getWeekStartUtc();

  const where = {
    userId_type_courseId_activityKey_weekStart: {
      userId,
      type: "LESSON" as const,
      courseId,
      activityKey: cleanActivityKey,
      weekStart,
    },
  };

  const existing = await prisma.leaderboardActivity.findUnique({
    where,
    select: {
      score: true,
    },
  });

  if (existing) {
    if (nextScore <= existing.score) {
      return;
    }

    await prisma.leaderboardActivity.update({
      where,
      data: {
        score: nextScore,
      },
    });

    return;
  }

  try {
    await prisma.leaderboardActivity.create({
      data: {
        userId,
        type: "LESSON",
        courseId,
        activityKey: cleanActivityKey,
        score: nextScore,
        weekStart,
      },
    });
  } catch (error: any) {
    if (error?.code !== "P2002") {
      throw error;
    }

    const latest = await prisma.leaderboardActivity.findUnique({
      where,
      select: {
        score: true,
      },
    });

    if (!latest || nextScore <= latest.score) {
      return;
    }

    await prisma.leaderboardActivity.update({
      where,
      data: {
        score: nextScore,
      },
    });
  }
}

export async function safelyRecordLessonLeaderboardScore(
  args: RecordLessonLeaderboardScoreArgs
) {
  try {
    await recordLessonLeaderboardScore(args);
  } catch (error) {
    console.warn("Failed to record lesson leaderboard score:", error);
  }
}
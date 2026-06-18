import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type CourseId = "sk" | "cs" | "pl";
type AudioLeaderboardKind = "LISTENING" | "DICTATION";

/**
 * Важливо:
 * У Prisma LeaderboardActivity.type НЕ має LISTENING / DICTATION.
 * Тому в базу записуємо type: "REVIEW",
 * а конкретний тип активності кладемо в activityKey:
 *
 * listening:audio-id
 * dictation:audio-id
 */
const PRISMA_ACTIVITY_TYPE = "REVIEW" as const;

const MAX_SCORE_BY_KIND: Record<AudioLeaderboardKind, number> = {
  LISTENING: 5,
  DICTATION: 20,
};

function isCourseId(value: unknown): value is CourseId {
  return value === "sk" || value === "cs" || value === "pl";
}

function isAudioLeaderboardKind(value: unknown): value is AudioLeaderboardKind {
  return value === "LISTENING" || value === "DICTATION";
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

function cleanActivityKey(value: unknown) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

function clampScore(value: unknown, maxScore: number) {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : 0;

  if (!Number.isFinite(n)) return 0;

  return Math.max(0, Math.min(maxScore, Math.floor(n)));
}

function getActivityKey(kind: AudioLeaderboardKind, rawActivityKey: string) {
  const prefix = kind === "LISTENING" ? "listening" : "dictation";

  return `${prefix}:${rawActivityKey}`;
}

async function recordBestAudioPracticeScore(args: {
  userId: string;
  kind: AudioLeaderboardKind;
  courseId: CourseId;
  activityKey: string;
  score: number;
}) {
  const weekStart = getWeekStartUtc();

  /**
   * Використовуємо findFirst + update по id,
   * щоб не залежати від exact Prisma unique input name.
   */
  const existing = await prisma.leaderboardActivity.findFirst({
    where: {
      userId: args.userId,
      type: PRISMA_ACTIVITY_TYPE,
      courseId: args.courseId,
      activityKey: args.activityKey,
      weekStart,
    },
    select: {
      id: true,
      score: true,
    },
  });

  if (!existing) {
    if (args.score <= 0) {
      return {
        created: false,
        updated: false,
        acceptedScore: 0,
        score: 0,
      };
    }

    try {
      await prisma.leaderboardActivity.create({
        data: {
          userId: args.userId,
          type: PRISMA_ACTIVITY_TYPE,
          courseId: args.courseId,
          activityKey: args.activityKey,
          score: args.score,
          weekStart,
        },
      });

      return {
        created: true,
        updated: false,
        acceptedScore: args.score,
        score: args.score,
      };
    } catch (error: any) {
      /**
       * Якщо паралельно створився такий самий запис,
       * нижче просто перечитаємо і оновимо найкращий score.
       */
      if (error?.code !== "P2002") {
        throw error;
      }
    }
  }

  const latest = await prisma.leaderboardActivity.findFirst({
    where: {
      userId: args.userId,
      type: PRISMA_ACTIVITY_TYPE,
      courseId: args.courseId,
      activityKey: args.activityKey,
      weekStart,
    },
    select: {
      id: true,
      score: true,
    },
  });

  const currentScore = latest?.score ?? 0;

  /**
   * Для одного й того самого listening/dictation у межах тижня
   * зберігаємо тільки кращий результат.
   *
   * Гірший результат рейтинг не зменшує.
   */
  if (!latest || args.score <= currentScore) {
    return {
      created: false,
      updated: false,
      acceptedScore: 0,
      score: currentScore,
    };
  }

  await prisma.leaderboardActivity.update({
    where: {
      id: latest.id,
    },
    data: {
      score: args.score,
    },
  });

  return {
    created: false,
    updated: true,
    acceptedScore: args.score - currentScore,
    score: args.score,
  };
}

export async function POST(req: Request) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  const courseId: CourseId = isCourseId(body?.courseId) ? body.courseId : "sk";

  const kind: AudioLeaderboardKind = isAudioLeaderboardKind(body?.type)
    ? body.type
    : "LISTENING";

  const rawActivityKey = cleanActivityKey(body?.activityKey);

  if (!rawActivityKey) {
    return NextResponse.json(
      {
        ok: false,
        code: "MISSING_ACTIVITY_KEY",
      },
      { status: 400 }
    );
  }

  const maxScore = MAX_SCORE_BY_KIND[kind];
  const score = clampScore(body?.score, maxScore);

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
    const activityKey = getActivityKey(kind, rawActivityKey);

    const result = await recordBestAudioPracticeScore({
      userId: user.id,
      kind,
      courseId,
      activityKey,
      score,
    });

    return NextResponse.json({
      ok: true,
      type: kind,
      storedAs: PRISMA_ACTIVITY_TYPE,
      courseId,
      activityKey,
      maxScore,
      ...result,
    });
  } catch (error) {
    console.error("POST /api/leaderboard/audio-practice error:", error);

    return NextResponse.json(
      {
        ok: false,
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
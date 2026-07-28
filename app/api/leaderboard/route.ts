import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type CourseId = "sk" | "cs" | "pl";
type LeaderboardPeriod = "week" | "all";

function isCourseId(value: unknown): value is CourseId {
  return value === "sk" || value === "cs" || value === "pl";
}

function isLeaderboardPeriod(value: unknown): value is LeaderboardPeriod {
  return value === "week" || value === "all";
}

function clampLimit(value: unknown) {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : 10;

  if (!Number.isFinite(n)) return 10;

  return Math.max(1, Math.min(50, Math.floor(n)));
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

function getPublicDisplayName(user: { id: string; name: string | null }) {
  const cleanName = String(user.name || "").trim();
  const shortId = user.id.slice(-4).toUpperCase();

  if (cleanName) {
    return cleanName.slice(0, 32);
  }

  return `Guest ${shortId}`;
}

function getSafeAvatarUrl(value: string | null) {
  const raw = String(value || "").trim();

  if (!raw) {
    return null;
  }

  /**
   * Only raster formats accepted by the avatar upload endpoint are public.
   * Do not pass arbitrary data:image payloads (for example SVG) through.
   */
  if (/^data:image\/(?:jpeg|png|webp);base64,/.test(raw)) {
    return raw;
  }

  /**
   * Якщо пізніше аватарки будуть як URL — теж підтримуємо.
   */
  try {
    const url = new URL(raw);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return raw;
    }

    return null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const limit = clampLimit(url.searchParams.get("limit"));

    const rawCourseId = url.searchParams.get("courseId");
    const courseId = isCourseId(rawCourseId) ? rawCourseId : null;

    /**
     * Для головної краще period=all,
     * бо тоді рейтинг враховує старий прогрес після backfill.
     *
     * period=week залишаємо для майбутнього тижневого рейтингу.
     */
    const rawPeriod = url.searchParams.get("period");
    const period: LeaderboardPeriod = isLeaderboardPeriod(rawPeriod)
      ? rawPeriod
      : "all";

    const weekStart = getWeekStartUtc();

    const grouped = await prisma.leaderboardActivity.groupBy({
      by: ["userId"],
      where: {
        ...(period === "week" ? { weekStart } : {}),
        ...(courseId ? { courseId } : {}),
      },
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: "desc",
        },
      },
      take: limit,
    });

    const userIds = grouped.map((item) => item.userId);

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        age: true,
        progress: {
          select: {
            xp: true,
          },
        },
      },
    });

    const reviewTotals = await prisma.leaderboardActivity.groupBy({
      by: ["userId"],
      where: {
        userId: { in: userIds },
        type: "REVIEW",
        activityKey: {
          startsWith: "review:",
        },
      },
      _sum: { score: true },
    });

    const reviewXpByUserId = new Map(
      reviewTotals.map((item) => [
        item.userId,
        Math.max(0, (item._sum.score ?? 0) * 10),
      ]),
    );

    const userById = new Map(users.map((user) => [user.id, user]));

    const entries = grouped.map((item, index) => {
      const user = userById.get(item.userId);

      return {
        rank: index + 1,
        displayName: user
          ? getPublicDisplayName(user)
          : `Guest ${item.userId.slice(-4).toUpperCase()}`,
        avatarUrl: user ? getSafeAvatarUrl(user.avatarUrl) : null,
        score: item._sum.score ?? 0,
        publicId: user
          ? user.id.slice(-6).toUpperCase()
          : item.userId.slice(-6).toUpperCase(),
        // XP у Flunio нараховується лише за повторення слів: 10 XP за одне
        // прийняте повторення. Беремо максимум між синхронізованим UserProgress
        // та серверними REVIEW-активностями, щоб не показувати помилковий 0 для
        // старих користувачів, у яких XP колись залишився тільки локально.
        xp: Math.max(
          user?.progress?.xp ?? 0,
          reviewXpByUserId.get(item.userId) ?? 0,
        ),
        age: user?.age ?? null,
      };
    });

    return NextResponse.json({
      ok: true,
      period,
      weekStart: period === "week" ? weekStart.toISOString() : null,
      courseId,
      entries,
    });
  } catch (error) {
    console.error("GET /api/leaderboard error:", error);

    return NextResponse.json(
      {
        ok: false,
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
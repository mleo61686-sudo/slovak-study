import type { User } from "@prisma/client";
import { hasPremium } from "./hasPremium";

const DAILY_FREE_LESSON_LIMIT = 2;

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function canStartLessonToday(opts: {
  user: User | null | undefined;
  usedToday: number;
}) {
  const { user, usedToday } = opts;

  if (hasPremium(user)) {
    return { ok: true, limit: null };
  }

  if (usedToday < DAILY_FREE_LESSON_LIMIT) {
    return { ok: true, limit: DAILY_FREE_LESSON_LIMIT };
  }

  return {
    ok: false,
    limit: DAILY_FREE_LESSON_LIMIT,
    resetAt: `${todayKey()}T23:59:59`,
  };
}

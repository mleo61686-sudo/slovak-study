/**
 * ⚠️ CORE FILE — LOCAL PROGRESS + XP STORAGE
 *
 * Відповідає за:
 * - localStorage (SRS, daily, XP)
 * - XP систему (get/add/set)
 * - ключі збереження
 *
 * ⚠️ НЕ ЛАМАТИ:
 * - ключі (slovakStudy.*)
 * - xpKey (XP має бути ГЛОБАЛЬНИЙ)
 * - emitXpChanged()
 *
 * ⚠️ XP правило:
 * - тільки збільшується (ніколи не зменшуємо)
 *
 * Після змін:
 * - перевір XP
 * - перевір sync ПК ↔ мобілка
 */

import type { CourseId } from "@/app/learning/courses/registry";
import type { SrsState } from "./words-srs-logic";
import { getTodayKey } from "./words-srs-logic";

const KEY_BASE = "slovakStudy.srsWords";
const DAILY_KEY_BASE = "slovakStudy.dailyNewWords";
const DAILY_SESSION_KEY_BASE = "slovakStudy.srsDailySession";
const STREAK_KEY_BASE = "slovakStudy.srsStreak";
const DAILY_GOAL_KEY_BASE = "slovakStudy.srsDailyGoal";
const XP_KEY_BASE = "slovakStudy.srsXp";

export const XP_SYNC_EVENT = "slovakStudy:xpChanged";

export type DailySession = { date: string; ids: string[] };

export type StreakState = {
  count: number;
  lastReviewDate: string | null;
};

export type DailyGoalState = {
  date: string;
  reviewed: number;
};

export type XpState = {
  totalXp: number;
};

export type UserLevel = {
  level: number;
  title: {
    ua: string;
    ru: string;
    en: string;
  };
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
};

function srsKey(userId: string, courseId: CourseId) {
  return `${KEY_BASE}:${userId}:${courseId}`;
}

function dailyKey(userId: string, courseId: CourseId) {
  return `${DAILY_KEY_BASE}:${userId}:${courseId}`;
}

function dailySessionKey(userId: string, courseId: CourseId) {
  return `${DAILY_SESSION_KEY_BASE}:${userId}:${courseId}`;
}

function streakKey(userId: string, courseId: CourseId) {
  return `${STREAK_KEY_BASE}:${userId}:${courseId}`;
}

function dailyGoalKey(userId: string, courseId: CourseId) {
  return `${DAILY_GOAL_KEY_BASE}:${userId}:${courseId}`;
}

// XP intentionally does NOT include courseId.
// It is global per user across all courses.
function xpKey(userId: string) {
  return `${XP_KEY_BASE}:${userId}`;
}

function legacyCourseXpKey(userId: string, courseId: CourseId) {
  return `${XP_KEY_BASE}:${userId}:${courseId}`;
}

function legacySrsKey(userId: string) {
  return `${KEY_BASE}:${userId}`;
}

function legacyDailyKey(userId: string) {
  return `${DAILY_KEY_BASE}:${userId}`;
}

function legacyDailySessionKey(userId: string) {
  return `${DAILY_SESSION_KEY_BASE}:${userId}`;
}

function emitXpChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(XP_SYNC_EVENT));
}

function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

const USER_LEVELS: Array<{
  level: number;
  xp: number;
  title: UserLevel["title"];
}> = [
  { level: 1, xp: 0, title: { ua: "Початківець", ru: "Новичок", en: "Beginner" } },
  { level: 2, xp: 100, title: { ua: "Новачок", ru: "Начинающий", en: "Rookie" } },
  { level: 3, xp: 250, title: { ua: "Учень", ru: "Ученик", en: "Learner" } },
  { level: 4, xp: 500, title: { ua: "Старанний учень", ru: "Старательный ученик", en: "Dedicated Learner" } },
  { level: 5, xp: 900, title: { ua: "Практик", ru: "Практик", en: "Practitioner" } },
  { level: 6, xp: 1400, title: { ua: "Словознавець", ru: "Знаток слов", en: "Word Explorer" } },
  { level: 7, xp: 2100, title: { ua: "Активний учень", ru: "Активный ученик", en: "Active Learner" } },
  { level: 8, xp: 3000, title: { ua: "Мовний дослідник", ru: "Языковой исследователь", en: "Language Explorer" } },
  { level: 9, xp: 4200, title: { ua: "Сильний учень", ru: "Сильный ученик", en: "Strong Learner" } },
  { level: 10, xp: 6000, title: { ua: "Поліглот-початківець", ru: "Полиглот-новичок", en: "Junior Polyglot" } },
  { level: 11, xp: 8500, title: { ua: "Мовний боєць", ru: "Языковой боец", en: "Language Fighter" } },
  { level: 12, xp: 11500, title: { ua: "Впевнений учень", ru: "Уверенный ученик", en: "Confident Learner" } },
  { level: 13, xp: 15000, title: { ua: "Просунутий", ru: "Продвинутый", en: "Advanced" } },
  { level: 14, xp: 19000, title: { ua: "Мовний майстер", ru: "Языковой мастер", en: "Language Master" } },
  { level: 15, xp: 24000, title: { ua: "Експерт", ru: "Эксперт", en: "Expert" } },
  { level: 16, xp: 30000, title: { ua: "Поліглот", ru: "Полиглот", en: "Polyglot" } },
  { level: 17, xp: 37000, title: { ua: "Супер поліглот", ru: "Супер полиглот", en: "Super Polyglot" } },
  { level: 18, xp: 45000, title: { ua: "Легенда Flunio", ru: "Легенда Flunio", en: "Flunio Legend" } },
  { level: 19, xp: 55000, title: { ua: "Майстер мов", ru: "Мастер языков", en: "Language Champion" } },
  { level: 20, xp: 70000, title: { ua: "Грандмайстер", ru: "Грандмастер", en: "Grandmaster" } },
];

export function getUserLevel(totalXp: number): UserLevel {
  const safeXp = Math.max(0, totalXp);

  let current = USER_LEVELS[0];
  let next = USER_LEVELS[1];

  for (let i = 0; i < USER_LEVELS.length; i++) {
    const level = USER_LEVELS[i];
    const nextLevel = USER_LEVELS[i + 1];

    if (!nextLevel || safeXp < nextLevel.xp) {
      current = level;
      next = nextLevel ?? level;
      break;
    }
  }

  const currentLevelXp = current.xp;
  const nextLevelXp = next.xp;

  const progressPercent =
    current.level === next.level
      ? 100
      : Math.min(
          100,
          Math.max(
            0,
            Math.round(
              ((safeXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100
            )
          )
        );

  return {
    level: current.level,
    title: current.title,
    currentLevelXp,
    nextLevelXp,
    progressPercent,
  };
}

export function getStreakState(
  userId: string,
  courseId: CourseId
): StreakState {
  const raw = localStorage.getItem(streakKey(userId, courseId));

  if (!raw) return { count: 0, lastReviewDate: null };

  try {
    const parsed = JSON.parse(raw);

    return {
      count: typeof parsed?.count === "number" ? parsed.count : 0,
      lastReviewDate:
        typeof parsed?.lastReviewDate === "string"
          ? parsed.lastReviewDate
          : null,
    };
  } catch {
    return { count: 0, lastReviewDate: null };
  }
}

export function markStreakReview(
  userId: string,
  courseId: CourseId
): StreakState {
  const today = getTodayKey();
  const yesterday = getYesterdayKey();
  const current = getStreakState(userId, courseId);

  if (current.lastReviewDate === today) {
    return current;
  }

  const next: StreakState = {
    count: current.lastReviewDate === yesterday ? current.count + 1 : 1,
    lastReviewDate: today,
  };

  localStorage.setItem(streakKey(userId, courseId), JSON.stringify(next));

  return next;
}

export function getDailyGoalState(
  userId: string,
  courseId: CourseId
): DailyGoalState {
  const today = getTodayKey();
  const raw = localStorage.getItem(dailyGoalKey(userId, courseId));

  if (!raw) return { date: today, reviewed: 0 };

  try {
    const parsed = JSON.parse(raw);

    if (parsed?.date !== today) {
      return { date: today, reviewed: 0 };
    }

    return {
      date: today,
      reviewed: typeof parsed?.reviewed === "number" ? parsed.reviewed : 0,
    };
  } catch {
    return { date: today, reviewed: 0 };
  }
}

export function markDailyGoalReview(
  userId: string,
  courseId: CourseId
): DailyGoalState {
  const current = getDailyGoalState(userId, courseId);

  const next: DailyGoalState = {
    date: getTodayKey(),
    reviewed: current.reviewed + 1,
  };

  localStorage.setItem(dailyGoalKey(userId, courseId), JSON.stringify(next));

  return next;
}

export function getXpState(userId: string, courseId?: CourseId): XpState {
  const globalRaw = localStorage.getItem(xpKey(userId));

  if (globalRaw) {
    try {
      const parsed = JSON.parse(globalRaw);

      return {
        totalXp: typeof parsed?.totalXp === "number" ? parsed.totalXp : 0,
      };
    } catch {
      return { totalXp: 0 };
    }
  }

  // Best-effort migration from old per-course XP key to global XP key.
  if (courseId) {
    const legacyRaw = localStorage.getItem(legacyCourseXpKey(userId, courseId));

    if (legacyRaw) {
      try {
        const parsed = JSON.parse(legacyRaw);
        const migrated: XpState = {
          totalXp: typeof parsed?.totalXp === "number" ? parsed.totalXp : 0,
        };

        localStorage.setItem(xpKey(userId), JSON.stringify(migrated));
        emitXpChanged();

        return migrated;
      } catch {
        return { totalXp: 0 };
      }
    }
  }

  return { totalXp: 0 };
}

export function setXpState(
  userId: string,
  state: XpState,
  options?: { emit?: boolean }
): XpState {
  const safeState: XpState = {
    totalXp: Math.max(0, Math.floor(state.totalXp || 0)),
  };

  localStorage.setItem(xpKey(userId), JSON.stringify(safeState));

  if (options?.emit !== false) {
    emitXpChanged();
  }

  return safeState;
}

export function addXp(
  userId: string,
  amount: number,
  courseId?: CourseId
): XpState {
  const current = getXpState(userId, courseId);

  const next: XpState = {
    totalXp: Math.max(0, current.totalXp + amount),
  };

  return setXpState(userId, next);
}

export function getDailyState(
  userId: string,
  courseId: CourseId
): { date: string; count: number } {
  const raw = localStorage.getItem(dailyKey(userId, courseId));

  if (!raw) return { date: getTodayKey(), count: 0 };

  try {
    const parsed = JSON.parse(raw);

    return {
      date: typeof parsed?.date === "string" ? parsed.date : getTodayKey(),
      count: typeof parsed?.count === "number" ? parsed.count : 0,
    };
  } catch {
    return { date: getTodayKey(), count: 0 };
  }
}

export function setDailyState(
  userId: string,
  courseId: CourseId,
  count: number
) {
  localStorage.setItem(
    dailyKey(userId, courseId),
    JSON.stringify({ date: getTodayKey(), count })
  );
}

export function getDailySession(
  userId: string,
  courseId: CourseId
): DailySession | null {
  const raw = localStorage.getItem(dailySessionKey(userId, courseId));

  if (!raw) return null;

  try {
    const s = JSON.parse(raw);

    if (typeof s?.date === "string" && Array.isArray(s?.ids)) return s;

    return null;
  } catch {
    return null;
  }
}

export function setDailySession(
  userId: string,
  courseId: CourseId,
  ids: string[]
) {
  localStorage.setItem(
    dailySessionKey(userId, courseId),
    JSON.stringify({ date: getTodayKey(), ids })
  );
}

export function removeFromDailySession(
  userId: string,
  courseId: CourseId,
  id: string
) {
  const saved = getDailySession(userId, courseId);

  if (!saved) return;
  if (saved.date !== getTodayKey()) return;

  const nextIds = saved.ids.filter((x) => x !== id);

  setDailySession(userId, courseId, nextIds);
}

export function loadDb(
  userId: string,
  courseId: CourseId
): Record<string, SrsState> {
  if (courseId === "sk") {
    try {
      const newKey = srsKey(userId, courseId);
      const hasNew = !!localStorage.getItem(newKey);

      if (!hasNew) {
        const legacyRaw = localStorage.getItem(legacySrsKey(userId));

        if (legacyRaw) {
          localStorage.setItem(newKey, legacyRaw);
          localStorage.removeItem(legacySrsKey(userId));
        }
      }

      const newDailyKey = dailyKey(userId, courseId);
      const hasDailyNew = !!localStorage.getItem(newDailyKey);

      if (!hasDailyNew) {
        const legacyRaw = localStorage.getItem(legacyDailyKey(userId));

        if (legacyRaw) {
          localStorage.setItem(newDailyKey, legacyRaw);
          localStorage.removeItem(legacyDailyKey(userId));
        }
      }

      const newSessionKey = dailySessionKey(userId, courseId);
      const hasSessionNew = !!localStorage.getItem(newSessionKey);

      if (!hasSessionNew) {
        const legacyRaw = localStorage.getItem(legacyDailySessionKey(userId));

        if (legacyRaw) {
          localStorage.setItem(newSessionKey, legacyRaw);
          localStorage.removeItem(legacyDailySessionKey(userId));
        }
      }
    } catch {
      // legacy migration is best-effort only
    }
  }

  try {
    return JSON.parse(localStorage.getItem(srsKey(userId, courseId)) || "{}");
  } catch {
    return {};
  }
}

export function saveDb(
  userId: string,
  courseId: CourseId,
  db: Record<string, SrsState>
) {
  localStorage.setItem(srsKey(userId, courseId), JSON.stringify(db));
  window.dispatchEvent(new CustomEvent("slovakStudy:srsChanged"));
  window.dispatchEvent(new Event("storage"));
}
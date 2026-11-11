import type { DailyCourse } from "./question-bank";

export type DailyStats = {
  lastDate: string;
  streak: number;
  bestStreak: number;
  sessions: number;
  results: Record<string, number>;
};

export const STORE_PREFIX = "flunio.daily.v1";
export const EMPTY: DailyStats = { lastDate: "", streak: 0, bestStreak: 0, sessions: 0, results: {} };

export function localIsoDay() {
  const date = new Date();
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

export function yesterdayOf(day: string) {
  return new Date(Date.parse(`${day}T00:00:00Z`) - 86400000).toISOString().slice(0, 10);
}

export function readStats(course: DailyCourse): DailyStats {
  try {
    const data = JSON.parse(window.localStorage.getItem(`${STORE_PREFIX}.${course}`) || "null") as Partial<DailyStats> | null;
    if (!data || typeof data !== "object") return { ...EMPTY };
    const results = data.results && typeof data.results === "object" ? data.results : {};
    return {
      lastDate: typeof data.lastDate === "string" ? data.lastDate : "",
      streak: Number.isInteger(data.streak) && (data.streak ?? 0) >= 0 ? data.streak! : 0,
      bestStreak: Number.isInteger(data.bestStreak) && (data.bestStreak ?? 0) >= 0 ? data.bestStreak! : 0,
      sessions: Number.isInteger(data.sessions) && (data.sessions ?? 0) >= 0 ? data.sessions! : 0,
      results,
    };
  } catch { return { ...EMPTY }; }
}

export function saveStats(course: DailyCourse, oldStats: DailyStats, day: string, score: number): DailyStats {
  if (Object.prototype.hasOwnProperty.call(oldStats.results, day)) return oldStats;
  const streak = oldStats.lastDate === yesterdayOf(day) ? oldStats.streak + 1 : 1;
  const results = { ...oldStats.results, [day]: score };
  // Keep local storage bounded; cumulative sessions and streak are preserved separately.
  const allDays = Object.keys(results).sort();
  allDays.slice(0, Math.max(0, allDays.length - 90)).forEach((d) => delete results[d]);
  const updated: DailyStats = {
    lastDate: day,
    streak,
    bestStreak: Math.max(oldStats.bestStreak, streak),
    sessions: oldStats.sessions + 1,
    results,
  };
  try { window.localStorage.setItem(`${STORE_PREFIX}.${course}`, JSON.stringify(updated)); } catch { /* private mode / quota */ }
  return updated;
}


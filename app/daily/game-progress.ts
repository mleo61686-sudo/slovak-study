import type { DailyCourse } from "./question-bank";
import type { Level } from "./game-data";
import { localIsoDay, yesterdayOf } from "./progress";

export type Result = { score: number; total: number; finishedAt: string };
export type Stats = {
  lastDate: string;
  streak: number;
  bestStreak: number;
  activeDays: number;
  results: Record<string, Partial<Record<Level, Result>>>;
};
export type Draft = { step: number; score: number; mistakes: number; date: string };
const PREFIX = "flunio.daily.v2";
export const EMPTY_STATS: Stats = {lastDate: "", streak: 0, bestStreak: 0, activeDays: 0, results: {}};
const isValidDay = (day: string) => /^\d{4}-\d{2}-\d{2}$/.test(day);
const nonnegative = (value: unknown) => typeof value === "number" && Number.isInteger(value) && value >= 0;

export { localIsoDay, yesterdayOf };

export function readGameStats(course: DailyCourse): Stats {
  if (typeof window === "undefined") return {...EMPTY_STATS, results:{}};
  try {
    const raw = window.localStorage.getItem(`${PREFIX}.stats.${course}`);
    if (!raw) {
      // Prior Flunio Daily used v1; preserve its streak, without incorrectly treating
      // a 3-question result as having completed the new 12-stage game.
      const v1Raw = window.localStorage.getItem(`flunio.daily.v1.${course}`);
      if (!v1Raw) return {...EMPTY_STATS, results:{}};
      const v1 = JSON.parse(v1Raw) as Record<string, unknown>;
      return {lastDate: typeof v1.lastDate === "string" ? v1.lastDate : "", streak: nonnegative(v1.streak) ? v1.streak as number : 0,
        bestStreak: nonnegative(v1.bestStreak) ? v1.bestStreak as number : 0, activeDays: nonnegative(v1.sessions) ? v1.sessions as number : 0, results:{}};
    }
    const data = JSON.parse(raw) as Partial<Stats>;
    return {
      lastDate: typeof data.lastDate === "string" && isValidDay(data.lastDate) ? data.lastDate : "",
      streak: nonnegative(data.streak) ? data.streak! : 0,
      bestStreak: nonnegative(data.bestStreak) ? data.bestStreak! : 0,
      activeDays: nonnegative(data.activeDays) ? data.activeDays! : 0,
      results: data.results && typeof data.results === "object" && !Array.isArray(data.results) ? data.results : {},
    };
  } catch { return {...EMPTY_STATS, results:{}}; }
}

export function readDraft(course: DailyCourse, level: Level, day: string): Draft | null {
  if (typeof window === "undefined") return null;
  try {
    const data = JSON.parse(window.localStorage.getItem(`${PREFIX}.draft.${course}.${level}`) || "null") as Partial<Draft> | null;
    if (!data || data.date !== day || !nonnegative(data.step) || data.step! >= 12 || !nonnegative(data.score) || !nonnegative(data.mistakes) || data.score! > data.step!) return null;
    return data as Draft;
  } catch { return null; }
}

export function saveDraft(course: DailyCourse, level: Level, draft: Draft) {
  try {window.localStorage.setItem(`${PREFIX}.draft.${course}.${level}`, JSON.stringify(draft));} catch { /* private mode */ }
}
export function clearDraft(course: DailyCourse, level: Level) {
  try {window.localStorage.removeItem(`${PREFIX}.draft.${course}.${level}`);} catch { /* private mode */ }
}

export function finishGame(course: DailyCourse, level: Level, day: string, score: number, total: number): Stats {
  const current = readGameStats(course);
  const existing = current.results[day]?.[level];
  // Replays keep the best score and never increment the daily streak twice.
  if (existing && existing.score >= score) {clearDraft(course, level);return current;}
  const alreadyPlayedToday = !!current.results[day] && Object.keys(current.results[day]).length > 0;
  const sameDayAsPrior = current.lastDate === day;
  const nextStreak = sameDayAsPrior ? current.streak : current.lastDate === yesterdayOf(day) ? current.streak + 1 : 1;
  const results = {...current.results, [day]: {...(current.results[day] || {}), [level]: {score, total, finishedAt: new Date().toISOString()}}};
  const orderedDays = Object.keys(results).sort();
  orderedDays.slice(0, Math.max(0, orderedDays.length - 120)).forEach((oldDay) => delete results[oldDay]);
  const next: Stats = { lastDate: day, streak: nextStreak, bestStreak: Math.max(current.bestStreak,nextStreak),
    activeDays: current.activeDays + (alreadyPlayedToday || sameDayAsPrior ? 0 : 1), results};
  try {window.localStorage.setItem(`${PREFIX}.stats.${course}`, JSON.stringify(next));} catch { /* private mode */ }
  clearDraft(course, level);
  return next;
}
export function effectiveStreak(stats: Stats, today: string) {
  return stats.lastDate === today || stats.lastDate === yesterdayOf(today) ? stats.streak : 0;
}

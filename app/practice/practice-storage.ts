import type { PracticeStats } from "./practice-types";

const LS_KEY = "slovakStudy.practiceStats.v2";
const LEGACY_LS_KEY = "slovakStudy.practiceStats.v1";

const EMPTY_STATS: PracticeStats = {
  bestAccuracyPct: 0,
  bestStreak: 0,
  bestScore: 0,
  bestBlitzPoints: 0,
};

function parseStats(raw: string | null): PracticeStats | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return {
      bestAccuracyPct: Number(parsed?.bestAccuracyPct) || 0,
      bestStreak: Number(parsed?.bestStreak) || 0,
      bestScore: Number(parsed?.bestScore) || 0,
      bestBlitzPoints: Number(parsed?.bestBlitzPoints) || 0,
    };
  } catch {
    return null;
  }
}

export function loadStats(): PracticeStats {
  if (typeof window === "undefined") return EMPTY_STATS;

  const current = parseStats(window.localStorage.getItem(LS_KEY));
  if (current) return current;

  const legacy = parseStats(window.localStorage.getItem(LEGACY_LS_KEY));
  return legacy ?? EMPTY_STATS;
}

export function saveStats(next: PracticeStats) {
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch {}
}
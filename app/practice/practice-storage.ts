import type { PracticeStats } from "./practice-types";

const LS_KEY = "slovakStudy.practiceStats.v1";

export function loadStats(): PracticeStats {
  if (typeof window === "undefined") {
    return { bestAccuracyPct: 0, bestStreak: 0, bestScore: 0 };
  }

  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return { bestAccuracyPct: 0, bestStreak: 0, bestScore: 0 };

    const parsed = JSON.parse(raw);
    return {
      bestAccuracyPct: Number(parsed?.bestAccuracyPct) || 0,
      bestStreak: Number(parsed?.bestStreak) || 0,
      bestScore: Number(parsed?.bestScore) || 0,
    };
  } catch {
    return { bestAccuracyPct: 0, bestStreak: 0, bestScore: 0 };
  }
}

export function saveStats(next: PracticeStats) {
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch {}
}
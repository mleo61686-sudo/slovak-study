export type SrsState = {
  id: string;        // word.sk
  dueAt: number;     // timestamp
  interval: number;  // days
  ease: number;      // 1.3..2.7
  reps: number;      // how many successful reviews
  lapses: number;    // failures
  lastGrade?: "again" | "hard" | "good" | "easy";
};

export type WordLike = { sk: string; ua?: string; ru?: string };

export const SRS_KEY = "slovakStudy.srsWords";

export function loadDb(): Record<string, SrsState> {
  try {
    return JSON.parse(localStorage.getItem(SRS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveDb(db: Record<string, SrsState>) {
  localStorage.setItem(SRS_KEY, JSON.stringify(db));
}

export function nowMs() {
  return Date.now();
}

function daysToMs(days: number) {
  return Math.round(days * 24 * 60 * 60 * 1000);
}

/**
 * Простий і стабільний SRS (SM-2 style):
 * grade: again | hard | good | easy
 */
export function reviewOne(
  s: SrsState,
  grade: "again" | "hard" | "good" | "easy",
  now = nowMs()
): SrsState {
  let ease = s.ease ?? 2.3;
  let interval = s.interval ?? 0;
  let reps = s.reps ?? 0;
  let lapses = s.lapses ?? 0;

  if (grade === "again") {
    lapses += 1;
    reps = Math.max(0, reps - 1);
    interval = 0; // повертаємо "з нуля"
    ease = Math.max(1.3, ease - 0.2);
    return {
      ...s,
      ease,
      interval,
      reps,
      lapses,
      lastGrade: grade,
      dueAt: now + 10 * 60 * 1000, // через 10 хв
    };
  }

  if (grade === "hard") {
    reps += 1;
    ease = Math.max(1.3, ease - 0.05);
    interval = interval <= 0 ? 1 : Math.max(1, Math.round(interval * 0.9));
    return {
      ...s,
      ease,
      interval,
      reps,
      lapses,
      lastGrade: grade,
      dueAt: now + daysToMs(interval),
    };
  }

  if (grade === "good") {
    reps += 1;
    ease = Math.min(2.7, ease + 0.02);
    if (interval <= 0) interval = 1;
    else if (interval === 1) interval = 3;
    else interval = Math.round(interval * ease);
    return {
      ...s,
      ease,
      interval,
      reps,
      lapses,
      lastGrade: grade,
      dueAt: now + daysToMs(interval),
    };
  }

  // easy
  reps += 1;
  ease = Math.min(2.7, ease + 0.08);
  if (interval <= 0) interval = 2;
  else if (interval === 1) interval = 4;
  else interval = Math.round(interval * (ease + 0.3));
  return {
    ...s,
    ease,
    interval,
    reps,
    lapses,
    lastGrade: grade,
    dueAt: now + daysToMs(interval),
  };
}

export function ensureWord(
  db: Record<string, SrsState>,
  id: string,
  now = nowMs()
) {
  if (!db[id]) {
    db[id] = {
      id,
      dueAt: now, // одразу на повторення
      interval: 0,
      ease: 2.3,
      reps: 0,
      lapses: 0,
    };
  }
}

/** Додати N випадкових слів, яких ще нема в SRS */
export function addRandomWords(
  db: Record<string, SrsState>,
  words: WordLike[],
  n: number
) {
  const pool = words
    .map((w) => w.sk)
    .filter(Boolean)
    .filter((sk) => !db[sk]);

  // перемішати
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const take = pool.slice(0, Math.min(n, pool.length));
  const now = nowMs();

  for (const id of take) {
    ensureWord(db, id, now);
  }

  return take.length;
}

export function getDueIds(db: Record<string, SrsState>, limit = 30) {
  const now = nowMs();
  return Object.values(db)
    .filter((s) => s.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt)
    .slice(0, limit)
    .map((s) => s.id);
}

/* =========================
   ✅ ЄДИНІ ПРАВИЛА СТАТУСІВ
   ========================= */

// 🔥 швидше "вивчив" (як ти хочеш): 3 успішні пригадування
export function isMastered(s: SrsState) {
  return (s.reps ?? 0) >= 3;
}

export function isLearned(s: SrsState) {
  return (s.reps ?? 0) >= 1;
}

export function computeStats(db: Record<string, SrsState>, totalWords: number) {
  const now = nowMs();
  const all = Object.values(db);

  const learned = all.filter(isLearned).length;
  const mastered = all.filter(isMastered).length;
  const due = all.filter((s) => s.dueAt <= now).length;

  return { total: totalWords, learned, mastered, due };
}
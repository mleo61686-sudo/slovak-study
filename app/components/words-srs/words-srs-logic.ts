import type { Word } from "@/app/learning/data";
import type { Lang } from "@/lib/src/language";
import {
  isLearned as _isLearned,
  isMastered as _isMastered,
} from "@/lib/srs/srsWords";

export type ReviewGrade = 0 | 1 | 2 | 3;

export type SrsState = {
  id: string;
  dueAt: number;
  interval: number;
  ease: number;
  reps: number;

  /**
   * Скільки разів користувач забував це слово.
   * Optional, щоб не зламати старі записи в localStorage.
   */
  lapses?: number;

  /**
   * Остання оцінка користувача:
   * 0 = forgot, 1 = hard, 2 = good, 3 = easy
   */
  lastGrade?: ReviewGrade;

  /**
   * Коли слово востаннє повторювали.
   */
  lastReviewedAt?: number;
};

export type Stats = {
  total: number;
  learned: number;
  mastered: number;
  due: number;
};

export const DAY = 1000 * 60 * 60 * 24;
export const DAILY_NEW_LIMIT = 30;
export const SESSION_SIZE = 30;
export const FORGOT_MINUTES = 10;
export const DAILY_REVIEW_LIMIT = 30;

const MIN_EASE = 1.3;
const MAX_EASE = 3.2;
const WEAK_EASE_LIMIT = 1.8;
const WEAK_LAPSES_LIMIT = 2;

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function initState(id: string): SrsState {
  return {
    id,
    dueAt: Date.now(),
    interval: 0,
    ease: 2.5,
    reps: 0,
    lapses: 0,
    lastGrade: undefined,
    lastReviewedAt: undefined,
  };
}

export function shuffle<T>(arr: T[]) {
  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

function clampEase(ease: number) {
  return Math.max(MIN_EASE, Math.min(MAX_EASE, ease));
}

function getSafeLapses(s: SrsState) {
  return typeof s.lapses === "number" && Number.isFinite(s.lapses)
    ? Math.max(0, s.lapses)
    : 0;
}

function getSafeReps(s: SrsState) {
  return typeof s.reps === "number" && Number.isFinite(s.reps)
    ? Math.max(0, s.reps)
    : 0;
}

function getSafeInterval(s: SrsState) {
  return typeof s.interval === "number" && Number.isFinite(s.interval)
    ? Math.max(0, s.interval)
    : 0;
}

function getSafeEase(s: SrsState) {
  return typeof s.ease === "number" && Number.isFinite(s.ease)
    ? clampEase(s.ease)
    : 2.5;
}

export function isWeakState(s: SrsState): boolean {
  const lapses = getSafeLapses(s);
  const ease = getSafeEase(s);

  return (
    lapses >= WEAK_LAPSES_LIMIT ||
    s.lastGrade === 0 ||
    ease <= WEAK_EASE_LIMIT
  );
}

/**
 * Покращена SRS-логіка.
 *
 * Ідея:
 * - forgot сильно карає слово і робить його weak
 * - hard не дає інтервалу швидко рости
 * - good росте нормально
 * - easy росте швидше, але weak-слова не відлітають далеко
 *
 * Нові поля optional, тому старі записи з localStorage не ламаються.
 */
export function applyReview(prev: SrsState, grade: ReviewGrade): SrsState {
  const now = Date.now();

  let ease = getSafeEase(prev);
  let interval = getSafeInterval(prev);
  let reps = getSafeReps(prev);
  let lapses = getSafeLapses(prev);

  if (grade === 0) {
    lapses += 1;

    return {
      ...prev,
      reps: 0,
      interval: 0,
      ease: clampEase(ease - 0.25),
      lapses,
      lastGrade: grade,
      lastReviewedAt: now,
      dueAt: now + FORGOT_MINUTES * 60 * 1000,
    };
  }

  const wasWeak =
    lapses >= WEAK_LAPSES_LIMIT || prev.lastGrade === 0 || ease <= WEAK_EASE_LIMIT;

  if (grade === 1) {
    ease -= 0.2;
  }

  if (grade === 2) {
    ease += wasWeak ? 0.02 : 0.05;
  }

  if (grade === 3) {
    ease += wasWeak ? 0.05 : 0.15;
  }

  ease = clampEase(ease);
  reps += 1;

  if (reps === 1) {
    if (grade === 1) interval = 1;
    else if (grade === 2) interval = wasWeak ? 1 : 2;
    else interval = wasWeak ? 2 : 3;
  } else if (reps === 2) {
    if (grade === 1) interval = 1;
    else if (grade === 2) interval = wasWeak ? 2 : 3;
    else interval = wasWeak ? 3 : 5;
  } else {
    const multiplier =
      grade === 1 ? 0.75 : grade === 2 ? 1 : wasWeak ? 1.15 : 1.35;

    interval = Math.max(1, Math.round(interval * ease * multiplier));
  }

  if (grade === 1) {
    interval = Math.max(1, Math.round(interval * 0.55));
  }

  /**
   * Weak-слова не повинні одразу відлітати на місяць.
   * Це головна практична зміна, яка робить тренер кориснішим.
   */
  if (wasWeak) {
    if (grade === 1) interval = Math.min(interval, 2);
    if (grade === 2) interval = Math.min(interval, 5);
    if (grade === 3) interval = Math.min(interval, 10);
  }

  /**
   * Якщо людина кілька разів відповідає добре/легко,
   * слово поступово виходить із weak-стану.
   */
  if (lapses > 0 && grade >= 2) {
    lapses = Math.max(0, lapses - 1);
  }

  return {
    ...prev,
    ease,
    reps,
    interval,
    lapses,
    lastGrade: grade,
    lastReviewedAt: now,
    dueAt: now + interval * DAY,
  };
}

const isLearned = (s: SrsState) => _isLearned(s as never);
const isMastered = (s: SrsState) => _isMastered(s as never);

export function computeStats(
  db: Record<string, SrsState>,
  totalWords: number
): Stats {
  const now = Date.now();
  const all = Object.values(db);

  const learned = all.filter(isLearned).length;
  const mastered = all.filter(isMastered).length;
  const due = all.filter((s) => s.dueAt <= now).length;

  return { total: totalWords, learned, mastered, due };
}

export function getTerm(w: Word): string {
  return String((w as { term?: string; sk?: string }).term ?? w.sk ?? "").trim();
}

export function getTranslation(w: Word, lang: Lang): string {
  if (lang === "ru") return w.ru ?? w.ua ?? "";
  if (lang === "en") return w.en ?? w.ua ?? "";
  return w.ua ?? "";
}

export function getDueSorted(
  words: Word[],
  db: Record<string, SrsState>
): Word[] {
  const now = Date.now();

  return words
    .map((w) => {
      const id = getTerm(w);
      return { w, id };
    })
    .filter((x) => !!x.id && !!db[x.id])
    .map((x) => ({ w: x.w, id: x.id, dueAt: db[x.id]!.dueAt }))
    .filter((x) => x.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt)
    .map((x) => x.w);
}

/**
 * Слова, які користувач часто забуває.
 * Поки що це helper для майбутнього блоку "Слабкі слова".
 * Його можна буде використати в UI без зміни localStorage.
 */
export function getWeakSorted(
  words: Word[],
  db: Record<string, SrsState>
): Word[] {
  return words
    .map((w) => {
      const id = getTerm(w);
      const state = id ? db[id] : undefined;

      return { w, id, state };
    })
    .filter(
      (x): x is { w: Word; id: string; state: SrsState } =>
        !!x.id && !!x.state && isWeakState(x.state)
    )
    .sort((a, b) => {
      const aLapses = getSafeLapses(a.state);
      const bLapses = getSafeLapses(b.state);

      if (aLapses !== bLapses) return bLapses - aLapses;

      return a.state.dueAt - b.state.dueAt;
    })
    .map((x) => x.w);
}

/**
 * Розумна сесія для майбутнього апгрейду:
 * - спочатку due words
 * - потім weak words
 * - без дублікатів
 */
export function getSmartReviewSession(
  words: Word[],
  db: Record<string, SrsState>,
  limit = SESSION_SIZE
): Word[] {
  const result: Word[] = [];
  const used = new Set<string>();

  const add = (w: Word) => {
    const id = getTerm(w);

    if (!id || used.has(id)) return;
    if (result.length >= limit) return;

    used.add(id);
    result.push(w);
  };

  getDueSorted(words, db).forEach(add);
  getWeakSorted(words, db).forEach(add);

  return result;
}
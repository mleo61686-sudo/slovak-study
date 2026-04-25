import type { Word } from "@/app/learning/data";
import type { Lang } from "@/lib/src/language";
import {
  isLearned as _isLearned,
  isMastered as _isMastered,
} from "@/lib/srs/srsWords";

export type SrsState = {
  id: string;
  dueAt: number;
  interval: number;
  ease: number;
  reps: number;
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

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function initState(id: string): SrsState {
  return { id, dueAt: Date.now(), interval: 0, ease: 2.5, reps: 0 };
}

export function shuffle<T>(arr: T[]) {
  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

export function applyReview(prev: SrsState, grade: 0 | 1 | 2 | 3): SrsState {
  let { ease, interval, reps } = prev;

  if (grade === 0) {
    return {
      ...prev,
      reps: 0,
      interval: 0,
      ease: Math.max(1.3, ease - 0.2),
      dueAt: Date.now() + FORGOT_MINUTES * 60 * 1000,
    };
  }

  if (grade === 1) ease -= 0.15;
  if (grade === 2) ease += 0.05;
  if (grade === 3) ease += 0.15;

  ease = Math.max(1.3, Math.min(3.2, ease));
  reps++;

  if (reps === 1) {
    if (grade === 1) interval = 1;
    else if (grade === 2) interval = 2;
    else interval = 3;
  } else if (reps === 2) {
    interval = 3;
  } else {
    interval = Math.max(1, Math.round(interval * ease));
  }

  if (grade === 1 && reps > 1) {
    interval = Math.max(1, Math.round(interval * 0.6));
  }

  return {
    ...prev,
    ease,
    reps,
    interval,
    dueAt: Date.now() + interval * DAY,
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
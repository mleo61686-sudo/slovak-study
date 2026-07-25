import type { CourseId } from "@/app/learning/courses/registry";
import type { Mode } from "./practice-types";

export const PRACTICE_MISTAKES_VERSION = 1;
export const MISTAKE_CORRECT_STREAK_TO_RESOLVE = 3;
export const MAX_STORED_MISTAKES = 500;

export type PracticeMistakeRecord = {
  id: string;
  courseId: CourseId;
  sk: string;
  ua: string;
  ru: string;
  en: string;
  mode: Mode;
  wrongCount: number;
  correctStreak: number;
  lastAnswer?: string;
  createdAt: string;
  lastWrongAt: string;
  updatedAt: string;
  resolvedAt?: string | null;
};

export type PracticeMistakeStore = {
  version: typeof PRACTICE_MISTAKES_VERSION;
  updatedAt: string;
  items: PracticeMistakeRecord[];
};

export type MistakeInput = {
  courseId: CourseId;
  sk: string;
  ua: string;
  ru: string;
  en: string;
  mode: Mode;
  your?: string;
};

function safeIso(value: unknown, fallback: string): string {
  if (typeof value !== "string" || !value.trim()) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

function safeCourseId(value: unknown, fallback: CourseId): CourseId {
  return value === "cs" || value === "pl" || value === "sk" ? value : fallback;
}

function safeMode(value: unknown): Mode {
  return value === "typing" || value === "listening" ? value : "mcq";
}

function safeText(value: unknown, maxLength = 500): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeMistakeTerm(term: string): string {
  return term.normalize("NFC").trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

export function makeMistakeId(courseId: CourseId, term: string): string {
  return `${courseId}:${normalizeMistakeTerm(term)}`;
}

export function createEmptyMistakeStore(now = new Date().toISOString()): PracticeMistakeStore {
  return {
    version: PRACTICE_MISTAKES_VERSION,
    updatedAt: now,
    items: [],
  };
}

export function normalizeMistakeStore(
  raw: unknown,
  fallbackCourseId: CourseId = "sk"
): PracticeMistakeStore {
  const now = new Date().toISOString();
  const source = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const rawItems = Array.isArray(source.items) ? source.items : [];
  const byId = new Map<string, PracticeMistakeRecord>();

  for (const rawItem of rawItems.slice(0, MAX_STORED_MISTAKES * 2)) {
    if (!rawItem || typeof rawItem !== "object") continue;
    const item = rawItem as Record<string, unknown>;
    const courseId = safeCourseId(item.courseId, fallbackCourseId);
    const sk = safeText(item.sk);
    const ua = safeText(item.ua);
    const ru = safeText(item.ru) || ua;
    const en = safeText(item.en) || ua;

    if (!sk || !ua) continue;

    const id = makeMistakeId(courseId, sk);
    const createdAt = safeIso(item.createdAt, now);
    const updatedAt = safeIso(item.updatedAt, createdAt);
    const lastWrongAt = safeIso(item.lastWrongAt, updatedAt);
    const resolvedAt = item.resolvedAt ? safeIso(item.resolvedAt, updatedAt) : null;

    const record: PracticeMistakeRecord = {
      id,
      courseId,
      sk,
      ua,
      ru,
      en,
      mode: safeMode(item.mode),
      wrongCount: Math.max(1, Math.floor(Number(item.wrongCount) || 1)),
      correctStreak: Math.max(
        0,
        Math.min(
          MISTAKE_CORRECT_STREAK_TO_RESOLVE,
          Math.floor(Number(item.correctStreak) || 0)
        )
      ),
      lastAnswer: safeText(item.lastAnswer) || undefined,
      createdAt,
      lastWrongAt,
      updatedAt,
      resolvedAt,
    };

    const existing = byId.get(id);
    if (!existing || Date.parse(existing.updatedAt) <= Date.parse(record.updatedAt)) {
      byId.set(id, record);
    }
  }

  const items = [...byId.values()]
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, MAX_STORED_MISTAKES);

  const latestItemAt = items.reduce(
    (latest, item) => Math.max(latest, Date.parse(item.updatedAt) || 0),
    0
  );
  const fallbackUpdatedAt = latestItemAt ? new Date(latestItemAt).toISOString() : now;
  const storeUpdatedAt = safeIso(source.updatedAt, fallbackUpdatedAt);
  const updatedTimestamp = Math.max(Date.parse(storeUpdatedAt) || 0, latestItemAt);
  const updatedAt = new Date(updatedTimestamp || Date.parse(now)).toISOString();

  return {
    version: PRACTICE_MISTAKES_VERSION,
    updatedAt,
    items,
  };
}

export function mergeMistakeStores(
  first: PracticeMistakeStore,
  second: PracticeMistakeStore,
  fallbackCourseId: CourseId = "sk"
): PracticeMistakeStore {
  const a = normalizeMistakeStore(first, fallbackCourseId);
  const b = normalizeMistakeStore(second, fallbackCourseId);
  const byId = new Map<string, PracticeMistakeRecord>();

  for (const item of [...a.items, ...b.items]) {
    const existing = byId.get(item.id);
    if (!existing || Date.parse(existing.updatedAt) <= Date.parse(item.updatedAt)) {
      byId.set(item.id, item);
    }
  }

  return normalizeMistakeStore(
    {
      version: PRACTICE_MISTAKES_VERSION,
      updatedAt:
        Date.parse(a.updatedAt) >= Date.parse(b.updatedAt) ? a.updatedAt : b.updatedAt,
      items: [...byId.values()],
    },
    fallbackCourseId
  );
}

export function recordPracticeMistake(
  store: PracticeMistakeStore,
  input: MistakeInput,
  now = new Date().toISOString()
): PracticeMistakeStore {
  const normalized = normalizeMistakeStore(store, input.courseId);
  const id = makeMistakeId(input.courseId, input.sk);
  const current = normalized.items.find((item) => item.id === id);

  const nextItem: PracticeMistakeRecord = current
    ? {
        ...current,
        sk: input.sk.trim(),
        ua: input.ua.trim(),
        ru: input.ru.trim() || input.ua.trim(),
        en: input.en.trim() || input.ua.trim(),
        mode: input.mode,
        wrongCount: current.wrongCount + 1,
        correctStreak: 0,
        lastAnswer: input.your?.trim() || undefined,
        lastWrongAt: now,
        updatedAt: now,
        resolvedAt: null,
      }
    : {
        id,
        courseId: input.courseId,
        sk: input.sk.trim(),
        ua: input.ua.trim(),
        ru: input.ru.trim() || input.ua.trim(),
        en: input.en.trim() || input.ua.trim(),
        mode: input.mode,
        wrongCount: 1,
        correctStreak: 0,
        lastAnswer: input.your?.trim() || undefined,
        createdAt: now,
        lastWrongAt: now,
        updatedAt: now,
        resolvedAt: null,
      };

  return normalizeMistakeStore(
    {
      ...normalized,
      updatedAt: now,
      items: [nextItem, ...normalized.items.filter((item) => item.id !== id)],
    },
    input.courseId
  );
}

export function recordCorrectMistakeAnswer(
  store: PracticeMistakeStore,
  courseId: CourseId,
  term: string,
  now = new Date().toISOString()
): {
  store: PracticeMistakeStore;
  changed: boolean;
  resolvedNow: boolean;
} {
  const normalized = normalizeMistakeStore(store, courseId);
  const id = makeMistakeId(courseId, term);
  const current = normalized.items.find((item) => item.id === id);

  if (!current || current.resolvedAt) {
    return { store: normalized, changed: false, resolvedNow: false };
  }

  const nextCorrectStreak = Math.min(
    MISTAKE_CORRECT_STREAK_TO_RESOLVE,
    current.correctStreak + 1
  );
  const resolvedNow = nextCorrectStreak >= MISTAKE_CORRECT_STREAK_TO_RESOLVE;
  const nextItem: PracticeMistakeRecord = {
    ...current,
    correctStreak: nextCorrectStreak,
    updatedAt: now,
    resolvedAt: resolvedNow ? now : null,
  };

  return {
    changed: true,
    resolvedNow,
    store: normalizeMistakeStore(
      {
        ...normalized,
        updatedAt: now,
        items: [nextItem, ...normalized.items.filter((item) => item.id !== id)],
      },
      courseId
    ),
  };
}

export function reopenMistake(
  store: PracticeMistakeStore,
  courseId: CourseId,
  term: string,
  now = new Date().toISOString()
): PracticeMistakeStore {
  const normalized = normalizeMistakeStore(store, courseId);
  const id = makeMistakeId(courseId, term);
  const current = normalized.items.find((item) => item.id === id);
  if (!current) return normalized;

  return normalizeMistakeStore(
    {
      ...normalized,
      updatedAt: now,
      items: [
        {
          ...current,
          correctStreak: 0,
          resolvedAt: null,
          updatedAt: now,
        },
        ...normalized.items.filter((item) => item.id !== id),
      ],
    },
    courseId
  );
}

export function getActiveMistakes(
  store: PracticeMistakeStore,
  courseId?: CourseId
): PracticeMistakeRecord[] {
  return normalizeMistakeStore(store, courseId ?? "sk").items
    .filter((item) => !item.resolvedAt && (!courseId || item.courseId === courseId))
    .sort((a, b) => {
      if (b.wrongCount !== a.wrongCount) return b.wrongCount - a.wrongCount;
      return Date.parse(b.lastWrongAt) - Date.parse(a.lastWrongAt);
    });
}

export function getResolvedMistakes(
  store: PracticeMistakeStore,
  courseId?: CourseId
): PracticeMistakeRecord[] {
  return normalizeMistakeStore(store, courseId ?? "sk").items
    .filter((item) => !!item.resolvedAt && (!courseId || item.courseId === courseId))
    .sort((a, b) => Date.parse(b.resolvedAt ?? b.updatedAt) - Date.parse(a.resolvedAt ?? a.updatedAt));
}

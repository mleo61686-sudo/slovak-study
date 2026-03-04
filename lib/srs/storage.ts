import { initState } from "./algorithm";
import { SrsState } from "./types";
import { COURSE_STORAGE_KEY, getDefaultCourse, type CourseId } from "@/lib/course";

const LEGACY_KEY = "slovak-srs"; // старий ключ (без userId/курсу)
const KEY_BASE = "slovakStudy.srsWords"; // новий базовий ключ

export type WordLike = { term?: string; sk?: string };

// ---------- helpers ----------
function getActiveCourseId(): CourseId {
  if (typeof window === "undefined") return getDefaultCourse();
  try {
    const raw = localStorage.getItem(COURSE_STORAGE_KEY) as CourseId | null;
    return raw ?? getDefaultCourse();
  } catch {
    return getDefaultCourse();
  }
}

export function getSrsKey(userId: string, courseId: CourseId) {
  return `${KEY_BASE}:${userId}:${courseId}`;
}

function getWordId(w: WordLike): string {
  const term = typeof w.term === "string" ? w.term.trim() : "";
  if (term) return term;

  const sk = typeof w.sk === "string" ? w.sk.trim() : "";
  return sk;
}

/**
 * ✅ Міграція: зі старого LEGACY_KEY ("slovak-srs")
 * → у новий ключ для userId + courseId ("slovakStudy.srsWords:<uid>:<course>")
 *
 * Робимо тільки 1 раз:
 * - лише якщо courseId === "sk"
 * - лише якщо нового ключа ще нема
 */
export function migrateLegacyIfNeeded(userId: string, courseId: CourseId) {
  if (typeof window === "undefined") return;

  // тільки для словацького курсу
  if (courseId !== "sk") return;

  try {
    const newKey = getSrsKey(userId, courseId);
    const hasNew = !!localStorage.getItem(newKey);
    if (hasNew) return;

    const oldRaw = localStorage.getItem(LEGACY_KEY);
    if (!oldRaw) return;

    localStorage.setItem(newKey, oldRaw);
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    // ignore
  }
}

// ---------- public API ----------
export function loadSrs(userId: string, courseId?: CourseId): Record<string, SrsState> {
  if (typeof window === "undefined") return {};
  const cid = courseId ?? getActiveCourseId();

  migrateLegacyIfNeeded(userId, cid);

  try {
    return JSON.parse(localStorage.getItem(getSrsKey(userId, cid)) || "{}");
  } catch {
    return {};
  }
}

export function saveSrs(userId: string, data: Record<string, SrsState>, courseId?: CourseId) {
  if (typeof window === "undefined") return;
  const cid = courseId ?? getActiveCourseId();

  localStorage.setItem(getSrsKey(userId, cid), JSON.stringify(data));
}

export function getState(userId: string, id: string, courseId?: CourseId): SrsState {
  const cid = courseId ?? getActiveCourseId();
  const db = loadSrs(userId, cid);

  const key = String(id || "").trim();
  if (!key) return initState("");

  if (!db[key]) {
    db[key] = initState(key);
    saveSrs(userId, db, cid);
  }

  return db[key];
}

/**
 * ✅ Повертає слова, що "due" (готові до повторення)
 * Працює і з {sk}, і з {term}, і з обома.
 */
export function getDueWords(
  userId: string,
  words: WordLike[],
  courseId?: CourseId
) {
  const cid = courseId ?? getActiveCourseId();
  const db = loadSrs(userId, cid);
  const now = Date.now();

  return words.filter((w) => {
    const id = getWordId(w);
    if (!id) return false;
    const s = db[id] || initState(id);
    return s.dueAt <= now;
  });
}
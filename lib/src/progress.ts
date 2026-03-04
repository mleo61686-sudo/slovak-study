// lib/src/progress.ts
import { COURSE_STORAGE_KEY, getDefaultCourse, type CourseId } from "@/lib/course";

// ===== Lessons progress =====
export type LessonProgressObj = {
  done?: boolean;

  // ✅ NEW: дата завершення уроку (для streak/records)
  doneAt?: string; // "YYYY-MM-DD"

  lastCorrect?: number;
  lastWrong?: number;
  lastTotal?: number;

  bestCorrect?: number;
  bestTotal?: number;

  attempts?: number;
  updatedAt?: string; // ISO string
};

export type LessonProgressValue = boolean | LessonProgressObj;
export type LessonsProgress = Record<string, LessonProgressValue>;

// ===== SRS прогрес =====
export type SrsProgress = Record<string, any>;

// ===== Загальний прогрес додатку =====
export type AppProgress = {
  version: 1;
  updatedAt: number; // Date.now()
  lessons: LessonsProgress;
  srs: SrsProgress;
};

// ✅ Хто “активний” користувач (ставимо в ProgressSync після GET /api/progress)
const ACTIVE_USER_KEY = "slovakStudy.activeUserId";

// ✅ База ключа
const BASE = "progress";

// ✅ Гість (щоб не змішувалось з юзерами)
const GUEST_ID = "guest";

function safeDispatchStorage() {
  if (typeof window === "undefined") return;
  try {
    // storage event не спрацьовує в цій же вкладці сам по собі
    window.dispatchEvent(new Event("storage"));
  } catch {}
}

function getActiveUserId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(ACTIVE_USER_KEY);
    return v && v.trim() ? v : null;
  } catch {
    return null;
  }
}

function getActiveCourseId(): CourseId {
  if (typeof window === "undefined") return getDefaultCourse();
  try {
    const raw = localStorage.getItem(COURSE_STORAGE_KEY) as CourseId | null;
    return raw ?? getDefaultCourse();
  } catch {
    return getDefaultCourse();
  }
}

// ✅ ВИКЛИКАЙ ЦЕ з ProgressSync після того як отримав userId з /api/progress
export function setActiveUserId(userId: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (!userId) localStorage.removeItem(ACTIVE_USER_KEY);
    else localStorage.setItem(ACTIVE_USER_KEY, userId);
  } catch {}
  // 🔥 важливо: повідомляємо UI одразу
  safeDispatchStorage();
}

function storageKeyFor(userId?: string | null, courseId?: CourseId) {
  const uid = userId && userId.trim() ? userId.trim() : GUEST_ID;
  const c = courseId ?? getActiveCourseId();
  return `slovakStudy.${uid}.${BASE}.${c}`; // slovakStudy.<uid>.progress.<course>
}

function legacyStorageKeyFor(userId?: string | null) {
  const uid = userId && userId.trim() ? userId.trim() : GUEST_ID;
  return `slovakStudy.${uid}.${BASE}`; // старий ключ без курсу
}

export function emptyProgress(): AppProgress {
  return {
    version: 1,
    updatedAt: Date.now(),
    lessons: {},
    srs: {},
  };
}

// ✅ приймає і новий формат (AppProgress), і старий (де лежав lessonsProgress напряму)
function normalizeLoaded(parsed: any): AppProgress {
  // AppProgress-like
  if (parsed && typeof parsed === "object" && "lessons" in parsed) {
    return {
      version: 1,
      updatedAt:
        typeof parsed?.updatedAt === "number" ? parsed.updatedAt : Date.now(),
      lessons:
        typeof parsed?.lessons === "object" && parsed.lessons ? parsed.lessons : {},
      srs: typeof parsed?.srs === "object" && parsed.srs ? parsed.srs : {},
    };
  }

  // Старий формат: lessonsProgress напряму
  if (parsed && typeof parsed === "object") {
    return {
      version: 1,
      updatedAt: Date.now(),
      lessons: parsed,
      srs: {},
    };
  }

  return emptyProgress();
}

export function loadProgress(): AppProgress {
  if (typeof window === "undefined") return emptyProgress();

  const uid = getActiveUserId();
  const courseId = getActiveCourseId();
  const key = storageKeyFor(uid, courseId);

  // ✅ міграція: якщо ми на sk і нового ключа ще нема, але є старий — переносимо
  if (courseId === "sk") {
    const legacyKey = legacyStorageKeyFor(uid);

    const hasNew = (() => {
      try {
        return !!localStorage.getItem(key);
      } catch {
        return false;
      }
    })();

    if (!hasNew) {
      const legacyRaw = (() => {
        try {
          return localStorage.getItem(legacyKey);
        } catch {
          return null;
        }
      })();

      if (legacyRaw) {
        try {
          localStorage.setItem(key, legacyRaw);
          localStorage.removeItem(legacyKey);
        } catch {}
      }
    }
  }

  const raw = (() => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  })();

  if (!raw) return emptyProgress();

  try {
    return normalizeLoaded(JSON.parse(raw));
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: AppProgress) {
  if (typeof window === "undefined") return;

  const uid = getActiveUserId();
  const key = storageKeyFor(uid, getActiveCourseId());

  try {
    localStorage.setItem(
      key,
      JSON.stringify({ ...p, version: 1, updatedAt: Date.now() })
    );
  } catch {}

  // 🔥 щоб UI оновився
  safeDispatchStorage();

  // 🔥 щоб ProgressSync знав, що треба відправити на сервер
  try {
    window.dispatchEvent(new Event("slovakStudy:progressChanged"));
  } catch {}
}

// ===== Lesson helpers =====
export function getLessonsProgress(): LessonsProgress {
  return loadProgress().lessons;
}

export function setLessonsProgress(lessons: LessonsProgress) {
  const p = loadProgress();
  saveProgress({ ...p, lessons });
}

export function patchLessonProgress(lessonId: string, patch: LessonProgressObj) {
  const lessons = getLessonsProgress();
  const prev = lessons[lessonId];

  const prevObj: LessonProgressObj =
    prev === true
      ? { done: true }
      : typeof prev === "object" && prev
      ? (prev as LessonProgressObj)
      : {};

  const next: LessonProgressObj = { ...prevObj, ...patch };
  setLessonsProgress({ ...lessons, [lessonId]: next });
}

export function finishLessonQuiz(
  lessonId: string,
  finalScore: number,
  total: number
) {
  const lessons = getLessonsProgress();
  const prev = lessons[lessonId];

  const prevObj: LessonProgressObj =
    prev === true
      ? { done: true }
      : typeof prev === "object" && prev
      ? (prev as LessonProgressObj)
      : {};

  const attempts = (prevObj.attempts ?? 0) + 1;
  const bestCorrect = Math.max(prevObj.bestCorrect ?? 0, finalScore);

  const now = new Date();
  const dayKey = now.toISOString().slice(0, 10);

  const next: LessonProgressObj = {
    ...prevObj,
    done: true,
    doneAt: prevObj.doneAt ?? dayKey, // ✅ якщо вже було — не перезатираємо
    lastCorrect: finalScore,
    lastTotal: total,
    lastWrong: Math.max(0, total - finalScore),
    bestCorrect,
    bestTotal: total,
    attempts,
    updatedAt: now.toISOString(),
  };

  setLessonsProgress({ ...lessons, [lessonId]: next });
}
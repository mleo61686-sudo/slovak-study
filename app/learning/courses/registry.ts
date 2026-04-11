import type { Lesson } from "../data";
import type { CefrBandId } from "./sk-lessons-by-band";
import { SK_LESSONS_BY_BAND } from "./sk-lessons-by-band";
import { LESSONS_BY_BAND_CS } from "./cs";
import { PL_LESSONS_BY_BAND } from "./pl-lessons-by-band";

/**
 * 1) Реєстр курсів (для UI перемикача, SEO, гейтів тощо)
 */
export const COURSE_REGISTRY = {
  sk: { id: "sk", title: "Slovak", emoji: "🇸🇰", status: "live" as const },
  cs: { id: "cs", title: "Czech", emoji: "🇨🇿", status: "live" as const },
  pl: { id: "pl", title: "Polish", emoji: "🇵🇱", status: "live" as const },
} as const;

export type CourseId = keyof typeof COURSE_REGISTRY; // "sk" | "cs" | "pl"
export const COURSES = Object.keys(COURSE_REGISTRY) as CourseId[];
export const DEFAULT_COURSE_ID: CourseId = "sk";

/**
 * 2) Lessons by band
 */
export type LessonsByBand = Record<CefrBandId, Lesson[]>;

function withFallback(primary: LessonsByBand, fallback: LessonsByBand): LessonsByBand {
  const out = {} as LessonsByBand;

  (Object.keys(fallback) as CefrBandId[]).forEach((band) => {
    const p = primary[band] ?? [];
    const f = fallback[band] ?? [];

    // якщо є уроки primary — ставимо їх першими,
    // а fallback додаємо як банк, щоб SRS/Practice не ламались
    out[band] = p.length > 0 ? [...p, ...f] : f;
  });

  return out;
}

export function getLessonsByBand(courseId: CourseId): LessonsByBand {
  if (courseId === "cs") return LESSONS_BY_BAND_CS as LessonsByBand;
  if (courseId === "pl") return PL_LESSONS_BY_BAND as LessonsByBand;
  return SK_LESSONS_BY_BAND;
}
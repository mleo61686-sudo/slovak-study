import type { Lesson } from "../data";
import type { CefrBandId } from "./sk-lessons-by-band";
import { SK_LESSONS_BY_BAND } from "./sk-lessons-by-band";
import { LESSONS_BY_BAND_CS } from "./cs";

export type LessonsByBand = Record<CefrBandId, Lesson[]>;

export function getLessonsByBand(courseId: "sk" | "cs" | "pl"): LessonsByBand {
  if (courseId === "cs") return LESSONS_BY_BAND_CS;
  // pl поки fallback
  return SK_LESSONS_BY_BAND;
}
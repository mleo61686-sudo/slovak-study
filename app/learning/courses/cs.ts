import type { Lesson } from "../data";
import type { CefrBandId } from "./sk-lessons-by-band";
import { CS_LESSONS_BY_BAND } from "./cs-lessons-by-band";

export const LESSONS_BY_BAND_CS: Record<CefrBandId, Lesson[]> =
  CS_LESSONS_BY_BAND as Record<CefrBandId, Lesson[]>;
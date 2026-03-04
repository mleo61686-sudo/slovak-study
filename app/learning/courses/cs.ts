import type { Lesson } from "../data";
import type { CefrBandId } from "./sk-lessons-by-band";
import { SK_LESSONS_BY_BAND } from "./sk-lessons-by-band";

export const LESSONS_BY_BAND_CS: Record<CefrBandId, Lesson[]> = SK_LESSONS_BY_BAND;
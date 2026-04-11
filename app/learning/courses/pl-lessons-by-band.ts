import type { Lesson } from "../data";
import type { CefrBandId } from "./sk-lessons-by-band";
import { PL_A0_SOURCE } from "../levels/pl-a0";
import { PL_A1_SOURCE } from "../levels/pl-a1";
import { PL_A2_SOURCE } from "../levels/pl-a2";
import { PL_B1_SOURCE } from "../levels/pl-b1";
import { PL_B2_SOURCE } from "../levels/pl-b2";

export const PL_LESSONS_BY_BAND: Record<CefrBandId, Lesson[]> = {
  a0: PL_A0_SOURCE as Lesson[],
  a1: PL_A1_SOURCE as Lesson[],
  a2: PL_A2_SOURCE as Lesson[],
  b1: PL_B1_SOURCE as Lesson[],
  b2: PL_B2_SOURCE as Lesson[],
};
import type { Lesson } from "../data";
import { A0_REAL_SOURCE } from "../levels/a0";
import { A1_ALL } from "../levels/a1";
import { A2_ALL } from "../levels/a2";
import { B1_ALL } from "../levels/b1";
import { B2_ALL } from "../levels/b2";

export type CefrBandId = "a0" | "a1" | "a2" | "b1" | "b2";

export const SK_LESSONS_BY_BAND: Record<CefrBandId, Lesson[]> = {
  a0: A0_REAL_SOURCE as any,
  a1: A1_ALL as any,
  a2: A2_ALL as any,
  b1: B1_ALL as any,
  b2: B2_ALL as any,
};
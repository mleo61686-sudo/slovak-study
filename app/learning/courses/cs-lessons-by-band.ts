import type { Lesson } from "../data";
import type { CefrBandId } from "./sk-lessons-by-band";

import { CS_A0_SOURCE } from "../levels/cs-a0";
import { CS_A1_SOURCE } from "../levels/cs-a1";
import { CS_A2_SOURCE } from "../levels/cs-a2";
import { CS_B1_SOURCE } from "../levels/cs-b1";

export const CS_LESSONS_BY_BAND: Record<CefrBandId, Lesson[]> = {
  a0: CS_A0_SOURCE,
  a1: CS_A1_SOURCE,
  a2: CS_A2_SOURCE,
  b1: CS_B1_SOURCE,
  b2: [],
};
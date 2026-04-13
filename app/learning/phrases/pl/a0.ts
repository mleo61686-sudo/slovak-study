import type { Phrase } from "../registry";
import { PL_A0_PHRASES_1 } from "./a0-1";
import { PL_A0_PHRASES_2 } from "./a0-2";
import { PL_A0_PHRASES_3 } from "./a0-3";

export const PL_A0_PHRASES: Record<string, Phrase> = {
  ...PL_A0_PHRASES_1,
  ...PL_A0_PHRASES_2,
  ...PL_A0_PHRASES_3,
};
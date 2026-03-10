import type { Phrase } from "../registry";
import { CS_A1_PHRASES_1 } from "./a1-1";
import { CS_A1_PHRASES_2 } from "./a1-2";
import { CS_A1_PHRASES_3 } from "./a1-3";
import { CS_A1_PHRASES_4 } from "./a1-4";

export const CS_A1_PHRASES: Record<string, Phrase> = {
  ...CS_A1_PHRASES_1,
  ...CS_A1_PHRASES_2,
  ...CS_A1_PHRASES_3,
  ...CS_A1_PHRASES_4,
};
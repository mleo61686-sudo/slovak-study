import type { Phrase } from "../registry";
import { CS_B1_PHRASES_1 } from "./b1-1";
import { CS_B1_PHRASES_2 } from "./b1-2";
import { CS_B1_PHRASES_3 } from "./b1-3";
import { CS_B1_PHRASES_4 } from "./b1-4";

export const CS_B1_PHRASES: Record<string, Phrase> = {
  ...CS_B1_PHRASES_1,
  ...CS_B1_PHRASES_2,
  ...CS_B1_PHRASES_3,
  ...CS_B1_PHRASES_4,
};
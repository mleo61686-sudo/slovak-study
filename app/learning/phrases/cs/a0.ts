import type { Phrase } from "../registry";
import { CS_A0_PHRASES_1 } from "./a0-1";
import { CS_A0_PHRASES_2 } from "./a0-2";
import { CS_A0_PHRASES_3 } from "./a0-3";



export const CS_A0_PHRASES: Record<string, Phrase> = {
  ...CS_A0_PHRASES_1,
  ...CS_A0_PHRASES_2,
  ...CS_A0_PHRASES_3,
};
// D:\slovak-study\slovak-study\app\learning\phrases\cs\a0.ts
import type { Phrase } from "../registry";
import { CS_A0_PHRASES_1 } from "./a0-1";
import { CS_A0_PHRASES_2 } from "./a0-2";

export const CS_A0_PHRASES: Record<string, Phrase> = {
  ...CS_A0_PHRASES_1,
  ...CS_A0_PHRASES_2,
};
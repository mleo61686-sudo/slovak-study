import type { Phrase } from "../registry";
import { CS_A2_PHRASES_1 } from "./a2-1";
import { CS_A2_PHRASES_2 } from "./a2-2";
import { CS_A2_PHRASES_3 } from "./a2-3";
import { CS_A2_PHRASES_4 } from "./a2-4";
import { CS_A2_PHRASES_5 } from "./a2-5";

export const CS_A2_PHRASES: Record<string, Phrase> = {
    ...CS_A2_PHRASES_1,
    ...CS_A2_PHRASES_2,
    ...CS_A2_PHRASES_3,
    ...CS_A2_PHRASES_4,
    ...CS_A2_PHRASES_5,
};
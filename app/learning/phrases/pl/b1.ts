import type { Phrase } from "../registry";
import { PL_B1_PHRASES_1 } from "./b1-1";
import { PL_B1_PHRASES_2 } from "./b1-2";
import { PL_B1_PHRASES_3 } from "./b1-3";
import { PL_B1_PHRASES_4 } from "./b1-4";

export const PL_B1_PHRASES: Record<string, Phrase> = {
    ...PL_B1_PHRASES_1,
    ...PL_B1_PHRASES_2,
    ...PL_B1_PHRASES_3,
    ...PL_B1_PHRASES_4,
}

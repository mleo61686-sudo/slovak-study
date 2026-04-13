import type { Phrase } from "../registry";
import { PL_A1_PHRASES_1 } from "./a1-1";
import { PL_A1_PHRASES_2 } from "./a1-2";
import { PL_A1_PHRASES_3 } from "./a1-3";
import { PL_A1_PHRASES_4 } from "./a1-4";

export const PL_A1_PHRASES: Record<string, Phrase> = {
    ...PL_A1_PHRASES_1,
    ...PL_A1_PHRASES_2,
    ...PL_A1_PHRASES_3,
    ...PL_A1_PHRASES_4,
}

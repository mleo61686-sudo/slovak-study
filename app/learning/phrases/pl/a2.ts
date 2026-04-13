import type { Phrase } from "../registry";
import { PL_A2_PHRASES_1 } from "./a2-1";
import { PL_A2_PHRASES_2 } from "./a2-2";
import { PL_A2_PHRASES_3 } from "./a2-3";
import { PL_A2_PHRASES_4 } from "./a2-4";
import { PL_A2_PHRASES_5 } from "./a2-5";

export const PL_A2_PHRASES: Record<string, Phrase> = {
    ...PL_A2_PHRASES_1,
    ...PL_A2_PHRASES_2,
    ...PL_A2_PHRASES_3,
    ...PL_A2_PHRASES_4,
    ...PL_A2_PHRASES_5,
}

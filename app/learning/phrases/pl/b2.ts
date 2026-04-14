import type { Phrase } from "../registry";
import { PL_B2_PHRASES_1 } from "./b2-1";
import { PL_B2_PHRASES_2 } from "./b2-2";
import { PL_B2_PHRASES_3 } from "./b2-3";
import { PL_B2_PHRASES_4 } from "./b2-4";
import { PL_B2_PHRASES_5 } from "./b2-5";

export const PL_B2_PHRASES: Record<string, Phrase> = {
    ...PL_B2_PHRASES_1,
    ...PL_B2_PHRASES_2,
    ...PL_B2_PHRASES_3,
    ...PL_B2_PHRASES_4,
    ...PL_B2_PHRASES_5,
}

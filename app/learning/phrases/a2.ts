// app/learning/phrases/a2.ts
import { A2_PHRASES_1 } from "./a2-1";
import { A2_PHRASES_2 } from "./a2-2";
import { A2_PHRASES_3 } from "./a2-3";
import { A2_PHRASES_4 } from "./a2-4";
import { A2_PHRASES_5 } from "./a2-5";


export type Phrase = {
    sk: string;
    ua: string;
    ru?: string;
    tokens: string[];
};

export const A2_PHRASES: Record<string, Phrase> = {
    ...A2_PHRASES_1,
    ...A2_PHRASES_2,
    ...A2_PHRASES_3,
    ...A2_PHRASES_4,
    ...A2_PHRASES_5,
};
// app/learning/phrases/b1.ts
import { B1_PHRASES_1 } from "./b1-1";
import { B1_PHRASES_2 } from "./b1-2";
import { B1_PHRASES_3 } from "./b1-3";
import { B1_PHRASES_4 } from "./b1-4";

export type Phrase = {
  sk: string;
  ua: string;
  ru?: string;
  en?: string;
  tokens: string[];
};

export const B1_PHRASES: Record<string, Phrase> = {
  ...B1_PHRASES_1,
  ...B1_PHRASES_2,
  ...B1_PHRASES_3,
  ...B1_PHRASES_4,
};
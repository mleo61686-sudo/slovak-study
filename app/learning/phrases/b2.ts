import { B2_PHRASES_1 } from "./b2-1";
import { B2_PHRASES_2 } from "./b2-2";
import { B2_PHRASES_3 } from "./b2-3";
import { B2_PHRASES_4 } from "./b2-4";
import { B2_PHRASES_5 } from "./b2-5";

export type Phrase = {
  sk: string;
  ua: string;
  ru?: string;
  tokens: string[];
};

export const B2_PHRASES: Record<string, Phrase> = {
  ...B2_PHRASES_1,
  ...B2_PHRASES_2,
  ...B2_PHRASES_3,
  ...B2_PHRASES_4,
  ...B2_PHRASES_5,
};
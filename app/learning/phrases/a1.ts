// app/learning/phrases/a1.ts
import { A1_PHRASES_1 } from "./a1-1";
import { A1_PHRASES_2 } from "./a1-2";
import { A1_PHRASES_3 } from "./a1-3";
import { A1_PHRASES_4 } from "./a1-4";

// тип лишаємо тут — ок
export type Phrase = {
  sk: string;
  ua: string;
  ru?: string;
  tokens: string[];
};

// ❌ ВАЖЛИВО: НЕ ре-експортуємо phraseKey звідси
// phraseKey має імпортуватися ТІЛЬКИ з "./phraseKey"

export const A1_PHRASES: Record<string, Phrase> = {
  ...A1_PHRASES_1,
  ...A1_PHRASES_2,
  ...A1_PHRASES_3,
  ...A1_PHRASES_4,
};

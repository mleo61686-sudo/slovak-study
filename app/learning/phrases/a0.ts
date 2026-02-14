// app/learning/phrases/a0.ts
import { A0_PHRASES_1 } from "./a0-1";
import { A0_PHRASES_2 } from "./a0-2";
import { A0_PHRASES_3 } from "./a0-3";

export type Phrase = {
  sk: string;
  ua: string;
  ru?: string;
  tokens: string[];
};

// ✅ один-єдиний phraseKey (щоб не було розсинхронів)
export { phraseKey } from "./phraseKey";

// ✅ просто зливаємо — ключі вже містять lessonId (a0-1, a0-2, ...)
export const A0_PHRASES: Record<string, Phrase> = {
  ...A0_PHRASES_1,
  ...A0_PHRASES_2,
  ...A0_PHRASES_3,
};
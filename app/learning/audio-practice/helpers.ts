import type { LocalizedText } from "@/app/learning/data";
import type { AudioPracticeQuestion } from "./types";

export function text(ua: string, ru: string, en: string): LocalizedText {
  return { ua, ru, en };
}

export function q(
  question: LocalizedText,
  answers: LocalizedText[],
  correctIndex: number,
): AudioPracticeQuestion {
  return { question, answers, correctIndex };
}

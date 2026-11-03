/**
 * Classic Flunio vocabulary lesson: seven exercise types in the familiar order.
 * Every word is practised in six per-word exercises. The matching board is
 * played once for all words and is worth one point for each matched pair.
 * Mistake review and SRS enrolment are retained from Flunio 2.0.
 */
import type { ExerciseKind, Word } from "./types";
import type { VerifiedContextKind } from "./verified-content";

export type LessonStep = {
  kind: ExerciseKind;
  wordIndex: number;
  phase: "recognition" | "recall" | "listening" | "matching" | "context" | "review";
};

function recallKind(levelId: string, wordIndex: number): ExerciseKind {
  const level = levelId.slice(0, 2).toLowerCase();
  if (level === "a0") return "chooseSlovak";
  if (level === "a1") return wordIndex % 2 === 0 ? "chooseSlovak" : "writeWord";
  return "writeWord";
}

/** Classic lesson, with no change to SRS, XP, database, or theme settings. */
export function buildLessonPlan(
  words: Word[],
  _levelId: string,
  _contextKinds: readonly VerifiedContextKind[] = []
): LessonStep[] {
  if (words.length === 0) return [];
  const plan: LessonStep[] = [];

  const addRound = (kind: ExerciseKind, phase: LessonStep["phase"]) => {
    words.forEach((_, wordIndex) => plan.push({ kind, wordIndex, phase }));
  };

  // Exactly the seven exercise kinds from the pre-v2 course.
  addRound("chooseTranslation", "recognition");
  addRound("chooseSlovak", "recognition");
  addRound("writeWord", "recall");
  addRound("audioQuiz", "listening");
  // MatchColumns displays one interactive board with all ten pairs.
  plan.push({ kind: "matchColumns", wordIndex: 0, phase: "matching" });
  addRound("buildSentence", "context");
  addRound("buildUaSentence", "context");

  return plan;
}

/** The board is one screen, but each correctly matched pair is scored. */
export function lessonStepPoints(step: LessonStep, wordCount: number): number {
  return step.kind === "matchColumns" ? wordCount : 1;
}

export function buildMistakeReview(
  wordIndices: ReadonlySet<number>,
  words: Word[],
  levelId: string
): LessonStep[] {
  return [...wordIndices]
    .filter((index) => Number.isInteger(index) && index >= 0 && index < words.length)
    .sort((a, b) => a - b)
    .map((wordIndex) => ({
      wordIndex,
      kind: recallKind(levelId, wordIndex),
      phase: "review" as const,
    }));
}

export const LESSON_MASTERY_PERCENT = 80;

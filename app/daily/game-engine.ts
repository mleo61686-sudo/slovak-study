import type { DailyCourse } from "./question-bank";
import { EXPRESSIONS, GAPS, type Expression, type Gap, type Level } from "./game-data";
import { utcDayIndex } from "./question-bank";

export type Mode = "meaning" | "order" | "gap" | "truth" | "pairs" | "type";
export type GameRound = {
  mode: Mode;
  id: string;
  expression?: Expression;
  gap?: Gap;
  choices?: string[];
  correctChoice?: number;
  isTrue?: boolean;
  tokens?: { id: number; text: string }[];
  pairs?: { id: number; phrase: string; answer: string }[];
  shuffledPairIds?: number[];
};

const SEQUENCE: Mode[] = ["meaning", "order", "gap", "truth", "pairs", "type", "gap", "truth", "order", "meaning", "type", "pairs"];
export const ROUND_COUNT = SEQUENCE.length;

function createRng(seed: number) {
  let state = seed >>> 0 || 42;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}
function shuffle<T>(input: readonly T[], random: () => number): T[] {
  const result = [...input];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Repeatable for the same day, course and level, without a backend or per-visit AI calls. */
export function createDailyRounds(course: DailyCourse, level: Level, day: string): GameRound[] {
  const dayIndex = utcDayIndex(day);
  const courseIndex = ["sk", "cs", "pl"].indexOf(course);
  const levelIndex = ["starter", "everyday", "advanced"].indexOf(level);
  const random = createRng((dayIndex * 2654435761 + courseIndex * 73939 + levelIndex * 19997) >>> 0);
  const deck = shuffle(EXPRESSIONS[course][level], random);
  const gaps = shuffle(GAPS[course][level], random);
  let expressionIndex = 0, gapIndex = 0;
  const chosenModes = SEQUENCE;

  return chosenModes.map((mode, index) => {
    const id = `${course}-${level}-${day}-${index}`;
    if (mode === "gap" || mode === "type") {
      const item = gaps[gapIndex++ % gaps.length];
      if (mode === "type") return {mode, id, gap: item};
      const options = shuffle([item.answer, ...item.wrong], random);
      return {mode, id, gap: item, choices: options, correctChoice: options.indexOf(item.answer)};
    }
    if (mode === "pairs") {
      // Use a distinct set and shuffle both columns independently.
      const selected: Expression[] = [];
      for (let attempts = 0; selected.length < 3 && attempts < deck.length; attempts++) {
        const candidate = deck[(expressionIndex + attempts) % deck.length];
        if (!selected.some(item => item.answer === candidate.answer || item.phrase === candidate.phrase)) selected.push(candidate);
      }
      expressionIndex += 3;
      const pairs = selected.map((item, pos) => ({id: pos, phrase: item.phrase, answer: item.answer}));
      return {mode, id, pairs, shuffledPairIds: shuffle([0, 1, 2], random)};
    }
    const entry = deck[expressionIndex++ % deck.length];
    if (mode === "meaning") {
      const choices = shuffle([entry.answer, ...entry.wrong], random);
      return {mode, id, expression: entry, choices, correctChoice: choices.indexOf(entry.answer)};
    }
    if (mode === "truth") {
      return {mode, id, expression: entry, isTrue: (Math.floor(index / 4) + dayIndex) % 2 === 0};
    }
    // Preserve punctuation on individual words. Clickable numbered tiles handle repeated words.
    const words = entry.example.trim().split(/\s+/);
    let tokens = shuffle(words.map((text, pos) => ({id:pos,text})), random);
    if (tokens.length > 1 && tokens.every((t, pos) => t.id === pos)) {
      tokens = [...tokens.slice(1), tokens[0]];
    }
    return {mode, id, expression: entry, tokens};
  });
}

export function normalizedWord(input: string): string {
  return input.trim().toLocaleLowerCase().normalize("NFC").replace(/\s+/g, " ");
}

export function checkOrder(round: GameRound, ids: readonly number[]): boolean {
  return round.mode === "order" && ids.length === round.tokens?.length && ids.every((id, index) => id === index);
}

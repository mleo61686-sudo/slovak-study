import { A0_PHRASES as SK_A0_PHRASES } from "./a0";
import { A1_PHRASES as SK_A1_PHRASES } from "./a1";
import { A2_PHRASES as SK_A2_PHRASES } from "./a2";
import { B1_PHRASES as SK_B1_PHRASES } from "./b1";
import { CS_A0_PHRASES } from "./cs/a0";
import { CS_A1_PHRASES } from "./cs/a1";
import { CS_A2_PHRASES } from "./cs/a2";
import { CS_B1_PHRASES } from "./cs/b1";

export type Phrase = {
  sk: string;
  ua: string;
  ru?: string;
  tokens: string[];
};

export type CourseId = "sk" | "cs" | "pl";
export type PhraseBand = "a0" | "a1" | "a2" | "b1" | "b2";
export type PhraseDict = Record<string, Phrase>;

type PhraseRegistry = Partial<Record<PhraseBand, PhraseDict>>;

// ====================================
// Slovak
// ====================================
const SK_PHRASES_BY_BAND: PhraseRegistry = {
  a0: SK_A0_PHRASES,
  a1: SK_A1_PHRASES,
  a2: SK_A2_PHRASES,
  b1: SK_B1_PHRASES,
};

// ====================================
// Czech
// ====================================
const CS_PHRASES_BY_BAND: PhraseRegistry = {
  a0: CS_A0_PHRASES,
  a1: CS_A1_PHRASES,
  a2: CS_A2_PHRASES,
  b1: CS_B1_PHRASES,
};

// ====================================
// Polish
// ====================================
const PL_PHRASES_BY_BAND: PhraseRegistry = {};

const PHRASES_BY_COURSE: Record<CourseId, PhraseRegistry> = {
  sk: SK_PHRASES_BY_BAND,
  cs: CS_PHRASES_BY_BAND,
  pl: PL_PHRASES_BY_BAND,
};

function normalizeCourseId(courseId?: string): CourseId {
  if (courseId === "cs" || courseId === "pl") return courseId;
  return "sk";
}

export function getPhraseBandFromLevelId(levelId: string): PhraseBand {
  const raw = String(levelId).trim().toLowerCase();

  if (raw.startsWith("b2-")) return "b2";
  if (raw.startsWith("b1-")) return "b1";
  if (raw.startsWith("a2-")) return "a2";
  if (raw.startsWith("a1-")) return "a1";
  return "a0";
}

export function getPhrasesByBand(
  courseId: string | undefined,
  band: PhraseBand
): PhraseDict | null {
  const safeCourseId = normalizeCourseId(courseId);
  return PHRASES_BY_COURSE[safeCourseId][band] ?? null;
}

export function getPhrasesForLevel(
  courseId: string | undefined,
  levelId: string
): PhraseDict | null {
  const band = getPhraseBandFromLevelId(levelId);
  return getPhrasesByBand(courseId, band);
}
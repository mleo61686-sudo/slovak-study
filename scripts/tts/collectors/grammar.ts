import { expandDerivedPhrases } from "../generators/negation";
import {
  VERBS_CS,
  VERBS_SK,
} from "../../../app/grammar/verbs-present/verbs-present-data";
import {
  genExamplesFromRows,
  makeQuestion,
  negateSentence,
} from "../../../app/grammar/verbs-present/verbs-present-helpers";
import {
  CASES_CS,
  CASES_SK,
  CASES_PL,
  BUILD_SAMPLES_CS,
  BUILD_SAMPLES_SK,
  BUILD_SAMPLES_PL,
} from "../../../app/grammar/cases/cases-data";

export type Item = { kind: "word" | "phrase"; text: string };
export type CourseId = "sk" | "cs" | "pl";

/**
 * Alphabet pronunciation items
 */
export function collectAlphabetItems(course: CourseId = "sk"): Item[] {
  const wordsSk = [
    "auto",
    "máš",
    "päť",
    "mesto",
    "méso",
    "lista",
    "píše",
    "dom",
    "móda",
    "stôl",
    "ulica",
    "dúfať",
    "syn",
    "býva",
    "čaj",
    "škola",
    "žena",
    "ďakujem",
    "ťa",
    "ňho",
    "ľudia",
    "chlieb",
    "medzi",
    "džús",
    "práca",
    "človek",
    "život",
    "učiteľ",
  ];

  const wordsCs = [
    "auto",
    "mám",
    "ten",
    "mléko",
    "kino",
    "bílý",
    "okno",
    "móda",
    "ulice",
    "úkol",
    "dům",
    "syn",
    "dobrý",
    "město",
    "čaj",
    "škola",
    "žena",
    "ďábel",
    "ťuknout",
    "kůň",
    "řeka",
    "chléb",
    "práce",
    "člověk",
    "život",
    "děkuju",
    "učitel",
  ];

  const wordsPl = [
    // vowels
    "auto",
    "mąż",
    "ser",
    "język",
    "igła",
    "dom",
    "góra",
    "ulica",
    "syn",

    // consonants
    "czas",
    "szkoła",
    "żona",
    "źle",
    "ćma",
    "śniadanie",
    "koń",
    "łódź",
    "rzeka",
    "chleb",

    // stress + practice block
    "wakacje",
    "praca",
    "człowiek",
    "życie",
    "dziękuję",
    "miasto",
    "nauczyciel",
  ];

  const words =
    course === "cs" ? wordsCs : course === "pl" ? wordsPl : wordsSk;

  const unique = Array.from(new Set(words.map((w) => w.trim()).filter(Boolean)));

  return unique.map((text) => ({
    kind: "word" as const,
    text,
  }));
}

/**
 * Grammar cases phrases
 * IMPORTANT:
 * Uses the same source as frontend UI to avoid text/hash mismatch.
 */
export function collectCasesItems(course: CourseId = "sk"): Item[] {
  const cases =
    course === "cs"
      ? CASES_CS
      : course === "pl"
        ? CASES_PL
        : CASES_SK;

  const buildSamples =
    course === "cs"
      ? BUILD_SAMPLES_CS
      : course === "pl"
        ? BUILD_SAMPLES_PL
        : BUILD_SAMPLES_SK;

  const collected = new Set<string>();

  for (const c of cases) {
    const q = c.questions?.sk?.trim();
    if (q) collected.add(q);

    for (const ex of c.examples ?? []) {
      const text = ex.sk?.trim();
      if (text) collected.add(text);
    }
  }

  for (const sample of buildSamples) {
    const text = sample.sk?.trim();
    if (text) collected.add(text);
  }

  return Array.from(collected).map((text) => ({
    kind: "phrase" as const,
    text,
  }));
}

/**
 * Verbs present phrases
 * Uses the same data + helpers as the frontend page.
 *
 * For now:
 * - cs -> Czech grammar data
 * - sk -> Slovak grammar data
 * - pl -> temporary fallback to Slovak grammar data
 */
export function collectVerbsPresentItems(course: CourseId = "sk"): Item[] {
  const grammarCourse = course === "cs" ? "cs" : "sk";
  const verbs = grammarCourse === "cs" ? VERBS_CS : VERBS_SK;

  const collected = new Set<string>();

  for (const verb of verbs) {
    for (const row of verb.rows) {
      const full = row.full.trim();
      if (full) collected.add(full);
    }

    const examples = genExamplesFromRows(verb, grammarCourse);

    for (const ex of examples) {
      const base = ex.sk.trim();
      if (!base) continue;

      collected.add(base);
      collected.add(negateSentence(base, grammarCourse));
      collected.add(makeQuestion(base));
    }

    for (const ex of verb.examples ?? []) {
      const base = ex.sk.trim();
      if (!base) continue;

      collected.add(base);
      collected.add(negateSentence(base, grammarCourse));
      collected.add(makeQuestion(base));
    }
  }

  const unique = Array.from(collected)
    .map((p) => p.trim())
    .filter(Boolean);

  const base = unique.map((text) => ({
    kind: "phrase" as const,
    text,
  }));

  return expandDerivedPhrases(base);
}
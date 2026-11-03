/**
 * Server-safe content resolver. Use in the lesson page to pass a tiny
 * context plan to the client, instead of bundling all phrase dictionaries
 * into the initial lesson JS payload.
 */
import type { Word } from "./types";
import { phraseKey } from "@/app/learning/phrases/phraseKey";
import {
  getPhrasesForLevel,
  type Phrase,
  type PhraseDict,
} from "@/app/learning/phrases/registry";
import {
  getBuildUaSentencesForLevel,
  type BuildSentenceTranslationItem,
  type BuildUaSentenceDict,
} from "@/app/learning/build-ua-sentences/registry";

export type VerifiedContextKind = "buildSentence" | "buildUaSentence" | null;

function normalizeKeyPart(value: string | number) {
  return String(value)
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1");
}

export function findPhraseInDict(
  dict: PhraseDict,
  sk: string,
  ua: string,
  levelId: string
): Phrase | undefined {
  const lessonNorm = normalizeKeyPart(levelId);
  const skNorm = normalizeKeyPart(sk);
  const uaNorm = normalizeKeyPart(ua);
  const canonical = dict[phraseKey(sk, levelId)];
  if (canonical) return canonical;
  const compat = dict[phraseKey(sk, ua, levelId)];
  if (compat) return compat;
  const legacy = dict[`${skNorm}||${uaNorm}||${lessonNorm}`];
  if (legacy) return legacy;
  const suffix = `||${lessonNorm}`;
  const key = Object.keys(dict).find((k) => {
    const normalized = normalizeKeyPart(k);
    return normalized === `${skNorm}||${lessonNorm}` ||
      (normalized.startsWith(`${skNorm}||`) && normalized.endsWith(suffix));
  });
  return key ? dict[key] : undefined;
}

export function findBuildUaSentenceInDict(
  dict: BuildUaSentenceDict,
  sk: string,
  ua: string,
  levelId: string
): BuildSentenceTranslationItem | undefined {
  const lessonNorm = normalizeKeyPart(levelId);
  const skNorm = normalizeKeyPart(sk);
  const uaNorm = normalizeKeyPart(ua);
  const canonical = dict[phraseKey(sk, levelId)];
  if (canonical) return canonical;
  const compat = dict[phraseKey(sk, ua, levelId)];
  if (compat) return compat;
  const legacy = dict[`${skNorm}||${uaNorm}||${lessonNorm}`];
  if (legacy) return legacy;
  const suffix = `||${lessonNorm}`;
  const key = Object.keys(dict).find((k) => {
    const normalized = normalizeKeyPart(k);
    return normalized === `${skNorm}||${lessonNorm}` ||
      (normalized.startsWith(`${skNorm}||`) && normalized.endsWith(suffix));
  });
  return key ? dict[key] : undefined;
}

/** Only schedule sentence exercises with authored, complete content. */
export function getVerifiedContextKinds(
  words: Word[],
  levelId: string,
  courseId: "sk" | "cs" | "pl"
): VerifiedContextKind[] {
  const phrases = getPhrasesForLevel(courseId, levelId);
  const translations = getBuildUaSentencesForLevel(courseId, levelId);

  return words.map((word): VerifiedContextKind => {
    const phrase = (phrases
      ? findPhraseInDict(phrases, word.sk, word.ua, levelId)
      : undefined) ?? word.phrase;
    if (phrase?.sk?.trim() && phrase?.ua?.trim() && phrase.tokens?.length >= 2) {
      return "buildSentence";
    }

    const translated = translations
      ? findBuildUaSentenceInDict(translations, word.sk, word.ua, levelId)
      : undefined;
    if (translated?.sk?.trim() && translated?.ua?.trim() && translated.uaTokens?.length >= 2) {
      return "buildUaSentence";
    }
    return null;
  });
}

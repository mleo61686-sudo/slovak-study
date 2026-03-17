"use client";

import type { Lang } from "@/lib/src/language";
import type { Word } from "./types";

import { phraseKey } from "@/app/learning/phrases/phraseKey";
import {
  getPhrasesForLevel,
  type Phrase,
  type PhraseDict,
} from "@/app/learning/phrases/registry";

export function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function normalizeSentence(s: string) {
  return s
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .toLowerCase();
}

export const trWord = (w: Word, lang: Lang) =>
  lang === "ru" ? w.ru ?? w.ua : w.ua;

function normalizeKeyPart(value: string | number) {
  return String(value)
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1");
}

function getAudioBase(courseId: string = "sk") {
  return courseId === "sk" ? "/audio" : `/audio/${courseId}`;
}

function findPhraseInDict(
  dict: PhraseDict,
  sk: string,
  ua: string,
  levelId: string
): Phrase | undefined {
  const lessonNorm = normalizeKeyPart(levelId);
  const skNorm = normalizeKeyPart(sk);
  const uaNorm = normalizeKeyPart(ua);

  // 1) exact canonical match (new format: sk + lessonId)
  const canonical = dict[phraseKey(sk, levelId)];
  if (canonical) return canonical;

  // 2) backward-compatible exact call form
  //    (works even if some code still calls phraseKey(sk, ua, levelId))
  const compat = dict[phraseKey(sk, ua, levelId)];
  if (compat) return compat;

  // 3) legacy dictionary key match: sk||ua||lessonId
  const legacyKey = `${skNorm}||${uaNorm}||${lessonNorm}`;
  const legacy = dict[legacyKey];
  if (legacy) return legacy;

  // 4) fallback by sk + lessonId, якщо переклад/пунктуація змінювались
  const suffix = `||${lessonNorm}`;

  const hitKey = Object.keys(dict).find((k) => {
    const key = normalizeKeyPart(k);

    return (
      key === `${skNorm}||${lessonNorm}` ||
      (key.startsWith(`${skNorm}||`) && key.endsWith(suffix))
    );
  });

  return hitKey ? dict[hitKey] : undefined;
}

export function getPhraseForWord(
  word: Word,
  lang: Lang,
  levelId: string,
  courseId: string = "sk"
) {
  const dict = getPhrasesForLevel(courseId, levelId);

  if (dict) {
    const p = findPhraseInDict(dict, word.sk, word.ua, levelId);

    if (p) {
      const target = lang === "ru" ? p.ru ?? p.ua : p.ua;
      return { sk: p.sk, target, tokens: p.tokens };
    }
  }

  if (word.phrase) {
    const target =
      lang === "ru" ? word.phrase.ru ?? word.phrase.ua : word.phrase.ua;

    return { sk: word.phrase.sk, target, tokens: word.phrase.tokens };
  }

  const sk = `To je ${word.sk}.`;
  const target =
    lang === "ru"
      ? `Это ${word.ru ?? word.ua}.`
      : `Це ${word.ua}.`;
  const tokens = ["To", "je", word.sk, "."];

  return { sk, target, tokens };
}

export async function sha1Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function guessKind(text: string): "word" | "phrase" {
  return /[ ,.!?;:]/.test(text.trim()) ? "phrase" : "word";
}

function normalizePunctSpacing(s: string) {
  return s
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .normalize("NFC");
}

/**
 * Build local mp3 url.
 *
 * Supported:
 *  - legacy: sha1(text) (full або short)
 *  - kinded: sha1(`${kind}:${text}`) (full або short)
 */
export async function buildLocalUrl(
  text: string,
  forcedKind?: "word" | "phrase",
  mode: "legacy" | "kinded" = "legacy",
  hashLen: "full" | "short" = "full",
  courseId: string = "sk"
) {
  const clean = (text ?? "").normalize("NFC").trim();
  const kind = forcedKind ?? guessKind(clean);
  const base = getAudioBase(courseId);

  const key = mode === "kinded" ? `${kind}:${clean}` : clean;

  let h = await sha1Hex(key);
  if (hashLen === "short") h = h.slice(0, 13);

  return kind === "word"
    ? `${base}/words/${h}.mp3`
    : `${base}/phrases/${h}.mp3`;
}

async function tryPlay(url: string) {
  const a = new Audio(url);
  await a.play();
}

/**
 * ✅ Robust local play:
 *  - words: tries sha1("word:<text>") first, then fallbacks
 *  - phrases: tries short(13) + full(40) for exact and normalized-spacing variants
 */
export async function playLocal(
  text: string,
  forcedKind?: "word" | "phrase",
  courseId: string = "sk"
) {
  const raw = text ?? "";
  const clean = raw.normalize("NFC").trim();
  if (!clean) return;

  const kind = forcedKind ?? guessKind(clean);
  const alt = normalizePunctSpacing(clean);
  const candidates = Array.from(new Set([clean, alt].filter(Boolean)));
  const base = getAudioBase(courseId);

  const urls: string[] = [];

  if (kind === "word") {
    for (const c of candidates) {
      const hWord = await sha1Hex(`word:${c}`);
      urls.push(`${base}/words/${hWord}.mp3`);
    }

    for (const c of candidates) {
      const hLegacyFull = await sha1Hex(c);
      const hLegacyShort = hLegacyFull.slice(0, 13);
      urls.push(`${base}/words/${hLegacyFull}.mp3`);
      urls.push(`${base}/words/${hLegacyShort}.mp3`);
    }
  } else {
    for (const c of candidates) {
      const hFull = await sha1Hex(c);
      urls.push(`${base}/phrases/${hFull.slice(0, 13)}.mp3`);
      urls.push(`${base}/phrases/${hFull}.mp3`);
    }

    for (const c of candidates) {
      const hKinded = await sha1Hex(`phrase:${c}`);
      urls.push(`${base}/phrases/${hKinded.slice(0, 13)}.mp3`);
      urls.push(`${base}/phrases/${hKinded}.mp3`);
    }
  }

  for (const url of urls) {
    try {
      await tryPlay(url);
      return;
    } catch {}
  }
}

export function tokensToSentence(tokens: string[]) {
  return tokens.join(" ").replace(/\s+([.,!?;:])/g, "$1").trim();
}
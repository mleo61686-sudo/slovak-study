// D:\slovak-study\slovak-study\app\learning\components\LevelClient\helpers.ts
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

function findPhraseInDict(
  dict: PhraseDict,
  sk: string,
  ua: string,
  levelId: string
): Phrase | undefined {
  // 1) exact match
  const exact = dict[phraseKey(sk, ua, levelId)];
  if (exact) return exact;

  // 2) fallback by sk + lessonId, якщо переклад змінювався
  const skNorm = String(sk).trim().toLowerCase();
  const lessonNorm = String(levelId).trim().toLowerCase();

  const prefix = `${skNorm}||`;
  const suffix = `||${lessonNorm}`;

  const hitKey = Object.keys(dict).find(
    (k) => k.startsWith(prefix) && k.endsWith(suffix)
  );

  return hitKey ? dict[hitKey] : undefined;
}

export function getPhraseForWord(
  word: Word,
  lang: Lang,
  levelId: string,
  courseId: string = "sk"
) {
  if (word.phrase) {
    const target =
      lang === "ru" ? word.phrase.ru ?? word.phrase.ua : word.phrase.ua;

    return { sk: word.phrase.sk, target, tokens: word.phrase.tokens };
  }

  const dict = getPhrasesForLevel(courseId, levelId);

  if (dict) {
    const p = findPhraseInDict(dict, word.sk, word.ua, levelId);

    if (p) {
      const target = lang === "ru" ? p.ru ?? p.ua : p.ua;
      return { sk: p.sk, target, tokens: p.tokens };
    }
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
  hashLen: "full" | "short" = "full"
) {
  const clean = (text ?? "").normalize("NFC").trim();
  const kind = forcedKind ?? guessKind(clean);

  const key = mode === "kinded" ? `${kind}:${clean}` : clean;

  let h = await sha1Hex(key);
  if (hashLen === "short") h = h.slice(0, 13);

  return kind === "word"
    ? `/audio/words/${h}.mp3`
    : `/audio/phrases/${h}.mp3`;
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
export async function playLocal(text: string, forcedKind?: "word" | "phrase") {
  const raw = text ?? "";
  const clean = raw.normalize("NFC").trim();
  if (!clean) return;

  const kind = forcedKind ?? guessKind(clean);
  const alt = normalizePunctSpacing(clean);
  const candidates = Array.from(new Set([clean, alt].filter(Boolean)));

  const urls: string[] = [];

  if (kind === "word") {
    for (const c of candidates) {
      const hWord = await sha1Hex(`word:${c}`);
      urls.push(`/audio/words/${hWord}.mp3`);
    }

    for (const c of candidates) {
      const hLegacyFull = await sha1Hex(c);
      const hLegacyShort = hLegacyFull.slice(0, 13);
      urls.push(`/audio/words/${hLegacyFull}.mp3`);
      urls.push(`/audio/words/${hLegacyShort}.mp3`);
    }
  } else {
    for (const c of candidates) {
      const hFull = await sha1Hex(c);
      urls.push(`/audio/phrases/${hFull.slice(0, 13)}.mp3`);
      urls.push(`/audio/phrases/${hFull}.mp3`);
    }

    for (const c of candidates) {
      const hKinded = await sha1Hex(`phrase:${c}`);
      urls.push(`/audio/phrases/${hKinded.slice(0, 13)}.mp3`);
      urls.push(`/audio/phrases/${hKinded}.mp3`);
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
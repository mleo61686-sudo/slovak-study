"use client";

import type { Lang } from "@/lib/src/language";
import type { Word } from "./types";

import { A0_PHRASES, phraseKey } from "@/app/learning/phrases/a0";
import { A2_PHRASES } from "@/app/learning/phrases/a2";
import { B1_PHRASES } from "@/app/learning/phrases/b1";

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

export const trWord = (w: Word, lang: Lang) => (lang === "ru" ? w.ru ?? w.ua : w.ua);

export function getPhraseForWord(word: Word, lang: Lang, levelId: string) {
  if (word.phrase) {
    const target = lang === "ru" ? word.phrase.ru ?? word.phrase.ua : word.phrase.ua;
    return { sk: word.phrase.sk, target, tokens: word.phrase.tokens };
  }

  const k = phraseKey(word.sk, word.ua, levelId);

  const dict =
    levelId.startsWith("a2-") ? A2_PHRASES :
      levelId.startsWith("b1-") ? B1_PHRASES :
        A0_PHRASES;

  const p = dict[k];
  if (p) {
    const target = lang === "ru" ? p.ru ?? p.ua : p.ua;
    return { sk: p.sk, target, tokens: p.tokens };
  }

  const sk = `To je ${word.sk}.`;
  const target = lang === "ru" ? `Это ${word.ru ?? word.ua}.` : `Це ${word.ua}.`;
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

/**
 * Build local mp3 url.
 *
 * We support:
 *  - legacy: sha1(text)
 *  - kinded: sha1(`${kind}:${text}`)
 *  - short filename: first 13 chars of sha1 (because your public/audio/phrases contains many 13-char names)
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

  return kind === "word" ? `/audio/words/${h}.mp3` : `/audio/phrases/${h}.mp3`;
}

export async function playLocal(text: string, forcedKind?: "word" | "phrase") {
  const clean = (text ?? "").normalize("NFC").trim();
  if (!clean) return;

  const kind = forcedKind ?? guessKind(clean);

  // ✅ 1) B1 формат: short(13)
  const urlShort = await buildLocalUrl(clean, kind, "legacy", "short");
  // ✅ 2) старі рівні: full(40)
  const urlFull = await buildLocalUrl(clean, kind, "legacy", "full");

  try {
    await new Audio(urlShort).play();
    return;
  } catch { }

  try {
    await new Audio(urlFull).play();
    return;
  } catch { }
}

export function tokensToSentence(tokens: string[]) {
  return tokens.join(" ").replace(/\s+([.,!?;:])/g, "$1").trim();
}
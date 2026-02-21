"use client";

import type { Lang } from "@/lib/src/language";
import type { Word } from "./types";
import { A0_PHRASES, phraseKey } from "@/app/learning/phrases/a0";
import { A2_PHRASES } from "@/app/learning/phrases/a2";

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
  const dict = levelId.startsWith("a2-") ? A2_PHRASES : A0_PHRASES;

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

export async function buildLocalUrl(text: string, forcedKind?: "word" | "phrase") {
  const clean = (text ?? "").trim();
  const kind = forcedKind ?? guessKind(clean);
  const h = await sha1Hex(`${kind}:${clean}`);
  return kind === "word" ? `/audio/words/${h}.mp3` : `/audio/phrases/${h}.mp3`;
}

export async function playLocal(text: string) {
  const clean = (text ?? "").trim();
  if (!clean) return;

  const kind = guessKind(clean);
  const url1 = await buildLocalUrl(clean, kind);
  const otherKind: "word" | "phrase" = kind === "word" ? "phrase" : "word";
  const url2 = await buildLocalUrl(clean, otherKind);

  try {
    await new Audio(url1).play();
  } catch {
    try {
      await new Audio(url2).play();
    } catch {
      // ignore
    }
  }
}

export function tokensToSentence(tokens: string[]) {
  return tokens.join(" ").replace(/\s+([.,!?;:])/g, "$1").trim();
}
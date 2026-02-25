"use client";

import type { Lang } from "@/lib/src/language";
import type { Word } from "./types";

import { A0_PHRASES, phraseKey } from "@/app/learning/phrases/a0";
import { A1_PHRASES } from "@/app/learning/phrases/a1";
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

export const trWord = (w: Word, lang: Lang) =>
  lang === "ru" ? w.ru ?? w.ua : w.ua;

export function getPhraseForWord(word: Word, lang: Lang, levelId: string) {
  if (word.phrase) {
    const target =
      lang === "ru" ? word.phrase.ru ?? word.phrase.ua : word.phrase.ua;
    return { sk: word.phrase.sk, target, tokens: word.phrase.tokens };
  }

  const k = phraseKey(word.sk, word.ua, levelId);

  const dict =
    levelId.startsWith("b1-")
      ? B1_PHRASES
      : levelId.startsWith("a2-")
        ? A2_PHRASES
        : levelId.startsWith("a1-")
          ? A1_PHRASES
          : A0_PHRASES;

  const p = (dict as any)[k];
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

function normalizePunctSpacing(s: string) {
  // важливо: НЕ lowerCase, тільки пробіли/пунктуація
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
 *  - words: tries sha1("word:<text>") first (your generator format), then fallbacks
 *  - phrases: tries short(13) + full(40) for exact and normalized-spacing variants
 */
export async function playLocal(text: string, forcedKind?: "word" | "phrase") {
  const raw = (text ?? "");
  const clean = raw.normalize("NFC").trim();
  if (!clean) return;

  const kind = forcedKind ?? guessKind(clean);

  // ВАЖЛИВО: часто ламається через "Nie , ďakujem." vs "Nie, ďakujem."
  const alt = normalizePunctSpacing(clean);

  const candidates = Array.from(
    new Set([clean, alt].filter(Boolean))
  );

  const urls: string[] = [];

  if (kind === "word") {
    // ✅ correct current format in scripts/tts-elevenlabs.ts:
    // outPath(word) = sha1(`word:${text.trim()}`) FULL
    for (const c of candidates) {
      const hWord = await sha1Hex(`word:${c}`);
      urls.push(`/audio/words/${hWord}.mp3`);
    }

    // fallbacks (якщо десь залишилися старі файли)
    for (const c of candidates) {
      const hLegacyFull = await sha1Hex(c);
      const hLegacyShort = hLegacyFull.slice(0, 13);
      urls.push(`/audio/words/${hLegacyFull}.mp3`);
      urls.push(`/audio/words/${hLegacyShort}.mp3`);
    }
  } else {
    // phrases: generator uses sha1(text).slice(0,13) (B1) але інколи є full(40) старі
    for (const c of candidates) {
      const hFull = await sha1Hex(c);
      urls.push(`/audio/phrases/${hFull.slice(0, 13)}.mp3`);
      urls.push(`/audio/phrases/${hFull}.mp3`);
    }

    // додатково: якщо колись було kinded
    for (const c of candidates) {
      const hKinded = await sha1Hex(`phrase:${c}`);
      urls.push(`/audio/phrases/${hKinded.slice(0, 13)}.mp3`);
      urls.push(`/audio/phrases/${hKinded}.mp3`);
    }
  }

  // пробуємо по черзі
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
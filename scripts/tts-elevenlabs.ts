console.log("### RUNNING scripts/tts-elevenlabs.ts ###");
console.log("FILE =", import.meta.url);

import dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import pLimit from "p-limit";

import { A0_REAL_SOURCE } from "../app/learning/data";
import { A1_ALL } from "../app/learning/levels/a1";
import { A2_ALL } from "../app/learning/levels/a2";

import { A0_PHRASES } from "../app/learning/phrases/a0";
import { A1_PHRASES } from "../app/learning/phrases/a1";
import { A2_PHRASES } from "../app/learning/phrases/a2";
import { WORDS } from "../app/data/words";
import { audioPhraseKey } from "../app/learning/phrases/audioKey";

type Item = { kind: "word" | "phrase"; text: string };

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const VOICE_ID_2 = process.env.ELEVENLABS_VOICE_ID_2;

if (!API_KEY) throw new Error("Missing ELEVENLABS_API_KEY in .env.local");
if (!VOICE_ID) throw new Error("Missing ELEVENLABS_VOICE_ID in .env.local");

const XI_KEY: string = API_KEY;
const VOICE1: string = VOICE_ID;
const VOICE2: string =
  VOICE_ID_2 && VOICE_ID_2.trim() ? VOICE_ID_2 : VOICE_ID;

const OUT_DIR = path.join(process.cwd(), "public", "audio");
const WORDS_DIR = path.join(OUT_DIR, "words");
const PHRASES_DIR = path.join(OUT_DIR, "phrases");

fs.mkdirSync(WORDS_DIR, { recursive: true });
fs.mkdirSync(PHRASES_DIR, { recursive: true });

function norm(s: string) {
  return s.trim().normalize("NFC");
}

/**
 * ✅ слова для 2-го голосу (точний збіг)
 */
const VOICE2_WORDS = new Set<string>([
  "nájom",
  "sused",
  "ochladiť sa",
  "tréning",
  "zahriať sa",
  "natiahnuť sa",
  "PIN kód",
  "recept",
  "argument",
  "čašník/čašníčka",
  "poslať e-mail",
  "ambícia",
  "zablúdiť",
  "lenivý",
  "článok",
  "chránená oblasť",
  "hmla",
  "auto",
  "stôl",
  "karta",
  "park",
  "test",
  "rok",
  "nos",
  "brucho",
  "jazero",
  "polícia",
  "tanec",
  "menu",
  "môžete",
  "smutný",
  "mladý",
  "schody",
  "odpoveď",
  "dole",
  "dlh",
  "pripraviť",
  "platba kartou",
]);

const VOICE2_PHRASES = new Set<string>([
  // сюди додаєш тільки фрази, які хочеш другим голосом
  "Oblečenie je v skrini.",
  "Dám si studený nápoj.",
  "Ten dom je nový.",
  "Mám novú prácu.",
  "Mám unavené oko.",
  "Mám bolesť.",
  "Mám teplotu.",
  "Fúka vietor.",
  "Idem do lesa.",
  "Tu je jazero.",
  "Čo je to?",
  "Nie , ďakujem.",
  "Láska je krásna.",
  "Rozumiem všetko.",
  "Ty si môj priateľ.",
  "Na trhu kupujem ovocie.",
  "Nie je to ďaleko.",
  "Aký je termín?",
  "Správny poplatok je desať eur.",
  "Môžeme posunúť stretnutie na pondelok?",
  "Chcem sa zúčastniť školenia.",
  "Chcel by som reklamovať tento výrobok.",
  "Po tréningu sa vždy natiahnem.",
  "Chcem vymazať staré súbory.",
  "Tu je môj podpis.",
  "Aký je termín stretnutia?",
  "Doručenie bolo rýchlejšie, než som čakal.",
  "Chcem spiatočný lístok, prosím.",
  "Kde si môžem kúpiť cestovný lístok?",
  "Chcem uverejniť nový článok.",
]);

/**
 * ✅ TTS overrides (коли ElevenLabs криво читає слово)
 * Ключ = як у даних (що показуємо користувачу)
 * Значення = що відправляємо в ElevenLabs (користувачу не видно)
 */
const TTS_OVERRIDES = new Map<string, string>([
  // "brucho" інколи читає як "бручо" через "ch" -> "ч"
  // Трюк: розбити на склади, щоб вийшло "брухо"
  ["brucho", "bru ho"],
  ["jazero", "ja ze ro"],
  ["tanec", "ta nec"],
  ["euro", "eu ro"],
  ["my", "mi"],
  ["niet za čo", "niet za čo"],
  ["kino", "ki no"],
  ["trh", "tr̩h"],
  ["balenie", "ba le nie"],
  ["dnes", "dnes"],
  ["výťah", "vý ťah"],
  ["hory", "ho ry"],

]);

function ttsText(kind: Item["kind"], text: string) {
  if (kind !== "word") return text;
  const key = norm(text);
  for (const [k, v] of TTS_OVERRIDES.entries()) {
    if (norm(k) === key) return v;
  }
  return text;
}

function pickVoiceId(kind: Item["kind"], text: string) {
  const clean = text.trim();

  // ✅ слова — лишаємо ТОЧНО як було
  if (kind === "word") {
    return VOICE2_WORDS.has(clean) ? VOICE2 : VOICE1;
  }

  // ✅ фрази — окремий список, не впливає на слова
  if (kind === "phrase") {
    return VOICE2_PHRASES.has(clean) ? VOICE2 : VOICE1;
  }

  return VOICE1;
}

function sha1(input: string) {
  return crypto.createHash("sha1").update(input, "utf8").digest("hex");
}

function outPath(kind: Item["kind"], text: string) {
  const folder = kind === "word" ? WORDS_DIR : PHRASES_DIR;

  if (kind === "word") {
    // ❗️ВАЖЛИВО: хешуємо ОРИГІНАЛЬНИЙ text (а не override),
    // щоб файл мав стабільний шлях для цього слова.
    const hash = sha1(`word:${text.trim()}`);
    return path.join(folder, `${hash}.mp3`);
  }

  const hash = sha1(`phrase:${text.trim()}`);
  return path.join(folder, `${hash}.mp3`);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function ttsToFile(kind: Item["kind"], text: string, file: string) {
  const voiceId = pickVoiceId(kind, text);
  const sentText = ttsText(kind, text);

  console.log(`[TTS] kind=${kind} text="${text}" voice=${voiceId}`);
  if (sentText !== text) {
    console.log(`[TTS-TEXT] override: "${text}" -> "${sentText}"`);
  }
  console.log("OUT FILE =", file);

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": XI_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: sentText,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.35,
          similarity_boost: 0.85,
          style: 0.25,
          use_speaker_boost: true,
        },
      }),
    });

    if (res.ok) {
      const buffer = new Uint8Array(await res.arrayBuffer());
      fs.writeFileSync(file, buffer);
      return;
    }

    const status = res.status;
    const msg = await res.text().catch(() => "");
    const retryable = status === 429 || status >= 500;

    if (!retryable || attempt === 6) {
      throw new Error(`ElevenLabs error ${status}: ${msg}`);
    }

    await sleep(400 * attempt * attempt);
  }
}

function collectPhrases(): string[] {
  const list: string[] = [];
  const sources: any[] = [A0_PHRASES, A1_PHRASES, A2_PHRASES];

  for (const src of sources) {
    if (!src) continue;

    if (Array.isArray(src)) {
      for (const p of src) if (p?.sk) list.push(String(p.sk));
      continue;
    }

    if (typeof src === "object") {
      for (const v of Object.values(src)) {
        if ((v as any)?.sk) list.push(String((v as any).sk));
      }
    }
  }

  return list;
}

const ALL_LESSONS: any[] = [...(A1_ALL as any[]), ...(A2_ALL as any[])];

function collect(): Item[] {
  const items: Item[] = [];

  for (const lesson of ALL_LESSONS) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk) items.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  for (const lesson of A0_REAL_SOURCE as any[]) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk) items.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  for (const w of WORDS as any[]) {
    if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
  }

  for (const phrase of collectPhrases()) {
    items.push({ kind: "phrase", text: phrase });
  }

  const uniq = new Map<string, Item>();
  for (const it of items) {
    const key = `${it.kind}:${it.text.trim()}`;
    if (!uniq.has(key)) uniq.set(key, it);
  }

  return [...uniq.values()];
}

const ONLY =
  process.argv.find((a) => a.startsWith("--only="))?.split("=")[1] ?? "";

const FORCE = process.argv.includes("--force");

async function main() {
  console.log("VOICE1 =", VOICE1);
  console.log("VOICE2 =", VOICE2);
  console.log("VOICE2 enabled? =", VOICE2 !== VOICE1);

  let items = collect();

  if (ONLY) {
    items = items.filter((i) => norm(i.text) === norm(ONLY));
    console.log(`ONLY mode: "${ONLY}" -> ${items.length} item(s)`);
  }

  console.log(`Total unique items: ${items.length}`);

  const limit = pLimit(4);

  await Promise.all(
    items.map((it) =>
      limit(async () => {
        const file = outPath(it.kind, it.text);

        if (!FORCE && fs.existsSync(file) && fs.statSync(file).size > 1000) {
          return;
        }

        await ttsToFile(it.kind, it.text, file);
      })
    )
  );

  console.log("✅ DONE");
  console.log(`Saved in: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error("❌ ERROR:", e);
  process.exit(1);
});

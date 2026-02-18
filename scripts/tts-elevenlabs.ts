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
]);

function pickVoiceId(kind: Item["kind"], text: string) {
  if (kind !== "word") return VOICE1;
  return VOICE2_WORDS.has(text.trim()) ? VOICE2 : VOICE1;
}

function sha1(input: string) {
  return crypto.createHash("sha1").update(input, "utf8").digest("hex");
}

function outPath(kind: Item["kind"], text: string) {
  const folder = kind === "word" ? WORDS_DIR : PHRASES_DIR;

  if (kind === "word") {
    const hash = sha1(`word:${text.trim()}`);
    return path.join(folder, `${hash}.mp3`);
  }

  const key = audioPhraseKey(text.trim());
  return path.join(folder, `${key}.mp3`);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function ttsToFile(kind: Item["kind"], text: string, file: string) {
  const voiceId = pickVoiceId(kind, text);
  console.log(`[TTS] kind=${kind} text="${text}" voice=${voiceId}`);
  console.log("OUT FILE =", file);   // <-- ВСТАВИТИ СЮДИ

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
        text,
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
  const sources: any[] = [A0_PHRASES, A1_PHRASES];

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

const ALL_LESSONS: any[] = [
  ...(A1_ALL as any[]),
  ...(A2_ALL as any[]),
];

function collect(): Item[] {
  const items: Item[] = [];

  for (const lesson of ALL_LESSONS) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk)
        items.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  for (const lesson of A0_REAL_SOURCE as any[]) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk)
        items.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  for (const w of WORDS as any[]) {
    if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
  }

  for (const phrase of collectPhrases()) {
    items.push({ kind: "phrase", text: phrase });
  }

  // 🔍 DEBUG для polo
  const hasPolo = items.some(
    (x) => x.kind === "word" && x.text.toLowerCase().includes("polo")
  );
  console.log("HAS POLO?", hasPolo);

  for (const x of items) {
    if (x.kind === "word" && x.text.toLowerCase().includes("polo")) {
      console.log("POLO WORD RAW:", JSON.stringify(x.text));
    }
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

function norm(s: string) {
  return s.trim().normalize("NFC");
}

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

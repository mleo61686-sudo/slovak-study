import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import pLimit from "p-limit";

import { A0_REAL_SOURCE } from "../app/learning/data";
import { A1_ALL } from "../app/learning/levels/a1";
import { A2_ALL } from "../app/learning/levels/a2";
import { B1_ALL } from "../app/learning/levels/b1";
import { A0_PHRASES } from "../app/learning/phrases/a0";
import { A1_PHRASES } from "../app/learning/phrases/a1";
import { WORDS } from "../app/data/words";

type Item = { kind: "word" | "phrase"; text: string };

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

if (!API_KEY) throw new Error("Missing ELEVENLABS_API_KEY in .env.local");
if (!VOICE_ID) throw new Error("Missing ELEVENLABS_VOICE_ID in .env.local");

const XI_KEY: string = API_KEY;
const VOICE: string = VOICE_ID;

const OUT_DIR = path.join(process.cwd(), "public", "audio");
const WORDS_DIR = path.join(OUT_DIR, "words");
const PHRASES_DIR = path.join(OUT_DIR, "phrases");

fs.mkdirSync(WORDS_DIR, { recursive: true });
fs.mkdirSync(PHRASES_DIR, { recursive: true });

function sha1(input: string) {
  return crypto.createHash("sha1").update(input, "utf8").digest("hex");
}

function outPath(kind: Item["kind"], text: string) {
  const hash = sha1(`${kind}:${text.trim()}`);
  const folder = kind === "word" ? WORDS_DIR : PHRASES_DIR;
  return path.join(folder, `${hash}.mp3`);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function ttsToFile(text: string, file: string) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE}`;

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
        model_id: "eleven_multilingual_v2", // ✅ важливо для діакритики
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
  ...(B1_ALL as any[]),
];

function collect(): Item[] {
  const items: Item[] = [];

  // ✅ A1/A2/B1 lessons
  for (const lesson of ALL_LESSONS) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk) items.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  // ✅ A0 lessons
  for (const lesson of (A0_REAL_SOURCE as any[])) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk) items.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  // ✅ Dictionary words
  for (const w of (WORDS as any[])) {
    if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
  }

  // ✅ Phrase dictionaries
  for (const phrase of collectPhrases()) {
    items.push({ kind: "phrase", text: phrase });
  }

  // ✅ uniq
  const uniq = new Map<string, Item>();
  for (const it of items) {
    const key = `${it.kind}:${it.text.trim()}`;
    if (!uniq.has(key)) uniq.set(key, it);
  }

  return [...uniq.values()];
}

// ✅ CLI flags:
// --only=deň        (генерить тільки 1 item по точному збігу text)
// --force           (перегенерити навіть якщо файл існує)
const ONLY = (process.argv.find((a) => a.startsWith("--only="))?.split("=")[1] ?? "").trim();
const FORCE = process.argv.includes("--force");

async function main() {
  let items = collect();

  if (ONLY) {
    items = items.filter((i) => i.text.trim() === ONLY);
    console.log(`ONLY mode: "${ONLY}" -> ${items.length} item(s)`);
  }

  console.log(`Total unique items: ${items.length}`);

  const limit = pLimit(4);
  let done = 0;
  let skipped = 0;

  await Promise.all(
    items.map((it) =>
      limit(async () => {
        const file = outPath(it.kind, it.text);

        if (!FORCE && fs.existsSync(file) && fs.statSync(file).size > 1000) {
          skipped++;
          done++;
          if (done % 20 === 0) {
            console.log(`Progress ${done}/${items.length} (skipped ${skipped})`);
          }
          return;
        }

        await ttsToFile(it.text, file);
        done++;

        if (done % 10 === 0 || done === items.length) {
          console.log(`Progress ${done}/${items.length} (skipped ${skipped})`);
        }
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

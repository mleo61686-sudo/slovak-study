console.log("### RUNNING scripts/tts-elevenlabs.ts ###");
console.log("FILE =", import.meta.url);

import dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });

import fs from "node:fs";
import pLimit from "p-limit";

import {
  ttsToFile,
  VOICE1,
  VOICE2,
  VOICE_CS,
  VOICE_PL,
} from "./tts/elevenlabs-client";
import { pickVoiceId, ttsText } from "./tts/voices";
import { outPath } from "./tts/hashing";

import {
  collect,
  collectFromLessons,
  collectFromPhraseDict
} from "./tts/collectors/lessons";

import {
  collectAlphabetItems,
  collectCasesItems,
  collectVerbsPresentItems
} from "./tts/collectors/grammar";

import { SLANG_SK, SLANG_CS } from "../data/slang";

import { A0_REAL_SOURCE } from "../app/learning/levels/a0";
import { A1_ALL } from "../app/learning/levels/a1";
import { A2_ALL } from "../app/learning/levels/a2";
import { B1_ALL } from "../app/learning/levels/b1";
import { B2_ALL } from "../app/learning/levels/b2";

import { A0_PHRASES } from "../app/learning/phrases/a0";
import { A1_PHRASES } from "../app/learning/phrases/a1";
import { A2_PHRASES } from "../app/learning/phrases/a2";
import { B1_PHRASES } from "../app/learning/phrases/b1";
import { B2_PHRASES } from "../app/learning/phrases/b2";

import { PL_A0_SOURCE } from "../app/learning/levels/pl-a0";
import { PL_A1_SOURCE } from "../app/learning/levels/pl-a1";
import { PL_A2_SOURCE } from "../app/learning/levels/pl-a2";
import { PL_B1_SOURCE } from "../app/learning/levels/pl-b1";
import { PL_B2_SOURCE } from "../app/learning/levels/pl-b2";

import { PL_A0_PHRASES } from "../app/learning/phrases/pl/a0";
import { PL_A1_PHRASES } from "../app/learning/phrases/pl/a1";
import { PL_A2_PHRASES } from "../app/learning/phrases/pl/a2";
import { PL_B1_PHRASES } from "../app/learning/phrases/pl/b1";
import { PL_B2_PHRASES } from "../app/learning/phrases/pl/b2";

type Item = { kind: "word" | "phrase"; text: string };
type CourseId = "sk" | "cs" | "pl";

function norm(s: string) {
  return s.trim().normalize("NFC");
}

/* =======================
   slang collector
======================= */

function wordText(w: any) {
  return String(w?.term ?? w?.sk ?? "").trim();
}

function collectSlangItems(): Item[] {
  const items: Item[] = [];

  // Поки що slang є тільки для sk/cs.
  // Для pl нічого не додаємо, щоб не згенерувати не той контент.
  const allSlang =
    COURSE === "cs"
      ? SLANG_CS
      : COURSE === "sk"
        ? SLANG_SK
        : [];

  for (const s of allSlang as any[]) {
    const wt = wordText(s);

    if (wt) items.push({ kind: "word", text: wt });

    if (s?.exampleSk) {
      items.push({
        kind: "phrase",
        text: String(s.exampleSk),
      });
    }
  }

  const uniq = new Map<string, Item>();

  for (const it of items) {
    const key = `${it.kind}:${it.text.trim()}`;
    if (!uniq.has(key)) uniq.set(key, it);
  }

  return [...uniq.values()];
}

/* =======================
   CLI flags
======================= */

const ONLY = process.argv.find(a => a.startsWith("--only="))?.split("=")[1] ?? "";
const FORCE = process.argv.includes("--force");

const ALPHABET_ONLY = process.argv.includes("--alphabet");
const CASES_ONLY = process.argv.includes("--cases");
const VERBS_PRESENT_ONLY = process.argv.includes("--verbs-present");

const BAND = process.argv.find(a => a.startsWith("--band="))?.split("=")[1] ?? "";
const COURSE = (process.argv.find(a => a.startsWith("--course="))?.split("=")[1] ?? "sk") as CourseId;

/* =======================
   MAIN
======================= */

async function main() {
  console.log("VOICE1 =", VOICE1);
  console.log("VOICE2 =", VOICE2);
  console.log("VOICE_CS =", VOICE_CS);
  console.log("VOICE_PL =", VOICE_PL);
  console.log("VOICE2 enabled? =", VOICE2 !== VOICE1);
  console.log("COURSE =", COURSE);
  console.log("ALPHABET_ONLY =", ALPHABET_ONLY);
  console.log("CASES_ONLY =", CASES_ONLY);
  console.log("VERBS_PRESENT_ONLY =", VERBS_PRESENT_ONLY);
  console.log("BAND =", BAND || "(none)");
  console.log("FORCE =", FORCE);

  let items: Item[] =
    VERBS_PRESENT_ONLY
      ? collectVerbsPresentItems(COURSE)
      : CASES_ONLY
        ? collectCasesItems(COURSE)
        : ALPHABET_ONLY
          ? collectAlphabetItems(COURSE)
          : [
              ...collect(COURSE),
              ...collectAlphabetItems(COURSE),
              ...collectCasesItems(COURSE),
              ...collectVerbsPresentItems(COURSE),
              ...collectSlangItems(),
            ];

  /* =======================
     BAND mode
  ======================= */

  if (BAND) {
    const b = BAND.trim().toLowerCase();
    let bandItems: Item[] = [];

    if (COURSE === "pl") {
      if (b === "b2") {
        bandItems = [
          ...collectFromLessons(PL_B2_SOURCE as any[]),
          ...collectFromPhraseDict(PL_B2_PHRASES),
        ];
      } else if (b === "b1") {
        bandItems = [
          ...collectFromLessons(PL_B1_SOURCE as any[]),
          ...collectFromPhraseDict(PL_B1_PHRASES),
        ];
      } else if (b === "a2") {
        bandItems = [
          ...collectFromLessons(PL_A2_SOURCE as any[]),
          ...collectFromPhraseDict(PL_A2_PHRASES),
        ];
      } else if (b === "a1") {
        bandItems = [
          ...collectFromLessons(PL_A1_SOURCE as any[]),
          ...collectFromPhraseDict(PL_A1_PHRASES),
        ];
      } else if (b === "a0") {
        bandItems = [
          ...collectFromLessons(PL_A0_SOURCE as any[]),
          ...collectFromPhraseDict(PL_A0_PHRASES),
        ];
      } else if (b === "slang") {
        bandItems = collectSlangItems();
      } else if (b === "all") {
        bandItems = items;
      } else {
        console.log(`⚠️ Unknown --band="${BAND}". Use: a0|a1|a2|b1|b2|slang|all`);
        bandItems = items;
      }
    } else {
      if (b === "b2") {
        bandItems = [
          ...collectFromLessons(B2_ALL as any[]),
          ...collectFromPhraseDict(B2_PHRASES),
        ];
      } else if (b === "b1") {
        bandItems = [
          ...collectFromLessons(B1_ALL as any[]),
          ...collectFromPhraseDict(B1_PHRASES),
        ];
      } else if (b === "a2") {
        bandItems = [
          ...collectFromLessons(A2_ALL as any[]),
          ...collectFromPhraseDict(A2_PHRASES),
        ];
      } else if (b === "a1") {
        bandItems = [
          ...collectFromLessons(A1_ALL as any[]),
          ...collectFromPhraseDict(A1_PHRASES),
        ];
      } else if (b === "a0") {
        bandItems = [
          ...collectFromLessons(A0_REAL_SOURCE as any[]),
          ...collectFromPhraseDict(A0_PHRASES),
        ];
      } else if (b === "slang") {
        bandItems = collectSlangItems();
      } else if (b === "all") {
        bandItems = items;
      } else {
        console.log(`⚠️ Unknown --band="${BAND}". Use: a0|a1|a2|b1|b2|slang|all`);
        bandItems = items;
      }
    }

    const uniq = new Map<string, Item>();

    for (const it of bandItems) {
      const key = `${it.kind}:${it.text.trim()}`;
      if (!uniq.has(key)) uniq.set(key, it);
    }

    items = [...uniq.values()];

    console.log(`BAND mode applied: "${BAND}" -> ${items.length} item(s)`);
  }

  /* =======================
     UNIQUE
  ======================= */

  {
    const uniq = new Map<string, Item>();

    for (const it of items) {
      const key = `${it.kind}:${it.text.trim()}`;
      if (!uniq.has(key)) uniq.set(key, it);
    }

    items = [...uniq.values()];
  }

  if (ONLY) {
    items = items.filter(i => norm(i.text) === norm(ONLY));
    console.log(`ONLY mode: "${ONLY}" -> ${items.length} item(s)`);
  }

  console.log(`Total unique items: ${items.length}`);

  const limit = pLimit(1);
  let skipped = 0;
  let generated = 0;

  await Promise.all(
    items.map(it =>
      limit(async () => {
        const file = outPath(COURSE, it.kind, it.text);

        if (!FORCE && fs.existsSync(file) && fs.statSync(file).size > 1000) {
          skipped++;
          return;
        }

        const voiceId = pickVoiceId(COURSE, it.kind, it.text);
        const sentText = ttsText(it.kind, it.text);

        await ttsToFile(it.kind, it.text, file, voiceId, sentText);

        const size = fs.statSync(file).size;

        if (size < 2000) {
          console.log(`⚠️ Suspicious audio size (${size}), regenerating:`, it.text);
          await ttsToFile(it.kind, it.text, file, voiceId, sentText);
        }

        generated++;
      })
    )
  );

  console.log("✅ DONE");
  console.log(`Stats: generated=${generated} skipped=${skipped} total=${items.length}`);
}

main().catch(e => {
  console.error("❌ ERROR:", e);
  process.exit(1);
});
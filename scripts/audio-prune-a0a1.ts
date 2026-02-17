import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

import { A0_REAL_SOURCE } from "../app/learning/data";
import { A1_ALL } from "../app/learning/levels/a1";
import { A0_PHRASES } from "../app/learning/phrases/a0";
import { A1_PHRASES } from "../app/learning/phrases/a1";
import { WORDS } from "../app/data/words";
import { audioPhraseKey } from "../app/learning/phrases/audioKey";

type Kind = "word" | "phrase";

const OUT_DIR = path.join(process.cwd(), "public", "audio");
const WORDS_DIR = path.join(OUT_DIR, "words");
const PHRASES_DIR = path.join(OUT_DIR, "phrases");

function sha1(input: string) {
  return crypto.createHash("sha1").update(input, "utf8").digest("hex");
}

function filePath(kind: Kind, text: string) {
  const folder = kind === "word" ? WORDS_DIR : PHRASES_DIR;

  if (kind === "word") {
    const hash = sha1(`${kind}:${text.trim()}`);
    return path.join(folder, `${hash}.mp3`);
  }

  const key = audioPhraseKey(text.trim());
  return path.join(folder, `${key}.mp3`);
}

function collectPhraseDict(): string[] {
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

function main() {
  const targets: Array<{ kind: Kind; text: string }> = [];

  // ✅ A1 lessons (words + embedded phrases)
  for (const lesson of (A1_ALL as any[])) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) targets.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk) targets.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  // ✅ A0 lessons from data.ts (words + embedded phrases)
  for (const lesson of (A0_REAL_SOURCE as any[])) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) targets.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk) targets.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  // ✅ Dictionary WORDS
  for (const w of (WORDS as any[])) {
    if (w?.sk) targets.push({ kind: "word", text: String(w.sk) });
  }

  // ✅ Phrase dictionaries A0 + A1
  for (const p of collectPhraseDict()) {
    targets.push({ kind: "phrase", text: p });
  }

  // uniq
  const map = new Map<string, { kind: Kind; text: string }>();
  for (const t of targets) {
    const key = `${t.kind}:${t.text.trim()}`;
    if (!map.has(key)) map.set(key, t);
  }

  const uniqueTargets = [...map.values()];
  let removed = 0;
  let missing = 0;

  for (const t of uniqueTargets) {
    const f = filePath(t.kind, t.text);
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      removed++;
    } else {
      missing++;
    }
  }

  console.log(`Targets: ${uniqueTargets.length}`);
  console.log(`Removed files: ${removed}`);
  console.log(`Already missing: ${missing}`);
  console.log("✅ Prune done.");
}

main();

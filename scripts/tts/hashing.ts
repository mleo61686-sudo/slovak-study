import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";

export type ItemKind = "word" | "phrase";
export type CourseId = "sk" | "cs";

function sha1(input: string) {
  return crypto.createHash("sha1").update(input, "utf8").digest("hex");
}

export function outPath(course: CourseId, kind: ItemKind, text: string) {
  const base =
    course === "sk"
      ? path.join(process.cwd(), "public", "audio")
      : path.join(process.cwd(), "public", "audio", course);

  const WORDS_DIR = path.join(base, "words");
  const PHRASES_DIR = path.join(base, "phrases");

  fs.mkdirSync(WORDS_DIR, { recursive: true });
  fs.mkdirSync(PHRASES_DIR, { recursive: true });

  if (kind === "word") {
    const hash = sha1(`word:${text.trim()}`);
    return path.join(WORDS_DIR, `${hash}.mp3`);
  }

  const key13 = sha1(text.trim()).slice(0, 13);
  return path.join(PHRASES_DIR, `${key13}.mp3`);
}
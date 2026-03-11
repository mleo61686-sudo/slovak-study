import { A0_REAL_SOURCE as A0_SK } from "../../../app/learning/levels/a0";
import { A1_ALL as A1_SK } from "../../../app/learning/levels/a1";
import { A2_ALL as A2_SK } from "../../../app/learning/levels/a2";
import { B1_ALL as B1_SK } from "../../../app/learning/levels/b1";

import { A0_PHRASES as A0_PHRASES_SK } from "../../../app/learning/phrases/a0";
import { A1_PHRASES as A1_PHRASES_SK } from "../../../app/learning/phrases/a1";
import { A2_PHRASES as A2_PHRASES_SK } from "../../../app/learning/phrases/a2";
import { B1_PHRASES as B1_PHRASES_SK } from "../../../app/learning/phrases/b1";

import { CS_A0_SOURCE as A0_CS } from "../../../app/learning/levels/cs-a0";
import { CS_A1_SOURCE as A1_CS } from "../../../app/learning/levels/cs-a1";
import { CS_A2_SOURCE as A2_CS } from "../../../app/learning/levels/cs-a2";
import { CS_B1_SOURCE as B1_CS } from "../../../app/learning/levels/cs-b1";

import { CS_A0_PHRASES as A0_PHRASES_CS } from "../../../app/learning/phrases/cs/a0";
import { CS_A1_PHRASES as A1_PHRASES_CS } from "../../../app/learning/phrases/cs/a1";
import { CS_A2_PHRASES as A2_PHRASES_CS } from "../../../app/learning/phrases/cs/a2";
import { CS_B1_PHRASES as B1_PHRASES_CS } from "../../../app/learning/phrases/cs/b1";

export type Item = { kind: "word" | "phrase"; text: string };
export type CourseId = "sk" | "cs";

type WordLike = {
  sk?: string;
  term?: string;
  phrase?: { sk?: string };
};

function wordText(w: WordLike) {
  return String((w as any)?.term ?? (w as any)?.sk ?? "").trim();
}

function getCourseSources(course: CourseId) {
  if (course === "cs") {
    return {
      a0Lessons: A0_CS as any[],
      allLessons: [
        ...(A1_CS as any[]),
        ...(A2_CS as any[]),
        ...(B1_CS as any[]),
      ],
      phraseSources: [
        A0_PHRASES_CS,
        A1_PHRASES_CS,
        A2_PHRASES_CS,
        B1_PHRASES_CS,
      ],
    };
  }

  return {
    a0Lessons: A0_SK as any[],
    allLessons: [
      ...(A1_SK as any[]),
      ...(A2_SK as any[]),
      ...(B1_SK as any[]),
    ],
    phraseSources: [
      A0_PHRASES_SK,
      A1_PHRASES_SK,
      A2_PHRASES_SK,
      B1_PHRASES_SK,
    ],
  };
}

/**
 * phrases collector
 */
export function collectPhrases(course: CourseId = "sk"): string[] {
  const list: string[] = [];
  const { phraseSources } = getCourseSources(course);

  for (const src of phraseSources) {
    if (!src) continue;

    if (Array.isArray(src)) {
      for (const p of src) {
        if ((p as any)?.sk) list.push(String((p as any).sk));
      }
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

/**
 * collect items from lessons array
 */
export function collectFromLessons(lessons: any[]): Item[] {
  const items: Item[] = [];

  for (const lesson of lessons ?? []) {
    for (const w of lesson.words ?? []) {
      const wt = wordText(w);

      if (wt) {
        items.push({ kind: "word", text: wt });
      }

      if (w?.phrase?.sk) {
        items.push({
          kind: "phrase",
          text: String(w.phrase.sk),
        });
      }
    }
  }

  return items;
}

/**
 * collect phrases from phrase dictionary
 */
export function collectFromPhraseDict(dict: any): Item[] {
  const items: Item[] = [];

  if (!dict) return items;

  if (Array.isArray(dict)) {
    for (const p of dict) {
      if (p?.sk) {
        items.push({ kind: "phrase", text: String(p.sk) });
      }
    }
    return items;
  }

  if (typeof dict === "object") {
    for (const v of Object.values(dict)) {
      if ((v as any)?.sk) {
        items.push({
          kind: "phrase",
          text: String((v as any).sk),
        });
      }
    }
  }

  return items;
}

/**
 * main collector
 */
export function collect(course: CourseId = "sk"): Item[] {
  const items: Item[] = [];
  const { allLessons, a0Lessons } = getCourseSources(course);

  for (const lesson of allLessons) {
    for (const w of lesson.words ?? []) {
      const wt = wordText(w);

      if (wt) {
        items.push({ kind: "word", text: wt });
      }

      if (w?.phrase?.sk) {
        items.push({
          kind: "phrase",
          text: String(w.phrase.sk),
        });
      }
    }
  }

  for (const lesson of a0Lessons) {
    for (const w of lesson.words ?? []) {
      const wt = wordText(w);

      if (wt) {
        items.push({ kind: "word", text: wt });
      }

      if (w?.phrase?.sk) {
        items.push({
          kind: "phrase",
          text: String(w.phrase.sk),
        });
      }
    }
  }

  for (const phrase of collectPhrases(course)) {
    items.push({
      kind: "phrase",
      text: phrase,
    });
  }

  const uniq = new Map<string, Item>();

  for (const it of items) {
    const key = `${it.kind}:${it.text.trim()}`;

    if (!uniq.has(key)) {
      uniq.set(key, it);
    }
  }

  return [...uniq.values()];
}
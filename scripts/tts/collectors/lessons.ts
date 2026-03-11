import { A0_REAL_SOURCE } from "../../../app/learning/levels/a0";
import { A1_ALL } from "../../../app/learning/levels/a1";
import { A2_ALL } from "../../../app/learning/levels/a2";
import { B1_ALL } from "../../../app/learning/levels/b1";

import { A0_PHRASES } from "../../../app/learning/phrases/a0";
import { A1_PHRASES } from "../../../app/learning/phrases/a1";
import { A2_PHRASES } from "../../../app/learning/phrases/a2";
import { B1_PHRASES } from "../../../app/learning/phrases/b1";

import { WORDS } from "../../../app/data/words";

export type Item = { kind: "word" | "phrase"; text: string };

type WordLike = {
  sk?: string;
  term?: string;
  phrase?: { sk?: string };
};

function wordText(w: WordLike) {
  return String((w as any)?.term ?? (w as any)?.sk ?? "").trim();
}

export const ALL_LESSONS: any[] = [
  ...(A1_ALL as any[]),
  ...(A2_ALL as any[]),
  ...(B1_ALL as any[]),
];

/**
 * phrases collector
 */
export function collectPhrases(): string[] {
  const list: string[] = [];

  const sources: any[] = [
    A0_PHRASES,
    A1_PHRASES,
    A2_PHRASES,
    B1_PHRASES,
  ];

  for (const src of sources) {
    if (!src) continue;

    if (Array.isArray(src)) {
      for (const p of src) {
        if (p?.sk) list.push(String(p.sk));
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
export function collect(): Item[] {
  const items: Item[] = [];

  for (const lesson of ALL_LESSONS) {
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

  for (const lesson of A0_REAL_SOURCE as any[]) {
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

  for (const w of WORDS as any[]) {
    const wt = wordText(w);

    if (wt) {
      items.push({ kind: "word", text: wt });
    }
  }

  for (const phrase of collectPhrases()) {
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
import type { Word } from "@/app/learning/data";
import type { Lang } from "./practice-types";

export function stripDiacritics(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function norm(s: string) {
  return stripDiacritics(s)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(arr: T[], n: number) {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

export function getTerm(word: Word): string {
  return String((word as { term?: string; sk?: string }).term ?? word.sk ?? "").trim();
}

export function getTrans(word: Word, lang: Lang): string | null {
  const value =
    lang === "en"
      ? word.en ?? word.ua
      : lang === "ru"
      ? word.ru ?? word.ua
      : word.ua;

  return typeof value === "string" && value.trim() ? value : null;
}
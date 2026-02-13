export type Lang = "ua" | "ru";

export const LANGS: Lang[] = ["ua", "ru"];

export const DEFAULT_LANG: Lang = "ua";

export const LANG_STORAGE_KEY = "slovakStudy.lang";

export function isLang(x: unknown): x is Lang {
  return x === "ua" || x === "ru";
}

export function normalizeLang(x: unknown): Lang {
  return isLang(x) ? x : DEFAULT_LANG;
}
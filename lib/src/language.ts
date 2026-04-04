export type Lang = "ua" | "ru" | "en";

export const LANGS: Lang[] = ["ua", "ru", "en"];

export const DEFAULT_LANG: Lang = "ua";

export const LANG_STORAGE_KEY = "slovakStudy.lang";

export function isLang(x: unknown): x is Lang {
  return x === "ua" || x === "ru" || x === "en";
}

export function normalizeLang(x: unknown): Lang {
  return isLang(x) ? x : DEFAULT_LANG;
}
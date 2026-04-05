"use client";

import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";

export type NavKey =
  | "grammar"
  | "dictionary"
  | "practice"
  | "practiceLocked"
  | "support"
  | "reports"
  | "login";

const DICT: Record<NavKey, Partial<Record<Lang, string>>> = {
  grammar: {
    ua: "Граматика",
    ru: "Грамматика",
    en: "Grammar",
  },
  dictionary: {
    ua: "Словник",
    ru: "Словарь",
    en: "Dictionary",
  },
  practice: {
    ua: "Тренажер",
    ru: "Тренажёр",
    en: "Practice",
  },
  practiceLocked: {
    ua: "Тренажер 🔒",
    ru: "Тренажёр 🔒",
    en: "Practice 🔒",
  },
  support: {
    ua: "Підтримка",
    ru: "Поддержка",
    en: "Support",
  },
  reports: {
    ua: "Reports",
    ru: "Reports",
    en: "Reports",
  },
  login: {
    ua: "Login",
    ru: "Login",
    en: "Login",
  },
};

function getLabel(lang: Lang, key: NavKey) {
  return DICT[key][lang] ?? DICT[key].ua ?? key;
}

export default function NavLabel({ k }: { k: NavKey }) {
  const { lang } = useLanguage();

  return <span className="whitespace-nowrap">{getLabel(lang, k)}</span>;
}
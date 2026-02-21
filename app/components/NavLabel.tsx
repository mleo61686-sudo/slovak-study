"use client";

import { useLanguage } from "@/lib/src/useLanguage";

export type NavKey =
  | "grammar"
  | "dictionary"
  | "practice"
  | "practiceLocked"
  | "support"
  | "reports"
  | "login";

function getLabel(lang: "ua" | "ru", key: NavKey) {
  const dict = {
    ua: {
      grammar: "Граматика",
      dictionary: "Словник",
      practice: "Тренажер",
      practiceLocked: "Тренажер 🔒",
      support: "Підтримка",
      reports: "Reports",
      login: "Login",
    },
    ru: {
      grammar: "Грамматика",
      dictionary: "Словарь",
      practice: "Тренажёр",
      practiceLocked: "Тренажёр 🔒",
      support: "Поддержка",
      reports: "Reports",
      login: "Login",
    },
  } as const;

  return dict[lang][key];
}

export default function NavLabel({ k }: { k: NavKey }) {
  const { lang } = useLanguage(); // очікуємо "ua" | "ru"
  const safeLang: "ua" | "ru" = lang === "ru" ? "ru" : "ua";
  return <>{getLabel(safeLang, k)}</>;
}
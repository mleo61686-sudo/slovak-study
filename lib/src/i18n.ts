import type { Lang } from "./language";

const DICT = {
  dictionary: {
    ua: "Словник",
    ru: "Словарь",
    en: "Dictionary",
  },
  grammar: {
    ua: "Граматика",
    ru: "Грамматика",
    en: "Grammar",
  },
  practice: {
    ua: "Тренажер",
    ru: "Тренировка",
    en: "Practice",
  },
  learnTitle: {
    ua: "Вивчай словацьку 🇸🇰 просто й системно",
    ru: "Учи словацкий 🇸🇰 просто и системно",
    en: "Learn Slovak 🇸🇰 simply and systematically",
  },
  goLearn: {
    ua: "Перейти до навчання",
    ru: "Перейти к обучению",
    en: "Go to learning",
  },
} satisfies Record<string, Record<Lang, string>>;

export function t(key: keyof typeof DICT, lang: Lang) {
  return DICT[key][lang];
}
import type { Lang } from "@/lib/src/language";

export type PastUiText = {
  title: string;
  subtitle: string;
  s1: string;
  s2: string;
  s3: string;
  s4: string;
  chooseVerb: string;
  infinitive: string;
  rule: string;
  pattern: string;
  practice: string;
  show: string;
  next: string;
  answer: string;
  noteTitle: string;
  examplesHint: string;
};

export const UI: Record<Lang, PastUiText> = {
  ua: {
    title: "Минулий час",
    subtitle:
      "Навчися говорити в минулому часі: я зробив, я була, ми пішли, у мене був час.",
    s1: "1) Як це працює",
    s2: "2) Обери дієслово",
    s3: "3) Приклади",
    s4: "4) Міні-практика 🧠",
    chooseVerb: "Обери дієслово",
    infinitive: "Інфінітив",
    rule: "Форма минулого часу",
    pattern: "Патерн",
    practice: "Переклади речення",
    show: "Показати відповідь",
    next: "Наступне",
    answer: "Відповідь",
    noteTitle: "Шпаргалка",
    examplesHint:
      "Зверни увагу: у минулому часі форма часто залежить від того, говорить чоловік, жінка чи група людей.",
  },

  ru: {
    title: "Прошедшее время",
    subtitle:
      "Научись говорить в прошедшем времени: я сделал, я была, мы пошли, у меня было время.",
    s1: "1) Как это работает",
    s2: "2) Выбери глагол",
    s3: "3) Примеры",
    s4: "4) Мини-практика 🧠",
    chooseVerb: "Выбери глагол",
    infinitive: "Инфинитив",
    rule: "Форма прошедшего времени",
    pattern: "Паттерн",
    practice: "Переведи предложение",
    show: "Показать ответ",
    next: "Следующее",
    answer: "Ответ",
    noteTitle: "Шпаргалка",
    examplesHint:
      "Обрати внимание: в прошедшем времени форма часто зависит от того, говорит мужчина, женщина или группа людей.",
  },

  en: {
    title: "Past tense",
    subtitle:
      "Learn how to speak in the past tense: I did, I was, we went, I had time.",
    s1: "1) How it works",
    s2: "2) Choose a verb",
    s3: "3) Examples",
    s4: "4) Mini practice 🧠",
    chooseVerb: "Choose a verb",
    infinitive: "Infinitive",
    rule: "Past tense form",
    pattern: "Pattern",
    practice: "Translate the sentence",
    show: "Show answer",
    next: "Next",
    answer: "Answer",
    noteTitle: "Cheat sheet",
    examplesHint:
      "Notice that past-tense forms often depend on whether the speaker is male, female, or a group.",
  },
};

export function getBadgeLabel(lang: Lang) {
  if (lang === "ru") return "Грамматика · Прошедшее время";
  if (lang === "en") return "Grammar · Past tense";
  return "Граматика · Минулий час";
}
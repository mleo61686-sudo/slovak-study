import type { Lang } from "@/lib/src/language";

export type FutureUiText = {
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

export const UI: Record<Lang, FutureUiText> = {
  ua: {
    title: "Майбутній час",
    subtitle:
      "Навчися говорити про майбутнє: що будеш робити, що зробиш, де будеш і куди підеш.",
    s1: "1) Як це працює",
    s2: "2) Обери дієслово",
    s3: "3) Приклади",
    s4: "4) Міні-практика 🧠",
    chooseVerb: "Обери дієслово",
    infinitive: "Інфінітив",
    rule: "Форма майбутнього часу",
    pattern: "Патерн",
    practice: "Переклади речення",
    show: "Показати відповідь",
    next: "Наступне",
    answer: "Відповідь",
    noteTitle: "Шпаргалка",
    examplesHint:
      "Зверни увагу на різницю: буду робити = процес, зроблю = завершений результат.",
  },

  ru: {
    title: "Будущее время",
    subtitle:
      "Научись говорить о будущем: что будешь делать, что сделаешь, где будешь и куда пойдёшь.",
    s1: "1) Как это работает",
    s2: "2) Выбери глагол",
    s3: "3) Примеры",
    s4: "4) Мини-практика 🧠",
    chooseVerb: "Выбери глагол",
    infinitive: "Инфинитив",
    rule: "Форма будущего времени",
    pattern: "Паттерн",
    practice: "Переведи предложение",
    show: "Показать ответ",
    next: "Следующее",
    answer: "Ответ",
    noteTitle: "Шпаргалка",
    examplesHint:
      "Обрати внимание на разницу: буду делать = процесс, сделаю = завершённый результат.",
  },

  en: {
    title: "Future tense",
    subtitle:
      "Learn how to talk about the future: what you will be doing, what you will finish, where you will be, and where you will go.",
    s1: "1) How it works",
    s2: "2) Choose a verb",
    s3: "3) Examples",
    s4: "4) Mini practice 🧠",
    chooseVerb: "Choose a verb",
    infinitive: "Infinitive",
    rule: "Future tense form",
    pattern: "Pattern",
    practice: "Translate the sentence",
    show: "Show answer",
    next: "Next",
    answer: "Answer",
    noteTitle: "Cheat sheet",
    examplesHint:
      "Notice the difference: will be doing = process, will finish = completed result.",
  },
};

export function getBadgeLabel(lang: Lang) {
  if (lang === "ru") return "Грамматика · Будущее время";
  if (lang === "en") return "Grammar · Future tense";
  return "Граматика · Майбутній час";
}
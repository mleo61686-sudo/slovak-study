import type { Lang } from "./language";

type WordLike = {
  sk: string;
  ua: string;
  ru?: string;
};

// авто переклад UA → RU
function autoRu(text: string): string {
  const dict: Record<string, string> = {
    "дім": "дом",
    "гроші": "деньги",
    "чоловік": "мужчина",
    "жінка": "женщина",
    "дитина": "ребёнок",
    "батько": "отец",
    "мати": "мать",
    "донька": "дочь",
    "друг": "друг",
    "подруга": "подруга",
    "робота": "работа",
    "працюю": "работаю",
    "вчитель": "учитель",
    "школа": "школа",
  };

  if (dict[text]) return dict[text];

  return text
    .replace(/і/g, "и")
    .replace(/ї/g, "и")
    .replace(/є/g, "е")
    .replace(/ґ/g, "г")
    .replace(/й/g, "й")
    .replace(/и/g, "ы")
    .replace(/ь/g, "")
    .replace(/’/g, "");
}

// ГОЛОВНА ФУНКЦІЯ ПЕРЕКЛАДУ ✅
export function trWord(word: WordLike, lang: Lang): string {
  if (lang === "ua") return word.ua;
  if (lang === "ru") return word.ru ?? autoRu(word.ua);
  return word.ua;
}
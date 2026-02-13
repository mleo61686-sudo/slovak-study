const fs = require("fs");
const path = require("path");

// ✅ шлях до словника (запускай скрипт з кореня проєкту)
const FILE_PATH = path.join(process.cwd(), "app/data/words.ts");

// мінімальний UA -> RU словник (можна розширювати)
const DICT = {
  "дім": "дом",
  "людина": "человек",
  "жінка": "женщина",
  "дитина": "ребёнок",
  "друг": "друг",
  "подруга": "подруга",
  "батько": "отец",
  "мати": "мать",
  "син": "сын",
  "донька": "дочь",
  "квартира": "квартира",
  "кімната": "комната",
  "школа": "школа",
  "місто": "город",
  "вода": "вода",
  "хліб": "хлеб",
  "гроші": "деньги",
  "робота": "работа",
  "час": "время",
  "день": "день",
  "ніч": "ночь",
};

// примітивний fallback-переклад (якщо нема в словнику)
function uaToRu(text) {
  if (!text) return "";
  if (DICT[text]) return DICT[text];

  return text
    .replace(/і/g, "и")
    .replace(/ї/g, "и")
    .replace(/є/g, "е")
    .replace(/ґ/g, "г");
}

const src = fs.readFileSync(FILE_PATH, "utf-8");

// ✅ Знаходимо блок WORDS (будь-який формат: з типом/без типу)
const wordsBlockMatch = src.match(
  /export const WORDS(?:\s*:\s*Word\[\])?\s*=\s*\[(.*?)\]\s*;/s
);

if (!wordsBlockMatch) {
  console.error("❌ Не знайшов блок export const WORDS = [ ... ];");
  process.exit(1);
}

const inside = wordsBlockMatch[1];

// ✅ Витягуємо кожен об’єкт { ... }
const objectMatches = inside.match(/\{[^}]*\}/g) || [];

if (objectMatches.length === 0) {
  console.error("❌ Не знайшов жодного об’єкта у WORDS");
  process.exit(1);
}

const updatedObjects = objectMatches.map((objText) => {
  const sk = objText.match(/sk:\s*"([^"]*)"/)?.[1] ?? "";
  const ua = objText.match(/ua:\s*"([^"]*)"/)?.[1] ?? "";

  const hasRu = /ru:\s*"/.test(objText);

  // якщо ru вже є — не чіпаємо
  if (hasRu) return objText;

  const ru = uaToRu(ua);

  // ✅ вставляємо ru після ua (або в кінець, якщо ua нема)
  if (/ua:\s*"/.test(objText)) {
    return objText.replace(/ua:\s*"[^"]*"\s*,?/, (m) => {
      const hasComma = m.trim().endsWith(",");
      return hasComma ? `${m} ru: "${ru}",` : `${m}, ru: "${ru}",`;
    });
  }

  // fallback: додати перед }
  return objText.replace(/\}\s*$/, `, ru: "${ru}" }`);
});

// ✅ збираємо новий масив
const newInside = updatedObjects.map((o) => `  ${o},`).join("\n");

// ✅ замінюємо старий блок WORDS на новий
const newSrc = src.replace(
  /export const WORDS(?:\s*:\s*Word\[\])?\s*=\s*\[(.*?)\]\s*;/s,
  `export const WORDS: Word[] = [\n${newInside}\n];`
);

fs.writeFileSync(FILE_PATH, newSrc, "utf-8");
console.log("✅ RU переклад додано (тільки там, де його не було)!");

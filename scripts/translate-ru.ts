import { WORDS } from "../app/data/words";
import fs from "fs";

async function translate(text: string) {
  const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "uk",
      target: "ru",
      format: "text",
    }),
  });

  const data = await res.json();
  return data.translatedText;
}

async function run() {
  const result = [];

  for (const w of WORDS) {
    const ru = await translate(w.ua);
    console.log(w.ua, "→", ru);

    result.push({
      ...w,
      ru,
    });

    await new Promise((r) => setTimeout(r, 300)); // щоб API не забанив
  }

  fs.writeFileSync("words_ru.ts", "export const WORDS = " + JSON.stringify(result, null, 2));
}

run();
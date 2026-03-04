import fs from "node:fs";
import path from "node:path";

// беремо вже готову агрегацію уроків по band
import { SK_LESSONS_BY_BAND } from "../app/learning/courses/sk-lessons-by-band";

function norm(s: string) {
  return String(s ?? "").trim().toLowerCase();
}

type TermRow = {
  sk: string;
  ua: string;
  ru: string;
  count: number; // скільки разів зустрічається в уроках
};

function main() {
  const map = new Map<string, TermRow>();

  const bands = Object.keys(SK_LESSONS_BY_BAND) as Array<keyof typeof SK_LESSONS_BY_BAND>;

  for (const band of bands) {
    const lessons: any[] = (SK_LESSONS_BY_BAND as any)[band] ?? [];
    for (const lesson of lessons) {
      const words: any[] = lesson?.words ?? [];
      for (const w of words) {
        const skRaw = String(w?.term ?? w?.sk ?? "").trim();
        const uaRaw = String(w?.ua ?? "").trim();
        const ruRaw = String(w?.ru ?? w?.ua ?? "").trim();

        if (!skRaw || !uaRaw) continue;

        const key = norm(skRaw);

        const prev = map.get(key);
        if (!prev) {
          map.set(key, { sk: skRaw, ua: uaRaw, ru: ruRaw || uaRaw, count: 1 });
        } else {
          prev.count += 1;

          // якщо раніше було пусто/гірше — підстрахуємо
          if (!prev.ua && uaRaw) prev.ua = uaRaw;
          if ((!prev.ru || prev.ru === prev.ua) && ruRaw) prev.ru = ruRaw;
        }
      }
    }
  }

  const list = Array.from(map.values()).sort((a, b) =>
    a.sk.localeCompare(b.sk, "sk")
  );

  const outDir = path.join(process.cwd(), "tmp");
  fs.mkdirSync(outDir, { recursive: true });

  const outJson = path.join(outDir, "sk-terms.json");
  fs.writeFileSync(outJson, JSON.stringify(list, null, 2), "utf8");

  console.log(`✅ Exported ${list.length} unique terms -> ${outJson}`);
}

main();
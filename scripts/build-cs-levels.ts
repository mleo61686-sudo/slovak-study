import fs from "node:fs";
import path from "node:path";
import { SK_LESSONS_BY_BAND } from "../app/learning/courses/sk-lessons-by-band";

type Band = "a0" | "a1" | "a2" | "b1" | "b2";
type Lang = "ua" | "ru";

type Word = {
  term?: string;
  sk: string;
  ua: string;
  ru?: string;
  ipa?: string;
  img?: string;
  imgCredit?: string;
  phrase?: any;
};

type Lesson = {
  id: string;
  title: Record<Lang, string> | string;
  words: Word[];
};

function toTitle(t: any): Record<Lang, string> {
  if (t && typeof t === "object" && ("ua" in t || "ru" in t)) {
    return { ua: String(t.ua ?? ""), ru: String(t.ru ?? t.ua ?? "") };
  }
  const s = String(t ?? "");
  return { ua: s, ru: s };
}

function escapeTsString(s: string) {
  // JSON stringify is good enough for TS string literal
  return JSON.stringify(s);
}

function main() {
  const mapPath = path.join(process.cwd(), "tmp", "sk-to-cs.json");
  if (!fs.existsSync(mapPath)) {
    console.error(`❌ Missing ${mapPath}. Run init-sk-to-cs.ts first.`);
    process.exit(1);
  }

  const SK_TO_CS = JSON.parse(fs.readFileSync(mapPath, "utf8")) as Record<string, string>;

  const outDir = path.join(process.cwd(), "app", "learning", "levels");
  fs.mkdirSync(outDir, { recursive: true });

  const bands: Band[] = ["a0", "a1", "a2", "b1"]; // b2 поки не чіпаємо

  for (const band of bands) {
    const lessons = (SK_LESSONS_BY_BAND as any)[band] as Lesson[];
    if (!Array.isArray(lessons)) continue;

    const csLessons = lessons.map((l) => {
      const title = toTitle((l as any).title);

      const words = (l.words ?? []).map((w) => {
        const skTerm = String(w.term ?? w.sk ?? "").trim();
        const csTermRaw = String(SK_TO_CS[skTerm] ?? "").trim();
        const csTerm = csTermRaw || `TODO:${skTerm}`;

        const out: Word = {
          ...w,
          term: undefined, // залишаємо legacy, engine і так бере term??sk
          sk: csTerm, // ✅ тут тепер буде чеське слово
          ua: String(w.ua ?? ""),
          ru: String(w.ru ?? w.ua ?? ""),
        };

        return out;
      });

      return {
        id: String(l.id),
        title,
        words,
      };
    });

    const constName = `CS_${band.toUpperCase()}_SOURCE`;
    const fileName = `cs-${band}.ts`;
    const filePath = path.join(outDir, fileName);

    const lines: string[] = [];
    lines.push(`import type { Lesson } from "../data";`);
    lines.push(``);
    lines.push(`export const ${constName}: Lesson[] = [`);

    for (const l of csLessons) {
      lines.push(`  {`);
      lines.push(`    id: ${escapeTsString(l.id)},`);
      lines.push(
        `    title: { ua: ${escapeTsString(l.title.ua)}, ru: ${escapeTsString(l.title.ru)} },`
      );
      lines.push(`    words: [`);

      for (const w of l.words) {
        // зберігаємо лише те, що реально потрібно
        const props: string[] = [];
        props.push(`sk: ${escapeTsString(w.sk)}`);
        props.push(`ua: ${escapeTsString(w.ua)}`);
        if (w.ru) props.push(`ru: ${escapeTsString(w.ru)}`);
        if (w.ipa) props.push(`ipa: ${escapeTsString(w.ipa)}`);
        if (w.img) props.push(`img: ${escapeTsString(w.img)}`);
        if (w.imgCredit) props.push(`imgCredit: ${escapeTsString(w.imgCredit)}`);

        lines.push(`      { ${props.join(", ")} },`);
      }

      lines.push(`    ],`);
      lines.push(`  },`);
    }

    lines.push(`];`);
    lines.push(``);

    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    console.log(`✅ Wrote ${filePath} (${csLessons.length} lessons)`);
  }

  console.log(`\n👉 Next: connect cs-lessons-by-band.ts to these new sources (cs-a0/a1/a2/b1).`);
}

main();
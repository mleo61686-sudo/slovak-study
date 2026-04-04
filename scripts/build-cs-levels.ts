import fs from "node:fs";
import path from "node:path";
import { SK_LESSONS_BY_BAND } from "../app/learning/courses/sk-lessons-by-band";

type Band = "a0" | "a1" | "a2" | "b1" | "b2";
type Lang = "ua" | "ru" | "en";

type Word = {
  term?: string;
  sk: string;
  ua: string;
  ru?: string;
  en?: string;
  ipa?: string;
  img?: string;
  imgCredit?: string;
  phrase?: {
    sk: string;
    ua: string;
    ru?: string;
    en?: string;
    tokens: string[];
  };
};

type Lesson = {
  id: string;
  title: Partial<Record<Lang, string>> | string;
  words: Word[];
};

function toTitle(t: unknown): Partial<Record<Lang, string>> {
  if (t && typeof t === "object") {
    const obj = t as Partial<Record<Lang, string>>;
    if ("ua" in obj || "ru" in obj || "en" in obj) {
      return {
        ua: String(obj.ua ?? ""),
        ru: String(obj.ru ?? obj.ua ?? ""),
        en: String(obj.en ?? obj.ua ?? ""),
      };
    }
  }

  const s = String(t ?? "");
  return { ua: s, ru: s, en: s };
}

function escapeTsString(s: string) {
  return JSON.stringify(s);
}

function main() {
  const mapPath = path.join(process.cwd(), "tmp", "sk-to-cs.json");
  if (!fs.existsSync(mapPath)) {
    console.error(`❌ Missing ${mapPath}. Run init-sk-to-cs.ts first.`);
    process.exit(1);
  }

  const SK_TO_CS = JSON.parse(
    fs.readFileSync(mapPath, "utf8")
  ) as Record<string, string>;

  const outDir = path.join(process.cwd(), "app", "learning", "levels");
  fs.mkdirSync(outDir, { recursive: true });

  const bands: Band[] = ["a0", "a1", "a2", "b1", "b2"];

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
          term: undefined,
          sk: csTerm,
          ua: String(w.ua ?? ""),
          ru: String(w.ru ?? w.ua ?? ""),
          en: String(w.en ?? w.ua ?? ""),
        };

        if (w.phrase) {
          out.phrase = {
            ...w.phrase,
            sk: String(w.phrase.sk ?? ""),
            ua: String(w.phrase.ua ?? ""),
            ru: String(w.phrase.ru ?? w.phrase.ua ?? ""),
            en: String(w.phrase.en ?? w.phrase.ua ?? ""),
            tokens: Array.isArray(w.phrase.tokens) ? w.phrase.tokens : [],
          };
        }

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
        `    title: { ua: ${escapeTsString(l.title.ua ?? "")}, ru: ${escapeTsString(
          l.title.ru ?? l.title.ua ?? ""
        )}, en: ${escapeTsString(l.title.en ?? l.title.ua ?? "")} },`
      );
      lines.push(`    words: [`);

      for (const w of l.words) {
        const props: string[] = [];
        props.push(`sk: ${escapeTsString(w.sk)}`);
        props.push(`ua: ${escapeTsString(w.ua)}`);
        if (w.ru) props.push(`ru: ${escapeTsString(w.ru)}`);
        if (w.en) props.push(`en: ${escapeTsString(w.en)}`);
        if (w.ipa) props.push(`ipa: ${escapeTsString(w.ipa)}`);
        if (w.img) props.push(`img: ${escapeTsString(w.img)}`);
        if (w.imgCredit) props.push(`imgCredit: ${escapeTsString(w.imgCredit)}`);

        if (w.phrase) {
          const phraseProps: string[] = [];
          phraseProps.push(`sk: ${escapeTsString(w.phrase.sk)}`);
          phraseProps.push(`ua: ${escapeTsString(w.phrase.ua)}`);
          if (w.phrase.ru) phraseProps.push(`ru: ${escapeTsString(w.phrase.ru)}`);
          if (w.phrase.en) phraseProps.push(`en: ${escapeTsString(w.phrase.en)}`);
          phraseProps.push(
            `tokens: [${w.phrase.tokens.map((t) => escapeTsString(t)).join(", ")}]`
          );

          props.push(`phrase: { ${phraseProps.join(", ")} }`);
        }

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

  console.log(
    `\n👉 Next: connect cs-lessons-by-band.ts to these new sources (cs-a0/a1/a2/b1/b2).`
  );
}

main();
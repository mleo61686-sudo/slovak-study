import fs from "node:fs";
import path from "node:path";

type SkTermsFile = { terms: string[] } | string[];

const ROOT = process.cwd();
const TERMS_PATH = path.join(ROOT, "tmp", "sk-terms.json");
const MAP_PATH = path.join(ROOT, "tmp", "sk-to-pl.json");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY env var.");
  process.exit(1);
}

function readJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
}

function writeJson(p: string, data: any) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function normalizeTerm(t: unknown) {
  if (typeof t === "string") return t.trim();
  if (t == null) return "";

  if (typeof t === "object") {
    const anyT = t as any;
    if (typeof anyT.sk === "string") return anyT.sk.trim();
    if (typeof anyT.term === "string") return anyT.term.trim();
    if (typeof anyT.text === "string") return anyT.text.trim();
  }

  return String(t).trim();
}

async function openaiTranslateBatch(skTerms: string[]) {
  const prompt = [
    "You are translating Slovak single words/short terms to Polish.",
    "Return ONLY valid JSON object mapping each input Slovak term to its Polish translation.",
    "Rules:",
    "- Keep casing similar to input.",
    "- If the best Polish translation is identical, return the same string.",
    "- Do NOT add extra keys.",
    "- Do NOT include comments or markdown.",
    "",
    "Input terms:",
    ...skTerms.map((t) => `- ${t}`),
  ].join("\n");

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: prompt,
      text: { format: { type: "json_object" } },
      temperature: 0.1,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${txt}`);
  }

  const data: any = await res.json();

  let text = "";
  try {
    const out = data.output?.[0]?.content ?? [];
    const firstText = out.find((c: any) => c.type === "output_text")?.text;
    text = firstText ?? "";
  } catch {
    text = "";
  }

  if (!text) {
    text = data.output_text ?? "";
  }

  if (!text) {
    throw new Error("Could not extract text from OpenAI response.");
  }

  try {
    const obj = JSON.parse(text);
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
      throw new Error("JSON is not an object.");
    }
    return obj as Record<string, string>;
  } catch {
    throw new Error(`JSON parse failed. Got: ${text.slice(0, 300)}...`);
  }
}

async function main() {
  if (!fs.existsSync(TERMS_PATH)) {
    console.error(`Missing file: ${TERMS_PATH}`);
    process.exit(1);
  }
  if (!fs.existsSync(MAP_PATH)) {
    console.error(`Missing file: ${MAP_PATH}`);
    process.exit(1);
  }

  const rawTerms = readJson<SkTermsFile>(TERMS_PATH);
  const terms = Array.isArray(rawTerms)
    ? rawTerms
    : Array.isArray((rawTerms as any).terms)
      ? (rawTerms as any).terms
      : [];

  if (!terms.length) {
    console.error("No terms found in tmp/sk-terms.json");
    process.exit(1);
  }

  const map = readJson<Record<string, string>>(MAP_PATH);

  const todo = terms
    .map(normalizeTerm)
    .filter(Boolean)
    .filter((t: string) => !map[t] || map[t].trim().toUpperCase() === "TODO");

  console.log(`Total terms: ${terms.length}`);
  console.log(`Already translated: ${terms.length - todo.length}`);
  console.log(`TODO: ${todo.length}`);

  const CHUNK = 80;

  for (let i = 0; i < todo.length; i += CHUNK) {
    const batch = todo.slice(i, i + CHUNK);
    console.log(`\nBatch ${i / CHUNK + 1} / ${Math.ceil(todo.length / CHUNK)} (${batch.length} terms)`);

    const translated = await openaiTranslateBatch(batch);

    for (const sk of batch) {
      const pl = translated[sk];
      if (typeof pl === "string" && pl.trim()) {
        map[sk] = pl.trim();
      } else {
        if (!map[sk] || map[sk].trim().toUpperCase() === "TODO") {
          map[sk] = "TODO";
        }
      }
    }

    writeJson(MAP_PATH, map);
    console.log(`Saved: tmp/sk-to-pl.json`);
  }

  console.log("\nDone translating. Next step is build-pl-levels.ts.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
/* scripts/auto-translate-cs.ts
   Auto-translate SK -> CS for all terms in tmp/sk-terms.json
   Updates tmp/sk-to-cs.json (keeps existing translations)
*/

import fs from "node:fs";
import path from "node:path";

type SkTermsFile = { terms: string[] } | string[]; // support both formats

const ROOT = process.cwd();
const TERMS_PATH = path.join(ROOT, "tmp", "sk-terms.json");
const MAP_PATH = path.join(ROOT, "tmp", "sk-to-cs.json");

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

    // якщо раптом у terms лежать обʼєкти типу { sk: "dom" } або { term: "dom" }
    if (typeof t === "object") {
        const anyT = t as any;
        if (typeof anyT.sk === "string") return anyT.sk.trim();
        if (typeof anyT.term === "string") return anyT.term.trim();
        if (typeof anyT.text === "string") return anyT.text.trim();
    }

    // fallback: перетворити на рядок
    return String(t).trim();
}

async function openaiTranslateBatch(skTerms: string[]) {
    // We ask for a JSON object: { "<sk>": "<cs>", ... }
    const prompt = [
        "You are translating Slovak single words/short terms to Czech.",
        "Return ONLY valid JSON object mapping each input Slovak term to its Czech translation.",
        "Rules:",
        "- Keep casing similar to input.",
        "- If the best Czech translation is identical, return the same string.",
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

    // Responses API commonly returns text in output[0].content[*].text
    // We'll try to extract a string and parse JSON from it.
    let text = "";
    try {
        const out = data.output?.[0]?.content ?? [];
        const firstText = out.find((c: any) => c.type === "output_text")?.text;
        text = firstText ?? "";
    } catch {
        text = "";
    }

    if (!text) {
        // fallback: some responses include output_text convenience field
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
    } catch (e: any) {
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

    // only terms still TODO / missing
    const todo = terms
        .map(normalizeTerm)
        .filter(Boolean)
        .filter((t: string) => !map[t] || map[t].trim().toUpperCase() === "TODO");

    console.log(`Total terms: ${terms.length}`);
    console.log(`Already translated: ${terms.length - todo.length}`);
    console.log(`TODO: ${todo.length}`);

    // Chunk to keep prompts reasonable
    const CHUNK = 80;

    for (let i = 0; i < todo.length; i += CHUNK) {
        const batch = todo.slice(i, i + CHUNK);
        console.log(`\nBatch ${i / CHUNK + 1} / ${Math.ceil(todo.length / CHUNK)} (${batch.length} terms)`);

        const translated = await openaiTranslateBatch(batch);

        // Apply only keys we asked for
        for (const sk of batch) {
            const cs = translated[sk];
            if (typeof cs === "string" && cs.trim()) {
                map[sk] = cs.trim();
            } else {
                // If model missed it, keep TODO so we can rerun later
                if (!map[sk] || map[sk].trim().toUpperCase() === "TODO") {
                    map[sk] = "TODO";
                }
            }
        }

        writeJson(MAP_PATH, map);
        console.log(`Saved: tmp/sk-to-cs.json`);
    }

    console.log("\nDone translating. Next step is build-cs-levels.ts.");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
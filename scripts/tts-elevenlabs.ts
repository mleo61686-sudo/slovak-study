// scripts/tts-elevenlabs.ts
console.log("### RUNNING scripts/tts-elevenlabs.ts ###");
console.log("FILE =", import.meta.url);

import dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import pLimit from "p-limit";

import { A0_REAL_SOURCE } from "../app/learning/data";
import { A1_ALL } from "../app/learning/levels/a1";
import { A2_ALL } from "../app/learning/levels/a2";

import { A0_PHRASES } from "../app/learning/phrases/a0";
import { A1_PHRASES } from "../app/learning/phrases/a1";
import { A2_PHRASES } from "../app/learning/phrases/a2";
import { WORDS } from "../app/data/words";

type Item = { kind: "word" | "phrase"; text: string };

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const VOICE_ID_2 = process.env.ELEVENLABS_VOICE_ID_2;

if (!API_KEY) throw new Error("Missing ELEVENLABS_API_KEY in .env.local");
if (!VOICE_ID) throw new Error("Missing ELEVENLABS_VOICE_ID in .env.local");

const XI_KEY: string = API_KEY;
const VOICE1: string = VOICE_ID;
const VOICE2: string = VOICE_ID_2 && VOICE_ID_2.trim() ? VOICE_ID_2 : VOICE_ID;

const OUT_DIR = path.join(process.cwd(), "public", "audio");
const WORDS_DIR = path.join(OUT_DIR, "words");
const PHRASES_DIR = path.join(OUT_DIR, "phrases");

fs.mkdirSync(WORDS_DIR, { recursive: true });
fs.mkdirSync(PHRASES_DIR, { recursive: true });

function norm(s: string) {
  return s.trim().normalize("NFC");
}

/**
 * ✅ слова для 2-го голосу (точний збіг)
 */
const VOICE2_WORDS = new Set<string>([
  "nájom",
  "sused",
  "ochladiť sa",
  "tréning",
  "zahriať sa",
  "natiahnuť sa",
  "PIN kód",
  "recept",
  "argument",
  "čašník/čašníčka",
  "poslať e-mail",
  "ambícia",
  "zablúdiť",
  "lenivý",
  "článok",
  "chránená oblasť",
  "hmla",
  "auto",
  "stôl",
  "karta",
  "park",
  "test",
  "rok",
  "nos",
  "brucho",
  "jazero",
  "polícia",
  "tanec",
  "menu",
  "môžete",
  "smutný",
  "mladý",
  "schody",
  "odpoveď",
  "dole",
  "dlh",
  "pripraviť",
  "platba kartou",
  "okamih",
]);

const VOICE2_PHRASES = new Set<string>([
  // сюди додаєш тільки фрази, які хочеш другим голосом
  "Oblečenie je v skrini.",
  "Dám si studený nápoj.",
  "Ten dom je nový.",
  "Mám novú prácu.",
  "Mám unavené oko.",
  "Mám bolesť.",
  "Mám teplotu.",
  "Fúka vietor.",
  "Idem do lesa.",
  "Tu je jazero.",
  "Čo je to?",
  "Nie , ďakujem.",
  "Láska je krásna.",
  "Rozumiem všetko.",
  "Ty si môj priateľ.",
  "Na trhu kupujem ovocie.",
  "Nie je to ďaleko.",
  "Aký je termín?",
  "Správny poplatok je desať eur.",
  "Môžeme posunúť stretnutie na pondelok?",
  "Chcem sa zúčastniť školenia.",
  "Chcel by som reklamovať tento výrobok.",
  "Po tréningu sa vždy natiahnem.",
  "Chcem vymazať staré súbory.",
  "Tu je môj podpis.",
  "Aký je termín stretnutia?",
  "Doručenie bolo rýchlejšie, než som čakal.",
  "Chcem spiatočný lístok, prosím.",
  "Kde si môžem kúpiť cestovný lístok?",
  "Chcem uverejniť nový článok.",
  " Kedy bude upratovanie izby?",
  "Chcem si odvyknúť od sladkého.",
  "Je to miestny zvyk.",
  "On neučí dnes.",
]);

/**
 * ✅ TTS overrides (коли ElevenLabs криво читає слово)
 * Зараз overrides зроблені для WORDS (kind="word").
 */
const TTS_OVERRIDES = new Map<string, string>([
  ["brucho", "bru ho"],
  ["jazero", "ja ze ro"],
  ["tanec", "ta nec"],
  ["euro", "eu ro"],
  ["my", "mi"],
  ["niet za čo", "niet za čo"],
  ["kino", "ki no"],
  ["trh", "tr̩h"],
  ["balenie", "ba le nie"],
  ["dnes", "dnes"],
  ["výťah", "vý ťah"],
  ["hory", "ho ry"],
  ["vírus", "ví rus"],
  ["argument", "ar gu ment"],
  // ✅ alphabet fix
  ["ňho", "ň ho"],
]);

function ttsText(kind: Item["kind"], text: string) {
  if (kind !== "word") return text;
  const key = norm(text);
  for (const [k, v] of TTS_OVERRIDES.entries()) {
    if (norm(k) === key) return v;
  }
  return text;
}

function pickVoiceId(kind: Item["kind"], text: string) {
  const clean = text.trim();

  if (kind === "word") {
    return VOICE2_WORDS.has(clean) ? VOICE2 : VOICE1;
  }

  if (kind === "phrase") {
    return VOICE2_PHRASES.has(clean) ? VOICE2 : VOICE1;
  }

  return VOICE1;
}

function sha1(input: string) {
  return crypto.createHash("sha1").update(input, "utf8").digest("hex");
}

// ✅ MUST match SpeakButton.tsx:
// - words: sha1("word:<text>") full hex
// - phrases: sha1("<text>") slice(0,13)
function outPath(kind: Item["kind"], text: string) {
  const folder = kind === "word" ? WORDS_DIR : PHRASES_DIR;

  if (kind === "word") {
    const hash = sha1(`word:${text.trim()}`);
    return path.join(folder, `${hash}.mp3`);
  }

  const key13 = sha1(text.trim()).slice(0, 13);
  return path.join(folder, `${key13}.mp3`);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function ttsToFile(kind: Item["kind"], text: string, file: string) {
  const voiceId = pickVoiceId(kind, text);
  const sentText = ttsText(kind, text);

  console.log(`[TTS] kind=${kind} text="${text}" voice=${voiceId}`);
  if (sentText !== text) {
    console.log(`[TTS-TEXT] override: "${text}" -> "${sentText}"`);
  }
  console.log("OUT FILE =", file);

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": XI_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: sentText,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.35,
          similarity_boost: 0.85,
          style: 0.25,
          use_speaker_boost: true,
        },
      }),
    });

    if (res.ok) {
      const buffer = new Uint8Array(await res.arrayBuffer());
      fs.writeFileSync(file, buffer);
      return;
    }

    const status = res.status;
    const msg = await res.text().catch(() => "");
    const retryable = status === 429 || status >= 500;

    if (!retryable || attempt === 6) {
      throw new Error(`ElevenLabs error ${status}: ${msg}`);
    }

    await sleep(400 * attempt * attempt);
  }
}

function collectPhrases(): string[] {
  const list: string[] = [];
  const sources: any[] = [A0_PHRASES, A1_PHRASES, A2_PHRASES];

  for (const src of sources) {
    if (!src) continue;

    if (Array.isArray(src)) {
      for (const p of src) if (p?.sk) list.push(String(p.sk));
      continue;
    }

    if (typeof src === "object") {
      for (const v of Object.values(src)) {
        if ((v as any)?.sk) list.push(String((v as any).sk));
      }
    }
  }

  return list;
}

const ALL_LESSONS: any[] = [...(A1_ALL as any[]), ...(A2_ALL as any[])];

function collectAlphabetItems(): Item[] {
  const words = [
    "auto",
    "máš",
    "mesto",
    "méso",
    "lista",
    "píše",
    "dom",
    "stôl",
    "ulica",
    "dúfať",
    "syn",
    "býva",
    "čaj",
    "škola",
    "žena",
    "ďakujem",
    "ťa",
    "ňho",
    "ľudia",
    "chlieb",
    "medzi",
    "džús",
    "práca",
    "človek",
    "život",
    "učiteľ",
  ];

  const unique = Array.from(new Set(words.map((w) => w.trim()).filter(Boolean)));
  return unique.map((text) => ({ kind: "word" as const, text }));
}

// ✅ /grammar/cases (усі звучалки там — це phrases)
function collectCasesItems(): Item[] {
  const phrases = [
    // questions
    "Kto? Čo?",
    "Koho? Čoho?",
    "Komu? Čomu?",
    "Koho? Čo?",
    "O kom? O čom? Kde?",
    "S kým? S čím?",

    // examples
    "Ja som študent.",
    "Toto je auto.",
    "Brat pracuje.",

    "Nemám čas.",
    "Som z Ukrajiny.",
    "Idem do práce.",

    "Pomáham kamarátovi.",
    "Volám mame.",
    "Ďakujem ti.",

    "Vidím auto.",
    "Mám otázku.",
    "Idem na poštu.",

    "Som v práci.",
    "Hovoríme o škole.",
    "Bývam v meste.",

    "Idem s kamarátom.",
    "Píšem perom.",
    "Som sám/sama.",
  ];

  const unique = Array.from(new Set(phrases.map((p) => p.trim()).filter(Boolean)));
  return unique.map((text) => ({ kind: "phrase" as const, text }));
}

/* =========================================================
   ✅ NEW: negation + question generator (must match page.tsx logic)
   ========================================================= */

const IST_NEG: Record<string, string> = {
  idem: "nejdem",
  ideš: "nejdeš",
  ide: "nejde",
  ideme: "nejdeme",
  idete: "nejdete",
  idú: "nejdú",

  Idem: "Nejdem",
  Ideš: "Nejdeš",
  Ide: "Nejde",
  Ideme: "Nejdeme",
  Idete: "Nejdete",
  Idú: "Nejdú",
};

const BYT_NEG: Record<string, string> = {
  som: "nie som",
  si: "nie si",
  je: "nie je",
  sme: "nie sme",
  ste: "nie ste",
  sú: "nie sú",

  Som: "Nie som",
  Si: "Nie si",
  Je: "Nie je",
  Sme: "Nie sme",
  Ste: "Nie ste",
  Sú: "Nie sú",
};

function negateSentence(sentence: string) {
  const s = sentence.trim();
  if (!s) return s;

  const hasEnd = /[.!?]$/.test(s);
  const end = hasEnd ? s.slice(-1) : "";
  const core = hasEnd ? s.slice(0, -1) : s;

  const parts = core.split(/\s+/);

  const finish = (txt: string) => txt + (hasEnd ? end : "");

  const PRON = new Set([
    "Ja",
    "Ty",
    "On",
    "Ona",
    "Ono",
    "My",
    "Vy",
    "Oni",
    "ja",
    "ty",
    "on",
    "ona",
    "ono",
    "my",
    "vy",
    "oni",
  ]);

  // 0) Якщо є "Ja učím sa" → "Ja sa učím"
  if (
    parts.length >= 3 &&
    PRON.has(parts[0]) &&
    (parts[2] === "sa" || parts[2] === "si") &&
    parts[1] !== "sa" &&
    parts[1] !== "si"
  ) {
    const clitic = parts[2];
    parts.splice(2, 1);
    parts.splice(1, 0, clitic);
  }

  // 1) ísť
  for (let i = 0; i < Math.min(2, parts.length); i++) {
    if (IST_NEG[parts[i]]) {
      parts[i] = IST_NEG[parts[i]];
      return finish(parts.join(" "));
    }
  }

  // 2) byť
  for (let i = 0; i < Math.min(2, parts.length); i++) {
    if (BYT_NEG[parts[i]]) {
      parts[i] = BYT_NEG[parts[i]];
      return finish(parts.join(" "));
    }
  }

  // 3) Загальне правило: ne- + дієслово
  let verbIndex = 0;

  if (PRON.has(parts[0])) {
    if (parts[1] === "sa" || parts[1] === "si") verbIndex = 2; // Ja sa učím
    else verbIndex = 1; // Ja pracujem
  } else {
    verbIndex = 0; // Pracujem doma
  }

  if (verbIndex >= parts.length) return finish("Ne " + core);

  const verb = parts[verbIndex];

  // якщо вже заперечено
  if (/^ne/i.test(verb) || /^nie$/i.test(verb)) return finish(parts.join(" "));

  const negVerb =
    verb[0] === verb[0].toUpperCase()
      ? "Ne" + verb[0].toLowerCase() + verb.slice(1)
      : "ne" + verb;

  parts[verbIndex] = negVerb;
  return finish(parts.join(" "));
}

function makeQuestion(sentence: string) {
  const s = sentence.trim().replace(/[.!]$/, "");
  return s.endsWith("?") ? s : s + "?";
}

// Беремо лише "приклади" типу "... ." або "... !" і робимо derived варіанти:
// - заперечення (.) / (!) / (?) зберігаємо
// - питання -> "?"
function expandDerivedPhrases(items: Item[]): Item[] {
  const out: Item[] = [...items];

  for (const it of items) {
    if (it.kind !== "phrase") continue;

    const base = it.text.trim();
    if (!base) continue;

    // ✅ На verbs-present приклади завжди з крапкою.
    // Робимо derived для фраз, які виглядають як речення.
    const looksLikeSentence = /[.!]$/.test(base) || (base.includes(" ") && !base.endsWith("?"));
    if (!looksLikeSentence) continue;

    const neg = negateSentence(base);
    const q = makeQuestion(base);

    if (neg && neg !== base) out.push({ kind: "phrase", text: neg });
    if (q && q !== base) out.push({ kind: "phrase", text: q });
  }

  // unique
  const uniq = new Map<string, Item>();
  for (const it of out) {
    const key = `${it.kind}:${it.text.trim()}`;
    if (!uniq.has(key)) uniq.set(key, it);
  }
  return [...uniq.values()];
}

/**
 * ✅ /grammar/verbs-present (майже все — phrases)
 * Тут важливо: приклади мають "." (бо у UI заперечення/питання
 * утворюються з них на льоту).
 */
function collectVerbsPresentItems(): Item[] {
  const phrases = [
    // 3) conjugation (row.full)
    "ja pracujem",
    "ty pracuješ",
    "on pracuje",
    "ona pracuje",
    "ono pracuje",
    "my pracujeme",
    "vy pracujete",
    "oni pracujú",

    "ja robím",
    "ty robíš",
    "on robí",
    "ona robí",
    "ono robí",
    "my robíme",
    "vy robíte",
    "oni robia",

    "ja som",
    "ty si",
    "on je",
    "ona je",
    "ono je",
    "my sme",
    "vy ste",
    "oni sú",

    "ja bývam",
    "ty bývaš",
    "on býva",
    "ona býva",
    "ono býva",
    "my bývame",
    "vy bývate",
    "oni bývajú",

    "ja chodím",
    "ty chodíš",
    "on chodí",
    "ona chodí",
    "ono chodí",
    "my chodíme",
    "vy chodíte",
    "oni chodia",

    "ja učím",
    "ty učíš",
    "on učí",
    "ona učí",
    "ono učí",
    "my učíme",
    "vy učíte",
    "oni učia",

    "ja sa učím",
    "ty sa učíš",
    "on sa učí",
    "ona sa učí",
    "ono sa učí",
    "my sa učíme",
    "vy sa učíte",
    "oni sa učia",

    "ja hľadám",
    "ty hľadáš",
    "on hľadá",
    "ona hľadá",
    "ono hľadá",
    "my hľadáme",
    "vy hľadáte",
    "oni hľadajú",

    "ja mám",
    "ty máš",
    "on má",
    "ona má",
    "ono má",
    "my máme",
    "vy máte",
    "oni majú",

    "ja idem",
    "ty ideš",
    "on ide",
    "ona ide",
    "ono ide",
    "my ideme",
    "vy idete",
    "oni idú",

    // 4) examples (основні)
    "Ja pracujem v práci.",
    "Ty pracuješ dnes.",
    "On pracuje v Bratislave.",
    "Ona pracuje ráno.",
    "My pracujeme v práci.",
    "Vy pracujete dnes.",
    "Oni pracujú v Bratislave.",

    "Ja robím doma.",
    "Ty robíš úlohu.",
    "On robí to teraz.",
    "Ona robí v práci.",
    "My robíme doma.",
    "Vy robíte úlohu.",
    "Oni robia to teraz.",

    "Ja som doma.",
    "Ty si tu.",
    "On je v meste.",
    "Ona je v práci.",
    "My sme doma.",
    "Vy ste tu.",
    "Oni sú v meste.",

    "Ja bývam v Bratislave.",
    "Ty bývaš tu.",
    "On býva v meste.",
    "Ona býva doma.",
    "My bývame v Bratislave.",
    "Vy bývate tu.",
    "Oni bývajú v meste.",

    "Ja chodím do práce.",
    "Ty chodíš do školy.",
    "On chodí pešo.",
    "Ona chodí každý deň.",
    "My chodíme do práce.",
    "Vy chodíte do školy.",
    "Oni chodia pešo.",

    "Ja učím deti.",
    "Ty učíš po slovensky.",
    "On učí dnes.",
    "Ona učí v škole.",
    "My učíme deti.",
    "Vy učíte po slovensky.",
    "Oni učia dnes.",

    "Ja sa učím po slovensky.",
    "Ty sa učíš doma.",
    "On sa učí dnes.",
    "Ona sa učí v práci.",
    "My sa učíme po slovensky.",
    "Vy sa učíte doma.",
    "Oni sa učia dnes.",

    "Ja hľadám prácu.",
    "Ty hľadáš byt.",
    "On hľadá kľúč.",
    "Ona hľadá teraz.",
    "My hľadáme prácu.",
    "Vy hľadáte byt.",
    "Oni hľadajú kľúč.",

    "Ja mám čas.",
    "Ty máš prácu.",
    "On má lístok.",
    "Ona má otázku.",
    "My máme čas.",
    "Vy máte prácu.",
    "Oni majú lístok.",

    "Ja idem do práce.",
    "Ty ideš domov.",
    "On ide do mesta.",
    "Ona ide do obchodu.",
    "My ideme do práce.",
    "Vy idete domov.",
    "Oni idú do mesta.",
  ];

  const unique = Array.from(new Set(phrases.map((p) => p.trim()).filter(Boolean)));
  const base = unique.map((text) => ({ kind: "phrase" as const, text }));

  // ✅ ВАЖЛИВО: тут же додаємо neg/question, бо UI їх генерує на льоту.
  return expandDerivedPhrases(base);
}

function collect(): Item[] {
  const items: Item[] = [];

  for (const lesson of ALL_LESSONS) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk) items.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  for (const lesson of A0_REAL_SOURCE as any[]) {
    for (const w of lesson.words ?? []) {
      if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
      if (w?.phrase?.sk) items.push({ kind: "phrase", text: String(w.phrase.sk) });
    }
  }

  for (const w of WORDS as any[]) {
    if (w?.sk) items.push({ kind: "word", text: String(w.sk) });
  }

  for (const phrase of collectPhrases()) {
    items.push({ kind: "phrase", text: phrase });
  }

  const uniq = new Map<string, Item>();
  for (const it of items) {
    const key = `${it.kind}:${it.text.trim()}`;
    if (!uniq.has(key)) uniq.set(key, it);
  }

  return [...uniq.values()];
}

const ONLY = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1] ?? "";
const FORCE = process.argv.includes("--force");

const ALPHABET_ONLY = process.argv.includes("--alphabet");
const CASES_ONLY = process.argv.includes("--cases");
const VERBS_PRESENT_ONLY = process.argv.includes("--verbs-present");

async function main() {
  console.log("VOICE1 =", VOICE1);
  console.log("VOICE2 =", VOICE2);
  console.log("VOICE2 enabled? =", VOICE2 !== VOICE1);

  console.log("ALPHABET_ONLY =", ALPHABET_ONLY);
  console.log("CASES_ONLY =", CASES_ONLY);
  console.log("VERBS_PRESENT_ONLY =", VERBS_PRESENT_ONLY);
  console.log("FORCE =", FORCE);

  let items: Item[] = VERBS_PRESENT_ONLY
    ? collectVerbsPresentItems()
    : CASES_ONLY
      ? collectCasesItems()
      : ALPHABET_ONLY
        ? collectAlphabetItems()
        : [
          ...collect(),
          ...collectAlphabetItems(),
          ...collectCasesItems(),
          ...collectVerbsPresentItems(), // ✅ тут вже включено neg/question
        ];

  // ✅ unique після додавання
  {
    const uniq = new Map<string, Item>();
    for (const it of items) {
      const key = `${it.kind}:${it.text.trim()}`;
      if (!uniq.has(key)) uniq.set(key, it);
    }
    items = [...uniq.values()];
  }

  if (ONLY) {
    items = items.filter((i) => norm(i.text) === norm(ONLY));
    console.log(`ONLY mode: "${ONLY}" -> ${items.length} item(s)`);
  }

  console.log(`Total unique items: ${items.length}`);

  const limit = pLimit(4);

  await Promise.all(
    items.map((it) =>
      limit(async () => {
        const file = outPath(it.kind, it.text);

        // ✅ не чіпаємо вже згенероване (якщо немає --force)
        if (!FORCE && fs.existsSync(file) && fs.statSync(file).size > 1000) {
          return;
        }

        await ttsToFile(it.kind, it.text, file);
      })
    )
  );

  console.log("✅ DONE");
  console.log(`Saved in: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error("❌ ERROR:", e);
  process.exit(1);
});
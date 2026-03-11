export type Item = { kind: "word" | "phrase"; text: string };

/**
 * словники для negation
 */
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

export function negateSentence(sentence: string) {
  const s = sentence.trim();
  if (!s) return s;

  const hasEnd = /[.!?]$/.test(s);
  const end = hasEnd ? s.slice(-1) : "";
  const core = hasEnd ? s.slice(0, -1) : s;

  const parts = core.split(/\s+/);

  const finish = (txt: string) => txt + (hasEnd ? end : "");

  const PRON = new Set([
    "Ja","Ty","On","Ona","Ono","My","Vy","Oni",
    "ja","ty","on","ona","ono","my","vy","oni",
  ]);

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

  for (let i = 0; i < Math.min(2, parts.length); i++) {
    if (IST_NEG[parts[i]]) {
      parts[i] = IST_NEG[parts[i]];
      return finish(parts.join(" "));
    }
  }

  for (let i = 0; i < Math.min(2, parts.length); i++) {
    if (BYT_NEG[parts[i]]) {
      parts[i] = BYT_NEG[parts[i]];
      return finish(parts.join(" "));
    }
  }

  let verbIndex = 0;

  if (PRON.has(parts[0])) {
    if (parts[1] === "sa" || parts[1] === "si") verbIndex = 2;
    else verbIndex = 1;
  } else {
    verbIndex = 0;
  }

  if (verbIndex >= parts.length) return finish("Ne " + core);

  const verb = parts[verbIndex];

  if (/^ne/i.test(verb) || /^nie$/i.test(verb))
    return finish(parts.join(" "));

  const negVerb =
    verb[0] === verb[0].toUpperCase()
      ? "Ne" + verb[0].toLowerCase() + verb.slice(1)
      : "ne" + verb;

  parts[verbIndex] = negVerb;

  return finish(parts.join(" "));
}

export function makeQuestion(sentence: string) {
  const s = sentence.trim().replace(/[.!]$/, "");
  return s.endsWith("?") ? s : s + "?";
}

export function expandDerivedPhrases(items: Item[]): Item[] {
  const out: Item[] = [...items];

  for (const it of items) {
    if (it.kind !== "phrase") continue;

    const base = it.text.trim();
    if (!base) continue;

    const looksLikeSentence =
      /[.!]$/.test(base) || (base.includes(" ") && !base.endsWith("?"));

    if (!looksLikeSentence) continue;

    const neg = negateSentence(base);
    const q = makeQuestion(base);

    if (neg && neg !== base) out.push({ kind: "phrase", text: neg });
    if (q && q !== base) out.push({ kind: "phrase", text: q });
  }

  const uniq = new Map<string, Item>();

  for (const it of out) {
    const key = `${it.kind}:${it.text.trim()}`;
    if (!uniq.has(key)) uniq.set(key, it);
  }

  return [...uniq.values()];
}
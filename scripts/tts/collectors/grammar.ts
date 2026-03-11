import { expandDerivedPhrases } from "../generators/negation";

export type Item = { kind: "word" | "phrase"; text: string };

/**
 * Alphabet pronunciation items
 */
export function collectAlphabetItems(): Item[] {
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

  const unique = Array.from(
    new Set(words.map((w) => w.trim()).filter(Boolean))
  );

  return unique.map((text) => ({
    kind: "word",
    text,
  }));
}

/**
 * Grammar cases phrases
 */
export function collectCasesItems(): Item[] {
  const phrases = [
    "Kto? Čo?",
    "Koho? Čoho?",
    "Komu? Čomu?",
    "Koho? Čo?",
    "O kom? O čom? Kde?",
    "S kým? S čím?",

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

  const unique = Array.from(
    new Set(phrases.map((p) => p.trim()).filter(Boolean))
  );

  return unique.map((text) => ({
    kind: "phrase",
    text,
  }));
}

/**
 * Verbs present phrases
 */
export function collectVerbsPresentItems(): Item[] {
  const phrases = [
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

    "ja hľadám prácu.",
    "ty hľadáš byt.",
    "on hľadá kľúč.",
    "ona hľadá teraz.",

    "ja mám čas.",
    "ty máš prácu.",
    "on má lístok.",
    "ona má otázku.",

    "ja idem do práce.",
    "ty ideš domov.",
    "on ide do mesta.",
    "ona ide do obchodu.",
  ];

  const unique = Array.from(
    new Set(phrases.map((p) => p.trim()).filter(Boolean))
  );

  const base = unique.map((text) => ({
    kind: "phrase" as const,
    text,
  }));

  return expandDerivedPhrases(base);
}
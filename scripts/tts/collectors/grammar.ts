import { expandDerivedPhrases } from "../generators/negation";

export type Item = { kind: "word" | "phrase"; text: string };
export type CourseId = "sk" | "cs";

/**
 * Alphabet pronunciation items
 */
export function collectAlphabetItems(course: CourseId = "sk"): Item[] {
  const wordsSk = [
    "auto",
    "máš",
    "mesto",
    "mäso",
    "list",
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

  const wordsCs = [
    "auto",
    "máš",
    "město",
    "maso",
    "list",
    "píše",
    "dům",
    "stůl",
    "ulice",
    "doufat",
    "syn",
    "bydlí",
    "čaj",
    "škola",
    "žena",
    "děkuju",
    "tě",
    "něho",
    "lidé",
    "chléb",
    "mezi",
    "džus",
    "práce",
    "člověk",
    "život",
    "učitel",
  ];

  const words = course === "cs" ? wordsCs : wordsSk;

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
export function collectCasesItems(course: CourseId = "sk"): Item[] {
  const phrasesSk = [
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

  const phrasesCs = [
    "Kdo? Co?",
    "Koho? Čeho?",
    "Komu? Čemu?",
    "Koho? Co?",
    "O kom? O čem? Kde?",
    "S kým? S čím?",

    "Já jsem student.",
    "Tohle je auto.",
    "Bratr pracuje.",

    "Nemám čas.",
    "Jsem z Ukrajiny.",
    "Jdu do práce.",

    "Pomáhám kamarádovi.",
    "Volám mámě.",
    "Děkuju ti.",

    "Vidím auto.",
    "Mám otázku.",
    "Jdu na poštu.",

    "Jsem v práci.",
    "Mluvíme o škole.",
    "Bydlím ve městě.",

    "Jdu s kamarádem.",
    "Píšu perem.",
    "Jsem sám/sama.",
  ];

  const phrases = course === "cs" ? phrasesCs : phrasesSk;

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
export function collectVerbsPresentItems(course: CourseId = "sk"): Item[] {
  const phrasesSk = [
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

  const phrasesCs = [
    "já pracuji",
    "ty pracuješ",
    "on pracuje",
    "ona pracuje",
    "ono pracuje",
    "my pracujeme",
    "vy pracujete",
    "oni pracují",

    "já dělám",
    "ty děláš",
    "on dělá",
    "ona dělá",
    "ono dělá",
    "my děláme",
    "vy děláte",
    "oni dělají",

    "já jsem",
    "ty jsi",
    "on je",
    "ona je",
    "ono je",
    "my jsme",
    "vy jste",
    "oni jsou",

    "já bydlím",
    "ty bydlíš",
    "on bydlí",
    "ona bydlí",
    "ono bydlí",
    "my bydlíme",
    "vy bydlíte",
    "oni bydlí",

    "já chodím",
    "ty chodíš",
    "on chodí",
    "ona chodí",
    "ono chodí",
    "my chodíme",
    "vy chodíte",
    "oni chodí",

    "já učím",
    "ty učíš",
    "on učí",
    "ona učí",
    "ono učí",
    "my učíme",
    "vy učíte",
    "oni učí",

    "já se učím",
    "ty se učíš",
    "on se učí",
    "ona se učí",
    "ono se učí",
    "my se učíme",
    "vy se učíte",
    "oni se učí",

    "já hledám práci.",
    "ty hledáš byt.",
    "on hledá klíč.",
    "ona hledá teď.",

    "já mám čas.",
    "ty máš práci.",
    "on má lístek.",
    "ona má otázku.",

    "já jdu do práce.",
    "ty jdeš domů.",
    "on jde do města.",
    "ona jde do obchodu.",
  ];

  const phrases = course === "cs" ? phrasesCs : phrasesSk;

  const unique = Array.from(
    new Set(phrases.map((p) => p.trim()).filter(Boolean))
  );

  const base = unique.map((text) => ({
    kind: "phrase" as const,
    text,
  }));

  return expandDerivedPhrases(base);
}
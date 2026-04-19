import { VOICE1, VOICE2, VOICE_CS, VOICE_PL } from "./elevenlabs-client";

export type ItemKind = "word" | "phrase";
export type CourseId = "sk" | "cs" | "pl";

function norm(s: string) {
  return s.trim().normalize("NFC");
}

/**
 * слова для другого голосу
 */
export const VOICE2_WORDS = new Set<string>([
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
  "čas",
  "dobrý",
  "okno",
  "dom",
  "kolega",
  "trieda",
  "tri",
  "päť",
  "osem",
  "bunda",
  "teplota",
  "les",
  "benefit",
  "zhoršiť sa",
  "zotavenie",
  "hádka",
  "odpustiť",
  "porcia",
  "vkus",
  "recenzia",
  "rozhodca",
  "deliť",
  "označiť",
  "hosť",
  "sklamanie",
  "Londýn",
  "Ottawa",
  "had",
  "most",
  "semafor",
  "Koľko ešte?",
  "Nejde to",
  "To je jedno",
  "zima",
]);

/**
 * фрази для другого голосу
 */
export const VOICE2_PHRASES = new Set<string>([
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
  "Kedy bude upratovanie izby?",
  "Chcem si odvyknúť od sladkého.",
  "Je to miestny zvyk.",
  "On neučí dnes.",
  "Chcem sa vyjadriť pokojne, aby sme sa pochopili.",
  "Na druhej strane je to dobrá príležitosť, ktorú nechcem premárniť.",
  "Belgicko je malé, ale má veľa zaujímavých miest na návštevu.",
  "Je normálne sklamať sa, keď veci nejdú podľa plánu.",
  "Chcem byť doma.",
  "Chcem to zmeniť.",
  "Paráda, tak ideme!",
  "Všetko je v poriadku.",
  "Môj otec pracuje v meste.",
  "Bolie ma hlava.",
  "Zdravie je dôležité.",
]);

/**
 * overrides коли ElevenLabs читає неправильно
 */
export const TTS_OVERRIDES = new Map<string, string>([
  ["brucho", "bru ho"],
  ["jazero", "ja ze ro"],
  ["tanec", "ta nec"],
  ["euro", "euuro."],
  ["my", "mi"],
  ["kino", "ki no"],
  ["trh", "tr̩h"],
  ["balenie", "ba le nie"],
  ["výťah", "vý ťah"],
  ["hory", "ho ry"],
  ["vírus", "ví rus"],
  ["argument", "ar gu ment"],
  ["ňho", "ň ho"],
  ["park", "park"],
  ["rok", "rok"],
  ["les", "les."],
  ["nos", "nos"],
  ["hora", "ho ra"],
  ["sucho", "suho"],
  ["porcia", "por-tsia"],
  ["recenzia", "retsenzia"],
  ["percento", "pertsento"],
  ["Ottawa", "otava"],
  ["sport", "sport."],
  ["pas", "pas."],
  ["oddělení", "oddělení."],
  ["balkon", "balkon."],
  ["energie", "energie."],
  ["recept", "recépt,"],
  ["kurz", "kúrz."],
  ["ingredience", "ingredijence"],
  ["virus", "vírus"],
  ["festival", "festyval"],
  ["intolerance", "intolerancie"],
  ["recenze", "retsenze"],
  ["parlament", "paŕlament."],
  ["host", "hosť."],
  ["tolerance", "tolerantse."],
  ["Rumunsko", "RŔumunsko."],
  ["Bible", "bíble"],
  ["Bern", "bérn"],
  ["Amsterdam", "ámsterdam"],
  ["Borci", "bortsí"],
  ["Pecka", "pecká"],
  ["most", "mostt"],
  ["more", "moré"],
  ["chyba", "chíba"],
  ["hosť", "hhosť."],
  ["Kyjev", "Kyjév."],
  ["verdikt", "verdíkt"],
  ["recept", "retcept"],
  ["cuketa", "cúketa"],
  ["protiargument", "protiargúment"],
  ["raketa", "ráketa"],
  ["set", "sét"],
  ["udica", "udícá"],
  ["breh", "bréghh"],
  ["triler", "tríler"],
  ["melódia", "melódia"],
  ["energia", "energhía"],
  ["socha", "sochá"],
  ["portrét", "po rtrét"],
  ["most", "môst"],
  ["juh", "júgh"],
  ["misia", "mísiá"],
  ["experiment", "experímént"],
  ["kyselina", "kýselina"],
]);

export function ttsText(kind: ItemKind, text: string) {
  if (kind !== "word") return text;

  const key = norm(text);

  for (const [k, v] of TTS_OVERRIDES.entries()) {
    if (norm(k) === key) return v;
  }

  return text;
}

export function pickVoiceId(course: CourseId, kind: ItemKind, text: string) {
  const clean = text.trim();

  // увесь чеський курс іде окремим голосом
  if (course === "cs") {
    return VOICE_CS;
  }

  // увесь польський курс іде окремим голосом
  if (course === "pl") {
    return VOICE_PL;
  }

  // стара словацька логіка лишається як була
  if (kind === "word") {
    return VOICE2_WORDS.has(clean) ? VOICE2 : VOICE1;
  }

  if (kind === "phrase") {
    return VOICE2_PHRASES.has(clean) ? VOICE2 : VOICE1;
  }

  return VOICE1;
}
import type { GrammarCourseId, PersonKey, VerbBlock, W } from "./verbs-present-data";
import {
  BYC_NEG_PL,
  BYT_NEG_CS,
  BYT_NEG_SK,
  ISC_NEG_PL,
  IST_NEG_SK,
  JIT_NEG_CS,
} from "./verbs-present-data";

export function capFirst(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

export function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

  "Já",
  "já",

  "Wy",
  "wy",
]);

type TailMap = Record<
  string,
  { sk: string[]; ua: string[]; ru: string[]; en: string[] }
>;

const TAILS_SK: TailMap = {
  pracovat: {
    sk: ["v práci", "dnes", "v Bratislave", "ráno"],
    ua: ["на роботі", "сьогодні", "в Братиславі", "зранку"],
    ru: ["на работе", "сегодня", "в Братиславе", "утром"],
    en: ["at work", "today", "in Bratislava", "in the morning"],
  },
  robit: {
    sk: ["doma", "úlohu", "to teraz", "v práci"],
    ua: ["вдома", "завдання", "це зараз", "на роботі"],
    ru: ["дома", "задание", "это сейчас", "на работе"],
    en: ["at home", "homework", "this now", "at work"],
  },
  byt: {
    sk: ["doma", "tu", "v meste", "v práci"],
    ua: ["вдома", "тут", "в місті", "на роботі"],
    ru: ["дома", "здесь", "в городе", "на работе"],
    en: ["at home", "here", "in the city", "at work"],
  },
  byvat: {
    sk: ["v Bratislave", "tu", "v meste", "doma"],
    ua: ["в Братиславі", "тут", "в місті", "вдома"],
    ru: ["в Братиславе", "здесь", "в городе", "дома"],
    en: ["in Bratislava", "here", "in the city", "at home"],
  },
  chodit: {
    sk: ["do práce", "do školy", "pešo", "každý deň"],
    ua: ["на роботу", "до школи", "пішки", "щодня"],
    ru: ["на работу", "в школу", "пешком", "каждый день"],
    en: ["to work", "to school", "on foot", "every day"],
  },
  ucit: {
    sk: ["deti", "po slovensky", "dnes", "v škole"],
    ua: ["дітей", "словацьку", "сьогодні", "в школі"],
    ru: ["детей", "словацкий", "сегодня", "в школе"],
    en: ["children", "Slovak", "today", "at school"],
  },
  ucitsa: {
    sk: ["po slovensky", "doma", "dnes", "v práci"],
    ua: ["словацької", "вдома", "сьогодні", "на роботі"],
    ru: ["по-словацки", "дома", "сегодня", "на работе"],
    en: ["Slovak", "at home", "today", "at work"],
  },
  hladat: {
    sk: ["prácu", "byt", "kľúč", "teraz"],
    ua: ["роботу", "квартиру", "ключ", "зараз"],
    ru: ["работу", "квартиру", "ключ", "сейчас"],
    en: ["a job", "an apartment", "a key", "now"],
  },
  mat: {
    sk: ["čas", "prácu", "lístok", "otázku"],
    ua: ["час", "роботу", "квиток", "питання"],
    ru: ["время", "работу", "билет", "вопрос"],
    en: ["time", "a job", "a ticket", "a question"],
  },
  ist: {
    sk: ["do práce", "domov", "do mesta", "do obchodu"],
    ua: ["на роботу", "додому", "в місто", "в магазин"],
    ru: ["на работу", "домой", "в город", "в магазин"],
    en: ["to work", "home", "to the city", "to the shop"],
  },
  default: {
    sk: ["dnes", "teraz", "doma", "v práci"],
    ua: ["сьогодні", "зараз", "вдома", "на роботі"],
    ru: ["сегодня", "сейчас", "дома", "на работе"],
    en: ["today", "now", "at home", "at work"],
  },
};

const TAILS_CS: TailMap = {
  pracovat: {
    sk: ["v práci", "dnes", "v Praze", "ráno"],
    ua: ["на роботі", "сьогодні", "у Празі", "зранку"],
    ru: ["на работе", "сегодня", "в Праге", "утром"],
    en: ["at work", "today", "in Prague", "in the morning"],
  },
  delat: {
    sk: ["doma", "úkol", "to teď", "v práci"],
    ua: ["вдома", "завдання", "це зараз", "на роботі"],
    ru: ["дома", "задание", "это сейчас", "на работе"],
    en: ["at home", "homework", "this now", "at work"],
  },
  byt: {
    sk: ["doma", "tady", "ve městě", "v práci"],
    ua: ["вдома", "тут", "у місті", "на роботі"],
    ru: ["дома", "здесь", "в городе", "на работе"],
    en: ["at home", "here", "in the city", "at work"],
  },
  bydlet: {
    sk: ["v Praze", "tady", "ve městě", "doma"],
    ua: ["у Празі", "тут", "у місті", "вдома"],
    ru: ["в Праге", "здесь", "в городе", "дома"],
    en: ["in Prague", "here", "in the city", "at home"],
  },
  chodit: {
    sk: ["do práce", "do školy", "pěšky", "každý den"],
    ua: ["на роботу", "до школи", "пішки", "щодня"],
    ru: ["на работу", "в школу", "пешком", "каждый день"],
    en: ["to work", "to school", "on foot", "every day"],
  },
  ucit: {
    sk: ["děti", "česky", "dnes", "ve škole"],
    ua: ["дітей", "чеської", "сьогодні", "у школі"],
    ru: ["детей", "чешскому", "сегодня", "в школе"],
    en: ["children", "Czech", "today", "at school"],
  },
  ucitse: {
    sk: ["česky", "doma", "dnes", "v práci"],
    ua: ["чеської", "вдома", "сьогодні", "на роботі"],
    ru: ["чешский", "дома", "сегодня", "на работе"],
    en: ["Czech", "at home", "today", "at work"],
  },
  hledat: {
    sk: ["práci", "byt", "klíč", "teď"],
    ua: ["роботу", "квартиру", "ключ", "зараз"],
    ru: ["работу", "квартиру", "ключ", "сейчас"],
    en: ["a job", "an apartment", "a key", "now"],
  },
  mit: {
    sk: ["čas", "práci", "lístek", "otázku"],
    ua: ["час", "роботу", "квиток", "питання"],
    ru: ["время", "работу", "билет", "вопрос"],
    en: ["time", "a job", "a ticket", "a question"],
  },
  jit: {
    sk: ["do práce", "domů", "do města", "do obchodu"],
    ua: ["на роботу", "додому", "у місто", "в магазин"],
    ru: ["на работу", "домой", "в город", "в магазин"],
    en: ["to work", "home", "to the city", "to the shop"],
  },
  default: {
    sk: ["dnes", "teď", "doma", "v práci"],
    ua: ["сьогодні", "зараз", "вдома", "на роботі"],
    ru: ["сегодня", "сейчас", "дома", "на работе"],
    en: ["today", "now", "at home", "at work"],
  },
};

const TAILS_PL: TailMap = {
  pracowac: {
    sk: ["w pracy", "dzisiaj", "w Warszawie", "rano"],
    ua: ["на роботі", "сьогодні", "у Варшаві", "зранку"],
    ru: ["на работе", "сегодня", "в Варшаве", "утром"],
    en: ["at work", "today", "in Warsaw", "in the morning"],
  },
  robic: {
    sk: ["w domu", "zadanie", "to teraz", "w pracy"],
    ua: ["вдома", "завдання", "це зараз", "на роботі"],
    ru: ["дома", "задание", "это сейчас", "на работе"],
    en: ["at home", "homework", "this now", "at work"],
  },
  byc: {
    sk: ["w domu", "tutaj", "w mieście", "w pracy"],
    ua: ["вдома", "тут", "у місті", "на роботі"],
    ru: ["дома", "здесь", "в городе", "на работе"],
    en: ["at home", "here", "in the city", "at work"],
  },
  mieszkac: {
    sk: ["w Warszawie", "tutaj", "w mieście", "w domu"],
    ua: ["у Варшаві", "тут", "у місті", "вдома"],
    ru: ["в Варшаве", "здесь", "в городе", "дома"],
    en: ["in Warsaw", "here", "in the city", "at home"],
  },
  chodzic: {
    sk: ["do pracy", "do szkoły", "pieszo", "codziennie"],
    ua: ["на роботу", "до школи", "пішки", "щодня"],
    ru: ["на работу", "в школу", "пешком", "каждый день"],
    en: ["to work", "to school", "on foot", "every day"],
  },
  uczyc: {
    sk: ["dzieci", "polskiego", "dzisiaj", "w szkole"],
    ua: ["дітей", "польської", "сьогодні", "у школі"],
    ru: ["детей", "польскому", "сегодня", "в школе"],
    en: ["children", "Polish", "today", "at school"],
  },
  uczycsie: {
    sk: ["polskiego", "w domu", "dzisiaj", "w pracy"],
    ua: ["польської", "вдома", "сьогодні", "на роботі"],
    ru: ["польский", "дома", "сегодня", "на работе"],
    en: ["Polish", "at home", "today", "at work"],
  },
  szukac: {
    sk: ["pracy", "mieszkania", "klucza", "teraz"],
    ua: ["роботу", "квартиру", "ключ", "зараз"],
    ru: ["работу", "квартиру", "ключ", "сейчас"],
    en: ["a job", "an apartment", "a key", "now"],
  },
  miec: {
    sk: ["czas", "pracę", "bilet", "pytanie"],
    ua: ["час", "роботу", "квиток", "питання"],
    ru: ["время", "работу", "билет", "вопрос"],
    en: ["time", "a job", "a ticket", "a question"],
  },
  isc: {
    sk: ["do pracy", "do domu", "do miasta", "do sklepu"],
    ua: ["на роботу", "додому", "у місто", "в магазин"],
    ru: ["на работу", "домой", "в город", "в магазин"],
    en: ["to work", "home", "to the city", "to the shop"],
  },
  default: {
    sk: ["dzisiaj", "teraz", "w domu", "w pracy"],
    ua: ["сьогодні", "зараз", "вдома", "на роботі"],
    ru: ["сегодня", "сейчас", "дома", "на работе"],
    en: ["today", "now", "at home", "at work"],
  },
};

export function negateSentence(sentence: string, courseId: GrammarCourseId) {
  const s = sentence.trim();
  if (!s) return s;

  const hasEnd = /[.!?]$/.test(s);
  const end = hasEnd ? s.slice(-1) : "";
  const core = hasEnd ? s.slice(0, -1) : s;

  const parts = core.split(/\s+/);
  const finish = (txt: string) => txt + (hasEnd ? end : "");

  if (courseId === "sk") {
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
      if (IST_NEG_SK[parts[i]]) {
        parts[i] = IST_NEG_SK[parts[i]];
        return finish(parts.join(" "));
      }
    }

    for (let i = 0; i < Math.min(2, parts.length); i++) {
      if (BYT_NEG_SK[parts[i]]) {
        parts[i] = BYT_NEG_SK[parts[i]];
        return finish(parts.join(" "));
      }
    }
  }

  if (courseId === "cs") {
    for (let i = 0; i < Math.min(2, parts.length); i++) {
      if (JIT_NEG_CS[parts[i]]) {
        parts[i] = JIT_NEG_CS[parts[i]];
        return finish(parts.join(" "));
      }
    }

    for (let i = 0; i < Math.min(2, parts.length); i++) {
      if (BYT_NEG_CS[parts[i]]) {
        parts[i] = BYT_NEG_CS[parts[i]];
        return finish(parts.join(" "));
      }
    }
  }

  if (courseId === "pl") {
    for (let i = 0; i < Math.min(2, parts.length); i++) {
      if (ISC_NEG_PL[parts[i]]) {
        parts[i] = ISC_NEG_PL[parts[i]];
        return finish(parts.join(" "));
      }
    }

    for (let i = 0; i < Math.min(2, parts.length); i++) {
      if (BYC_NEG_PL[parts[i]]) {
        parts[i] = BYC_NEG_PL[parts[i]];
        return finish(parts.join(" "));
      }
    }
  }

  let verbIndex = 0;

  if (PRON.has(parts[0])) {
    if (courseId === "sk" && (parts[1] === "sa" || parts[1] === "si")) verbIndex = 2;
    else verbIndex = 1;
  } else {
    verbIndex = 0;
  }

  if (verbIndex >= parts.length) {
    return finish((courseId === "pl" ? "Nie " : "Ne ") + core);
  }

  const verb = parts[verbIndex];

  if (
    /^ne/i.test(verb) ||
    /^nie$/i.test(verb) ||
    (courseId === "pl" && parts[verbIndex - 1]?.toLowerCase() === "nie")
  ) {
    return finish(parts.join(" "));
  }

  if (courseId === "pl") {
    parts.splice(verbIndex, 0, verb[0] === verb[0].toUpperCase() ? "Nie" : "nie");
    return finish(parts.join(" "));
  }

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

export function makeQuiz(active: VerbBlock) {
  const rows = shuffle(active.rows).slice(0, 4);

  return rows.map((r) => {
    const correct = r.form;
    const opts = new Set<string>([correct]);

    while (opts.size < 4) {
      const pick = active.rows[Math.floor(Math.random() * active.rows.length)].form;
      opts.add(pick);
    }

    return { person: r.person, correct, options: shuffle(Array.from(opts)) };
  });
}

export function makeSentenceParts(example: string) {
  return shuffle(example.replace(/[.!?]$/, "").split(" "));
}

export function genExamplesFromRows(active: VerbBlock, courseId: GrammarCourseId): W[] {
  const tailsByCourse =
    courseId === "cs" ? TAILS_CS : courseId === "pl" ? TAILS_PL : TAILS_SK;

  const tails = tailsByCourse[active.id] ?? tailsByCourse.default;
  const wanted: PersonKey[] = ["ja", "ty", "on", "ona", "my", "vy", "oni"];

  const rowMap = new Map(active.rows.map((r) => [r.person, r]));

  return wanted.map((p, idx) => {
    const row = rowMap.get(p);
    if (!row) return { sk: "", ua: "", ru: "", en: "" };

    const tailSk = tails.sk[idx % tails.sk.length];
    const tailUa = tails.ua[idx % tails.ua.length];
    const tailRu = tails.ru[idx % tails.ru.length];
    const tailEn = tails.en[idx % tails.en.length];

    const sk = `${capFirst(row.full)} ${tailSk}.`.replace(/\s+/g, " ");
    const ua = `${capFirst(row.tr.ua)} ${tailUa}.`.replace(/\s+/g, " ");
    const ru = `${capFirst(row.tr.ru ?? row.tr.ua)} ${tailRu}.`.replace(/\s+/g, " ");
    const en = `${capFirst(row.tr.en ?? row.tr.ua)} ${tailEn}.`.replace(/\s+/g, " ");

    return { sk, ua, ru, en };
  });
}
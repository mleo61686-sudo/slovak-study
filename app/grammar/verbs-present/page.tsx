"use client";

import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { trWord } from "@/lib/src/tr";
import { useEffect, useMemo, useState } from "react";

type W = { sk: string; ua: string; ru?: string };

type PersonKey = "ja" | "ty" | "on" | "ona" | "ono" | "my" | "vy" | "oni";
type ConjugationRow = {
  person: PersonKey;
  form: string; // форма, яка відображається поруч із займенником
  full: string; // що читаємо через TTS
  tr: W; // переклад форми
};

type VerbBlock = {
  id: string;
  infinitive: string;
  meaning: W;
  note?: W; // ✅ тепер реально W (UA/RU)
  rows: ConjugationRow[];
  examples: W[]; // залишимо для сумісності
};

const PRONOUNS: Record<PersonKey, W> = {
  ja: { sk: "ja", ua: "я", ru: "я" },
  ty: { sk: "ty", ua: "ти", ru: "ты" },
  on: { sk: "on", ua: "він", ru: "он" },
  ona: { sk: "ona", ua: "вона", ru: "она" },
  ono: { sk: "ono", ua: "воно", ru: "оно" },
  my: { sk: "my", ua: "ми", ru: "мы" },
  vy: { sk: "vy", ua: "ви", ru: "вы" },
  oni: { sk: "oni", ua: "вони", ru: "они" },
};

function capFirst(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}
type UiLang = "ua" | "ru";

const UI: Record<UiLang, { infinitive: string; hint: string }> = {
  ua: {
    infinitive: "Інфінітив",
    hint: "Підказка",
  },
  ru: {
    infinitive: "Инфинитив",
    hint: "Подсказка",
  },
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

  // 1) ísť (враховуємо перші 2 токени)
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

// ===== DATA =====
const VERBS: VerbBlock[] = [
  {
    id: "pracovat",
    infinitive: "pracovať",
    meaning: { sk: "pracovať", ua: "працювати", ru: "работать" },
    note: {
      sk: "Tip: -ovať",
      ua: "Типове дієслово на -ovať: ja pracujem, ty pracuješ…",
      ru: "Типичный глагол на -ovať: ja pracujem, ty pracuješ…",
    },
    rows: [
      { person: "ja", form: "pracujem", full: "ja pracujem", tr: { sk: "ja pracujem", ua: "я працюю", ru: "я работаю" } },
      { person: "ty", form: "pracuješ", full: "ty pracuješ", tr: { sk: "ty pracuješ", ua: "ти працюєш", ru: "ты работаешь" } },
      { person: "on", form: "pracuje", full: "on pracuje", tr: { sk: "on pracuje", ua: "він працює", ru: "он работает" } },
      { person: "ona", form: "pracuje", full: "ona pracuje", tr: { sk: "ona pracuje", ua: "вона працює", ru: "она работает" } },
      { person: "ono", form: "pracuje", full: "ono pracuje", tr: { sk: "ono pracuje", ua: "воно працює", ru: "оно работает" } },
      { person: "my", form: "pracujeme", full: "my pracujeme", tr: { sk: "my pracujeme", ua: "ми працюємо", ru: "мы работаем" } },
      { person: "vy", form: "pracujete", full: "vy pracujete", tr: { sk: "vy pracujete", ua: "ви працюєте", ru: "вы работаете" } },
      { person: "oni", form: "pracujú", full: "oni pracujú", tr: { sk: "oni pracujú", ua: "вони працюють", ru: "они работают" } },
    ],
    examples: [{ sk: "Ja pracujem dnes.", ua: "Я працюю сьогодні.", ru: "Я работаю сегодня." }],
  },

  {
    id: "robit",
    infinitive: "robiť",
    meaning: { sk: "robiť", ua: "робити", ru: "делать" },
    note: {
      sk: "Tip: robím/robíš",
      ua: "Найчастіше дієслово: robím/robíš/robí…",
      ru: "Самый частый глагол: robím/robíš/robí…",
    },
    rows: [
      { person: "ja", form: "robím", full: "ja robím", tr: { sk: "ja robím", ua: "я роблю", ru: "я делаю" } },
      { person: "ty", form: "robíš", full: "ty robíš", tr: { sk: "ty robíš", ua: "ти робиш", ru: "ты делаешь" } },
      { person: "on", form: "robí", full: "on robí", tr: { sk: "on robí", ua: "він робить", ru: "он делает" } },
      { person: "ona", form: "robí", full: "ona robí", tr: { sk: "ona robí", ua: "вона робить", ru: "она делает" } },
      { person: "ono", form: "robí", full: "ono robí", tr: { sk: "ono robí", ua: "воно робить", ru: "оно делает" } },
      { person: "my", form: "robíme", full: "my robíme", tr: { sk: "my robíme", ua: "ми робимо", ru: "мы делаем" } },
      { person: "vy", form: "robíte", full: "vy robíte", tr: { sk: "vy robíte", ua: "ви робите", ru: "вы делаете" } },
      { person: "oni", form: "robia", full: "oni robia", tr: { sk: "oni robia", ua: "вони роблять", ru: "они делают" } },
    ],
    examples: [{ sk: "Ja robím úlohu.", ua: "Я роблю завдання.", ru: "Я делаю задание." }],
  },

  {
    id: "byt",
    infinitive: "byť",
    meaning: { sk: "byť", ua: "бути", ru: "быть" },
    note: {
      sk: "Tip: som/si/je",
      ua: "Нерегулярне: som/si/je…",
      ru: "Нерегулярное: som/si/je…",
    },
    rows: [
      { person: "ja", form: "som", full: "ja som", tr: { sk: "ja som", ua: "я є / я (…)", ru: "я (есть) / я (…)" } },
      { person: "ty", form: "si", full: "ty si", tr: { sk: "ty si", ua: "ти є / ти (…)", ru: "ты (есть) / ты (…)" } },
      { person: "on", form: "je", full: "on je", tr: { sk: "on je", ua: "він є", ru: "он есть" } },
      { person: "ona", form: "je", full: "ona je", tr: { sk: "ona je", ua: "вона є", ru: "она есть" } },
      { person: "ono", form: "je", full: "ono je", tr: { sk: "ono je", ua: "воно є", ru: "оно есть" } },
      { person: "my", form: "sme", full: "my sme", tr: { sk: "my sme", ua: "ми є", ru: "мы есть" } },
      { person: "vy", form: "ste", full: "vy ste", tr: { sk: "vy ste", ua: "ви є", ru: "вы есть" } },
      { person: "oni", form: "sú", full: "oni sú", tr: { sk: "oni sú", ua: "вони є", ru: "они есть" } },
    ],
    examples: [{ sk: "Ja som doma.", ua: "Я вдома.", ru: "Я дома." }],
  },

  {
    id: "byvat",
    infinitive: "bývať",
    meaning: { sk: "bývať", ua: "жити (мешкати)", ru: "жить (проживать)" },
    note: {
      sk: "Tip: bývam/bývaš",
      ua: "Про місце проживання: bývam/bývaš…",
      ru: "Про место проживания: bývam/bývaš…",
    },
    rows: [
      { person: "ja", form: "bývam", full: "ja bývam", tr: { sk: "ja bývam", ua: "я живу", ru: "я живу" } },
      { person: "ty", form: "bývaš", full: "ty bývaš", tr: { sk: "ty bývaš", ua: "ти живеш", ru: "ты живёшь" } },
      { person: "on", form: "býva", full: "on býva", tr: { sk: "on býva", ua: "він живе", ru: "он живёт" } },
      { person: "ona", form: "býva", full: "ona býva", tr: { sk: "ona býva", ua: "вона живе", ru: "она живёт" } },
      { person: "ono", form: "býva", full: "ono býva", tr: { sk: "ono býva", ua: "воно живе", ru: "оно живёт" } },
      { person: "my", form: "bývame", full: "my bývame", tr: { sk: "my bývame", ua: "ми живемо", ru: "мы живём" } },
      { person: "vy", form: "bývate", full: "vy bývate", tr: { sk: "vy bývate", ua: "ви живете", ru: "вы живёте" } },
      { person: "oni", form: "bývajú", full: "oni bývajú", tr: { sk: "oni bývajú", ua: "вони живуть", ru: "они живут" } },
    ],
    examples: [{ sk: "Ja bývam v Bratislave.", ua: "Я живу в Братиславі.", ru: "Я живу в Братиславе." }],
  },

  {
    id: "chodit",
    infinitive: "chodiť",
    meaning: { sk: "chodiť", ua: "ходити", ru: "ходить" },
    note: {
      sk: "Tip: chodím/chodíš",
      ua: "Регулярний рух: chodím/chodíš…",
      ru: "Регулярное движение: chodím/chodíš…",
    },
    rows: [
      { person: "ja", form: "chodím", full: "ja chodím", tr: { sk: "ja chodím", ua: "я ходжу", ru: "я хожу" } },
      { person: "ty", form: "chodíš", full: "ty chodíš", tr: { sk: "ty chodíš", ua: "ти ходиш", ru: "ты ходишь" } },
      { person: "on", form: "chodí", full: "on chodí", tr: { sk: "on chodí", ua: "він ходить", ru: "он ходит" } },
      { person: "ona", form: "chodí", full: "ona chodí", tr: { sk: "ona chodí", ua: "вона ходить", ru: "она ходит" } },
      { person: "ono", form: "chodí", full: "ono chodí", tr: { sk: "ono chodí", ua: "воно ходить", ru: "оно ходит" } },
      { person: "my", form: "chodíme", full: "my chodíme", tr: { sk: "my chodíme", ua: "ми ходимо", ru: "мы ходим" } },
      { person: "vy", form: "chodíte", full: "vy chodíte", tr: { sk: "vy chodíte", ua: "ви ходите", ru: "вы ходите" } },
      { person: "oni", form: "chodia", full: "oni chodia", tr: { sk: "oni chodia", ua: "вони ходять", ru: "они ходят" } },
    ],
    examples: [{ sk: "Chodím do práce.", ua: "Я ходжу на роботу.", ru: "Я хожу на работу." }],
  },

  {
    id: "ucit",
    infinitive: "učiť",
    meaning: { sk: "učiť", ua: "вчити / навчати", ru: "учить / обучать" },
    note: {
      sk: "Tip: učím/učíš",
      ua: "Навчання: učím/učiš…",
      ru: "Обучение: učím/učíš…",
    },
    rows: [
      { person: "ja", form: "učím", full: "ja učím", tr: { sk: "ja učím", ua: "я вчу", ru: "я учу" } },
      { person: "ty", form: "učíš", full: "ty učíš", tr: { sk: "ty učíš", ua: "ти вчиш", ru: "ты учишь" } },
      { person: "on", form: "učí", full: "on učí", tr: { sk: "on učí", ua: "він вчить", ru: "он учит" } },
      { person: "ona", form: "učí", full: "ona učí", tr: { sk: "ona učí", ua: "вона вчить", ru: "она учит" } },
      { person: "ono", form: "učí", full: "ono učí", tr: { sk: "ono učí", ua: "воно вчить", ru: "оно учит" } },
      { person: "my", form: "učíme", full: "my učíme", tr: { sk: "my učíme", ua: "ми вчимо", ru: "мы учим" } },
      { person: "vy", form: "učíte", full: "vy učíte", tr: { sk: "vy učíte", ua: "ви вчите", ru: "вы учите" } },
      { person: "oni", form: "učia", full: "oni učia", tr: { sk: "oni učia", ua: "вони вчать", ru: "они учат" } },
    ],
    examples: [{ sk: "Učím deti.", ua: "Я навчаю дітей.", ru: "Я учу детей." }],
  },

  {
    id: "ucitsa",
    infinitive: "učiť sa",
    meaning: { sk: "učiť sa", ua: "вчитися", ru: "учиться" },
    note: {
      sk: "Tip: sa (2-га позиція)",
      ua: "Зворотне: učím sa/učiš sa… (sa зазвичай після займенника)",
      ru: "Возвратное: učím sa/učiš sa… (sa обычно после местоимения)",
    },
    rows: [
      { person: "ja", form: "učím sa", full: "ja sa učím", tr: { sk: "ja sa učím", ua: "я вчуся", ru: "я учусь" } },
      { person: "ty", form: "učíš sa", full: "ty sa učíš", tr: { sk: "ty sa učíš", ua: "ти вчишся", ru: "ты учишься" } },
      { person: "on", form: "učí sa", full: "on sa učí", tr: { sk: "on sa učí", ua: "він вчиться", ru: "он учится" } },
      { person: "ona", form: "učí sa", full: "ona sa učí", tr: { sk: "ona sa učí", ua: "вона вчиться", ru: "она учится" } },
      { person: "ono", form: "učí sa", full: "ono sa učí", tr: { sk: "ono sa učí", ua: "воно вчиться", ru: "оно учится" } },
      { person: "my", form: "učíme sa", full: "my sa učíme", tr: { sk: "my sa učíme", ua: "ми вчимося", ru: "мы учимся" } },
      { person: "vy", form: "učíte sa", full: "vy sa učíte", tr: { sk: "vy sa učíte", ua: "ви вчитеся", ru: "вы учитесь" } },
      { person: "oni", form: "učia sa", full: "oni sa učia", tr: { sk: "oni sa učia", ua: "вони вчаться", ru: "они учатся" } },
    ],
    examples: [{ sk: "Učím sa po slovensky.", ua: "Я вчу словацьку.", ru: "Я учу словацкий." }],
  },

  {
    id: "hladat",
    infinitive: "hľadať",
    meaning: { sk: "hľadať", ua: "шукати", ru: "искать" },
    note: {
      sk: "Tip: hľadám/hľadáš",
      ua: "Пошук: hľadám/hľadáš…",
      ru: "Поиск: hľadám/hľadáš…",
    },
    rows: [
      { person: "ja", form: "hľadám", full: "ja hľadám", tr: { sk: "ja hľadám", ua: "я шукаю", ru: "я ищу" } },
      { person: "ty", form: "hľadáš", full: "ty hľadáš", tr: { sk: "ty hľadáš", ua: "ти шукаєш", ru: "ты ищешь" } },
      { person: "on", form: "hľadá", full: "on hľadá", tr: { sk: "on hľadá", ua: "він шукає", ru: "он ищет" } },
      { person: "ona", form: "hľadá", full: "ona hľadá", tr: { sk: "ona hľadá", ua: "вона шукає", ru: "она ищет" } },
      { person: "ono", form: "hľadá", full: "ono hľadá", tr: { sk: "ono hľadá", ua: "воно шукає", ru: "оно ищет" } },
      { person: "my", form: "hľadáme", full: "my hľadáme", tr: { sk: "my hľadáme", ua: "ми шукаємо", ru: "мы ищем" } },
      { person: "vy", form: "hľadáte", full: "vy hľadáte", tr: { sk: "vy hľadáte", ua: "ви шукаєте", ru: "вы ищете" } },
      { person: "oni", form: "hľadajú", full: "oni hľadajú", tr: { sk: "oni hľadajú", ua: "вони шукають", ru: "они ищут" } },
    ],
    examples: [{ sk: "Hľadám prácu.", ua: "Я шукаю роботу.", ru: "Я ищу работу." }],
  },

  {
    id: "mat",
    infinitive: "mať",
    meaning: { sk: "mať", ua: "мати", ru: "иметь" },
    note: {
      sk: "Tip: mám/máš/má",
      ua: "Корисне щодня: mám/máš/má…",
      ru: "Нужно каждый день: mám/máš/má…",
    },
    rows: [
      { person: "ja", form: "mám", full: "ja mám", tr: { sk: "ja mám", ua: "я маю", ru: "у меня есть" } },
      { person: "ty", form: "máš", full: "ty máš", tr: { sk: "ty máš", ua: "ти маєш", ru: "у тебя есть" } },
      { person: "on", form: "má", full: "on má", tr: { sk: "on má", ua: "він має", ru: "у него есть" } },
      { person: "ona", form: "má", full: "ona má", tr: { sk: "ona má", ua: "вона має", ru: "у неё есть" } },
      { person: "ono", form: "má", full: "ono má", tr: { sk: "ono má", ua: "воно має", ru: "у него/неё есть" } },
      { person: "my", form: "máme", full: "my máme", tr: { sk: "my máme", ua: "ми маємо", ru: "у нас есть" } },
      { person: "vy", form: "máte", full: "vy máte", tr: { sk: "vy máte", ua: "ви маєте", ru: "у вас есть" } },
      { person: "oni", form: "majú", full: "oni majú", tr: { sk: "oni majú", ua: "вони мають", ru: "у них есть" } },
    ],
    examples: [{ sk: "Ja mám čas.", ua: "Я маю час.", ru: "У меня есть время." }],
  },

  {
    id: "ist",
    infinitive: "ísť",
    meaning: { sk: "ísť", ua: "йти", ru: "идти" },
    note: {
      sk: "Tip: nejdem…",
      ua: "Рух: idem/ideš/ide… (заперечення: nejdem/nejdeš/…).",
      ru: "Движение: idem/ideš/ide… (отрицание: nejdem/nejdeš/…).",
    },
    rows: [
      { person: "ja", form: "idem", full: "ja idem", tr: { sk: "ja idem", ua: "я йду", ru: "я иду" } },
      { person: "ty", form: "ideš", full: "ty ideš", tr: { sk: "ty ideš", ua: "ти йдеш", ru: "ты идёшь" } },
      { person: "on", form: "ide", full: "on ide", tr: { sk: "on ide", ua: "він йде", ru: "он идёт" } },
      { person: "ona", form: "ide", full: "ona ide", tr: { sk: "ona ide", ua: "вона йде", ru: "она идёт" } },
      { person: "ono", form: "ide", full: "ono ide", tr: { sk: "ono ide", ua: "воно йде", ru: "оно идёт" } },
      { person: "my", form: "ideme", full: "my ideme", tr: { sk: "my ideme", ua: "ми йдемо", ru: "мы идём" } },
      { person: "vy", form: "idete", full: "vy idete", tr: { sk: "vy idete", ua: "ви йдете", ru: "вы идёте" } },
      { person: "oni", form: "idú", full: "oni idú", tr: { sk: "oni idú", ua: "вони йдуть", ru: "они идут" } },
    ],
    examples: [{ sk: "Idem do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу." }],
  },
];

function makeQuiz(active: VerbBlock) {
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

function makeSentenceParts(example: string) {
  return shuffle(example.replace(/[.!?]$/, "").split(" "));
}

// ✅ Стабільні приклади
function genExamplesFromRows(active: VerbBlock): W[] {
  const tailsByVerb: Record<string, { sk: string[]; ua: string[]; ru: string[] }> = {
    pracovat: {
      sk: ["v práci", "dnes", "v Bratislave", "ráno"],
      ua: ["на роботі", "сьогодні", "в Братиславі", "зранку"],
      ru: ["на работе", "сегодня", "в Братиславе", "утром"],
    },
    robit: {
      sk: ["doma", "úlohu", "to teraz", "v práci"],
      ua: ["вдома", "завдання", "це зараз", "на роботі"],
      ru: ["дома", "задание", "это сейчас", "на работе"],
    },
    byt: {
      sk: ["doma", "tu", "v meste", "v práci"],
      ua: ["вдома", "тут", "в місті", "на роботі"],
      ru: ["дома", "здесь", "в городе", "на работе"],
    },
    byvat: {
      sk: ["v Bratislave", "tu", "v meste", "doma"],
      ua: ["в Братиславі", "тут", "в місті", "вдома"],
      ru: ["в Братиславе", "здесь", "в городе", "дома"],
    },
    chodit: {
      sk: ["do práce", "do školy", "pešo", "každý deň"],
      ua: ["на роботу", "до школи", "пішки", "щодня"],
      ru: ["на работу", "в школу", "пешком", "каждый день"],
    },
    ucit: {
      sk: ["deti", "po slovensky", "dnes", "v škole"],
      ua: ["дітей", "словацьку", "сьогодні", "в школі"],
      ru: ["детей", "словацкий", "сегодня", "в школе"],
    },
    ucitsa: {
      sk: ["po slovensky", "doma", "dnes", "v práci"],
      ua: ["словацької", "вдома", "сьогодні", "на роботі"],
      ru: ["по-словацки", "дома", "сегодня", "на работе"],
    },
    hladat: {
      sk: ["prácu", "byt", "kľúč", "teraz"],
      ua: ["роботу", "квартиру", "ключ", "зараз"],
      ru: ["работу", "квартиру", "ключ", "сейчас"],
    },
    mat: {
      sk: ["čas", "prácu", "lístok", "otázku"],
      ua: ["час", "роботу", "квиток", "питання"],
      ru: ["время", "работу", "билет", "вопрос"],
    },
    ist: {
      sk: ["do práce", "domov", "do mesta", "do obchodu"],
      ua: ["на роботу", "додому", "в місто", "в магазин"],
      ru: ["на работу", "домой", "в город", "в магазин"],
    },
    default: {
      sk: ["dnes", "teraz", "doma", "v práci"],
      ua: ["сьогодні", "зараз", "вдома", "на роботі"],
      ru: ["сегодня", "сейчас", "дома", "на работе"],
    },
  };

  const tails = tailsByVerb[active.id] ?? tailsByVerb.default;
  const wanted: PersonKey[] = ["ja", "ty", "on", "ona", "my", "vy", "oni"];

  return wanted.map((p, idx) => {
    const row = active.rows.find((r) => r.person === p);
    if (!row) return { sk: "", ua: "" };

    const tailSk = tails.sk[idx % tails.sk.length];
    const tailUa = tails.ua[idx % tails.ua.length];
    const tailRu = tails.ru[idx % tails.ru.length];

    const sk = `${capFirst(PRONOUNS[p].sk)} ${row.form} ${tailSk}.`.replace(/\s+/g, " ");
    const ua = `${capFirst(row.tr.ua)} ${tailUa}.`.replace(/\s+/g, " ");
    const ru = `${capFirst(row.tr.ru ?? row.tr.ua)} ${tailRu}.`.replace(/\s+/g, " ");

    return { sk, ua, ru };
  });
}

export default function VerbsPresentPage() {
  const { lang } = useLanguage();

  const [activeVerbId, setActiveVerbId] = useState(VERBS[0].id);
  const active = useMemo(() => VERBS.find((v) => v.id === activeVerbId) ?? VERBS[0], [activeVerbId]);

  const [mounted, setMounted] = useState(false);
  const [quiz, setQuiz] = useState<{ person: PersonKey; correct: string; options: string[] }[]>([]);
  const [sentenceParts, setSentenceParts] = useState<string[]>([]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [build, setBuild] = useState<string[]>([]);
  const [exIndex, setExIndex] = useState(0);

  useEffect(() => setMounted(true), []);

  const examplesForSection4 = useMemo(() => genExamplesFromRows(active), [active.id]);

  useEffect(() => {
    if (!mounted) return;

    setQuiz(makeQuiz(active));

    setExIndex(0);
    const ex = examplesForSection4[0]?.sk ?? "Ja pracujem.";
    setSentenceParts(makeSentenceParts(ex));

    setAnswers({});
    setChecked({});
    setBuild([]);
  }, [mounted, active.id, examplesForSection4]);

  const correctCount = useMemo(() => {
    let c = 0;
    for (const q of quiz) {
      if (answers[q.person] && answers[q.person] === q.correct) c++;
    }
    return c;
  }, [answers, quiz]);

  const builtSentence = build.join(" ");
  const currentEx = examplesForSection4[exIndex] ?? examplesForSection4[0];

  const targetSk = (currentEx?.sk ?? "Ja pracujem.").replace(/[.!?]$/, "");
  const targetUa = (currentEx?.ua ?? "Я працюю.").replace(/[.!?]$/, "");

  if (!mounted) return <div className="space-y-10">Loading…</div>;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Дієслова теперішнього часу</h1>
        <p className="text-slate-700">
          Дієслова в словацькій змінюються за особами (ja/ty/on…).
          Нижче — таблички + звук + вправи.
        </p>
      </div>

      {/* Pronouns */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1) Особові займенники</h2>
        <div className="rounded-2xl border bg-white">
          {(Object.keys(PRONOUNS) as PersonKey[]).map((k, i) => (
            <div key={i} className="flex justify-between border-b px-5 py-3 last:border-b-0">
              <span className="font-medium">{PRONOUNS[k].sk}</span>
              <span className="text-slate-600">{trWord(PRONOUNS[k], lang)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Verb selector */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2) Вибери дієслово</h2>
        <div className="rounded-2xl border bg-white p-3">
          <div className="flex flex-wrap gap-2">
            {VERBS.map((v) => {
              const activeTab = v.id === activeVerbId;
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveVerbId(v.id)}
                  className={[
                    "px-3 py-2 rounded-xl border text-sm",
                    activeTab ? "bg-slate-900 text-white border-slate-900" : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  {v.infinitive}
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">
                {UI[(lang as UiLang) ?? "ua"].infinitive}
              </div>
              <div className="text-lg font-semibold">{active.infinitive}</div>
              <div className="text-slate-600 mt-1">{trWord(active.meaning, lang)}</div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">
                {UI[(lang as UiLang) ?? "ua"].hint}
              </div>
              <div className="text-slate-700">
                {active.note ? trWord(active.note, lang) : "—"}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Conjugation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3) Дієвідмінювання</h2>
        <div className="rounded-2xl border bg-white">
          {active.rows.map((row, i) => (
            <div key={i} className="flex items-center justify-between border-b px-5 py-3 last:border-b-0">
              <div className="min-w-0">
                <div className="font-medium">
                  {PRONOUNS[row.person].sk} <span className="text-slate-900">{row.form}</span>
                </div>
                <div className="text-sm text-slate-500">{trWord(row.tr, lang)}</div>
              </div>
              <SpeakButton text={row.full} />
            </div>
          ))}
        </div>
      </section>

      {/* Examples + negation + question */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">4) Приклади + запитання + заперечення</h2>

        <div className="rounded-2xl border bg-white">
          {examplesForSection4.map((ex, i) => {
            const neg = negateSentence(ex.sk);
            const q = makeQuestion(ex.sk);

            return (
              <div key={i} className="border-b px-5 py-4 last:border-b-0 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium">{ex.sk}</div>
                    <div className="text-sm text-slate-500">{trWord(ex, lang)}</div>
                  </div>
                  <SpeakButton text={ex.sk} />
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border px-4 py-3">
                    <div className="text-xs text-slate-500 mb-1">Заперечення</div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-medium">{neg}</div>
                      <SpeakButton text={neg} />
                    </div>
                  </div>

                  <div className="rounded-xl border px-4 py-3">
                    <div className="text-xs text-slate-500 mb-1">Питання</div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-medium">{q}</div>
                      <SpeakButton text={q} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Practice */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">5) Практика 🧠</h2>

        {/* Quiz A */}
        <div className="rounded-2xl border bg-white p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">A) Обери правильну форму</div>
              <div className="text-sm text-slate-500">
                Рахунок: <span className="font-medium text-slate-900">{correctCount}</span> / {quiz.length}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setChecked({});
                setQuiz(makeQuiz(active));
              }}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
              Скинути
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {quiz.map((q) => (
              <div key={q.person} className="rounded-xl border p-4 space-y-2">
                <div className="text-sm text-slate-500">{capFirst(PRONOUNS[q.person].sk)} + …</div>

                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => {
                    const picked = answers[q.person] === opt;
                    const isCorrect = answers[q.person] === q.correct;
                    const show = checked[q.person];

                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [q.person]: opt }));
                          setChecked((c) => ({ ...c, [q.person]: true }));
                        }}
                        className={[
                          "px-3 py-2 rounded-xl border text-sm",
                          picked ? "bg-slate-900 text-white border-slate-900" : "hover:bg-slate-50",
                          show && opt === q.correct ? "ring-2 ring-emerald-400" : "",
                          show && picked && !isCorrect ? "ring-2 ring-rose-400" : "",
                        ].join(" ")}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {checked[q.person] && (
                  <div className="text-xs mt-1">
                    {answers[q.person] === q.correct ? (
                      <span className="text-emerald-600 font-medium">✅ Правильно</span>
                    ) : (
                      <span className="text-rose-600">
                        ❌ Неправильно. Правильно: <span className="font-medium">{q.correct}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quiz B */}
        <div className="rounded-2xl border bg-white p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">B) Збери речення</div>
              <div className="text-sm text-slate-500">
                Ціль: <span className="font-medium text-slate-900">{targetUa}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBuild([])}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                Очистити
              </button>

              <button
                type="button"
                onClick={() => {
                  const len = examplesForSection4.length || 1;
                  const next = (exIndex + 1) % len;

                  setExIndex(next);
                  setBuild([]);

                  const sk = examplesForSection4[next]?.sk ?? examplesForSection4[0]?.sk ?? "Ja pracujem.";
                  setSentenceParts(makeSentenceParts(sk));
                }}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                Наступне
              </button>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="text-sm text-slate-500 mb-2">Твоє речення:</div>
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">{builtSentence || "—"}</div>
              {builtSentence ? <SpeakButton text={builtSentence + "."} /> : null}
            </div>

            <div className="mt-3 text-sm">
              {builtSentence === targetSk ? (
                <span className="text-emerald-600 font-medium">✅ Правильно!</span>
              ) : builtSentence.length > 0 ? (
                <span className="text-slate-500">Порівняй із ціллю 👆</span>
              ) : (
                <span className="text-slate-500">Натискай слова нижче.</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {sentenceParts.map((w, idx) => (
              <button
                key={idx}
                onClick={() => setBuild((b) => [...b, w])}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6) Шпаргалка</h2>
        <div className="rounded-2xl border bg-white p-5 text-slate-700">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Часто закінчення підказує особу: <span className="font-medium">-m</span> (ja),
              <span className="font-medium"> -š</span> (ty),
              <span className="font-medium"> -me</span> (my),
              <span className="font-medium"> -te</span> (vy).
            </li>
            <li>
              Заперечення: зазвичай <span className="font-medium">ne-</span> разом з дієсловом:
              <span className="font-medium"> robím → nerobím</span>. Для <span className="font-medium">ísť</span>:
              <span className="font-medium"> idem → nejdem</span>.
            </li>
            <li>
              Питання: часто достатньо знака питання: <span className="font-medium">Idete do mesta?</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

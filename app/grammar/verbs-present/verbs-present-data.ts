export type W = { sk: string; ua: string; ru?: string; en?: string };

export type PersonKey = "ja" | "ty" | "on" | "ona" | "ono" | "my" | "vy" | "oni";

export type ConjugationRow = {
  person: PersonKey;
  form: string;
  full: string;
  tr: W;
};

export type VerbBlock = {
  id: string;
  infinitive: string;
  meaning: W;
  note?: W;
  rows: ConjugationRow[];
  examples: W[];
};

export const PRONOUNS: Record<PersonKey, W> = {
  ja: { sk: "ja", ua: "я", ru: "я", en: "I" },
  ty: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
  on: { sk: "on", ua: "він", ru: "он", en: "he" },
  ona: { sk: "ona", ua: "вона", ru: "она", en: "she" },
  ono: { sk: "ono", ua: "воно", ru: "оно", en: "it" },
  my: { sk: "my", ua: "ми", ru: "мы", en: "we" },
  vy: { sk: "vy", ua: "ви", ru: "вы", en: "you" },
  oni: { sk: "oni", ua: "вони", ru: "они", en: "they" },
};

type UiLang = "ua" | "ru" | "en";

type UiDict = {
  loading: string;
  titleSk: string;
  titleCs: string;
  subtitleSk: string;
  subtitleCs: string;

  s1: string;
  s2: string;
  s3: string;
  s4: string;
  s5: string;
  s6: string;

  infinitive: string;
  hint: string;

  negation: string;
  question: string;

  reset: string;
  clear: string;
  next: string;

  quizA: string;
  quizB: string;

  score: string;
  target: string;

  yourSentence: string;
  correct: string;
  wrongHint: string;
  clickWords: string;

  correctYes: string;
  correctNo: string;
  correctForm: string;

  cheatItemsSk: string[];
  cheatItemsCs: string[];
};

export const UI: Record<UiLang, UiDict> = {
  ua: {
    loading: "Завантаження…",

    titleSk: "Дієслова теперішнього часу",
    titleCs: "Дієслова теперішнього часу",
    subtitleSk:
      "Дієслова в словацькій змінюються за особами (ja/ty/on…). Нижче — таблички + звук + вправи.",
    subtitleCs:
      "Дієслова в чеській змінюються за особами (já/ty/on…). Нижче — таблички + звук + вправи.",

    s1: "1) Особові займенники",
    s2: "2) Вибери дієслово",
    s3: "3) Дієвідмінювання",
    s4: "4) Приклади + запитання + заперечення",
    s5: "5) Практика 🧠",
    s6: "6) Шпаргалка",

    infinitive: "Інфінітив",
    hint: "Підказка",

    negation: "Заперечення",
    question: "Питання",

    reset: "Скинути",
    clear: "Очистити",
    next: "Наступне",

    quizA: "A) Обери правильну форму",
    quizB: "B) Збери речення",

    score: "Рахунок",
    target: "Ціль",

    yourSentence: "Твоє речення:",
    correct: "✅ Правильно!",
    wrongHint: "Порівняй із ціллю 👆",
    clickWords: "Натискай слова нижче.",

    correctYes: "✅ Правильно",
    correctNo: "❌ Неправильно.",
    correctForm: "Правильно",

    cheatItemsSk: [
      "Часто закінчення підказує особу: -m (ja), -š (ty), -me (my), -te (vy).",
      "Заперечення: зазвичай ne- разом з дієсловом: robím → nerobím. Для ísť: idem → nejdem.",
      "Питання: часто достатньо знака питання: Idete do mesta?",
    ],
    cheatItemsCs: [
      "У чеській часто видно особу по закінченню: -m (já), -š (ty), -me (my), -te (vy).",
      "Заперечення: зазвичай ne- разом з дієсловом: dělám → nedělám. Для jít: jdu → nejdu.",
      "Питання: часто достатньо інтонації або знака питання: Jdete do města?",
    ],
  },

  ru: {
    loading: "Загрузка…",

    titleSk: "Глаголы настоящего времени",
    titleCs: "Глаголы настоящего времени",
    subtitleSk:
      "Глаголы в словацком меняются по лицам (ja/ty/on…). Ниже — таблицы + звук + упражнения.",
    subtitleCs:
      "Глаголы в чешском меняются по лицам (já/ty/on…). Ниже — таблицы + звук + упражнения.",

    s1: "1) Личные местоимения",
    s2: "2) Выбери глагол",
    s3: "3) Спряжение",
    s4: "4) Примеры + вопрос + отрицание",
    s5: "5) Практика 🧠",
    s6: "6) Шпаргалка",

    infinitive: "Инфинитив",
    hint: "Подсказка",

    negation: "Отрицание",
    question: "Вопрос",

    reset: "Сбросить",
    clear: "Очистить",
    next: "Следующее",

    quizA: "A) Выбери правильную форму",
    quizB: "B) Собери предложение",

    score: "Счёт",
    target: "Цель",

    yourSentence: "Твоё предложение:",
    correct: "✅ Правильно!",
    wrongHint: "Сравни с целью 👆",
    clickWords: "Нажимай слова ниже.",

    correctYes: "✅ Правильно",
    correctNo: "❌ Неправильно.",
    correctForm: "Правильно",

    cheatItemsSk: [
      "Часто окончание подсказывает лицо: -m (ja), -š (ty), -me (my), -te (vy).",
      "Отрицание: обычно ne- вместе с глаголом: robím → nerobím. Для ísť: idem → nejdem.",
      "Вопрос: часто достаточно знака вопроса: Idete do mesta?",
    ],
    cheatItemsCs: [
      "В чешском лицо часто видно по окончанию: -m (já), -š (ty), -me (my), -te (vy).",
      "Отрицание: обычно ne- вместе с глаголом: dělám → nedělám. Для jít: jdu → nejdu.",
      "Вопрос: часто достаточно интонации или знака вопроса: Jdete do města?",
    ],
  },

  en: {
    loading: "Loading…",

    titleSk: "Present Tense Verbs",
    titleCs: "Present Tense Verbs",
    subtitleSk:
      "In Slovak, verbs change by person (ja/ty/on…). Below you’ll find tables, audio, and exercises.",
    subtitleCs:
      "In Czech, verbs change by person (já/ty/on…). Below you’ll find tables, audio, and exercises.",

    s1: "1) Personal pronouns",
    s2: "2) Choose a verb",
    s3: "3) Conjugation",
    s4: "4) Examples + question + negation",
    s5: "5) Practice 🧠",
    s6: "6) Cheat sheet",

    infinitive: "Infinitive",
    hint: "Hint",

    negation: "Negation",
    question: "Question",

    reset: "Reset",
    clear: "Clear",
    next: "Next",

    quizA: "A) Choose the correct form",
    quizB: "B) Build the sentence",

    score: "Score",
    target: "Target",

    yourSentence: "Your sentence:",
    correct: "✅ Correct!",
    wrongHint: "Compare it with the target 👆",
    clickWords: "Click the words below.",

    correctYes: "✅ Correct",
    correctNo: "❌ Incorrect.",
    correctForm: "Correct form",

    cheatItemsSk: [
      "Endings often help you identify the person: -m (ja), -š (ty), -me (my), -te (vy).",
      "Negation is usually made with ne- attached to the verb: robím → nerobím. For ísť: idem → nejdem.",
      "For questions, a question mark is often enough: Idete do mesta?",
    ],
    cheatItemsCs: [
      "In Czech, the ending often shows the person: -m (já), -š (ty), -me (my), -te (vy).",
      "Negation is usually made with ne- attached to the verb: dělám → nedělám. For jít: jdu → nejdu.",
      "For questions, intonation or a question mark is often enough: Jdete do města?",
    ],
  },
};

export const IST_NEG_SK: Record<string, string> = {
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

export const BYT_NEG_SK: Record<string, string> = {
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

export const JIT_NEG_CS: Record<string, string> = {
  jdu: "nejdu",
  jdeš: "nejdeš",
  jde: "nejde",
  jdeme: "nejdeme",
  jdete: "nejdete",
  jdou: "nejdou",

  Jdu: "Nejdu",
  Jdeš: "Nejdeš",
  Jde: "Nejde",
  Jdeme: "Nejdeme",
  Jdete: "Nejdete",
  Jdou: "Nejdou",
};

export const BYT_NEG_CS: Record<string, string> = {
  jsem: "nejsem",
  jsi: "nejsi",
  je: "není",
  jsme: "nejsme",
  jste: "nejste",
  jsou: "nejsou",

  Jsem: "Nejsem",
  Jsi: "Nejsi",
  Je: "Není",
  Jsme: "Nejsme",
  Jste: "Nejste",
  Jsou: "Nejsou",
};

export const VERBS_SK: VerbBlock[] = [
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
      { person: "ja", form: "som", full: "ja som", tr: { sk: "ja som", ua: "я є / я (...)", ru: "я (есть) / я (...)" } },
      { person: "ty", form: "si", full: "ty si", tr: { sk: "ty si", ua: "ти є / ти (...)", ru: "ты (есть) / ты (...)" } },
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
      ua: "Навчання: učím/učíš…",
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

export const VERBS_CS: VerbBlock[] = [
  {
    id: "pracovat",
    infinitive: "pracovat",
    meaning: { sk: "pracovat", ua: "працювати", ru: "работать" },
    note: {
      sk: "Tip: pracuji/pracuješ",
      ua: "Типове чеське дієслово: pracuji, pracuješ, pracuje…",
      ru: "Типичный чешский глагол: pracuji, pracuješ, pracuje…",
    },
    rows: [
      { person: "ja", form: "pracuji", full: "já pracuji", tr: { sk: "já pracuji", ua: "я працюю", ru: "я работаю" } },
      { person: "ty", form: "pracuješ", full: "ty pracuješ", tr: { sk: "ty pracuješ", ua: "ти працюєш", ru: "ты работаешь" } },
      { person: "on", form: "pracuje", full: "on pracuje", tr: { sk: "on pracuje", ua: "він працює", ru: "он работает" } },
      { person: "ona", form: "pracuje", full: "ona pracuje", tr: { sk: "ona pracuje", ua: "вона працює", ru: "она работает" } },
      { person: "ono", form: "pracuje", full: "ono pracuje", tr: { sk: "ono pracuje", ua: "воно працює", ru: "оно работает" } },
      { person: "my", form: "pracujeme", full: "my pracujeme", tr: { sk: "my pracujeme", ua: "ми працюємо", ru: "мы работаем" } },
      { person: "vy", form: "pracujete", full: "vy pracujete", tr: { sk: "vy pracujete", ua: "ви працюєте", ru: "вы работаете" } },
      { person: "oni", form: "pracují", full: "oni pracují", tr: { sk: "oni pracují", ua: "вони працюють", ru: "они работают" } },
    ],
    examples: [{ sk: "Já pracuji dnes.", ua: "Я працюю сьогодні.", ru: "Я работаю сегодня." }],
  },
  {
    id: "delat",
    infinitive: "dělat",
    meaning: { sk: "dělat", ua: "робити", ru: "делать" },
    note: {
      sk: "Tip: dělám/děláš",
      ua: "Дуже часте дієслово: dělám, děláš, dělá…",
      ru: "Очень частый глагол: dělám, děláš, dělá…",
    },
    rows: [
      { person: "ja", form: "dělám", full: "já dělám", tr: { sk: "já dělám", ua: "я роблю", ru: "я делаю" } },
      { person: "ty", form: "děláš", full: "ty děláš", tr: { sk: "ty děláš", ua: "ти робиш", ru: "ты делаешь" } },
      { person: "on", form: "dělá", full: "on dělá", tr: { sk: "on dělá", ua: "він робить", ru: "он делает" } },
      { person: "ona", form: "dělá", full: "ona dělá", tr: { sk: "ona dělá", ua: "вона робить", ru: "она делает" } },
      { person: "ono", form: "dělá", full: "ono dělá", tr: { sk: "ono dělá", ua: "воно робить", ru: "оно делает" } },
      { person: "my", form: "děláme", full: "my děláme", tr: { sk: "my děláme", ua: "ми робимо", ru: "мы делаем" } },
      { person: "vy", form: "děláte", full: "vy děláte", tr: { sk: "vy děláte", ua: "ви робите", ru: "вы делаете" } },
      { person: "oni", form: "dělají", full: "oni dělají", tr: { sk: "oni dělají", ua: "вони роблять", ru: "они делают" } },
    ],
    examples: [{ sk: "Já dělám úkol.", ua: "Я роблю завдання.", ru: "Я делаю задание." }],
  },
  {
    id: "byt",
    infinitive: "být",
    meaning: { sk: "být", ua: "бути", ru: "быть" },
    note: {
      sk: "Tip: jsem/jsi/je",
      ua: "Нерегулярне: jsem, jsi, je…",
      ru: "Нерегулярный: jsem, jsi, je…",
    },
    rows: [
      { person: "ja", form: "jsem", full: "já jsem", tr: { sk: "já jsem", ua: "я є / я (...)", ru: "я (есть) / я (...)" } },
      { person: "ty", form: "jsi", full: "ty jsi", tr: { sk: "ty jsi", ua: "ти є / ти (...)", ru: "ты (есть) / ты (...)" } },
      { person: "on", form: "je", full: "on je", tr: { sk: "on je", ua: "він є", ru: "он есть" } },
      { person: "ona", form: "je", full: "ona je", tr: { sk: "ona je", ua: "вона є", ru: "она есть" } },
      { person: "ono", form: "je", full: "ono je", tr: { sk: "ono je", ua: "воно є", ru: "оно есть" } },
      { person: "my", form: "jsme", full: "my jsme", tr: { sk: "my jsme", ua: "ми є", ru: "мы есть" } },
      { person: "vy", form: "jste", full: "vy jste", tr: { sk: "vy jste", ua: "ви є", ru: "вы есть" } },
      { person: "oni", form: "jsou", full: "oni jsou", tr: { sk: "oni jsou", ua: "вони є", ru: "они есть" } },
    ],
    examples: [{ sk: "Já jsem doma.", ua: "Я вдома.", ru: "Я дома." }],
  },
  {
    id: "bydlet",
    infinitive: "bydlet",
    meaning: { sk: "bydlet", ua: "жити (мешкати)", ru: "жить (проживать)" },
    note: {
      sk: "Tip: bydlím/bydlíš",
      ua: "Про місце проживання: bydlím, bydlíš…",
      ru: "Про место проживания: bydlím, bydlíš…",
    },
    rows: [
      { person: "ja", form: "bydlím", full: "já bydlím", tr: { sk: "já bydlím", ua: "я живу", ru: "я живу" } },
      { person: "ty", form: "bydlíš", full: "ty bydlíš", tr: { sk: "ty bydlíš", ua: "ти живеш", ru: "ты живёшь" } },
      { person: "on", form: "bydlí", full: "on bydlí", tr: { sk: "on bydlí", ua: "він живе", ru: "он живёт" } },
      { person: "ona", form: "bydlí", full: "ona bydlí", tr: { sk: "ona bydlí", ua: "вона живе", ru: "она живёт" } },
      { person: "ono", form: "bydlí", full: "ono bydlí", tr: { sk: "ono bydlí", ua: "воно живе", ru: "оно живёт" } },
      { person: "my", form: "bydlíme", full: "my bydlíme", tr: { sk: "my bydlíme", ua: "ми живемо", ru: "мы живём" } },
      { person: "vy", form: "bydlíte", full: "vy bydlíte", tr: { sk: "vy bydlíte", ua: "ви живете", ru: "вы живёте" } },
      { person: "oni", form: "bydlí", full: "oni bydlí", tr: { sk: "oni bydlí", ua: "вони живуть", ru: "они живут" } },
    ],
    examples: [{ sk: "Já bydlím v Praze.", ua: "Я живу в Празі.", ru: "Я живу в Праге." }],
  },
  {
    id: "chodit",
    infinitive: "chodit",
    meaning: { sk: "chodit", ua: "ходити", ru: "ходить" },
    note: {
      sk: "Tip: chodím/chodíš",
      ua: "Регулярний рух: chodím, chodíš…",
      ru: "Регулярное движение: chodím, chodíš…",
    },
    rows: [
      { person: "ja", form: "chodím", full: "já chodím", tr: { sk: "já chodím", ua: "я ходжу", ru: "я хожу" } },
      { person: "ty", form: "chodíš", full: "ty chodíš", tr: { sk: "ty chodíš", ua: "ти ходиш", ru: "ты ходишь" } },
      { person: "on", form: "chodí", full: "on chodí", tr: { sk: "on chodí", ua: "він ходить", ru: "он ходит" } },
      { person: "ona", form: "chodí", full: "ona chodí", tr: { sk: "ona chodí", ua: "вона ходить", ru: "она ходит" } },
      { person: "ono", form: "chodí", full: "ono chodí", tr: { sk: "ono chodí", ua: "воно ходить", ru: "оно ходит" } },
      { person: "my", form: "chodíme", full: "my chodíme", tr: { sk: "my chodíme", ua: "ми ходимо", ru: "мы ходим" } },
      { person: "vy", form: "chodíte", full: "vy chodíte", tr: { sk: "vy chodíte", ua: "ви ходите", ru: "вы ходите" } },
      { person: "oni", form: "chodí", full: "oni chodí", tr: { sk: "oni chodí", ua: "вони ходять", ru: "они ходят" } },
    ],
    examples: [{ sk: "Chodím do práce.", ua: "Я ходжу на роботу.", ru: "Я хожу на работу." }],
  },
  {
    id: "ucit",
    infinitive: "učit",
    meaning: { sk: "učit", ua: "вчити / навчати", ru: "учить / обучать" },
    note: {
      sk: "Tip: učím/učíš",
      ua: "Навчання: učím, učíš…",
      ru: "Обучение: učím, učíš…",
    },
    rows: [
      { person: "ja", form: "učím", full: "já učím", tr: { sk: "já učím", ua: "я вчу", ru: "я учу" } },
      { person: "ty", form: "učíš", full: "ty učíš", tr: { sk: "ty učíš", ua: "ти вчиш", ru: "ты учишь" } },
      { person: "on", form: "učí", full: "on učí", tr: { sk: "on učí", ua: "він вчить", ru: "он учит" } },
      { person: "ona", form: "učí", full: "ona učí", tr: { sk: "ona učí", ua: "вона вчить", ru: "она учит" } },
      { person: "ono", form: "učí", full: "ono učí", tr: { sk: "ono učí", ua: "воно вчить", ru: "оно учит" } },
      { person: "my", form: "učíme", full: "my učíme", tr: { sk: "my učíme", ua: "ми вчимо", ru: "мы учим" } },
      { person: "vy", form: "učíte", full: "vy učíte", tr: { sk: "vy učíte", ua: "ви вчите", ru: "вы учите" } },
      { person: "oni", form: "učí", full: "oni učí", tr: { sk: "oni učí", ua: "вони вчать", ru: "они учат" } },
    ],
    examples: [{ sk: "Učím děti.", ua: "Я навчаю дітей.", ru: "Я учу детей." }],
  },
  {
    id: "ucitse",
    infinitive: "učit se",
    meaning: { sk: "učit se", ua: "вчитися", ru: "учиться" },
    note: {
      sk: "Tip: se",
      ua: "Зворотне: učím se, učíš se…",
      ru: "Возвратное: učím se, učíš se…",
    },
    rows: [
      { person: "ja", form: "učím se", full: "já se učím", tr: { sk: "já se učím", ua: "я вчуся", ru: "я учусь" } },
      { person: "ty", form: "učíš se", full: "ty se učíš", tr: { sk: "ty se učíš", ua: "ти вчишся", ru: "ты учишься" } },
      { person: "on", form: "učí se", full: "on se učí", tr: { sk: "on se učí", ua: "він вчиться", ru: "он учится" } },
      { person: "ona", form: "učí se", full: "ona se učí", tr: { sk: "ona se učí", ua: "вона вчиться", ru: "она учится" } },
      { person: "ono", form: "učí se", full: "ono se učí", tr: { sk: "ono se učí", ua: "воно вчиться", ru: "оно учится" } },
      { person: "my", form: "učíme se", full: "my se učíme", tr: { sk: "my se učíme", ua: "ми вчимося", ru: "мы учимся" } },
      { person: "vy", form: "učíte se", full: "vy se učíte", tr: { sk: "vy se učíte", ua: "ви вчитеся", ru: "вы учитесь" } },
      { person: "oni", form: "učí se", full: "oni se učí", tr: { sk: "oni se učí", ua: "вони вчаться", ru: "они учатся" } },
    ],
    examples: [{ sk: "Učím se česky.", ua: "Я вчу чеську.", ru: "Я учу чешский." }],
  },
  {
    id: "hledat",
    infinitive: "hledat",
    meaning: { sk: "hledat", ua: "шукати", ru: "искать" },
    note: {
      sk: "Tip: hledám/hledáš",
      ua: "Пошук: hledám, hledáš…",
      ru: "Поиск: hledám, hledáš…",
    },
    rows: [
      { person: "ja", form: "hledám", full: "já hledám", tr: { sk: "já hledám", ua: "я шукаю", ru: "я ищу" } },
      { person: "ty", form: "hledáš", full: "ty hledáš", tr: { sk: "ty hledáš", ua: "ти шукаєш", ru: "ты ищешь" } },
      { person: "on", form: "hledá", full: "on hledá", tr: { sk: "on hledá", ua: "він шукає", ru: "он ищет" } },
      { person: "ona", form: "hledá", full: "ona hledá", tr: { sk: "ona hledá", ua: "вона шукає", ru: "она ищет" } },
      { person: "ono", form: "hledá", full: "ono hledá", tr: { sk: "ono hledá", ua: "воно шукає", ru: "оно ищет" } },
      { person: "my", form: "hledáme", full: "my hledáme", tr: { sk: "my hledáme", ua: "ми шукаємо", ru: "мы ищем" } },
      { person: "vy", form: "hledáte", full: "vy hledáte", tr: { sk: "vy hledáte", ua: "ви шукаєте", ru: "вы ищете" } },
      { person: "oni", form: "hledají", full: "oni hledají", tr: { sk: "oni hledají", ua: "вони шукають", ru: "они ищут" } },
    ],
    examples: [{ sk: "Hledám práci.", ua: "Я шукаю роботу.", ru: "Я ищу работу." }],
  },
  {
    id: "mit",
    infinitive: "mít",
    meaning: { sk: "mít", ua: "мати", ru: "иметь" },
    note: {
      sk: "Tip: mám/máš/má",
      ua: "Корисне щодня: mám, máš, má…",
      ru: "Нужно каждый день: mám, máš, má…",
    },
    rows: [
      { person: "ja", form: "mám", full: "já mám", tr: { sk: "já mám", ua: "я маю", ru: "у меня есть" } },
      { person: "ty", form: "máš", full: "ty máš", tr: { sk: "ty máš", ua: "ти маєш", ru: "у тебя есть" } },
      { person: "on", form: "má", full: "on má", tr: { sk: "on má", ua: "він має", ru: "у него есть" } },
      { person: "ona", form: "má", full: "ona má", tr: { sk: "ona má", ua: "вона має", ru: "у неё есть" } },
      { person: "ono", form: "má", full: "ono má", tr: { sk: "ono má", ua: "воно має", ru: "у него/неё есть" } },
      { person: "my", form: "máme", full: "my máme", tr: { sk: "my máme", ua: "ми маємо", ru: "у нас есть" } },
      { person: "vy", form: "máte", full: "vy máte", tr: { sk: "vy máte", ua: "ви маєте", ru: "у вас есть" } },
      { person: "oni", form: "mají", full: "oni mají", tr: { sk: "oni mají", ua: "вони мають", ru: "у них есть" } },
    ],
    examples: [{ sk: "Já mám čas.", ua: "Я маю час.", ru: "У меня есть время." }],
  },
  {
    id: "jit",
    infinitive: "jít",
    meaning: { sk: "jít", ua: "йти", ru: "идти" },
    note: {
      sk: "Tip: nejdu…",
      ua: "Рух: jdu, jdeš, jde… (заперечення: nejdu, nejdeš…).",
      ru: "Движение: jdu, jdeš, jde… (отрицание: nejdu, nejdeš…).",
    },
    rows: [
      { person: "ja", form: "jdu", full: "já jdu", tr: { sk: "já jdu", ua: "я йду", ru: "я иду" } },
      { person: "ty", form: "jdeš", full: "ty jdeš", tr: { sk: "ty jdeš", ua: "ти йдеш", ru: "ты идёшь" } },
      { person: "on", form: "jde", full: "on jde", tr: { sk: "on jde", ua: "він йде", ru: "он идёт" } },
      { person: "ona", form: "jde", full: "ona jde", tr: { sk: "ona jde", ua: "вона йде", ru: "она идёт" } },
      { person: "ono", form: "jde", full: "ono jde", tr: { sk: "ono jde", ua: "воно йде", ru: "оно идёт" } },
      { person: "my", form: "jdeme", full: "my jdeme", tr: { sk: "my jdeme", ua: "ми йдемо", ru: "мы идём" } },
      { person: "vy", form: "jdete", full: "vy jdete", tr: { sk: "vy jdete", ua: "ви йдете", ru: "вы идёте" } },
      { person: "oni", form: "jdou", full: "oni jdou", tr: { sk: "oni jdou", ua: "вони йдуть", ru: "они идут" } },
    ],
    examples: [{ sk: "Jdu do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу." }],
  },
];
export type W = { sk: string; ua: string; ru?: string; en?: string };

export type PersonKey = "ja" | "ty" | "on" | "ona" | "ono" | "my" | "vy" | "oni";
export type GrammarCourseId = "sk" | "cs" | "pl";

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

export const PRONOUNS_SK: Record<PersonKey, W> = {
  ja: { sk: "ja", ua: "я", ru: "я", en: "I" },
  ty: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
  on: { sk: "on", ua: "він", ru: "он", en: "he" },
  ona: { sk: "ona", ua: "вона", ru: "она", en: "she" },
  ono: { sk: "ono", ua: "воно", ru: "оно", en: "it" },
  my: { sk: "my", ua: "ми", ru: "мы", en: "we" },
  vy: { sk: "vy", ua: "ви", ru: "вы", en: "you" },
  oni: { sk: "oni", ua: "вони", ru: "они", en: "they" },
};

export const PRONOUNS_CS: Record<PersonKey, W> = {
  ja: { sk: "já", ua: "я", ru: "я", en: "I" },
  ty: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
  on: { sk: "on", ua: "він", ru: "он", en: "he" },
  ona: { sk: "ona", ua: "вона", ru: "она", en: "she" },
  ono: { sk: "ono", ua: "воно", ru: "оно", en: "it" },
  my: { sk: "my", ua: "ми", ru: "мы", en: "we" },
  vy: { sk: "vy", ua: "ви", ru: "вы", en: "you" },
  oni: { sk: "oni", ua: "вони", ru: "они", en: "they" },
};

export const PRONOUNS_PL: Record<PersonKey, W> = {
  ja: { sk: "ja", ua: "я", ru: "я", en: "I" },
  ty: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
  on: { sk: "on", ua: "він", ru: "он", en: "he" },
  ona: { sk: "ona", ua: "вона", ru: "она", en: "she" },
  ono: { sk: "ono", ua: "воно", ru: "оно", en: "it" },
  my: { sk: "my", ua: "ми", ru: "мы", en: "we" },
  vy: { sk: "wy", ua: "ви", ru: "вы", en: "you" },
  oni: { sk: "oni", ua: "вони", ru: "они", en: "they" },
};

export const PRONOUNS_BY_COURSE: Record<GrammarCourseId, Record<PersonKey, W>> = {
  sk: PRONOUNS_SK,
  cs: PRONOUNS_CS,
  pl: PRONOUNS_PL,
};

type UiLang = "ua" | "ru" | "en";

type UiDict = {
  loading: string;
  titleSk: string;
  titleCs: string;
  titlePl: string;
  subtitleSk: string;
  subtitleCs: string;
  subtitlePl: string;

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
  cheatItemsPl: string[];
};

export const UI: Record<UiLang, UiDict> = {
  ua: {
    loading: "Завантаження…",

    titleSk: "Дієслова теперішнього часу",
    titleCs: "Дієслова теперішнього часу",
    titlePl: "Дієслова теперішнього часу",
    subtitleSk:
      "Дієслова в словацькій змінюються за особами (ja/ty/on…). Нижче — таблички + звук + вправи.",
    subtitleCs:
      "Дієслова в чеській змінюються за особами (já/ty/on…). Нижче — таблички + звук + вправи.",
    subtitlePl:
      "Дієслова в польській змінюються за особами (ja/ty/on…). Нижче — таблички + звук + вправи.",

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
    cheatItemsPl: [
      "У польській особу часто видно по закінченню: -m (ja), -sz (ty), -my (my), -cie (wy).",
      "Заперечення зазвичай утворюється окремим słowom nie: robię → nie robię, idę → nie idę.",
      "Питання часто можна зробити інтонацією або знаком питання: Idziecie do miasta?",
    ],
  },

  ru: {
    loading: "Загрузка…",

    titleSk: "Глаголы настоящего времени",
    titleCs: "Глаголы настоящего времени",
    titlePl: "Глаголы настоящего времени",
    subtitleSk:
      "Глаголы в словацком меняются по лицам (ja/ty/on…). Ниже — таблицы + звук + упражнения.",
    subtitleCs:
      "Глаголы в чешском меняются по лицам (já/ty/on…). Ниже — таблицы + звук + упражнения.",
    subtitlePl:
      "Глаголы в польском меняются по лицам (ja/ty/on…). Ниже — таблицы + звук + упражнения.",

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
    cheatItemsPl: [
      "В польском лицо часто видно по окончанию: -m (ja), -sz (ty), -my (my), -cie (wy).",
      "Отрицание обычно образуется отдельным словом nie: robię → nie robię, idę → nie idę.",
      "Вопрос часто можно сделать интонацией или знаком вопроса: Idziecie do miasta?",
    ],
  },

  en: {
    loading: "Loading…",

    titleSk: "Present Tense Verbs",
    titleCs: "Present Tense Verbs",
    titlePl: "Present Tense Verbs",
    subtitleSk:
      "In Slovak, verbs change by person (ja/ty/on…). Below are tables, audio, and exercises.",
    subtitleCs:
      "In Czech, verbs change by person (já/ty/on…). Below are tables, audio, and exercises.",
    subtitlePl:
      "In Polish, verbs change by person (ja/ty/on…). Below are tables, audio, and exercises.",

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
    correctForm: "Correct",

    cheatItemsSk: [
      "Verb endings often show the person: -m (ja), -š (ty), -me (my), -te (vy).",
      "Negation is usually made with ne- attached to the verb: robím → nerobím. For ísť: idem → nejdem.",
      "A question mark is often enough to form a question: Idete do mesta?",
    ],
    cheatItemsCs: [
      "In Czech, endings often show the person: -m (já), -š (ty), -me (my), -te (vy).",
      "Negation is usually made with ne- attached to the verb: dělám → nedělám. For jít: jdu → nejdu.",
      "Intonation or a question mark is often enough: Jdete do města?",
    ],
    cheatItemsPl: [
      "In Polish, endings often show the person: -m (ja), -sz (ty), -my (my), -cie (wy).",
      "Negation is usually made with a separate word nie: robię → nie robię, idę → nie idę.",
      "Intonation or a question mark is often enough: Idziecie do miasta?",
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

export const ISC_NEG_PL: Record<string, string> = {
  "idę": "nie idę",
  "idziesz": "nie idziesz",
  "idzie": "nie idzie",
  "idziemy": "nie idziemy",
  "idziecie": "nie idziecie",
  "idą": "nie idą",

  "Idę": "Nie idę",
  "Idziesz": "Nie idziesz",
  "Idzie": "Nie idzie",
  "Idziemy": "Nie idziemy",
  "Idziecie": "Nie idziecie",
  "Idą": "Nie idą",
};

export const BYC_NEG_PL: Record<string, string> = {
  "jestem": "nie jestem",
  "jesteś": "nie jesteś",
  "jest": "nie jest",
  "jesteśmy": "nie jesteśmy",
  "jesteście": "nie jesteście",
  "są": "nie są",

  "Jestem": "Nie jestem",
  "Jesteś": "Nie jesteś",
  "Jest": "Nie jest",
  "Jesteśmy": "Nie jesteśmy",
  "Jesteście": "Nie jesteście",
  "Są": "Nie są",
};

export const VERBS_SK: VerbBlock[] = [
  {
    id: "pracovat",
    infinitive: "pracovať",
    meaning: { sk: "pracovať", ua: "працювати", ru: "работать", en: "to work" },
    note: {
      sk: "Tip: -ovať",
      ua: "Типове дієслово на -ovať: ja pracujem, ty pracuješ…",
      ru: "Типичный глагол на -ovať: ja pracujem, ty pracuješ…",
      en: "Typical -ovať verb: ja pracujem, ty pracuješ…",
    },
    rows: [
      { person: "ja", form: "pracujem", full: "ja pracujem", tr: { sk: "ja pracujem", ua: "я працюю", ru: "я работаю", en: "I work" } },
      { person: "ty", form: "pracuješ", full: "ty pracuješ", tr: { sk: "ty pracuješ", ua: "ти працюєш", ru: "ты работаешь", en: "you work" } },
      { person: "on", form: "pracuje", full: "on pracuje", tr: { sk: "on pracuje", ua: "він працює", ru: "он работает", en: "he works" } },
      { person: "ona", form: "pracuje", full: "ona pracuje", tr: { sk: "ona pracuje", ua: "вона працює", ru: "она работает", en: "she works" } },
      { person: "ono", form: "pracuje", full: "ono pracuje", tr: { sk: "ono pracuje", ua: "воно працює", ru: "оно работает", en: "it works" } },
      { person: "my", form: "pracujeme", full: "my pracujeme", tr: { sk: "my pracujeme", ua: "ми працюємо", ru: "мы работаем", en: "we work" } },
      { person: "vy", form: "pracujete", full: "vy pracujete", tr: { sk: "vy pracujete", ua: "ви працюєте", ru: "вы работаете", en: "you work" } },
      { person: "oni", form: "pracujú", full: "oni pracujú", tr: { sk: "oni pracujú", ua: "вони працюють", ru: "они работают", en: "they work" } },
    ],
    examples: [{ sk: "Ja pracujem dnes.", ua: "Я працюю сьогодні.", ru: "Я работаю сегодня.", en: "I work today." }],
  },
  {
    id: "robit",
    infinitive: "robiť",
    meaning: { sk: "robiť", ua: "робити", ru: "делать", en: "to do" },
    note: {
      sk: "Tip: robím/robíš",
      ua: "Найчастіше дієслово: robím/robíš/robí…",
      ru: "Самый частый глагол: robím/robíš/robí…",
      en: "Most common verb: robím/robíš/robí…",
    },
    rows: [
      { person: "ja", form: "robím", full: "ja robím", tr: { sk: "ja robím", ua: "я роблю", ru: "я делаю", en: "I do" } },
      { person: "ty", form: "robíš", full: "ty robíš", tr: { sk: "ty robíš", ua: "ти робиш", ru: "ты делаешь", en: "you do" } },
      { person: "on", form: "robí", full: "on robí", tr: { sk: "on robí", ua: "він робить", ru: "он делает", en: "he does" } },
      { person: "ona", form: "robí", full: "ona robí", tr: { sk: "ona robí", ua: "вона робить", ru: "она делает", en: "she does" } },
      { person: "ono", form: "robí", full: "ono robí", tr: { sk: "ono robí", ua: "воно робить", ru: "оно делает", en: "it does" } },
      { person: "my", form: "robíme", full: "my robíme", tr: { sk: "my robíme", ua: "ми робимо", ru: "мы делаем", en: "we do" } },
      { person: "vy", form: "robíte", full: "vy robíte", tr: { sk: "vy robíte", ua: "ви робите", ru: "вы делаете", en: "you do" } },
      { person: "oni", form: "robia", full: "oni robia", tr: { sk: "oni robia", ua: "вони роблять", ru: "они делают", en: "they do" } },
    ],
    examples: [{ sk: "Ja robím úlohu.", ua: "Я роблю завдання.", ru: "Я делаю задание.", en: "I do homework." }],
  },
  {
    id: "byt",
    infinitive: "byť",
    meaning: { sk: "byť", ua: "бути", ru: "быть", en: "to be" },
    note: {
      sk: "Tip: som/si/je",
      ua: "Нерегулярне: som/si/je…",
      ru: "Нерегулярное: som/si/je…",
      en: "Irregular: som/si/je…",
    },
    rows: [
      { person: "ja", form: "som", full: "ja som", tr: { sk: "ja som", ua: "я є / я (...)", ru: "я (есть) / я (...)", en: "I am" } },
      { person: "ty", form: "si", full: "ty si", tr: { sk: "ty si", ua: "ти є / ти (...)", ru: "ты (есть) / ты (...)", en: "you are" } },
      { person: "on", form: "je", full: "on je", tr: { sk: "on je", ua: "він є", ru: "он есть", en: "he is" } },
      { person: "ona", form: "je", full: "ona je", tr: { sk: "ona je", ua: "вона є", ru: "она есть", en: "she is" } },
      { person: "ono", form: "je", full: "ono je", tr: { sk: "ono je", ua: "воно є", ru: "оно есть", en: "it is" } },
      { person: "my", form: "sme", full: "my sme", tr: { sk: "my sme", ua: "ми є", ru: "мы есть", en: "we are" } },
      { person: "vy", form: "ste", full: "vy ste", tr: { sk: "vy ste", ua: "ви є", ru: "вы есть", en: "you are" } },
      { person: "oni", form: "sú", full: "oni sú", tr: { sk: "oni sú", ua: "вони є", ru: "они есть", en: "they are" } },
    ],
    examples: [{ sk: "Ja som doma.", ua: "Я вдома.", ru: "Я дома.", en: "I am at home." }],
  },
  {
    id: "byvat",
    infinitive: "bývať",
    meaning: { sk: "bývať", ua: "жити (мешкати)", ru: "жить (проживать)", en: "to live" },
    note: {
      sk: "Tip: bývam/bývaš",
      ua: "Про місце проживання: bývam/bývaš…",
      ru: "Про место проживания: bývam/bývaš…",
      en: "About where you live: bývam/bývaš…",
    },
    rows: [
      { person: "ja", form: "bývam", full: "ja bývam", tr: { sk: "ja bývam", ua: "я живу", ru: "я живу", en: "I live" } },
      { person: "ty", form: "bývaš", full: "ty bývaš", tr: { sk: "ty bývaš", ua: "ти живеш", ru: "ты живёшь", en: "you live" } },
      { person: "on", form: "býva", full: "on býva", tr: { sk: "on býva", ua: "він живе", ru: "он живёт", en: "he lives" } },
      { person: "ona", form: "býva", full: "ona býva", tr: { sk: "ona býva", ua: "вона живе", ru: "она живёт", en: "she lives" } },
      { person: "ono", form: "býva", full: "ono býva", tr: { sk: "ono býva", ua: "воно живе", ru: "оно живёт", en: "it lives" } },
      { person: "my", form: "bývame", full: "my bývame", tr: { sk: "my bývame", ua: "ми живемо", ru: "мы живём", en: "we live" } },
      { person: "vy", form: "bývate", full: "vy bývate", tr: { sk: "vy bývate", ua: "ви живете", ru: "вы живёте", en: "you live" } },
      { person: "oni", form: "bývajú", full: "oni bývajú", tr: { sk: "oni bývajú", ua: "вони живуть", ru: "они живут", en: "they live" } },
    ],
    examples: [{ sk: "Ja bývam v Bratislave.", ua: "Я живу в Братиславі.", ru: "Я живу в Братиславе.", en: "I live in Bratislava." }],
  },
  {
    id: "chodit",
    infinitive: "chodiť",
    meaning: { sk: "chodiť", ua: "ходити", ru: "ходить", en: "to go / to walk" },
    note: {
      sk: "Tip: chodím/chodíš",
      ua: "Регулярний рух: chodím/chodíš…",
      ru: "Регулярное движение: chodím/chodíš…",
      en: "Regular movement: chodím/chodíš…",
    },
    rows: [
      { person: "ja", form: "chodím", full: "ja chodím", tr: { sk: "ja chodím", ua: "я ходжу", ru: "я хожу", en: "I go / I walk" } },
      { person: "ty", form: "chodíš", full: "ty chodíš", tr: { sk: "ty chodíš", ua: "ти ходиш", ru: "ты ходишь", en: "you go / you walk" } },
      { person: "on", form: "chodí", full: "on chodí", tr: { sk: "on chodí", ua: "він ходить", ru: "он ходит", en: "he goes / he walks" } },
      { person: "ona", form: "chodí", full: "ona chodí", tr: { sk: "ona chodí", ua: "вона ходить", ru: "она ходит", en: "she goes / she walks" } },
      { person: "ono", form: "chodí", full: "ono chodí", tr: { sk: "ono chodí", ua: "воно ходить", ru: "оно ходит", en: "it goes / it walks" } },
      { person: "my", form: "chodíme", full: "my chodíme", tr: { sk: "my chodíme", ua: "ми ходимо", ru: "мы ходим", en: "we go / we walk" } },
      { person: "vy", form: "chodíte", full: "vy chodíte", tr: { sk: "vy chodíte", ua: "ви ходите", ru: "вы ходите", en: "you go / you walk" } },
      { person: "oni", form: "chodia", full: "oni chodia", tr: { sk: "oni chodia", ua: "вони ходять", ru: "они ходят", en: "they go / they walk" } },
    ],
    examples: [{ sk: "Chodím do práce.", ua: "Я ходжу на роботу.", ru: "Я хожу на работу.", en: "I go to work." }],
  },
  {
    id: "ucit",
    infinitive: "učiť",
    meaning: { sk: "učiť", ua: "вчити / навчати", ru: "учить / обучать", en: "to teach" },
    note: {
      sk: "Tip: učím/učíš",
      ua: "Навчання: učím/učíš…",
      ru: "Обучение: učím/učíš…",
      en: "Teaching: učím/učíš…",
    },
    rows: [
      { person: "ja", form: "učím", full: "ja učím", tr: { sk: "ja učím", ua: "я вчу", ru: "я учу", en: "I teach" } },
      { person: "ty", form: "učíš", full: "ty učíš", tr: { sk: "ty učíš", ua: "ти вчиш", ru: "ты учишь", en: "you teach" } },
      { person: "on", form: "učí", full: "on učí", tr: { sk: "on učí", ua: "він вчить", ru: "он учит", en: "he teaches" } },
      { person: "ona", form: "učí", full: "ona učí", tr: { sk: "ona učí", ua: "вона вчить", ru: "она учит", en: "she teaches" } },
      { person: "ono", form: "učí", full: "ono učí", tr: { sk: "ono učí", ua: "воно вчить", ru: "оно учит", en: "it teaches" } },
      { person: "my", form: "učíme", full: "my učíme", tr: { sk: "my učíme", ua: "ми вчимо", ru: "мы учим", en: "we teach" } },
      { person: "vy", form: "učíte", full: "vy učíte", tr: { sk: "vy učíte", ua: "ви вчите", ru: "вы учите", en: "you teach" } },
      { person: "oni", form: "učia", full: "oni učia", tr: { sk: "oni učia", ua: "вони вчать", ru: "они учат", en: "they teach" } },
    ],
    examples: [{ sk: "Učím deti.", ua: "Я навчаю дітей.", ru: "Я учу детей.", en: "I teach children." }],
  },
  {
    id: "ucitsa",
    infinitive: "učiť sa",
    meaning: { sk: "učiť sa", ua: "вчитися", ru: "учиться", en: "to learn" },
    note: {
      sk: "Tip: sa (2-га позиція)",
      ua: "Зворотне: učím sa/učiš sa… (sa зазвичай після займенника)",
      ru: "Возвратное: učím sa/učiš sa… (sa обычно после местоимения)",
      en: "Reflexive: učím sa/učiš sa… (sa usually comes after the pronoun)",
    },
    rows: [
      { person: "ja", form: "učím sa", full: "ja sa učím", tr: { sk: "ja sa učím", ua: "я вчуся", ru: "я учусь", en: "I learn" } },
      { person: "ty", form: "učíš sa", full: "ty sa učíš", tr: { sk: "ty sa učíš", ua: "ти вчишся", ru: "ты учишься", en: "you learn" } },
      { person: "on", form: "učí sa", full: "on sa učí", tr: { sk: "on sa učí", ua: "він вчиться", ru: "он учится", en: "he learns" } },
      { person: "ona", form: "učí sa", full: "ona sa učí", tr: { sk: "ona sa učí", ua: "вона вчиться", ru: "она учится", en: "she learns" } },
      { person: "ono", form: "učí sa", full: "ono sa učí", tr: { sk: "ono sa učí", ua: "воно вчиться", ru: "оно учится", en: "it learns" } },
      { person: "my", form: "učíme sa", full: "my sa učíme", tr: { sk: "my sa učíme", ua: "ми вчимося", ru: "мы учимся", en: "we learn" } },
      { person: "vy", form: "učíte sa", full: "vy sa učíte", tr: { sk: "vy sa učíte", ua: "ви вчитеся", ru: "вы учитесь", en: "you learn" } },
      { person: "oni", form: "učia sa", full: "oni sa učia", tr: { sk: "oni sa učia", ua: "вони вчаться", ru: "они учатся", en: "they learn" } },
    ],
    examples: [{ sk: "Učím sa po slovensky.", ua: "Я вчу словацьку.", ru: "Я учу словацкий.", en: "I learn Slovak." }],
  },
  {
    id: "hladat",
    infinitive: "hľadať",
    meaning: { sk: "hľadať", ua: "шукати", ru: "искать", en: "to look for" },
    note: {
      sk: "Tip: hľadám/hľadáš",
      ua: "Пошук: hľadám/hľadáš…",
      ru: "Поиск: hľadám/hľadáš…",
      en: "Looking for something: hľadám/hľadáš…",
    },
    rows: [
      { person: "ja", form: "hľadám", full: "ja hľadám", tr: { sk: "ja hľadám", ua: "я шукаю", ru: "я ищу", en: "I look for" } },
      { person: "ty", form: "hľadáš", full: "ty hľadáš", tr: { sk: "ty hľadáš", ua: "ти шукаєш", ru: "ты ищешь", en: "you look for" } },
      { person: "on", form: "hľadá", full: "on hľadá", tr: { sk: "on hľadá", ua: "він шукає", ru: "он ищет", en: "he looks for" } },
      { person: "ona", form: "hľadá", full: "ona hľadá", tr: { sk: "ona hľadá", ua: "вона шукає", ru: "она ищет", en: "she looks for" } },
      { person: "ono", form: "hľadá", full: "ono hľadá", tr: { sk: "ono hľadá", ua: "воно шукає", ru: "оно ищет", en: "it looks for" } },
      { person: "my", form: "hľadáme", full: "my hľadáme", tr: { sk: "my hľadáme", ua: "ми шукаємо", ru: "мы ищем", en: "we look for" } },
      { person: "vy", form: "hľadáte", full: "vy hľadáte", tr: { sk: "vy hľadáte", ua: "ви шукаєте", ru: "вы ищете", en: "you look for" } },
      { person: "oni", form: "hľadajú", full: "oni hľadajú", tr: { sk: "oni hľadajú", ua: "вони шукають", ru: "они ищут", en: "they look for" } },
    ],
    examples: [{ sk: "Hľadám prácu.", ua: "Я шукаю роботу.", ru: "Я ищу работу.", en: "I am looking for a job." }],
  },
  {
    id: "mat",
    infinitive: "mať",
    meaning: { sk: "mať", ua: "мати", ru: "иметь", en: "to have" },
    note: {
      sk: "Tip: mám/máš/má",
      ua: "Корисне щодня: mám/máš/má…",
      ru: "Нужно каждый день: mám/máš/má…",
      en: "Useful every day: mám/máš/má…",
    },
    rows: [
      { person: "ja", form: "mám", full: "ja mám", tr: { sk: "ja mám", ua: "я маю", ru: "у меня есть", en: "I have" } },
      { person: "ty", form: "máš", full: "ty máš", tr: { sk: "ty máš", ua: "ти маєш", ru: "у тебя есть", en: "you have" } },
      { person: "on", form: "má", full: "on má", tr: { sk: "on má", ua: "він має", ru: "у него есть", en: "he has" } },
      { person: "ona", form: "má", full: "ona má", tr: { sk: "ona má", ua: "вона має", ru: "у неё есть", en: "she has" } },
      { person: "ono", form: "má", full: "ono má", tr: { sk: "ono má", ua: "воно має", ru: "у него/неё есть", en: "it has" } },
      { person: "my", form: "máme", full: "my máme", tr: { sk: "my máme", ua: "ми маємо", ru: "у нас есть", en: "we have" } },
      { person: "vy", form: "máte", full: "vy máte", tr: { sk: "vy máte", ua: "ви маєте", ru: "у вас есть", en: "you have" } },
      { person: "oni", form: "majú", full: "oni majú", tr: { sk: "oni majú", ua: "вони мають", ru: "у них есть", en: "they have" } },
    ],
    examples: [{ sk: "Ja mám čas.", ua: "Я маю час.", ru: "У меня есть время.", en: "I have time." }],
  },
  {
    id: "ist",
    infinitive: "ísť",
    meaning: { sk: "ísť", ua: "йти", ru: "идти", en: "to go" },
    note: {
      sk: "Tip: nejdem…",
      ua: "Рух: idem/ideš/ide… (заперечення: nejdem/nejdeš/…).",
      ru: "Движение: idem/ideš/ide… (отрицание: nejdem/nejdeš/…).",
      en: "Movement: idem/ideš/ide… (negation: nejdem/nejdeš/…).",
    },
    rows: [
      { person: "ja", form: "idem", full: "ja idem", tr: { sk: "ja idem", ua: "я йду", ru: "я иду", en: "I go" } },
      { person: "ty", form: "ideš", full: "ty ideš", tr: { sk: "ty ideš", ua: "ти йдеш", ru: "ты идёшь", en: "you go" } },
      { person: "on", form: "ide", full: "on ide", tr: { sk: "on ide", ua: "він йде", ru: "он идёт", en: "he goes" } },
      { person: "ona", form: "ide", full: "ona ide", tr: { sk: "ona ide", ua: "вона йде", ru: "она идёт", en: "she goes" } },
      { person: "ono", form: "ide", full: "ono ide", tr: { sk: "ono ide", ua: "воно йде", ru: "оно идёт", en: "it goes" } },
      { person: "my", form: "ideme", full: "my ideme", tr: { sk: "my ideme", ua: "ми йдемо", ru: "мы идём", en: "we go" } },
      { person: "vy", form: "idete", full: "vy idete", tr: { sk: "vy idete", ua: "ви йдете", ru: "вы идёте", en: "you go" } },
      { person: "oni", form: "idú", full: "oni idú", tr: { sk: "oni idú", ua: "вони йдуть", ru: "они идут", en: "they go" } },
    ],
    examples: [{ sk: "Idem do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу.", en: "I am going to work." }],
  },
];

export const VERBS_CS: VerbBlock[] = [
  {
    id: "pracovat",
    infinitive: "pracovat",
    meaning: { sk: "pracovat", ua: "працювати", ru: "работать", en: "to work" },
    note: {
      sk: "Tip: pracuji/pracuješ",
      ua: "Типове чеське дієслово: pracuji, pracuješ, pracuje…",
      ru: "Типичный чешский глагол: pracuji, pracuješ, pracuje…",
      en: "Typical Czech verb: pracuji, pracuješ, pracuje…",
    },
    rows: [
      { person: "ja", form: "pracuji", full: "já pracuji", tr: { sk: "já pracuji", ua: "я працюю", ru: "я работаю", en: "I work" } },
      { person: "ty", form: "pracuješ", full: "ty pracuješ", tr: { sk: "ty pracuješ", ua: "ти працюєш", ru: "ты работаешь", en: "you work" } },
      { person: "on", form: "pracuje", full: "on pracuje", tr: { sk: "on pracuje", ua: "він працює", ru: "он работает", en: "he works" } },
      { person: "ona", form: "pracuje", full: "ona pracuje", tr: { sk: "ona pracuje", ua: "вона працює", ru: "она работает", en: "she works" } },
      { person: "ono", form: "pracuje", full: "ono pracuje", tr: { sk: "ono pracuje", ua: "воно працює", ru: "оно работает", en: "it works" } },
      { person: "my", form: "pracujeme", full: "my pracujeme", tr: { sk: "my pracujeme", ua: "ми працюємо", ru: "мы работаем", en: "we work" } },
      { person: "vy", form: "pracujete", full: "vy pracujete", tr: { sk: "vy pracujete", ua: "ви працюєте", ru: "вы работаете", en: "you work" } },
      { person: "oni", form: "pracují", full: "oni pracují", tr: { sk: "oni pracují", ua: "вони працюють", ru: "они работают", en: "they work" } },
    ],
    examples: [{ sk: "Já pracuji dnes.", ua: "Я працюю сьогодні.", ru: "Я работаю сегодня.", en: "I work today." }],
  },
  {
    id: "delat",
    infinitive: "dělat",
    meaning: { sk: "dělat", ua: "робити", ru: "делать", en: "to do" },
    note: {
      sk: "Tip: dělám/děláš",
      ua: "Дуже часте дієслово: dělám, děláš, dělá…",
      ru: "Очень частый глагол: dělám, děláš, dělá…",
      en: "Very common verb: dělám, děláš, dělá…",
    },
    rows: [
      { person: "ja", form: "dělám", full: "já dělám", tr: { sk: "já dělám", ua: "я роблю", ru: "я делаю", en: "I do" } },
      { person: "ty", form: "děláš", full: "ty děláš", tr: { sk: "ty děláš", ua: "ти робиш", ru: "ты делаешь", en: "you do" } },
      { person: "on", form: "dělá", full: "on dělá", tr: { sk: "on dělá", ua: "він робить", ru: "он делает", en: "he does" } },
      { person: "ona", form: "dělá", full: "ona dělá", tr: { sk: "ona dělá", ua: "вона робить", ru: "она делает", en: "she does" } },
      { person: "ono", form: "dělá", full: "ono dělá", tr: { sk: "ono dělá", ua: "воно робить", ru: "оно делает", en: "it does" } },
      { person: "my", form: "děláme", full: "my děláme", tr: { sk: "my děláme", ua: "ми робимо", ru: "мы делаем", en: "we do" } },
      { person: "vy", form: "děláte", full: "vy děláte", tr: { sk: "vy děláte", ua: "ви робите", ru: "вы делаете", en: "you do" } },
      { person: "oni", form: "dělají", full: "oni dělají", tr: { sk: "oni dělají", ua: "вони роблять", ru: "они делают", en: "they do" } },
    ],
    examples: [{ sk: "Já dělám úkol.", ua: "Я роблю завдання.", ru: "Я делаю задание.", en: "I do my homework." }],
  },
  {
    id: "byt",
    infinitive: "být",
    meaning: { sk: "být", ua: "бути", ru: "быть", en: "to be" },
    note: {
      sk: "Tip: jsem/jsi/je",
      ua: "Нерегулярне: jsem, jsi, je…",
      ru: "Нерегулярный: jsem, jsi, je…",
      en: "Irregular: jsem, jsi, je…",
    },
    rows: [
      { person: "ja", form: "jsem", full: "já jsem", tr: { sk: "já jsem", ua: "я є / я (...)", ru: "я (есть) / я (...)", en: "I am" } },
      { person: "ty", form: "jsi", full: "ty jsi", tr: { sk: "ty jsi", ua: "ти є / ти (...)", ru: "ты (есть) / ты (...)", en: "you are" } },
      { person: "on", form: "je", full: "on je", tr: { sk: "on je", ua: "він є", ru: "он есть", en: "he is" } },
      { person: "ona", form: "je", full: "ona je", tr: { sk: "ona je", ua: "вона є", ru: "она есть", en: "she is" } },
      { person: "ono", form: "je", full: "ono je", tr: { sk: "ono je", ua: "воно є", ru: "оно есть", en: "it is" } },
      { person: "my", form: "jsme", full: "my jsme", tr: { sk: "my jsme", ua: "ми є", ru: "мы есть", en: "we are" } },
      { person: "vy", form: "jste", full: "vy jste", tr: { sk: "vy jste", ua: "ви є", ru: "вы есть", en: "you are" } },
      { person: "oni", form: "jsou", full: "oni jsou", tr: { sk: "oni jsou", ua: "вони є", ru: "они есть", en: "they are" } },
    ],
    examples: [{ sk: "Já jsem doma.", ua: "Я вдома.", ru: "Я дома.", en: "I am at home." }],
  },
  {
    id: "bydlet",
    infinitive: "bydlet",
    meaning: { sk: "bydlet", ua: "жити (мешкати)", ru: "жить (проживать)", en: "to live" },
    note: {
      sk: "Tip: bydlím/bydlíš",
      ua: "Про місце проживання: bydlím, bydlíš…",
      ru: "Про место проживания: bydlím, bydlíš…",
      en: "About where you live: bydlím, bydlíš…",
    },
    rows: [
      { person: "ja", form: "bydlím", full: "já bydlím", tr: { sk: "já bydlím", ua: "я живу", ru: "я живу", en: "I live" } },
      { person: "ty", form: "bydlíš", full: "ty bydlíš", tr: { sk: "ty bydlíš", ua: "ти живеш", ru: "ты живёшь", en: "you live" } },
      { person: "on", form: "bydlí", full: "on bydlí", tr: { sk: "on bydlí", ua: "він живе", ru: "он живёт", en: "he lives" } },
      { person: "ona", form: "bydlí", full: "ona bydlí", tr: { sk: "ona bydlí", ua: "вона живе", ru: "она живёт", en: "she lives" } },
      { person: "ono", form: "bydlí", full: "ono bydlí", tr: { sk: "ono bydlí", ua: "воно живе", ru: "оно живёт", en: "it lives" } },
      { person: "my", form: "bydlíme", full: "my bydlíme", tr: { sk: "my bydlíme", ua: "ми живемо", ru: "мы живём", en: "we live" } },
      { person: "vy", form: "bydlíte", full: "vy bydlíte", tr: { sk: "vy bydlíte", ua: "ви живете", ru: "вы живёте", en: "you live" } },
      { person: "oni", form: "bydlí", full: "oni bydlí", tr: { sk: "oni bydlí", ua: "вони живуть", ru: "они живут", en: "they live" } },
    ],
    examples: [{ sk: "Já bydlím v Praze.", ua: "Я живу в Празі.", ru: "Я живу в Праге.", en: "I live in Prague." }],
  },
  {
    id: "chodit",
    infinitive: "chodit",
    meaning: { sk: "chodit", ua: "ходити", ru: "ходить", en: "to go / to walk" },
    note: {
      sk: "Tip: chodím/chodíš",
      ua: "Регулярний рух: chodím, chodíš…",
      ru: "Регулярное движение: chodím, chodíš…",
      en: "Regular movement: chodím, chodíš…",
    },
    rows: [
      { person: "ja", form: "chodím", full: "já chodím", tr: { sk: "já chodím", ua: "я ходжу", ru: "я хожу", en: "I go / I walk" } },
      { person: "ty", form: "chodíš", full: "ty chodíš", tr: { sk: "ty chodíš", ua: "ти ходиш", ru: "ты ходишь", en: "you go / you walk" } },
      { person: "on", form: "chodí", full: "on chodí", tr: { sk: "on chodí", ua: "він ходить", ru: "он ходит", en: "he goes / he walks" } },
      { person: "ona", form: "chodí", full: "ona chodí", tr: { sk: "ona chodí", ua: "вона ходить", ru: "она ходит", en: "she goes / she walks" } },
      { person: "ono", form: "chodí", full: "ono chodí", tr: { sk: "ono chodí", ua: "воно ходить", ru: "оно ходит", en: "it goes / it walks" } },
      { person: "my", form: "chodíme", full: "my chodíme", tr: { sk: "my chodíme", ua: "ми ходимо", ru: "мы ходим", en: "we go / we walk" } },
      { person: "vy", form: "chodíte", full: "vy chodíte", tr: { sk: "vy chodíte", ua: "ви ходите", ru: "вы ходите", en: "you go / you walk" } },
      { person: "oni", form: "chodí", full: "oni chodí", tr: { sk: "oni chodí", ua: "вони ходять", ru: "они ходят", en: "they go / they walk" } },
    ],
    examples: [{ sk: "Chodím do práce.", ua: "Я ходжу на роботу.", ru: "Я хожу на работу.", en: "I go to work." }],
  },
  {
    id: "ucit",
    infinitive: "učit",
    meaning: { sk: "učit", ua: "вчити / навчати", ru: "учить / обучать", en: "to teach" },
    note: {
      sk: "Tip: učím/učíš",
      ua: "Навчання: učím, učíš…",
      ru: "Обучение: učím, učíš…",
      en: "Teaching: učím, učíš…",
    },
    rows: [
      { person: "ja", form: "učím", full: "já učím", tr: { sk: "já učím", ua: "я вчу", ru: "я учу", en: "I teach" } },
      { person: "ty", form: "učíš", full: "ty učíš", tr: { sk: "ty učíš", ua: "ти вчиш", ru: "ты учишь", en: "you teach" } },
      { person: "on", form: "učí", full: "on učí", tr: { sk: "on učí", ua: "він вчить", ru: "он учит", en: "he teaches" } },
      { person: "ona", form: "učí", full: "ona učí", tr: { sk: "ona učí", ua: "вона вчить", ru: "она учит", en: "she teaches" } },
      { person: "ono", form: "učí", full: "ono učí", tr: { sk: "ono učí", ua: "воно вчить", ru: "оно учит", en: "it teaches" } },
      { person: "my", form: "učíme", full: "my učíme", tr: { sk: "my učíme", ua: "ми вчимо", ru: "мы учим", en: "we teach" } },
      { person: "vy", form: "učíte", full: "vy učíte", tr: { sk: "vy učíte", ua: "ви вчите", ru: "вы учите", en: "you teach" } },
      { person: "oni", form: "učí", full: "oni učí", tr: { sk: "oni učí", ua: "вони вчать", ru: "они учат", en: "they teach" } },
    ],
    examples: [{ sk: "Učím děti.", ua: "Я навчаю дітей.", ru: "Я учу детей.", en: "I teach children." }],
  },
  {
    id: "ucitse",
    infinitive: "učit se",
    meaning: { sk: "učit se", ua: "вчитися", ru: "учиться", en: "to learn" },
    note: {
      sk: "Tip: se",
      ua: "Зворотне: učím se, učíš se…",
      ru: "Возвратное: učím se, učíš se…",
      en: "Reflexive: učím se, učíš se…",
    },
    rows: [
      { person: "ja", form: "učím se", full: "já se učím", tr: { sk: "já se učím", ua: "я вчуся", ru: "я учусь", en: "I learn" } },
      { person: "ty", form: "učíš se", full: "ty se učíš", tr: { sk: "ty se učíš", ua: "ти вчишся", ru: "ты учишься", en: "you learn" } },
      { person: "on", form: "učí se", full: "on se učí", tr: { sk: "on se učí", ua: "він вчиться", ru: "он учится", en: "he learns" } },
      { person: "ona", form: "učí se", full: "ona se učí", tr: { sk: "ona se učí", ua: "вона вчиться", ru: "она учится", en: "she learns" } },
      { person: "ono", form: "učí se", full: "ono se učí", tr: { sk: "ono se učí", ua: "воно вчиться", ru: "оно учится", en: "it learns" } },
      { person: "my", form: "učíme se", full: "my se učíme", tr: { sk: "my se učíme", ua: "ми вчимося", ru: "мы учимся", en: "we learn" } },
      { person: "vy", form: "učíte se", full: "vy se učíte", tr: { sk: "vy se učíte", ua: "ви вчитеся", ru: "вы учитесь", en: "you learn" } },
      { person: "oni", form: "učí se", full: "oni se učí", tr: { sk: "oni se učí", ua: "вони вчаться", ru: "они учатся", en: "they learn" } },
    ],
    examples: [{ sk: "Učím se česky.", ua: "Я вчу чеську.", ru: "Я учу чешский.", en: "I learn Czech." }],
  },
  {
    id: "hledat",
    infinitive: "hledat",
    meaning: { sk: "hledat", ua: "шукати", ru: "искать", en: "to look for" },
    note: {
      sk: "Tip: hledám/hledáš",
      ua: "Пошук: hledám, hledáš…",
      ru: "Поиск: hledám, hledáš…",
      en: "Looking for something: hledám, hledáš…",
    },
    rows: [
      { person: "ja", form: "hledám", full: "já hledám", tr: { sk: "já hledám", ua: "я шукаю", ru: "я ищу", en: "I look for" } },
      { person: "ty", form: "hledáš", full: "ty hledáš", tr: { sk: "ty hledáš", ua: "ти шукаєш", ru: "ты ищешь", en: "you look for" } },
      { person: "on", form: "hledá", full: "on hledá", tr: { sk: "on hledá", ua: "він шукає", ru: "он ищет", en: "he looks for" } },
      { person: "ona", form: "hledá", full: "ona hledá", tr: { sk: "ona hledá", ua: "вона шукає", ru: "она ищет", en: "she looks for" } },
      { person: "ono", form: "hledá", full: "ono hledá", tr: { sk: "ono hledá", ua: "воно шукає", ru: "оно ищет", en: "it looks for" } },
      { person: "my", form: "hledáme", full: "my hledáme", tr: { sk: "my hledáme", ua: "ми шукаємо", ru: "мы ищем", en: "we look for" } },
      { person: "vy", form: "hledáte", full: "vy hledáte", tr: { sk: "vy hledáte", ua: "ви шукаєте", ru: "вы ищете", en: "you look for" } },
      { person: "oni", form: "hledají", full: "oni hledají", tr: { sk: "oni hledají", ua: "вони шукають", ru: "они ищут", en: "they look for" } },
    ],
    examples: [{ sk: "Hledám práci.", ua: "Я шукаю роботу.", ru: "Я ищу работу.", en: "I am looking for a job." }],
  },
  {
    id: "mit",
    infinitive: "mít",
    meaning: { sk: "mít", ua: "мати", ru: "иметь", en: "to have" },
    note: {
      sk: "Tip: mám/máš/má",
      ua: "Корисне щодня: mám, máš, má…",
      ru: "Нужно каждый день: mám, máš, má…",
      en: "Useful every day: mám, máš, má…",
    },
    rows: [
      { person: "ja", form: "mám", full: "já mám", tr: { sk: "já mám", ua: "я маю", ru: "у меня есть", en: "I have" } },
      { person: "ty", form: "máš", full: "ty máš", tr: { sk: "ty máš", ua: "ти маєш", ru: "у тебя есть", en: "you have" } },
      { person: "on", form: "má", full: "on má", tr: { sk: "on má", ua: "він має", ru: "у него есть", en: "he has" } },
      { person: "ona", form: "má", full: "ona má", tr: { sk: "ona má", ua: "вона має", ru: "у неё есть", en: "she has" } },
      { person: "ono", form: "má", full: "ono má", tr: { sk: "ono má", ua: "воно має", ru: "у него/неё есть", en: "it has" } },
      { person: "my", form: "máme", full: "my máme", tr: { sk: "my máme", ua: "ми маємо", ru: "у нас есть", en: "we have" } },
      { person: "vy", form: "máte", full: "vy máte", tr: { sk: "vy máte", ua: "ви маєте", ru: "у вас есть", en: "you have" } },
      { person: "oni", form: "mají", full: "oni mají", tr: { sk: "oni mají", ua: "вони мають", ru: "у них есть", en: "they have" } },
    ],
    examples: [{ sk: "Já mám čas.", ua: "Я маю час.", ru: "У меня есть время.", en: "I have time." }],
  },
  {
    id: "jit",
    infinitive: "jít",
    meaning: { sk: "jít", ua: "йти", ru: "идти", en: "to go" },
    note: {
      sk: "Tip: nejdu…",
      ua: "Рух: jdu, jdeš, jde… (заперечення: nejdu, nejdeš…).",
      ru: "Движение: jdu, jdeš, jde… (отрицание: nejdu, nejdeš…).",
      en: "Movement: jdu, jdeš, jde… (negation: nejdu, nejdeš…).",
    },
    rows: [
      { person: "ja", form: "jdu", full: "já jdu", tr: { sk: "já jdu", ua: "я йду", ru: "я иду", en: "I go" } },
      { person: "ty", form: "jdeš", full: "ty jdeš", tr: { sk: "ty jdeš", ua: "ти йдеш", ru: "ты идёшь", en: "you go" } },
      { person: "on", form: "jde", full: "on jde", tr: { sk: "on jde", ua: "він йде", ru: "он идёт", en: "he goes" } },
      { person: "ona", form: "jde", full: "ona jde", tr: { sk: "ona jde", ua: "вона йде", ru: "она идёт", en: "she goes" } },
      { person: "ono", form: "jde", full: "ono jde", tr: { sk: "ono jde", ua: "воно йде", ru: "оно идёт", en: "it goes" } },
      { person: "my", form: "jdeme", full: "my jdeme", tr: { sk: "my jdeme", ua: "ми йдемо", ru: "мы идём", en: "we go" } },
      { person: "vy", form: "jdete", full: "vy jdete", tr: { sk: "vy jdete", ua: "ви йдете", ru: "вы идёте", en: "you go" } },
      { person: "oni", form: "jdou", full: "oni jdou", tr: { sk: "oni jdou", ua: "вони йдуть", ru: "они идут", en: "they go" } },
    ],
    examples: [{ sk: "Jdu do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу.", en: "I am going to work." }],
  },
];

export const VERBS_PL: VerbBlock[] = [
  {
    id: "pracowac",
    infinitive: "pracować",
    meaning: { sk: "pracować", ua: "працювати", ru: "работать", en: "to work" },
    note: {
      sk: "Tip: pracuję/pracujesz",
      ua: "Типове польське дієслово: pracuję, pracujesz, pracuje…",
      ru: "Типичный польский глагол: pracuję, pracujesz, pracuje…",
      en: "Typical Polish verb: pracuję, pracujesz, pracuje…",
    },
    rows: [
      { person: "ja", form: "pracuję", full: "ja pracuję", tr: { sk: "ja pracuję", ua: "я працюю", ru: "я работаю", en: "I work" } },
      { person: "ty", form: "pracujesz", full: "ty pracujesz", tr: { sk: "ty pracujesz", ua: "ти працюєш", ru: "ты работаешь", en: "you work" } },
      { person: "on", form: "pracuje", full: "on pracuje", tr: { sk: "on pracuje", ua: "він працює", ru: "он работает", en: "he works" } },
      { person: "ona", form: "pracuje", full: "ona pracuje", tr: { sk: "ona pracuje", ua: "вона працює", ru: "она работает", en: "she works" } },
      { person: "ono", form: "pracuje", full: "ono pracuje", tr: { sk: "ono pracuje", ua: "воно працює", ru: "оно работает", en: "it works" } },
      { person: "my", form: "pracujemy", full: "my pracujemy", tr: { sk: "my pracujemy", ua: "ми працюємо", ru: "мы работаем", en: "we work" } },
      { person: "vy", form: "pracujecie", full: "wy pracujecie", tr: { sk: "wy pracujecie", ua: "ви працюєте", ru: "вы работаете", en: "you work" } },
      { person: "oni", form: "pracują", full: "oni pracują", tr: { sk: "oni pracują", ua: "вони працюють", ru: "они работают", en: "they work" } },
    ],
    examples: [{ sk: "Ja pracuję dzisiaj.", ua: "Я працюю сьогодні.", ru: "Я работаю сегодня.", en: "I work today." }],
  },
  {
    id: "robic",
    infinitive: "robić",
    meaning: { sk: "robić", ua: "робити", ru: "делать", en: "to do" },
    note: {
      sk: "Tip: robię/robisz",
      ua: "Дуже часте дієслово: robię, robisz, robi…",
      ru: "Очень частый глагол: robię, robisz, robi…",
      en: "Very common verb: robię, robisz, robi…",
    },
    rows: [
      { person: "ja", form: "robię", full: "ja robię", tr: { sk: "ja robię", ua: "я роблю", ru: "я делаю", en: "I do" } },
      { person: "ty", form: "robisz", full: "ty robisz", tr: { sk: "ty robisz", ua: "ти робиш", ru: "ты делаешь", en: "you do" } },
      { person: "on", form: "robi", full: "on robi", tr: { sk: "on robi", ua: "він робить", ru: "он делает", en: "he does" } },
      { person: "ona", form: "robi", full: "ona robi", tr: { sk: "ona robi", ua: "вона робить", ru: "она делает", en: "she does" } },
      { person: "ono", form: "robi", full: "ono robi", tr: { sk: "ono robi", ua: "воно робить", ru: "оно делает", en: "it does" } },
      { person: "my", form: "robimy", full: "my robimy", tr: { sk: "my robimy", ua: "ми робимо", ru: "мы делаем", en: "we do" } },
      { person: "vy", form: "robicie", full: "wy robicie", tr: { sk: "wy robicie", ua: "ви робите", ru: "вы делаете", en: "you do" } },
      { person: "oni", form: "robią", full: "oni robią", tr: { sk: "oni robią", ua: "вони роблять", ru: "они делают", en: "they do" } },
    ],
    examples: [{ sk: "Ja robię zadanie.", ua: "Я роблю завдання.", ru: "Я делаю задание.", en: "I do homework." }],
  },
  {
    id: "byc",
    infinitive: "być",
    meaning: { sk: "być", ua: "бути", ru: "быть", en: "to be" },
    note: {
      sk: "Tip: jestem/jesteś/jest",
      ua: "Нерегулярне: jestem, jesteś, jest…",
      ru: "Нерегулярный: jestem, jesteś, jest…",
      en: "Irregular: jestem, jesteś, jest…",
    },
    rows: [
      { person: "ja", form: "jestem", full: "ja jestem", tr: { sk: "ja jestem", ua: "я є / я (...)", ru: "я (есть) / я (...)", en: "I am" } },
      { person: "ty", form: "jesteś", full: "ty jesteś", tr: { sk: "ty jesteś", ua: "ти є / ти (...)", ru: "ты (есть) / ты (...)", en: "you are" } },
      { person: "on", form: "jest", full: "on jest", tr: { sk: "on jest", ua: "він є", ru: "он есть", en: "he is" } },
      { person: "ona", form: "jest", full: "ona jest", tr: { sk: "ona jest", ua: "вона є", ru: "она есть", en: "she is" } },
      { person: "ono", form: "jest", full: "ono jest", tr: { sk: "ono jest", ua: "воно є", ru: "оно есть", en: "it is" } },
      { person: "my", form: "jesteśmy", full: "my jesteśmy", tr: { sk: "my jesteśmy", ua: "ми є", ru: "мы есть", en: "we are" } },
      { person: "vy", form: "jesteście", full: "wy jesteście", tr: { sk: "wy jesteście", ua: "ви є", ru: "вы есть", en: "you are" } },
      { person: "oni", form: "są", full: "oni są", tr: { sk: "oni są", ua: "вони є", ru: "они есть", en: "they are" } },
    ],
    examples: [{ sk: "Ja jestem w domu.", ua: "Я вдома.", ru: "Я дома.", en: "I am at home." }],
  },
  {
    id: "mieszkac",
    infinitive: "mieszkać",
    meaning: { sk: "mieszkać", ua: "жити (мешкати)", ru: "жить (проживать)", en: "to live" },
    note: {
      sk: "Tip: mieszkam/mieszkasz",
      ua: "Про місце проживання: mieszkam, mieszkasz…",
      ru: "Про место проживания: mieszkam, mieszkasz…",
      en: "About where you live: mieszkam, mieszkasz…",
    },
    rows: [
      { person: "ja", form: "mieszkam", full: "ja mieszkam", tr: { sk: "ja mieszkam", ua: "я живу", ru: "я живу", en: "I live" } },
      { person: "ty", form: "mieszkasz", full: "ty mieszkasz", tr: { sk: "ty mieszkasz", ua: "ти живеш", ru: "ты живёшь", en: "you live" } },
      { person: "on", form: "mieszka", full: "on mieszka", tr: { sk: "on mieszka", ua: "він живе", ru: "он живёт", en: "he lives" } },
      { person: "ona", form: "mieszka", full: "ona mieszka", tr: { sk: "ona mieszka", ua: "вона живе", ru: "она живёт", en: "she lives" } },
      { person: "ono", form: "mieszka", full: "ono mieszka", tr: { sk: "ono mieszka", ua: "воно живе", ru: "оно живёт", en: "it lives" } },
      { person: "my", form: "mieszkamy", full: "my mieszkamy", tr: { sk: "my mieszkamy", ua: "ми живемо", ru: "мы живём", en: "we live" } },
      { person: "vy", form: "mieszkacie", full: "wy mieszkacie", tr: { sk: "wy mieszkacie", ua: "ви живете", ru: "вы живёте", en: "you live" } },
      { person: "oni", form: "mieszkają", full: "oni mieszkają", tr: { sk: "oni mieszkają", ua: "вони живуть", ru: "они живут", en: "they live" } },
    ],
    examples: [{ sk: "Ja mieszkam w Warszawie.", ua: "Я живу у Варшаві.", ru: "Я живу в Варшаве.", en: "I live in Warsaw." }],
  },
  {
    id: "chodzic",
    infinitive: "chodzić",
    meaning: { sk: "chodzić", ua: "ходити", ru: "ходить", en: "to go / to walk" },
    note: {
      sk: "Tip: chodzę/chodzisz",
      ua: "Регулярний рух: chodzę, chodzisz…",
      ru: "Регулярное движение: chodzę, chodzisz…",
      en: "Regular movement: chodzę, chodzisz…",
    },
    rows: [
      { person: "ja", form: "chodzę", full: "ja chodzę", tr: { sk: "ja chodzę", ua: "я ходжу", ru: "я хожу", en: "I go / I walk" } },
      { person: "ty", form: "chodzisz", full: "ty chodzisz", tr: { sk: "ty chodzisz", ua: "ти ходиш", ru: "ты ходишь", en: "you go / you walk" } },
      { person: "on", form: "chodzi", full: "on chodzi", tr: { sk: "on chodzi", ua: "він ходить", ru: "он ходит", en: "he goes / he walks" } },
      { person: "ona", form: "chodzi", full: "ona chodzi", tr: { sk: "ona chodzi", ua: "вона ходить", ru: "она ходит", en: "she goes / she walks" } },
      { person: "ono", form: "chodzi", full: "ono chodzi", tr: { sk: "ono chodzi", ua: "воно ходить", ru: "оно ходит", en: "it goes / it walks" } },
      { person: "my", form: "chodzimy", full: "my chodzimy", tr: { sk: "my chodzimy", ua: "ми ходимо", ru: "мы ходим", en: "we go / we walk" } },
      { person: "vy", form: "chodzicie", full: "wy chodzicie", tr: { sk: "wy chodzicie", ua: "ви ходите", ru: "вы ходите", en: "you go / you walk" } },
      { person: "oni", form: "chodzą", full: "oni chodzą", tr: { sk: "oni chodzą", ua: "вони ходять", ru: "они ходят", en: "they go / they walk" } },
    ],
    examples: [{ sk: "Chodzę do pracy.", ua: "Я ходжу на роботу.", ru: "Я хожу на работу.", en: "I go to work." }],
  },
  {
    id: "uczyc",
    infinitive: "uczyć",
    meaning: { sk: "uczyć", ua: "вчити / навчати", ru: "учить / обучать", en: "to teach" },
    note: {
      sk: "Tip: uczę/uczysz",
      ua: "Навчання: uczę, uczysz…",
      ru: "Обучение: uczę, uczysz…",
      en: "Teaching: uczę, uczysz…",
    },
    rows: [
      { person: "ja", form: "uczę", full: "ja uczę", tr: { sk: "ja uczę", ua: "я вчу", ru: "я учу", en: "I teach" } },
      { person: "ty", form: "uczysz", full: "ty uczysz", tr: { sk: "ty uczysz", ua: "ти вчиш", ru: "ты учишь", en: "you teach" } },
      { person: "on", form: "uczy", full: "on uczy", tr: { sk: "on uczy", ua: "він вчить", ru: "он учит", en: "he teaches" } },
      { person: "ona", form: "uczy", full: "ona uczy", tr: { sk: "ona uczy", ua: "вона вчить", ru: "она учит", en: "she teaches" } },
      { person: "ono", form: "uczy", full: "ono uczy", tr: { sk: "ono uczy", ua: "воно вчить", ru: "оно учит", en: "it teaches" } },
      { person: "my", form: "uczymy", full: "my uczymy", tr: { sk: "my uczymy", ua: "ми вчимо", ru: "мы учим", en: "we teach" } },
      { person: "vy", form: "uczycie", full: "wy uczycie", tr: { sk: "wy uczycie", ua: "ви вчите", ru: "вы учите", en: "you teach" } },
      { person: "oni", form: "uczą", full: "oni uczą", tr: { sk: "oni uczą", ua: "вони вчать", ru: "они учат", en: "they teach" } },
    ],
    examples: [{ sk: "Uczę dzieci.", ua: "Я навчаю дітей.", ru: "Я учу детей.", en: "I teach children." }],
  },
  {
    id: "uczycsie",
    infinitive: "uczyć się",
    meaning: { sk: "uczyć się", ua: "вчитися", ru: "учиться", en: "to learn" },
    note: {
      sk: "Tip: się",
      ua: "Зворотне: uczę się, uczysz się…",
      ru: "Возвратное: uczę się, uczysz się…",
      en: "Reflexive: uczę się, uczysz się…",
    },
    rows: [
      { person: "ja", form: "uczę się", full: "ja uczę się", tr: { sk: "ja uczę się", ua: "я вчуся", ru: "я учусь", en: "I learn" } },
      { person: "ty", form: "uczysz się", full: "ty uczysz się", tr: { sk: "ty uczysz się", ua: "ти вчишся", ru: "ты учишься", en: "you learn" } },
      { person: "on", form: "uczy się", full: "on uczy się", tr: { sk: "on uczy się", ua: "він вчиться", ru: "он учится", en: "he learns" } },
      { person: "ona", form: "uczy się", full: "ona uczy się", tr: { sk: "ona uczy się", ua: "вона вчиться", ru: "она учится", en: "she learns" } },
      { person: "ono", form: "uczy się", full: "ono uczy się", tr: { sk: "ono uczy się", ua: "воно вчиться", ru: "оно учится", en: "it learns" } },
      { person: "my", form: "uczymy się", full: "my uczymy się", tr: { sk: "my uczymy się", ua: "ми вчимося", ru: "мы учимся", en: "we learn" } },
      { person: "vy", form: "uczycie się", full: "wy uczycie się", tr: { sk: "wy uczycie się", ua: "ви вчитеся", ru: "вы учитесь", en: "you learn" } },
      { person: "oni", form: "uczą się", full: "oni uczą się", tr: { sk: "oni uczą się", ua: "вони вчаться", ru: "они учатся", en: "they learn" } },
    ],
    examples: [{ sk: "Uczę się polskiego.", ua: "Я вчу польську.", ru: "Я учу польский.", en: "I learn Polish." }],
  },
  {
    id: "szukac",
    infinitive: "szukać",
    meaning: { sk: "szukać", ua: "шукати", ru: "искать", en: "to look for" },
    note: {
      sk: "Tip: szukam/szukasz",
      ua: "Пошук: szukam, szukasz…",
      ru: "Поиск: szukam, szukasz…",
      en: "Looking for something: szukam, szukasz…",
    },
    rows: [
      { person: "ja", form: "szukam", full: "ja szukam", tr: { sk: "ja szukam", ua: "я шукаю", ru: "я ищу", en: "I look for" } },
      { person: "ty", form: "szukasz", full: "ty szukasz", tr: { sk: "ty szukasz", ua: "ти шукаєш", ru: "ты ищешь", en: "you look for" } },
      { person: "on", form: "szuka", full: "on szuka", tr: { sk: "on szuka", ua: "він шукає", ru: "он ищет", en: "he looks for" } },
      { person: "ona", form: "szuka", full: "ona szuka", tr: { sk: "ona szuka", ua: "вона шукає", ru: "она ищет", en: "she looks for" } },
      { person: "ono", form: "szuka", full: "ono szuka", tr: { sk: "ono szuka", ua: "воно шукає", ru: "оно ищет", en: "it looks for" } },
      { person: "my", form: "szukamy", full: "my szukamy", tr: { sk: "my szukamy", ua: "ми шукаємо", ru: "мы ищем", en: "we look for" } },
      { person: "vy", form: "szukacie", full: "wy szukacie", tr: { sk: "wy szukacie", ua: "ви шукаєте", ru: "вы ищете", en: "you look for" } },
      { person: "oni", form: "szukają", full: "oni szukają", tr: { sk: "oni szukają", ua: "вони шукають", ru: "они ищут", en: "they look for" } },
    ],
    examples: [{ sk: "Szukam pracy.", ua: "Я шукаю роботу.", ru: "Я ищу работу.", en: "I am looking for a job." }],
  },
  {
    id: "miec",
    infinitive: "mieć",
    meaning: { sk: "mieć", ua: "мати", ru: "иметь", en: "to have" },
    note: {
      sk: "Tip: mam/masz/ma",
      ua: "Корисне щодня: mam, masz, ma…",
      ru: "Нужно каждый день: mam, masz, ma…",
      en: "Useful every day: mam, masz, ma…",
    },
    rows: [
      { person: "ja", form: "mam", full: "ja mam", tr: { sk: "ja mam", ua: "я маю", ru: "у меня есть", en: "I have" } },
      { person: "ty", form: "masz", full: "ty masz", tr: { sk: "ty masz", ua: "ти маєш", ru: "у тебя есть", en: "you have" } },
      { person: "on", form: "ma", full: "on ma", tr: { sk: "on ma", ua: "він має", ru: "у него есть", en: "he has" } },
      { person: "ona", form: "ma", full: "ona ma", tr: { sk: "ona ma", ua: "вона має", ru: "у неё есть", en: "she has" } },
      { person: "ono", form: "ma", full: "ono ma", tr: { sk: "ono ma", ua: "воно має", ru: "у него/неё есть", en: "it has" } },
      { person: "my", form: "mamy", full: "my mamy", tr: { sk: "my mamy", ua: "ми маємо", ru: "у нас есть", en: "we have" } },
      { person: "vy", form: "macie", full: "wy macie", tr: { sk: "wy macie", ua: "ви маєте", ru: "у вас есть", en: "you have" } },
      { person: "oni", form: "mają", full: "oni mają", tr: { sk: "oni mają", ua: "вони мають", ru: "у них есть", en: "they have" } },
    ],
    examples: [{ sk: "Ja mam czas.", ua: "Я маю час.", ru: "У меня есть время.", en: "I have time." }],
  },
  {
    id: "isc",
    infinitive: "iść",
    meaning: { sk: "iść", ua: "йти", ru: "идти", en: "to go" },
    note: {
      sk: "Tip: nie idę…",
      ua: "Рух: idę, idziesz, idzie… (заперечення: nie idę, nie idziesz…).",
      ru: "Движение: idę, idziesz, idzie… (отрицание: nie idę, nie idziesz…).",
      en: "Movement: idę, idziesz, idzie… (negation: nie idę, nie idziesz…).",
    },
    rows: [
      { person: "ja", form: "idę", full: "ja idę", tr: { sk: "ja idę", ua: "я йду", ru: "я иду", en: "I go" } },
      { person: "ty", form: "idziesz", full: "ty idziesz", tr: { sk: "ty idziesz", ua: "ти йдеш", ru: "ты идёшь", en: "you go" } },
      { person: "on", form: "idzie", full: "on idzie", tr: { sk: "on idzie", ua: "він йде", ru: "он идёт", en: "he goes" } },
      { person: "ona", form: "idzie", full: "ona idzie", tr: { sk: "ona idzie", ua: "вона йде", ru: "она идёт", en: "she goes" } },
      { person: "ono", form: "idzie", full: "ono idzie", tr: { sk: "ono idzie", ua: "воно йде", ru: "оно идёт", en: "it goes" } },
      { person: "my", form: "idziemy", full: "my idziemy", tr: { sk: "my idziemy", ua: "ми йдемо", ru: "мы идём", en: "we go" } },
      { person: "vy", form: "idziecie", full: "wy idziecie", tr: { sk: "wy idziecie", ua: "ви йдете", ru: "вы идёте", en: "you go" } },
      { person: "oni", form: "idą", full: "oni idą", tr: { sk: "oni idą", ua: "вони йдуть", ru: "они идут", en: "they go" } },
    ],
    examples: [{ sk: "Idę do pracy.", ua: "Я йду на роботу.", ru: "Я иду на работу.", en: "I am going to work." }],
  },
];
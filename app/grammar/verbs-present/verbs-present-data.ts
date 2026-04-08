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
      "In Slovak, verbs change by person (ja/ty/on…). Below are tables, audio, and exercises.",
    subtitleCs:
      "In Czech, verbs change by person (já/ty/on…). Below are tables, audio, and exercises.",

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
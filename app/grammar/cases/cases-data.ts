export type W = {
  sk: string;
  ua: string;
  ru?: string;
};

export type CaseId = "nom" | "gen" | "dat" | "acc" | "loc" | "ins" | "voc";

export type CaseBlock = {
  id: CaseId;
  name: W;
  questions: W;
  use: W;
  rule: W;
  examples: W[];
};

export const CASES_SK: CaseBlock[] = [
  {
    id: "nom",
    name: { sk: "Nominatív", ua: "Називний", ru: "Именительный" },
    questions: { sk: "Kto? Čo?", ua: "Хто? Що?", ru: "Кто? Что?" },
    use: {
      sk: "Podmet (хто/що робить дію) + словникова форма.",
      ua: "Підмет (хто/що робить дію) + словникова форма.",
      ru: "Подлежащее (кто/что делает) + словарная форма.",
    },
    rule: {
      sk: "Bez predložiek. Часто з дієсловом byť: On je lekár.",
      ua: "Без прийменників. Часто з дієсловом byť: On je lekár.",
      ru: "Без предлогов. Часто с глаголом byť: On je lekár.",
    },
    examples: [
      { sk: "Ja som študent.", ua: "Я студент.", ru: "Я студент." },
      { sk: "Toto je auto.", ua: "Це авто.", ru: "Это машина." },
      { sk: "Brat pracuje.", ua: "Брат працює.", ru: "Брат работает." },
    ],
  },
  {
    id: "gen",
    name: { sk: "Genitív", ua: "Родовий", ru: "Родительный" },
    questions: { sk: "Koho? Čoho?", ua: "Кого? Чого?", ru: "Кого? Чего?" },
    use: {
      sk: "Vlastníctvo, „без/немає“, частина чогось.",
      ua: "Належність, «немає/без», частина чогось.",
      ru: "Принадлежность, «нет/без», часть чего-то.",
    },
    rule: {
      sk: "Часто з: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
      ua: "Часто з: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
      ru: "Часто с: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
    },
    examples: [
      { sk: "Nemám čas.", ua: "Я не маю часу.", ru: "У меня нет времени." },
      { sk: "Som z Ukrajiny.", ua: "Я з України.", ru: "Я из Украины." },
      { sk: "Idem do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу." },
    ],
  },
  {
    id: "dat",
    name: { sk: "Datív", ua: "Давальний", ru: "Дательный" },
    questions: { sk: "Komu? Čomu?", ua: "Кому? Чому?", ru: "Кому? Чему?" },
    use: {
      sk: "Кому/чому даємо, допомагаємо, телефонуємо.",
      ua: "Кому/чому даємо, допомагаємо, телефонуємо.",
      ru: "Кому/чему даём, помогаем, звоним.",
    },
    rule: {
      sk: "Часто з: k/ku (k lekárovi). Також: ďakujem, pomáham, volám.",
      ua: "Часто з: k/ku (k lekárovi). Також: ďakujem, pomáham, volám.",
      ru: "Часто с: k/ku (k lekárovi). Также: ďakujem, pomáham, volám.",
    },
    examples: [
      { sk: "Pomáham kamarátovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу." },
      { sk: "Volám mame.", ua: "Я телефоную мамі.", ru: "Я звоню маме." },
      { sk: "Ďakujem ti.", ua: "Дякую тобі.", ru: "Спасибо тебе." },
    ],
  },
  {
    id: "acc",
    name: { sk: "Akuzatív", ua: "Знахідний", ru: "Винительный" },
    questions: { sk: "Koho? Čo?", ua: "Кого? Що?", ru: "Кого? Что?" },
    use: {
      sk: "Прямий об’єкт дії (бачу/маю/роблю).",
      ua: "Прямий додаток (бачу/маю/роблю).",
      ru: "Прямое дополнение (вижу/имею/делаю).",
    },
    rule: {
      sk: "Часто після: vidím, mám, robím, kupujem. Також рух „na“: idem na poštu.",
      ua: "Часто після: vidím, mám, robím, kupujem. Також рух „na“: idem na poštu.",
      ru: "Часто после: vidím, mám, robím, kupujem. Также движение „na“: idem na poštu.",
    },
    examples: [
      { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину." },
      { sk: "Mám otázku.", ua: "У мене є питання.", ru: "У меня есть вопрос." },
      { sk: "Idem na poštu.", ua: "Я йду на пошту.", ru: "Я иду на почту." },
    ],
  },
  {
    id: "loc",
    name: { sk: "Lokál", ua: "Місцевий", ru: "Предложный (местный)" },
    questions: {
      sk: "O kom? O čom? Kde?",
      ua: "Про кого? Про що? Де?",
      ru: "О ком? О чём? Где?",
    },
    use: {
      sk: "Про щось говоримо + де знаходимось (у/на).",
      ua: "Говоримо про щось + де знаходимось (у/на).",
      ru: "Говорим о чём-то + где находимся (в/на).",
    },
    rule: {
      sk: "Завжди з прийменником: v/vo, na, o, po (v meste, o práci).",
      ua: "Завжди з прийменником: v/vo, na, o, po (v meste, o práci).",
      ru: "Всегда с предлогом: v/vo, na, o, po (v meste, o práci).",
    },
    examples: [
      { sk: "Som v práci.", ua: "Я на роботі.", ru: "Я на работе." },
      { sk: "Hovoríme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе." },
      { sk: "Bývam v meste.", ua: "Я живу в місті.", ru: "Я живу в городе." },
    ],
  },
  {
    id: "ins",
    name: { sk: "Inštrumentál", ua: "Орудний", ru: "Творительный" },
    questions: { sk: "S kým? S čím?", ua: "З ким? З чим?", ru: "С кем? С чем?" },
    use: {
      sk: "З ким/чим (разом), „ким є“ (професія/роль інколи).",
      ua: "З ким/чим (разом), «ким є» (роль/професія інколи).",
      ru: "С кем/чем (вместе), «кем является» (роль/профессия иногда).",
    },
    rule: {
      sk: "Часто з: s/so (s kamarátom), pred (pred domom).",
      ua: "Часто з: s/so (s kamarátom), pred (pred domom).",
      ru: "Часто с: s/so (s kamarátom), pred (pred domom).",
    },
    examples: [
      { sk: "Idem s kamarátom.", ua: "Я йду з другом.", ru: "Я иду с другом." },
      { sk: "Píšem perom.", ua: "Я пишу ручкою.", ru: "Я пишу ручкой." },
      { sk: "Som sám/sama.", ua: "Я сам/сама.", ru: "Я один/одна." },
    ],
  },
];

export const CASES_CS: CaseBlock[] = [
  {
    id: "nom",
    name: { sk: "Nominativ", ua: "Називний", ru: "Именительный" },
    questions: { sk: "Kdo? Co?", ua: "Хто? Що?", ru: "Кто? Что?" },
    use: {
      sk: "Podmět (хто/що робить дію) + словникова форма.",
      ua: "Підмет (хто/що робить дію) + словникова форма.",
      ru: "Подлежащее (кто/что делает) + словарная форма.",
    },
    rule: {
      sk: "Bez předložek. Часто з дієсловом být: On je lékař.",
      ua: "Без прийменників. Часто з дієсловом být: On je lékař.",
      ru: "Без предлогов. Часто с глаголом být: On je lékař.",
    },
    examples: [
      { sk: "Já jsem student.", ua: "Я студент.", ru: "Я студент." },
      { sk: "To je auto.", ua: "Це авто.", ru: "Это машина." },
      { sk: "Bratr pracuje.", ua: "Брат працює.", ru: "Брат работает." },
    ],
  },
  {
    id: "gen",
    name: { sk: "Genitiv", ua: "Родовий", ru: "Родительный" },
    questions: { sk: "Koho? Čeho?", ua: "Кого? Чого?", ru: "Кого? Чего?" },
    use: {
      sk: "Vlastnictví, „без/немає“, část něčeho.",
      ua: "Належність, «немає/без», частина чогось.",
      ru: "Принадлежность, «нет/без», часть чего-то.",
    },
    rule: {
      sk: "Často s: bez, od, do, z/ze, u. (bez vody, do práce, z domu).",
      ua: "Часто з: bez, od, do, z/ze, u. (bez vody, do práce, z domu).",
      ru: "Часто с: bez, od, do, z/ze, u. (bez vody, do práce, z domu).",
    },
    examples: [
      { sk: "Nemám čas.", ua: "Я не маю часу.", ru: "У меня нет времени." },
      { sk: "Jsem z Ukrajiny.", ua: "Я з України.", ru: "Я из Украины." },
      { sk: "Jdu do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу." },
    ],
  },
  {
    id: "dat",
    name: { sk: "Dativ", ua: "Давальний", ru: "Дательный" },
    questions: { sk: "Komu? Čemu?", ua: "Кому? Чому?", ru: "Кому? Чему?" },
    use: {
      sk: "Komu/čemu dáváme, pomáháme, voláme.",
      ua: "Кому/чому даємо, допомагаємо, телефонуємо.",
      ru: "Кому/чему даём, помогаем, звоним.",
    },
    rule: {
      sk: "Často s: k/ke (k lékaři). Také: děkuji, pomáhám, volám.",
      ua: "Часто з: k/ke (k lékaři). Також: děkuji, pomáhám, volám.",
      ru: "Часто с: k/ke (k lékaři). Также: děkuji, pomáhám, volам.",
    },
    examples: [
      { sk: "Pomáhám kamarádovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу." },
      { sk: "Volám mámě.", ua: "Я телефоную мамі.", ru: "Я звоню маме." },
      { sk: "Děkuji ti.", ua: "Дякую тобі.", ru: "Спасибо тебе." },
    ],
  },
  {
    id: "acc",
    name: { sk: "Akuzativ", ua: "Знахідний", ru: "Винительный" },
    questions: { sk: "Koho? Co?", ua: "Кого? Що?", ru: "Кого? Что?" },
    use: {
      sk: "Přímý objekt děje (vidím/mám/dělám).",
      ua: "Прямий додаток (бачу/маю/роблю).",
      ru: "Прямое дополнение (вижу/имею/делаю).",
    },
    rule: {
      sk: "Často po: vidím, mám, dělám, kupuji. Také pohyb „na“: jdu na poštu.",
      ua: "Часто після: vidím, mám, dělám, kupuji. Також рух „na“: jdu na poštu.",
      ru: "Часто после: vidím, mám, dělám, kupuji. Также движение „na“: jdu na poštu.",
    },
    examples: [
      { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину." },
      { sk: "Mám otázku.", ua: "У мене є питання.", ru: "У меня есть вопрос." },
      { sk: "Jdu na poštu.", ua: "Я йду на пошту.", ru: "Я иду на почту." },
    ],
  },
  {
    id: "voc",
    name: { sk: "Vokativ", ua: "Кличний", ru: "Звательный" },
    questions: { sk: "Oslovení!", ua: "Звертання!", ru: "Обращение!" },
    use: {
      sk: "Používá se při oslovování lidí přímo jménem nebo rolí.",
      ua: "Використовується, коли ми прямо до когось звертаємося на ім’я або за роллю.",
      ru: "Используется, когда мы прямо обращаемся к человеку по имени или роли.",
    },
    rule: {
      sk: "Často u jmen a oslovení: Petře!, pane!, maminko!",
      ua: "Часто в іменах і звертаннях: Petře!, pane!, maminko!",
      ru: "Часто в именах и обращениях: Petře!, pane!, maminko!",
    },
    examples: [
      { sk: "Petře, pojď sem!", ua: "Петре, іди сюди!", ru: "Петр, иди сюда!" },
      { sk: "Pane doktore, děkuji.", ua: "Пане лікарю, дякую.", ru: "Господин доктор, спасибо." },
      { sk: "Ahoj, Jano!", ua: "Привіт, Яно!", ru: "Привет, Яна!" },
    ],
  },
  {
    id: "loc",
    name: { sk: "Lokál", ua: "Місцевий", ru: "Предложный (местный)" },
    questions: {
      sk: "O kom? O čem? Kde?",
      ua: "Про кого? Про що? Де?",
      ru: "О ком? О чём? Где?",
    },
    use: {
      sk: "Mluvíme o něčem + kde se nacházíme (v/na).",
      ua: "Говоримо про щось + де знаходимось (у/на).",
      ru: "Говорим о чём-то + где находимся (в/на).",
    },
    rule: {
      sk: "Vždy s předložkou: v/ve, na, o, po (ve městě, o práci).",
      ua: "Завжди з прийменником: v/ve, na, o, po (ve městě, o práci).",
      ru: "Всегда с предлогом: v/ve, na, o, po (ve městě, o práci).",
    },
    examples: [
      { sk: "Jsem v práci.", ua: "Я на роботі.", ru: "Я на работе." },
      { sk: "Mluvíme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе." },
      { sk: "Bydlím ve městě.", ua: "Я живу в місті.", ru: "Я живу в городе." },
    ],
  },
  {
    id: "ins",
    name: { sk: "Instrumentál", ua: "Орудний", ru: "Творительный" },
    questions: { sk: "S kým? S čím?", ua: "З ким? З чим?", ru: "С кем? С чем?" },
    use: {
      sk: "S kým/čím (společně), někdy také role/profese.",
      ua: "З ким/чим (разом), інколи також роль/професія.",
      ru: "С кем/чем (вместе), иногда также роль/профессия.",
    },
    rule: {
      sk: "Často s: s/se (s kamarádem), před (před domem).",
      ua: "Часто з: s/se (s kamarádem), před (před domem).",
      ru: "Часто с: s/se (s kamarádem), před (před domem).",
    },
    examples: [
      { sk: "Jdu s kamarádem.", ua: "Я йду з другом.", ru: "Я иду с другом." },
      { sk: "Píšu perem.", ua: "Я пишу ручкою.", ru: "Я пишу ручкой." },
      { sk: "Jsem sám/sama.", ua: "Я сам/сама.", ru: "Я один/одна." },
    ],
  },
];

export const BUILD_SAMPLES_SK: W[] = [
  { sk: "Som v práci.", ua: "Я на роботі.", ru: "Я на работе." },
  { sk: "Idem do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу." },
  { sk: "Idem s kamarátom.", ua: "Я йду з другом.", ru: "Я иду с другом." },
  { sk: "Hovoríme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе." },
  { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину." },
  { sk: "Pomáham kamarátovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу." },
];

export const BUILD_SAMPLES_CS: W[] = [
  { sk: "Jsem v práci.", ua: "Я на роботі.", ru: "Я на работе." },
  { sk: "Jdu do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу." },
  { sk: "Jdu s kamarádem.", ua: "Я йду з другом.", ru: "Я иду с другом." },
  { sk: "Mluvíme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе." },
  { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину." },
  { sk: "Pomáhám kamarádovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу." },
];
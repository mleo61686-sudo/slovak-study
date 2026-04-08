export type W = {
  sk: string;
  ua: string;
  ru?: string;
  en?: string;
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
    name: { sk: "Nominatív", ua: "Називний", ru: "Именительный", en: "Nominative" },
    questions: { sk: "Kto? Čo?", ua: "Хто? Що?", ru: "Кто? Что?", en: "Who? What?" },
    use: {
      sk: "Podmet (хто/що робить дію) + словникова форма.",
      ua: "Підмет (хто/що робить дію) + словникова форма.",
      ru: "Подлежащее (кто/что делает) + словарная форма.",
      en: "Subject (who/what performs the action) + dictionary form.",
    },
    rule: {
      sk: "Bez predložiek. Часто з дієсловом byť: On je lekár.",
      ua: "Без прийменників. Часто з дієсловом byť: On je lekár.",
      ru: "Без предлогов. Часто с глаголом byť: On je lekár.",
      en: "Without prepositions. Often used with the verb byť: On je lekár.",
    },
    examples: [
      { sk: "Ja som študent.", ua: "Я студент.", ru: "Я студент.", en: "I am a student." },
      { sk: "Toto je auto.", ua: "Це авто.", ru: "Это машина.", en: "This is a car." },
      { sk: "Brat pracuje.", ua: "Брат працює.", ru: "Брат работает.", en: "My brother works." },
    ],
  },
  {
    id: "gen",
    name: { sk: "Genitív", ua: "Родовий", ru: "Родительный", en: "Genitive" },
    questions: { sk: "Koho? Čoho?", ua: "Кого? Чого?", ru: "Кого? Чего?", en: "Whom? Of what?" },
    use: {
      sk: "Vlastníctvo, „без/немає“, частина чогось.",
      ua: "Належність, «немає/без», частина чогось.",
      ru: "Принадлежность, «нет/без», часть чего-то.",
      en: "Possession, “without / there is no”, part of something.",
    },
    rule: {
      sk: "Часто з: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
      ua: "Часто з: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
      ru: "Часто с: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
      en: "Often used with: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
    },
    examples: [
      { sk: "Nemám čas.", ua: "Я не маю часу.", ru: "У меня нет времени.", en: "I do not have time." },
      { sk: "Som z Ukrajiny.", ua: "Я з України.", ru: "Я из Украины.", en: "I am from Ukraine." },
      { sk: "Idem do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу.", en: "I am going to work." },
    ],
  },
  {
    id: "dat",
    name: { sk: "Datív", ua: "Давальний", ru: "Дательный", en: "Dative" },
    questions: { sk: "Komu? Čomu?", ua: "Кому? Чому?", ru: "Кому? Чему?", en: "To whom? To what?" },
    use: {
      sk: "Кому/чому даємо, допомагаємо, телефонуємо.",
      ua: "Кому/чому даємо, допомагаємо, телефонуємо.",
      ru: "Кому/чему даём, помогаем, звоним.",
      en: "To whom / to what we give, help, or call.",
    },
    rule: {
      sk: "Часто з: k/ku (k lekárovi). Також: ďakujem, pomáham, volám.",
      ua: "Часто з: k/ku (k lekárovi). Також: ďakujem, pomáham, volám.",
      ru: "Часто с: k/ku (k lekárovi). Также: ďakujem, pomáham, volám.",
      en: "Often used with: k/ku (k lekárovi). Also: ďakujem, pomáham, volám.",
    },
    examples: [
      { sk: "Pomáham kamarátovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу.", en: "I help my friend." },
      { sk: "Volám mame.", ua: "Я телефоную мамі.", ru: "Я звоню маме.", en: "I am calling my mother." },
      { sk: "Ďakujem ti.", ua: "Дякую тобі.", ru: "Спасибо тебе.", en: "Thank you." },
    ],
  },
  {
    id: "acc",
    name: { sk: "Akuzatív", ua: "Знахідний", ru: "Винительный", en: "Accusative" },
    questions: { sk: "Koho? Čo?", ua: "Кого? Що?", ru: "Кого? Что?", en: "Whom? What?" },
    use: {
      sk: "Прямий об’єкт дії (бачу/маю/роблю).",
      ua: "Прямий додаток (бачу/маю/роблю).",
      ru: "Прямое дополнение (вижу/имею/делаю).",
      en: "Direct object of an action (see / have / do).",
    },
    rule: {
      sk: "Часто після: vidím, mám, robím, kupujem. Також рух „na“: idem na poštu.",
      ua: "Часто після: vidím, mám, robím, kupujem. Також рух „na“: idem na poštu.",
      ru: "Часто после: vidím, mám, robím, kupujem. Также движение „na“: idem na poštu.",
      en: "Often used after: vidím, mám, robím, kupujem. Also movement with “na”: idem na poštu.",
    },
    examples: [
      { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину.", en: "I see a car." },
      { sk: "Mám otázku.", ua: "У мене є питання.", ru: "У меня есть вопрос.", en: "I have a question." },
      { sk: "Idem na poštu.", ua: "Я йду на пошту.", ru: "Я иду на почту.", en: "I am going to the post office." },
    ],
  },
  {
    id: "loc",
    name: { sk: "Lokál", ua: "Місцевий", ru: "Предложный (местный)", en: "Locative" },
    questions: {
      sk: "O kom? O čom? Kde?",
      ua: "Про кого? Про що? Де?",
      ru: "О ком? О чём? Где?",
      en: "About whom? About what? Where?",
    },
    use: {
      sk: "Про щось говоримо + де знаходимось (у/на).",
      ua: "Говоримо про щось + де знаходимось (у/на).",
      ru: "Говорим о чём-то + где находимся (в/на).",
      en: "Talking about something + where we are located (in/on).",
    },
    rule: {
      sk: "Завжди з прийменником: v/vo, na, o, po (v meste, o práci).",
      ua: "Завжди з прийменником: v/vo, na, o, po (v meste, o práci).",
      ru: "Всегда с предлогом: v/vo, na, o, po (v meste, o práci).",
      en: "Always used with a preposition: v/vo, na, o, po (v meste, o práci).",
    },
    examples: [
      { sk: "Som v práci.", ua: "Я на роботі.", ru: "Я на работе.", en: "I am at work." },
      { sk: "Hovoríme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе.", en: "We are talking about school." },
      { sk: "Bývam v meste.", ua: "Я живу в місті.", ru: "Я живу в городе.", en: "I live in the city." },
    ],
  },
  {
    id: "ins",
    name: { sk: "Inštrumentál", ua: "Орудний", ru: "Творительный", en: "Instrumental" },
    questions: { sk: "S kým? S čím?", ua: "З ким? З чим?", ru: "С кем? С чем?", en: "With whom? With what?" },
    use: {
      sk: "З ким/чим (разом), „ким є“ (професія/роль інколи).",
      ua: "З ким/чим (разом), «ким є» (роль/професія інколи).",
      ru: "С кем/чем (вместе), «кем является» (роль/профессия иногда).",
      en: "With whom / with what (together), sometimes “what someone is” (profession/role).",
    },
    rule: {
      sk: "Часто з: s/so (s kamarátom), pred (pred domom).",
      ua: "Часто з: s/so (s kamarátom), pred (pred domom).",
      ru: "Часто с: s/so (s kamarátom), pred (pred domom).",
      en: "Often used with: s/so (s kamarátom), pred (pred domom).",
    },
    examples: [
      { sk: "Idem s kamarátom.", ua: "Я йду з другом.", ru: "Я иду с другом.", en: "I am going with a friend." },
      { sk: "Píšem perom.", ua: "Я пишу ручкою.", ru: "Я пишу ручкой.", en: "I write with a pen." },
      { sk: "Som sám/sama.", ua: "Я сам/сама.", ru: "Я один/одна.", en: "I am alone." },
    ],
  },
];

export const CASES_CS: CaseBlock[] = [
  {
    id: "nom",
    name: { sk: "Nominativ", ua: "Називний", ru: "Именительный", en: "Nominative" },
    questions: { sk: "Kdo? Co?", ua: "Хто? Що?", ru: "Кто? Что?", en: "Who? What?" },
    use: {
      sk: "Podmět (хто/що робить дію) + словникова форма.",
      ua: "Підмет (хто/що робить дію) + словникова форма.",
      ru: "Подлежащее (кто/что делает) + словарная форма.",
      en: "Subject (who/what performs the action) + dictionary form.",
    },
    rule: {
      sk: "Bez předložek. Часто з дієсловом být: On je lékař.",
      ua: "Без прийменників. Часто з дієсловом být: On je lékař.",
      ru: "Без предлогов. Часто с глаголом být: On je lékař.",
      en: "Without prepositions. Often used with the verb být: On je lékař.",
    },
    examples: [
      { sk: "Já jsem student.", ua: "Я студент.", ru: "Я студент.", en: "I am a student." },
      { sk: "To je auto.", ua: "Це авто.", ru: "Это машина.", en: "This is a car." },
      { sk: "Bratr pracuje.", ua: "Брат працює.", ru: "Брат работает.", en: "My brother works." },
    ],
  },
  {
    id: "gen",
    name: { sk: "Genitiv", ua: "Родовий", ru: "Родительный", en: "Genitive" },
    questions: { sk: "Koho? Čeho?", ua: "Кого? Чого?", ru: "Кого? Чего?", en: "Whom? Of what?" },
    use: {
      sk: "Vlastnictví, „без/немає“, část něčeho.",
      ua: "Належність, «немає/без», частина чогось.",
      ru: "Принадлежность, «нет/без», часть чего-то.",
      en: "Possession, “without / there is no”, part of something.",
    },
    rule: {
      sk: "Často s: bez, od, do, z/ze, u. (bez vody, do práce, z domu).",
      ua: "Часто з: bez, od, do, z/ze, u. (bez vody, do práce, z domu).",
      ru: "Часто с: bez, od, do, z/ze, u. (bez vody, do práce, z domu).",
      en: "Often used with: bez, od, do, z/ze, u. (bez vody, do práce, z domu).",
    },
    examples: [
      { sk: "Nemám čas.", ua: "Я не маю часу.", ru: "У меня нет времени.", en: "I do not have time." },
      { sk: "Jsem z Ukrajiny.", ua: "Я з України.", ru: "Я из Украины.", en: "I am from Ukraine." },
      { sk: "Jdu do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу.", en: "I am going to work." },
    ],
  },
  {
    id: "dat",
    name: { sk: "Dativ", ua: "Давальний", ru: "Дательный", en: "Dative" },
    questions: { sk: "Komu? Čemu?", ua: "Кому? Чому?", ru: "Кому? Чему?", en: "To whom? To what?" },
    use: {
      sk: "Komu/čemu dáváme, pomáháme, voláme.",
      ua: "Кому/чому даємо, допомагаємо, телефонуємо.",
      ru: "Кому/чему даём, помогаем, звоним.",
      en: "To whom / to what we give, help, or call.",
    },
    rule: {
      sk: "Často s: k/ke (k lékaři). Také: děkuji, pomáhám, volám.",
      ua: "Часто з: k/ke (k lékaři). Також: děkuji, pomáhám, volám.",
      ru: "Часто с: k/ke (k lékaři). Также: děkuji, pomáhám, volам.",
      en: "Often used with: k/ke (k lékaři). Also: děkuji, pomáhám, volám.",
    },
    examples: [
      { sk: "Pomáhám kamarádovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу.", en: "I help my friend." },
      { sk: "Volám mámě.", ua: "Я телефоную мамі.", ru: "Я звоню маме.", en: "I am calling my mother." },
      { sk: "Děkuji ti.", ua: "Дякую тобі.", ru: "Спасибо тебе.", en: "Thank you." },
    ],
  },
  {
    id: "acc",
    name: { sk: "Akuzativ", ua: "Знахідний", ru: "Винительный", en: "Accusative" },
    questions: { sk: "Koho? Co?", ua: "Кого? Що?", ru: "Кого? Что?", en: "Whom? What?" },
    use: {
      sk: "Přímý objekt děje (vidím/mám/dělám).",
      ua: "Прямий додаток (бачу/маю/роблю).",
      ru: "Прямое дополнение (вижу/имею/делаю).",
      en: "Direct object of an action (see / have / do).",
    },
    rule: {
      sk: "Často po: vidím, mám, dělám, kupuji. Také pohyb „na“: jdu na poštu.",
      ua: "Часто після: vidím, mám, dělám, kupuji. Також рух „na“: jdu na poštu.",
      ru: "Часто после: vidím, mám, dělám, kupuji. Также движение „na“: jdu na poštu.",
      en: "Often used after: vidím, mám, dělám, kupuji. Also movement with “na”: jdu na poštu.",
    },
    examples: [
      { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину.", en: "I see a car." },
      { sk: "Mám otázku.", ua: "У мене є питання.", ru: "У меня есть вопрос.", en: "I have a question." },
      { sk: "Jdu na poštu.", ua: "Я йду на пошту.", ru: "Я иду на почту.", en: "I am going to the post office." },
    ],
  },
  {
    id: "voc",
    name: { sk: "Vokativ", ua: "Кличний", ru: "Звательный", en: "Vocative" },
    questions: { sk: "Oslovení!", ua: "Звертання!", ru: "Обращение!", en: "Addressing someone!" },
    use: {
      sk: "Používá se při oslovování lidí přímo jménem nebo rolí.",
      ua: "Використовується, коли ми прямо до когось звертаємося на ім’я або за роллю.",
      ru: "Используется, когда мы прямо обращаемся к человеку по имени или роли.",
      en: "Used when directly addressing a person by name or role.",
    },
    rule: {
      sk: "Často u jmen a oslovení: Petře!, pane!, maminko!",
      ua: "Часто в іменах і звертаннях: Petře!, pane!, maminko!",
      ru: "Часто в именах и обращениях: Petře!, pane!, maminko!",
      en: "Often used in names and forms of address: Petře!, pane!, maminko!",
    },
    examples: [
      { sk: "Petře, pojď sem!", ua: "Петре, іди сюди!", ru: "Петр, иди сюда!", en: "Petr, come here!" },
      { sk: "Pane doktore, děkuji.", ua: "Пане лікарю, дякую.", ru: "Господин доктор, спасибо.", en: "Doctor, thank you." },
      { sk: "Ahoj, Jano!", ua: "Привіт, Яно!", ru: "Привет, Яна!", en: "Hi, Jana!" },
    ],
  },
  {
    id: "loc",
    name: { sk: "Lokál", ua: "Місцевий", ru: "Предложный (местный)", en: "Locative" },
    questions: {
      sk: "O kom? O čem? Kde?",
      ua: "Про кого? Про що? Де?",
      ru: "О ком? О чём? Где?",
      en: "About whom? About what? Where?",
    },
    use: {
      sk: "Mluvíme o něčem + kde se nacházíme (v/na).",
      ua: "Говоримо про щось + де знаходимось (у/на).",
      ru: "Говорим о чём-то + где находимся (в/на).",
      en: "Talking about something + where we are located (in/on).",
    },
    rule: {
      sk: "Vždy s předložkou: v/ve, na, o, po (ve městě, o práci).",
      ua: "Завжди з прийменником: v/ve, na, o, po (ve městě, o práci).",
      ru: "Всегда с предлогом: v/ve, na, o, po (ve městě, o práci).",
      en: "Always used with a preposition: v/ve, na, o, po (ve městě, o práci).",
    },
    examples: [
      { sk: "Jsem v práci.", ua: "Я на роботі.", ru: "Я на работе.", en: "I am at work." },
      { sk: "Mluvíme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе.", en: "We are talking about school." },
      { sk: "Bydlím ve městě.", ua: "Я живу в місті.", ru: "Я живу в городе.", en: "I live in the city." },
    ],
  },
  {
    id: "ins",
    name: { sk: "Instrumentál", ua: "Орудний", ru: "Творительный", en: "Instrumental" },
    questions: { sk: "S kým? S čím?", ua: "З ким? З чим?", ru: "С кем? С чем?", en: "With whom? With what?" },
    use: {
      sk: "S kým/čím (společně), někdy také role/profese.",
      ua: "З ким/чим (разом), інколи також роль/професія.",
      ru: "С кем/чем (вместе), иногда также роль/профессия.",
      en: "With whom / with what (together), sometimes also role/profession.",
    },
    rule: {
      sk: "Často s: s/se (s kamarádem), před (před domem).",
      ua: "Часто з: s/se (s kamarádem), před (před domem).",
      ru: "Часто с: s/se (s kamarádem), před (před domом).",
      en: "Often used with: s/se (s kamarádem), před (před domem).",
    },
    examples: [
      { sk: "Jdu s kamarádem.", ua: "Я йду з другом.", ru: "Я иду с другом.", en: "I am going with a friend." },
      { sk: "Píšu perem.", ua: "Я пишу ручкою.", ru: "Я пишу ручкой.", en: "I write with a pen." },
      { sk: "Jsem sám/sama.", ua: "Я сам/сама.", ru: "Я один/одна.", en: "I am alone." },
    ],
  },
];

export const BUILD_SAMPLES_SK: W[] = [
  { sk: "Som v práci.", ua: "Я на роботі.", ru: "Я на работе.", en: "I am at work." },
  { sk: "Idem do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу.", en: "I am going to work." },
  { sk: "Idem s kamarátom.", ua: "Я йду з другом.", ru: "Я иду с другом.", en: "I am going with a friend." },
  { sk: "Hovoríme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе.", en: "We are talking about school." },
  { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину.", en: "I see a car." },
  { sk: "Pomáham kamarátovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу.", en: "I help my friend." },
];

export const BUILD_SAMPLES_CS: W[] = [
  { sk: "Jsem v práci.", ua: "Я на роботі.", ru: "Я на работе.", en: "I am at work." },
  { sk: "Jdu do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу.", en: "I am going to work." },
  { sk: "Jdu s kamarádem.", ua: "Я йду з другом.", ru: "Я иду с другом.", en: "I am going with a friend." },
  { sk: "Mluvíme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе.", en: "We are talking about school." },
  { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину.", en: "I see a car." },
  { sk: "Pomáhám kamarádovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу.", en: "I help my friend." },
];
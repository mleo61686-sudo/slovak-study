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
      ru: "Часто с: k/ke (k lékaři). Также: děkuji, pomáhám, volám.",
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
      ru: "Часто с: s/se (s kamarádem), před (před domem).",
      en: "Often used with: s/se (s kamarádem), před (před domem).",
    },
    examples: [
      { sk: "Jdu s kamarádem.", ua: "Я йду з другом.", ru: "Я иду с другом.", en: "I am going with a friend." },
      { sk: "Píšu perem.", ua: "Я пишу ручкою.", ru: "Я пишу ручкой.", en: "I write with a pen." },
      { sk: "Jsem sám/sama.", ua: "Я сам/сама.", ru: "Я один/одна.", en: "I am alone." },
    ],
  },
];

export const CASES_PL: CaseBlock[] = [
  {
    id: "nom",
    name: { sk: "Mianownik", ua: "Називний", ru: "Именительный", en: "Nominative" },
    questions: { sk: "Kto? Co?", ua: "Хто? Що?", ru: "Кто? Что?", en: "Who? What?" },
    use: {
      sk: "Podmiot (хто/що виконує дію) + forma słownikowa.",
      ua: "Підмет (хто/що виконує дію) + словникова форма.",
      ru: "Подлежащее (кто/что выполняет действие) + словарная форма.",
      en: "Subject (who/what performs the action) + dictionary form.",
    },
    rule: {
      sk: "Bez przyimków. Często używany jako podmiot zdania: To jest dom.",
      ua: "Без прийменників. Часто вживається як підмет у реченні: To jest dom.",
      ru: "Без предлогов. Часто употребляется как подлежащее в предложении: To jest dom.",
      en: "Without prepositions. Often used as the subject of a sentence: To jest dom.",
    },
    examples: [
      { sk: "Ja jestem studentem.", ua: "Я студент.", ru: "Я студент.", en: "I am a student." },
      { sk: "To jest samochód.", ua: "Це автомобіль.", ru: "Это машина.", en: "This is a car." },
      { sk: "Brat pracuje.", ua: "Брат працює.", ru: "Брат работает.", en: "My brother works." },
    ],
  },
  {
    id: "gen",
    name: { sk: "Dopełniacz", ua: "Родовий", ru: "Родительный", en: "Genitive" },
    questions: { sk: "Kogo? Czego?", ua: "Кого? Чого?", ru: "Кого? Чего?", en: "Whom? Of what?" },
    use: {
      sk: "Przynależność, „bez / nie ma”, część czegoś.",
      ua: "Належність, «немає / без», частина чогось.",
      ru: "Принадлежность, «нет / без», часть чего-то.",
      en: "Possession, “without / there is no”, part of something.",
    },
    rule: {
      sk: "Często z: bez, od, do, z/ze, u. (bez wody, do pracy, z domu).",
      ua: "Часто з: bez, od, do, z/ze, u. (bez wody, do pracy, z domu).",
      ru: "Часто с: bez, od, do, z/ze, u. (bez wody, do pracy, z domu).",
      en: "Often used with: bez, od, do, z/ze, u. (bez wody, do pracy, z domu).",
    },
    examples: [
      { sk: "Nie mam czasu.", ua: "Я не маю часу.", ru: "У меня нет времени.", en: "I do not have time." },
      { sk: "Jestem z Ukrainy.", ua: "Я з України.", ru: "Я из Украины.", en: "I am from Ukraine." },
      { sk: "Idę do pracy.", ua: "Я йду на роботу.", ru: "Я иду на работу.", en: "I am going to work." },
    ],
  },
  {
    id: "dat",
    name: { sk: "Celownik", ua: "Давальний", ru: "Дательный", en: "Dative" },
    questions: { sk: "Komu? Czemu?", ua: "Кому? Чому?", ru: "Кому? Чему?", en: "To whom? To what?" },
    use: {
      sk: "Komu/czemu dajemy, pomagamy, dziękujemy, telefonujemy.",
      ua: "Кому/чому даємо, допомагаємо, дякуємо, телефонуємо.",
      ru: "Кому/чему даём, помогаем, благодарим, звоним.",
      en: "To whom / to what we give, help, thank, or call.",
    },
    rule: {
      sk: "Często z: dzięki, ku. Także po czasownikach: pomagać, dziękować, telefonować.",
      ua: "Часто з: dzięki, ku. Також після дієслів: pomagać, dziękować, telefonować.",
      ru: "Часто с: dzięki, ku. Также после глаголов: pomagać, dziękować, telefonować.",
      en: "Often used with: dzięki, ku. Also after verbs like pomagać, dziękować, telefonować.",
    },
    examples: [
      { sk: "Pomagam koledze.", ua: "Я допомагаю другові.", ru: "Я помогаю другу.", en: "I help my friend." },
      { sk: "Dziękuję mamie.", ua: "Я дякую мамі.", ru: "Я благодарю маму.", en: "I thank my mother." },
      { sk: "Telefonuję bratu.", ua: "Я телефоную братові.", ru: "Я звоню брату.", en: "I am calling my brother." },
    ],
  },
  {
    id: "acc",
    name: { sk: "Biernik", ua: "Знахідний", ru: "Винительный", en: "Accusative" },
    questions: { sk: "Kogo? Co?", ua: "Кого? Що?", ru: "Кого? Что?", en: "Whom? What?" },
    use: {
      sk: "Dopełnienie bliższe, bezpośredni obiekt czynności.",
      ua: "Прямий додаток, безпосередній об’єкт дії.",
      ru: "Прямое дополнение, непосредственный объект действия.",
      en: "Direct object of an action.",
    },
    rule: {
      sk: "Często po: widzę, mam, kupuję, robię. Także ruch z „na”: idę na pocztę.",
      ua: "Часто після: widzę, mam, kupuję, robię. Також рух з „na”: idę na pocztę.",
      ru: "Часто после: widzę, mam, kupuję, robię. Также движение с „na”: idę na pocztę.",
      en: "Often used after: widzę, mam, kupuję, robię. Also movement with “na”: idę na pocztę.",
    },
    examples: [
      { sk: "Widzę samochód.", ua: "Я бачу автомобіль.", ru: "Я вижу машину.", en: "I see a car." },
      { sk: "Mam pytanie.", ua: "У мене є питання.", ru: "У меня есть вопрос.", en: "I have a question." },
      { sk: "Idę na pocztę.", ua: "Я йду на пошту.", ru: "Я иду на почту.", en: "I am going to the post office." },
    ],
  },
  {
    id: "voc",
    name: { sk: "Wołacz", ua: "Кличний", ru: "Звательный", en: "Vocative" },
    questions: { sk: "O! / Zwrot do kogoś!", ua: "Звертання!", ru: "Обращение!", en: "Addressing someone!" },
    use: {
      sk: "Używany przy bezpośrednim zwracaniu się do osoby po imieniu lub roli.",
      ua: "Використовується при прямому звертанні до людини на ім’я або за роллю.",
      ru: "Используется при прямом обращении к человеку по имени или роли.",
      en: "Used when directly addressing a person by name or role.",
    },
    rule: {
      sk: "Często w zwrotach i imionach: Anno!, Piotrze!, mamo!, panie!",
      ua: "Часто у звертаннях та іменах: Anno!, Piotrze!, mamo!, panie!",
      ru: "Часто в обращениях и именах: Anno!, Piotrze!, mamo!, panie!",
      en: "Often used in names and forms of address: Anno!, Piotrze!, mamo!, panie!",
    },
    examples: [
      { sk: "Piotrze, chodź tutaj!", ua: "Петре, йди сюди!", ru: "Пётр, иди сюда!", en: "Piotr, come here!" },
      { sk: "Panie doktorze, dziękuję.", ua: "Пане лікарю, дякую.", ru: "Господин доктор, спасибо.", en: "Doctor, thank you." },
      { sk: "Cześć, Anno!", ua: "Привіт, Анно!", ru: "Привет, Анна!", en: "Hi, Anna!" },
    ],
  },
  {
    id: "loc",
    name: { sk: "Miejscownik", ua: "Місцевий", ru: "Предложный (местный)", en: "Locative" },
    questions: {
      sk: "O kim? O czym? Gdzie?",
      ua: "Про кого? Про що? Де?",
      ru: "О ком? О чём? Где?",
      en: "About whom? About what? Where?",
    },
    use: {
      sk: "Mówimy o czymś + gdzie się znajdujemy (w/na).",
      ua: "Говоримо про щось + де знаходимося (в/на).",
      ru: "Говорим о чём-то + где находимся (в/на).",
      en: "Talking about something + where we are located (in/on).",
    },
    rule: {
      sk: "Zawsze z przyimkiem: w/we, na, o, po (w mieście, o pracy).",
      ua: "Завжди з прийменником: w/we, na, o, po (w mieście, o pracy).",
      ru: "Всегда с предлогом: w/we, na, o, po (w mieście, o pracy).",
      en: "Always used with a preposition: w/we, na, o, po (w mieście, o pracy).",
    },
    examples: [
      { sk: "Jestem w pracy.", ua: "Я на роботі.", ru: "Я на работе.", en: "I am at work." },
      { sk: "Mówimy o szkole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе.", en: "We are talking about school." },
      { sk: "Mieszkam w mieście.", ua: "Я живу в місті.", ru: "Я живу в городе.", en: "I live in the city." },
    ],
  },
  {
    id: "ins",
    name: { sk: "Narzędnik", ua: "Орудний", ru: "Творительный", en: "Instrumental" },
    questions: { sk: "Z kim? Z czym?", ua: "З ким? З чим?", ru: "С кем? С чем?", en: "With whom? With what?" },
    use: {
      sk: "Z kim/czym (razem), narzędzie czynności, czasem także rola/profesja.",
      ua: "З ким/чим (разом), знаряддя дії, інколи також роль/професія.",
      ru: "С кем/чем (вместе), инструмент действия, иногда также роль/профессия.",
      en: "With whom / with what, tool of an action, sometimes also role/profession.",
    },
    rule: {
      sk: "Często z: z/ze (z kolegą), przed (przed domem).",
      ua: "Часто з: z/ze (z kolegą), przed (przed domem).",
      ru: "Часто с: z/ze (z kolegą), przed (przed domem).",
      en: "Often used with: z/ze (z kolegą), przed (przed domem).",
    },
    examples: [
      { sk: "Idę z kolegą.", ua: "Я йду з другом.", ru: "Я иду с другом.", en: "I am going with a friend." },
      { sk: "Piszę długopisem.", ua: "Я пишу ручкою.", ru: "Я пишу ручкой.", en: "I write with a pen." },
      { sk: "Jestem sam/sama.", ua: "Я сам/сама.", ru: "Я один/одна.", en: "I am alone." },
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

export const BUILD_SAMPLES_PL: W[] = [
  { sk: "Jestem w pracy.", ua: "Я на роботі.", ru: "Я на работе.", en: "I am at work." },
  { sk: "Idę do pracy.", ua: "Я йду на роботу.", ru: "Я иду на работу.", en: "I am going to work." },
  { sk: "Idę z kolegą.", ua: "Я йду з другом.", ru: "Я иду с другом.", en: "I am going with a friend." },
  { sk: "Mówimy o szkole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе.", en: "We are talking about school." },
  { sk: "Widzę samochód.", ua: "Я бачу автомобіль.", ru: "Я вижу машину.", en: "I see a car." },
  { sk: "Pomagam koledze.", ua: "Я допомагаю другові.", ru: "Я помогаю другу.", en: "I help my friend." },
];
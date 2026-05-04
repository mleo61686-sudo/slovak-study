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
    name: {
      sk: "Nominatív",
      ua: "Називний",
      ru: "Именительный",
      en: "Nominative",
    },
    questions: {
      sk: "Kto? Čo?",
      ua: "Хто? Що?",
      ru: "Кто? Что?",
      en: "Who? What?",
    },
    use: {
      sk: "Podmet vety a základná slovníková forma.",
      ua: "Підмет у реченні та базова словникова форма слова.",
      ru: "Подлежащее в предложении и базовая словарная форма слова.",
      en: "The subject of a sentence and the basic dictionary form.",
    },
    rule: {
      sk: "Používa sa bez predložiek. Často stojí pri slovese byť: On je lekár.",
      ua: "Вживається без прийменників. Часто стоїть із дієсловом byť: On je lekár.",
      ru: "Употребляется без предлогов. Часто стоит с глаголом byť: On je lekár.",
      en: "Used without prepositions. Often appears with the verb byť: On je lekár.",
    },
    examples: [
      {
        sk: "Ja som študent.",
        ua: "Я студент.",
        ru: "Я студент.",
        en: "I am a student.",
      },
      {
        sk: "Toto je auto.",
        ua: "Це авто.",
        ru: "Это машина.",
        en: "This is a car.",
      },
      {
        sk: "Brat pracuje.",
        ua: "Брат працює.",
        ru: "Брат работает.",
        en: "My brother works.",
      },
    ],
  },
  {
    id: "gen",
    name: {
      sk: "Genitív",
      ua: "Родовий",
      ru: "Родительный",
      en: "Genitive",
    },
    questions: {
      sk: "Koho? Čoho?",
      ua: "Кого? Чого?",
      ru: "Кого? Чего?",
      en: "Whom? Of what?",
    },
    use: {
      sk: "Vyjadruje pôvod, vlastníctvo, chýbanie alebo časť niečoho.",
      ua: "Показує походження, належність, відсутність або частину чогось.",
      ru: "Показывает происхождение, принадлежность, отсутствие или часть чего-то.",
      en: "Shows origin, possession, absence, or part of something.",
    },
    rule: {
      sk: "Často po predložkách: bez, od, do, z/zo, u. Napríklad: bez vody, do práce, z domu.",
      ua: "Часто після прийменників: bez, od, do, z/zo, u. Наприклад: bez vody, do práce, z domu.",
      ru: "Часто после предлогов: bez, od, do, z/zo, u. Например: bez vody, do práce, z domu.",
      en: "Often used after: bez, od, do, z/zo, u. For example: bez vody, do práce, z domu.",
    },
    examples: [
      {
        sk: "Nemám čas.",
        ua: "Я не маю часу.",
        ru: "У меня нет времени.",
        en: "I do not have time.",
      },
      {
        sk: "Som z Ukrajiny.",
        ua: "Я з України.",
        ru: "Я из Украины.",
        en: "I am from Ukraine.",
      },
      {
        sk: "Idem do práce.",
        ua: "Я йду на роботу.",
        ru: "Я иду на работу.",
        en: "I am going to work.",
      },
    ],
  },
  {
    id: "dat",
    name: {
      sk: "Datív",
      ua: "Давальний",
      ru: "Дательный",
      en: "Dative",
    },
    questions: {
      sk: "Komu? Čomu?",
      ua: "Кому? Чому?",
      ru: "Кому? Чему?",
      en: "To whom? To what?",
    },
    use: {
      sk: "Používa sa pri osobe alebo veci, ktorej niečo dávame, pomáhame alebo voláme.",
      ua: "Вживається для того, кому або чому щось даємо, допомагаємо чи телефонуємо.",
      ru: "Употребляется для того, кому или чему что-то даём, помогаем или звоним.",
      en: "Used for the person or thing we give something to, help, or call.",
    },
    rule: {
      sk: "Často s predložkami k/ku. Používa sa aj po slovesách: ďakujem, pomáham, volám.",
      ua: "Часто з прийменниками k/ku. Також після дієслів: ďakujem, pomáham, volám.",
      ru: "Часто с предлогами k/ku. Также после глаголов: ďakujem, pomáham, volám.",
      en: "Often used with k/ku. Also after verbs such as ďakujem, pomáham, volám.",
    },
    examples: [
      {
        sk: "Pomáham kamarátovi.",
        ua: "Я допомагаю другові.",
        ru: "Я помогаю другу.",
        en: "I help my friend.",
      },
      {
        sk: "Volám mame.",
        ua: "Я телефоную мамі.",
        ru: "Я звоню маме.",
        en: "I am calling my mother.",
      },
      {
        sk: "Ďakujem ti.",
        ua: "Дякую тобі.",
        ru: "Спасибо тебе.",
        en: "Thank you.",
      },
    ],
  },
  {
    id: "acc",
    name: {
      sk: "Akuzatív",
      ua: "Знахідний",
      ru: "Винительный",
      en: "Accusative",
    },
    questions: {
      sk: "Koho? Čo?",
      ua: "Кого? Що?",
      ru: "Кого? Что?",
      en: "Whom? What?",
    },
    use: {
      sk: "Priamy predmet deja: koho alebo čo vidíme, máme, kupujeme, robíme.",
      ua: "Прямий додаток: кого або що бачимо, маємо, купуємо, робимо.",
      ru: "Прямое дополнение: кого или что видим, имеем, покупаем, делаем.",
      en: "The direct object: whom or what we see, have, buy, or do.",
    },
    rule: {
      sk: "Často po slovesách: vidím, mám, robím, kupujem. Používa sa aj pri smere pohybu: idem na poštu.",
      ua: "Часто після дієслів: vidím, mám, robím, kupujem. Також при напрямку руху: idem na poštu.",
      ru: "Часто после глаголов: vidím, mám, robím, kupujem. Также при направлении движения: idem na poštu.",
      en: "Often used after verbs such as vidím, mám, robím, kupujem. Also with direction of movement: idem na poštu.",
    },
    examples: [
      {
        sk: "Vidím auto.",
        ua: "Я бачу авто.",
        ru: "Я вижу машину.",
        en: "I see a car.",
      },
      {
        sk: "Mám otázku.",
        ua: "У мене є питання.",
        ru: "У меня есть вопрос.",
        en: "I have a question.",
      },
      {
        sk: "Idem na poštu.",
        ua: "Я йду на пошту.",
        ru: "Я иду на почту.",
        en: "I am going to the post office.",
      },
    ],
  },
  {
    id: "loc",
    name: {
      sk: "Lokál",
      ua: "Місцевий",
      ru: "Предложный / местный",
      en: "Locative",
    },
    questions: {
      sk: "O kom? O čom? Kde?",
      ua: "Про кого? Про що? Де?",
      ru: "О ком? О чём? Где?",
      en: "About whom? About what? Where?",
    },
    use: {
      sk: "Používa sa pri polohe, mieste alebo pri hovorení o niečom.",
      ua: "Вживається для місця, перебування або коли говоримо про когось чи щось.",
      ru: "Употребляется для места, нахождения или когда говорим о ком-то или о чём-то.",
      en: "Used for location, being somewhere, or talking about someone or something.",
    },
    rule: {
      sk: "Lokál je vždy s predložkou: v/vo, na, o, po. Napríklad: v meste, na stole, o práci.",
      ua: "Lokál завжди з прийменником: v/vo, na, o, po. Наприклад: v meste, na stole, o práci.",
      ru: "Lokál всегда с предлогом: v/vo, na, o, po. Например: v meste, na stole, o práci.",
      en: "Lokál is always used with a preposition: v/vo, na, o, po. For example: v meste, na stole, o práci.",
    },
    examples: [
      {
        sk: "Som v práci.",
        ua: "Я на роботі.",
        ru: "Я на работе.",
        en: "I am at work.",
      },
      {
        sk: "Hovoríme o škole.",
        ua: "Ми говоримо про школу.",
        ru: "Мы говорим о школе.",
        en: "We are talking about school.",
      },
      {
        sk: "Bývam v meste.",
        ua: "Я живу в місті.",
        ru: "Я живу в городе.",
        en: "I live in the city.",
      },
    ],
  },
  {
    id: "ins",
    name: {
      sk: "Inštrumentál",
      ua: "Орудний",
      ru: "Творительный",
      en: "Instrumental",
    },
    questions: {
      sk: "S kým? S čím?",
      ua: "З ким? З чим?",
      ru: "С кем? С чем?",
      en: "With whom? With what?",
    },
    use: {
      sk: "Vyjadruje spoločnosť, nástroj alebo prostriedok deja.",
      ua: "Показує, з ким/чим виконується дія, або за допомогою чого.",
      ru: "Показывает, с кем/чем выполняется действие или с помощью чего.",
      en: "Shows company, instrument, or means of an action.",
    },
    rule: {
      sk: "Často s predložkami s/so, pred, za, nad, pod. Napríklad: s kamarátom, pred domom.",
      ua: "Часто з прийменниками s/so, pred, za, nad, pod. Наприклад: s kamarátom, pred domom.",
      ru: "Часто с предлогами s/so, pred, za, nad, pod. Например: s kamarátom, pred domom.",
      en: "Often used with s/so, pred, za, nad, pod. For example: s kamarátom, pred domom.",
    },
    examples: [
      {
        sk: "Idem s kamarátom.",
        ua: "Я йду з другом.",
        ru: "Я иду с другом.",
        en: "I am going with a friend.",
      },
      {
        sk: "Píšem perom.",
        ua: "Я пишу ручкою.",
        ru: "Я пишу ручкой.",
        en: "I write with a pen.",
      },
      {
        sk: "Stojím pred domom.",
        ua: "Я стою перед будинком.",
        ru: "Я стою перед домом.",
        en: "I am standing in front of the house.",
      },
    ],
  },
];

export const CASES_CS: CaseBlock[] = [
  {
    id: "nom",
    name: {
      sk: "Nominativ",
      ua: "Називний",
      ru: "Именительный",
      en: "Nominative",
    },
    questions: {
      sk: "Kdo? Co?",
      ua: "Хто? Що?",
      ru: "Кто? Что?",
      en: "Who? What?",
    },
    use: {
      sk: "Podmět věty a základní slovníková forma.",
      ua: "Підмет у реченні та базова словникова форма слова.",
      ru: "Подлежащее в предложении и базовая словарная форма слова.",
      en: "The subject of a sentence and the basic dictionary form.",
    },
    rule: {
      sk: "Používá se bez předložek. Často stojí u slovesa být: On je lékař.",
      ua: "Вживається без прийменників. Часто стоїть із дієсловом být: On je lékař.",
      ru: "Употребляется без предлогов. Часто стоит с глаголом být: On je lékař.",
      en: "Used without prepositions. Often appears with the verb být: On je lékař.",
    },
    examples: [
      {
        sk: "Já jsem student.",
        ua: "Я студент.",
        ru: "Я студент.",
        en: "I am a student.",
      },
      {
        sk: "To je auto.",
        ua: "Це авто.",
        ru: "Это машина.",
        en: "This is a car.",
      },
      {
        sk: "Bratr pracuje.",
        ua: "Брат працює.",
        ru: "Брат работает.",
        en: "My brother works.",
      },
    ],
  },
  {
    id: "gen",
    name: {
      sk: "Genitiv",
      ua: "Родовий",
      ru: "Родительный",
      en: "Genitive",
    },
    questions: {
      sk: "Koho? Čeho?",
      ua: "Кого? Чого?",
      ru: "Кого? Чего?",
      en: "Whom? Of what?",
    },
    use: {
      sk: "Vyjadřuje původ, vlastnictví, chybění nebo část něčeho.",
      ua: "Показує походження, належність, відсутність або частину чогось.",
      ru: "Показывает происхождение, принадлежность, отсутствие или часть чего-то.",
      en: "Shows origin, possession, absence, or part of something.",
    },
    rule: {
      sk: "Často po předložkách: bez, od, do, z/ze, u. Například: bez vody, do práce, z domu.",
      ua: "Часто після прийменників: bez, od, do, z/ze, u. Наприклад: bez vody, do práce, z domu.",
      ru: "Часто после предлогов: bez, od, do, z/ze, u. Например: bez vody, do práce, z domu.",
      en: "Often used after: bez, od, do, z/ze, u. For example: bez vody, do práce, z domu.",
    },
    examples: [
      {
        sk: "Nemám čas.",
        ua: "Я не маю часу.",
        ru: "У меня нет времени.",
        en: "I do not have time.",
      },
      {
        sk: "Jsem z Ukrajiny.",
        ua: "Я з України.",
        ru: "Я из Украины.",
        en: "I am from Ukraine.",
      },
      {
        sk: "Jdu do práce.",
        ua: "Я йду на роботу.",
        ru: "Я иду на работу.",
        en: "I am going to work.",
      },
    ],
  },
  {
    id: "dat",
    name: {
      sk: "Dativ",
      ua: "Давальний",
      ru: "Дательный",
      en: "Dative",
    },
    questions: {
      sk: "Komu? Čemu?",
      ua: "Кому? Чому?",
      ru: "Кому? Чему?",
      en: "To whom? To what?",
    },
    use: {
      sk: "Používá se u osoby nebo věci, které něco dáváme, pomáháme nebo voláme.",
      ua: "Вживається для того, кому або чому щось даємо, допомагаємо чи телефонуємо.",
      ru: "Употребляется для того, кому или чему что-то даём, помогаем или звоним.",
      en: "Used for the person or thing we give something to, help, or call.",
    },
    rule: {
      sk: "Často s předložkami k/ke. Používá se také po slovesech: děkuji, pomáhám, volám.",
      ua: "Часто з прийменниками k/ke. Також після дієслів: děkuji, pomáhám, volám.",
      ru: "Часто с предлогами k/ke. Также после глаголов: děkuji, pomáhám, volám.",
      en: "Often used with k/ke. Also after verbs such as děkuji, pomáhám, volám.",
    },
    examples: [
      {
        sk: "Pomáhám kamarádovi.",
        ua: "Я допомагаю другові.",
        ru: "Я помогаю другу.",
        en: "I help my friend.",
      },
      {
        sk: "Volám mámě.",
        ua: "Я телефоную мамі.",
        ru: "Я звоню маме.",
        en: "I am calling my mother.",
      },
      {
        sk: "Děkuji ti.",
        ua: "Дякую тобі.",
        ru: "Спасибо тебе.",
        en: "Thank you.",
      },
    ],
  },
  {
    id: "acc",
    name: {
      sk: "Akuzativ",
      ua: "Знахідний",
      ru: "Винительный",
      en: "Accusative",
    },
    questions: {
      sk: "Koho? Co?",
      ua: "Кого? Що?",
      ru: "Кого? Что?",
      en: "Whom? What?",
    },
    use: {
      sk: "Přímý předmět děje: koho nebo co vidíme, máme, kupujeme, děláme.",
      ua: "Прямий додаток: кого або що бачимо, маємо, купуємо, робимо.",
      ru: "Прямое дополнение: кого или что видим, имеем, покупаем, делаем.",
      en: "The direct object: whom or what we see, have, buy, or do.",
    },
    rule: {
      sk: "Často po slovesech: vidím, mám, dělám, kupuji. Používá se i při směru pohybu: jdu na poštu.",
      ua: "Часто після дієслів: vidím, mám, dělám, kupuji. Також при напрямку руху: jdu na poštu.",
      ru: "Часто после глаголов: vidím, mám, dělám, kupuji. Также при направлении движения: jdu na poštu.",
      en: "Often used after verbs such as vidím, mám, dělám, kupuji. Also with direction of movement: jdu na poštu.",
    },
    examples: [
      {
        sk: "Vidím auto.",
        ua: "Я бачу авто.",
        ru: "Я вижу машину.",
        en: "I see a car.",
      },
      {
        sk: "Mám otázku.",
        ua: "У мене є питання.",
        ru: "У меня есть вопрос.",
        en: "I have a question.",
      },
      {
        sk: "Jdu na poštu.",
        ua: "Я йду на пошту.",
        ru: "Я иду на почту.",
        en: "I am going to the post office.",
      },
    ],
  },
  {
    id: "voc",
    name: {
      sk: "Vokativ",
      ua: "Кличний",
      ru: "Звательный",
      en: "Vocative",
    },
    questions: {
      sk: "Oslovení!",
      ua: "Звертання!",
      ru: "Обращение!",
      en: "Addressing someone!",
    },
    use: {
      sk: "Používá se při přímém oslovení člověka jménem, titulem nebo rolí.",
      ua: "Вживається при прямому звертанні до людини на ім’я, за титулом або роллю.",
      ru: "Употребляется при прямом обращении к человеку по имени, титулу или роли.",
      en: "Used when directly addressing a person by name, title, or role.",
    },
    rule: {
      sk: "Typický u jmen a oslovení: Petře!, pane!, maminko!, Jano!",
      ua: "Типовий в іменах і звертаннях: Petře!, pane!, maminko!, Jano!",
      ru: "Типичен в именах и обращениях: Petře!, pane!, maminko!, Jano!",
      en: "Typical in names and forms of address: Petře!, pane!, maminko!, Jano!",
    },
    examples: [
      {
        sk: "Petře, pojď sem!",
        ua: "Петре, іди сюди!",
        ru: "Петр, иди сюда!",
        en: "Petr, come here!",
      },
      {
        sk: "Pane doktore, děkuji.",
        ua: "Пане лікарю, дякую.",
        ru: "Господин доктор, спасибо.",
        en: "Doctor, thank you.",
      },
      {
        sk: "Ahoj, Jano!",
        ua: "Привіт, Яно!",
        ru: "Привет, Яна!",
        en: "Hi, Jana!",
      },
    ],
  },
  {
    id: "loc",
    name: {
      sk: "Lokál",
      ua: "Місцевий",
      ru: "Предложный / местный",
      en: "Locative",
    },
    questions: {
      sk: "O kom? O čem? Kde?",
      ua: "Про кого? Про що? Де?",
      ru: "О ком? О чём? Где?",
      en: "About whom? About what? Where?",
    },
    use: {
      sk: "Používá se při poloze, místě nebo mluvení o něčem.",
      ua: "Вживається для місця, перебування або коли говоримо про когось чи щось.",
      ru: "Употребляется для места, нахождения или когда говорим о ком-то или о чём-то.",
      en: "Used for location, being somewhere, or talking about someone or something.",
    },
    rule: {
      sk: "Lokál je vždy s předložkou: v/ve, na, o, po. Například: ve městě, na stole, o práci.",
      ua: "Lokál завжди з прийменником: v/ve, na, o, po. Наприклад: ve městě, na stole, o práci.",
      ru: "Lokál всегда с предлогом: v/ve, na, o, po. Например: ve městě, na stole, o práci.",
      en: "Lokál is always used with a preposition: v/ve, na, o, po. For example: ve městě, na stole, o práci.",
    },
    examples: [
      {
        sk: "Jsem v práci.",
        ua: "Я на роботі.",
        ru: "Я на работе.",
        en: "I am at work.",
      },
      {
        sk: "Mluvíme o škole.",
        ua: "Ми говоримо про школу.",
        ru: "Мы говорим о школе.",
        en: "We are talking about school.",
      },
      {
        sk: "Bydlím ve městě.",
        ua: "Я живу в місті.",
        ru: "Я живу в городе.",
        en: "I live in the city.",
      },
    ],
  },
  {
    id: "ins",
    name: {
      sk: "Instrumentál",
      ua: "Орудний",
      ru: "Творительный",
      en: "Instrumental",
    },
    questions: {
      sk: "S kým? S čím?",
      ua: "З ким? З чим?",
      ru: "С кем? С чем?",
      en: "With whom? With what?",
    },
    use: {
      sk: "Vyjadřuje společnost, nástroj nebo prostředek děje.",
      ua: "Показує, з ким/чим виконується дія, або за допомогою чого.",
      ru: "Показывает, с кем/чем выполняется действие или с помощью чего.",
      en: "Shows company, instrument, or means of an action.",
    },
    rule: {
      sk: "Často s předložkami s/se, před, za, nad, pod. Například: s kamarádem, před domem.",
      ua: "Часто з прийменниками s/se, před, za, nad, pod. Наприклад: s kamarádem, před domem.",
      ru: "Часто с предлогами s/se, před, za, nad, pod. Например: s kamarádem, před domem.",
      en: "Often used with s/se, před, za, nad, pod. For example: s kamarádem, před domem.",
    },
    examples: [
      {
        sk: "Jdu s kamarádem.",
        ua: "Я йду з другом.",
        ru: "Я иду с другом.",
        en: "I am going with a friend.",
      },
      {
        sk: "Píšu perem.",
        ua: "Я пишу ручкою.",
        ru: "Я пишу ручкой.",
        en: "I write with a pen.",
      },
      {
        sk: "Stojím před domem.",
        ua: "Я стою перед будинком.",
        ru: "Я стою перед домом.",
        en: "I am standing in front of the house.",
      },
    ],
  },
];

export const CASES_PL: CaseBlock[] = [
  {
    id: "nom",
    name: {
      sk: "Mianownik",
      ua: "Називний",
      ru: "Именительный",
      en: "Nominative",
    },
    questions: {
      sk: "Kto? Co?",
      ua: "Хто? Що?",
      ru: "Кто? Что?",
      en: "Who? What?",
    },
    use: {
      sk: "Podmiot zdania i podstawowa forma słownikowa.",
      ua: "Підмет у реченні та базова словникова форма слова.",
      ru: "Подлежащее в предложении и базовая словарная форма слова.",
      en: "The subject of a sentence and the basic dictionary form.",
    },
    rule: {
      sk: "Używany bez przyimków. Często wskazuje, kto lub co wykonuje czynność: Brat pracuje.",
      ua: "Вживається без прийменників. Часто показує, хто або що виконує дію: Brat pracuje.",
      ru: "Употребляется без предлогов. Часто показывает, кто или что выполняет действие: Brat pracuje.",
      en: "Used without prepositions. Often shows who or what performs the action: Brat pracuje.",
    },
    examples: [
      {
        sk: "Student czyta.",
        ua: "Студент читає.",
        ru: "Студент читает.",
        en: "The student is reading.",
      },
      {
        sk: "To jest samochód.",
        ua: "Це автомобіль.",
        ru: "Это машина.",
        en: "This is a car.",
      },
      {
        sk: "Brat pracuje.",
        ua: "Брат працює.",
        ru: "Брат работает.",
        en: "My brother works.",
      },
    ],
  },
  {
    id: "gen",
    name: {
      sk: "Dopełniacz",
      ua: "Родовий",
      ru: "Родительный",
      en: "Genitive",
    },
    questions: {
      sk: "Kogo? Czego?",
      ua: "Кого? Чого?",
      ru: "Кого? Чего?",
      en: "Whom? Of what?",
    },
    use: {
      sk: "Wyraża pochodzenie, przynależność, brak albo część czegoś.",
      ua: "Показує походження, належність, відсутність або частину чогось.",
      ru: "Показывает происхождение, принадлежность, отсутствие или часть чего-то.",
      en: "Shows origin, possession, absence, or part of something.",
    },
    rule: {
      sk: "Często po przyimkach: bez, od, do, z/ze, u. Na przykład: bez wody, do pracy, z domu.",
      ua: "Часто після прийменників: bez, od, do, z/ze, u. Наприклад: bez wody, do pracy, z domu.",
      ru: "Часто после предлогов: bez, od, do, z/ze, u. Например: bez wody, do pracy, z domu.",
      en: "Often used after: bez, od, do, z/ze, u. For example: bez wody, do pracy, z domu.",
    },
    examples: [
      {
        sk: "Nie mam czasu.",
        ua: "Я не маю часу.",
        ru: "У меня нет времени.",
        en: "I do not have time.",
      },
      {
        sk: "Jestem z Ukrainy.",
        ua: "Я з України.",
        ru: "Я из Украины.",
        en: "I am from Ukraine.",
      },
      {
        sk: "Idę do pracy.",
        ua: "Я йду на роботу.",
        ru: "Я иду на работу.",
        en: "I am going to work.",
      },
    ],
  },
  {
    id: "dat",
    name: {
      sk: "Celownik",
      ua: "Давальний",
      ru: "Дательный",
      en: "Dative",
    },
    questions: {
      sk: "Komu? Czemu?",
      ua: "Кому? Чому?",
      ru: "Кому? Чему?",
      en: "To whom? To what?",
    },
    use: {
      sk: "Używany przy osobie lub rzeczy, której coś dajemy, pomagamy, dziękujemy albo telefonujemy.",
      ua: "Вживається для того, кому або чому щось даємо, допомагаємо, дякуємо чи телефонуємо.",
      ru: "Употребляется для того, кому или чему что-то даём, помогаем, благодарим или звоним.",
      en: "Used for the person or thing we give something to, help, thank, or call.",
    },
    rule: {
      sk: "Często po czasownikach: pomagać, dziękować, telefonować. Może też występować z przyimkami dzięki, ku.",
      ua: "Часто після дієслів: pomagać, dziękować, telefonować. Також може бути з прийменниками dzięki, ku.",
      ru: "Часто после глаголов: pomagać, dziękować, telefonować. Также может быть с предлогами dzięki, ku.",
      en: "Often used after verbs such as pomagać, dziękować, telefonować. It can also appear with dzięki, ku.",
    },
    examples: [
      {
        sk: "Pomagam koledze.",
        ua: "Я допомагаю другові.",
        ru: "Я помогаю другу.",
        en: "I help my friend.",
      },
      {
        sk: "Dziękuję mamie.",
        ua: "Я дякую мамі.",
        ru: "Я благодарю маму.",
        en: "I thank my mother.",
      },
      {
        sk: "Telefonuję bratu.",
        ua: "Я телефоную братові.",
        ru: "Я звоню брату.",
        en: "I am calling my brother.",
      },
    ],
  },
  {
    id: "acc",
    name: {
      sk: "Biernik",
      ua: "Знахідний",
      ru: "Винительный",
      en: "Accusative",
    },
    questions: {
      sk: "Kogo? Co?",
      ua: "Кого? Що?",
      ru: "Кого? Что?",
      en: "Whom? What?",
    },
    use: {
      sk: "Bezpośredni obiekt czynności: kogo lub co widzimy, mamy, kupujemy, robimy.",
      ua: "Безпосередній об’єкт дії: кого або що бачимо, маємо, купуємо, робимо.",
      ru: "Непосредственный объект действия: кого или что видим, имеем, покупаем, делаем.",
      en: "The direct object: whom or what we see, have, buy, or do.",
    },
    rule: {
      sk: "Często po czasownikach: widzę, mam, kupuję, robię. Używany też przy kierunku ruchu: idę na pocztę.",
      ua: "Часто після дієслів: widzę, mam, kupuję, robię. Також при напрямку руху: idę na pocztę.",
      ru: "Часто после глаголов: widzę, mam, kupuję, robię. Также при направлении движения: idę na pocztę.",
      en: "Often used after verbs such as widzę, mam, kupuję, robię. Also with direction of movement: idę na pocztę.",
    },
    examples: [
      {
        sk: "Widzę samochód.",
        ua: "Я бачу автомобіль.",
        ru: "Я вижу машину.",
        en: "I see a car.",
      },
      {
        sk: "Mam pytanie.",
        ua: "У мене є питання.",
        ru: "У меня есть вопрос.",
        en: "I have a question.",
      },
      {
        sk: "Idę na pocztę.",
        ua: "Я йду на пошту.",
        ru: "Я иду на почту.",
        en: "I am going to the post office.",
      },
    ],
  },
  {
    id: "voc",
    name: {
      sk: "Wołacz",
      ua: "Кличний",
      ru: "Звательный",
      en: "Vocative",
    },
    questions: {
      sk: "Zwrot do kogoś!",
      ua: "Звертання!",
      ru: "Обращение!",
      en: "Addressing someone!",
    },
    use: {
      sk: "Używany przy bezpośrednim zwracaniu się do osoby po imieniu, tytule lub roli.",
      ua: "Вживається при прямому звертанні до людини на ім’я, за титулом або роллю.",
      ru: "Употребляется при прямом обращении к человеку по имени, титулу или роли.",
      en: "Used when directly addressing a person by name, title, or role.",
    },
    rule: {
      sk: "Typowy w imionach i zwrotach: Anno!, Piotrze!, mamo!, panie!",
      ua: "Типовий в іменах і звертаннях: Anno!, Piotrze!, mamo!, panie!",
      ru: "Типичен в именах и обращениях: Anno!, Piotrze!, mamo!, panie!",
      en: "Typical in names and forms of address: Anno!, Piotrze!, mamo!, panie!",
    },
    examples: [
      {
        sk: "Piotrze, chodź tutaj!",
        ua: "Петре, йди сюди!",
        ru: "Пётр, иди сюда!",
        en: "Piotr, come here!",
      },
      {
        sk: "Panie doktorze, dziękuję.",
        ua: "Пане лікарю, дякую.",
        ru: "Господин доктор, спасибо.",
        en: "Doctor, thank you.",
      },
      {
        sk: "Cześć, Anno!",
        ua: "Привіт, Анно!",
        ru: "Привет, Анна!",
        en: "Hi, Anna!",
      },
    ],
  },
  {
    id: "loc",
    name: {
      sk: "Miejscownik",
      ua: "Місцевий",
      ru: "Предложный / местный",
      en: "Locative",
    },
    questions: {
      sk: "O kim? O czym? Gdzie?",
      ua: "Про кого? Про що? Де?",
      ru: "О ком? О чём? Где?",
      en: "About whom? About what? Where?",
    },
    use: {
      sk: "Używany przy miejscu, położeniu albo mówieniu o kimś lub o czymś.",
      ua: "Вживається для місця, перебування або коли говоримо про когось чи щось.",
      ru: "Употребляется для места, нахождения или когда говорим о ком-то или о чём-то.",
      en: "Used for location, being somewhere, or talking about someone or something.",
    },
    rule: {
      sk: "Miejscownik jest zawsze z przyimkiem: w/we, na, o, po. Na przykład: w mieście, na stole, o pracy.",
      ua: "Miejscownik завжди з прийменником: w/we, na, o, po. Наприклад: w mieście, na stole, o pracy.",
      ru: "Miejscownik всегда с предлогом: w/we, na, o, po. Например: w mieście, na stole, o pracy.",
      en: "Miejscownik is always used with a preposition: w/we, na, o, po. For example: w mieście, na stole, o pracy.",
    },
    examples: [
      {
        sk: "Jestem w pracy.",
        ua: "Я на роботі.",
        ru: "Я на работе.",
        en: "I am at work.",
      },
      {
        sk: "Mówimy o szkole.",
        ua: "Ми говоримо про школу.",
        ru: "Мы говорим о школе.",
        en: "We are talking about school.",
      },
      {
        sk: "Mieszkam w mieście.",
        ua: "Я живу в місті.",
        ru: "Я живу в городе.",
        en: "I live in the city.",
      },
    ],
  },
  {
    id: "ins",
    name: {
      sk: "Narzędnik",
      ua: "Орудний",
      ru: "Творительный",
      en: "Instrumental",
    },
    questions: {
      sk: "Z kim? Z czym?",
      ua: "З ким? З чим?",
      ru: "С кем? С чем?",
      en: "With whom? With what?",
    },
    use: {
      sk: "Wyraża towarzyszenie, narzędzie czynności albo rolę osoby.",
      ua: "Показує супровід, знаряддя дії або роль людини.",
      ru: "Показывает сопровождение, инструмент действия или роль человека.",
      en: "Shows company, instrument of an action, or a person’s role.",
    },
    rule: {
      sk: "Często z przyimkami z/ze, przed, za, nad, pod. Używany też po być przy roli: jestem studentem.",
      ua: "Часто з прийменниками z/ze, przed, za, nad, pod. Також після być для ролі: jestem studentem.",
      ru: "Часто с предлогами z/ze, przed, za, nad, pod. Также после być для роли: jestem studentem.",
      en: "Often used with z/ze, przed, za, nad, pod. Also after być for roles: jestem studentem.",
    },
    examples: [
      {
        sk: "Idę z kolegą.",
        ua: "Я йду з другом.",
        ru: "Я иду с другом.",
        en: "I am going with a friend.",
      },
      {
        sk: "Piszę długopisem.",
        ua: "Я пишу ручкою.",
        ru: "Я пишу ручкой.",
        en: "I write with a pen.",
      },
      {
        sk: "Jestem studentem.",
        ua: "Я студент.",
        ru: "Я студент.",
        en: "I am a student.",
      },
    ],
  },
];

export const BUILD_SAMPLES_SK: W[] = [
  {
    sk: "Som v práci.",
    ua: "Я на роботі.",
    ru: "Я на работе.",
    en: "I am at work.",
  },
  {
    sk: "Idem do práce.",
    ua: "Я йду на роботу.",
    ru: "Я иду на работу.",
    en: "I am going to work.",
  },
  {
    sk: "Idem s kamarátom.",
    ua: "Я йду з другом.",
    ru: "Я иду с другом.",
    en: "I am going with a friend.",
  },
  {
    sk: "Hovoríme o škole.",
    ua: "Ми говоримо про школу.",
    ru: "Мы говорим о школе.",
    en: "We are talking about school.",
  },
  {
    sk: "Vidím auto.",
    ua: "Я бачу авто.",
    ru: "Я вижу машину.",
    en: "I see a car.",
  },
  {
    sk: "Pomáham kamarátovi.",
    ua: "Я допомагаю другові.",
    ru: "Я помогаю другу.",
    en: "I help my friend.",
  },
];

export const BUILD_SAMPLES_CS: W[] = [
  {
    sk: "Jsem v práci.",
    ua: "Я на роботі.",
    ru: "Я на работе.",
    en: "I am at work.",
  },
  {
    sk: "Jdu do práce.",
    ua: "Я йду на роботу.",
    ru: "Я иду на работу.",
    en: "I am going to work.",
  },
  {
    sk: "Jdu s kamarádem.",
    ua: "Я йду з другом.",
    ru: "Я иду с другом.",
    en: "I am going with a friend.",
  },
  {
    sk: "Mluvíme o škole.",
    ua: "Ми говоримо про школу.",
    ru: "Мы говорим о школе.",
    en: "We are talking about school.",
  },
  {
    sk: "Vidím auto.",
    ua: "Я бачу авто.",
    ru: "Я вижу машину.",
    en: "I see a car.",
  },
  {
    sk: "Pomáhám kamarádovi.",
    ua: "Я допомагаю другові.",
    ru: "Я помогаю другу.",
    en: "I help my friend.",
  },
];

export const BUILD_SAMPLES_PL: W[] = [
  {
    sk: "Jestem w pracy.",
    ua: "Я на роботі.",
    ru: "Я на работе.",
    en: "I am at work.",
  },
  {
    sk: "Idę do pracy.",
    ua: "Я йду на роботу.",
    ru: "Я иду на работу.",
    en: "I am going to work.",
  },
  {
    sk: "Idę z kolegą.",
    ua: "Я йду з другом.",
    ru: "Я иду с другом.",
    en: "I am going with a friend.",
  },
  {
    sk: "Mówimy o szkole.",
    ua: "Ми говоримо про школу.",
    ru: "Мы говорим о школе.",
    en: "We are talking about school.",
  },
  {
    sk: "Widzę samochód.",
    ua: "Я бачу автомобіль.",
    ru: "Я вижу машину.",
    en: "I see a car.",
  },
  {
    sk: "Pomagam koledze.",
    ua: "Я допомагаю другові.",
    ru: "Я помогаю другу.",
    en: "I help my friend.",
  },
];
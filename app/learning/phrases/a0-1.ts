// app/learning/phrases/a0-1.ts
import type { Phrase } from "./a0";

// ключ = `${sk}||${ua}` (нижній регістр)
export const A0_PHRASES_1: Record<string, Phrase> = {
  // =========================
  // LESSON 1 — Базові слова
  // =========================
    "dom||дім": {
        sk: "Toto je dom.",
        ua: "Це дім.",
        ru: "Это дом.",
        tokens: ["Toto", "je", "dom"],
    },

    "auto||авто": {
        sk: "Toto je auto.",
        ua: "Це авто.",
        ru: "Это авто.",
        tokens: ["Toto", "je", "auto"],
    },

    "voda||вода": {
        sk: "Pijem vodu.",
        ua: "Я п’ю воду.",
        ru: "Я пью воду.",
        tokens: ["Pijem", "vodu"],
    },

    "chlieb||хліб": {
        sk: "Chcem chlieb.",
        ua: "Я хочу хліб.",
        ru: "Я хочу хлеб.",
        tokens: ["Chcem", "chlieb"],
    },

    "škola||школа": {
        sk: "Idem do školy.",
        ua: "Я йду до школи.",
        ru: "Я иду в школу.",
        tokens: ["Idem", "do", "školy"],
    },

    "mesto||місто": {
        sk: "Idem do mesta.",
        ua: "Я йду до міста.",
        ru: "Я иду в город.",
        tokens: ["Idem", "do", "mesta"],
    },

    "čas||час": {
        sk: "Nemám čas.",
        ua: "У мене немає часу.",
        ru: "У меня нет времени.",
        tokens: ["Nemám", "čas"],
    },

    "deň||день": {
        sk: "Dnes je dobrý deň.",
        ua: "Сьогодні гарний день.",
        ru: "Сегодня хороший день.",
        tokens: ["Dnes", "je", "dobrý", "deň"],
    },

    "dobrý||добрий": {
        sk: "To je dobré.",
        ua: "Це добре.",
        ru: "Это хорошо.",
        tokens: ["To", "je", "dobré"],
    },

    "peniaze||гроші": {
        sk: "To sú peniaze.",
        ua: "Це гроші.",
        ru: "Это деньги.",
        tokens: ["To", "sú", "peniaze"],
    },

    // =========================
    // LESSON 2 — люди
    // =========================
    "človek||людина": {
        sk: "To je človek.",
        ua: "Це людина.",
        ru: "Это человек.",
        tokens: ["To", "je", "človek"],
    },

    "muž||чоловік": {
        sk: "To je muž.",
        ua: "Це чоловік.",
        ru: "Это мужчина.",
        tokens: ["To", "je", "muž"],
    },

    "žena||жінка": {
        sk: "To je žena.",
        ua: "Це жінка.",
        ru: "Это женщина.",
        tokens: ["To", "je", "žena"],
    },

    "dieťa||дитина": {
        sk: "To je dieťa.",
        ua: "Це дитина.",
        ru: "Это ребёнок.",
        tokens: ["To", "je", "dieťa"],
    },

    "priateľ||друг": {
        sk: "To je môj priateľ.",
        ua: "Це мій друг.",
        ru: "Это мой друг.",
        tokens: ["To", "je", "môj", "priateľ"],
    },

    "priateľka||подруга": {
        sk: "To je moja priateľka.",
        ua: "Це моя подруга.",
        ru: "Это моя подруга.",
        tokens: ["To", "je", "moja", "priateľka"],
    },

    "otec||батько": {
        sk: "To je môj otec.",
        ua: "Це мій батько.",
        ru: "Это мой отец.",
        tokens: ["To", "je", "môj", "otec"],
    },

    "matka||мати": {
        sk: "To je moja matka.",
        ua: "Це моя мама.",
        ru: "Это моя мама.",
        tokens: ["To", "je", "moja", "matka"],
    },

    "brat||брат": {
        sk: "Mám brata.",
        ua: "У мене є брат.",
        ru: "У меня есть брат.",
        tokens: ["Mám", "brata"],
    },

    "sestra||сестра": {
        sk: "Mám sestru.",
        ua: "У мене є сестра.",
        ru: "У меня есть сестра.",
        tokens: ["Mám", "sestru"],
    },

    // =========================
    // LESSON 3 — дім
    // =========================
    "byt||квартира": {
        sk: "Mám byt.",
        ua: "У мене є квартира.",
        ru: "У меня есть квартира.",
        tokens: ["Mám", "byt"],
    },

    "izba||кімната": {
        sk: "Izba je veľká.",
        ua: "Кімната велика.",
        ru: "Комната большая.",
        tokens: ["Izba", "je", "veľká"],
    },

    "kuchyňa||кухня": {
        sk: "Som v kuchyni.",
        ua: "Я на кухні.",
        ru: "Я на кухне.",
        tokens: ["Som", "v", "kuchyni"],
    },

    "kúpeľňa||ванна кімната": {
        sk: "Idem do kúpeľne.",
        ua: "Я йду у ванну кімнату.",
        ru: "Я иду в ванную.",
        tokens: ["Idem", "do", "kúpeľne"],
    },

    "dvere||двері": {
        sk: "Dvere sú otvorené.",
        ua: "Двері відкриті.",
        ru: "Дверь открыта.",
        tokens: ["Dvere", "sú", "otvorené"],
    },

    "okno||вікно": {
        sk: "Okno je zatvorené.",
        ua: "Вікно закрите.",
        ru: "Окно закрыто.",
        tokens: ["Okno", "je", "zatvorené"],
    },

    "stôl||стіл": {
        sk: "Stôl je tu.",
        ua: "Стіл тут.",
        ru: "Стол здесь.",
        tokens: ["Stôl", "je", "tu"],
    },

    "stolička||стілець": {
        sk: "Stolička je pri stole.",
        ua: "Стілець біля столу.",
        ru: "Стул возле стола.",
        tokens: ["Stolička", "je", "pri", "stole"],
    },

    "posteľ||ліжко": {
        sk: "Posteľ je v izbe.",
        ua: "Ліжко в кімнаті.",
        ru: "Кровать в комнате.",
        tokens: ["Posteľ", "je", "v", "izbe"],
    },

    "skriňa||шафа": {
        sk: "Skriňa je veľká.",
        ua: "Шафа велика.",
        ru: "Шкаф большой.",
        tokens: ["Skriňa", "je", "veľká"],
    },

    // =========================
    // LESSON 4 — магазин
    // =========================
    "obchod||магазин": {
        sk: "Idem do obchodu.",
        ua: "Я йду в магазин.",
        ru: "Я иду в магазин.",
        tokens: ["Idem", "do", "obchodu"],
    },

    "pokladňa||каса": {
        sk: "Kde je pokladňa?",
        ua: "Де каса?",
        ru: "Где касса?",
        tokens: ["Kde", "je", "pokladňa"],
    },

    "cena||ціна": {
        sk: "Aká je cena?",
        ua: "Яка ціна?",
        ru: "Какая цена?",
        tokens: ["Aká", "je", "cena"],
    },

    "zľava||знижка": {
        sk: "Je tu zľava.",
        ua: "Тут є знижка.",
        ru: "Тут скидка.",
        tokens: ["Je", "tu", "zľava"],
    },

    "taška||пакет/сумка": {
        sk: "Potrebujem tašku.",
        ua: "Мені потрібен пакет/сумка.",
        ru: "Мне нужен пакет/сумка.",
        tokens: ["Potrebujem", "tašku"],
    },

    "blok||чек": {
        sk: "Prosím, blok.",
        ua: "Будь ласка, чек.",
        ru: "Пожалуйста, чек.",
        tokens: ["Prosím", "blok"],
    },

    "hotovosť||готівка": {
        sk: "Platím v hotovosti.",
        ua: "Я плачу готівкою.",
        ru: "Я плачу наличными.",
        tokens: ["Platím", "v", "hotovosti"],
    },

    "karta||картка": {
        sk: "Platím kartou.",
        ua: "Я плачу карткою.",
        ru: "Я плачу картой.",
        tokens: ["Platím", "kartou"],
    },

    "kúpiť||купити": {
        sk: "Chcem kúpiť chlieb.",
        ua: "Я хочу купити хліб.",
        ru: "Я хочу купить хлеб.",
        tokens: ["Chcem", "kúpiť", "chlieb"],
    },

    "platiť||платити": {
        sk: "Musím platiť.",
        ua: "Мені треба платити.",
        ru: "Мне нужно платить.",
        tokens: ["Musím", "platiť"],
    },

    // =========================
    // LESSON 5 — Їжа та напої
    // =========================
    "jedlo||їжа": {
        sk: "Toto je jedlo.",
        ua: "Це їжа.",
        ru: "Это еда.",
        tokens: ["Toto", "je", "jedlo"],
    },

    "nápoj||напій": {
        sk: "Dám si nápoj.",
        ua: "Я візьму напій.",
        ru: "Я возьму напиток.",
        tokens: ["Dám", "si", "nápoj"],
    },



    "mäso||м'ясо": {
        sk: "Nejem mäso.",
        ua: "Я не їм м’ясо.",
        ru: "Я не ем мясо.",
        tokens: ["Nejem", "mäso"],
    },

    "polievka||суп": {
        sk: "Dám si polievku.",
        ua: "Я візьму суп.",
        ru: "Я возьму суп.",
        tokens: ["Dám", "si", "polievku"],
    },

    "ovocie||фрукти": {
        sk: "Mám rád ovocie.",
        ua: "Я люблю фрукти.",
        ru: "Я люблю фрукты.",
        tokens: ["Mám", "rád", "ovocie"],
    },

    "zelenina||овочі": {
        sk: "Zelenina je zdravá.",
        ua: "Овочі корисні.",
        ru: "Овощи полезные.",
        tokens: ["Zelenina", "je", "zdravá"],
    },



    "káva||кава": {
        sk: "Dám si kávu.",
        ua: "Я візьму каву.",
        ru: "Я возьму кофе.",
        tokens: ["Dám", "si", "kávu"],
    },

    "čaj||чай": {
        sk: "Dám si čaj.",
        ua: "Я візьму чай.",
        ru: "Я возьму чай.",
        tokens: ["Dám", "si", "čaj"],
    },


    "ulica||вулиця": {
        sk: "To je ulica.",
        ua: "Це вулиця.",
        ru: "Это улица.",
        tokens: ["To", "je", "ulica"],
    },

    "námestie||площа": {
        sk: "To je námestie.",
        ua: "Це площа.",
        ru: "Это площадь.",
        tokens: ["To", "je", "námestie"],
    },

    "dom||будинок": {
        sk: "To je dom.",
        ua: "Це будинок.",
        ru: "Это дом.",
        tokens: ["To", "je", "dom"],
    },

    "nemocnica||лікарня": {
        sk: "To je nemocnica.",
        ua: "Це лікарня.",
        ru: "Это больница.",
        tokens: ["To", "je", "nemocnica"],
    },

    "zastávka||зупинка": {
        sk: "To je zastávka.",
        ua: "Це зупинка.",
        ru: "Это остановка.",
        tokens: ["To", "je", "zastávka"],
    },

    "park||парк": {
        sk: "To je park.",
        ua: "Це парк.",
        ru: "Это парк.",
        tokens: ["To", "je", "park"],
    },

    "stanica||станція/вокзал": {
        sk: "To je stanica.",
        ua: "Це станція.",
        ru: "Это станция.",
        tokens: ["To", "je", "stanica"],
    },
    "doprava||транспорт": {
        sk: "To je doprava.",
        ua: "Це транспорт.",
        ru: "Это транспорт.",
        tokens: ["To", "je", "doprava"],
    },

    "autobus||автобус": {
        sk: "To je autobus.",
        ua: "Це автобус.",
        ru: "Это автобус.",
        tokens: ["To", "je", "autobus"],
    },

    "vlak||поїзд": {
        sk: "To je vlak.",
        ua: "Це поїзд.",
        ru: "Это поезд.",
        tokens: ["To", "je", "vlak"],
    },

    "električka||трамвай": {
        sk: "To je električka.",
        ua: "Це трамвай.",
        ru: "Это трамвай.",
        tokens: ["To", "je", "električka"],
    },

    "metro||метро": {
        sk: "To je metro.",
        ua: "Це метро.",
        ru: "Это метро.",
        tokens: ["To", "je", "metro"],
    },

    "taxík||таксі": {
        sk: "To je taxík.",
        ua: "Це таксі.",
        ru: "Это такси.",
        tokens: ["To", "je", "taxík"],
    },

    "lístok||квиток": {
        sk: "Mám lístok.",
        ua: "Я маю квиток.",
        ru: "У меня есть билет.",
        tokens: ["Mám", "lístok"],
    },

    "letisko||аеропорт": {
        sk: "To je letisko.",
        ua: "Це аеропорт.",
        ru: "Это аэропорт.",
        tokens: ["To", "je", "letisko"],
    },
    
    "noc||ніч": {
        sk: "Je noc.",
        ua: "Ніч.",
        ru: "Ночь.",
        tokens: ["Je", "noc"],
    },

    "týždeň||тиждень": {
        sk: "Týždeň má sedem dní.",
        ua: "Тиждень має сім днів.",
        ru: "Неделя имеет семь дней.",
        tokens: ["Týždeň", "má", "sedem", "dní"],
    },

    "mesiac||місяць": {
        sk: "Mesiac má tridsať dní.",
        ua: "Місяць має тридцять днів.",
        ru: "Месяц имеет тридцать дней.",
        tokens: ["Mesiac", "má", "tridsať", "dní"],
    },

    "rok||рік": {
        sk: "Rok má dvanásť mesiacov.",
        ua: "Рік має дванадцять місяців.",
        ru: "Год имеет двенадцать месяцев.",
        tokens: ["Rok", "má", "dvanásť", "mesiacov"],
    },

    "dnes||сьогодні": {
        sk: "Dnes pracujem.",
        ua: "Сьогодні я працюю.",
        ru: "Сегодня я работаю.",
        tokens: ["Dnes", "pracujem"],
    },

    "zajtra||завтра": {
        sk: "Zajtra idem do práce.",
        ua: "Завтра я йду на роботу.",
        ru: "Завтра я иду на работу.",
        tokens: ["Zajtra", "idem", "do", "práce"],
    },

    "včera||вчора": {
        sk: "Včera som bol doma.",
        ua: "Вчора я був вдома.",
        ru: "Вчера я был дома.",
        tokens: ["Včera", "som", "bol", "doma"],
    },

    "hodina||година": {
        sk: "Mám hodinu.",
        ua: "У мене є година.",
        ru: "У меня есть час.",
        tokens: ["Mám", "hodinu"],
    },
    "práca||робота": {
  sk: "Mám prácu.",
  ua: "Я маю роботу.",
  ru: "У меня есть работа.",
  tokens: ["Mám", "prácu"],
},

"zamestnanie||зайнятість / робота": {
  sk: "Hľadám zamestnanie.",
  ua: "Я шукаю роботу.",
  ru: "Я ищу работу.",
  tokens: ["Hľadám", "zamestnanie"],
},

"firma||фірма": {
  sk: "Pracujem vo firme.",
  ua: "Я працюю у фірмі.",
  ru: "Я работаю в фирме.",
  tokens: ["Pracujem", "vo", "firme"],
},

"šéf||начальник": {
  sk: "To je môj šéf.",
  ua: "Це мій начальник.",
  ru: "Это мой начальник.",
  tokens: ["To", "je", "môj", "šéf"],
},

"kolega||колега": {
  sk: "To je môj kolega.",
  ua: "Це мій колега.",
  ru: "Это мой коллега.",
  tokens: ["To", "je", "môj", "kolega"],
},

"mzda||зарплата": {
  sk: "Mám dobrú mzdu.",
  ua: "Я маю хорошу зарплату.",
  ru: "У меня хорошая зарплата.",
  tokens: ["Mám", "dobrú", "mzdu"],
},

"zmluva||договір": {
  sk: "Podpísal som zmluvu.",
  ua: "Я підписав договір.",
  ru: "Я подписал договор.",
  tokens: ["Podpísal", "som", "zmluvu"],
},

"pracovať||працювати": {
  sk: "Chcem pracovať.",
  ua: "Я хочу працювати.",
  ru: "Я хочу работать.",
  tokens: ["Chcem", "pracovať"],
},

"brigáda||підробіток": {
  sk: "Mám brigádu.",
  ua: "Я маю підробіток.",
  ru: "У меня есть подработка.",
  tokens: ["Mám", "brigádu"],
},

"dovolenka||відпустка": {
  sk: "Idem na dovolenku.",
  ua: "Я йду у відпустку.",
  ru: "Я иду в отпуск.",
  tokens: ["Idem", "na", "dovolenku"],
},
"žiak||учень": {
  sk: "Som žiak.",
  ua: "Я учень.",
  ru: "Я ученик.",
  tokens: ["Som", "žiak"],
},

"učiteľ||вчитель": {
  sk: "To je učiteľ.",
  ua: "Це вчитель.",
  ru: "Это учитель.",
  tokens: ["To", "je", "učiteľ"],
},

"trieda||клас": {
  sk: "Toto je trieda.",
  ua: "Це клас.",
  ru: "Это класс.",
  tokens: ["Toto", "je", "trieda"],
},

"predmet||предмет": {
  sk: "Mám nový predmet.",
  ua: "Я маю новий предмет.",
  ru: "У меня новый предмет.",
  tokens: ["Mám", "nový", "predmet"],
},

"hodina||урок": {
  sk: "Mám hodinu slovenčiny.",
  ua: "Я маю урок словацької.",
  ru: "У меня урок словацкого.",
  tokens: ["Mám", "hodinu", "slovenčiny"],
},

"úloha||завдання / домашня робота": {
  sk: "Robím úlohu.",
  ua: "Я роблю завдання.",
  ru: "Я делаю задание.",
  tokens: ["Robím", "úlohu"],
},

"test||тест": {
  sk: "Píšem test.",
  ua: "Я пишу тест.",
  ru: "Я пишу тест.",
  tokens: ["Píšem", "test"],
},

"zošit||зошит": {
  sk: "Mám zošit.",
  ua: "Я маю зошит.",
  ru: "У меня есть тетрадь.",
  tokens: ["Mám", "zošit"],
},

"učebnica||підручник": {
  sk: "To je učebnica.",
  ua: "Це підручник.",
  ru: "Это учебник.",
  tokens: ["To", "je", "učebnica"],
},


};


// app/learning/phrases/a0-2.ts
import type { Phrase } from "./a0";
import { phraseKey } from "./phraseKey";

export const A0_PHRASES_2: Record<string, Phrase> = {
  // =========================
  // LESSON 11 — Числа
  // =========================
  [phraseKey("nula", "нуль", "a0-11")]: {
    sk: "Je to nula.",
    ua: "Це нуль.",
    ru: "Это ноль.",
    tokens: ["Je", "to", "nula", "."],
  },
  [phraseKey("jeden", "один", "a0-11")]: {
    sk: "Mám jeden telefón.",
    ua: "У мене один телефон.",
    ru: "У меня один телефон.",
    tokens: ["Mám", "jeden", "telefón", "."],
  },
  [phraseKey("dva", "два", "a0-11")]: {
    sk: "Mám dva dni voľno.",
    ua: "У мене два дні вихідних.",
    ru: "У меня два дня выходных.",
    tokens: ["Mám", "dva", "dni", "voľno", "."],
  },
  [phraseKey("tri", "три", "a0-11")]: {
    sk: "Sú tri hodiny.",
    ua: "Зараз три години.",
    ru: "Сейчас три часа.",
    tokens: ["Sú", "tri", "hodiny", "."],
  },
  [phraseKey("štyri", "чотири", "a0-11")]: {
    sk: "Sú štyri stoličky.",
    ua: "Є чотири стільці.",
    ru: "Есть четыре стула.",
    tokens: ["Sú", "štyri", "stoličky", "."],
  },
  [phraseKey("päť", "п’ять", "a0-11")]: {
    sk: "Je päť eur.",
    ua: "Це п’ять євро.",
    ru: "Это пять евро.",
    tokens: ["Je", "päť", "eur", "."],
  },
  [phraseKey("šesť", "шість", "a0-11")]: {
    sk: "Vstávam o šesť.",
    ua: "Я встаю о шостій.",
    ru: "Я встаю в шесть.",
    tokens: ["Vstávam", "o", "šesť", "."],
  },
  [phraseKey("sedem", "сім", "a0-11")]: {
    sk: "Sú sedem dní v týždni.",
    ua: "У тижні сім днів.",
    ru: "В неделе семь дней.",
    tokens: ["Sú", "sedem", "dní", "v", "týždni", "."],
  },
  [phraseKey("osem", "вісім", "a0-11")]: {
    sk: "Prídem o osem.",
    ua: "Я прийду о восьмій.",
    ru: "Я приду в восемь.",
    tokens: ["Prídem", "o", "osem", "."],
  },
  [phraseKey("deväť", "дев’ять", "a0-11")]: {
    sk: "Je deväť hodín.",
    ua: "Зараз дев’ята година.",
    ru: "Сейчас девять часов.",
    tokens: ["Je", "deväť", "hodín", "."],
  },

  // =========================
  // LESSON 12 — Кольори
  // =========================
  [phraseKey("farba", "колір", "a0-12")]: {
    sk: "Aká je to farba?",
    ua: "Який це колір?",
    ru: "Какой это цвет?",
    tokens: ["Aká", "je", "to", "farba", "?"],
  },
  [phraseKey("biely", "білий", "a0-12")]: {
    sk: "Toto je biely papier.",
    ua: "Це білий папір.",
    ru: "Это белая бумага.",
    tokens: ["Toto", "je", "biely", "papier", "."],
  },
  [phraseKey("čierny", "чорний", "a0-12")]: {
    sk: "Mám čierny telefón.",
    ua: "У мене чорний телефон.",
    ru: "У меня чёрный телефон.",
    tokens: ["Mám", "čierny", "telefón", "."],
  },
  [phraseKey("červený", "червоний", "a0-12")]: {
    sk: "To je červený kabát.",
    ua: "Це червоне пальто.",
    ru: "Это красное пальто.",
    tokens: ["To", "je", "červený", "kabát", "."],
  },
  [phraseKey("modrý", "синій", "a0-12")]: {
    sk: "Mám modrý sveter.",
    ua: "У мене синій светр.",
    ru: "У меня синий свитер.",
    tokens: ["Mám", "modrý", "sveter", "."],
  },
  [phraseKey("zelený", "зелений", "a0-12")]: {
    sk: "Zelený strom je veľký.",
    ua: "Зелене дерево велике.",
    ru: "Зелёное дерево большое.",
    tokens: ["Zelený", "strom", "je", "veľký", "."],
  },
  [phraseKey("žltý", "жовтий", "a0-12")]: {
    sk: "Žlté slnko svieti.",
    ua: "Жовте сонце світить.",
    ru: "Жёлтое солнце светит.",
    tokens: ["Žlté", "slnko", "svieti", "."],
  },
  [phraseKey("oranžový", "помаранчевий", "a0-12")]: {
    sk: "Chcem oranžový džús.",
    ua: "Я хочу помаранчевий сік.",
    ru: "Я хочу оранжевый сок.",
    tokens: ["Chcem", "oranžový", "džús", "."],
  },
  [phraseKey("ružový", "рожевий", "a0-12")]: {
    sk: "Ružové šaty sú pekné.",
    ua: "Рожева сукня гарна.",
    ru: "Розовое платье красивое.",
    tokens: ["Ružové", "šaty", "sú", "pekné", "."],
  },
  [phraseKey("hnedý", "коричневий", "a0-12")]: {
    sk: "Hnedé topánky sú nové.",
    ua: "Коричневе взуття нове.",
    ru: "Коричневая обувь новая.",
    tokens: ["Hnedé", "topánky", "sú", "nové", "."],
  },

  // =========================
  // LESSON 13 — Одяг
  // =========================
  [phraseKey("oblečenie", "одяг", "a0-13")]: {
    sk: "Toto je moje oblečenie.",
    ua: "Це мій одяг.",
    ru: "Это моя одежда.",
    tokens: ["Toto", "je", "moje", "oblečenie", "."],
  },
  [phraseKey("tričko", "футболка", "a0-13")]: {
    sk: "Mám nové tričko.",
    ua: "У мене нова футболка.",
    ru: "У меня новая футболка.",
    tokens: ["Mám", "nové", "tričko", "."],
  },
  [phraseKey("nohavice", "штани", "a0-13")]: {
    sk: "Tieto nohavice sú čisté.",
    ua: "Ці штани чисті.",
    ru: "Эти брюки чистые.",
    tokens: ["Tieto", "nohavice", "sú", "čisté", "."],
  },
  [phraseKey("bunda", "куртка", "a0-13")]: {
    sk: "Je zima, dávam si bundu.",
    ua: "Холодно, я одягаю куртку.",
    ru: "Холодно, я надеваю куртку.",
    tokens: ["Je", "zima", ",", "dávam", "si", "bundu", "."],
  },
  [phraseKey("topánky", "взуття", "a0-13")]: {
    sk: "Kde sú moje topánky?",
    ua: "Де моє взуття?",
    ru: "Где моя обувь?",
    tokens: ["Kde", "sú", "moje", "topánky", "?"],
  },
  [phraseKey("kabát", "пальто", "a0-13")]: {
    sk: "Kabát je v skrini.",
    ua: "Пальто в шафі.",
    ru: "Пальто в шкафу.",
    tokens: ["Kabát", "je", "v", "skrini", "."],
  },
  [phraseKey("šaty", "сукня", "a0-13")]: {
    sk: "Šaty sú ružové.",
    ua: "Сукня рожева.",
    ru: "Платье розовое.",
    tokens: ["Šaty", "sú", "ružové", "."],
  },
  [phraseKey("čiapka", "шапка", "a0-13")]: {
    sk: "Potrebujem čiapku.",
    ua: "Мені потрібна шапка.",
    ru: "Мне нужна шапка.",
    tokens: ["Potrebujem", "čiapku", "."],
  },
  [phraseKey("ponožky", "шкарпетки", "a0-13")]: {
    sk: "Ponožky sú v taške.",
    ua: "Шкарпетки в сумці.",
    ru: "Носки в сумке.",
    tokens: ["Ponožky", "sú", "v", "taške", "."],
  },
  [phraseKey("sveter", "светр", "a0-13")]: {
    sk: "Sveter je teplý.",
    ua: "Светр теплий.",
    ru: "Свитер тёплый.",
    tokens: ["Sveter", "je", "teplý", "."],
  },

  // =========================
  // LESSON 14 — Тіло людини
  // =========================
  [phraseKey("telo", "тіло", "a0-14")]: {
    sk: "Telo potrebuje oddych.",
    ua: "Тілу потрібен відпочинок.",
    ru: "Телу нужен отдых.",
    tokens: ["Telo", "potrebuje", "oddych", "."],
  },
  [phraseKey("hlava", "голова", "a0-14")]: {
    sk: "Bolie ma hlava.",
    ua: "У мене болить голова.",
    ru: "У меня болит голова.",
    tokens: ["Bolie", "ma", "hlava", "."],
  },
  [phraseKey("oko", "око", "a0-14")]: {
    sk: "Mám unavené oko.",
    ua: "У мене втомлене око.",
    ru: "У меня устал глаз.",
    tokens: ["Mám", "unavené", "oko", "."],
  },
  [phraseKey("nos", "ніс", "a0-14")]: {
    sk: "Nos mám studený.",
    ua: "Ніс у мене холодний.",
    ru: "Нос у меня холодный.",
    tokens: ["Nos", "mám", "studený", "."],
  },
  [phraseKey("ústa", "рот", "a0-14")]: {
    sk: "Ústa sú suché.",
    ua: "Рот сухий.",
    ru: "Рот сухой.",
    tokens: ["Ústa", "sú", "suché", "."],
  },
  [phraseKey("ruka", "рука", "a0-14")]: {
    sk: "Ruka ma bolí.",
    ua: "Рука болить.",
    ru: "Рука болит.",
    tokens: ["Ruka", "ma", "bolí", "."],
  },
  [phraseKey("noha", "нога", "a0-14")]: {
    sk: "Noha je unavená.",
    ua: "Нога втомлена.",
    ru: "Нога устала.",
    tokens: ["Noha", "je", "unavená", "."],
  },
  [phraseKey("chrbát", "спина", "a0-14")]: {
    sk: "Chrbát ma bolí.",
    ua: "Спина болить.",
    ru: "Спина болит.",
    tokens: ["Chrbát", "ma", "bolí", "."],
  },
  [phraseKey("brucho", "живіт", "a0-14")]: {
    sk: "Brucho ma bolí.",
    ua: "Живіт болить.",
    ru: "Живот болит.",
    tokens: ["Brucho", "ma", "bolí", "."],
  },
  [phraseKey("srdce", "серце", "a0-14")]: {
    sk: "Srdce je dôležité.",
    ua: "Серце важливе.",
    ru: "Сердце важно.",
    tokens: ["Srdce", "je", "dôležité", "."],
  },

  // =========================
  // LESSON 15 — Здоров’я
  // =========================
  [phraseKey("zdravie", "здоров’я", "a0-15")]: {
    sk: "Zdravie je dôležité.",
    ua: "Здоров’я важливе.",
    ru: "Здоровье важно.",
    tokens: ["Zdravie", "je", "dôležité", "."],
  },
  [phraseKey("choroba", "хвороба", "a0-15")]: {
    sk: "Mám chorobu.",
    ua: "У мене хвороба.",
    ru: "У меня болезнь.",
    tokens: ["Mám", "chorobu", "."],
  },
  [phraseKey("lekár", "лікар", "a0-15")]: {
    sk: "Potrebujem lekára.",
    ua: "Мені потрібен лікар.",
    ru: "Мне нужен врач.",
    tokens: ["Potrebujem", "lekára", "."],
  },
  [phraseKey("nemocnica", "лікарня", "a0-15")]: {
    sk: "Idem do nemocnice.",
    ua: "Я йду до лікарні.",
    ru: "Я иду в больницу.",
    tokens: ["Idem", "do", "nemocnice", "."],
  },
  [phraseKey("liek", "ліки", "a0-15")]: {
    sk: "Toto je liek.",
    ua: "Це ліки.",
    ru: "Это лекарство.",
    tokens: ["Toto", "je", "liek", "."],
  },
  [phraseKey("bolesť", "біль", "a0-15")]: {
    sk: "Mám bolesť.",
    ua: "У мене біль.",
    ru: "У меня боль.",
    tokens: ["Mám", "bolesť", "."],
  },
  [phraseKey("teplota", "температура", "a0-15")]: {
    sk: "Mám teplotu.",
    ua: "У мене температура.",
    ru: "У меня температура.",
    tokens: ["Mám", "teplotu", "."],
  },
  [phraseKey("kašeľ", "кашель", "a0-15")]: {
    sk: "Mám kašeľ.",
    ua: "У мене кашель.",
    ru: "У меня кашель.",
    tokens: ["Mám", "kašeľ", "."],
  },
  [phraseKey("prechladnutie", "застуда", "a0-15")]: {
    sk: "Mám prechladnutie.",
    ua: "У мене застуда.",
    ru: "У мене застуда.",
    tokens: ["Mám", "prechladnutie", "."],
  },
  [phraseKey("uzdraviť sa", "одужати", "a0-15")]: {
    sk: "Chcem sa uzdraviť.",
    ua: "Я хочу одужати.",
    ru: "Я хочу выздороветь.",
    tokens: ["Chcem", "sa", "uzdraviť", "."],
  },

  // =========================
  // LESSON 16 — Погода
  // =========================
  [phraseKey("počasie", "погода", "a0-16")]: {
    sk: "Aké je dnes počasie?",
    ua: "Яка сьогодні погода?",
    ru: "Какая сегодня погода?",
    tokens: ["Aké", "je", "dnes", "počasie", "?"],
  },
  [phraseKey("slnko", "сонце", "a0-16")]: {
    sk: "Slnko svieti.",
    ua: "Сонце світить.",
    ru: "Солнце светит.",
    tokens: ["Slnko", "svieti", "."],
  },
  [phraseKey("dážď", "дощ", "a0-16")]: {
    sk: "Dnes je dážď.",
    ua: "Сьогодні дощ.",
    ru: "Сегодня дождь.",
    tokens: ["Dnes", "je", "dážď", "."],
  },
  [phraseKey("sneh", "сніг", "a0-16")]: {
    sk: "Je sneh.",
    ua: "Є сніг.",
    ru: "Есть снег.",
    tokens: ["Je", "sneh", "."],
  },
  [phraseKey("vietor", "вітер", "a0-16")]: {
    sk: "Fúka vietor.",
    ua: "Дме вітер.",
    ru: "Дует ветер.",
    tokens: ["Fúka", "vietor", "."],
  },
  [phraseKey("oblak", "хмара", "a0-16")]: {
    sk: "Na nebi je oblak.",
    ua: "На небі хмара.",
    ru: "На небе облако.",
    tokens: ["Na", "nebi", "je", "oblak", "."],
  },
  [phraseKey("teplo", "тепло", "a0-16")]: {
    sk: "Dnes je teplo.",
    ua: "Сьогодні тепло.",
    ru: "Сегодня тепло.",
    tokens: ["Dnes", "je", "teplo", "."],
  },
  [phraseKey("zima", "холод", "a0-16")]: {
    sk: "Dnes je zima.",
    ua: "Сьогодні холодно.",
    ru: "Сегодня холодно.",
    tokens: ["Dnes", "je", "zima", "."],
  },
  [phraseKey("búrka", "буря", "a0-16")]: {
    sk: "Je búrka.",
    ua: "Буря / гроза.",
    ru: "Буря / гроза.",
    tokens: ["Je", "búrka", "."],
  },

  // =========================
  // LESSON 17 — Природа
  // =========================
  [phraseKey("príroda", "природа", "a0-17")]: {
    sk: "Mám rád prírodu.",
    ua: "Я люблю природу.",
    ru: "Я люблю природу.",
    tokens: ["Mám", "rád", "prírodu", "."],
  },
  [phraseKey("strom", "дерево", "a0-17")]: {
    sk: "Tu je strom.",
    ua: "Тут дерево.",
    ru: "Здесь дерево.",
    tokens: ["Tu", "je", "strom", "."],
  },
  [phraseKey("les", "ліс", "a0-17")]: {
    sk: "Idem do lesa.",
    ua: "Я йду в ліс.",
    ru: "Я иду в лес.",
    tokens: ["Idem", "do", "lesa", "."],
  },
  [phraseKey("rieka", "річка", "a0-17")]: {
    sk: "Tu je rieka.",
    ua: "Тут річка.",
    ru: "Здесь река.",
    tokens: ["Tu", "je", "rieka", "."],
  },
  [phraseKey("jazero", "озеро", "a0-17")]: {
    sk: "Tu je jazero.",
    ua: "Тут озеро.",
    ru: "Здесь озеро.",
    tokens: ["Tu", "je", "jazero", "."],
  },
  [phraseKey("hora", "гора", "a0-17")]: {
    sk: "Tá hora je vysoká.",
    ua: "Та гора висока.",
    ru: "Та гора высокая.",
    tokens: ["Tá", "hora", "je", "vysoká", "."],
  },
  [phraseKey("kvet", "квітка", "a0-17")]: {
    sk: "Toto je kvet.",
    ua: "Це квітка.",
    ru: "Это цветок.",
    tokens: ["Toto", "je", "kvet", "."],
  },
  [phraseKey("tráva", "трава", "a0-17")]: {
    sk: "Tráva je zelená.",
    ua: "Трава зелена.",
    ru: "Трава зелёная.",
    tokens: ["Tráva", "je", "zelená", "."],
  },
  [phraseKey("zviera", "тварина", "a0-17")]: {
    sk: "To zviera je tu.",
    ua: "Ця тварина тут.",
    ru: "Это животное здесь.",
    tokens: ["To", "zviera", "je", "tu", "."],
  },
  [phraseKey("zem", "земля", "a0-17")]: {
    sk: "Zem je veľká.",
    ua: "Земля велика.",
    ru: "Земля большая.",
    tokens: ["Zem", "je", "veľká", "."],
  },

  // =========================
  // LESSON 18 — Побут
  // =========================
  [phraseKey("domácnosť", "побут", "a0-18")]: {
    sk: "Domácnosť je dôležitá.",
    ua: "Побут важливий.",
    ru: "Быт важен.",
    tokens: ["Domácnosť", "je", "dôležitá", "."],
  },
  [phraseKey("dom", "дім", "a0-18")]: {
    sk: "Toto je dom.",
    ua: "Це дім.",
    ru: "Это дом.",
    tokens: ["Toto", "je", "dom", "."],
  },
  [phraseKey("byt", "квартира", "a0-18")]: {
    sk: "Mám byt.",
    ua: "У мене є квартира.",
    ru: "У меня есть квартира.",
    tokens: ["Mám", "byt", "."],
  },
  [phraseKey("izba", "кімната", "a0-18")]: {
    sk: "Toto je izba.",
    ua: "Це кімната.",
    ru: "Это комната.",
    tokens: ["Toto", "je", "izba", "."],
  },
  [phraseKey("posteľ", "ліжко", "a0-18")]: {
    sk: "Tu je posteľ.",
    ua: "Тут ліжко.",
    ru: "Здесь кровать.",
    tokens: ["Tu", "je", "posteľ", "."],
  },
  [phraseKey("stôl", "стіл", "a0-18")]: {
    sk: "Stôl je veľký.",
    ua: "Стіл великий.",
    ru: "Стол большой.",
    tokens: ["Stôl", "je", "veľký", "."],
  },
  [phraseKey("stolička", "стілець", "a0-18")]: {
    sk: "Stolička je tu.",
    ua: "Стілець тут.",
    ru: "Стул здесь.",
    tokens: ["Stolička", "je", "tu", "."],
  },
  [phraseKey("kuchyňa", "кухня", "a0-18")]: {
    sk: "Kuchyňa je čistá.",
    ua: "Кухня чиста.",
    ru: "Кухня чистая.",
    tokens: ["Kuchyňa", "je", "čistá", "."],
  },
  [phraseKey("chladnička", "холодильник", "a0-18")]: {
    sk: "Chladnička je plná.",
    ua: "Холодильник повний.",
    ru: "Холодильник полный.",
    tokens: ["Chladnička", "je", "plná", "."],
  },
  [phraseKey("upratovať", "прибирати", "a0-18")]: {
    sk: "Idem upratovať.",
    ua: "Я йду прибирати.",
    ru: "Я иду убирать.",
    tokens: ["Idem", "upratovať", "."],
  },

  // =========================
  // LESSON 19 — Дії та дієслова
  // =========================
  [phraseKey("robiť", "робити", "a0-19")]: {
    sk: "Čo robíš?",
    ua: "Що ти робиш?",
    ru: "Что ты делаешь?",
    tokens: ["Čo", "robíš", "?"],
  },
  [phraseKey("ísť", "йти", "a0-19")]: {
    sk: "Idem domov.",
    ua: "Я йду додому.",
    ru: "Я иду домой.",
    tokens: ["Idem", "domov", "."],
  },
  [phraseKey("prísť", "прийти", "a0-19")]: {
    sk: "Prídem zajtra.",
    ua: "Я прийду завтра.",
    ru: "Я приду завтра.",
    tokens: ["Prídem", "zajtra", "."],
  },
  [phraseKey("vidieť", "бачити", "a0-19")]: {
    sk: "Vidím ťa.",
    ua: "Я бачу тебе.",
    ru: "Я вижу тебя.",
    tokens: ["Vidím", "ťa", "."],
  },
  [phraseKey("hovoriť", "говорити", "a0-19")]: {
    sk: "Hovorím po slovensky.",
    ua: "Я говорю словацькою.",
    ru: "Я говорю по-словацки.",
    tokens: ["Hovorím", "po", "slovensky", "."],
  },
  [phraseKey("jesť", "їсти", "a0-19")]: {
    sk: "Jem obed.",
    ua: "Я їм обід.",
    ru: "Я ем обед.",
    tokens: ["Jem", "obed", "."],
  },
  [phraseKey("piť", "пити", "a0-19")]: {
    sk: "Pijem vodu.",
    ua: "Я п’ю воду.",
    ru: "Я пью воду.",
    tokens: ["Pijem", "vodu", "."],
  },
  [phraseKey("spať", "спати", "a0-19")]: {
    sk: "Spím v noci.",
    ua: "Я сплю вночі.",
    ru: "Я сплю ночью.",
    tokens: ["Spím", "v", "noci", "."],
  },
  [phraseKey("pracovať", "працювати", "a0-19")]: {
    sk: "Pracujem dnes.",
    ua: "Я працюю сьогодні.",
    ru: "Я работаю сегодня.",
    tokens: ["Pracujem", "dnes", "."],
  },
  [phraseKey("učiť sa", "вчитися", "a0-19")]: {
    sk: "Učím sa po slovensky.",
    ua: "Я вчуся словацькою.",
    ru: "Я учусь словацкому.",
    tokens: ["Učím", "sa", "po", "slovensky", "."],
  },

  // =========================
  // LESSON 20 — Питання і відповіді
  // =========================
  [phraseKey("kto", "хто", "a0-20")]: {
    sk: "Kto je to?",
    ua: "Хто це?",
    ru: "Кто это?",
    tokens: ["Kto", "je", "to", "?"],
  },
  [phraseKey("čo", "що", "a0-20")]: {
    sk: "Čo je to?",
    ua: "Що це?",
    ru: "Что это?",
    tokens: ["Čo", "je", "to", "?"],
  },
  [phraseKey("kde", "де", "a0-20")]: {
    sk: "Kde si?",
    ua: "Де ти?",
    ru: "Где ты?",
    tokens: ["Kde", "si", "?"],
  },
  [phraseKey("kedy", "коли", "a0-20")]: {
    sk: "Kedy prídeš?",
    ua: "Коли ти прийдеш?",
    ru: "Когда ты придёшь?",
    tokens: ["Kedy", "prídeš", "?"],
  },
  [phraseKey("prečo", "чому", "a0-20")]: {
    sk: "Prečo si tu?",
    ua: "Чому ти тут?",
    ru: "Почему ты здесь?",
    tokens: ["Prečo", "si", "tu", "?"],
  },
  [phraseKey("ako", "як", "a0-20")]: {
    sk: "Ako sa máš?",
    ua: "Як ти?",
    ru: "Как ты?",
    tokens: ["Ako", "sa", "máš", "?"],
  },
  [phraseKey("koľko", "скільки", "a0-20")]: {
    sk: "Koľko to stojí?",
    ua: "Скільки це коштує?",
    ru: "Сколько это стоит?",
    tokens: ["Koľko", "to", "stojí", "?"],
  },
  [phraseKey("áno", "так", "a0-20")]: {
    sk: "Áno, ďakujem.",
    ua: "Так, дякую.",
    ru: "Да, спасибо.",
    tokens: ["Áno", ",", "ďakujem", "."],
  },
  [phraseKey("nie", "ні", "a0-20")]: {
    sk: "Nie, ďakujem.",
    ua: "Ні, дякую.",
    ru: "Нет, спасибо.",
    tokens: ["Nie", ",", "ďakujem", "."],
  },
  [phraseKey("možno", "можливо", "a0-20")]: {
    sk: "Možno zajtra.",
    ua: "Можливо завтра.",
    ru: "Возможно завтра.",
    tokens: ["Možno", "zajtra", "."],
  },
};

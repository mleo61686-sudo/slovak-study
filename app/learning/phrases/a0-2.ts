// app/learning/phrases/a0-2.ts
import type { Phrase } from "./a0";

const key = (wordSk: string, wordUa: string) => `${wordSk}||${wordUa}`.toLowerCase();

export const A0_PHRASES_2: Record<string, Phrase> = {
  // =========================
  // LESSON 11 — Числа
  // =========================
  [key("nula", "нуль")]: {
    sk: "Je to nula.",
    ua: "Це нуль.",
    ru: "Это ноль.",
    tokens: ["Je", "to", "nula", "."],
  },
  [key("jeden", "один")]: {
    sk: "Mám jeden telefón.",
    ua: "У мене один телефон.",
    ru: "У меня один телефон.",
    tokens: ["Mám", "jeden", "telefón", "."],
  },
  [key("dva", "два")]: {
    sk: "Mám dva dni voľno.",
    ua: "У мене два дні вихідних.",
    ru: "У меня два дня выходных.",
    tokens: ["Mám", "dva", "dni", "voľno", "."],
  },
  [key("tri", "три")]: {
    sk: "Sú tri hodiny.",
    ua: "Зараз три години.",
    ru: "Сейчас три часа.",
    tokens: ["Sú", "tri", "hodiny", "."],
  },
  [key("štyri", "чотири")]: {
    sk: "Sú štyri stoličky.",
    ua: "Є чотири стільці.",
    ru: "Есть четыре стула.",
    tokens: ["Sú", "štyri", "stoličky", "."],
  },
  [key("päť", "п’ять")]: {
    sk: "Je päť eur.",
    ua: "Це п’ять євро.",
    ru: "Это пять евро.",
    tokens: ["Je", "päť", "eur", "."],
  },
  [key("šesť", "шість")]: {
    sk: "Vstávam o šesť.",
    ua: "Я встаю о шостій.",
    ru: "Я встаю в шесть.",
    tokens: ["Vstávam", "o", "šesť", "."],
  },
  [key("sedem", "сім")]: {
    sk: "Sú sedem dní v týždni.",
    ua: "У тижні сім днів.",
    ru: "В неделе семь дней.",
    tokens: ["Sú", "sedem", "dní", "v", "týždni", "."],
  },
  [key("osem", "вісім")]: {
    sk: "Prídem o osem.",
    ua: "Я прийду о восьмій.",
    ru: "Я приду в восемь.",
    tokens: ["Prídem", "o", "osem", "."],
  },
  [key("deväť", "дев’ять")]: {
    sk: "Je deväť hodín.",
    ua: "Зараз дев’ята година.",
    ru: "Сейчас девять часов.",
    tokens: ["Je", "deväť", "hodín", "."],
  },

  // =========================
  // LESSON 12 — Кольори
  // =========================
  [key("farba", "колір")]: {
    sk: "Aká je to farba?",
    ua: "Який це колір?",
    ru: "Какой это цвет?",
    tokens: ["Aká", "je", "to", "farba", "?"],
  },
  [key("biely", "білий")]: {
    sk: "Toto je biely papier.",
    ua: "Це білий папір.",
    ru: "Это белая бумага.",
    tokens: ["Toto", "je", "biely", "papier", "."],
  },
  [key("čierny", "чорний")]: {
    sk: "Mám čierny telefón.",
    ua: "У мене чорний телефон.",
    ru: "У меня чёрный телефон.",
    tokens: ["Mám", "čierny", "telefón", "."],
  },
  [key("červený", "червоний")]: {
    sk: "To je červený kabát.",
    ua: "Це червоне пальто.",
    ru: "Это красное пальто.",
    tokens: ["To", "je", "červený", "kabát", "."],
  },
  [key("modrý", "синій")]: {
    sk: "Mám modrý sveter.",
    ua: "У мене синій светр.",
    ru: "У меня синий свитер.",
    tokens: ["Mám", "modrý", "sveter", "."],
  },
  [key("zelený", "зелений")]: {
    sk: "Zelený strom je veľký.",
    ua: "Зелене дерево велике.",
    ru: "Зелёное дерево большое.",
    tokens: ["Zelený", "strom", "je", "veľký", "."],
  },
  [key("žltý", "жовтий")]: {
    sk: "Žlté slnko svieti.",
    ua: "Жовте сонце світить.",
    ru: "Жёлтое солнце светит.",
    tokens: ["Žlté", "slnko", "svieti", "."],
  },
  [key("oranžový", "помаранчевий")]: {
    sk: "Chcem oranžový džús.",
    ua: "Я хочу помаранчевий сік.",
    ru: "Я хочу оранжевый сок.",
    tokens: ["Chcem", "oranžový", "džús", "."],
  },
  [key("ružový", "рожевий")]: {
    sk: "Ružové šaty sú pekné.",
    ua: "Рожева сукня гарна.",
    ru: "Розовое платье красивое.",
    tokens: ["Ružové", "šaty", "sú", "pekné", "."],
  },
  [key("hnedý", "коричневий")]: {
    sk: "Hnedé topánky sú nové.",
    ua: "Коричневе взуття нове.",
    ru: "Коричневая обувь новая.",
    tokens: ["Hnedé", "topánky", "sú", "nové", "."],
  },

  // =========================
  // LESSON 13 — Одяг
  // =========================
  [key("oblečenie", "одяг")]: {
    sk: "Toto je moje oblečenie.",
    ua: "Це мій одяг.",
    ru: "Это моя одежда.",
    tokens: ["Toto", "je", "moje", "oblečenie", "."],
  },
  [key("tričko", "футболка")]: {
    sk: "Mám nové tričko.",
    ua: "У мене нова футболка.",
    ru: "У меня новая футболка.",
    tokens: ["Mám", "nové", "tričko", "."],
  },
  [key("nohavice", "штани")]: {
    sk: "Tieto nohavice sú čisté.",
    ua: "Ці штани чисті.",
    ru: "Эти брюки чистые.",
    tokens: ["Tieto", "nohavice", "sú", "čisté", "."],
  },
  [key("bunda", "куртка")]: {
    sk: "Je zima, dávam si bundu.",
    ua: "Холодно, я одягаю куртку.",
    ru: "Холодно, я надеваю куртку.",
    tokens: ["Je", "zima", ",", "dávam", "si", "bundu", "."],
  },
  [key("topánky", "взуття")]: {
    sk: "Kde sú moje topánky?",
    ua: "Де моє взуття?",
    ru: "Где моя обувь?",
    tokens: ["Kde", "sú", "moje", "topánky", "?"],
  },
  [key("kabát", "пальто")]: {
    sk: "Kabát je v skrini.",
    ua: "Пальто в шафі.",
    ru: "Пальто в шкафу.",
    tokens: ["Kabát", "je", "v", "skrini", "."],
  },
  [key("šaty", "сукня")]: {
    sk: "Šaty sú ružové.",
    ua: "Сукня рожева.",
    ru: "Платье розовое.",
    tokens: ["Šaty", "sú", "ružové", "."],
  },
  [key("čiapka", "шапка")]: {
    sk: "Potrebujem čiapku.",
    ua: "Мені потрібна шапка.",
    ru: "Мне нужна шапка.",
    tokens: ["Potrebujem", "čiapku", "."],
  },
  [key("ponožky", "шкарпетки")]: {
    sk: "Ponožky sú v taške.",
    ua: "Шкарпетки в сумці.",
    ru: "Носки в сумке.",
    tokens: ["Ponožky", "sú", "v", "taške", "."],
  },
  [key("sveter", "светр")]: {
    sk: "Sveter je teplý.",
    ua: "Светр теплий.",
    ru: "Свитер тёплый.",
    tokens: ["Sveter", "je", "teplý", "."],
  },

  // =========================
  // LESSON 14 — Тіло людини
  // =========================
  [key("telo", "тіло")]: {
    sk: "Telo potrebuje oddych.",
    ua: "Тілу потрібен відпочинок.",
    ru: "Телу нужен отдых.",
    tokens: ["Telo", "potrebuje", "oddych", "."],
  },
  [key("hlava", "голова")]: {
    sk: "Bolie ma hlava.",
    ua: "У мене болить голова.",
    ru: "У меня болит голова.",
    tokens: ["Bolie", "ma", "hlava", "."],
  },
  [key("oko", "око")]: {
    sk: "Mám unavené oko.",
    ua: "У мене втомлене око.",
    ru: "У меня устал глаз.",
    tokens: ["Mám", "unavené", "oko", "."],
  },
  [key("nos", "ніс")]: {
    sk: "Nos mám studený.",
    ua: "Ніс у мене холодний.",
    ru: "Нос у меня холодный.",
    tokens: ["Nos", "mám", "studený", "."],
  },
  [key("ústa", "рот")]: {
    sk: "Ústa sú suché.",
    ua: "Рот сухий.",
    ru: "Рот сухой.",
    tokens: ["Ústa", "sú", "suché", "."],
  },
  [key("ruka", "рука")]: {
    sk: "Ruka ma bolí.",
    ua: "Рука болить.",
    ru: "Рука болит.",
    tokens: ["Ruka", "ma", "bolí", "."],
  },
  [key("noha", "нога")]: {
    sk: "Noha je unavená.",
    ua: "Нога втомлена.",
    ru: "Нога устала.",
    tokens: ["Noha", "je", "unavená", "."],
  },
  [key("chrbát", "спина")]: {
    sk: "Chrbát ma bolí.",
    ua: "Спина болить.",
    ru: "Спина болит.",
    tokens: ["Chrbát", "ma", "bolí", "."],
  },
  [key("brucho", "живіт")]: {
    sk: "Brucho ma bolí.",
    ua: "Живіт болить.",
    ru: "Живот болит.",
    tokens: ["Brucho", "ma", "bolí", "."],
  },
  [key("srdce", "серце")]: {
    sk: "Srdce je dôležité.",
    ua: "Серце важливе.",
    ru: "Сердце важно.",
    tokens: ["Srdce", "je", "dôležité", "."],
  },

  // =========================
  // LESSON 15 — Здоров’я
  // =========================
  [key("zdravie", "здоров’я")]: {
    sk: "Zdravie je dôležité.",
    ua: "Здоров’я важливе.",
    ru: "Здоровье важно.",
    tokens: ["Zdravie", "je", "dôležité", "."],
  },
  [key("choroba", "хвороба")]: {
    sk: "Mám chorobu.",
    ua: "У мене хвороба.",
    ru: "У меня болезнь.",
    tokens: ["Mám", "chorobu", "."],
  },
  [key("lekár", "лікар")]: {
    sk: "Potrebujem lekára.",
    ua: "Мені потрібен лікар.",
    ru: "Мне нужен врач.",
    tokens: ["Potrebujem", "lekára", "."],
  },
  [key("nemocnica", "лікарня")]: {
    sk: "Idem do nemocnice.",
    ua: "Я йду до лікарні.",
    ru: "Я иду в больницу.",
    tokens: ["Idem", "do", "nemocnice", "."],
  },
  [key("liek", "ліки")]: {
    sk: "Toto je liek.",
    ua: "Це ліки.",
    ru: "Это лекарство.",
    tokens: ["Toto", "je", "liek", "."],
  },
  [key("bolesť", "біль")]: {
    sk: "Mám bolesť.",
    ua: "У мене біль.",
    ru: "У меня боль.",
    tokens: ["Mám", "bolesť", "."],
  },
  [key("teplota", "температура")]: {
    sk: "Mám teplotu.",
    ua: "У мене температура.",
    ru: "У меня температура.",
    tokens: ["Mám", "teplotu", "."],
  },
  [key("kašeľ", "кашель")]: {
    sk: "Mám kašeľ.",
    ua: "У мене кашель.",
    ru: "У меня кашель.",
    tokens: ["Mám", "kašeľ", "."],
  },
  [key("prechladnutie", "застуда")]: {
    sk: "Mám prechladnutie.",
    ua: "У мене застуда.",
    ru: "У меня простуда.",
    tokens: ["Mám", "prechladnutie", "."],
  },
  [key("uzdraviť sa", "одужати")]: {
    sk: "Chcem sa uzdraviť.",
    ua: "Я хочу одужати.",
    ru: "Я хочу выздороветь.",
    tokens: ["Chcem", "sa", "uzdraviť", "."],
  },

  // =========================
  // LESSON 16 — Погода
  // =========================
  [key("počasie", "погода")]: {
    sk: "Aké je dnes počasie?",
    ua: "Яка сьогодні погода?",
    ru: "Какая сегодня погода?",
    tokens: ["Aké", "je", "dnes", "počasie", "?"],
  },
  [key("slnko", "сонце")]: {
    sk: "Slnko svieti.",
    ua: "Сонце світить.",
    ru: "Солнце светит.",
    tokens: ["Slnko", "svieti", "."],
  },
  [key("dážď", "дощ")]: {
    sk: "Dnes je dážď.",
    ua: "Сьогодні дощ.",
    ru: "Сегодня дождь.",
    tokens: ["Dnes", "je", "dážď", "."],
  },
  [key("sneh", "сніг")]: {
    sk: "Je sneh.",
    ua: "Є сніг.",
    ru: "Есть снег.",
    tokens: ["Je", "sneh", "."],
  },
  [key("vietor", "вітер")]: {
    sk: "Fúka vietor.",
    ua: "Дме вітер.",
    ru: "Дует ветер.",
    tokens: ["Fúka", "vietor", "."],
  },
  [key("oblak", "хмара")]: {
    sk: "Na nebi je oblak.",
    ua: "На небі хмара.",
    ru: "На небе облако.",
    tokens: ["Na", "nebi", "je", "oblak", "."],
  },
  [key("teplo", "тепло")]: {
    sk: "Dnes je teplo.",
    ua: "Сьогодні тепло.",
    ru: "Сегодня тепло.",
    tokens: ["Dnes", "je", "teplo", "."],
  },
  [key("zima", "холод")]: {
    sk: "Dnes je zima.",
    ua: "Сьогодні холодно.",
    ru: "Сегодня холодно.",
    tokens: ["Dnes", "je", "zima", "."],
  },
  [key("búrka", "буря")]: {
    sk: "Je búrka.",
    ua: "Буря / гроза.",
    ru: "Буря / гроза.",
    tokens: ["Je", "búrka", "."],
  },
  // teplota вже є в уроці 15, але тут у тебе теж є це слово — ключ той самий.
  // Якщо однаково слово "teplota||температура" використовується в 15 і 16, то в Record може бути лише ОДНА фраза.
  // Тому нижче я роблю інший варіант ключа не можу — ключі мають збігатись.
  // Рішення: або прибрати "teplota" з одного уроку, або дозволити масив фраз (але це зміна типу/логіки).
  // Щоб не ламати логіку — залишаємо фразу вже в уроці 15.

  // =========================
  // LESSON 17 — Природа
  // =========================
  [key("príroda", "природа")]: {
    sk: "Mám rád prírodu.",
    ua: "Я люблю природу.",
    ru: "Я люблю природу.",
    tokens: ["Mám", "rád", "prírodu", "."],
  },
  [key("strom", "дерево")]: {
    sk: "Tu je strom.",
    ua: "Тут дерево.",
    ru: "Здесь дерево.",
    tokens: ["Tu", "je", "strom", "."],
  },
  [key("les", "ліс")]: {
    sk: "Idem do lesa.",
    ua: "Я йду в ліс.",
    ru: "Я иду в лес.",
    tokens: ["Idem", "do", "lesa", "."],
  },
  [key("rieka", "річка")]: {
    sk: "Tu je rieka.",
    ua: "Тут річка.",
    ru: "Здесь река.",
    tokens: ["Tu", "je", "rieka", "."],
  },
  [key("jazero", "озеро")]: {
    sk: "Tu je jazero.",
    ua: "Тут озеро.",
    ru: "Здесь озеро.",
    tokens: ["Tu", "je", "jazero", "."],
  },
  [key("hora", "гора")]: {
    sk: "Tá hora je vysoká.",
    ua: "Та гора висока.",
    ru: "Та гора высокая.",
    tokens: ["Tá", "hora", "je", "vysoká", "."],
  },
  [key("kvet", "квітка")]: {
    sk: "Toto je kvet.",
    ua: "Це квітка.",
    ru: "Это цветок.",
    tokens: ["Toto", "je", "kvet", "."],
  },
  [key("tráva", "трава")]: {
    sk: "Tráva je zelená.",
    ua: "Трава зелена.",
    ru: "Трава зелёная.",
    tokens: ["Tráva", "je", "zelená", "."],
  },
  [key("zviera", "тварина")]: {
    sk: "To zviera je tu.",
    ua: "Ця тварина тут.",
    ru: "Это животное здесь.",
    tokens: ["To", "zviera", "je", "tu", "."],
  },
  [key("zem", "земля")]: {
    sk: "Zem je veľká.",
    ua: "Земля велика.",
    ru: "Земля большая.",
    tokens: ["Zem", "je", "veľká", "."],
  },

  // =========================
  // LESSON 18 — Побут
  // =========================
  [key("domácnosť", "побут")]: {
    sk: "Domácnosť je dôležitá.",
    ua: "Побут важливий.",
    ru: "Быт важен.",
    tokens: ["Domácnosť", "je", "dôležitá", "."],
  },
  [key("dom", "дім")]: {
    sk: "Toto je dom.",
    ua: "Це дім.",
    ru: "Это дом.",
    tokens: ["Toto", "je", "dom", "."],
  },
  [key("byt", "квартира")]: {
    sk: "Mám byt.",
    ua: "У мене є квартира.",
    ru: "У меня есть квартира.",
    tokens: ["Mám", "byt", "."],
  },
  [key("izba", "кімната")]: {
    sk: "Toto je izba.",
    ua: "Це кімната.",
    ru: "Это комната.",
    tokens: ["Toto", "je", "izba", "."],
  },
  [key("posteľ", "ліжко")]: {
    sk: "Tu je posteľ.",
    ua: "Тут ліжко.",
    ru: "Здесь кровать.",
    tokens: ["Tu", "je", "posteľ", "."],
  },
  [key("stôl", "стіл")]: {
    sk: "Stôl je veľký.",
    ua: "Стіл великий.",
    ru: "Стол большой.",
    tokens: ["Stôl", "je", "veľký", "."],
  },
  [key("stolička", "стілець")]: {
    sk: "Stolička je tu.",
    ua: "Стілець тут.",
    ru: "Стул здесь.",
    tokens: ["Stolička", "je", "tu", "."],
  },
  [key("kuchyňa", "кухня")]: {
    sk: "Kuchyňa je čistá.",
    ua: "Кухня чиста.",
    ru: "Кухня чистая.",
    tokens: ["Kuchyňa", "je", "čistá", "."],
  },
  [key("chladnička", "холодильник")]: {
    sk: "Chladnička je plná.",
    ua: "Холодильник повний.",
    ru: "Холодильник полный.",
    tokens: ["Chladnička", "je", "plná", "."],
  },
  [key("upratovať", "прибирати")]: {
    sk: "Idem upratovať.",
    ua: "Я йду прибирати.",
    ru: "Я иду убирать.",
    tokens: ["Idem", "upratovať", "."],
  },

  // =========================
  // LESSON 19 — Дії та дієслова
  // =========================
  [key("robiť", "робити")]: {
    sk: "Čo robíš?",
    ua: "Що ти робиш?",
    ru: "Что ты делаешь?",
    tokens: ["Čo", "robíš", "?"],
  },
  [key("ísť", "йти")]: {
    sk: "Idem domov.",
    ua: "Я йду додому.",
    ru: "Я иду домой.",
    tokens: ["Idem", "domov", "."],
  },
  [key("prísť", "прийти")]: {
    sk: "Prídem zajtra.",
    ua: "Я прийду завтра.",
    ru: "Я приду завтра.",
    tokens: ["Prídem", "zajtra", "."],
  },
  [key("vidieť", "бачити")]: {
    sk: "Vidím ťa.",
    ua: "Я бачу тебе.",
    ru: "Я вижу тебя.",
    tokens: ["Vidím", "ťa", "."],
  },
  [key("hovoriť", "говорити")]: {
    sk: "Hovorím po slovensky.",
    ua: "Я говорю словацькою.",
    ru: "Я говорю по-словацки.",
    tokens: ["Hovorím", "po", "slovensky", "."],
  },
  [key("jesť", "їсти")]: {
    sk: "Jem obed.",
    ua: "Я їм обід.",
    ru: "Я ем обед.",
    tokens: ["Jem", "obed", "."],
  },
  [key("piť", "пити")]: {
    sk: "Pijem vodu.",
    ua: "Я п’ю воду.",
    ru: "Я пью воду.",
    tokens: ["Pijem", "vodu", "."],
  },
  [key("spať", "спати")]: {
    sk: "Spím v noci.",
    ua: "Я сплю вночі.",
    ru: "Я сплю ночью.",
    tokens: ["Spím", "v", "noci", "."],
  },
  [key("pracovať", "працювати")]: {
    sk: "Pracujem dnes.",
    ua: "Я працюю сьогодні.",
    ru: "Я работаю сегодня.",
    tokens: ["Pracujem", "dnes", "."],
  },
  [key("učiť sa", "вчитися")]: {
    sk: "Učím sa po slovensky.",
    ua: "Я вчуся словацькою.",
    ru: "Я учусь словацкому.",
    tokens: ["Učím", "sa", "po", "slovensky", "."],
  },

  // =========================
  // LESSON 20 — Питання і відповіді
  // =========================
  [key("kto", "хто")]: {
    sk: "Kto je to?",
    ua: "Хто це?",
    ru: "Кто это?",
    tokens: ["Kto", "je", "to", "?"],
  },
  [key("čo", "що")]: {
    sk: "Čo je to?",
    ua: "Що це?",
    ru: "Что это?",
    tokens: ["Čo", "je", "to", "?"],
  },
  [key("kde", "де")]: {
    sk: "Kde si?",
    ua: "Де ти?",
    ru: "Где ты?",
    tokens: ["Kde", "si", "?"],
  },
  [key("kedy", "коли")]: {
    sk: "Kedy prídeš?",
    ua: "Коли ти прийдеш?",
    ru: "Когда ты придёшь?",
    tokens: ["Kedy", "prídeš", "?"],
  },
  [key("prečo", "чому")]: {
    sk: "Prečo si tu?",
    ua: "Чому ти тут?",
    ru: "Почему ты здесь?",
    tokens: ["Prečo", "si", "tu", "?"],
  },
  [key("ako", "як")]: {
    sk: "Ako sa máš?",
    ua: "Як ти?",
    ru: "Как ты?",
    tokens: ["Ako", "sa", "máš", "?"],
  },
  [key("koľko", "скільки")]: {
    sk: "Koľko to stojí?",
    ua: "Скільки це коштує?",
    ru: "Сколько это стоит?",
    tokens: ["Koľko", "to", "stojí", "?"],
  },
  [key("áno", "так")]: {
    sk: "Áno, ďakujem.",
    ua: "Так, дякую.",
    ru: "Да, спасибо.",
    tokens: ["Áno", ",", "ďakujem", "."],
  },
  [key("nie", "ні")]: {
    sk: "Nie, ďakujem.",
    ua: "Ні, дякую.",
    ru: "Нет, спасибо.",
    tokens: ["Nie", ",", "ďakujem", "."],
  },
  [key("možno", "можливо")]: {
    sk: "Možno zajtra.",
    ua: "Можливо завтра.",
    ru: "Возможно завтра.",
    tokens: ["Možno", "zajtra", "."],
  },
};

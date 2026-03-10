import type { Phrase } from "./a1";
import { phraseKey } from "./phraseKey";

export const A1_PHRASES_2: Record<string, Phrase> = {
  // =========================
  // A1-11 — Опис людини
  // =========================

  [phraseKey("vysoký", "a1-11")]: {
    sk: "On je veľmi vysoký.",
    ua: "Він дуже високий.",
    ru: "Он очень высокий.",
    tokens: ["On", "je", "veľmi", "vysoký", "."],
  },

  [phraseKey("nízky", "a1-11")]: {
    sk: "Môj brat je nízky.",
    ua: "Мій брат низький.",
    ru: "Мой брат низкий.",
    tokens: ["Môj", "brat", "je", "nízky", "."],
  },

  [phraseKey("mladý", "a1-11")]: {
    sk: "Je ešte mladý.",
    ua: "Він ще молодий.",
    ru: "Он ещё молодой.",
    tokens: ["Je", "ešte", "mladý", "."],
  },

  [phraseKey("starý", "a1-11")]: {
    sk: "Ten dom je starý.",
    ua: "Той будинок старий.",
    ru: "Тот дом старый.",
    tokens: ["Ten", "dom", "je", "starý", "."],
  },

  [phraseKey("silný", "a1-11")]: {
    sk: "Je silný a zdravý.",
    ua: "Він сильний і здоровий.",
    ru: "Он сильный и здоровый.",
    tokens: ["Je", "silný", "a", "zdravý", "."],
  },

  [phraseKey("slabý", "a1-11")]: {
    sk: "Som dnes slabý.",
    ua: "Я сьогодні слабкий.",
    ru: "Я сегодня слабый.",
    tokens: ["Som", "dnes", "slabý", "."],
  },

  [phraseKey("pekný", "a1-11")]: {
    sk: "To je pekný park.",
    ua: "Це гарний парк.",
    ru: "Это красивый парк.",
    tokens: ["To", "je", "pekný", "park", "."],
  },

  [phraseKey("škaredý", "a1-11")]: {
    sk: "To nie je škaredý obraz.",
    ua: "Це не негарна картина.",
    ru: "Это не уродливая картина.",
    tokens: ["To", "nie", "je", "škaredý", "obraz", "."],
  },

  [phraseKey("milý", "a1-11")]: {
    sk: "Je veľmi milý.",
    ua: "Він дуже милий.",
    ru: "Он очень милый.",
    tokens: ["Je", "veľmi", "milý", "."],
  },

  [phraseKey("vážny", "a1-11")]: {
    sk: "Je vážny človek.",
    ua: "Він серйозна людина.",
    ru: "Он серьёзный человек.",
    tokens: ["Je", "vážny", "človek", "."],
  },

  // =========================
  // A1-12 — Час
  // =========================

  [phraseKey("ráno", "a1-12")]: {
    sk: "Ráno vstávam o siedmej.",
    ua: "Вранці я встаю о сьомій.",
    ru: "Утром я встаю в семь.",
    tokens: ["Ráno", "vstávam", "o", "siedmej", "."],
  },

  [phraseKey("obed", "a1-12")]: {
    sk: "Obed máme o dvanástej.",
    ua: "Обід у нас о дванадцятій.",
    ru: "Обед у нас в двенадцать.",
    tokens: ["Obed", "máme", "o", "dvanástej", "."],
  },

  [phraseKey("večer", "a1-12")]: {
    sk: "Večer pozerám film.",
    ua: "Ввечері я дивлюся фільм.",
    ru: "Вечером я смотрю фильм.",
    tokens: ["Večer", "pozerám", "film", "."],
  },

  [phraseKey("polnoc", "a1-12")]: {
    sk: "Je už polnoc.",
    ua: "Вже північ.",
    ru: "Уже полночь.",
    tokens: ["Je", "už", "polnoc", "."],
  },

  [phraseKey("dnes", "a1-12")]: {
    sk: "Dnes pracujem doma.",
    ua: "Сьогодні я працюю вдома.",
    ru: "Сегодня я работаю дома.",
    tokens: ["Dnes", "pracujem", "doma", "."],
  },

  [phraseKey("zajtra", "a1-12")]: {
    sk: "Zajtra idem do práce.",
    ua: "Завтра я йду на роботу.",
    ru: "Завтра я иду на работу.",
    tokens: ["Zajtra", "idem", "do", "práce", "."],
  },

  [phraseKey("pozajtra", "a1-12")]: {
    sk: "Pozajtra máme stretnutie.",
    ua: "Післязавтра у нас зустріч.",
    ru: "Послезавтра у нас встреча.",
    tokens: ["Pozajtra", "máme", "stretnutie", "."],
  },

  [phraseKey("vždy", "a1-12")]: {
    sk: "Vždy vstávam skoro.",
    ua: "Я завжди встаю рано.",
    ru: "Я всегда встаю рано.",
    tokens: ["Vždy", "vstávam", "skoro", "."],
  },

  [phraseKey("často", "a1-12")]: {
    sk: "Často chodím do kina.",
    ua: "Я часто ходжу в кіно.",
    ru: "Я часто хожу в кино.",
    tokens: ["Často", "chodím", "do", "kina", "."],
  },

  [phraseKey("niekedy", "a1-12")]: {
    sk: "Niekedy som unavený.",
    ua: "Інколи я втомлений.",
    ru: "Иногда я уставший.",
    tokens: ["Niekedy", "som", "unavený", "."],
  },

  // =========================
  // A1-13 — Дім
  // =========================

  [phraseKey("chodba", "a1-13")]: {
    sk: "V chodbe je skriňa.",
    ua: "У коридорі є шафа.",
    ru: "В коридоре есть шкаф.",
    tokens: ["V", "chodbe", "je", "skriňa", "."],
  },

  [phraseKey("balkón", "a1-13")]: {
    sk: "Máme balkón s výhľadom.",
    ua: "У нас є балкон з видом.",
    ru: "У нас есть балкон с видом.",
    tokens: ["Máme", "balkón", "s", "výhľadom", "."],
  },

  [phraseKey("pivnica", "a1-13")]: {
    sk: "V pivnici je bicykel.",
    ua: "У підвалі є велосипед.",
    ru: "В подвале есть велосипед.",
    tokens: ["V", "pivnici", "je", "bicykel", "."],
  },

  [phraseKey("výťah", "a1-13")]: {
    sk: "Idem výťahom na tretie poschodie.",
    ua: "Я їду ліфтом на третій поверх.",
    ru: "Я еду на лифте на третий этаж.",
    tokens: ["Idem", "výťahom", "na", "tretie", "poschodie", "."],
  },

  [phraseKey("schody", "a1-13")]: {
    sk: "Po schodoch je to rýchlejšie.",
    ua: "Сходами це швидше.",
    ru: "По лестнице это быстрее.",
    tokens: ["Po", "schodoch", "je", "to", "rýchlejšie", "."],
  },

  [phraseKey("záhrada", "a1-13")]: {
    sk: "V záhrade je veľa kvetov.",
    ua: "У саду багато квітів.",
    ru: "В саду много цветов.",
    tokens: ["V", "záhrade", "je", "veľa", "kvetov", "."],
  },

  [phraseKey("garáž", "a1-13")]: {
    sk: "Auto je v garáži.",
    ua: "Авто в гаражі.",
    ru: "Машина в гараже.",
    tokens: ["Auto", "je", "v", "garáži", "."],
  },

  [phraseKey("stena", "a1-13")]: {
    sk: "Na stene visí obraz.",
    ua: "На стіні висить картина.",
    ru: "На стене висит картина.",
    tokens: ["Na", "stene", "visí", "obraz", "."],
  },

  [phraseKey("strop", "a1-13")]: {
    sk: "Strop je veľmi vysoký.",
    ua: "Стеля дуже висока.",
    ru: "Потолок очень высокий.",
    tokens: ["Strop", "je", "veľmi", "vysoký", "."],
  },

  [phraseKey("podlaha", "a1-13")]: {
    sk: "Podlaha je čistá.",
    ua: "Підлога чиста.",
    ru: "Пол чистый.",
    tokens: ["Podlaha", "je", "čistá", "."],
  },

  // =========================
  // A1-14 — Покупки
  // =========================

  [phraseKey("predávať", "a1-14")]: {
    sk: "V tomto obchode predávajú oblečenie.",
    ua: "У цьому магазині продають одяг.",
    ru: "В этом магазине продают одежду.",
    tokens: ["V", "tomto", "obchode", "predávajú", "oblečenie", "."],
  },

  [phraseKey("kupovať", "a1-14")]: {
    sk: "Rád kupujem čerstvé ovocie.",
    ua: "Я люблю купувати свіжі фрукти.",
    ru: "Я люблю покупать свежие фрукты.",
    tokens: ["Rád", "kupujem", "čerstvé", "ovocie", "."],
  },

  [phraseKey("lacný", "a1-14")]: {
    sk: "Toto je lacný výrobok.",
    ua: "Це дешевий товар.",
    ru: "Это дешёвый товар.",
    tokens: ["Toto", "je", "lacný", "výrobok", "."],
  },

  [phraseKey("drahý", "a1-14")]: {
    sk: "Táto bunda je drahá.",
    ua: "Ця куртка дорога.",
    ru: "Эта куртка дорогая.",
    tokens: ["Táto", "bunda", "je", "drahá", "."],
  },

  [phraseKey("kvalita", "a1-14")]: {
    sk: "Kvalita je veľmi dobrá.",
    ua: "Якість дуже добра.",
    ru: "Качество очень хорошее.",
    tokens: ["Kvalita", "je", "veľmi", "dobrá", "."],
  },

  [phraseKey("značka", "a1-14")]: {
    sk: "Je to známa značka.",
    ua: "Це відомий бренд.",
    ru: "Это известный бренд.",
    tokens: ["Je", "to", "známa", "značka", "."],
  },

  [phraseKey("akcia", "a1-14")]: {
    sk: "Dnes je akcia na topánky.",
    ua: "Сьогодні акція на взуття.",
    ru: "Сегодня акция на обувь.",
    tokens: ["Dnes", "je", "akcia", "na", "topánky", "."],
  },

  [phraseKey("zľavnený", "a1-14")]: {
    sk: "Tento tovar je zľavnený.",
    ua: "Цей товар зі знижкою.",
    ru: "Этот товар со скидкой.",
    tokens: ["Tento", "tovar", "je", "zľavnený", "."],
  },

  [phraseKey("pokladňa", "a1-14")]: {
    sk: "Pokladňa je vpravo.",
    ua: "Каса праворуч.",
    ru: "Касса справа.",
    tokens: ["Pokladňa", "je", "vpravo", "."],
  },

  [phraseKey("blok", "a1-14")]: {
    sk: "Prosím, dajte mi blok.",
    ua: "Будь ласка, дайте мені чек.",
    ru: "Пожалуйста, дайте мне чек.",
    tokens: ["Prosím", ",", "dajte", "mi", "blok", "."],
  },

  // =========================
  // A1-15 — Подорожі
  // =========================

  [phraseKey("hotel", "a1-15")]: {
    sk: "Bývame v hoteli v centre.",
    ua: "Ми живемо в готелі в центрі.",
    ru: "Мы живём в отеле в центре.",
    tokens: ["Bývame", "v", "hoteli", "v", "centre", "."],
  },

  [phraseKey("ubytovanie", "a1-15")]: {
    sk: "Hľadám lacné ubytovanie.",
    ua: "Я шукаю дешеве проживання.",
    ru: "Я ищу недорогое жильё.",
    tokens: ["Hľadám", "lacné", "ubytovanie", "."],
  },

  [phraseKey("turista", "a1-15")]: {
    sk: "V lete je tu veľa turistov.",
    ua: "Влітку тут багато туристів.",
    ru: "Летом здесь много туристов.",
    tokens: ["V", "lete", "je", "tu", "veľa", "turistov", "."],
  },

  [phraseKey("sprievodca", "a1-15")]: {
    sk: "Sprievodca nám všetko vysvetlí.",
    ua: "Гід нам усе пояснить.",
    ru: "Гид нам всё объяснит.",
    tokens: ["Sprievodca", "nám", "všetko", "vysvetlí", "."],
  },

  [phraseKey("výlet", "a1-15")]: {
    sk: "Zajtra ideme na výlet.",
    ua: "Завтра ми йдемо на екскурсію.",
    ru: "Завтра мы идём на экскурсию.",
    tokens: ["Zajtra", "ideme", "na", "výlet", "."],
  },

  [phraseKey("pláž", "a1-15")]: {
    sk: "Na pláži je dnes teplo.",
    ua: "На пляжі сьогодні тепло.",
    ru: "На пляже сегодня тепло.",
    tokens: ["Na", "pláži", "je", "dnes", "teplo", "."],
  },

  [phraseKey("hory", "a1-15")]: {
    sk: "V zime chodíme do hôr.",
    ua: "Взимку ми їздимо в гори.",
    ru: "Зимой мы ездим в горы.",
    tokens: ["V", "zime", "chodíme", "do", "hôr", "."],
  },

  [phraseKey("more", "a1-15")]: {
    sk: "More je veľmi studené.",
    ua: "Море дуже холодне.",
    ru: "Море очень холодное.",
    tokens: ["More", "je", "veľmi", "studené", "."],
  },

  [phraseKey("rezervovať", "a1-15")]: {
    sk: "Chcem rezervovať izbu.",
    ua: "Я хочу забронювати кімнату.",
    ru: "Я хочу забронировать номер.",
    tokens: ["Chcem", "rezervovať", "izbu", "."],
  },

  [phraseKey("dovolenka", "a1-15")]: {
    sk: "V auguste mám dovolenku.",
    ua: "У серпні в мене відпустка.",
    ru: "В августе у меня отпуск.",
    tokens: ["V", "auguste", "mám", "dovolenku", "."],
  },

  // =========================
  // A1-16 — Здоровʼя
  // =========================

  [phraseKey("bolieť", "a1-16")]: {
    sk: "Boli ma hlava.",
    ua: "У мене болить голова.",
    ru: "У меня болит голова.",
    tokens: ["Boli", "ma", "hlava", "."],
  },

  [phraseKey("hlava", "a1-16")]: {
    sk: "Mám silnú bolesť hlavy.",
    ua: "У мене сильний головний біль.",
    ru: "У меня сильная головная боль.",
    tokens: ["Mám", "silnú", "bolesť", "hlavy", "."],
  },

  [phraseKey("zub", "a1-16")]: {
    sk: "Boli ma zub.",
    ua: "У мене болить зуб.",
    ru: "У меня болит зуб.",
    tokens: ["Boli", "ma", "zub", "."],
  },

  [phraseKey("žalúdok", "a1-16")]: {
    sk: "Bolie ma žalúdok.",
    ua: "У мене болить шлунок.",
    ru: "У меня болит желудок.",
    tokens: ["Bolie", "ma", "žalúdok", "."],
  },

  [phraseKey("tabletka", "a1-16")]: {
    sk: "Vezmite si jednu tabletku.",
    ua: "Прийміть одну таблетку.",
    ru: "Примите одну таблетку.",
    tokens: ["Vezmite", "si", "jednu", "tabletku", "."],
  },

  [phraseKey("sirup", "a1-16")]: {
    sk: "Tento sirup je na kašeľ.",
    ua: "Цей сироп від кашлю.",
    ru: "Этот сироп от кашля.",
    tokens: ["Tento", "sirup", "je", "na", "kašeľ", "."],
  },

  [phraseKey("odpočívať", "a1-16")]: {
    sk: "Musím viac odpočívať.",
    ua: "Мені треба більше відпочивати.",
    ru: "Мне нужно больше отдыхать.",
    tokens: ["Musím", "viac", "odpočívať", "."],
  },

  [phraseKey("zdravý", "a1-16")]: {
    sk: "Chcem byť zdravý.",
    ua: "Я хочу бути здоровим.",
    ru: "Я хочу быть здоровым.",
    tokens: ["Chcem", "byť", "zdravý", "."],
  },

  [phraseKey("chorý", "a1-16")]: {
    sk: "Som chorý, nejdem do práce.",
    ua: "Я хворий, не йду на роботу.",
    ru: "Я болен, не иду на работу.",
    tokens: ["Som", "chorý", ",", "nejdem", "do", "práce", "."],
  },

  [phraseKey("liečiť", "a1-16")]: {
    sk: "Lekár ma bude liečiť.",
    ua: "Лікар буде мене лікувати.",
    ru: "Врач будет меня лечить.",
    tokens: ["Lekár", "ma", "bude", "liečiť", "."],
  },

  // =========================
  // A1-17 — Робота
  // =========================

  [phraseKey("zamestnanec", "a1-17")]: {
    sk: "Som zamestnanec v tejto firme.",
    ua: "Я працівник у цій фірмі.",
    ru: "Я сотрудник в этой фирме.",
    tokens: ["Som", "zamestnanec", "v", "tejto", "firme", "."],
  },

  [phraseKey("zamestnávateľ", "a1-17")]: {
    sk: "Môj zamestnávateľ je férový.",
    ua: "Мій роботодавець чесний.",
    ru: "Мой работодатель честный.",
    tokens: ["Môj", "zamestnávateľ", "je", "férový", "."],
  },

  [phraseKey("plat", "a1-17")]: {
    sk: "Plat dostávam každý mesiac.",
    ua: "Зарплату я отримую щомісяця.",
    ru: "Зарплату я получаю каждый месяц.",
    tokens: ["Plat", "dostávam", "každý", "mesiac", "."],
  },

  [phraseKey("pracovná zmluva", "a1-17")]: {
    sk: "Podpísal som pracovnú zmluvu.",
    ua: "Я підписав трудовий договір.",
    ru: "Я подписал трудовой договор.",
    tokens: ["Podpísal", "som", "pracovnú", "zmluvu", "."],
  },

  [phraseKey("prax", "a1-17")]: {
    sk: "Mám prax v tejto práci.",
    ua: "У мене є досвід роботи в цій роботі.",
    ru: "У меня есть опыт работы в этой сфере.",
    tokens: ["Mám", "prax", "v", "tejto", "práci", "."],
  },

  [phraseKey("kariéra", "a1-17")]: {
    sk: "Chcem zlepšiť svoju kariéru.",
    ua: "Я хочу покращити свою карʼєру.",
    ru: "Я хочу улучшить свою карьеру.",
    tokens: ["Chcem", "zlepšiť", "svoju", "kariéru", "."],
  },

  [phraseKey("povýšenie", "a1-17")]: {
    sk: "Dostal som povýšenie.",
    ua: "Я отримав підвищення.",
    ru: "Я получил повышение.",
    tokens: ["Dostal", "som", "povýšenie", "."],
  },

  [phraseKey("výpoveď", "a1-17")]: {
    sk: "Dal som výpoveď.",
    ua: "Я подав заяву на звільнення.",
    ru: "Я подал заявление на увольнение.",
    tokens: ["Dal", "som", "výpoveď", "."],
  },

  [phraseKey("povinnosť", "a1-17")]: {
    sk: "Je to moja povinnosť.",
    ua: "Це мій обовʼязок.",
    ru: "Это моя обязанность.",
    tokens: ["Je", "to", "moja", "povinnosť", "."],
  },

  [phraseKey("právo", "a1-17")]: {
    sk: "Mám právo na prestávku.",
    ua: "Я маю право на перерву.",
    ru: "У меня есть право на перерыв.",
    tokens: ["Mám", "právo", "na", "prestávku", "."],
  },

  // =========================
  // A1-18 — Спілкування
  // =========================

  [phraseKey("rozumieť", "a1-18")]: {
    sk: "Rozumiem vám.",
    ua: "Я вас розумію.",
    ru: "Я вас понимаю.",
    tokens: ["Rozumiem", "vám", "."],
  },

  [phraseKey("vysvetliť", "a1-18")]: {
    sk: "Môžete mi to vysvetliť?",
    ua: "Можете мені це пояснити?",
    ru: "Можете мне это объяснить?",
    tokens: ["Môžete", "mi", "to", "vysvetliť", "?"],
  },

  [phraseKey("opýtať sa", "a1-18")]: {
    sk: "Chcem sa opýtať jednu otázku.",
    ua: "Я хочу запитати одне питання.",
    ru: "Я хочу задать один вопрос.",
    tokens: ["Chcem", "sa", "opýtať", "jednu", "otázku", "."],
  },

  [phraseKey("odpoveď", "a1-18")]: {
    sk: "Ďakujem za odpoveď.",
    ua: "Дякую за відповідь.",
    ru: "Спасибо за ответ.",
    tokens: ["Ďakujem", "za", "odpoveď", "."],
  },

  [phraseKey("názor", "a1-18")]: {
    sk: "Aký je tvoj názor?",
    ua: "Яка твоя думка?",
    ru: "Какое твоё мнение?",
    tokens: ["Aký", "je", "tvoj", "názor", "?"],
  },

  [phraseKey("súhlasiť", "a1-18")]: {
    sk: "Súhlasím s tebou.",
    ua: "Я погоджуюся з тобою.",
    ru: "Я согласен с тобой.",
    tokens: ["Súhlasím", "s", "tebou", "."],
  },

  [phraseKey("nesúhlasiť", "a1-18")]: {
    sk: "Nesúhlasím s tým.",
    ua: "Я з цим не погоджуюся.",
    ru: "Я с этим не согласен.",
    tokens: ["Nesúhlasím", "s", "tým", "."],
  },

  [phraseKey("diskutovať", "a1-18")]: {
    sk: "Môžeme o tom diskutovať.",
    ua: "Ми можемо це обговорити.",
    ru: "Мы можем это обсудить.",
    tokens: ["Môžeme", "o", "tom", "diskutovať", "."],
  },

  [phraseKey("hovor", "a1-18")]: {
    sk: "Máme krátky hovor.",
    ua: "У нас коротка розмова.",
    ru: "У нас короткий разговор.",
    tokens: ["Máme", "krátky", "hovor", "."],
  },

  [phraseKey("kontakt", "a1-18")]: {
    sk: "Pošlem vám kontakt.",
    ua: "Я надішлю вам контакт.",
    ru: "Я отправлю вам контакт.",
    tokens: ["Pošlem", "vám", "kontakt", "."],
  },

  // =========================
  // A1-19 — Технології
  // =========================

  [phraseKey("mobil", "a1-19")]: {
    sk: "Môj mobil je vybitý.",
    ua: "Мій мобільний телефон розрядився.",
    ru: "Мой телефон разрядился.",
    tokens: ["Môj", "mobil", "je", "vybitý", "."],
  },

  [phraseKey("nabíjačka", "a1-19")]: {
    sk: "Kde je nabíjačka?",
    ua: "Де зарядка?",
    ru: "Где зарядка?",
    tokens: ["Kde", "je", "nabíjačka", "?"],
  },

  [phraseKey("správa", "a1-19")]: {
    sk: "Poslal som ti správu.",
    ua: "Я надіслав тобі повідомлення.",
    ru: "Я отправил тебе сообщение.",
    tokens: ["Poslal", "som", "ti", "správu", "."],
  },

  [phraseKey("hovor", "a1-19")]: {
    sk: "Mám dôležitý hovor.",
    ua: "У мене важливий дзвінок.",
    ru: "У меня важный звонок.",
    tokens: ["Mám", "dôležitý", "hovor", "."],
  },

  [phraseKey("internet", "a1-19")]: {
    sk: "Internet dnes nefunguje.",
    ua: "Інтернет сьогодні не працює.",
    ru: "Интернет сегодня не работает.",
    tokens: ["Internet", "dnes", "nefunguje", "."],
  },

  [phraseKey("wifi", "a1-19")]: {
    sk: "Máte tu wifi?",
    ua: "У вас є тут вайфай?",
    ru: "У вас тут есть вай-фай?",
    tokens: ["Máte", "tu", "wifi", "?"],
  },

  [phraseKey("sociálne siete", "a1-19")]: {
    sk: "Som na sociálnych sieťach.",
    ua: "Я є в соціальних мережах.",
    ru: "Я есть в социальных сетях.",
    tokens: ["Som", "na", "sociálnych", "sieťach", "."],
  },

  [phraseKey("profil", "a1-19")]: {
    sk: "Mám nový profil.",
    ua: "У мене новий профіль.",
    ru: "У меня новый профиль.",
    tokens: ["Mám", "nový", "profil", "."],
  },

  [phraseKey("heslo", "a1-19")]: {
    sk: "Zabudol som heslo.",
    ua: "Я забув пароль.",
    ru: "Я забыл пароль.",
    tokens: ["Zabudol", "som", "heslo", "."],
  },

  [phraseKey("stiahnuť", "a1-19")]: {
    sk: "Chcem stiahnuť túto aplikáciu.",
    ua: "Я хочу завантажити цей додаток.",
    ru: "Я хочу скачать это приложение.",
    tokens: ["Chcem", "stiahnuť", "túto", "aplikáciu", "."],
  },

  // =========================
  // A1-20 — Повсякденні дії
  // =========================

  [phraseKey("vstať", "a1-20")]: {
    sk: "Musím vstať skoro.",
    ua: "Мені треба встати рано.",
    ru: "Мне нужно встать рано.",
    tokens: ["Musím", "vstať", "skoro", "."],
  },

  [phraseKey("ísť do práce", "a1-20")]: {
    sk: "Každý deň idem do práce.",
    ua: "Щодня я йду на роботу.",
    ru: "Каждый день я иду на работу.",
    tokens: ["Každý", "deň", "idem", "do", "práce", "."],
  },

  [phraseKey("nakupovať", "a1-20")]: {
    sk: "V sobotu chodím nakupovať.",
    ua: "У суботу я ходжу робити покупки.",
    ru: "В субботу я хожу за покупками.",
    tokens: ["V", "sobotu", "chodím", "nakupovať", "."],
  },

  [phraseKey("oddýchnuť si", "a1-20")]: {
    sk: "Potrebujem si oddýchnuť.",
    ua: "Мені потрібно відпочити.",
    ru: "Мне нужно отдохнуть.",
    tokens: ["Potrebujem", "si", "oddýchnuť", "."],
  },

  [phraseKey("stretnúť sa", "a1-20")]: {
    sk: "Chcem sa stretnúť s kamarátom.",
    ua: "Я хочу зустрітися з другом.",
    ru: "Я хочу встретиться с другом.",
    tokens: ["Chcem", "sa", "stretnúť", "s", "kamarátom", "."],
  },

  [phraseKey("telefonovať", "a1-20")]: {
    sk: "Večer budem telefonovať.",
    ua: "Ввечері я буду телефонувати.",
    ru: "Вечером я буду звонить.",
    tokens: ["Večer", "budem", "telefonovať", "."],
  },

  [phraseKey("variť", "a1-20")]: {
    sk: "Dnes budem variť večeru.",
    ua: "Сьогодні я буду готувати вечерю.",
    ru: "Сегодня я буду готовить ужин.",
    tokens: ["Dnes", "budem", "variť", "večeru", "."],
  },

  [phraseKey("pozerať", "a1-20")]: {
    sk: "Rád pozerám šport.",
    ua: "Я люблю дивитися спорт.",
    ru: "Я люблю смотреть спорт.",
    tokens: ["Rád", "pozerám", "šport", "."],
  },

  [phraseKey("čítať", "a1-20")]: {
    sk: "Večer rád čítam knihu.",
    ua: "Ввечері я люблю читати книгу.",
    ru: "Вечером я люблю читать книгу.",
    tokens: ["Večer", "rád", "čítam", "knihu", "."],
  },

  [phraseKey("spať", "a1-20")]: {
    sk: "Chcem už spať.",
    ua: "Я вже хочу спати.",
    ru: "Я уже хочу спать.",
    tokens: ["Chcem", "už", "spať", "."],
  },
};
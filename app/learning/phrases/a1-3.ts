import type { Phrase } from "./a1";
import { phraseKey } from "./phraseKey";

export const A1_PHRASES_3: Record<string, Phrase> = {
  // =========================
  // A1-21 — Проблеми і ситуації
  // =========================

  [phraseKey("problém", "проблема", "a1-21")]: {
    sk: "Mám problém.",
    ua: "У мене проблема.",
    ru: "У меня проблема.",
    tokens: ["Mám", "problém", "."],
  },

  [phraseKey("pokazený", "зламаний", "a1-21")]: {
    sk: "Telefón je pokazený.",
    ua: "Телефон зламаний.",
    ru: "Телефон сломан.",
    tokens: ["Telefón", "je", "pokazený", "."],
  },

  [phraseKey("stratiť", "загубити", "a1-21")]: {
    sk: "Stratil som kľúče.",
    ua: "Я загубив ключі.",
    ru: "Я потерял ключи.",
    tokens: ["Stratil", "som", "kľúče", "."],
  },

  [phraseKey("nájsť", "знайти", "a1-21")]: {
    sk: "Nemôžem nájsť mobil.",
    ua: "Я не можу знайти телефон.",
    ru: "Я не могу найти телефон.",
    tokens: ["Nemôžem", "nájsť", "mobil", "."],
  },

  [phraseKey("meškať", "запізнюватися", "a1-21")]: {
    sk: "Prepáčte, meškám.",
    ua: "Вибачте, я запізнююся.",
    ru: "Извините, я опаздываю.",
    tokens: ["Prepáčte", ",", "meškám", "."],
  },

  [phraseKey("zabudnúť", "забути", "a1-21")]: {
    sk: "Zabudol som heslo.",
    ua: "Я забув пароль.",
    ru: "Я забыл пароль.",
    tokens: ["Zabudol", "som", "heslo", "."],
  },

  [phraseKey("chyba", "помилка", "a1-21")]: {
    sk: "Je tu chyba.",
    ua: "Тут є помилка.",
    ru: "Тут ошибка.",
    tokens: ["Je", "tu", "chyba", "."],
  },

  [phraseKey("oprava", "ремонт", "a1-21")]: {
    sk: "Potrebujem opravu.",
    ua: "Мені потрібен ремонт.",
    ru: "Мне нужен ремонт.",
    tokens: ["Potrebujem", "opravu", "."],
  },

  [phraseKey("pomoc", "допомога", "a1-21")]: {
    sk: "Potrebujem pomoc.",
    ua: "Мені потрібна допомога.",
    ru: "Мне нужна помощь.",
    tokens: ["Potrebujem", "pomoc", "."],
  },

  [phraseKey("riešenie", "рішення", "a1-21")]: {
    sk: "Máme riešenie.",
    ua: "У нас є рішення.",
    ru: "У нас есть решение.",
    tokens: ["Máme", "riešenie", "."],
  },

  // =========================
  // A1-22 — Напрямки
  // =========================

  [phraseKey("vpravo", "праворуч", "a1-22")]: {
    sk: "Odbočte vpravo.",
    ua: "Поверніть праворуч.",
    ru: "Поверните направо.",
    tokens: ["Odbočte", "vpravo", "."],
  },

  [phraseKey("vľavo", "ліворуч", "a1-22")]: {
    sk: "Odbočte vľavo.",
    ua: "Поверніть ліворуч.",
    ru: "Поверните налево.",
    tokens: ["Odbočte", "vľavo", "."],
  },

  [phraseKey("rovno", "прямо", "a1-22")]: {
    sk: "Choďte rovno.",
    ua: "Ідіть прямо.",
    ru: "Идите прямо.",
    tokens: ["Choďte", "rovno", "."],
  },

  [phraseKey("blízko", "близько", "a1-22")]: {
    sk: "Je to blízko.",
    ua: "Це близько.",
    ru: "Это близко.",
    tokens: ["Je", "to", "blízko", "."],
  },

  [phraseKey("ďaleko", "далеко", "a1-22")]: {
    sk: "Nie je to ďaleko.",
    ua: "Це не далеко.",
    ru: "Это не далеко.",
    tokens: ["Nie", "je", "to", "ďaleko", "."],
  },

  [phraseKey("hore", "вгору", "a1-22")]: {
    sk: "Choďte hore po schodoch.",
    ua: "Підійдіть вгору по сходах.",
    ru: "Поднимитесь вверх по лестнице.",
    tokens: ["Choďte", "hore", "po", "schodoch", "."],
  },

  [phraseKey("dole", "вниз", "a1-22")]: {
    sk: "Choďte dole.",
    ua: "Ідіть вниз.",
    ru: "Идите вниз.",
    tokens: ["Choďte", "dole", "."],
  },

  [phraseKey("pred", "перед", "a1-22")]: {
    sk: "Zastávka je pred obchodom.",
    ua: "Зупинка перед магазином.",
    ru: "Остановка перед магазином.",
    tokens: ["Zastávka", "je", "pred", "obchodom", "."],
  },

  [phraseKey("za", "за", "a1-22")]: {
    sk: "Park je za domom.",
    ua: "Парк за будинком.",
    ru: "Парк за домом.",
    tokens: ["Park", "je", "za", "domom", "."],
  },

  [phraseKey("medzi", "між", "a1-22")]: {
    sk: "Je to medzi bankou a poštou.",
    ua: "Це між банком і поштою.",
    ru: "Это между банком и почтой.",
    tokens: ["Je", "to", "medzi", "bankou", "a", "poštou", "."],
  },

  // =========================
  // A1-23 — Характер
  // =========================

  [phraseKey("dobrý", "добрий", "a1-23")]: {
    sk: "Je to dobrý človek.",
    ua: "Це добра людина.",
    ru: "Это хороший человек.",
    tokens: ["Je", "to", "dobrý", "človek", "."],
  },

  [phraseKey("zlý", "поганий", "a1-23")]: {
    sk: "To nie je zlý nápad.",
    ua: "Це не погана ідея.",
    ru: "Это не плохая идея.",
    tokens: ["To", "nie", "je", "zlý", "nápad", "."],
  },

  [phraseKey("trpezlivý", "терплячий", "a1-23")]: {
    sk: "Buďte trpezlivý, prosím.",
    ua: "Будьте терплячі, будь ласка.",
    ru: "Будьте терпеливы, пожалуйста.",
    tokens: ["Buďte", "trpezlivý", ",", "prosím", "."],
  },

  [phraseKey("lenivý", "ледачий", "a1-23")]: {
    sk: "Dnes som trochu lenivý.",
    ua: "Сьогодні я трохи ледачий.",
    ru: "Сегодня я немного ленивый.",
    tokens: ["Dnes", "som", "trochu", "lenivý", "."],
  },

  [phraseKey("pracovitý", "працьовитий", "a1-23")]: {
    sk: "Je veľmi pracovitý.",
    ua: "Він дуже працьовитий.",
    ru: "Он очень трудолюбивый.",
    tokens: ["Je", "veľmi", "pracovitý", "."],
  },

  [phraseKey("úprimný", "щирий", "a1-23")]: {
    sk: "Buď úprimný.",
    ua: "Будь щирим.",
    ru: "Будь искренним.",
    tokens: ["Buď", "úprimný", "."],
  },

  [phraseKey("priateľský", "дружній", "a1-23")]: {
    sk: "Je priateľský a milý.",
    ua: "Він дружній і милий.",
    ru: "Он дружелюбный и милый.",
    tokens: ["Je", "priateľský", "a", "milý", "."],
  },

  [phraseKey("vážny", "серйозний", "a1-23")]: {
    sk: "Dnes som vážny.",
    ua: "Сьогодні я серйозний.",
    ru: "Сегодня я серьёзный.",
    tokens: ["Dnes", "som", "vážny", "."],
  },

  [phraseKey("zábavný", "веселий", "a1-23")]: {
    sk: "Je to zábavný človek.",
    ua: "Це весела людина.",
    ru: "Это весёлый человек.",
    tokens: ["Je", "to", "zábavný", "človek", "."],
  },

  [phraseKey("tichý", "тихий", "a1-23")]: {
    sk: "Je tichý a pokojný.",
    ua: "Він тихий і спокійний.",
    ru: "Он тихий и спокойный.",
    tokens: ["Je", "tichý", "a", "pokojný", "."],
  },

  // =========================
  // A1-24 — Погода (розширено)
  // =========================

  [phraseKey("teplo", "тепло", "a1-24")]: {
    sk: "Dnes je teplo.",
    ua: "Сьогодні тепло.",
    ru: "Сегодня тепло.",
    tokens: ["Dnes", "je", "teplo", "."],
  },

  [phraseKey("chladno", "холодно", "a1-24")]: {
    sk: "Vonku je chladno.",
    ua: "Надворі холодно.",
    ru: "На улице холодно.",
    tokens: ["Vonku", "je", "chladno", "."],
  },

  [phraseKey("zamračené", "хмарно", "a1-24")]: {
    sk: "Dnes je zamračené.",
    ua: "Сьогодні хмарно.",
    ru: "Сегодня пасмурно.",
    tokens: ["Dnes", "je", "zamračené", "."],
  },

  [phraseKey("jasno", "ясно", "a1-24")]: {
    sk: "Zajtra bude jasno.",
    ua: "Завтра буде ясно.",
    ru: "Завтра будет ясно.",
    tokens: ["Zajtra", "bude", "jasno", "."],
  },

  [phraseKey("pršať", "йти дощу", "a1-24")]: {
    sk: "Dnes prší.",
    ua: "Сьогодні йде дощ.",
    ru: "Сегодня идёт дождь.",
    tokens: ["Dnes", "prší", "."],
  },

  [phraseKey("snežiť", "йти снігу", "a1-24")]: {
    sk: "V zime často sneží.",
    ua: "Взимку часто йде сніг.",
    ru: "Зимой часто идёт снег.",
    tokens: ["V", "zime", "často", "sneží", "."],
  },

  [phraseKey("vietor", "вітер", "a1-24")]: {
    sk: "Fúka silný vietor.",
    ua: "Дме сильний вітер.",
    ru: "Дует сильный ветер.",
    tokens: ["Fúka", "silný", "vietor", "."],
  },

  [phraseKey("mráz", "мороз", "a1-24")]: {
    sk: "Ráno bol mráz.",
    ua: "Вранці був мороз.",
    ru: "Утром был мороз.",
    tokens: ["Ráno", "bol", "mráz", "."],
  },

  [phraseKey("búrka", "буря", "a1-24")]: {
    sk: "Prichádza búrka.",
    ua: "Наближається буря.",
    ru: "Приближается гроза.",
    tokens: ["Prichádza", "búrka", "."],
  },

  [phraseKey("predpoveď", "прогноз", "a1-24")]: {
    sk: "Pozerám predpoveď počasia.",
    ua: "Я дивлюся прогноз погоди.",
    ru: "Я смотрю прогноз погоды.",
    tokens: ["Pozerám", "predpoveď", "počasia", "."],
  },

  // =========================
  // A1-25 — Їжа (розширено)
  // =========================

  [phraseKey("raňajky", "сніданок", "a1-25")]: {
    sk: "Na raňajky jem chlieb.",
    ua: "На сніданок я їм хліб.",
    ru: "На завтрак я ем хлеб.",
    tokens: ["Na", "raňajky", "jem", "chlieb", "."],
  },

  [phraseKey("obed", "обід", "a1-25")]: {
    sk: "Obed mám o dvanástej.",
    ua: "Обід у мене о дванадцятій.",
    ru: "Обед у меня в двенадцать.",
    tokens: ["Obed", "mám", "o", "dvanástej", "."],
  },

  [phraseKey("večera", "вечеря", "a1-25")]: {
    sk: "Večeru jeme doma.",
    ua: "Вечерю ми їмо вдома.",
    ru: "Ужин мы едим дома.",
    tokens: ["Večeru", "jeme", "doma", "."],
  },

  [phraseKey("sladký", "солодкий", "a1-25")]: {
    sk: "Tento čaj je sladký.",
    ua: "Цей чай солодкий.",
    ru: "Этот чай сладкий.",
    tokens: ["Tento", "čaj", "je", "sladký", "."],
  },

  [phraseKey("slaný", "солоний", "a1-25")]: {
    sk: "Polievka je slaná.",
    ua: "Суп солоний.",
    ru: "Суп солёный.",
    tokens: ["Polievka", "je", "slaná", "."],
  },

  [phraseKey("pikantný", "гострий", "a1-25")]: {
    sk: "Toto jedlo je pikantné.",
    ua: "Ця їжа гостра.",
    ru: "Эта еда острая.",
    tokens: ["Toto", "jedlo", "je", "pikantné", "."],
  },

  [phraseKey("čerstvý", "свіжий", "a1-25")]: {
    sk: "Chlieb je čerstvý.",
    ua: "Хліб свіжий.",
    ru: "Хлеб свежий.",
    tokens: ["Chlieb", "je", "čerstvý", "."],
  },

  [phraseKey("hlad", "голод", "a1-25")]: {
    sk: "Mám hlad.",
    ua: "Я голодний.",
    ru: "Я голодный.",
    tokens: ["Mám", "hlad", "."],
  },

  [phraseKey("smäd", "спрага", "a1-25")]: {
    sk: "Mám smäd.",
    ua: "Я хочу пити.",
    ru: "Я хочу пить.",
    tokens: ["Mám", "smäd", "."],
  },

  [phraseKey("chuť", "смак / бажання", "a1-25")]: {
    sk: "Mám chuť na kávu.",
    ua: "Мені хочеться кави.",
    ru: "Мне хочется кофе.",
    tokens: ["Mám", "chuť", "na", "kávu", "."],
  },

  // =========================
  // A1-26 — Гроші (розширено)
  // =========================

  [phraseKey("platiť", "платити", "a1-26")]: {
    sk: "Môžem platiť kartou?",
    ua: "Можу платити карткою?",
    ru: "Могу оплатить картой?",
    tokens: ["Môžem", "platiť", "kartou", "?"],
  },

  [phraseKey("ušetriť", "зекономити", "a1-26")]: {
    sk: "Chcem ušetriť peniaze.",
    ua: "Я хочу зекономити гроші.",
    ru: "Я хочу сэкономить деньги.",
    tokens: ["Chcem", "ušetriť", "peniaze", "."],
  },

  [phraseKey("minúť", "витратити", "a1-26")]: {
    sk: "Minul som veľa peňazí.",
    ua: "Я витратив багато грошей.",
    ru: "Я потратил много денег.",
    tokens: ["Minul", "som", "veľa", "peňazí", "."],
  },

  [phraseKey("výplata", "зарплата", "a1-26")]: {
    sk: "Výplata príde zajtra.",
    ua: "Зарплата прийде завтра.",
    ru: "Зарплата придёт завтра.",
    tokens: ["Výplata", "príde", "zajtra", "."],
  },

  [phraseKey("úver", "кредит", "a1-26")]: {
    sk: "Nechcem brať úver.",
    ua: "Я не хочу брати кредит.",
    ru: "Я не хочу брать кредит.",
    tokens: ["Nechcem", "brať", "úver", "."],
  },

  [phraseKey("dlh", "борг", "a1-26")]: {
    sk: "Mám dlh v banke.",
    ua: "У мене борг у банку.",
    ru: "У меня долг в банке.",
    tokens: ["Mám", "dlh", "v", "banke", "."],
  },

  [phraseKey("bankomat", "банкомат", "a1-26")]: {
    sk: "Kde je najbližší bankomat?",
    ua: "Де найближчий банкомат?",
    ru: "Где ближайший банкомат?",
    tokens: ["Kde", "je", "najbližší", "bankomat", "?"],
  },

  [phraseKey("účet", "рахунок", "a1-26")]: {
    sk: "Mám účet v banke.",
    ua: "У мене є рахунок у банку.",
    ru: "У меня есть счёт в банке.",
    tokens: ["Mám", "účet", "v", "banke", "."],
  },

  [phraseKey("príjem", "дохід", "a1-26")]: {
    sk: "Môj príjem je stabilný.",
    ua: "Мій дохід стабільний.",
    ru: "Мой доход стабильный.",
    tokens: ["Môj", "príjem", "je", "stabilný", "."],
  },

  [phraseKey("výdavok", "витрата", "a1-26")]: {
    sk: "Toto je veľký výdavok.",
    ua: "Це велика витрата.",
    ru: "Это большой расход.",
    tokens: ["Toto", "je", "veľký", "výdavok", "."],
  },

  // =========================
  // A1-27 — Технології (практика)
  // =========================

  [phraseKey("zapnúť", "увімкнути", "a1-27")]: {
    sk: "Zapnem počítač.",
    ua: "Я увімкну комп’ютер.",
    ru: "Я включу компьютер.",
    tokens: ["Zapnem", "počítač", "."],
  },

  [phraseKey("vypnúť", "вимкнути", "a1-27")]: {
    sk: "Vypnem telefón.",
    ua: "Я вимкну телефон.",
    ru: "Я выключу телефон.",
    tokens: ["Vypnem", "telefón", "."],
  },

  [phraseKey("nabíjať", "заряджати", "a1-27")]: {
    sk: "Nabíjam mobil.",
    ua: "Я заряджаю телефон.",
    ru: "Я заряжаю телефон.",
    tokens: ["Nabíjam", "mobil", "."],
  },

  [phraseKey("prihlásiť sa", "увійти", "a1-27")]: {
    sk: "Neviem sa prihlásiť.",
    ua: "Я не можу увійти.",
    ru: "Я не могу войти.",
    tokens: ["Neviem", "sa", "prihlásiť", "."],
  },

  [phraseKey("odhlásiť sa", "вийти", "a1-27")]: {
    sk: "Chcem sa odhlásiť.",
    ua: "Я хочу вийти.",
    ru: "Я хочу выйти.",
    tokens: ["Chcem", "sa", "odhlásiť", "."],
  },

  [phraseKey("stiahnuť", "завантажити", "a1-27")]: {
    sk: "Chcem stiahnuť túto aplikáciu.",
    ua: "Я хочу завантажити цей додаток.",
    ru: "Я хочу скачать это приложение.",
    tokens: ["Chcem", "stiahnuť", "túto", "aplikáciu", "."],
  },

  [phraseKey("uložiť", "зберегти", "a1-27")]: {
    sk: "Uložte súbor.",
    ua: "Збережіть файл.",
    ru: "Сохраните файл.",
    tokens: ["Uložte", "súbor", "."],
  },

  [phraseKey("vymazať", "видалити", "a1-27")]: {
    sk: "Chcem vymazať túto správu.",
    ua: "Я хочу видалити це повідомлення.",
    ru: "Я хочу удалить это сообщение.",
    tokens: ["Chcem", "vymazať", "túto", "správu", "."],
  },

  [phraseKey("kliknúť", "натиснути", "a1-27")]: {
    sk: "Kliknite sem.",
    ua: "Натисніть сюди.",
    ru: "Нажмите сюда.",
    tokens: ["Kliknite", "sem", "."],
  },

  [phraseKey("nastavenia", "налаштування", "a1-27")]: {
    sk: "Otvorím nastavenia.",
    ua: "Я відкрию налаштування.",
    ru: "Я открою настройки.",
    tokens: ["Otvorím", "nastavenia", "."],
  },

  // =========================
  // A1-28 — Подорожі (ситуації)
  // =========================

  [phraseKey("let", "рейс", "a1-28")]: {
    sk: "Môj let je o piatej.",
    ua: "Мій рейс о п’ятій.",
    ru: "Мой рейс в пять.",
    tokens: ["Môj", "let", "je", "o", "piatej", "."],
  },

  [phraseKey("meškanie", "затримка", "a1-28")]: {
    sk: "Je meškanie letu.",
    ua: "Є затримка рейсу.",
    ru: "Есть задержка рейса.",
    tokens: ["Je", "meškanie", "letu", "."],
  },

  [phraseKey("odlet", "виліт", "a1-28")]: {
    sk: "Odlet je o desiatej.",
    ua: "Виліт о десятій.",
    ru: "Вылет в десять.",
    tokens: ["Odlet", "je", "o", "desiatej", "."],
  },

  [phraseKey("prílet", "приліт", "a1-28")]: {
    sk: "Prílet je večer.",
    ua: "Приліт ввечері.",
    ru: "Прилёт вечером.",
    tokens: ["Prílet", "je", "večer", "."],
  },

  [phraseKey("pasová kontrola", "паспортний контроль", "a1-28")]: {
    sk: "Idem na pasovú kontrolu.",
    ua: "Я йду на паспортний контроль.",
    ru: "Я иду на паспортный контроль.",
    tokens: ["Idem", "na", "pasovú", "kontrolu", "."],
  },

  [phraseKey("batožina", "багаж", "a1-28")]: {
    sk: "Moja batožina je ťažká.",
    ua: "Мій багаж важкий.",
    ru: "Мой багаж тяжёлый.",
    tokens: ["Moja", "batožina", "je", "ťažká", "."],
  },

  [phraseKey("rezervácia", "бронювання", "a1-28")]: {
    sk: "Mám rezerváciu.",
    ua: "У мене є бронювання.",
    ru: "У меня есть бронь.",
    tokens: ["Mám", "rezerváciu", "."],
  },

  [phraseKey("sprievodca", "гід", "a1-28")]: {
    sk: "Sprievodca čaká pred hotelom.",
    ua: "Гід чекає перед готелем.",
    ru: "Гид ждёт перед отелем.",
    tokens: ["Sprievodca", "čaká", "pred", "hotelom", "."],
  },

  [phraseKey("mapa", "карта", "a1-28")]: {
    sk: "Mám mapu mesta.",
    ua: "У мене є карта міста.",
    ru: "У меня есть карта города.",
    tokens: ["Mám", "mapu", "mesta", "."],
  },

  [phraseKey("cieľ", "ціль", "a1-28")]: {
    sk: "Toto je náš cieľ.",
    ua: "Це наша ціль.",
    ru: "Это наша цель.",
    tokens: ["Toto", "je", "náš", "cieľ", "."],
  },

  // =========================
  // A1-29 — Робочі фрази
  // =========================

  [phraseKey("rozumiem", "розумію", "a1-29")]: {
    sk: "Rozumiem.",
    ua: "Розумію.",
    ru: "Понимаю.",
    tokens: ["Rozumiem", "."],
  },

  [phraseKey("nerozumiem", "не розумію", "a1-29")]: {
    sk: "Nerozumiem.",
    ua: "Не розумію.",
    ru: "Не понимаю.",
    tokens: ["Nerozumiem", "."],
  },

  [phraseKey("hotovo", "готово", "a1-29")]: {
    sk: "Hotovo.",
    ua: "Готово.",
    ru: "Готово.",
    tokens: ["Hotovo", "."],
  },

  [phraseKey("môžem?", "можна?", "a1-29")]: {
    sk: "Môžem?",
    ua: "Можна?",
    ru: "Можно?",
    tokens: ["Môžem", "?"],
  },

  [phraseKey("potrebujem", "потрібно", "a1-29")]: {
    sk: "Potrebujem pomoc.",
    ua: "Мені потрібно допомогу.",
    ru: "Мне нужна помощь.",
    tokens: ["Potrebujem", "pomoc", "."],
  },

  [phraseKey("problém", "проблема", "a1-29")]: {
    sk: "Máme problém.",
    ua: "У нас проблема.",
    ru: "У нас проблема.",
    tokens: ["Máme", "problém", "."],
  },

  [phraseKey("v poriadku", "в порядку", "a1-29")]: {
    sk: "Je to v poriadku.",
    ua: "Це в порядку.",
    ru: "Это в порядке.",
    tokens: ["Je", "to", "v", "poriadku", "."],
  },

  [phraseKey("hneď", "зараз", "a1-29")]: {
    sk: "Prídem hneď.",
    ua: "Я прийду зараз.",
    ru: "Я приду сейчас.",
    tokens: ["Prídem", "hneď", "."],
  },

  [phraseKey("neskôr", "пізніше", "a1-29")]: {
    sk: "Urobím to neskôr.",
    ua: "Я зроблю це пізніше.",
    ru: "Я сделаю это позже.",
    tokens: ["Urobím", "to", "neskôr", "."],
  },

  [phraseKey("dohodnúť sa", "домовитись", "a1-29")]: {
    sk: "Musíme sa dohodnúť.",
    ua: "Нам потрібно домовитись.",
    ru: "Нам нужно договориться.",
    tokens: ["Musíme", "sa", "dohodnúť", "."],
  },

  // =========================
  // A1-30 — Часті дієслова
  // =========================

  [phraseKey("mať", "мати", "a1-30")]: {
    sk: "Mám čas.",
    ua: "Я маю час.",
    ru: "У меня есть время.",
    tokens: ["Mám", "čas", "."],
  },

  [phraseKey("byť", "бути", "a1-30")]: {
    sk: "Som doma.",
    ua: "Я вдома.",
    ru: "Я дома.",
    tokens: ["Som", "doma", "."],
  },

  [phraseKey("robiť", "робити", "a1-30")]: {
    sk: "Robím to teraz.",
    ua: "Я роблю це зараз.",
    ru: "Я делаю это сейчас.",
    tokens: ["Robím", "to", "teraz", "."],
  },

  [phraseKey("ísť", "йти", "a1-30")]: {
    sk: "Idem domov.",
    ua: "Я йду додому.",
    ru: "Я иду домой.",
    tokens: ["Idem", "domov", "."],
  },

  [phraseKey("vidieť", "бачити", "a1-30")]: {
    sk: "Vidím to.",
    ua: "Я бачу це.",
    ru: "Я вижу это.",
    tokens: ["Vidím", "to", "."],
  },

  [phraseKey("počúvať", "слухати", "a1-30")]: {
    sk: "Počúvam hudbu.",
    ua: "Я слухаю музику.",
    ru: "Я слушаю музыку.",
    tokens: ["Počúvam", "hudbu", "."],
  },

  [phraseKey("hovoriť", "говорити", "a1-30")]: {
    sk: "Hovorím po slovensky.",
    ua: "Я говорю словацькою.",
    ru: "Я говорю по-словацки.",
    tokens: ["Hovorím", "po", "slovensky", "."],
  },

  [phraseKey("myslieť", "думати", "a1-30")]: {
    sk: "Myslím na teba.",
    ua: "Я думаю про тебе.",
    ru: "Я думаю о тебе.",
    tokens: ["Myslím", "na", "teba", "."],
  },

  [phraseKey("chcieť", "хотіти", "a1-30")]: {
    sk: "Chcem oddychovať.",
    ua: "Я хочу відпочивати.",
    ru: "Я хочу отдыхать.",
    tokens: ["Chcem", "oddychovať", "."],
  },

  [phraseKey("môcť", "могти", "a1-30")]: {
    sk: "Môžem vám pomôcť?",
    ua: "Можу вам допомогти?",
    ru: "Могу вам помочь?",
    tokens: ["Môžem", "vám", "pomôcť", "?"],
  },
};

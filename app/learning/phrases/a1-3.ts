import type { Phrase } from "./a1";
import { phraseKey } from "./phraseKey";

export const A1_PHRASES_3: Record<string, Phrase> = {
  // =========================
  // A1-21 — Проблеми і ситуації
  // =========================

  [phraseKey("problém", "a1-21")]: {
    sk: "Mám problém.",
    ua: "У мене проблема.",
    ru: "У меня проблема.",
    en: "I have a problem.",
    tokens: ["Mám", "problém", "."],
  },

  [phraseKey("pokazený", "a1-21")]: {
    sk: "Telefón je pokazený.",
    ua: "Телефон зламаний.",
    ru: "Телефон сломан.",
    en: "The phone is broken.",
    tokens: ["Telefón", "je", "pokazený", "."],
  },

  [phraseKey("stratiť", "a1-21")]: {
    sk: "Stratil som kľúče.",
    ua: "Я загубив ключі.",
    ru: "Я потерял ключи.",
    en: "I lost my keys.",
    tokens: ["Stratil", "som", "kľúče", "."],
  },

  [phraseKey("nájsť", "a1-21")]: {
    sk: "Nemôžem nájsť mobil.",
    ua: "Я не можу знайти телефон.",
    ru: "Я не могу найти телефон.",
    en: "I can't find my phone.",
    tokens: ["Nemôžem", "nájsť", "mobil", "."],
  },

  [phraseKey("meškať", "a1-21")]: {
    sk: "Prepáčte, meškám.",
    ua: "Вибачте, я запізнююся.",
    ru: "Извините, я опаздываю.",
    en: "Sorry, I'm late.",
    tokens: ["Prepáčte", ",", "meškám", "."],
  },

  [phraseKey("zabudnúť", "a1-21")]: {
    sk: "Zabudol som heslo.",
    ua: "Я забув пароль.",
    ru: "Я забыл пароль.",
    en: "I forgot the password.",
    tokens: ["Zabudol", "som", "heslo", "."],
  },

  [phraseKey("chyba", "a1-21")]: {
    sk: "Je tu chyba.",
    ua: "Тут є помилка.",
    ru: "Тут ошибка.",
    en: "There is a mistake here.",
    tokens: ["Je", "tu", "chyba", "."],
  },

  [phraseKey("oprava", "a1-21")]: {
    sk: "Potrebujem opravu.",
    ua: "Мені потрібен ремонт.",
    ru: "Мне нужен ремонт.",
    en: "I need a repair.",
    tokens: ["Potrebujem", "opravu", "."],
  },

  [phraseKey("pomoc", "a1-21")]: {
    sk: "Potrebujem pomoc.",
    ua: "Мені потрібна допомога.",
    ru: "Мне нужна помощь.",
    en: "I need help.",
    tokens: ["Potrebujem", "pomoc", "."],
  },

  [phraseKey("riešenie", "a1-21")]: {
    sk: "Máme riešenie.",
    ua: "У нас є рішення.",
    ru: "У нас есть решение.",
    en: "We have a solution.",
    tokens: ["Máme", "riešenie", "."],
  },

  // =========================
  // A1-22 — Напрямки
  // =========================

  [phraseKey("vpravo", "a1-22")]: {
    sk: "Odbočte vpravo.",
    ua: "Поверніть праворуч.",
    ru: "Поверните направо.",
    en: "Turn right.",
    tokens: ["Odbočte", "vpravo", "."],
  },

  [phraseKey("vľavo", "a1-22")]: {
    sk: "Odbočte vľavo.",
    ua: "Поверніть ліворуч.",
    ru: "Поверните налево.",
    en: "Turn left.",
    tokens: ["Odbočte", "vľavo", "."],
  },

  [phraseKey("rovno", "a1-22")]: {
    sk: "Choďte rovno.",
    ua: "Ідіть прямо.",
    ru: "Идите прямо.",
    en: "Go straight.",
    tokens: ["Choďte", "rovno", "."],
  },

  [phraseKey("blízko", "a1-22")]: {
    sk: "Je to blízko.",
    ua: "Це близько.",
    ru: "Это близко.",
    en: "It's near.",
    tokens: ["Je", "to", "blízko", "."],
  },

  [phraseKey("ďaleko", "a1-22")]: {
    sk: "Nie je to ďaleko.",
    ua: "Це недалеко.",
    ru: "Это недалеко.",
    en: "It's not far.",
    tokens: ["Nie", "je", "to", "ďaleko", "."],
  },

  [phraseKey("hore", "a1-22")]: {
    sk: "Choďte hore po schodoch.",
    ua: "Підійдіть вгору по сходах.",
    ru: "Поднимитесь вверх по лестнице.",
    en: "Go up the stairs.",
    tokens: ["Choďte", "hore", "po", "schodoch", "."],
  },

  [phraseKey("dole", "a1-22")]: {
    sk: "Choďte dole.",
    ua: "Ідіть вниз.",
    ru: "Идите вниз.",
    en: "Go downstairs.",
    tokens: ["Choďte", "dole", "."],
  },

  [phraseKey("pred", "a1-22")]: {
    sk: "Zastávka je pred obchodom.",
    ua: "Зупинка перед магазином.",
    ru: "Остановка перед магазином.",
    en: "The stop is in front of the shop.",
    tokens: ["Zastávka", "je", "pred", "obchodom", "."],
  },

  [phraseKey("za", "a1-22")]: {
    sk: "Park je za domom.",
    ua: "Парк за будинком.",
    ru: "Парк за домом.",
    en: "The park is behind the house.",
    tokens: ["Park", "je", "za", "domom", "."],
  },

  [phraseKey("medzi", "a1-22")]: {
    sk: "Je to medzi bankou a poštou.",
    ua: "Це між банком і поштою.",
    ru: "Это между банком и почтой.",
    en: "It's between the bank and the post office.",
    tokens: ["Je", "to", "medzi", "bankou", "a", "poštou", "."],
  },

  // =========================
  // A1-23 — Характер
  // =========================

  [phraseKey("dobrý", "a1-23")]: {
    sk: "Je to dobrý človek.",
    ua: "Це добра людина.",
    ru: "Это хороший человек.",
    en: "He is a good person.",
    tokens: ["Je", "to", "dobrý", "človek", "."],
  },

  [phraseKey("zlý", "a1-23")]: {
    sk: "To nie je zlý nápad.",
    ua: "Це не погана ідея.",
    ru: "Это не плохая идея.",
    en: "That's not a bad idea.",
    tokens: ["To", "nie", "je", "zlý", "nápad", "."],
  },

  [phraseKey("trpezlivý", "a1-23")]: {
    sk: "Buďte trpezlivý, prosím.",
    ua: "Будьте терплячі, будь ласка.",
    ru: "Будьте терпеливы, пожалуйста.",
    en: "Please be patient.",
    tokens: ["Buďte", "trpezlivý", ",", "prosím", "."],
  },

  [phraseKey("lenivý", "a1-23")]: {
    sk: "Dnes som trochu lenivý.",
    ua: "Сьогодні я трохи ледачий.",
    ru: "Сегодня я немного ленивый.",
    en: "Today I'm a bit lazy.",
    tokens: ["Dnes", "som", "trochu", "lenivý", "."],
  },

  [phraseKey("pracovitý", "a1-23")]: {
    sk: "Je veľmi pracovitý.",
    ua: "Він дуже працьовитий.",
    ru: "Он очень трудолюбивый.",
    en: "He is very hardworking.",
    tokens: ["Je", "veľmi", "pracovitý", "."],
  },

  [phraseKey("úprimný", "a1-23")]: {
    sk: "Buď úprimný.",
    ua: "Будь щирим.",
    ru: "Будь искренним.",
    en: "Be honest.",
    tokens: ["Buď", "úprimný", "."],
  },

  [phraseKey("priateľský", "a1-23")]: {
    sk: "Je priateľský a milý.",
    ua: "Він дружній і милий.",
    ru: "Он дружелюбный и милый.",
    en: "He is friendly and kind.",
    tokens: ["Je", "priateľský", "a", "milý", "."],
  },

  [phraseKey("vážny", "a1-23")]: {
    sk: "Dnes som vážny.",
    ua: "Сьогодні я серйозний.",
    ru: "Сегодня я серьёзный.",
    en: "Today I'm serious.",
    tokens: ["Dnes", "som", "vážny", "."],
  },

  [phraseKey("zábavný", "a1-23")]: {
    sk: "Je to zábavný človek.",
    ua: "Це весела людина.",
    ru: "Это весёлый человек.",
    en: "He is a funny person.",
    tokens: ["Je", "to", "zábavný", "človek", "."],
  },

  [phraseKey("tichý", "a1-23")]: {
    sk: "Je tichý a pokojný.",
    ua: "Він тихий і спокійний.",
    ru: "Он тихий и спокойный.",
    en: "He is quiet and calm.",
    tokens: ["Je", "tichý", "a", "pokojný", "."],
  },

  // =========================
  // A1-24 — Погода (розширено)
  // =========================

  [phraseKey("teplo", "a1-24")]: {
    sk: "Dnes je teplo.",
    ua: "Сьогодні тепло.",
    ru: "Сегодня тепло.",
    en: "It's warm today.",
    tokens: ["Dnes", "je", "teplo", "."],
  },

  [phraseKey("chladno", "a1-24")]: {
    sk: "Vonku je chladno.",
    ua: "Надворі холодно.",
    ru: "На улице холодно.",
    en: "It's cold outside.",
    tokens: ["Vonku", "je", "chladno", "."],
  },

  [phraseKey("zamračené", "a1-24")]: {
    sk: "Dnes je zamračené.",
    ua: "Сьогодні хмарно.",
    ru: "Сегодня пасмурно.",
    en: "It's cloudy today.",
    tokens: ["Dnes", "je", "zamračené", "."],
  },

  [phraseKey("jasno", "a1-24")]: {
    sk: "Zajtra bude jasno.",
    ua: "Завтра буде ясно.",
    ru: "Завтра будет ясно.",
    en: "It will be clear tomorrow.",
    tokens: ["Zajtra", "bude", "jasno", "."],
  },

  [phraseKey("pršať", "a1-24")]: {
    sk: "Dnes prší.",
    ua: "Сьогодні йде дощ.",
    ru: "Сегодня идёт дождь.",
    en: "It's raining today.",
    tokens: ["Dnes", "prší", "."],
  },

  [phraseKey("snežiť", "a1-24")]: {
    sk: "V zime často sneží.",
    ua: "Взимку часто йде сніг.",
    ru: "Зимой часто идёт снег.",
    en: "It often snows in winter.",
    tokens: ["V", "zime", "často", "sneží", "."],
  },

  [phraseKey("vietor", "a1-24")]: {
    sk: "Fúka silný vietor.",
    ua: "Дме сильний вітер.",
    ru: "Дует сильный ветер.",
    en: "A strong wind is blowing.",
    tokens: ["Fúka", "silný", "vietor", "."],
  },

  [phraseKey("mráz", "a1-24")]: {
    sk: "Ráno bol mráz.",
    ua: "Вранці був мороз.",
    ru: "Утром был мороз.",
    en: "There was frost in the morning.",
    tokens: ["Ráno", "bol", "mráz", "."],
  },

  [phraseKey("búrka", "a1-24")]: {
    sk: "Prichádza búrka.",
    ua: "Наближається буря.",
    ru: "Приближается гроза.",
    en: "A storm is coming.",
    tokens: ["Prichádza", "búrka", "."],
  },

  [phraseKey("predpoveď", "a1-24")]: {
    sk: "Pozerám predpoveď počasia.",
    ua: "Я дивлюся прогноз погоди.",
    ru: "Я смотрю прогноз погоды.",
    en: "I'm checking the weather forecast.",
    tokens: ["Pozerám", "predpoveď", "počasia", "."],
  },

  // =========================
  // A1-25 — Їжа (розширено)
  // =========================

  [phraseKey("raňajky", "a1-25")]: {
    sk: "Na raňajky jem chlieb.",
    ua: "На сніданок я їм хліб.",
    ru: "На завтрак я ем хлеб.",
    en: "I eat bread for breakfast.",
    tokens: ["Na", "raňajky", "jem", "chlieb", "."],
  },

  [phraseKey("obed", "a1-25")]: {
    sk: "Obed mám o dvanástej.",
    ua: "Обід у мене о дванадцятій.",
    ru: "Обед у меня в двенадцать.",
    en: "I have lunch at twelve.",
    tokens: ["Obed", "mám", "o", "dvanástej", "."],
  },

  [phraseKey("večera", "a1-25")]: {
    sk: "Večeru jeme doma.",
    ua: "Вечерю ми їмо вдома.",
    ru: "Ужин мы едим дома.",
    en: "We eat dinner at home.",
    tokens: ["Večeru", "jeme", "doma", "."],
  },

  [phraseKey("sladký", "a1-25")]: {
    sk: "Tento čaj je sladký.",
    ua: "Цей чай солодкий.",
    ru: "Этот чай сладкий.",
    en: "This tea is sweet.",
    tokens: ["Tento", "čaj", "je", "sladký", "."],
  },

  [phraseKey("slaný", "a1-25")]: {
    sk: "Polievka je slaná.",
    ua: "Суп солоний.",
    ru: "Суп солёный.",
    en: "The soup is salty.",
    tokens: ["Polievka", "je", "slaná", "."],
  },

  [phraseKey("pikantný", "a1-25")]: {
    sk: "Toto jedlo je pikantné.",
    ua: "Ця їжа гостра.",
    ru: "Эта еда острая.",
    en: "This food is spicy.",
    tokens: ["Toto", "jedlo", "je", "pikantné", "."],
  },

  [phraseKey("čerstvý", "a1-25")]: {
    sk: "Chlieb je čerstvý.",
    ua: "Хліб свіжий.",
    ru: "Хлеб свежий.",
    en: "The bread is fresh.",
    tokens: ["Chlieb", "je", "čerstvý", "."],
  },

  [phraseKey("hlad", "a1-25")]: {
    sk: "Mám hlad.",
    ua: "Я голодний.",
    ru: "Я голодный.",
    en: "I am hungry.",
    tokens: ["Mám", "hlad", "."],
  },

  [phraseKey("smäd", "a1-25")]: {
    sk: "Mám smäd.",
    ua: "Я хочу пити.",
    ru: "Я хочу пить.",
    en: "I am thirsty.",
    tokens: ["Mám", "smäd", "."],
  },

  [phraseKey("chuť", "a1-25")]: {
    sk: "Mám chuť na kávu.",
    ua: "Мені хочеться кави.",
    ru: "Мне хочется кофе.",
    en: "I feel like having coffee.",
    tokens: ["Mám", "chuť", "na", "kávu", "."],
  },

  // =========================
  // A1-26 — Гроші (розширено)
  // =========================

  [phraseKey("platiť", "a1-26")]: {
    sk: "Môžem platiť kartou?",
    ua: "Можу платити карткою?",
    ru: "Могу оплатить картой?",
    en: "Can I pay by card?",
    tokens: ["Môžem", "platiť", "kartou", "?"],
  },

  [phraseKey("ušetriť", "a1-26")]: {
    sk: "Chcem ušetriť peniaze.",
    ua: "Я хочу зекономити гроші.",
    ru: "Я хочу сэкономить деньги.",
    en: "I want to save money.",
    tokens: ["Chcem", "ušetriť", "peniaze", "."],
  },

  [phraseKey("minúť", "a1-26")]: {
    sk: "Minul som veľa peňazí.",
    ua: "Я витратив багато грошей.",
    ru: "Я потратил много денег.",
    en: "I spent a lot of money.",
    tokens: ["Minul", "som", "veľa", "peňazí", "."],
  },

  [phraseKey("výplata", "a1-26")]: {
    sk: "Výplata príde zajtra.",
    ua: "Зарплата прийде завтра.",
    ru: "Зарплата придёт завтра.",
    en: "The salary will come tomorrow.",
    tokens: ["Výplata", "príde", "zajtra", "."],
  },

  [phraseKey("úver", "a1-26")]: {
    sk: "Nechcem brať úver.",
    ua: "Я не хочу брати кредит.",
    ru: "Я не хочу брать кредит.",
    en: "I don't want to take a loan.",
    tokens: ["Nechcem", "brať", "úver", "."],
  },

  [phraseKey("dlh", "a1-26")]: {
    sk: "Mám dlh v banke.",
    ua: "У мене борг у банку.",
    ru: "У меня долг в банке.",
    en: "I have debt in the bank.",
    tokens: ["Mám", "dlh", "v", "banke", "."],
  },

  [phraseKey("bankomat", "a1-26")]: {
    sk: "Kde je najbližší bankomat?",
    ua: "Де найближчий банкомат?",
    ru: "Где ближайший банкомат?",
    en: "Where is the nearest ATM?",
    tokens: ["Kde", "je", "najbližší", "bankomat", "?"],
  },

  [phraseKey("účet", "a1-26")]: {
    sk: "Mám účet v banke.",
    ua: "У мене є рахунок у банку.",
    ru: "У меня есть счёт в банке.",
    en: "I have an account at the bank.",
    tokens: ["Mám", "účet", "v", "banke", "."],
  },

  [phraseKey("príjem", "a1-26")]: {
    sk: "Môj príjem je stabilný.",
    ua: "Мій дохід стабільний.",
    ru: "Мой доход стабильный.",
    en: "My income is stable.",
    tokens: ["Môj", "príjem", "je", "stabilný", "."],
  },

  [phraseKey("výdavok", "a1-26")]: {
    sk: "Toto je veľký výdavok.",
    ua: "Це велика витрата.",
    ru: "Это большой расход.",
    en: "This is a big expense.",
    tokens: ["Toto", "je", "veľký", "výdavok", "."],
  },

  // =========================
  // A1-27 — Технології (практика)
  // =========================

  [phraseKey("zapnúť", "a1-27")]: {
    sk: "Zapnem počítač.",
    ua: "Я увімкну комп’ютер.",
    ru: "Я включу компьютер.",
    en: "I will turn on the computer.",
    tokens: ["Zapnem", "počítač", "."],
  },

  [phraseKey("vypnúť", "a1-27")]: {
    sk: "Vypnem telefón.",
    ua: "Я вимкну телефон.",
    ru: "Я выключу телефон.",
    en: "I will turn off the phone.",
    tokens: ["Vypnem", "telefón", "."],
  },

  [phraseKey("nabíjať", "a1-27")]: {
    sk: "Nabíjam mobil.",
    ua: "Я заряджаю телефон.",
    ru: "Я заряжаю телефон.",
    en: "I am charging the phone.",
    tokens: ["Nabíjam", "mobil", "."],
  },

  [phraseKey("prihlásiť sa", "a1-27")]: {
    sk: "Neviem sa prihlásiť.",
    ua: "Я не можу увійти.",
    ru: "Я не могу войти.",
    en: "I can't log in.",
    tokens: ["Neviem", "sa", "prihlásiť", "."],
  },

  [phraseKey("odhlásiť sa", "a1-27")]: {
    sk: "Chcem sa odhlásiť.",
    ua: "Я хочу вийти.",
    ru: "Я хочу выйти.",
    en: "I want to log out.",
    tokens: ["Chcem", "sa", "odhlásiť", "."],
  },

  [phraseKey("stiahnuť", "a1-27")]: {
    sk: "Chcem stiahnuť túto aplikáciu.",
    ua: "Я хочу завантажити цей додаток.",
    ru: "Я хочу скачать это приложение.",
    en: "I want to download this app.",
    tokens: ["Chcem", "stiahnuť", "túto", "aplikáciu", "."],
  },

  [phraseKey("uložiť", "a1-27")]: {
    sk: "Uložte súbor.",
    ua: "Збережіть файл.",
    ru: "Сохраните файл.",
    en: "Save the file.",
    tokens: ["Uložte", "súbor", "."],
  },

  [phraseKey("vymazať", "a1-27")]: {
    sk: "Chcem vymazať túto správu.",
    ua: "Я хочу видалити це повідомлення.",
    ru: "Я хочу удалить это сообщение.",
    en: "I want to delete this message.",
    tokens: ["Chcem", "vymazať", "túto", "správu", "."],
  },

  [phraseKey("kliknúť", "a1-27")]: {
    sk: "Kliknite sem.",
    ua: "Натисніть сюди.",
    ru: "Нажмите сюда.",
    en: "Click here.",
    tokens: ["Kliknite", "sem", "."],
  },

  [phraseKey("nastavenia", "a1-27")]: {
    sk: "Otvorím nastavenia.",
    ua: "Я відкрию налаштування.",
    ru: "Я открою настройки.",
    en: "I will open the settings.",
    tokens: ["Otvorím", "nastavenia", "."],
  },

  // =========================
  // A1-28 — Подорожі (ситуації)
  // =========================

  [phraseKey("let", "a1-28")]: {
    sk: "Môj let je o piatej.",
    ua: "Мій рейс о п’ятій.",
    ru: "Мой рейс в пять.",
    en: "My flight is at five.",
    tokens: ["Môj", "let", "je", "o", "piatej", "."],
  },

  [phraseKey("meškanie", "a1-28")]: {
    sk: "Je meškanie letu.",
    ua: "Є затримка рейсу.",
    ru: "Есть задержка рейса.",
    en: "There is a flight delay.",
    tokens: ["Je", "meškanie", "letu", "."],
  },

  [phraseKey("odlet", "a1-28")]: {
    sk: "Odlet je o desiatej.",
    ua: "Виліт о десятій.",
    ru: "Вылет в десять.",
    en: "Departure is at ten.",
    tokens: ["Odlet", "je", "o", "desiatej", "."],
  },

  [phraseKey("prílet", "a1-28")]: {
    sk: "Prílet je večer.",
    ua: "Приліт ввечері.",
    ru: "Прилёт вечером.",
    en: "Arrival is in the evening.",
    tokens: ["Prílet", "je", "večer", "."],
  },

  [phraseKey("pasová kontrola", "a1-28")]: {
    sk: "Idem na pasovú kontrolu.",
    ua: "Я йду на паспортний контроль.",
    ru: "Я иду на паспортный контроль.",
    en: "I am going to passport control.",
    tokens: ["Idem", "na", "pasovú", "kontrolu", "."],
  },

  [phraseKey("batožina", "a1-28")]: {
    sk: "Moja batožina je ťažká.",
    ua: "Мій багаж важкий.",
    ru: "Мой багаж тяжёлый.",
    en: "My luggage is heavy.",
    tokens: ["Moja", "batožina", "je", "ťažká", "."],
  },

  [phraseKey("rezervácia", "a1-28")]: {
    sk: "Mám rezerváciu.",
    ua: "У мене є бронювання.",
    ru: "У меня есть бронь.",
    en: "I have a reservation.",
    tokens: ["Mám", "rezerváciu", "."],
  },

  [phraseKey("sprievodca", "a1-28")]: {
    sk: "Sprievodca čaká pred hotelom.",
    ua: "Гід чекає перед готелем.",
    ru: "Гид ждёт перед отелем.",
    en: "The guide is waiting in front of the hotel.",
    tokens: ["Sprievodca", "čaká", "pred", "hotelom", "."],
  },

  [phraseKey("mapa", "a1-28")]: {
    sk: "Mám mapu mesta.",
    ua: "У мене є карта міста.",
    ru: "У меня есть карта города.",
    en: "I have a city map.",
    tokens: ["Mám", "mapu", "mesta", "."],
  },

  [phraseKey("cieľ", "a1-28")]: {
    sk: "Toto je náš cieľ.",
    ua: "Це наша ціль.",
    ru: "Это наша цель.",
    en: "This is our goal.",
    tokens: ["Toto", "je", "náš", "cieľ", "."],
  },

  // =========================
  // A1-29 — Робочі фрази
  // =========================

  [phraseKey("rozumiem", "a1-29")]: {
    sk: "Rozumiem.",
    ua: "Розумію.",
    ru: "Понимаю.",
    en: "I understand.",
    tokens: ["Rozumiem", "."],
  },

  [phraseKey("nerozumiem", "a1-29")]: {
    sk: "Nerozumiem.",
    ua: "Не розумію.",
    ru: "Не понимаю.",
    en: "I don't understand.",
    tokens: ["Nerozumiem", "."],
  },

  [phraseKey("hotovo", "a1-29")]: {
    sk: "Hotovo.",
    ua: "Готово.",
    ru: "Готово.",
    en: "Done.",
    tokens: ["Hotovo", "."],
  },

  [phraseKey("môžem", "a1-29")]: {
    sk: "Môžem?",
    ua: "Можна?",
    ru: "Можно?",
    en: "May I?",
    tokens: ["Môžem", "?"],
  },

  [phraseKey("potrebujem", "a1-29")]: {
    sk: "Potrebujem pomoc.",
    ua: "Мені потрібно допомогу.",
    ru: "Мне нужна помощь.",
    en: "I need help.",
    tokens: ["Potrebujem", "pomoc", "."],
  },

  [phraseKey("problém", "a1-29")]: {
    sk: "Máme problém.",
    ua: "У нас проблема.",
    ru: "У нас проблема.",
    en: "We have a problem.",
    tokens: ["Máme", "problém", "."],
  },

  [phraseKey("v poriadku", "a1-29")]: {
    sk: "Je to v poriadku.",
    ua: "Це в порядку.",
    ru: "Это в порядке.",
    en: "It's okay.",
    tokens: ["Je", "to", "v", "poriadku", "."],
  },

  [phraseKey("hneď", "a1-29")]: {
    sk: "Prídem hneď.",
    ua: "Я прийду зараз.",
    ru: "Я приду сейчас.",
    en: "I will come right away.",
    tokens: ["Prídem", "hneď", "."],
  },

  [phraseKey("neskôr", "a1-29")]: {
    sk: "Urobím to neskôr.",
    ua: "Я зроблю це пізніше.",
    ru: "Я сделаю это позже.",
    en: "I will do it later.",
    tokens: ["Urobím", "to", "neskôr", "."],
  },

  [phraseKey("dohodnúť sa", "a1-29")]: {
    sk: "Musíme sa dohodnúť.",
    ua: "Нам потрібно домовитись.",
    ru: "Нам нужно договориться.",
    en: "We need to agree.",
    tokens: ["Musíme", "sa", "dohodnúť", "."],
  },

  // =========================
  // A1-30 — Часті дієслова
  // =========================

  [phraseKey("mať", "a1-30")]: {
    sk: "Mám čas.",
    ua: "Я маю час.",
    ru: "У меня есть время.",
    en: "I have time.",
    tokens: ["Mám", "čas", "."],
  },

  [phraseKey("byť", "a1-30")]: {
    sk: "Som doma.",
    ua: "Я вдома.",
    ru: "Я дома.",
    en: "I am at home.",
    tokens: ["Som", "doma", "."],
  },

  [phraseKey("robiť", "a1-30")]: {
    sk: "Robím to teraz.",
    ua: "Я роблю це зараз.",
    ru: "Я делаю это сейчас.",
    en: "I am doing it now.",
    tokens: ["Robím", "to", "teraz", "."],
  },

  [phraseKey("ísť", "a1-30")]: {
    sk: "Idem domov.",
    ua: "Я йду додому.",
    ru: "Я иду домой.",
    en: "I am going home.",
    tokens: ["Idem", "domov", "."],
  },

  [phraseKey("vidieť", "a1-30")]: {
    sk: "Vidím to.",
    ua: "Я бачу це.",
    ru: "Я вижу это.",
    en: "I see it.",
    tokens: ["Vidím", "to", "."],
  },

  [phraseKey("počúvať", "a1-30")]: {
    sk: "Počúvam hudbu.",
    ua: "Я слухаю музику.",
    ru: "Я слушаю музыку.",
    en: "I am listening to music.",
    tokens: ["Počúvam", "hudbu", "."],
  },

  [phraseKey("hovoriť", "a1-30")]: {
    sk: "Hovorím po slovensky.",
    ua: "Я говорю словацькою.",
    ru: "Я говорю по-словацки.",
    en: "I speak Slovak.",
    tokens: ["Hovorím", "po", "slovensky", "."],
  },

  [phraseKey("myslieť", "a1-30")]: {
    sk: "Myslím na teba.",
    ua: "Я думаю про тебе.",
    ru: "Я думаю о тебе.",
    en: "I am thinking about you.",
    tokens: ["Myslím", "na", "teba", "."],
  },

  [phraseKey("chcieť", "a1-30")]: {
    sk: "Chcem oddychovať.",
    ua: "Я хочу відпочивати.",
    ru: "Я хочу отдыхать.",
    en: "I want to rest.",
    tokens: ["Chcem", "oddychovať", "."],
  },

  [phraseKey("môcť", "a1-30")]: {
    sk: "Môžem vám pomôcť?",
    ua: "Можу вам допомогти?",
    ru: "Могу вам помочь?",
    en: "Can I help you?",
    tokens: ["Môžem", "vám", "pomôcť", "?"],
  },
};
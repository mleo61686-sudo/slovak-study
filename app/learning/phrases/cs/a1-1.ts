import type { Phrase } from "../registry";
import { phraseKey } from "../phraseKey";

export const CS_A1_PHRASES_1: Record<string, Phrase> = {
  // =========================
  // LESSON A1-1 — Знайомство
  // =========================
  [phraseKey("jmenovat se", "a1-1")]: {
    sk: "Jak se jmenuješ?",
    ua: "Як тебе звати?",
    ru: "Как тебя зовут?",
    en: "What is your name?",
    tokens: ["Jak", "se", "jmenuješ", "?"],
  },

  [phraseKey("seznámit se", "a1-1")]: {
    sk: "Rád bych se s vámi seznámil.",
    ua: "Я хотів би з вами познайомитися.",
    ru: "Я хотел бы с вами познакомиться.",
    en: "I would like to get acquainted with you.",
    tokens: ["Rád", "bych", "se", "s", "vámi", "seznámil", "."],
  },

  [phraseKey("jméno", "a1-1")]: {
    sk: "Jaké je tvoje jméno?",
    ua: "Яке твоє ім’я?",
    ru: "Какое у тебя имя?",
    en: "What is your name?",
    tokens: ["Jaké", "je", "tvoje", "jméno", "?"],
  },

  [phraseKey("příjmení", "a1-1")]: {
    sk: "Moje příjmení je Novák.",
    ua: "Моє прізвище Новак.",
    ru: "Моя фамилия Новак.",
    en: "My surname is Novák.",
    tokens: ["Moje", "příjmení", "je", "Novák", "."],
  },

  [phraseKey("odkud", "a1-1")]: {
    sk: "Odkud jsi?",
    ua: "Звідки ти?",
    ru: "Откуда ты?",
    en: "Where are you from?",
    tokens: ["Odkud", "jsi", "?"],
  },

  [phraseKey("bývat", "a1-1")]: {
    sk: "Teď bývám v Brně.",
    ua: "Зараз я живу в Брно.",
    ru: "Сейчас я живу в Брно.",
    en: "Now I live in Brno.",
    tokens: ["Teď", "bývám", "v", "Brně", "."],
  },

  [phraseKey("pracovat", "a1-1")]: {
    sk: "Kde pracuješ?",
    ua: "Де ти працюєш?",
    ru: "Где ты работаешь?",
    en: "Where do you work?",
    tokens: ["Kde", "pracuješ", "?"],
  },

  [phraseKey("těší mě", "a1-1")]: {
    sk: "Těší mě, že vás poznávám.",
    ua: "Мені приємно з вами познайомитися.",
    ru: "Мне приятно с вами познакомиться.",
    en: "Nice to meet you.",
    tokens: ["Těší", "mě", ",", "že", "vás", "poznávám", "."],
  },

  [phraseKey("mít rád", "a1-1")]: {
    sk: "Mám rád českou hudbu.",
    ua: "Мені подобається чеська музика.",
    ru: "Мне нравится чешская музыка.",
    en: "I like Czech music.",
    tokens: ["Mám", "rád", "českou", "hudbu", "."],
  },

  [phraseKey("děkuji", "a1-1")]: {
    sk: "Děkuji za váš čas.",
    ua: "Дякую за ваш час.",
    ru: "Спасибо за ваше время.",
    en: "Thank you for your time.",
    tokens: ["Děkuji", "za", "váš", "čas", "."],
  },

  // =========================
  // LESSON A1-2 — Ввічливі фрази
  // =========================
  [phraseKey("prosím", "a1-2")]: {
    sk: "Prosím, posaďte se.",
    ua: "Будь ласка, сідайте.",
    ru: "Пожалуйста, садитесь.",
    en: "Please, have a seat.",
    tokens: ["Prosím", ",", "posaďte", "se", "."],
  },

  [phraseKey("omlouvám se", "a1-2")]: {
    sk: "Omlouvám se za chybu.",
    ua: "Вибачте за помилку.",
    ru: "Извините за ошибку.",
    en: "I am sorry for the mistake.",
    tokens: ["Omlouvám", "se", "za", "chybu", "."],
  },

  [phraseKey("děkuji pěkně", "a1-2")]: {
    sk: "Děkuji pěkně za pomoc.",
    ua: "Дуже дякую за допомогу.",
    ru: "Большое спасибо за помощь.",
    en: "Thank you very much for your help.",
    tokens: ["Děkuji", "pěkně", "za", "pomoc", "."],
  },

  [phraseKey("není zač", "a1-2")]: {
    sk: "Není zač, rád jsem pomohl.",
    ua: "Нема за що, я радий був допомогти.",
    ru: "Не за что, я был рад помочь.",
    en: "You are welcome, I was glad to help.",
    tokens: ["Není", "zač", ",", "rád", "jsem", "pomohl", "."],
  },

  [phraseKey("mohu", "a1-2")]: {
    sk: "Mohu se na něco zeptat?",
    ua: "Можна щось запитати?",
    ru: "Можно кое-что спросить?",
    en: "May I ask something?",
    tokens: ["Mohu", "se", "na", "něco", "zeptat", "?"],
  },

  [phraseKey("můžete", "a1-2")]: {
    sk: "Můžete mi to ukázat?",
    ua: "Можете мені це показати?",
    ru: "Можете мне это показать?",
    en: "Can you show it to me?",
    tokens: ["Můžete", "mi", "to", "ukázat", "?"],
  },

  [phraseKey("pomozte mi", "a1-2")]: {
    sk: "Prosím, pomozte mi s kufrem.",
    ua: "Будь ласка, допоможіть мені з валізою.",
    ru: "Пожалуйста, помогите мне с чемоданом.",
    en: "Please help me with the suitcase.",
    tokens: ["Prosím", ",", "pomozte", "mi", "s", "kufrem", "."],
  },

  [phraseKey("tady máte", "a1-2")]: {
    sk: "Tady máte vaši kávu.",
    ua: "Ось ваша кава, будь ласка.",
    ru: "Вот ваш кофе, пожалуйста.",
    en: "Here is your coffee.",
    tokens: ["Tady", "máte", "vaši", "kávu", "."],
  },

  [phraseKey("v pořádku", "a1-2")]: {
    sk: "Všechno je v pořádku.",
    ua: "Усе в порядку.",
    ru: "Всё в порядке.",
    en: "Everything is fine.",
    tokens: ["Všechno", "je", "v", "pořádku", "."],
  },

  [phraseKey("jasné", "a1-2")]: {
    sk: "Jasné, rozumím tomu.",
    ua: "Ясно, я це розумію.",
    ru: "Ясно, я это понимаю.",
    en: "Sure, I understand it.",
    tokens: ["Jasné", ",", "rozumím", "tomu", "."],
  },

  // =========================
  // LESSON A1-3 — Місто
  // =========================
  [phraseKey("křižovatka", "a1-3")]: {
    sk: "Na té křižovatce zahněte doleva.",
    ua: "На тому перехресті поверніть ліворуч.",
    ru: "На том перекрёстке поверните налево.",
    en: "Turn left at that intersection.",
    tokens: ["Na", "té", "křižovatce", "zahněte", "doleva", "."],
  },

  [phraseKey("semafor", "a1-3")]: {
    sk: "Čekáme u semaforu na zelenou.",
    ua: "Ми чекаємо біля світлофора на зелене.",
    ru: "Мы ждём у светофора зелёный свет.",
    en: "We are waiting at the traffic light for green.",
    tokens: ["Čekáme", "u", "semaforu", "na", "zelenou", "."],
  },

  [phraseKey("most", "a1-3")]: {
    sk: "Půjdeme přes most pěšky.",
    ua: "Ми підемо через міст пішки.",
    ru: "Мы пойдём через мост пешком.",
    en: "We will go across the bridge on foot.",
    tokens: ["Půjdeme", "přes", "most", "pěšky", "."],
  },

  [phraseKey("kino", "a1-3")]: {
    sk: "Večer jdeme do kina.",
    ua: "Увечері ми йдемо в кінотеатр.",
    ru: "Вечером мы идём в кинотеатр.",
    en: "We are going to the cinema in the evening.",
    tokens: ["Večer", "jdeme", "do", "kina", "."],
  },

  [phraseKey("muzeum", "a1-3")]: {
    sk: "To muzeum je velmi zajímavé.",
    ua: "Той музей дуже цікавий.",
    ru: "Этот музей очень интересный.",
    en: "That museum is very interesting.",
    tokens: ["To", "muzeum", "je", "velmi", "zajímavé", "."],
  },

  [phraseKey("lékárna", "a1-3")]: {
    sk: "Kde je nejbližší lékárna?",
    ua: "Де найближча аптека?",
    ru: "Где ближайшая аптека?",
    en: "Where is the nearest pharmacy?",
    tokens: ["Kde", "je", "nejbližší", "lékárna", "?"],
  },

  [phraseKey("knihovna", "a1-3")]: {
    sk: "V knihovně je dnes ticho.",
    ua: "У бібліотеці сьогодні тихо.",
    ru: "В библиотеке сегодня тихо.",
    en: "It is quiet in the library today.",
    tokens: ["V", "knihovně", "je", "dnes", "ticho", "."],
  },

  [phraseKey("trh", "a1-3")]: {
    sk: "Na trhu kupuji čerstvou zeleninu.",
    ua: "На ринку я купую свіжі овочі.",
    ru: "На рынке я покупаю свежие овощи.",
    en: "I buy fresh vegetables at the market.",
    tokens: ["Na", "trhu", "kupuji", "čerstvou", "zeleninu", "."],
  },

  [phraseKey("vstup", "a1-3")]: {
    sk: "Vstup je z druhé strany.",
    ua: "Вхід з іншого боку.",
    ru: "Вход с другой стороны.",
    en: "The entrance is on the other side.",
    tokens: ["Vstup", "je", "z", "druhé", "strany", "."],
  },

  [phraseKey("východ", "a1-3")]: {
    sk: "Východ je vedle schodů.",
    ua: "Вихід біля сходів.",
    ru: "Выход рядом с лестницей.",
    en: "The exit is next to the stairs.",
    tokens: ["Východ", "je", "vedle", "schodů", "."],
  },

  // =========================
  // LESSON A1-4 — Магазин (розширено)
  // =========================
  [phraseKey("pokladník", "a1-4")]: {
    sk: "Pokladník mi dal účtenku.",
    ua: "Касир дав мені чек.",
    ru: "Кассир дал мне чек.",
    en: "The cashier gave me a receipt.",
    tokens: ["Pokladník", "mi", "dal", "účtenku", "."],
  },

  [phraseKey("regál", "a1-4")]: {
    sk: "Mléko je v tom regálu vlevo.",
    ua: "Молоко на тому стелажі ліворуч.",
    ru: "Молоко на том стеллаже слева.",
    en: "The milk is on that shelf on the left.",
    tokens: ["Mléko", "je", "v", "tom", "regálu", "vlevo", "."],
  },

  [phraseKey("oddělení", "a1-4")]: {
    sk: "Hledám oddělení s oblečením.",
    ua: "Я шукаю відділ з одягом.",
    ru: "Я ищу отдел с одеждой.",
    en: "I am looking for the clothing department.",
    tokens: ["Hledám", "oddělení", "s", "oblečením", "."],
  },

  [phraseKey("velikost", "a1-4")]: {
    sk: "Máte tuhle velikost?",
    ua: "У вас є цей розмір?",
    ru: "У вас есть этот размер?",
    en: "Do you have this size?",
    tokens: ["Máte", "tuhle", "velikost", "?"],
  },

  [phraseKey("zkusit", "a1-4")]: {
    sk: "Můžu si to zkusit?",
    ua: "Можна це приміряти?",
    ru: "Можно это примерить?",
    en: "Can I try this on?",
    tokens: ["Můžu", "si", "to", "zkusit", "?"],
  },

  [phraseKey("vyměnit", "a1-4")]: {
    sk: "Chtěl bych to vyměnit za větší.",
    ua: "Я хотів би це обміняти на більший розмір.",
    ru: "Я хотел бы обменять это на больший размер.",
    en: "I would like to exchange it for a bigger one.",
    tokens: ["Chtěl", "bych", "to", "vyměnit", "za", "větší", "."],
  },

  [phraseKey("vrátit", "a1-4")]: {
    sk: "Chci ten výrobek vrátit.",
    ua: "Я хочу повернути цей товар.",
    ru: "Я хочу вернуть этот товар.",
    en: "I want to return this product.",
    tokens: ["Chci", "ten", "výrobek", "vrátit", "."],
  },

  [phraseKey("záruka", "a1-4")]: {
    sk: "Na tohle zboží je dvouletá záruka.",
    ua: "На цей товар є дворічна гарантія.",
    ru: "На этот товар есть двухлетняя гарантия.",
    en: "This product has a two-year warranty.",
    tokens: ["Na", "tohle", "zboží", "je", "dvouletá", "záruka", "."],
  },

  [phraseKey("balení", "a1-4")]: {
    sk: "To balení je už otevřené.",
    ua: "Ця упаковка вже відкрита.",
    ru: "Эта упаковка уже открыта.",
    en: "That package is already open.",
    tokens: ["To", "balení", "je", "už", "otevřené", "."],
  },

  [phraseKey("účtovat", "a1-4")]: {
    sk: "Paní už účtuje nákup.",
    ua: "Пані вже пробиває покупку.",
    ru: "Женщина уже пробивает покупку.",
    en: "The lady is already checking out the purchase.",
    tokens: ["Paní", "už", "účtuje", "nákup", "."],
  },

  // =========================
  // LESSON A1-5 — Їжа (у ресторані)
  // =========================
  [phraseKey("objednat", "a1-5")]: {
    sk: "Chci si objednat oběd.",
    ua: "Я хочу замовити обід.",
    ru: "Я хочу заказать обед.",
    en: "I want to order lunch.",
    tokens: ["Chci", "si", "objednat", "oběd", "."],
  },

  [phraseKey("porce", "a1-5")]: {
    sk: "Ta porce je opravdu velká.",
    ua: "Ця порція справді велика.",
    ru: "Эта порция действительно большая.",
    en: "That portion is really large.",
    tokens: ["Ta", "porce", "je", "opravdu", "velká", "."],
  },

  [phraseKey("příloha", "a1-5")]: {
    sk: "Jakou přílohu si dáte?",
    ua: "Який гарнір ви будете брати?",
    ru: "Какой гарнир вы будете брать?",
    en: "Which side dish would you like?",
    tokens: ["Jakou", "přílohu", "si", "dáte", "?"],
  },

  [phraseKey("dezert", "a1-5")]: {
    sk: "Po večeři si dám dezert.",
    ua: "Після вечері я візьму десерт.",
    ru: "После ужина я возьму десерт.",
    en: "I will have dessert after dinner.",
    tokens: ["Po", "večeři", "si", "dám", "dezert", "."],
  },

  [phraseKey("chutný", "a1-5")]: {
    sk: "To jídlo je velmi chutné.",
    ua: "Ця їжа дуже смачна.",
    ru: "Эта еда очень вкусная.",
    en: "This food is very tasty.",
    tokens: ["To", "jídlo", "je", "velmi", "chutné", "."],
  },

  [phraseKey("hladový", "a1-5")]: {
    sk: "Jsem po práci hladový.",
    ua: "Я голодний після роботи.",
    ru: "Я голодный после работы.",
    en: "I am hungry after work.",
    tokens: ["Jsem", "po", "práci", "hladový", "."],
  },

  [phraseKey("žíznivý", "a1-5")]: {
    sk: "Po běhu jsem hodně žíznivý.",
    ua: "Після бігу я дуже хочу пити.",
    ru: "После бега я очень хочу пить.",
    en: "I am very thirsty after running.",
    tokens: ["Po", "běhu", "jsem", "hodně", "žíznivý", "."],
  },

  [phraseKey("účtovat", "a1-5")]: {
    sk: "Můžete nám účtovat?",
    ua: "Можете нам виставити рахунок?",
    ru: "Можете принести нам счёт?",
    en: "Can you bring us the bill?",
    tokens: ["Můžete", "nám", "účtovat", "?"],
  },

  [phraseKey("zaplatit", "a1-5")]: {
    sk: "Chci zaplatit kartou.",
    ua: "Я хочу заплатити карткою.",
    ru: "Я хочу заплатить картой.",
    en: "I want to pay by card.",
    tokens: ["Chci", "zaplatit", "kartou", "."],
  },

  [phraseKey("rezervace", "a1-5")]: {
    sk: "Máme rezervaci na osm hodin.",
    ua: "У нас бронювання на восьму годину.",
    ru: "У нас бронирование на восемь часов.",
    en: "We have a reservation for eight o’clock.",
    tokens: ["Máme", "rezervaci", "na", "osm", "hodin", "."],
  },

  // =========================
  // LESSON A1-6 — Транспорт
  // =========================
  [phraseKey("cestovní řád", "a1-6")]: {
    sk: "Podívám se do cestovního řádu.",
    ua: "Я подивлюся розклад.",
    ru: "Я посмотрю расписание.",
    en: "I will look at the timetable.",
    tokens: ["Podívám", "se", "do", "cestovního", "řádu", "."],
  },

  [phraseKey("přestup", "a1-6")]: {
    sk: "Máme jeden přestup v Olomouci.",
    ua: "У нас одна пересадка в Оломоуці.",
    ru: "У нас одна пересадка в Оломоуце.",
    en: "We have one transfer in Olomouc.",
    tokens: ["Máme", "jeden", "přestup", "v", "Olomouci", "."],
  },

  [phraseKey("nástupiště", "a1-6")]: {
    sk: "Vlak odjíždí z druhého nástupiště.",
    ua: "Поїзд відправляється з другої платформи.",
    ru: "Поезд отправляется со второй платформы.",
    en: "The train leaves from the second platform.",
    tokens: ["Vlak", "odjíždí", "z", "druhého", "nástupiště", "."],
  },

  [phraseKey("zpozdit se", "a1-6")]: {
    sk: "Autobus se může zpozdit.",
    ua: "Автобус може запізнитися.",
    ru: "Автобус может опоздать.",
    en: "The bus may be delayed.",
    tokens: ["Autobus", "se", "může", "zpozdit", "."],
  },

  [phraseKey("odchod", "a1-6")]: {
    sk: "Odchod je v 7:15.",
    ua: "Відправлення о 7:15.",
    ru: "Отправление в 7:15.",
    en: "Departure is at 7:15.",
    tokens: ["Odchod", "je", "v", "7:15", "."],
  },

  [phraseKey("příchod", "a1-6")]: {
    sk: "Příchod je plánovaný na večer.",
    ua: "Прибуття заплановане на вечір.",
    ru: "Прибытие запланировано на вечер.",
    en: "Arrival is planned for the evening.",
    tokens: ["Příchod", "je", "plánovaný", "na", "večer", "."],
  },

  [phraseKey("lístek", "a1-6")]: {
    sk: "Kde si můžu koupit lístek?",
    ua: "Де я можу купити квиток?",
    ru: "Где я могу купить билет?",
    en: "Where can I buy a ticket?",
    tokens: ["Kde", "si", "můžu", "koupit", "lístek", "?"],
  },

  [phraseKey("koupit", "a1-6")]: {
    sk: "Potřebuji koupit jízdenku.",
    ua: "Мені треба купити квиток.",
    ru: "Мне нужно купить билет.",
    en: "I need to buy a ticket.",
    tokens: ["Potřebuji", "koupit", "jízdenku", "."],
  },

  [phraseKey("vystoupit", "a1-6")]: {
    sk: "Musíte vystoupit na další zastávce.",
    ua: "Вам треба вийти на наступній зупинці.",
    ru: "Вам нужно выйти на следующей остановке.",
    en: "You have to get off at the next stop.",
    tokens: ["Musíte", "vystoupit", "na", "další", "zastávce", "."],
  },

  [phraseKey("nastoupit", "a1-6")]: {
    sk: "Kdy máme nastoupit do vlaku?",
    ua: "Коли нам сідати в поїзд?",
    ru: "Когда нам садиться в поезд?",
    en: "When do we have to board the train?",
    tokens: ["Kdy", "máme", "nastoupit", "do", "vlaku", "?"],
  },

  // =========================
  // LESSON A1-7 — Дім (побутові дії)
  // =========================
  [phraseKey("vařit", "a1-7")]: {
    sk: "Dnes budu vařit večeři.",
    ua: "Сьогодні я буду готувати вечерю.",
    ru: "Сегодня я буду готовить ужин.",
    en: "Today I will cook dinner.",
    tokens: ["Dnes", "budu", "vařit", "večeři", "."],
  },

  [phraseKey("uklízet", "a1-7")]: {
    sk: "V sobotu uklízím celý byt.",
    ua: "У суботу я прибираю всю квартиру.",
    ru: "В субботу я убираю всю квартиру.",
    en: "On Saturday I clean the whole apartment.",
    tokens: ["V", "sobotu", "uklízím", "celý", "byt", "."],
  },

  [phraseKey("umývat", "a1-7")]: {
    sk: "Musím umývat nádobí.",
    ua: "Мені треба мити посуд.",
    ru: "Мне нужно мыть посуду.",
    en: "I have to wash the dishes.",
    tokens: ["Musím", "umývat", "nádobí", "."],
  },

  [phraseKey("prát", "a1-7")]: {
    sk: "Dnes budu prát oblečení.",
    ua: "Сьогодні я буду прати одяг.",
    ru: "Сегодня я буду стирать одежду.",
    en: "Today I will wash the clothes.",
    tokens: ["Dnes", "budu", "prát", "oblečení", "."],
  },

  [phraseKey("žehlit", "a1-7")]: {
    sk: "Nemám rád žehlit košile.",
    ua: "Я не люблю прасувати сорочки.",
    ru: "Я не люблю гладить рубашки.",
    en: "I do not like ironing shirts.",
    tokens: ["Nemám", "rád", "žehlit", "košile", "."],
  },

  [phraseKey("otevřít", "a1-7")]: {
    sk: "Můžeš otevřít okno?",
    ua: "Можеш відкрити вікно?",
    ru: "Можешь открыть окно?",
    en: "Can you open the window?",
    tokens: ["Můžeš", "otevřít", "okno", "?"],
  },

  [phraseKey("zavřít", "a1-7")]: {
    sk: "Prosím, zavři dveře.",
    ua: "Будь ласка, закрий двері.",
    ru: "Пожалуйста, закрой дверь.",
    en: "Please close the door.",
    tokens: ["Prosím", ",", "zavři", "dveře", "."],
  },

  [phraseKey("zapnout", "a1-7")]: {
    sk: "Zapni prosím světlo.",
    ua: "Увімкни, будь ласка, світло.",
    ru: "Включи, пожалуйста, свет.",
    en: "Please turn on the light.",
    tokens: ["Zapni", "prosím", "světlo", "."],
  },

  [phraseKey("vypnout", "a1-7")]: {
    sk: "Nezapomeň vypnout televizi.",
    ua: "Не забудь вимкнути телевізор.",
    ru: "Не забудь выключить телевизор.",
    en: "Do not forget to turn off the TV.",
    tokens: ["Nezapomeň", "vypnout", "televizi", "."],
  },

  [phraseKey("hledat", "a1-7")]: {
    sk: "Už dlouho hledám klíče.",
    ua: "Я вже довго шукаю ключі.",
    ru: "Я уже долго ищу ключи.",
    en: "I have been looking for the keys for a long time.",
    tokens: ["Už", "dlouho", "hledám", "klíče", "."],
  },

  // =========================
  // LESSON A1-8 — Робота (процеси)
  // =========================
  [phraseKey("pracoviště", "a1-8")]: {
    sk: "Moje pracoviště je v hale B.",
    ua: "Моє робоче місце в залі B.",
    ru: "Моё рабочее место в зале B.",
    en: "My workplace is in hall B.",
    tokens: ["Moje", "pracoviště", "je", "v", "hale", "B", "."],
  },

  [phraseKey("změna", "a1-8")]: {
    sk: "Dnes mám ranní změnu.",
    ua: "Сьогодні в мене ранкова зміна.",
    ru: "Сегодня у меня утренняя смена.",
    en: "Today I have the morning shift.",
    tokens: ["Dnes", "mám", "ranní", "změnu", "."],
  },

  [phraseKey("přesčas", "a1-8")]: {
    sk: "Včera jsem pracoval přesčas.",
    ua: "Учора я працював надурочно.",
    ru: "Вчера я работал сверхурочно.",
    en: "Yesterday I worked overtime.",
    tokens: ["Včera", "jsem", "pracoval", "přesčas", "."],
  },

  [phraseKey("porada", "a1-8")]: {
    sk: "Ráno máme krátkou poradu.",
    ua: "Вранці у нас коротка нарада.",
    ru: "Утром у нас короткое совещание.",
    en: "We have a short meeting in the morning.",
    tokens: ["Ráno", "máme", "krátkou", "poradu", "."],
  },

  [phraseKey("úloha", "a1-8")]: {
    sk: "Tohle je moje dnešní úloha.",
    ua: "Це моє сьогоднішнє завдання.",
    ru: "Это моё сегодняшнее задание.",
    en: "This is my task for today.",
    tokens: ["Tohle", "je", "moje", "dnešní", "úloha", "."],
  },

  [phraseKey("hotovo", "a1-8")]: {
    sk: "Už je to hotovo.",
    ua: "Вже готово.",
    ru: "Уже готово.",
    en: "It is already done.",
    tokens: ["Už", "je", "to", "hotovo", "."],
  },

  [phraseKey("zkontrolovat", "a1-8")]: {
    sk: "Musím to ještě zkontrolovat.",
    ua: "Мені треба це ще перевірити.",
    ru: "Мне нужно это ещё проверить.",
    en: "I still have to check it.",
    tokens: ["Musím", "to", "ještě", "zkontrolovat", "."],
  },

  [phraseKey("opravit", "a1-8")]: {
    sk: "Technik přijde stroj opravit.",
    ua: "Технік прийде полагодити верстат.",
    ru: "Техник придёт починить станок.",
    en: "The technician will come to repair the machine.",
    tokens: ["Technik", "přijde", "stroj", "opravit", "."],
  },

  [phraseKey("začít", "a1-8")]: {
    sk: "Kdy máme začít pracovat?",
    ua: "Коли нам почати працювати?",
    ru: "Когда нам начать работать?",
    en: "When do we have to start working?",
    tokens: ["Kdy", "máme", "začít", "pracovat", "?"],
  },

  [phraseKey("skončit", "a1-8")]: {
    sk: "Dnes skončím v pět hodin.",
    ua: "Сьогодні я закінчу о п’ятій годині.",
    ru: "Сегодня я закончу в пять часов.",
    en: "Today I will finish at five o’clock.",
    tokens: ["Dnes", "skončím", "v", "pět", "hodin", "."],
  },

  // =========================
  // LESSON A1-9 — Емоції і стани
  // =========================
  [phraseKey("unavený", "a1-9")]: {
    sk: "Po práci jsem unavený.",
    ua: "Після роботи я втомлений.",
    ru: "После работы я уставший.",
    en: "I am tired after work.",
    tokens: ["Po", "práci", "jsem", "unavený", "."],
  },

  [phraseKey("šťastný", "a1-9")]: {
    sk: "Dnes jsem opravdu šťastný.",
    ua: "Сьогодні я справді щасливий.",
    ru: "Сегодня я действительно счастлив.",
    en: "Today I am really happy.",
    tokens: ["Dnes", "jsem", "opravdu", "šťastný", "."],
  },

  [phraseKey("smutný", "a1-9")]: {
    sk: "Byl jsem z té zprávy smutný.",
    ua: "Я був сумний через цю новину.",
    ru: "Я был грустный из-за этой новости.",
    en: "I was sad because of that news.",
    tokens: ["Byl", "jsem", "z", "té", "zprávy", "smutný", "."],
  },

  [phraseKey("naštvaný", "a1-9")]: {
    sk: "Je naštvaný kvůli zpoždění.",
    ua: "Він злий через запізнення.",
    ru: "Он злой из-за опоздания.",
    en: "He is angry because of the delay.",
    tokens: ["Je", "naštvaný", "kvůli", "zpoždění", "."],
  },

  [phraseKey("nervózní", "a1-9")]: {
    sk: "Před zkouškou jsem nervózní.",
    ua: "Перед іспитом я нервуюся.",
    ru: "Перед экзаменом я нервничаю.",
    en: "I am nervous before the exam.",
    tokens: ["Před", "zkouškou", "jsem", "nervózní", "."],
  },

  [phraseKey("pokojný", "a1-9")]: {
    sk: "Večer je tady velmi pokojný.",
    ua: "Увечері тут дуже спокійно.",
    ru: "Вечером здесь очень спокойно.",
    en: "It is very peaceful here in the evening.",
    tokens: ["Večer", "je", "tady", "velmi", "pokojný", "."],
  },

  [phraseKey("překvapený", "a1-9")]: {
    sk: "Byl jsem tím výsledkem překvapený.",
    ua: "Я був здивований цим результатом.",
    ru: "Я был удивлён этим результатом.",
    en: "I was surprised by that result.",
    tokens: ["Byl", "jsem", "tím", "výsledkem", "překvapený", "."],
  },

  [phraseKey("bát se", "a1-9")]: {
    sk: "Nemusíš se toho bát.",
    ua: "Тобі не треба цього боятися.",
    ru: "Тебе не нужно этого бояться.",
    en: "You do not have to be afraid of it.",
    tokens: ["Nemusíš", "se", "toho", "bát", "."],
  },

  [phraseKey("těšit se", "a1-9")]: {
    sk: "Těším se na víkend.",
    ua: "Я з нетерпінням чекаю вихідних.",
    ru: "Я с нетерпением жду выходных.",
    en: "I am looking forward to the weekend.",
    tokens: ["Těším", "se", "na", "víkend", "."],
  },

  [phraseKey("mít chuť", "a1-9")]: {
    sk: "Dnes mám chuť na kávu.",
    ua: "Сьогодні я хочу кави.",
    ru: "Сегодня мне хочется кофе.",
    en: "Today I feel like having coffee.",
    tokens: ["Dnes", "mám", "chuť", "na", "kávu", "."],
  },

  // =========================
  // LESSON A1-10 — Запитання
  // =========================
  [phraseKey("který", "a1-10")]: {
    sk: "Který autobus jede do centra?",
    ua: "Який автобус їде до центру?",
    ru: "Какой автобус едет в центр?",
    en: "Which bus goes to the centre?",
    tokens: ["Který", "autobus", "jede", "do", "centra", "?"],
  },

  [phraseKey("jaký", "a1-10")]: {
    sk: "Jaký film máš rád?",
    ua: "Який фільм тобі подобається?",
    ru: "Какой фильм тебе нравится?",
    en: "What kind of film do you like?",
    tokens: ["Jaký", "film", "máš", "rád", "?"],
  },

  [phraseKey("čí", "a1-10")]: {
    sk: "Čí je to taška?",
    ua: "Чия це сумка?",
    ru: "Чья это сумка?",
    en: "Whose bag is this?",
    tokens: ["Čí", "je", "to", "taška", "?"],
  },

  [phraseKey("kde je", "a1-10")]: {
    sk: "Kde je nejbližší banka?",
    ua: "Де найближчий банк?",
    ru: "Где ближайший банк?",
    en: "Where is the nearest bank?",
    tokens: ["Kde", "je", "nejbližší", "banka", "?"],
  },

  [phraseKey("kolik to stojí", "a1-10")]: {
    sk: "Promiňte, kolik to stojí?",
    ua: "Перепрошую, скільки це коштує?",
    ru: "Извините, сколько это стоит?",
    en: "Excuse me, how much does it cost?",
    tokens: ["Promiňte", ",", "kolik", "to", "stojí", "?"],
  },

  [phraseKey("můžete zopakovat", "a1-10")]: {
    sk: "Prosím, můžete to zopakovat?",
    ua: "Будь ласка, можете це повторити?",
    ru: "Пожалуйста, можете это повторить?",
    en: "Please, can you repeat that?",
    tokens: ["Prosím", ",", "můžete", "to", "zopakovat", "?"],
  },

  [phraseKey("co to znamená", "a1-10")]: {
    sk: "Co to znamená česky?",
    ua: "Що це означає чеською?",
    ru: "Что это значит по-чешски?",
    en: "What does it mean in Czech?",
    tokens: ["Co", "to", "znamená", "česky", "?"],
  },

  [phraseKey("rozumíte", "a1-10")]: {
    sk: "Rozumíte této otázce?",
    ua: "Ви розумієте це питання?",
    ru: "Вы понимаете этот вопрос?",
    en: "Do you understand this question?",
    tokens: ["Rozumíte", "této", "otázce", "?"],
  },

  [phraseKey("samozřejmě", "a1-10")]: {
    sk: "Samozřejmě, rád pomůžu.",
    ua: "Звісно, я з радістю допоможу.",
    ru: "Конечно, я с радостью помогу.",
    en: "Of course, I will gladly help.",
    tokens: ["Samozřejmě", ",", "rád", "pomůžu", "."],
  },

  [phraseKey("nevím", "a1-10")]: {
    sk: "Nevím, zkusím to zjistit.",
    ua: "Не знаю, спробую це з’ясувати.",
    ru: "Не знаю, попробую это выяснить.",
    en: "I do not know, I will try to find out.",
    tokens: ["Nevím", ",", "zkusím", "to", "zjistit", "."],
  },
};
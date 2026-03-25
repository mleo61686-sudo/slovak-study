import type { Phrase } from "../registry";
import { phraseKey } from "../phraseKey";

export const CS_A2_PHRASES_1: Record<string, Phrase> = {
  // =========================
  // LESSON A2-1 — Дім і побут (розширено)
  // =========================
  [phraseKey("nájem", "a2-1")]: {
    sk: "Nájem za byt je tento měsíc vyšší.",
    ua: "Оренда за квартиру цього місяця вища.",
    ru: "Аренда за квартиру в этом месяце выше.",
    tokens: ["Nájem", "za", "byt", "je", "tento", "měsíc", "vyšší", "."],
  },

  [phraseKey("nájemní smlouva", "a2-1")]: {
    sk: "Musím si ještě přečíst nájemní smlouvu.",
    ua: "Мені ще треба прочитати договір оренди.",
    ru: "Мне ещё нужно прочитать договор аренды.",
    tokens: ["Musím", "si", "ještě", "přečíst", "nájemní", "smlouvu", "."],
  },

  [phraseKey("majitel", "a2-1")]: {
    sk: "Majitel bytu přijde večer.",
    ua: "Власник квартири прийде ввечері.",
    ru: "Владелец квартиры придёт вечером.",
    tokens: ["Majitel", "bytu", "přijde", "večer", "."],
  },

  [phraseKey("podnájemník", "a2-1")]: {
    sk: "Nový podnájemník se nastěhuje zítra.",
    ua: "Новий орендар заселиться завтра.",
    ru: "Новый арендатор заселится завтра.",
    tokens: ["Nový", "podnájemník", "se", "nastěhuje", "zítra", "."],
  },

  [phraseKey("účty", "a2-1")]: {
    sk: "Účty za vodu a plyn už přišly.",
    ua: "Рахунки за воду і газ уже прийшли.",
    ru: "Счета за воду и газ уже пришли.",
    tokens: ["Účty", "za", "vodu", "a", "plyn", "už", "přišly", "."],
  },

  [phraseKey("energie", "a2-1")]: {
    sk: "Ceny energie jsou letos vyšší.",
    ua: "Ціни на комунальні послуги цього року вищі.",
    ru: "Цены на коммунальные услуги в этом году выше.",
    tokens: ["Ceny", "energie", "jsou", "letos", "vyšší", "."],
  },

  [phraseKey("oprava", "a2-1")]: {
    sk: "Oprava pračky bude stát dost peněz.",
    ua: "Ремонт пральної машини коштуватиме чимало грошей.",
    ru: "Ремонт стиральной машины будет стоить немало денег.",
    tokens: ["Oprava", "pračky", "bude", "stát", "dost", "peněz", "."],
  },

  [phraseKey("pokazený", "a2-1")]: {
    sk: "Kotel je zase pokazený.",
    ua: "Котел знову зламаний.",
    ru: "Котёл опять сломан.",
    tokens: ["Kotel", "je", "zase", "pokazený", "."],
  },

  [phraseKey("soused", "a2-1")]: {
    sk: "Náš soused je velmi ochotný.",
    ua: "Наш сусід дуже охочий допомогти.",
    ru: "Наш сосед очень отзывчивый.",
    tokens: ["Náš", "soused", "je", "velmi", "ochotný", "."],
  },

  [phraseKey("stěhování", "a2-1")]: {
    sk: "Stěhování do nového bytu bylo náročné.",
    ua: "Переїзд до нової квартири був складним.",
    ru: "Переезд в новую квартиру был сложным.",
    tokens: ["Stěhování", "do", "nového", "bytu", "bylo", "náročné", "."],
  },

  // =========================
  // LESSON A2-2 — У лікаря
  // =========================
  [phraseKey("vyšetření", "a2-2")]: {
    sk: "Lékař mi doporučil další vyšetření.",
    ua: "Лікар порекомендував мені додаткове обстеження.",
    ru: "Врач порекомендовал мне дополнительное обследование.",
    tokens: ["Lékař", "mi", "doporučil", "další", "vyšetření", "."],
  },

  [phraseKey("diagnóza", "a2-2")]: {
    sk: "Na přesnou diagnózu ještě čekáme.",
    ua: "На точний діагноз ми ще чекаємо.",
    ru: "Точного диагноза мы ещё ждём.",
    tokens: ["Na", "přesnou", "diagnózu", "ještě", "čekáme", "."],
  },

  [phraseKey("příznak", "a2-2")]: {
    sk: "Prvním příznakem byla únava.",
    ua: "Першим симптомом була втома.",
    ru: "Первым симптомом была усталость.",
    tokens: ["Prvním", "příznakem", "byla", "únava", "."],
  },

  [phraseKey("bolest v krku", "a2-2")]: {
    sk: "Od rána mám bolest v krku.",
    ua: "Від ранку в мене болить горло.",
    ru: "С утра у меня болит горло.",
    tokens: ["Od", "rána", "mám", "bolest", "v", "krku", "."],
  },

  [phraseKey("teploměr", "a2-2")]: {
    sk: "Teploměr ukázal skoro třicet devět.",
    ua: "Термометр показав майже тридцять дев’ять.",
    ru: "Термометр показал почти тридцать девять.",
    tokens: ["Teploměr", "ukázal", "skoro", "třicet", "devět", "."],
  },

  [phraseKey("krvní tlak", "a2-2")]: {
    sk: "Sestra mi změřila krevní tlak.",
    ua: "Медсестра поміряла мені артеріальний тиск.",
    ru: "Медсестра измерила мне артериальное давление.",
    tokens: ["Sestra", "mi", "změřila", "krevní", "tlak", "."],
  },

  [phraseKey("recept", "a2-2")]: {
    sk: "Lékař mi vystavil recept na antibiotika.",
    ua: "Лікар виписав мені рецепт на антибіотики.",
    ru: "Врач выписал мне рецепт на антибиотики.",
    tokens: ["Lékař", "mi", "vystavil", "recept", "na", "antibiotika", "."],
  },

  [phraseKey("alergie", "a2-2")]: {
    sk: "Mám alergii na pyl.",
    ua: "У мене алергія на пилок.",
    ru: "У меня аллергия на пыльцу.",
    tokens: ["Mám", "alergii", "na", "pyl", "."],
  },

  [phraseKey("zánět", "a2-2")]: {
    sk: "Ukázalo se, že jde o zánět.",
    ua: "Виявилося, що це запалення.",
    ru: "Оказалось, что это воспаление.",
    tokens: ["Ukázalo", "se", ",", "že", "jde", "o", "zánět", "."],
  },

  [phraseKey("doporučení", "a2-2")]: {
    sk: "Dostal jsem doporučení k odborníkovi.",
    ua: "Я отримав направлення до спеціаліста.",
    ru: "Я получил направление к специалисту.",
    tokens: ["Dostal", "jsem", "doporučení", "k", "odborníkovi", "."],
  },

  // =========================
  // LESSON A2-3 — Місто та послуги
  // =========================
  [phraseKey("městský úřad", "a2-3")]: {
    sk: "Zítra musím na městský úřad.",
    ua: "Завтра мені треба в мерію.",
    ru: "Завтра мне нужно в мэрию.",
    tokens: ["Zítra", "musím", "na", "městský", "úřad", "."],
  },

  [phraseKey("oddělení", "a2-3")]: {
    sk: "Nevím, na které oddělení mám jít.",
    ua: "Я не знаю, у який відділ мені йти.",
    ru: "Я не знаю, в какой отдел мне идти.",
    tokens: ["Nevím", ",", "na", "které", "oddělení", "mám", "jít", "."],
  },

  [phraseKey("žadatel", "a2-3")]: {
    sk: "Každý žadatel musí ukázat doklad.",
    ua: "Кожен заявник повинен показати документ.",
    ru: "Каждый заявитель должен показать документ.",
    tokens: ["Každý", "žadatel", "musí", "ukázat", "doklad", "."],
  },

  [phraseKey("žádost", "a2-3")]: {
    sk: "Žádost můžete podat online.",
    ua: "Заяву можна подати онлайн.",
    ru: "Заявление можно подать онлайн.",
    tokens: ["Žádost", "můžete", "podat", "online", "."],
  },

  [phraseKey("doklad", "a2-3")]: {
    sk: "Bez dokladu to nepůjde.",
    ua: "Без документа це не вийде.",
    ru: "Без документа это не получится.",
    tokens: ["Bez", "dokladu", "to", "nepůjde", "."],
  },

  [phraseKey("potvrzení", "a2-3")]: {
    sk: "Potřebuji potvrzení o bydlení.",
    ua: "Мені потрібна довідка про проживання.",
    ru: "Мне нужна справка о проживании.",
    tokens: ["Potřebuji", "potvrzení", "o", "bydlení", "."],
  },

  [phraseKey("poplatek", "a2-3")]: {
    sk: "Za vystavení dokladu se platí poplatek.",
    ua: "За оформлення документа сплачується збір.",
    ru: "За оформление документа платится сбор.",
    tokens: ["Za", "vystavení", "dokladu", "se", "platí", "poplatek", "."],
  },

  [phraseKey("objednat se", "a2-3")]: {
    sk: "Musíte se předem objednat.",
    ua: "Вам потрібно записатися заздалегідь.",
    ru: "Вам нужно записаться заранее.",
    tokens: ["Musíte", "se", "předem", "objednat", "."],
  },

  [phraseKey("otevírací hodiny", "a2-3")]: {
    sk: "Otevírací hodiny jsou na webu.",
    ua: "Години роботи є на сайті.",
    ru: "Часы работы есть на сайте.",
    tokens: ["Otevírací", "hodiny", "jsou", "na", "webu", "."],
  },

  [phraseKey("formulář", "a2-3")]: {
    sk: "Nejdřív vyplňte tento formulář.",
    ua: "Спочатку заповніть цей бланк.",
    ru: "Сначала заполните этот бланк.",
    tokens: ["Nejdřív", "vyplňte", "tento", "formulář", "."],
  },

  // =========================
  // LESSON A2-4 — Робота та карʼєра
  // =========================
  [phraseKey("pohovor", "a2-4")]: {
    sk: "Příští týden mám pracovní pohovor.",
    ua: "Наступного тижня в мене співбесіда.",
    ru: "На следующей неделе у меня собеседование.",
    tokens: ["Příští", "týden", "mám", "pracovní", "pohovor", "."],
  },

  [phraseKey("životopis", "a2-4")]: {
    sk: "Poslal jsem životopis e-mailem.",
    ua: "Я надіслав резюме електронною поштою.",
    ru: "Я отправил резюме по электронной почте.",
    tokens: ["Poslal", "jsem", "životopis", "e-mailem", "."],
  },

  [phraseKey("praxe", "a2-4")]: {
    sk: "Na tuto pozici chtějí aspoň dva roky praxe.",
    ua: "На цю посаду хочуть щонайменше два роки досвіду.",
    ru: "На эту должность хотят минимум два года опыта.",
    tokens: ["Na", "tuto", "pozici", "chtějí", "aspoň", "dva", "roky", "praxe", "."],
  },

  [phraseKey("zručnost", "a2-4")]: {
    sk: "Komunikace je důležitá zručnost.",
    ua: "Комунікація — важлива навичка.",
    ru: "Коммуникация — важный навык.",
    tokens: ["Komunikace", "je", "důležitá", "zručnost", "."],
  },

  [phraseKey("požadavek", "a2-4")]: {
    sk: "Jedním z požadavků je znalost češtiny.",
    ua: "Однією з вимог є знання чеської.",
    ru: "Одно из требований — знание чешского.",
    tokens: ["Jedním", "z", "požadavků", "je", "znalost", "češtiny", "."],
  },

  [phraseKey("pracovní nabídka", "a2-4")]: {
    sk: "Ta pracovní nabídka vypadá zajímavě.",
    ua: "Ця вакансія виглядає цікаво.",
    ru: "Эта вакансия выглядит интересно.",
    tokens: ["Ta", "pracovní", "nabídka", "vypadá", "zajímavě", "."],
  },

  [phraseKey("pracovní pozice", "a2-4")]: {
    sk: "O jakou pracovní pozici máte zájem?",
    ua: "Яка посада вас цікавить?",
    ru: "Какая должность вас интересует?",
    tokens: ["O", "jakou", "pracovní", "pozici", "máte", "zájem", "?"],
  },

  [phraseKey("odpovědnost", "a2-4")]: {
    sk: "Tato práce vyžaduje velkou odpovědnost.",
    ua: "Ця робота вимагає великої відповідальності.",
    ru: "Эта работа требует большой ответственности.",
    tokens: ["Tato", "práce", "vyžaduje", "velkou", "odpovědnost", "."],
  },

  [phraseKey("výhody", "a2-4")]: {
    sk: "Firma nabízí dobré výhody.",
    ua: "Компанія пропонує хороші бонуси.",
    ru: "Компания предлагает хорошие бонусы.",
    tokens: ["Firma", "nabízí", "dobré", "výhody", "."],
  },

  [phraseKey("zkoušební doba", "a2-4")]: {
    sk: "Zkušební doba trvá tři měsíce.",
    ua: "Випробувальний термін триває три місяці.",
    ru: "Испытательный срок длится три месяца.",
    tokens: ["Zkušební", "doba", "trvá", "tři", "měsíce", "."],
  },

  // =========================
  // LESSON A2-5 — Подорожі (ситуації)
  // =========================
  [phraseKey("rezervace", "a2-5")]: {
    sk: "Naše rezervace je potvrzená.",
    ua: "Наше бронювання підтверджене.",
    ru: "Наше бронирование подтверждено.",
    tokens: ["Naše", "rezervace", "je", "potvrzená", "."],
  },

  [phraseKey("ubytování", "a2-5")]: {
    sk: "Hledáme levné ubytování v centru.",
    ua: "Ми шукаємо недороге проживання в центрі.",
    ru: "Мы ищем недорогое проживание в центре.",
    tokens: ["Hledáme", "levné", "ubytování", "v", "centru", "."],
  },

  [phraseKey("potvrdit", "a2-5")]: {
    sk: "Musíte potvrdit rezervaci do večera.",
    ua: "Вам потрібно підтвердити бронювання до вечора.",
    ru: "Вам нужно подтвердить бронь до вечера.",
    tokens: ["Musíte", "potvrdit", "rezervaci", "do", "večera", "."],
  },

  [phraseKey("zrušit", "a2-5")]: {
    sk: "Bohužel musíme cestu zrušit.",
    ua: "На жаль, ми мусимо скасувати поїздку.",
    ru: "К сожалению, нам нужно отменить поездку.",
    tokens: ["Bohužel", "musíme", "cestu", "zrušit", "."],
  },

  [phraseKey("zpoždění", "a2-5")]: {
    sk: "Let má hodinové zpoždění.",
    ua: "Рейс має годинну затримку.",
    ru: "У рейса задержка на час.",
    tokens: ["Let", "má", "hodinové", "zpoždění", "."],
  },

  [phraseKey("přesun", "a2-5")]: {
    sk: "Přesun na hotel zajistí řidič.",
    ua: "Трансфер до готелю забезпечить водій.",
    ru: "Трансфер в отель обеспечит водитель.",
    tokens: ["Přesun", "na", "hotel", "zajistí", "řidič", "."],
  },

  [phraseKey("jednosměrný", "a2-5")]: {
    sk: "Chci koupit jednosměrný lístek.",
    ua: "Я хочу купити квиток в один бік.",
    ru: "Я хочу купить билет в одну сторону.",
    tokens: ["Chci", "koupit", "jednosměrný", "lístek", "."],
  },

  [phraseKey("zpáteční", "a2-5")]: {
    sk: "Je zpáteční jízdenka levnější?",
    ua: "Квиток туди-й-назад дешевший?",
    ru: "Билет туда-обратно дешевле?",
    tokens: ["Je", "zpáteční", "jízdenka", "levnější", "?"],
  },

  [phraseKey("cestovní pojištění", "a2-5")]: {
    sk: "Bez cestovního pojištění nejedu.",
    ua: "Без туристичної страховки я не їду.",
    ru: "Без туристической страховки я не еду.",
    tokens: ["Bez", "cestovního", "pojištění", "nejedu", "."],
  },

  [phraseKey("zavazadlo", "a2-5")]: {
    sk: "Moje zavazadlo je moc těžké.",
    ua: "Мій багаж занадто важкий.",
    ru: "Мой багаж слишком тяжёлый.",
    tokens: ["Moje", "zavazadlo", "je", "moc", "těžké", "."],
  },

  // =========================
  // LESSON A2-6 — Гроші та фінанси
  // =========================
  [phraseKey("rozpočet", "a2-6")]: {
    sk: "Tento měsíc musíme hlídat rozpočet.",
    ua: "Цього місяця нам треба стежити за бюджетом.",
    ru: "В этом месяце нам нужно следить за бюджетом.",
    tokens: ["Tento", "měsíc", "musíme", "hlídat", "rozpočet", "."],
  },

  [phraseKey("příjem", "a2-6")]: {
    sk: "Můj příjem teď nestačí na všechno.",
    ua: "Мого доходу зараз не вистачає на все.",
    ru: "Моего дохода сейчас не хватает на всё.",
    tokens: ["Můj", "příjem", "teď", "nestačí", "na", "všechno", "."],
  },

  [phraseKey("výdaje", "a2-6")]: {
    sk: "Naše výdaje jsou letos vyšší.",
    ua: "Наші витрати цього року вищі.",
    ru: "Наши расходы в этом году выше.",
    tokens: ["Naše", "výdaje", "jsou", "letos", "vyšší", "."],
  },

  [phraseKey("ušetřit", "a2-6")]: {
    sk: "Chci tento měsíc trochu ušetřit.",
    ua: "Я хочу цього місяця трохи заощадити.",
    ru: "Я хочу в этом месяце немного сэкономить.",
    tokens: ["Chci", "tento", "měsíc", "trochu", "ušetřit", "."],
  },

  [phraseKey("minout", "a2-6")]: {
    sk: "Nechtěl jsem minout tolik peněz.",
    ua: "Я не хотів витратити стільки грошей.",
    ru: "Я не хотел потратить столько денег.",
    tokens: ["Nechtěl", "jsem", "minout", "tolik", "peněz", "."],
  },

  [phraseKey("převod", "a2-6")]: {
    sk: "Bankovní převod trvá jeden den.",
    ua: "Банківський переказ триває один день.",
    ru: "Банковский перевод длится один день.",
    tokens: ["Bankovní", "převod", "trvá", "jeden", "den", "."],
  },

  [phraseKey("bankovní účet", "a2-6")]: {
    sk: "Potřebuji nový bankovní účet.",
    ua: "Мені потрібен новий банківський рахунок.",
    ru: "Мне нужен новый банковский счёт.",
    tokens: ["Potřebuji", "nový", "bankovní", "účet", "."],
  },

  [phraseKey("trvalý příkaz", "a2-6")]: {
    sk: "Nájem platím přes trvalý příkaz.",
    ua: "Оренду я плачу через автоплатіж.",
    ru: "Аренду я плачу через постоянное поручение.",
    tokens: ["Nájem", "platím", "přes", "trvalý", "příkaz", "."],
  },

  [phraseKey("úrok", "a2-6")]: {
    sk: "Banka zvýšila úrok na spoření.",
    ua: "Банк підвищив відсоток на заощадження.",
    ru: "Банк повысил процент по сбережениям.",
    tokens: ["Banka", "zvýšila", "úrok", "na", "spoření", "."],
  },

  [phraseKey("poplatek", "a2-6")]: {
    sk: "Za výběr je malý poplatek.",
    ua: "За зняття є невелика комісія.",
    ru: "За снятие есть небольшая комиссия.",
    tokens: ["Za", "výběr", "je", "malý", "poplatek", "."],
  },

  // =========================
  // LESSON A2-7 — Комунікація та думки
  // =========================
  [phraseKey("podle mě", "a2-7")]: {
    sk: "Podle mě je to dobrý nápad.",
    ua: "На мою думку, це хороша ідея.",
    ru: "По-моему, это хорошая идея.",
    tokens: ["Podle", "mě", "je", "to", "dobrý", "nápad", "."],
  },

  [phraseKey("myslím si", "a2-7")]: {
    sk: "Myslím si, že máš pravdu.",
    ua: "Я думаю, що ти маєш рацію.",
    ru: "Я думаю, что ты прав.",
    tokens: ["Myslím", "si", ",", "že", "máš", "pravdu", "."],
  },

  [phraseKey("zdá se mi", "a2-7")]: {
    sk: "Zdá se mi, že je unavený.",
    ua: "Мені здається, що він втомлений.",
    ru: "Мне кажется, что он устал.",
    tokens: ["Zdá", "se", "mi", ",", "že", "je", "unavený", "."],
  },

  [phraseKey("navrhnout", "a2-7")]: {
    sk: "Chci navrhnout jiné řešení.",
    ua: "Я хочу запропонувати інше рішення.",
    ru: "Я хочу предложить другое решение.",
    tokens: ["Chci", "navrhnout", "jiné", "řešení", "."],
  },

  [phraseKey("shrnout", "a2-7")]: {
    sk: "Na konci to můžu stručně shrnout.",
    ua: "Наприкінці я можу коротко це підсумувати.",
    ru: "В конце я могу кратко это подытожить.",
    tokens: ["Na", "konci", "to", "můžu", "stručně", "shrnout", "."],
  },

  [phraseKey("vyjádřit názor", "a2-7")]: {
    sk: "Každý má právo vyjádřit názor.",
    ua: "Кожен має право висловити думку.",
    ru: "Каждый имеет право выразить мнение.",
    tokens: ["Každý", "má", "právo", "vyjádřit", "názor", "."],
  },

  [phraseKey("argumentovat", "a2-7")]: {
    sk: "Musíš klidně argumentovat.",
    ua: "Ти маєш спокійно аргументувати.",
    ru: "Ты должен спокойно аргументировать.",
    tokens: ["Musíš", "klidně", "argumentovat", "."],
  },

  [phraseKey("přesvědčit", "a2-7")]: {
    sk: "Nepodařilo se mi ho přesvědčit.",
    ua: "Мені не вдалося його переконати.",
    ru: "Мне не удалось его убедить.",
    tokens: ["Nepodařilo", "se", "mi", "ho", "přesvědčit", "."],
  },

  [phraseKey("zmínit", "a2-7")]: {
    sk: "Zapomněl jsem zmínit jednu věc.",
    ua: "Я забув згадати одну річ.",
    ru: "Я забыл упомянуть одну вещь.",
    tokens: ["Zapomněl", "jsem", "zmínit", "jednu", "věc", "."],
  },

  [phraseKey("reagovat", "a2-7")]: {
    sk: "Musíme reagovat rychleji.",
    ua: "Ми маємо реагувати швидше.",
    ru: "Мы должны реагировать быстрее.",
    tokens: ["Musíme", "reagovat", "rychleji", "."],
  },

  // =========================
  // LESSON A2-8 — Час, плани, події
  // =========================
  [phraseKey("posunout", "a2-8")]: {
    sk: "Musíme schůzku posunout na pátek.",
    ua: "Нам треба перенести зустріч на п’ятницю.",
    ru: "Нам нужно перенести встречу на пятницу.",
    tokens: ["Musíme", "schůzku", "posunout", "na", "pátek", "."],
  },

  [phraseKey("naplánovat", "a2-8")]: {
    sk: "Chci si naplánovat celý týden.",
    ua: "Я хочу запланувати весь тиждень.",
    ru: "Я хочу запланировать всю неделю.",
    tokens: ["Chci", "si", "naplánovat", "celý", "týden", "."],
  },

  [phraseKey("odložit", "a2-8")]: {
    sk: "Museli jsme cestu odložit.",
    ua: "Нам довелося відкласти поїздку.",
    ru: "Нам пришлось отложить поездку.",
    tokens: ["Museli", "jsme", "cestu", "odložit", "."],
  },

  [phraseKey("zúčastnit se", "a2-8")]: {
    sk: "Chci se zúčastnit toho kurzu.",
    ua: "Я хочу взяти участь у тому курсі.",
    ru: "Я хочу принять участие в этом курсе.",
    tokens: ["Chci", "se", "zúčastnit", "toho", "kurzu", "."],
  },

  [phraseKey("změnit plán", "a2-8")]: {
    sk: "Kvůli počasí jsme museli změnit plán.",
    ua: "Через погоду нам довелося змінити план.",
    ru: "Из-за погоды нам пришлось изменить план.",
    tokens: ["Kvůli", "počasí", "jsme", "museli", "změnit", "plán", "."],
  },

  [phraseKey("konat se", "a2-8")]: {
    sk: "Akce se bude konat v sobotu.",
    ua: "Подія відбудеться в суботу.",
    ru: "Мероприятие будет проходить в субботу.",
    tokens: ["Akce", "se", "bude", "konat", "v", "sobotu", "."],
  },

  [phraseKey("organizovat", "a2-8")]: {
    sk: "Kdo bude organizovat celou akci?",
    ua: "Хто організує всю подію?",
    ru: "Кто будет организовывать всё мероприятие?",
    tokens: ["Kdo", "bude", "organizovat", "celou", "akci", "?"],
  },

  [phraseKey("uskutečnit se", "a2-8")]: {
    sk: "Setkání se nakonec uskutečnilo.",
    ua: "Зустріч зрештою відбулася.",
    ru: "Встреча в итоге состоялась.",
    tokens: ["Setkání", "se", "nakonec", "uskutečnilo", "."],
  },

  [phraseKey("zpozdit se", "a2-8")]: {
    sk: "Můžeš se trochu zpozdit?",
    ua: "Ти можеш трохи запізнитися?",
    ru: "Ты можешь немного опоздать?",
    tokens: ["Můžeš", "se", "trochu", "zpozdit", "?"],
  },

  [phraseKey("stihnout", "a2-8")]: {
    sk: "Doufám, že to ještě stihnu.",
    ua: "Сподіваюся, що я ще встигну.",
    ru: "Надеюсь, что я ещё успею.",
    tokens: ["Doufám", ",", "že", "to", "ještě", "stihnu", "."],
  },

  // =========================
  // LESSON A2-9 — Покупки та рекламації
  // =========================
  [phraseKey("podmínky", "a2-9")]: {
    sk: "Nejdřív si přečtěte podmínky vrácení.",
    ua: "Спочатку прочитайте умови повернення.",
    ru: "Сначала прочитайте условия возврата.",
    tokens: ["Nejdřív", "si", "přečtěte", "podmínky", "vrácení", "."],
  },

  [phraseKey("stížnost", "a2-9")]: {
    sk: "Chci podat oficiální stížnost.",
    ua: "Я хочу подати офіційну скаргу.",
    ru: "Я хочу подать официальную жалобу.",
    tokens: ["Chci", "podat", "oficiální", "stížnost", "."],
  },

  [phraseKey("peníze zpět", "a2-9")]: {
    sk: "Chtěl bych peníze zpět.",
    ua: "Я хотів би отримати гроші назад.",
    ru: "Я хотел бы получить деньги обратно.",
    tokens: ["Chtěl", "bych", "peníze", "zpět", "."],
  },

  [phraseKey("vrácení zboží", "a2-9")]: {
    sk: "Vrácení zboží je možné do čtrnácti dnů.",
    ua: "Повернення товару можливе протягом чотирнадцяти днів.",
    ru: "Возврат товара возможен в течение четырнадцати дней.",
    tokens: ["Vrácení", "zboží", "je", "možné", "do", "čtrnácti", "dnů", "."],
  },

  [phraseKey("pokladní blok", "a2-9")]: {
    sk: "Bez pokladního bloku to nepůjde.",
    ua: "Без касового чека це не вийде.",
    ru: "Без кассового чека это не получится.",
    tokens: ["Bez", "pokladního", "bloku", "to", "nepůjde", "."],
  },

  [phraseKey("reklamovat", "a2-9")]: {
    sk: "Chci reklamovat tento výrobek.",
    ua: "Я хочу подати рекламацію на цей товар.",
    ru: "Я хочу подать рекламацию на этот товар.",
    tokens: ["Chci", "reklamovat", "tento", "výrobek", "."],
  },

  [phraseKey("doklad", "a2-9")]: {
    sk: "Máte k tomu nějaký doklad?",
    ua: "У вас є до цього якесь підтвердження?",
    ru: "У вас есть к этому какой-нибудь документ?",
    tokens: ["Máte", "k", "tomu", "nějaký", "doklad", "?"],
  },

  [phraseKey("výmena", "a2-9")]: {
    sk: "Možná bude lepší výměna zboží.",
    ua: "Можливо, кращим буде обмін товару.",
    ru: "Возможно, лучше будет обмен товара.",
    tokens: ["Možná", "bude", "lepší", "výměna", "zboží", "."],
  },

  [phraseKey("lhůta", "a2-9")]: {
    sk: "Jaká je lhůta na reklamaci?",
    ua: "Який термін для рекламації?",
    ru: "Какой срок для рекламации?",
    tokens: ["Jaká", "je", "lhůta", "na", "reklamaci", "?"],
  },

  [phraseKey("náhrada", "a2-9")]: {
    sk: "Obchod nám nabídl náhradu.",
    ua: "Магазин запропонував нам компенсацію.",
    ru: "Магазин предложил нам компенсацию.",
    tokens: ["Obchod", "nám", "nabídl", "náhradu", "."],
  },

  // =========================
  // LESSON A2-10 — Погода і природа (розширено)
  // =========================
  [phraseKey("předpověď", "a2-10")]: {
    sk: "Viděl jsi dnešní předpověď počasí?",
    ua: "Ти бачив сьогоднішній прогноз погоди?",
    ru: "Ты видел сегодняшний прогноз погоды?",
    tokens: ["Viděl", "jsi", "dnešní", "předpověď", "počasí", "?"],
  },

  [phraseKey("polooblačno", "a2-10")]: {
    sk: "Odpoledne má být polooblačno.",
    ua: "Після обіду має бути мінлива хмарність.",
    ru: "После обеда ожидается переменная облачность.",
    tokens: ["Odpoledne", "má", "být", "polooblačno", "."],
  },

  [phraseKey("přeháňka", "a2-10")]: {
    sk: "Večer může přijít přeháňka.",
    ua: "Увечері може пройти короткий дощ.",
    ru: "Вечером может пройти кратковременный дождь.",
    tokens: ["Večer", "může", "přijít", "přeháňka", "."],
  },

  [phraseKey("jasno", "a2-10")]: {
    sk: "Ráno bylo úplně jasno.",
    ua: "Вранці було зовсім ясно.",
    ru: "Утром было совершенно ясно.",
    tokens: ["Ráno", "bylo", "úplně", "jasno", "."],
  },

  [phraseKey("náledí", "a2-10")]: {
    sk: "Pozor, na silnici je náledí.",
    ua: "Обережно, на дорозі ожеледиця.",
    ru: "Осторожно, на дороге гололёд.",
    tokens: ["Pozor", ",", "na", "silnici", "je", "náledí", "."],
  },

  [phraseKey("vlhkost", "a2-10")]: {
    sk: "Dnes je vysoká vlhkost vzduchu.",
    ua: "Сьогодні висока вологість повітря.",
    ru: "Сегодня высокая влажность воздуха.",
    tokens: ["Dnes", "je", "vysoká", "vlhkost", "vzduchu", "."],
  },

  [phraseKey("oblačno", "a2-10")]: {
    sk: "Zítra bude celý den oblačno.",
    ua: "Завтра весь день буде хмарно.",
    ru: "Завтра весь день будет облачно.",
    tokens: ["Zítra", "bude", "celý", "den", "oblačno", "."],
  },

  [phraseKey("ochladit se", "a2-10")]: {
    sk: "Večer se má výrazně ochladit.",
    ua: "Увечері має помітно похолоднішати.",
    ru: "К вечеру должно заметно похолодать.",
    tokens: ["Večer", "se", "má", "výrazně", "ochladit", "."],
  },

  [phraseKey("oteplit se", "a2-10")]: {
    sk: "O víkendu se zase oteplí.",
    ua: "На вихідних знову потеплішає.",
    ru: "На выходных снова потеплеет.",
    tokens: ["O", "víkendu", "se", "zase", "oteplí", "."],
  },

  [phraseKey("prudký vítr", "a2-10")]: {
    sk: "V noci foukal prudký vítr.",
    ua: "Уночі дув сильний вітер.",
    ru: "Ночью дул сильный ветер.",
    tokens: ["V", "noci", "foukal", "prudký", "vítr", "."],
  },
};
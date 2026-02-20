// app/learning/phrases/a2-3.ts
import type { Phrase } from "./a2";
import { phraseKey } from "./phraseKey";

export const A2_PHRASES_3: Record<string, Phrase> = {
  // =========================
  // LESSON 21 — Dom (problémy a majster)
  // =========================
  [phraseKey("porucha", "поломка/несправність", "a2-21")]: {
    sk: "Máme poruchu na kúrení.",
    ua: "У нас поломка в опаленні.",
    ru: "У нас неисправность отопления.",
    tokens: ["Máme", "poruchu", "na", "kúrení", "."],
  },

  [phraseKey("inštalatér", "сантехнік", "a2-21")]: {
    sk: "Zavolám inštalatéra, lebo tečie voda.",
    ua: "Я викличу сантехніка, бо тече вода.",
    ru: "Я вызову сантехника, потому что течёт вода.",
    tokens: ["Zavolám", "inštalatéra", ",", "lebo", "tečie", "voda", "."],
  },

  [phraseKey("elektrikár", "електрик", "a2-21")]: {
    sk: "Potrebujeme elektrikára na opravu zásuvky.",
    ua: "Нам потрібен електрик для ремонту розетки.",
    ru: "Нам нужен электрик для ремонта розетки.",
    tokens: ["Potrebujeme", "elektrikára", "na", "opravu", "zásuvky", "."],
  },

  [phraseKey("opraviť", "відремонтувати", "a2-21")]: {
    sk: "Viete to opraviť ešte dnes?",
    ua: "Ви можете це відремонтувати ще сьогодні?",
    ru: "Вы можете это отремонтировать ещё сегодня?",
    tokens: ["Viete", "to", "opraviť", "ešte", "dnes", "?"],
  },

  [phraseKey("vymeniť", "замінити", "a2-21")]: {
    sk: "Musíme vymeniť staré tesnenie.",
    ua: "Треба замінити стару прокладку.",
    ru: "Нужно заменить старую прокладку.",
    tokens: ["Musíme", "vymeniť", "staré", "tesnenie", "."],
  },

  [phraseKey("prietok", "протікання", "a2-21")]: {
    sk: "Prietok vody je príliš silný.",
    ua: "Протік (потік) води занадто сильний.",
    ru: "Поток воды слишком сильный.",
    tokens: ["Prietok", "vody", "je", "príliš", "silný", "."],
  },

  [phraseKey("upchatie", "засмічення", "a2-21")]: {
    sk: "Upchatie v kuchyni musíme vyčistiť.",
    ua: "Засмічення на кухні треба прочистити.",
    ru: "Засор на кухне нужно прочистить.",
    tokens: ["Upchatie", "v", "kuchyni", "musíme", "vyčistiť", "."],
  },

  [phraseKey("zatekať", "протікати", "a2-21")]: {
    sk: "Zo stropu zateká po daždi.",
    ua: "Після дощу протікає зі стелі.",
    ru: "После дождя протекает с потолка.",
    tokens: ["Zo", "stropu", "zateká", "po", "daždi", "."],
  },

  [phraseKey("poškodenie", "пошкодження", "a2-21")]: {
    sk: "Poškodenie je väčšie, než sme si mysleli.",
    ua: "Пошкодження більше, ніж ми думали.",
    ru: "Повреждение больше, чем мы думали.",
    tokens: ["Poškodenie", "je", "väčšie", ",", "než", "sme", "si", "mysleli", "."],
  },

  [phraseKey("náhradný diel", "запасна частина", "a2-21")]: {
    sk: "Potrebujem objednať náhradný diel.",
    ua: "Мені треба замовити запасну частину.",
    ru: "Мне нужно заказать запасную часть.",
    tokens: ["Potrebujem", "objednať", "náhradný", "diel", "."],
  },

  // =========================
  // LESSON 22 — Zdravie (lekáreň a liečba)
  // =========================
  [phraseKey("vedľajšie účinky", "побічні ефекти", "a2-22")]: {
    sk: "Môže to mať vedľajšie účinky?",
    ua: "Це може мати побічні ефекти?",
    ru: "Это может иметь побочные эффекты?",
    tokens: ["Môže", "to", "mať", "vedľajšie", "účinky", "?"],
  },

  [phraseKey("dávkovanie", "дозування", "a2-22")]: {
    sk: "Aké je správne dávkovanie?",
    ua: "Яке правильне дозування?",
    ru: "Какая правильная дозировка?",
    tokens: ["Aké", "je", "správne", "dávkovanie", "?"],
  },

  [phraseKey("návod", "інструкція", "a2-22")]: {
    sk: "Prečítajte si návod pred použitím.",
    ua: "Прочитайте інструкцію перед використанням.",
    ru: "Прочитайте инструкцию перед использованием.",
    tokens: ["Prečítajte", "si", "návod", "pred", "použitím", "."],
  },

  [phraseKey("liek proti bolesti", "знеболювальне", "a2-22")]: {
    sk: "Prosím si liek proti bolesti hlavy.",
    ua: "Мені потрібне знеболювальне від головного болю.",
    ru: "Мне нужно обезболивающее от головной боли.",
    tokens: ["Prosím", "si", "liek", "proti", "bolesti", "hlavy", "."],
  },

  [phraseKey("antibiotiká", "антибіотики", "a2-22")]: {
    sk: "Antibiotiká beriem len podľa lekára.",
    ua: "Антибіотики приймаю лише за призначенням лікаря.",
    ru: "Антибиотики принимаю только по назначению врача.",
    tokens: ["Antibiotiká", "beriem", "len", "podľa", "lekára", "."],
  },

  [phraseKey("očkovanie", "вакцинація", "a2-22")]: {
    sk: "Kedy je ďalšie očkovanie?",
    ua: "Коли наступна вакцинація?",
    ru: "Когда следующая вакцинация?",
    tokens: ["Kedy", "je", "ďalšie", "očkovanie", "?"],
  },

  [phraseKey("recept", "рецепт", "a2-22")]: {
    sk: "Na tento liek potrebujete recept.",
    ua: "На ці ліки потрібен рецепт.",
    ru: "На это лекарство нужен рецепт.",
    tokens: ["Na", "tento", "liek", "potrebujete", "recept", "."],
  },

  [phraseKey("bez receptu", "без рецепта", "a2-22")]: {
    sk: "Máte niečo bez receptu?",
    ua: "У вас є щось без рецепта?",
    ru: "У вас есть что-то без рецепта?",
    tokens: ["Máte", "niečo", "bez", "receptu", "?"],
  },

  [phraseKey("kontrola", "контроль/огляд", "a2-22")]: {
    sk: "Na kontrolu prídem o týždeň.",
    ua: "На контроль/огляд прийду за тиждень.",
    ru: "На контроль/осмотр приду через неделю.",
    tokens: ["Na", "kontrolu", "prídem", "o", "týždeň", "."],
  },

  [phraseKey("uzdravovať sa", "одужувати", "a2-22")]: {
    sk: "Pomaly sa uzdravujem, ale ešte kašlem.",
    ua: "Я повільно одужую, але ще кашляю.",
    ru: "Я медленно выздоравливаю, но ещё кашляю.",
    tokens: ["Pomaly", "sa", "uzdravujem", ",", "ale", "ešte", "kašlem", "."],
  },

  // =========================
  // LESSON 23 — Mesto (bezpečnosť a služby)
  // =========================
  [phraseKey("nehoda", "аварія/нещасний випадок", "a2-23")]: {
    sk: "Stala sa nehoda na križovatke.",
    ua: "На перехресті сталася аварія.",
    ru: "На перекрёстке произошла авария.",
    tokens: ["Stala", "sa", "nehoda", "na", "križovatke", "."],
  },

  [phraseKey("záchranka", "швидка допомога", "a2-23")]: {
    sk: "Zavolajte záchranku, prosím!",
    ua: "Викличте швидку, будь ласка!",
    ru: "Вызовите скорую, пожалуйста!",
    tokens: ["Zavolajte", "záchranku", ",", "prosím", "!"],
  },

  [phraseKey("hasiči", "пожежники", "a2-23")]: {
    sk: "Hasiči prišli o pár minút.",
    ua: "Пожежники приїхали за кілька хвилин.",
    ru: "Пожарные приехали через несколько минут.",
    tokens: ["Hasiči", "prišli", "o", "pár", "minút", "."],
  },

  [phraseKey("policajná stanica", "відділок поліції", "a2-23")]: {
    sk: "Kde je najbližšia policajná stanica?",
    ua: "Де найближчий відділок поліції?",
    ru: "Где ближайший отдел полиции?",
    tokens: ["Kde", "je", "najbližšia", "policajná", "stanica", "?"],
  },

  [phraseKey("svedok", "свідок", "a2-23")]: {
    sk: "Bol tam nejaký svedok?",
    ua: "Там був якийсь свідок?",
    ru: "Там был какой-то свидетель?",
    tokens: ["Bol", "tam", "nejaký", "svedok", "?"],
  },

  [phraseKey("krádež", "крадіжка", "a2-23")]: {
    sk: "Chcem nahlásiť krádež.",
    ua: "Я хочу заявити про крадіжку.",
    ru: "Я хочу заявить о краже.",
    tokens: ["Chcem", "nahlásiť", "krádež", "."],
  },

  [phraseKey("nahlásiť", "повідомити/заявити", "a2-23")]: {
    sk: "Musíte to nahlásiť na polícii.",
    ua: "Ви повинні повідомити про це в поліції.",
    ru: "Вы должны сообщить об этом в полиции.",
    tokens: ["Musíte", "to", "nahlásiť", "na", "polícii", "."],
  },

  [phraseKey("doklady", "документи", "a2-23")]: {
    sk: "Stratil som doklady aj kartu.",
    ua: "Я загубив документи і картку.",
    ru: "Я потерял документы и карту.",
    tokens: ["Stratil", "som", "doklady", "aj", "kartu", "."],
  },

  [phraseKey("stratiť", "загубити", "a2-23")]: {
    sk: "Nechcem stratiť kľúče.",
    ua: "Я не хочу загубити ключі.",
    ru: "Я не хочу потерять ключи.",
    tokens: ["Nechcem", "stratiť", "kľúče", "."],
  },

  [phraseKey("nájsť", "знайти", "a2-23")]: {
    sk: "Dúfam, že to ešte nájdem.",
    ua: "Сподіваюся, що я це ще знайду.",
    ru: "Надеюсь, что я это ещё найду.",
    tokens: ["Dúfam", ",", "že", "to", "ešte", "nájdem", "."],
  },

  // =========================
  // LESSON 24 — Jedlo (nákupy a varenie)
  // =========================
  [phraseKey("ingrediencie", "інгредієнти", "a2-24")]: {
    sk: "Mám všetky ingrediencie doma.",
    ua: "У мене вдома є всі інгредієнти.",
    ru: "У меня дома есть все ингредиенты.",
    tokens: ["Mám", "všetky", "ingrediencie", "doma", "."],
  },

  [phraseKey("recept (kuchársky)", "рецепт (кулінарний)", "a2-24")]: {
    sk: "Tento recept je jednoduchý a rýchly.",
    ua: "Цей кулінарний рецепт простий і швидкий.",
    ru: "Этот рецепт простой и быстрый.",
    tokens: ["Tento", "recept", "je", "jednoduchý", "a", "rýchly", "."],
  },

  [phraseKey("nakrájať", "нарізати", "a2-24")]: {
    sk: "Môžete nakrájať cibuľu na malé kúsky?",
    ua: "Можеш нарізати цибулю на маленькі шматочки?",
    ru: "Можешь нарезать лук на маленькие кусочки?",
    tokens: ["Môžete", "nakrájať", "cibuľu", "na", "malé", "kúsky", "?"],
  },

  [phraseKey("zmiešať", "змішати", "a2-24")]: {
    sk: "Najprv treba zmiešať múku s vodou.",
    ua: "Спочатку треба змішати борошно з водою.",
    ru: "Сначала нужно смешать муку с водой.",
    tokens: ["Najprv", "treba", "zmiešať", "múku", "s", "vodou", "."],
  },

  [phraseKey("osmažiť", "підсмажити", "a2-24")]: {
    sk: "Osmažím mäso na panvici.",
    ua: "Я підсмажу м’ясо на пательні.",
    ru: "Я поджарю мясо на сковороде.",
    tokens: ["Osmažím", "mäso", "na", "panvici", "."],
  },

  [phraseKey("uvariť", "зварити", "a2-24")]: {
    sk: "Musím uvariť polievku.",
    ua: "Мені треба зварити суп.",
    ru: "Мне нужно сварить суп.",
    tokens: ["Musím", "uvariť", "polievku", "."],
  },

  [phraseKey("upiecť", "спекти", "a2-24")]: {
    sk: "Na víkend chcem upiecť koláč.",
    ua: "На вихідні хочу спекти пиріг.",
    ru: "На выходные хочу испечь пирог.",
    tokens: ["Na", "víkend", "chcem", "upiecť", "koláč", "."],
  },

  [phraseKey("ochutiť", "приправити", "a2-24")]: {
    sk: "Nezabudnite to ochutiť soľou a korením.",
    ua: "Не забудьте приправити це сіллю та перцем.",
    ru: "Не забудьте приправить это солью и перцем.",
    tokens: ["Nezabudnite", "to", "ochutiť", "soľou", "a", "korením", "."],
  },

  [phraseKey("porcia", "порція", "a2-24")]: {
    sk: "Dám si menšiu porciu.",
    ua: "Я візьму меншу порцію.",
    ru: "Я возьму меньшую порцию.",
    tokens: ["Dám", "si", "menšiu", "porciu", "."],
  },

  [phraseKey("zvyšky", "залишки їжі", "a2-24")]: {
    sk: "Zvyšky odložím do chladničky.",
    ua: "Залишки їжі покладу в холодильник.",
    ru: "Остатки еды положу в холодильник.",
    tokens: ["Zvyšky", "odložím", "do", "chladničky", "."],
  },

  // =========================
  // LESSON 25 — Cestovanie (plánovanie trasy)
  // =========================
  [phraseKey("itinerár", "маршрут/план подорожі", "a2-25")]: {
    sk: "Pripravil som si itinerár na celý týždeň.",
    ua: "Я підготував маршрут/план подорожі на весь тиждень.",
    ru: "Я подготовил маршрут/план поездки на всю неделю.",
    tokens: ["Pripravil", "som", "si", "itinerár", "na", "celý", "týždeň", "."],
  },

  [phraseKey("prestup", "пересадка", "a2-25")]: {
    sk: "Máme prestup vo Viedni.",
    ua: "У нас пересадка у Відні.",
    ru: "У нас пересадка в Вене.",
    tokens: ["Máme", "prestup", "vo", "Viedni", "."],
  },

  [phraseKey("spoj", "рейс/сполучення", "a2-25")]: {
    sk: "Toto spojenie mi vyhovuje najviac.",
    ua: "Це сполучення мені підходить найбільше.",
    ru: "Это сообщение/рейс мне подходит больше всего.",
    tokens: ["Toto", "spojenie", "mi", "vyhovuje", "najviac", "."],
  },

  [phraseKey("oneskorenie", "затримка", "a2-25")]: {
    sk: "Vlak má oneskorenie dvadsať minút.",
    ua: "Потяг має затримку двадцять хвилин.",
    ru: "Поезд задерживается на двадцать минут.",
    tokens: ["Vlak", "má", "oneskorenie", "dvadsať", "minút", "."],
  },

  [phraseKey("zrušený", "скасований", "a2-25")]: {
    sk: "Tento let je zrušený.",
    ua: "Цей рейс скасований.",
    ru: "Этот рейс отменён.",
    tokens: ["Tento", "let", "je", "zrušený", "."],
  },

  [phraseKey("odbavenie", "реєстрація / оформлення", "a2-25")]: {
    sk: "Odbavenie začína dve hodiny pred odletom.",
    ua: "Реєстрація починається за дві години до вильоту.",
    ru: "Регистрация начинается за два часа до вылета.",
    tokens: ["Odbavenie", "začína", "dve", "hodiny", "pred", "odletom", "."],
  },

  [phraseKey("cestovný poriadok", "розклад руху", "a2-25")]: {
    sk: "Pozriem si cestovný poriadok online.",
    ua: "Я подивлюся розклад руху онлайн.",
    ru: "Я посмотрю расписание движения онлайн.",
    tokens: ["Pozriem", "si", "cestovný", "poriadok", "online", "."],
  },

  [phraseKey("spiatočný lístok", "квиток туди-назад", "a2-25")]: {
    sk: "Chcem spiatočný lístok, prosím.",
    ua: "Мені потрібен квиток туди-назад, будь ласка.",
    ru: "Мне нужен билет туда-обратно, пожалуйста.",
    tokens: ["Chcem", "spiatočný", "lístok", ",", "prosím", "."],
  },

  [phraseKey("jednosmerný lístok", "квиток в один бік", "a2-25")]: {
    sk: "Stačí mi jednosmerný lístok.",
    ua: "Мені достатньо квитка в один бік.",
    ru: "Мне достаточно билета в одну сторону.",
    tokens: ["Stačí", "mi", "jednosmerný", "lístok", "."],
  },

  [phraseKey("cestovný lístok", "квиток", "a2-25")]: {
    sk: "Kde si môžem kúpiť cestovný lístok?",
    ua: "Де я можу купити квиток?",
    ru: "Где я могу купить билет?",
    tokens: ["Kde", "si", "môžem", "kúpiť", "cestovný", "lístok", "?"],
  },

  // =========================
  // LESSON 27 — Komunikácia (námietky a argumenty)
  // =========================
  [phraseKey("naopak", "навпаки", "a2-27")]: {
    sk: "Nie, naopak, je to lepšie.",
    ua: "Ні, навпаки, це краще.",
    ru: "Нет, наоборот, так лучше.",
    tokens: ["Nie", ",", "naopak", ",", "je", "to", "lepšie", "."],
  },

  [phraseKey("v skutočnosti", "насправді", "a2-27")]: {
    sk: "V skutočnosti to nie je také jednoduché.",
    ua: "Насправді це не так просто.",
    ru: "На самом деле это не так просто.",
    tokens: ["V", "skutočnosti", "to", "nie", "je", "také", "jednoduché", "."],
  },

  [phraseKey("dôkaz", "доказ", "a2-27")]: {
    sk: "Máte na to nejaký dôkaz?",
    ua: "У вас є якийсь доказ?",
    ru: "У вас есть какое-то доказательство?",
    tokens: ["Máte", "na", "to", "nejaký", "dôkaz", "?"],
  },

  [phraseKey("argument", "аргумент", "a2-27")]: {
    sk: "Toto je silný argument.",
    ua: "Це сильний аргумент.",
    ru: "Это сильный аргумент.",
    tokens: ["Toto", "je", "silný", "argument", "."],
  },

  [phraseKey("dôvod", "причина", "a2-27")]: {
    sk: "Aký je dôvod tejto zmeny?",
    ua: "Яка причина цієї зміни?",
    ru: "Какова причина этого изменения?",
    tokens: ["Aký", "je", "dôvod", "tejto", "zmeny", "?"],
  },

  [phraseKey("výhoda", "перевага", "a2-27")]: {
    sk: "Výhoda je, že ušetríme čas.",
    ua: "Перевага в тому, що ми зекономимо час.",
    ru: "Преимущество в том, что мы сэкономим время.",
    tokens: ["Výhoda", "je", ",", "že", "ušetríme", "čas", "."],
  },

  [phraseKey("nevýhoda", "недолік", "a2-27")]: {
    sk: "Nevýhoda je vyššia cena.",
    ua: "Недолік — вища ціна.",
    ru: "Недостаток — более высокая цена.",
    tokens: ["Nevýhoda", "je", "vyššia", "cena", "."],
  },

  [phraseKey("záleží", "залежить", "a2-27")]: {
    sk: "Záleží na situácii.",
    ua: "Залежить від ситуації.",
    ru: "Зависит от ситуации.",
    tokens: ["Záleží", "na", "situácii", "."],
  },

  [phraseKey("presvedčiť", "переконати", "a2-27")]: {
    sk: "Skúsim ťa presvedčiť, ale bez nátlaku.",
    ua: "Спробую тебе переконати, але без тиску.",
    ru: "Попробую тебя убедить, но без давления.",
    tokens: ["Skúsim", "ťa", "presvedčiť", ",", "ale", "bez", "nátlaku", "."],
  },

  [phraseKey("súhlasiť s tým", "погодитися з цим", "a2-27")]: {
    sk: "Nemôžem súhlasiť s týmto riešením.",
    ua: "Я не можу погодитися з цим рішенням.",
    ru: "Я не могу согласиться с этим решением.",
    tokens: ["Nemôžem", "súhlasiť", "s", "týmto", "riešením", "."],
  },

  // =========================
  // LESSON 28 — Technológie (internet a bezpečnosť)
  // =========================
  [phraseKey("súkromie", "приватність", "a2-28")]: {
    sk: "Chcem chrániť svoje súkromie online.",
    ua: "Я хочу захистити свою приватність онлайн.",
    ru: "Я хочу защитить свою приватность онлайн.",
    tokens: ["Chcem", "chrániť", "svoje", "súkromie", "online", "."],
  },

  [phraseKey("bezpečnosť", "безпека", "a2-28")]: {
    sk: "Bezpečnosť účtu je pre mňa dôležitá.",
    ua: "Безпека акаунта для мене важлива.",
    ru: "Безопасность аккаунта для меня важна.",
    tokens: ["Bezpečnosť", "účtu", "je", "pre", "mňa", "dôležitá", "."],
  },

  [phraseKey("overenie", "підтвердження/верифікація", "a2-28")]: {
    sk: "Na prihlásenie potrebujem overenie.",
    ua: "Для входу мені потрібне підтвердження/верифікація.",
    ru: "Для входа мне нужна проверка/верификация.",
    tokens: ["Na", "prihlásenie", "potrebujem", "overenie", "."],
  },

  [phraseKey("dvojfaktorové overenie", "2FA (двофакторна перевірка)", "a2-28")]: {
    sk: "Zapol som dvojfaktorové overenie.",
    ua: "Я увімкнув 2FA (двофакторну перевірку).",
    ru: "Я включил 2FA (двухфакторную проверку).",
    tokens: ["Zapol", "som", "dvojfaktorové", "overenie", "."],
  },

  [phraseKey("podvod", "шахрайство", "a2-28")]: {
    sk: "Pozor, môže to byť podvod.",
    ua: "Обережно, це може бути шахрайство.",
    ru: "Осторожно, это может быть мошенничество.",
    tokens: ["Pozor", ",", "môže", "to", "byť", "podvod", "."],
  },

  [phraseKey("odkaz", "посилання", "a2-28")]: {
    sk: "Neotvárajte podozrivý odkaz.",
    ua: "Не відкривайте підозріле посилання.",
    ru: "Не открывайте подозрительную ссылку.",
    tokens: ["Neotvárajte", "podozrivý", "odkaz", "."],
  },

  [phraseKey("stiahnuť súbor", "завантажити файл", "a2-28")]: {
    sk: "Potrebujem stiahnuť súbor z e-mailu.",
    ua: "Мені потрібно завантажити файл з email.",
    ru: "Мне нужно скачать файл из e-mail.",
    tokens: ["Potrebujem", "stiahnuť", "súbor", "z", "e-mailu", "."],
  },

  [phraseKey("vírus", "вірус", "a2-28")]: {
    sk: "Počítač môže mať vírus.",
    ua: "Комп’ютер може мати вірус.",
    ru: "Компьютер может быть заражён вирусом.",
    tokens: ["Počítač", "môže", "mať", "vírus", "."],
  },

  [phraseKey("zablokovať", "заблокувати", "a2-28")]: {
    sk: "Musím zablokovať tento účet.",
    ua: "Мені треба заблокувати цей акаунт.",
    ru: "Мне нужно заблокировать этот аккаунт.",
    tokens: ["Musím", "zablokovať", "tento", "účet", "."],
  },

  [phraseKey("obnoviť heslo", "відновити пароль", "a2-28")]: {
    sk: "Neviete mi pomôcť obnoviť heslo?",
    ua: "Ви не можете мені допомогти відновити пароль?",
    ru: "Вы не можете помочь мне восстановить пароль?",
    tokens: ["Neviete", "mi", "pomôcť", "obnoviť", "heslo", "?"],
  },

  // =========================
  // LESSON 29 — Emócie (rozšírené)
  // =========================
  [phraseKey("sklamaný", "розчарований", "a2-29")]: {
    sk: "Som sklamaný z výsledku.",
    ua: "Я розчарований результатом.",
    ru: "Я разочарован результатом.",
    tokens: ["Som", "sklamaný", "z", "výsledku", "."],
  },

  [phraseKey("nahnevaný", "розлючений", "a2-29")]: {
    sk: "Bol som nahnevaný, ale už je to lepšie.",
    ua: "Я був розлючений, але вже краще.",
    ru: "Я был зол, но уже лучше.",
    tokens: ["Bol", "som", "nahnevaný", ",", "ale", "už", "je", "to", "lepšie", "."],
  },

  [phraseKey("nadšený", "захоплений", "a2-29")]: {
    sk: "Som nadšený z tejto správy.",
    ua: "Я захоплений цією новиною.",
    ru: "Я в восторге от этой новости.",
    tokens: ["Som", "nadšený", "z", "tejto", "správy", "."],
  },

  [phraseKey("zmätený", "розгублений", "a2-29")]: {
    sk: "Som zmätený, neviem, čo robiť.",
    ua: "Я розгублений і не знаю, що робити.",
    ru: "Я растерян и не знаю, что делать.",
    tokens: ["Som", "zmätený", ",", "neviem", ",", "čo", "robiť", "."],
  },

  [phraseKey("znepokojený", "стурбований", "a2-29")]: {
    sk: "Som znepokojený, lebo sa neozýva.",
    ua: "Я стурбований, бо він не відповідає.",
    ru: "Я обеспокоен, потому что он не отвечает.",
    tokens: ["Som", "znepokojený", ",", "lebo", "sa", "neozýva", "."],
  },

  [phraseKey("hrdý", "гордий", "a2-29")]: {
    sk: "Som na teba hrdý.",
    ua: "Я тобою гордий.",
    ru: "Я тобой горжусь.",
    tokens: ["Som", "na", "teba", "hrdý", "."],
  },

  [phraseKey("vďačný", "вдячний", "a2-29")]: {
    sk: "Som vám veľmi vďačný za pomoc.",
    ua: "Я вам дуже вдячний за допомогу.",
    ru: "Я вам очень благодарен за помощь.",
    tokens: ["Som", "vám", "veľmi", "vďačný", "za", "pomoc", "."],
  },

  [phraseKey("hanbiť sa", "соромитися", "a2-29")]: {
    sk: "Nemusíš sa hanbiť za chyby.",
    ua: "Не треба соромитися помилок.",
    ru: "Не нужно стыдиться ошибок.",
    tokens: ["Nemusíš", "sa", "hanbiť", "za", "chyby", "."],
  },

  [phraseKey("ľutovať", "шкодувати", "a2-29")]: {
    sk: "Ľutujem, že som ti to nepovedal skôr.",
    ua: "Шкодую, що не сказав тобі раніше.",
    ru: "Жалею, что не сказал тебе раньше.",
    tokens: ["Ľutujem", ",", "že", "som", "ti", "to", "nepovedal", "skôr", "."],
  },

  [phraseKey("uľaviť sa", "полегшало", "a2-29")]: {
    sk: "Uľavilo sa mi, keď som to vyriešil.",
    ua: "Мені полегшало, коли я це вирішив.",
    ru: "Мне полегчало, когда я это решил.",
    tokens: ["Uľavilo", "sa", "mi", ",", "keď", "som", "to", "vyriešil", "."],
  },

  // =========================
  // LESSON 30 — Opakovanie A2 (21–29)
  // =========================
  [phraseKey("náhradný diel", "запасна частина", "a2-30")]: {
    sk: "Bez náhradného dielu to nepôjde.",
    ua: "Без запасної частини це не вийде.",
    ru: "Без запасной детали это не получится.",
    tokens: ["Bez", "náhradného", "dielu", "to", "nepôjde", "."],
  },

  [phraseKey("dávkovanie", "дозування", "a2-30")]: {
    sk: "Skontrolujte dávkovanie v návode.",
    ua: "Перевірте дозування в інструкції.",
    ru: "Проверьте дозировку в инструкции.",
    tokens: ["Skontrolujte", "dávkovanie", "v", "návode", "."],
  },

  [phraseKey("krádež", "крадіжка", "a2-30")]: {
    sk: "Krádež už bola nahlásená.",
    ua: "Крадіжку вже було заявлено.",
    ru: "Кража уже была заявлена.",
    tokens: ["Krádež", "už", "bola", "nahlásená", "."],
  },

  [phraseKey("ingrediencie", "інгредієнти", "a2-30")]: {
    sk: "Ingrediencie si pripravím dopredu.",
    ua: "Інгредієнти підготую заздалегідь.",
    ru: "Ингредиенты подготовлю заранее.",
    tokens: ["Ingrediencie", "si", "pripravím", "dopredu", "."],
  },

  [phraseKey("itinerár", "маршрут", "a2-30")]: {
    sk: "Itinerár máme hotový.",
    ua: "Маршрут у нас готовий.",
    ru: "Маршрут у нас готов.",
    tokens: ["Itinerár", "máme", "hotový", "."],
  },

  [phraseKey("výplatná páska", "розрахунковий лист", "a2-30")]: {
    sk: "Potrebujem výplatnú pásku na úrad.",
    ua: "Мені потрібен розрахунковий лист для установи.",
    ru: "Мне нужен расчётный листок для учреждения.",
    tokens: ["Potrebujem", "výplatnú", "pásku", "na", "úrad", "."],
  },

  [phraseKey("argument", "аргумент", "a2-30")]: {
    sk: "Tvoj argument znie rozumne.",
    ua: "Твій аргумент звучить розумно.",
    ru: "Твой аргумент звучит разумно.",
    tokens: ["Tvoj", "argument", "znie", "rozumne", "."],
  },

  [phraseKey("podvod", "шахрайство", "a2-30")]: {
    sk: "Vyzerá to ako internetový podvod.",
    ua: "Це схоже на інтернет-шахрайство.",
    ru: "Это похоже на интернет-мошенничество.",
    tokens: ["Vyzerá", "to", "ako", "internetový", "podvod", "."],
  },

  [phraseKey("znepokojený", "стурбований", "a2-30")]: {
    sk: "Bol som znepokojený, no všetko dopadlo dobre.",
    ua: "Я був стурбований, але все закінчилося добре.",
    ru: "Я был обеспокоен, но всё закончилось хорошо.",
    tokens: ["Bol", "som", "znepokojený", ",", "no", "všetko", "dopadlo", "dobre", "."],
  },

  [phraseKey("záleží", "залежить", "a2-30")]: {
    sk: "Záleží, čo presne potrebujete.",
    ua: "Залежить, що саме вам потрібно.",
    ru: "Зависит от того, что именно вам нужно.",
    tokens: ["Záleží", ",", "čo", "presne", "potrebujete", "."],
  },
};
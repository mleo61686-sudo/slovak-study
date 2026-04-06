// app/learning/phrases/a2-3.ts
import type { Phrase } from "./a2";
import { phraseKey } from "./phraseKey";

export const A2_PHRASES_3: Record<string, Phrase> = {
  // =========================
  // LESSON 21 — Dom (problémy a majster)
  // =========================
  [phraseKey("porucha", "a2-21")]: {
    sk: "Máme poruchu na kúrení.",
    ua: "У нас поломка в опаленні.",
    ru: "У нас неисправность отопления.",
    en: "We have a problem with the heating.",
    tokens: ["Máme", "poruchu", "na", "kúrení", "."],
  },

  [phraseKey("inštalatér", "a2-21")]: {
    sk: "Zavolám inštalatéra, lebo tečie voda.",
    ua: "Я викличу сантехніка, бо тече вода.",
    ru: "Я вызову сантехника, потому что течёт вода.",
    en: "I will call a plumber because the water is leaking.",
    tokens: ["Zavolám", "inštalatéra", ",", "lebo", "tečie", "voda", "."],
  },

  [phraseKey("elektrikár", "a2-21")]: {
    sk: "Potrebujeme elektrikára na opravu zásuvky.",
    ua: "Нам потрібен електрик для ремонту розетки.",
    ru: "Нам нужен электрик для ремонта розетки.",
    en: "We need an electrician to repair the socket.",
    tokens: ["Potrebujeme", "elektrikára", "na", "opravu", "zásuvky", "."],
  },

  [phraseKey("opraviť", "a2-21")]: {
    sk: "Viete to opraviť ešte dnes?",
    ua: "Ви можете це відремонтувати ще сьогодні?",
    ru: "Вы можете это отремонтировать ещё сегодня?",
    en: "Can you repair it today?",
    tokens: ["Viete", "to", "opraviť", "ešte", "dnes", "?"],
  },

  [phraseKey("vymeniť", "a2-21")]: {
    sk: "Musíme vymeniť staré tesnenie.",
    ua: "Треба замінити стару прокладку.",
    ru: "Нужно заменить старую прокладку.",
    en: "We need to replace the old seal.",
    tokens: ["Musíme", "vymeniť", "staré", "tesnenie", "."],
  },

  [phraseKey("prietok", "a2-21")]: {
    sk: "Prietok vody je príliš silný.",
    ua: "Потік води занадто сильний.",
    ru: "Поток воды слишком сильный.",
    en: "The water flow is too strong.",
    tokens: ["Prietok", "vody", "je", "príliš", "silný", "."],
  },

  [phraseKey("upchatie", "a2-21")]: {
    sk: "Upchatie v kuchyni musíme vyčistiť.",
    ua: "Засмічення на кухні треба прочистити.",
    ru: "Засор на кухне нужно прочистить.",
    en: "We need to clear the blockage in the kitchen.",
    tokens: ["Upchatie", "v", "kuchyni", "musíme", "vyčistiť", "."],
  },

  [phraseKey("zatekať", "a2-21")]: {
    sk: "Zo stropu zateká po daždi.",
    ua: "Після дощу протікає зі стелі.",
    ru: "После дождя протекает с потолка.",
    en: "The ceiling leaks after the rain.",
    tokens: ["Zo", "stropu", "zateká", "po", "daždi", "."],
  },

  [phraseKey("poškodenie", "a2-21")]: {
    sk: "Poškodenie je väčšie, než sme si mysleli.",
    ua: "Пошкодження більше, ніж ми думали.",
    ru: "Повреждение больше, чем мы думали.",
    en: "The damage is bigger than we thought.",
    tokens: ["Poškodenie", "je", "väčšie", ",", "než", "sme", "si", "mysleli", "."],
  },

  [phraseKey("náhradný diel", "a2-21")]: {
    sk: "Potrebujem objednať náhradný diel.",
    ua: "Мені треба замовити запасну частину.",
    ru: "Мне нужно заказать запасную часть.",
    en: "I need to order a spare part.",
    tokens: ["Potrebujem", "objednať", "náhradný", "diel", "."],
  },

  // =========================
  // LESSON 22 — Zdravie (lekáreň a liečba)
  // =========================
  [phraseKey("vedľajšie účinky", "a2-22")]: {
    sk: "Môže to mať vedľajšie účinky?",
    ua: "Це може мати побічні ефекти?",
    ru: "Это может иметь побочные эффекты?",
    en: "Can it have side effects?",
    tokens: ["Môže", "to", "mať", "vedľajšie", "účinky", "?"],
  },

  [phraseKey("dávkovanie", "a2-22")]: {
    sk: "Aké je správne dávkovanie?",
    ua: "Яке правильне дозування?",
    ru: "Какая правильная дозировка?",
    en: "What is the correct dosage?",
    tokens: ["Aké", "je", "správne", "dávkovanie", "?"],
  },

  [phraseKey("návod", "a2-22")]: {
    sk: "Prečítajte si návod pred použitím.",
    ua: "Прочитайте інструкцію перед використанням.",
    ru: "Прочитайте инструкцию перед использованием.",
    en: "Read the instructions before use.",
    tokens: ["Prečítajte", "si", "návod", "pred", "použitím", "."],
  },

  [phraseKey("liek proti bolesti", "a2-22")]: {
    sk: "Prosím si liek proti bolesti hlavy.",
    ua: "Мені потрібне знеболювальне від головного болю.",
    ru: "Мне нужно обезболивающее от головной боли.",
    en: "I need medicine for a headache, please.",
    tokens: ["Prosím", "si", "liek", "proti", "bolesti", "hlavy", "."],
  },

  [phraseKey("antibiotiká", "a2-22")]: {
    sk: "Antibiotiká beriem len podľa lekára.",
    ua: "Антибіотики приймаю лише за призначенням лікаря.",
    ru: "Антибиотики принимаю только по назначению врача.",
    en: "I take antibiotics only as prescribed by the doctor.",
    tokens: ["Antibiotiká", "beriem", "len", "podľa", "lekára", "."],
  },

  [phraseKey("očkovanie", "a2-22")]: {
    sk: "Kedy je ďalšie očkovanie?",
    ua: "Коли наступна вакцинація?",
    ru: "Когда следующая вакцинация?",
    en: "When is the next vaccination?",
    tokens: ["Kedy", "je", "ďalšie", "očkovanie", "?"],
  },

  [phraseKey("recept", "a2-22")]: {
    sk: "Na tento liek potrebujete recept.",
    ua: "На ці ліки потрібен рецепт.",
    ru: "На это лекарство нужен рецепт.",
    en: "You need a prescription for this medicine.",
    tokens: ["Na", "tento", "liek", "potrebujete", "recept", "."],
  },

  [phraseKey("bez receptu", "a2-22")]: {
    sk: "Máte niečo bez receptu?",
    ua: "У вас є щось без рецепта?",
    ru: "У вас есть что-то без рецепта?",
    en: "Do you have anything without a prescription?",
    tokens: ["Máte", "niečo", "bez", "receptu", "?"],
  },

  [phraseKey("kontrola", "a2-22")]: {
    sk: "Na kontrolu prídem o týždeň.",
    ua: "На контроль прийду за тиждень.",
    ru: "На контроль приду через неделю.",
    en: "I will come for a check-up in a week.",
    tokens: ["Na", "kontrolu", "prídem", "o", "týždeň", "."],
  },

  [phraseKey("uzdravovať sa", "a2-22")]: {
    sk: "Pomaly sa uzdravujem, ale ešte kašlem.",
    ua: "Я повільно одужую, але ще кашляю.",
    ru: "Я медленно выздоравливаю, но ещё кашляю.",
    en: "I am slowly recovering, but I am still coughing.",
    tokens: ["Pomaly", "sa", "uzdravujem", ",", "ale", "ešte", "kašlem", "."],
  },

  // =========================
  // LESSON 23 — Mesto (bezpečnosť a služby)
  // =========================
  [phraseKey("nehoda", "a2-23")]: {
    sk: "Stala sa nehoda na križovatke.",
    ua: "На перехресті сталася аварія.",
    ru: "На перекрёстке произошла авария.",
    en: "There was an accident at the intersection.",
    tokens: ["Stala", "sa", "nehoda", "na", "križovatke", "."],
  },

  [phraseKey("záchranka", "a2-23")]: {
    sk: "Zavolajte záchranku, prosím!",
    ua: "Викличте швидку, будь ласка!",
    ru: "Вызовите скорую, пожалуйста!",
    en: "Call an ambulance, please!",
    tokens: ["Zavolajte", "záchranku", ",", "prosím", "!"],
  },

  [phraseKey("hasiči", "a2-23")]: {
    sk: "Hasiči prišli o pár minút.",
    ua: "Пожежники приїхали за кілька хвилин.",
    ru: "Пожарные приехали через несколько минут.",
    en: "The firefighters arrived in a few minutes.",
    tokens: ["Hasiči", "prišli", "o", "pár", "minút", "."],
  },

  [phraseKey("policajná stanica", "a2-23")]: {
    sk: "Kde je najbližšia policajná stanica?",
    ua: "Де найближчий відділок поліції?",
    ru: "Где ближайший отдел полиции?",
    en: "Where is the nearest police station?",
    tokens: ["Kde", "je", "najbližšia", "policajná", "stanica", "?"],
  },

  [phraseKey("svedok", "a2-23")]: {
    sk: "Bol tam nejaký svedok?",
    ua: "Там був якийсь свідок?",
    ru: "Там был какой-то свидетель?",
    en: "Was there any witness?",
    tokens: ["Bol", "tam", "nejaký", "svedok", "?"],
  },

  [phraseKey("krádež", "a2-23")]: {
    sk: "Chcem nahlásiť krádež.",
    ua: "Я хочу заявити про крадіжку.",
    ru: "Я хочу заявить о краже.",
    en: "I want to report a theft.",
    tokens: ["Chcem", "nahlásiť", "krádež", "."],
  },

  [phraseKey("nahlásiť", "a2-23")]: {
    sk: "Musíte to nahlásiť na polícii.",
    ua: "Ви повинні повідомити про це в поліції.",
    ru: "Вы должны сообщить об этом в полиции.",
    en: "You must report it to the police.",
    tokens: ["Musíte", "to", "nahlásiť", "na", "polícii", "."],
  },

  [phraseKey("doklady", "a2-23")]: {
    sk: "Stratil som doklady aj kartu.",
    ua: "Я загубив документи і картку.",
    ru: "Я потерял документы и карту.",
    en: "I lost my documents and my card.",
    tokens: ["Stratil", "som", "doklady", "aj", "kartu", "."],
  },

  [phraseKey("stratiť", "a2-23")]: {
    sk: "Nechcem stratiť kľúče.",
    ua: "Я не хочу загубити ключі.",
    ru: "Я не хочу потерять ключи.",
    en: "I do not want to lose the keys.",
    tokens: ["Nechcem", "stratiť", "kľúče", "."],
  },

  [phraseKey("nájsť", "a2-23")]: {
    sk: "Dúfam, že to ešte nájdem.",
    ua: "Сподіваюся, що я це ще знайду.",
    ru: "Надеюсь, что я это ещё найду.",
    en: "I hope I will still find it.",
    tokens: ["Dúfam", ",", "že", "to", "ešte", "nájdem", "."],
  },

  // =========================
  // LESSON 24 — Jedlo (nákupy a varenie)
  // =========================
  [phraseKey("ingrediencie", "a2-24")]: {
    sk: "Mám všetky ingrediencie doma.",
    ua: "У мене вдома є всі інгредієнти.",
    ru: "У меня дома есть все ингредиенты.",
    en: "I have all the ingredients at home.",
    tokens: ["Mám", "všetky", "ingrediencie", "doma", "."],
  },

  [phraseKey("recept (kuchársky)", "a2-24")]: {
    sk: "Tento recept je jednoduchý a rýchly.",
    ua: "Цей кулінарний рецепт простий і швидкий.",
    ru: "Этот рецепт простой и быстрый.",
    en: "This recipe is simple and quick.",
    tokens: ["Tento", "recept", "je", "jednoduchý", "a", "rýchly", "."],
  },

  [phraseKey("nakrájať", "a2-24")]: {
    sk: "Môžete nakrájať cibuľu na malé kúsky?",
    ua: "Можеш нарізати цибулю на маленькі шматочки?",
    ru: "Можешь нарезать лук на маленькие кусочки?",
    en: "Can you cut the onion into small pieces?",
    tokens: ["Môžete", "nakrájať", "cibuľu", "na", "malé", "kúsky", "?"],
  },

  [phraseKey("zmiešať", "a2-24")]: {
    sk: "Najprv treba zmiešať múku s vodou.",
    ua: "Спочатку треба змішати борошно з водою.",
    ru: "Сначала нужно смешать муку с водой.",
    en: "First, you need to mix the flour with water.",
    tokens: ["Najprv", "treba", "zmiešať", "múku", "s", "vodou", "."],
  },

  [phraseKey("osmažiť", "a2-24")]: {
    sk: "Osmažím mäso na panvici.",
    ua: "Я підсмажу м’ясо на пательні.",
    ru: "Я поджарю мясо на сковороде.",
    en: "I will fry the meat in a pan.",
    tokens: ["Osmažím", "mäso", "na", "panvici", "."],
  },

  [phraseKey("uvariť", "a2-24")]: {
    sk: "Musím uvariť polievku.",
    ua: "Мені треба зварити суп.",
    ru: "Мне нужно сварить суп.",
    en: "I need to cook soup.",
    tokens: ["Musím", "uvariť", "polievku", "."],
  },

  [phraseKey("upiecť", "a2-24")]: {
    sk: "Na víkend chcem upiecť koláč.",
    ua: "На вихідні хочу спекти пиріг.",
    ru: "На выходные хочу испечь пирог.",
    en: "I want to bake a cake for the weekend.",
    tokens: ["Na", "víkend", "chcem", "upiecť", "koláč", "."],
  },

  [phraseKey("ochutiť", "a2-24")]: {
    sk: "Nezabudnite to ochutiť soľou a korením.",
    ua: "Не забудьте приправити це сіллю та перцем.",
    ru: "Не забудьте приправить это солью и перцем.",
    en: "Do not forget to season it with salt and pepper.",
    tokens: ["Nezabudnite", "to", "ochutiť", "soľou", "a", "korením", "."],
  },

  [phraseKey("porcia", "a2-24")]: {
    sk: "Dám si menšiu porciu.",
    ua: "Я візьму меншу порцію.",
    ru: "Я возьму меньшую порцию.",
    en: "I will take a smaller portion.",
    tokens: ["Dám", "si", "menšiu", "porciu", "."],
  },

  [phraseKey("zvyšky", "a2-24")]: {
    sk: "Zvyšky odložím do chladničky.",
    ua: "Залишки їжі покладу в холодильник.",
    ru: "Остатки еды положу в холодильник.",
    en: "I will put the leftovers in the fridge.",
    tokens: ["Zvyšky", "odložím", "do", "chladničky", "."],
  },

  // =========================
  // LESSON 25 — Cestovanie (plánovanie trasy)
  // =========================
  [phraseKey("itinerár", "a2-25")]: {
    sk: "Pripravil som si itinerár na celý týždeň.",
    ua: "Я підготував маршрут подорожі на весь тиждень.",
    ru: "Я подготовил маршрут поездки на всю неделю.",
    en: "I prepared an itinerary for the whole week.",
    tokens: ["Pripravil", "som", "si", "itinerár", "na", "celý", "týždeň", "."],
  },

  [phraseKey("prestup", "a2-25")]: {
    sk: "Máme prestup vo Viedni.",
    ua: "У нас пересадка у Відні.",
    ru: "У нас пересадка в Вене.",
    en: "We have a transfer in Vienna.",
    tokens: ["Máme", "prestup", "vo", "Viedni", "."],
  },

  [phraseKey("spoj", "a2-25")]: {
    sk: "Toto spojenie mi vyhovuje najviac.",
    ua: "Це сполучення мені підходить найбільше.",
    ru: "Этот рейс мне подходит больше всего.",
    en: "This connection suits me best.",
    tokens: ["Toto", "spojenie", "mi", "vyhovuje", "najviac", "."],
  },

  [phraseKey("oneskorenie", "a2-25")]: {
    sk: "Vlak má oneskorenie dvadsať minút.",
    ua: "Потяг має затримку двадцять хвилин.",
    ru: "Поезд задерживается на двадцать минут.",
    en: "The train is delayed by twenty minutes.",
    tokens: ["Vlak", "má", "oneskorenie", "dvadsať", "minút", "."],
  },

  [phraseKey("zrušený", "a2-25")]: {
    sk: "Tento let je zrušený.",
    ua: "Цей рейс скасований.",
    ru: "Этот рейс отменён.",
    en: "This flight is canceled.",
    tokens: ["Tento", "let", "je", "zrušený", "."],
  },

  [phraseKey("odbavenie", "a2-25")]: {
    sk: "Odbavenie začína dve hodiny pred odletom.",
    ua: "Реєстрація починається за дві години до вильоту.",
    ru: "Регистрация начинается за два часа до вылета.",
    en: "Check-in starts two hours before departure.",
    tokens: ["Odbavenie", "začína", "dve", "hodiny", "pred", "odletom", "."],
  },

  [phraseKey("cestovný poriadok", "a2-25")]: {
    sk: "Pozriem si cestovný poriadok online.",
    ua: "Я подивлюся розклад руху онлайн.",
    ru: "Я посмотрю расписание движения онлайн.",
    en: "I will check the timetable online.",
    tokens: ["Pozriem", "si", "cestovný", "poriadok", "online", "."],
  },

  [phraseKey("spiatočný lístok", "a2-25")]: {
    sk: "Chcem spiatočný lístok, prosím.",
    ua: "Мені потрібен квиток туди-назад, будь ласка.",
    ru: "Мне нужен билет туда-обратно, пожалуйста.",
    en: "I would like a return ticket, please.",
    tokens: ["Chcem", "spiatočný", "lístok", ",", "prosím", "."],
  },

  [phraseKey("jednosmerný lístok", "a2-25")]: {
    sk: "Stačí mi jednosmerný lístok.",
    ua: "Мені достатньо квитка в один бік.",
    ru: "Мне достаточно билета в одну сторону.",
    en: "A one-way ticket is enough for me.",
    tokens: ["Stačí", "mi", "jednosmerný", "lístok", "."],
  },

  [phraseKey("cestovný lístok", "a2-25")]: {
    sk: "Kde si môžem kúpiť cestovný lístok?",
    ua: "Де я можу купити квиток?",
    ru: "Где я могу купить билет?",
    en: "Where can I buy a ticket?",
    tokens: ["Kde", "si", "môžem", "kúpiť", "cestovný", "lístok", "?"],
  },

  // =========================
  // LESSON 26 — Komunikácia a informácie
  // =========================

  [phraseKey("správa", "a2-26")]: {
    sk: "Dostal som dôležitú správu.",
    ua: "Я отримав важливе повідомлення.",
    ru: "Я получил важное сообщение.",
    en: "I received an important message.",
    tokens: ["Dostal", "som", "dôležitú", "správu", "."],
  },

  [phraseKey("oznámenie", "a2-26")]: {
    sk: "Prečítal som si oznámenie na nástenke.",
    ua: "Я прочитав оголошення на дошці.",
    ru: "Я прочитал объявление на доске.",
    en: "I read the notice on the board.",
    tokens: ["Prečítal", "som", "si", "oznámenie", "na", "nástenke", "."],
  },

  [phraseKey("článok", "a2-26")]: {
    sk: "Ten článok bol veľmi zaujímavý.",
    ua: "Та стаття була дуже цікава.",
    ru: "Та статья была очень интересной.",
    en: "That article was very interesting.",
    tokens: ["Ten", "článok", "bol", "veľmi", "zaujímavý", "."],
  },

  [phraseKey("zdroj informácií", "a2-26")]: {
    sk: "Internet je hlavný zdroj informácií.",
    ua: "Інтернет є головним джерелом інформації.",
    ru: "Интернет — главный источник информации.",
    en: "The internet is the main source of information.",
    tokens: ["Internet", "je", "hlavný", "zdroj", "informácií", "."],
  },

  [phraseKey("uverejniť", "a2-26")]: {
    sk: "Chcem uverejniť nový článok.",
    ua: "Я хочу опублікувати нову статтю.",
    ru: "Я хочу опубликовать новую статью.",
    en: "I want to publish a new article.",
    tokens: ["Chcem", "uverejniť", "nový", "článok", "."],
  },

  [phraseKey("zverejniť", "a2-26")]: {
    sk: "Spoločnosť zverejnila výsledky.",
    ua: "Компанія оприлюднила результати.",
    ru: "Компания обнародовала результаты.",
    en: "The company published the results.",
    tokens: ["Spoločnosť", "zverejnila", "výsledky", "."],
  },

  [phraseKey("reagovať", "a2-26")]: {
    sk: "Musíme rýchlo reagovať na situáciu.",
    ua: "Ми повинні швидко реагувати на ситуацію.",
    ru: "Мы должны быстро реагировать на ситуацию.",
    en: "We must react quickly to the situation.",
    tokens: ["Musíme", "rýchlo", "reagovať", "na", "situáciu", "."],
  },

  [phraseKey("diskusia", "a2-26")]: {
    sk: "Diskusia bola veľmi užitočná.",
    ua: "Дискусія була дуже корисною.",
    ru: "Дискуссия была очень полезной.",
    en: "The discussion was very useful.",
    tokens: ["Diskusia", "bola", "veľmi", "užitočná", "."],
  },

  [phraseKey("názor", "a2-26")]: {
    sk: "Mám na to iný názor.",
    ua: "Я маю іншу думку щодо цього.",
    ru: "У меня другое мнение по этому поводу.",
    en: "I have a different opinion about it.",
    tokens: ["Mám", "na", "to", "iný", "názor", "."],
  },

  [phraseKey("vplyv", "a2-26")]: {
    sk: "To má veľký vplyv na výsledok.",
    ua: "Це має великий вплив на результат.",
    ru: "Это оказывает большое влияние на результат.",
    en: "It has a big impact on the result.",
    tokens: ["To", "má", "veľký", "vplyv", "na", "výsledok", "."],
  },

  // =========================
  // LESSON 27 — Komunikácia (námietky a argumenty)
  // =========================
  [phraseKey("naopak", "a2-27")]: {
    sk: "Nie, naopak, je to lepšie.",
    ua: "Ні, навпаки, це краще.",
    ru: "Нет, наоборот, так лучше.",
    en: "No, on the contrary, it is better.",
    tokens: ["Nie", ",", "naopak", ",", "je", "to", "lepšie", "."],
  },

  [phraseKey("v skutočnosti", "a2-27")]: {
    sk: "V skutočnosti to nie je také jednoduché.",
    ua: "Насправді це не так просто.",
    ru: "На самом деле это не так просто.",
    en: "In fact, it is not that simple.",
    tokens: ["V", "skutočnosti", "to", "nie", "je", "také", "jednoduché", "."],
  },

  [phraseKey("dôkaz", "a2-27")]: {
    sk: "Máte na to nejaký dôkaz?",
    ua: "У вас є якийсь доказ?",
    ru: "У вас есть какое-то доказательство?",
    en: "Do you have any proof of that?",
    tokens: ["Máte", "na", "to", "nejaký", "dôkaz", "?"],
  },

  [phraseKey("argument", "a2-27")]: {
    sk: "Toto je silný argument.",
    ua: "Це сильний аргумент.",
    ru: "Это сильный аргумент.",
    en: "This is a strong argument.",
    tokens: ["Toto", "je", "silný", "argument", "."],
  },

  [phraseKey("dôvod", "a2-27")]: {
    sk: "Aký je dôvod tejto zmeny?",
    ua: "Яка причина цієї зміни?",
    ru: "Какова причина этого изменения?",
    en: "What is the reason for this change?",
    tokens: ["Aký", "je", "dôvod", "tejto", "zmeny", "?"],
  },

  [phraseKey("výhoda", "a2-27")]: {
    sk: "Výhoda je, že ušetríme čas.",
    ua: "Перевага в тому, що ми зекономимо час.",
    ru: "Преимущество в том, что мы сэкономим время.",
    en: "The advantage is that we will save time.",
    tokens: ["Výhoda", "je", ",", "že", "ušetríme", "čas", "."],
  },

  [phraseKey("nevýhoda", "a2-27")]: {
    sk: "Nevýhoda je vyššia cena.",
    ua: "Недолік — вища ціна.",
    ru: "Недостаток — более высокая цена.",
    en: "The disadvantage is the higher price.",
    tokens: ["Nevýhoda", "je", "vyššia", "cena", "."],
  },

  [phraseKey("záleží", "a2-27")]: {
    sk: "Záleží na situácii.",
    ua: "Залежить від ситуації.",
    ru: "Зависит от ситуации.",
    en: "It depends on the situation.",
    tokens: ["Záleží", "na", "situácii", "."],
  },

  [phraseKey("presvedčiť", "a2-27")]: {
    sk: "Skúsim ťa presvedčiť, ale bez nátlaku.",
    ua: "Спробую тебе переконати, але без тиску.",
    ru: "Попробую тебя убедить, но без давления.",
    en: "I will try to convince you, but without pressure.",
    tokens: ["Skúsim", "ťa", "presvedčiť", ",", "ale", "bez", "nátlaku", "."],
  },

  [phraseKey("súhlasiť s tým", "a2-27")]: {
    sk: "Nemôžem súhlasiť s týmto riešením.",
    ua: "Я не можу погодитися з цим рішенням.",
    ru: "Я не могу согласиться с этим решением.",
    en: "I cannot agree with this solution.",
    tokens: ["Nemôžem", "súhlasiť", "s", "týmto", "riešením", "."],
  },

  // =========================
  // LESSON 28 — Technológie (internet a bezpečnosť)
  // =========================
  [phraseKey("súkromie", "a2-28")]: {
    sk: "Chcem chrániť svoje súkromie online.",
    ua: "Я хочу захистити свою приватність в інтернеті.",
    ru: "Я хочу защитить свою приватность в интернете.",
    en: "I want to protect my privacy online.",
    tokens: ["Chcem", "chrániť", "svoje", "súkromie", "online", "."],
  },

  [phraseKey("bezpečnosť", "a2-28")]: {
    sk: "Bezpečnosť účtu je pre mňa dôležitá.",
    ua: "Безпека акаунта для мене важлива.",
    ru: "Безопасность аккаунта для меня важна.",
    en: "Account security is important to me.",
    tokens: ["Bezpečnosť", "účtu", "je", "pre", "mňa", "dôležitá", "."],
  },

  [phraseKey("overenie", "a2-28")]: {
    sk: "Na prihlásenie potrebujem overenie.",
    ua: "Для входу мені потрібне підтвердження.",
    ru: "Для входа мне нужна верификация.",
    en: "I need verification to log in.",
    tokens: ["Na", "prihlásenie", "potrebujem", "overenie", "."],
  },

  [phraseKey("dvojfaktorové overenie", "a2-28")]: {
    sk: "Zapol som dvojfaktorové overenie.",
    ua: "Я увімкнув двофакторну перевірку.",
    ru: "Я включил двухфакторную проверку.",
    en: "I turned on two-factor authentication.",
    tokens: ["Zapol", "som", "dvojfaktorové", "overenie", "."],
  },

  [phraseKey("podvod", "a2-28")]: {
    sk: "Pozor, môže to byť podvod.",
    ua: "Обережно, це може бути шахрайство.",
    ru: "Осторожно, это может быть мошенничество.",
    en: "Be careful, it may be a scam.",
    tokens: ["Pozor", ",", "môže", "to", "byť", "podvod", "."],
  },

  [phraseKey("odkaz", "a2-28")]: {
    sk: "Neotvárajte podozrivý odkaz.",
    ua: "Не відкривайте підозріле посилання.",
    ru: "Не открывайте подозрительную ссылку.",
    en: "Do not open a suspicious link.",
    tokens: ["Neotvárajte", "podozrivý", "odkaz", "."],
  },

  [phraseKey("stiahnuť súbor", "a2-28")]: {
    sk: "Potrebujem stiahnuť súbor z e-mailu.",
    ua: "Мені потрібно завантажити файл з електронної пошти.",
    ru: "Мне нужно скачать файл из электронной почты.",
    en: "I need to download a file from the email.",
    tokens: ["Potrebujem", "stiahnuť", "súbor", "z", "e-mailu", "."],
  },

  [phraseKey("vírus", "a2-28")]: {
    sk: "Počítač môže mať vírus.",
    ua: "Комп’ютер може мати вірус.",
    ru: "Компьютер может быть заражён вирусом.",
    en: "The computer may have a virus.",
    tokens: ["Počítač", "môže", "mať", "vírus", "."],
  },

  [phraseKey("zablokovať", "a2-28")]: {
    sk: "Musím zablokovať tento účet.",
    ua: "Мені треба заблокувати цей акаунт.",
    ru: "Мне нужно заблокировать этот аккаунт.",
    en: "I need to block this account.",
    tokens: ["Musím", "zablokovať", "tento", "účet", "."],
  },

  [phraseKey("obnoviť heslo", "a2-28")]: {
    sk: "Neviete mi pomôcť obnoviť heslo?",
    ua: "Ви не можете мені допомогти відновити пароль?",
    ru: "Вы не можете помочь мне восстановить пароль?",
    en: "Can you help me reset the password?",
    tokens: ["Neviete", "mi", "pomôcť", "obnoviť", "heslo", "?"],
  },

  // =========================
  // LESSON 29 — Emócie (rozšírené)
  // =========================
  [phraseKey("sklamaný", "a2-29")]: {
    sk: "Som sklamaný z výsledku.",
    ua: "Я розчарований результатом.",
    ru: "Я разочарован результатом.",
    en: "I am disappointed with the result.",
    tokens: ["Som", "sklamaný", "z", "výsledku", "."],
  },

  [phraseKey("nahnevaný", "a2-29")]: {
    sk: "Bol som nahnevaný, ale už je to lepšie.",
    ua: "Я був розлючений, але вже краще.",
    ru: "Я был зол, но уже лучше.",
    en: "I was angry, but it is better now.",
    tokens: ["Bol", "som", "nahnevaný", ",", "ale", "už", "je", "to", "lepšie", "."],
  },

  [phraseKey("nadšený", "a2-29")]: {
    sk: "Som nadšený z tejto správy.",
    ua: "Я захоплений цією новиною.",
    ru: "Я в восторге от этой новости.",
    en: "I am excited about this news.",
    tokens: ["Som", "nadšený", "z", "tejto", "správy", "."],
  },

  [phraseKey("zmätený", "a2-29")]: {
    sk: "Som zmätený, neviem, čo robiť.",
    ua: "Я розгублений і не знаю, що робити.",
    ru: "Я растерян и не знаю, что делать.",
    en: "I am confused and do not know what to do.",
    tokens: ["Som", "zmätený", ",", "neviem", ",", "čo", "robiť", "."],
  },

  [phraseKey("znepokojený", "a2-29")]: {
    sk: "Som znepokojený, lebo sa neozýva.",
    ua: "Я стурбований, бо він не відповідає.",
    ru: "Я обеспокоен, потому что он не отвечает.",
    en: "I am worried because he is not responding.",
    tokens: ["Som", "znepokojený", ",", "lebo", "sa", "neozýva", "."],
  },

  [phraseKey("hrdý", "a2-29")]: {
    sk: "Som na teba hrdý.",
    ua: "Я пишаюся тобою.",
    ru: "Я тобой горжусь.",
    en: "I am proud of you.",
    tokens: ["Som", "na", "teba", "hrdý", "."],
  },

  [phraseKey("vďačný", "a2-29")]: {
    sk: "Som vám veľmi vďačný za pomoc.",
    ua: "Я вам дуже вдячний за допомогу.",
    ru: "Я вам очень благодарен за помощь.",
    en: "I am very grateful to you for your help.",
    tokens: ["Som", "vám", "veľmi", "vďačný", "za", "pomoc", "."],
  },

  [phraseKey("hanbiť sa", "a2-29")]: {
    sk: "Nemusíš sa hanbiť za chyby.",
    ua: "Не треба соромитися помилок.",
    ru: "Не нужно стыдиться ошибок.",
    en: "You do not have to be ashamed of mistakes.",
    tokens: ["Nemusíš", "sa", "hanbiť", "za", "chyby", "."],
  },

  [phraseKey("ľutovať", "a2-29")]: {
    sk: "Ľutujem, že som ti to nepovedal skôr.",
    ua: "Шкодую, що не сказав тобі раніше.",
    ru: "Жалею, что не сказал тебе раньше.",
    en: "I regret that I did not tell you earlier.",
    tokens: ["Ľutujem", ",", "že", "som", "ti", "to", "nepovedal", "skôr", "."],
  },

  [phraseKey("uľaviť sa", "a2-29")]: {
    sk: "Uľavilo sa mi, keď som to vyriešil.",
    ua: "Мені полегшало, коли я це вирішив.",
    ru: "Мне полегчало, когда я это решил.",
    en: "I felt relieved when I solved it.",
    tokens: ["Uľavilo", "sa", "mi", ",", "keď", "som", "to", "vyriešil", "."],
  },

  // =========================
  // LESSON 30 — Opakovanie A2 (21–29)
  // =========================
  [phraseKey("náhradný diel", "a2-30")]: {
    sk: "Bez náhradného dielu to nepôjde.",
    ua: "Без запасної частини це не вийде.",
    ru: "Без запасной детали это не получится.",
    en: "It will not work without a spare part.",
    tokens: ["Bez", "náhradného", "dielu", "to", "nepôjde", "."],
  },

  [phraseKey("dávkovanie", "a2-30")]: {
    sk: "Skontrolujte dávkovanie v návode.",
    ua: "Перевірте дозування в інструкції.",
    ru: "Проверьте дозировку в инструкции.",
    en: "Check the dosage in the instructions.",
    tokens: ["Skontrolujte", "dávkovanie", "v", "návode", "."],
  },

  [phraseKey("krádež", "a2-30")]: {
    sk: "Krádež už bola nahlásená.",
    ua: "Про крадіжку вже повідомили.",
    ru: "О краже уже сообщили.",
    en: "The theft has already been reported.",
    tokens: ["Krádež", "už", "bola", "nahlásená", "."],
  },

  [phraseKey("ingrediencie", "a2-30")]: {
    sk: "Ingrediencie si pripravím dopredu.",
    ua: "Інгредієнти підготую заздалегідь.",
    ru: "Ингредиенты подготовлю заранее.",
    en: "I will prepare the ingredients in advance.",
    tokens: ["Ingrediencie", "si", "pripravím", "dopredu", "."],
  },

  [phraseKey("itinerár", "a2-30")]: {
    sk: "Itinerár máme hotový.",
    ua: "Маршрут у нас готовий.",
    ru: "Маршрут у нас готов.",
    en: "We have the itinerary ready.",
    tokens: ["Itinerár", "máme", "hotový", "."],
  },

  [phraseKey("výplatná páska", "a2-30")]: {
    sk: "Potrebujem výplatnú pásku na úrad.",
    ua: "Мені потрібен розрахунковий лист для установи.",
    ru: "Мне нужен расчётный листок для учреждения.",
    en: "I need a payslip for the office.",
    tokens: ["Potrebujem", "výplatnú", "pásku", "na", "úrad", "."],
  },

  [phraseKey("argument", "a2-30")]: {
    sk: "Tvoj argument znie rozumne.",
    ua: "Твій аргумент звучить розумно.",
    ru: "Твой аргумент звучит разумно.",
    en: "Your argument sounds reasonable.",
    tokens: ["Tvoj", "argument", "znie", "rozumne", "."],
  },

  [phraseKey("podvod", "a2-30")]: {
    sk: "Vyzerá to ako internetový podvod.",
    ua: "Це схоже на інтернет-шахрайство.",
    ru: "Это похоже на интернет-мошенничество.",
    en: "It looks like an internet scam.",
    tokens: ["Vyzerá", "to", "ako", "internetový", "podvod", "."],
  },

  [phraseKey("znepokojený", "a2-30")]: {
    sk: "Bol som znepokojený, no všetko dopadlo dobre.",
    ua: "Я був стурбований, але все закінчилося добре.",
    ru: "Я был обеспокоен, но всё закончилось хорошо.",
    en: "I was worried, but everything turned out well.",
    tokens: ["Bol", "som", "znepokojený", ",", "no", "všetko", "dopadlo", "dobre", "."],
  },

  [phraseKey("záleží", "a2-30")]: {
    sk: "Záleží, čo presne potrebujete.",
    ua: "Залежить, що саме вам потрібно.",
    ru: "Зависит от того, что именно вам нужно.",
    en: "It depends on what exactly you need.",
    tokens: ["Záleží", ",", "čo", "presne", "potrebujete", "."],
  },
};
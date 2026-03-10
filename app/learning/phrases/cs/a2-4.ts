import type { Phrase } from "../registry";
import { phraseKey } from "../phraseKey";

export const CS_A2_PHRASES_4: Record<string, Phrase> = {
  // =========================
  // LESSON A2-31 — Житло (пошук і оренда)
  // =========================
  [phraseKey("nabídka", "пропозиція", "a2-31")]: {
    sk: "Ta nabídka bytu vypadá zajímavě.",
    ua: "Ця пропозиція квартири виглядає цікаво.",
    ru: "Это предложение квартиры выглядит интересно.",
    tokens: ["Ta", "nabídka", "bytu", "vypadá", "zajímavě", "."],
  },

  [phraseKey("poptávka", "попит", "a2-31")]: {
    sk: "V centru je velká poptávka po bytech.",
    ua: "У центрі великий попит на квартири.",
    ru: "В центре большой спрос на квартиры.",
    tokens: ["V", "centru", "je", "velká", "poptávka", "po", "bytech", "."],
  },

  [phraseKey("prohlídka", "огляд (квартири)", "a2-31")]: {
    sk: "Zítra máme prohlídku bytu.",
    ua: "Завтра в нас огляд квартири.",
    ru: "Завтра у нас осмотр квартиры.",
    tokens: ["Zítra", "máme", "prohlídku", "bytu", "."],
  },

  [phraseKey("záloha", "застава/депозит", "a2-31")]: {
    sk: "Majitel požaduje zálohu předem.",
    ua: "Власник вимагає заставу наперед.",
    ru: "Владелец требует залог заранее.",
    tokens: ["Majitel", "požaduje", "zálohu", "předem", "."],
  },

  [phraseKey("kauce", "депозит (кауція)", "a2-31")]: {
    sk: "Kauce je ve výši jednoho nájmu.",
    ua: "Кауція становить суму однієї оренди.",
    ru: "Депозит составляет сумму одной аренды.",
    tokens: ["Kauce", "je", "ve", "výši", "jednoho", "nájmu", "."],
  },

  [phraseKey("měsíční platba", "щомісячна оплата", "a2-31")]: {
    sk: "Měsíční platba je dvanáct tisíc korun.",
    ua: "Щомісячна оплата становить дванадцять тисяч крон.",
    ru: "Ежемесячная оплата составляет двенадцать тысяч крон.",
    tokens: ["Měsíční", "platba", "je", "dvanáct", "tisíc", "korun", "."],
  },

  [phraseKey("energie v ceně", "комунальні включені", "a2-31")]: {
    sk: "V inzerátu bylo napsáno energie v ceně.",
    ua: "В оголошенні було написано, що комунальні включені.",
    ru: "В объявлении было написано, что коммунальные включены.",
    tokens: ["V", "inzerátu", "bylo", "napsáno", "energie", "v", "ceně", "."],
  },

  [phraseKey("zařízený", "мебльований", "a2-31")]: {
    sk: "Hledáme zařízený byt v klidné části města.",
    ua: "Ми шукаємо мебльовану квартиру в тихій частині міста.",
    ru: "Мы ищем меблированную квартиру в тихой части города.",
    tokens: ["Hledáme", "zařízený", "byt", "v", "klidné", "části", "města", "."],
  },

  [phraseKey("nezařízený", "немебльований", "a2-31")]: {
    sk: "Ten byt je úplně nezařízený.",
    ua: "Ця квартира зовсім немебльована.",
    ru: "Эта квартира совсем немеблированная.",
    tokens: ["Ten", "byt", "je", "úplně", "nezařízený", "."],
  },

  [phraseKey("spolubydlení", "спільне проживання", "a2-31")]: {
    sk: "Spolubydlení je levnější než vlastní byt.",
    ua: "Спільне проживання дешевше, ніж окрема квартира.",
    ru: "Совместное проживание дешевле, чем отдельная квартира.",
    tokens: ["Spolubydlení", "je", "levnější", "než", "vlastní", "byt", "."],
  },

  // =========================
  // LESSON A2-32 — Робота (професійні навички)
  // =========================
  [phraseKey("schopnost", "здатність", "a2-32")]: {
    sk: "Komunikace je důležitá schopnost.",
    ua: "Комунікація — важлива здатність.",
    ru: "Коммуникация — важная способность.",
    tokens: ["Komunikace", "je", "důležitá", "schopnost", "."],
  },

  [phraseKey("zručnost", "навичка", "a2-32")]: {
    sk: "Tato zručnost se ti bude hodit v práci.",
    ua: "Ця навичка стане тобі в пригоді на роботі.",
    ru: "Этот навык пригодится тебе на работе.",
    tokens: ["Tato", "zručnost", "se", "ti", "bude", "hodit", "v", "práci", "."],
  },

  [phraseKey("zkušenosti", "досвід", "a2-32")]: {
    sk: "Máte už nějaké pracovní zkušenosti?",
    ua: "У вас уже є якийсь робочий досвід?",
    ru: "У вас уже есть какой-то рабочий опыт?",
    tokens: ["Máte", "už", "nějaké", "pracovní", "zkušenosti", "?"],
  },

  [phraseKey("odpovědný", "відповідальний", "a2-32")]: {
    sk: "Hledáme odpovědného pracovníka.",
    ua: "Ми шукаємо відповідального працівника.",
    ru: "Мы ищем ответственного работника.",
    tokens: ["Hledáme", "odpovědného", "pracovníka", "."],
  },

  [phraseKey("samostatný", "самостійний", "a2-32")]: {
    sk: "Na této pozici musíš být samostatný.",
    ua: "На цій посаді ти маєш бути самостійним.",
    ru: "На этой должности ты должен быть самостоятельным.",
    tokens: ["Na", "této", "pozici", "musíš", "být", "samostatný", "."],
  },

  [phraseKey("přesný", "точний", "a2-32")]: {
    sk: "Při této práci je důležité být přesný.",
    ua: "У цій роботі важливо бути точним.",
    ru: "В этой работе важно быть точным.",
    tokens: ["Při", "této", "práci", "je", "důležité", "být", "přesný", "."],
  },

  [phraseKey("spolehlivý", "надійний", "a2-32")]: {
    sk: "Je to velmi spolehlivý kolega.",
    ua: "Він дуже надійний колега.",
    ru: "Он очень надёжный коллега.",
    tokens: ["Je", "to", "velmi", "spolehlivý", "kolega", "."],
  },

  [phraseKey("komunikativní", "комунікабельний", "a2-32")]: {
    sk: "Na recepci je potřeba být komunikativní.",
    ua: "На ресепшені потрібно бути комунікабельним.",
    ru: "На ресепшене нужно быть коммуникабельным.",
    tokens: ["Na", "recepci", "je", "potřeba", "být", "komunikativní", "."],
  },

  [phraseKey("flexibilní", "гнучкий", "a2-32")]: {
    sk: "Firma hledá flexibilní lidi.",
    ua: "Фірма шукає гнучких людей.",
    ru: "Фирма ищет гибких людей.",
    tokens: ["Firma", "hledá", "flexibilní", "lidi", "."],
  },

  [phraseKey("učit se rychle", "швидко вчитися", "a2-32")]: {
    sk: "Musíš se umět rychle učit.",
    ua: "Ти маєш уміти швидко вчитися.",
    ru: "Ты должен уметь быстро учиться.",
    tokens: ["Musíš", "se", "umět", "rychle", "učit", "."],
  },

  // =========================
  // LESSON A2-33 — Відпочинок і дозвілля
  // =========================
  [phraseKey("volný čas", "вільний час", "a2-33")]: {
    sk: "Ve volném čase rád čtu.",
    ua: "У вільний час я люблю читати.",
    ru: "В свободное время я люблю читать.",
    tokens: ["Ve", "volném", "čase", "rád", "čtu", "."],
  },

  [phraseKey("odpočinout si", "відпочити", "a2-33")]: {
    sk: "O víkendu si chci konečně odpočinout.",
    ua: "На вихідних я хочу нарешті відпочити.",
    ru: "На выходных я хочу наконец отдохнуть.",
    tokens: ["O", "víkendu", "si", "chci", "konečně", "odpočinout", "."],
  },

  [phraseKey("zábava", "розвага", "a2-33")]: {
    sk: "Byla to skvělá zábava pro všechny.",
    ua: "Це була чудова розвага для всіх.",
    ru: "Это было отличное развлечение для всех.",
    tokens: ["Byla", "to", "skvělá", "zábava", "pro", "všechny", "."],
  },

  [phraseKey("událost", "подія", "a2-33")]: {
    sk: "To je důležitá kulturní událost.",
    ua: "Це важлива культурна подія.",
    ru: "Это важное культурное событие.",
    tokens: ["To", "je", "důležitá", "kulturní", "událost", "."],
  },

  [phraseKey("festival", "фестиваль", "a2-33")]: {
    sk: "V létě chceme jet na hudební festival.",
    ua: "Влітку ми хочемо поїхати на музичний фестиваль.",
    ru: "Летом мы хотим поехать на музыкальный фестиваль.",
    tokens: ["V", "létě", "chceme", "jet", "na", "hudební", "festival", "."],
  },

  [phraseKey("vstupenka", "квиток", "a2-33")]: {
    sk: "Koupil jsem dvě vstupenky online.",
    ua: "Я купив два квитки онлайн.",
    ru: "Я купил два билета онлайн.",
    tokens: ["Koupil", "jsem", "dvě", "vstupenky", "online", "."],
  },

  [phraseKey("představení", "вистава", "a2-33")]: {
    sk: "To divadelní představení bylo skvělé.",
    ua: "Та театральна вистава була чудовою.",
    ru: "Этот театральный спектакль был отличным.",
    tokens: ["To", "divadelní", "představení", "bylo", "skvělé", "."],
  },

  [phraseKey("koncert", "концерт", "a2-33")]: {
    sk: "Na koncert přišlo hodně lidí.",
    ua: "На концерт прийшло багато людей.",
    ru: "На концерт пришло много людей.",
    tokens: ["Na", "koncert", "přišlo", "hodně", "lidí", "."],
  },

  [phraseKey("výstava", "виставка", "a2-33")]: {
    sk: "V muzeu je nová výstava.",
    ua: "У музеї є нова виставка.",
    ru: "В музее новая выставка.",
    tokens: ["V", "muzeu", "je", "nová", "výstava", "."],
  },

  [phraseKey("rezervovat místo", "забронювати місце", "a2-33")]: {
    sk: "Musíme si rezervovat místo předem.",
    ua: "Нам треба забронювати місце заздалегідь.",
    ru: "Нам нужно забронировать место заранее.",
    tokens: ["Musíme", "si", "rezervovat", "místo", "předem", "."],
  },

  // =========================
  // LESSON A2-34 — Сервіс (майстерня, ремонт)
  // =========================
  [phraseKey("servis", "сервіс", "a2-34")]: {
    sk: "Auto je teď v servisu.",
    ua: "Авто зараз у сервісі.",
    ru: "Машина сейчас в сервисе.",
    tokens: ["Auto", "je", "teď", "v", "servisu", "."],
  },

  [phraseKey("objednat termín", "записатися на час", "a2-34")]: {
    sk: "Potřebuji objednat termín na příští týden.",
    ua: "Мені потрібно записатися на час на наступний тиждень.",
    ru: "Мне нужно записаться на время на следующую неделю.",
    tokens: ["Potřebuji", "objednat", "termín", "na", "příští", "týden", "."],
  },

  [phraseKey("diagnostika", "діагностика", "a2-34")]: {
    sk: "Nejdřív udělají diagnostiku auta.",
    ua: "Спочатку вони зроблять діагностику авто.",
    ru: "Сначала они сделают диагностику машины.",
    tokens: ["Nejdřív", "udělají", "diagnostiku", "auta", "."],
  },

  [phraseKey("porucha", "несправність", "a2-34")]: {
    sk: "Ta porucha se objevila znovu.",
    ua: "Ця несправність з’явилася знову.",
    ru: "Эта неисправность появилась снова.",
    tokens: ["Ta", "porucha", "se", "objevila", "znovu", "."],
  },

  [phraseKey("oprava", "ремонт", "a2-34")]: {
    sk: "Oprava bude trvat dva dny.",
    ua: "Ремонт триватиме два дні.",
    ru: "Ремонт будет длиться два дня.",
    tokens: ["Oprava", "bude", "trvat", "dva", "dny", "."],
  },

  [phraseKey("náhradní díly", "запасні частини", "a2-34")]: {
    sk: "Na některé náhradní díly se čeká dlouho.",
    ua: "На деякі запасні частини довго чекають.",
    ru: "Некоторые запасные части приходится долго ждать.",
    tokens: ["Na", "některé", "náhradní", "díly", "se", "čeká", "dlouho", "."],
  },

  [phraseKey("ceník", "прайс", "a2-34")]: {
    sk: "Ceník mají vyvěšený u vstupu.",
    ua: "Прайс у них вивішений біля входу.",
    ru: "Прайс-лист у них вывешен у входа.",
    tokens: ["Ceník", "mají", "vyvěšený", "u", "vstupu", "."],
  },

  [phraseKey("odhad ceny", "оцінка вартості", "a2-34")]: {
    sk: "Nejdřív mi pošlou odhad ceny.",
    ua: "Спочатку вони надішлють мені оцінку вартості.",
    ru: "Сначала они пришлют мне оценку стоимости.",
    tokens: ["Nejdřív", "mi", "pošlou", "odhad", "ceny", "."],
  },

  [phraseKey("schválit", "схвалити / затвердити", "a2-34")]: {
    sk: "Musíte nejdřív schválit opravu.",
    ua: "Ви спочатку маєте схвалити ремонт.",
    ru: "Вы сначала должны одобрить ремонт.",
    tokens: ["Musíte", "nejdřív", "schválit", "opravu", "."],
  },

  [phraseKey("záruka", "гарантія", "a2-34")]: {
    sk: "Na tuto opravu je záruka šest měsíců.",
    ua: "На цей ремонт є гарантія шість місяців.",
    ru: "На этот ремонт даётся гарантия шесть месяцев.",
    tokens: ["Na", "tuto", "opravu", "je", "záruka", "šest", "měsíců", "."],
  },

  // =========================
  // LESSON A2-35 — В магазині (складніші ситуації)
  // =========================
  [phraseKey("dostupnost", "наявність", "a2-35")]: {
    sk: "Nejdřív musím ověřit dostupnost zboží.",
    ua: "Спочатку мені треба перевірити наявність товару.",
    ru: "Сначала мне нужно проверить наличие товара.",
    tokens: ["Nejdřív", "musím", "ověřit", "dostupnost", "zboží", "."],
  },

  [phraseKey("skladem", "в наявності", "a2-35")]: {
    sk: "Tento model už bohužel není skladem.",
    ua: "Ця модель, на жаль, вже не в наявності.",
    ru: "Этой модели, к сожалению, уже нет в наличии.",
    tokens: ["Tento", "model", "už", "bohužel", "není", "skladem", "."],
  },

  [phraseKey("vyprodáno", "розпродано", "a2-35")]: {
    sk: "Včera to ještě měli, dnes je vyprodáno.",
    ua: "Учора це ще було, а сьогодні вже розпродано.",
    ru: "Вчера это ещё было, а сегодня уже распродано.",
    tokens: ["Včera", "to", "ještě", "měli", ",", "dnes", "je", "vyprodáno", "."],
  },

  [phraseKey("objednat", "замовити", "a2-35")]: {
    sk: "Můžeme to pro vás objednat.",
    ua: "Ми можемо це для вас замовити.",
    ru: "Мы можем это для вас заказать.",
    tokens: ["Můžeme", "to", "pro", "vás", "objednat", "."],
  },

  [phraseKey("dodání", "поставка", "a2-35")]: {
    sk: "Dodání proběhne příští týden.",
    ua: "Поставка відбудеться наступного тижня.",
    ru: "Поставка произойдёт на следующей неделе.",
    tokens: ["Dodání", "proběhne", "příští", "týden", "."],
  },

  [phraseKey("dodací lhůta", "термін доставки", "a2-35")]: {
    sk: "Dodací lhůta je deset pracovních dnů.",
    ua: "Термін доставки — десять робочих днів.",
    ru: "Срок доставки — десять рабочих дней.",
    tokens: ["Dodací", "lhůta", "je", "deset", "pracovních", "dnů", "."],
  },

  [phraseKey("poškozené zboží", "пошкоджений товар", "a2-35")]: {
    sk: "Dostal jsem poškozené zboží.",
    ua: "Я отримав пошкоджений товар.",
    ru: "Я получил повреждённый товар.",
    tokens: ["Dostal", "jsem", "poškozené", "zboží", "."],
  },

  [phraseKey("vyměnit zboží", "обміняти товар", "a2-35")]: {
    sk: "Chci vyměnit zboží za jiné.",
    ua: "Я хочу обміняти товар на інший.",
    ru: "Я хочу обменять товар на другой.",
    tokens: ["Chci", "vyměnit", "zboží", "za", "jiné", "."],
  },

  [phraseKey("vrátit peníze", "повернути гроші", "a2-35")]: {
    sk: "Můžete mi vrátit peníze na účet?",
    ua: "Можете повернути мені гроші на рахунок?",
    ru: "Можете вернуть мне деньги на счёт?",
    tokens: ["Můžete", "mi", "vrátit", "peníze", "na", "účet", "?"],
  },

  [phraseKey("reklamační oddělení", "відділ рекламацій", "a2-35")]: {
    sk: "Musíte kontaktovat reklamační oddělení.",
    ua: "Вам потрібно зв’язатися з відділом рекламацій.",
    ru: "Вам нужно связаться с отделом рекламаций.",
    tokens: ["Musíte", "kontaktovat", "reklamační", "oddělení", "."],
  },

  // =========================
  // LESSON A2-36 — Подорожі (готельні ситуації)
  // =========================
  [phraseKey("recepce", "ресепшн", "a2-36")]: {
    sk: "Na recepci nám dali kartu od pokoje.",
    ua: "На ресепшені нам дали картку від номера.",
    ru: "На ресепшене нам дали карту от номера.",
    tokens: ["Na", "recepci", "nám", "dali", "kartu", "od", "pokoje", "."],
  },

  [phraseKey("ubytovat se", "заселитися", "a2-36")]: {
    sk: "Chceme se ubytovat co nejdřív.",
    ua: "Ми хочемо заселитися якомога швидше.",
    ru: "Мы хотим заселиться как можно скорее.",
    tokens: ["Chceme", "se", "ubytovat", "co", "nejdřív", "."],
  },

  [phraseKey("odhlásit se", "виселитися", "a2-36")]: {
    sk: "Musíme se odhlásit do deseti hodin.",
    ua: "Нам треба виселитися до десятої години.",
    ru: "Нам нужно выселиться до десяти часов.",
    tokens: ["Musíme", "se", "odhlásit", "do", "deseti", "hodin", "."],
  },

  [phraseKey("pokoj", "номер/кімната", "a2-36")]: {
    sk: "Náš pokoj je ve třetím patře.",
    ua: "Наш номер на третьому поверсі.",
    ru: "Наш номер на третьем этаже.",
    tokens: ["Náš", "pokoj", "je", "ve", "třetím", "patře", "."],
  },

  [phraseKey("klíč/karta", "ключ/картка", "a2-36")]: {
    sk: "Ztratil jsem klíč od pokoje.",
    ua: "Я загубив ключ від номера.",
    ru: "Я потерял ключ от номера.",
    tokens: ["Ztratil", "jsem", "klíč", "od", "pokoje", "."],
  },

  [phraseKey("snídaně v ceně", "сніданок включено", "a2-36")]: {
    sk: "V rezervaci byla snídaně v ceně.",
    ua: "У бронюванні сніданок був включений.",
    ru: "В бронировании завтрак был включён.",
    tokens: ["V", "rezervaci", "byla", "snídaně", "v", "ceně", "."],
  },

  [phraseKey("doplatek", "доплата", "a2-36")]: {
    sk: "Za pozdní odjezd je malý doplatek.",
    ua: "За пізній виїзд є невелика доплата.",
    ru: "За поздний выезд есть небольшая доплата.",
    tokens: ["Za", "pozdní", "odjezd", "je", "malý", "doplatek", "."],
  },

  [phraseKey("stížnost", "скарга", "a2-36")]: {
    sk: "Na recepci jsme podali stížnost.",
    ua: "На ресепшені ми подали скаргу.",
    ru: "На ресепшене мы подали жалобу.",
    tokens: ["Na", "recepci", "jsme", "podali", "stížnost", "."],
  },

  [phraseKey("hluk", "шум", "a2-36")]: {
    sk: "V noci byl na chodbě velký hluk.",
    ua: "Уночі в коридорі був великий шум.",
    ru: "Ночью в коридоре был сильный шум.",
    tokens: ["V", "noci", "byl", "na", "chodbě", "velký", "hluk", "."],
  },

  [phraseKey("úklid", "прибирання", "a2-36")]: {
    sk: "Úklid pokoje probíhá každé ráno.",
    ua: "Прибирання номера відбувається щоранку.",
    ru: "Уборка номера проходит каждое утро.",
    tokens: ["Úklid", "pokoje", "probíhá", "každé", "ráno", "."],
  },

  // =========================
  // LESSON A2-37 — Ресторан (обслуговування)
  // =========================
  [phraseKey("obsluha", "обслуговування", "a2-37")]: {
    sk: "Obsluha byla velmi milá.",
    ua: "Обслуговування було дуже привітне.",
    ru: "Обслуживание было очень приятным.",
    tokens: ["Obsluha", "byla", "velmi", "milá", "."],
  },

  [phraseKey("číšník/číšnice", "офіціант/офіціантка", "a2-37")]: {
    sk: "Číšník nám hned přinesl menu.",
    ua: "Офіціант одразу приніс нам меню.",
    ru: "Официант сразу принёс нам меню.",
    tokens: ["Číšník", "nám", "hned", "přinesl", "menu", "."],
  },

  [phraseKey("doporučit", "порадити", "a2-37")]: {
    sk: "Můžete mi doporučit něco bez masa?",
    ua: "Можете порадити мені щось без м’яса?",
    ru: "Можете посоветовать мне что-то без мяса?",
    tokens: ["Můžete", "mi", "doporučit", "něco", "bez", "masa", "?"],
  },

  [phraseKey("předkrm", "закуска", "a2-37")]: {
    sk: "Jako předkrm si dám polévku.",
    ua: "Як закуску я візьму суп.",
    ru: "В качестве закуски я возьму суп.",
    tokens: ["Jako", "předkrm", "si", "dám", "polévku", "."],
  },

  [phraseKey("hlavní jídlo", "основна страва", "a2-37")]: {
    sk: "Hlavní jídlo bylo opravdu výborné.",
    ua: "Основна страва була справді чудовою.",
    ru: "Основное блюдо было действительно отличным.",
    tokens: ["Hlavní", "jídlo", "bylo", "opravdu", "výborné", "."],
  },

  [phraseKey("bez masa", "без мʼяса", "a2-37")]: {
    sk: "Máte něco dobrého bez masa?",
    ua: "У вас є щось смачне без м’яса?",
    ru: "У вас есть что-то вкусное без мяса?",
    tokens: ["Máte", "něco", "dobrého", "bez", "masa", "?"],
  },

  [phraseKey("bez lepku", "без глютену", "a2-37")]: {
    sk: "Potřebuji jídlo bez lepku.",
    ua: "Мені потрібна їжа без глютену.",
    ru: "Мне нужна еда без глютена.",
    tokens: ["Potřebuji", "jídlo", "bez", "lepku", "."],
  },

  [phraseKey("účtovat", "виставити рахунок", "a2-37")]: {
    sk: "Mohl byste nám účtovat, prosím?",
    ua: "Могли б ви принести нам рахунок, будь ласка?",
    ru: "Не могли бы вы принести нам счёт, пожалуйста?",
    tokens: ["Mohl", "byste", "nám", "účtovat", ",", "prosím", "?"],
  },

  [phraseKey("spropitné", "чайові", "a2-37")]: {
    sk: "Nechal jsem malé spropitné.",
    ua: "Я залишив невеликі чайові.",
    ru: "Я оставил небольшие чаевые.",
    tokens: ["Nechal", "jsem", "malé", "spropitné", "."],
  },

  [phraseKey("pochutnat si", "смачно поїсти", "a2-37")]: {
    sk: "Na té večeři jsme si opravdu pochutnali.",
    ua: "На тій вечері ми справді смачно поїли.",
    ru: "На том ужине мы действительно вкусно поели.",
    tokens: ["Na", "té", "večeři", "jsme", "si", "opravdu", "pochutnali", "."],
  },

  // =========================
  // LESSON A2-38 — Спілкування (телефон/листування)
  // =========================
  [phraseKey("zavolat", "подзвонити", "a2-38")]: {
    sk: "Zkusím ti zavolat večer.",
    ua: "Я спробую тобі подзвонити ввечері.",
    ru: "Я попробую тебе позвонить вечером.",
    tokens: ["Zkusím", "ti", "zavolat", "večer", "."],
  },

  [phraseKey("nedostupný", "недоступний", "a2-38")]: {
    sk: "Byl jsem celý den nedostupný.",
    ua: "Я був увесь день недоступний.",
    ru: "Я был весь день недоступен.",
    tokens: ["Byl", "jsem", "celý", "den", "nedostupný", "."],
  },

  [phraseKey("zanechat zprávu", "залишити повідомлення", "a2-38")]: {
    sk: "Můžete mi zanechat zprávu po zaznění tónu?",
    ua: "Можете залишити мені повідомлення після сигналу?",
    ru: "Можете оставить мне сообщение после сигнала?",
    tokens: ["Můžete", "mi", "zanechat", "zprávu", "po", "zaznění", "tónu", "?"],
  },

  [phraseKey("ozvat se", "відписати/дати знати", "a2-38")]: {
    sk: "Ozvu se ti hned zítra ráno.",
    ua: "Я дам тобі знати вже завтра зранку.",
    ru: "Я дам тебе знать уже завтра утром.",
    tokens: ["Ozvu", "se", "ti", "hned", "zítra", "ráno", "."],
  },

  [phraseKey("upřesnit", "уточнити", "a2-38")]: {
    sk: "Potřebuji ještě upřesnit čas schůzky.",
    ua: "Мені ще треба уточнити час зустрічі.",
    ru: "Мне ещё нужно уточнить время встречи.",
    tokens: ["Potřebuji", "ještě", "upřesnit", "čas", "schůzky", "."],
  },

  [phraseKey("potvrdit", "підтвердити", "a2-38")]: {
    sk: "Prosím potvrďte svou účast e-mailem.",
    ua: "Будь ласка, підтвердіть свою участь електронною поштою.",
    ru: "Пожалуйста, подтвердите своё участие по электронной почте.",
    tokens: ["Prosím", "potvrďte", "svou", "účast", "e-mailem", "."],
  },

  [phraseKey("dohodnout termín", "узгодити дату", "a2-38")]: {
    sk: "Musíme ještě dohodnout termín schůzky.",
    ua: "Нам ще треба узгодити дату зустрічі.",
    ru: "Нам ещё нужно согласовать дату встречи.",
    tokens: ["Musíme", "ještě", "dohodnout", "termín", "schůzky", "."],
  },

  [phraseKey("poslat e-mail", "надіслати email", "a2-38")]: {
    sk: "Můžete mi to poslat e-mailem?",
    ua: "Можете надіслати мені це електронною поштою?",
    ru: "Можете отправить мне это по электронной почте?",
    tokens: ["Můžete", "mi", "to", "poslat", "e-mailem", "?"],
  },

  [phraseKey("příloha", "вкладення", "a2-38")]: {
    sk: "V e-mailu chyběla příloha.",
    ua: "У електронному листі бракувало вкладення.",
    ru: "В электронном письме не хватало вложения.",
    tokens: ["V", "e-mailu", "chyběla", "příloha", "."],
  },

  [phraseKey("předmět zprávy", "тема повідомлення", "a2-38")]: {
    sk: "Nezapomeň napsat předmět zprávy.",
    ua: "Не забудь написати тему повідомлення.",
    ru: "Не забудь написать тему сообщения.",
    tokens: ["Nezapomeň", "napsat", "předmět", "zprávy", "."],
  },

  // =========================
  // LESSON A2-39 — Навчання мови (корисні слова)
  // =========================
  [phraseKey("slovní zásoba", "словниковий запас", "a2-39")]: {
    sk: "Moje slovní zásoba se postupně zlepšuje.",
    ua: "Мій словниковий запас поступово покращується.",
    ru: "Мой словарный запас постепенно улучшается.",
    tokens: ["Moje", "slovní", "zásoba", "se", "postupně", "zlepšuje", "."],
  },

  [phraseKey("výslovnost", "вимова", "a2-39")]: {
    sk: "Musím ještě procvičit výslovnost.",
    ua: "Мені ще треба попрактикувати вимову.",
    ru: "Мне ещё нужно потренировать произношение.",
    tokens: ["Musím", "ještě", "procvičit", "výslovnost", "."],
  },

  [phraseKey("gramatika", "граматика", "a2-39")]: {
    sk: "Česká gramatika není vždy jednoduchá.",
    ua: "Чеська граматика не завжди проста.",
    ru: "Чешская грамматика не всегда простая.",
    tokens: ["Česká", "gramatika", "není", "vždy", "jednoduchá", "."],
  },

  [phraseKey("překlad", "переклад", "a2-39")]: {
    sk: "Ten překlad není úplně přesný.",
    ua: "Той переклад не зовсім точний.",
    ru: "Этот перевод не совсем точный.",
    tokens: ["Ten", "překlad", "není", "úplně", "přesný", "."],
  },

  [phraseKey("význam", "значення", "a2-39")]: {
    sk: "Neznám význam toho slova.",
    ua: "Я не знаю значення того слова.",
    ru: "Я не знаю значения этого слова.",
    tokens: ["Neznám", "význam", "toho", "slova", "."],
  },

  [phraseKey("příklad", "приклад", "a2-39")]: {
    sk: "Učitel nám dal dobrý příklad.",
    ua: "Учитель дав нам хороший приклад.",
    ru: "Учитель дал нам хороший пример.",
    tokens: ["Učitel", "nám", "dal", "dobrý", "příklad", "."],
  },

  [phraseKey("cvičení", "вправа", "a2-39")]: {
    sk: "To cvičení bylo docela těžké.",
    ua: "Та вправа була досить важка.",
    ru: "Это упражнение было довольно трудным.",
    tokens: ["To", "cvičení", "bylo", "docela", "těžké", "."],
  },

  [phraseKey("udělat chybu", "зробити помилку", "a2-39")]: {
    sk: "Neboj se udělat chybu.",
    ua: "Не бійся зробити помилку.",
    ru: "Не бойся сделать ошибку.",
    tokens: ["Neboj", "se", "udělat", "chybu", "."],
  },

  [phraseKey("zopakovat", "повторити", "a2-39")]: {
    sk: "Můžete to prosím ještě jednou zopakovat?",
    ua: "Можете, будь ласка, ще раз це повторити?",
    ru: "Можете, пожалуйста, ещё раз это повторить?",
    tokens: ["Můžete", "to", "prosím", "ještě", "jednou", "zopakovat", "?"],
  },

  [phraseKey("zlepšit se", "покращитися", "a2-39")]: {
    sk: "Chci se v češtině rychle zlepšit.",
    ua: "Я хочу швидко покращитися в чеській.",
    ru: "Я хочу быстро улучшиться в чешском.",
    tokens: ["Chci", "se", "v", "češtině", "rychle", "zlepšit", "."],
  },

  // =========================
  // LESSON A2-40 — Повторення A2 (31–39)
  // =========================
  [phraseKey("kauce", "депозит", "a2-40")]: {
    sk: "Bez kauce ten byt nedostaneme.",
    ua: "Без депозиту ми не отримаємо цю квартиру.",
    ru: "Без депозита мы не получим эту квартиру.",
    tokens: ["Bez", "kauce", "ten", "byt", "nedostaneme", "."],
  },

  [phraseKey("spolehlivý", "надійний", "a2-40")]: {
    sk: "Potřebujeme spolehlivého člověka.",
    ua: "Нам потрібна надійна людина.",
    ru: "Нам нужен надёжный человек.",
    tokens: ["Potřebujeme", "spolehlivého", "člověka", "."],
  },

  [phraseKey("událost", "подія", "a2-40")]: {
    sk: "Byla to opravdu zajímavá událost.",
    ua: "Це була справді цікава подія.",
    ru: "Это было действительно интересное событие.",
    tokens: ["Byla", "to", "opravdu", "zajímavá", "událost", "."],
  },

  [phraseKey("diagnostika", "діагностика", "a2-40")]: {
    sk: "Diagnostika ukázala hlavní problém.",
    ua: "Діагностика показала головну проблему.",
    ru: "Диагностика показала главную проблему.",
    tokens: ["Diagnostika", "ukázala", "hlavní", "problém", "."],
  },

  [phraseKey("dodací lhůta", "термін доставки", "a2-40")]: {
    sk: "Dodací lhůta byla delší, než jsme čekali.",
    ua: "Термін доставки був довший, ніж ми очікували.",
    ru: "Срок доставки был дольше, чем мы ожидали.",
    tokens: ["Dodací", "lhůta", "byla", "delší", ",", "než", "jsme", "čekali", "."],
  },

  [phraseKey("odhlásit se", "виселитися", "a2-40")]: {
    sk: "Z hotelu se musíme odhlásit brzy ráno.",
    ua: "З готелю нам треба виселитися рано вранці.",
    ru: "Из отеля нам нужно выселиться рано утром.",
    tokens: ["Z", "hotelu", "se", "musíme", "odhlásit", "brzy", "ráno", "."],
  },

  [phraseKey("spropitné", "чайові", "a2-40")]: {
    sk: "Nechal jsem obsluze spropitné.",
    ua: "Я залишив чайові обслуговуванню.",
    ru: "Я оставил чаевые обслуживанию.",
    tokens: ["Nechal", "jsem", "obsluze", "spropitné", "."],
  },

  [phraseKey("příloha", "вкладення", "a2-40")]: {
    sk: "V příloze posílám potřebné dokumenty.",
    ua: "У вкладенні надсилаю потрібні документи.",
    ru: "Во вложении отправляю нужные документы.",
    tokens: ["V", "příloze", "posílám", "potřebné", "dokumenty", "."],
  },

  [phraseKey("slovní zásoba", "словниковий запас", "a2-40")]: {
    sk: "Moje slovní zásoba je teď širší.",
    ua: "Мій словниковий запас тепер ширший.",
    ru: "Мой словарный запас теперь шире.",
    tokens: ["Moje", "slovní", "zásoba", "je", "teď", "širší", "."],
  },

  [phraseKey("upřesnit", "уточнити", "a2-40")]: {
    sk: "Musíme ještě upřesnit několik detailů.",
    ua: "Нам ще треба уточнити кілька деталей.",
    ru: "Нам ещё нужно уточнить несколько деталей.",
    tokens: ["Musíme", "ještě", "upřesnit", "několik", "detailů", "."],
  },
};
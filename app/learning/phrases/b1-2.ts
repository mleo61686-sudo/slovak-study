// app/learning/phrases/b1-2.ts
import type { Phrase } from "./b1";
import { phraseKey } from "./phraseKey";

export const B1_PHRASES_2: Record<string, Phrase> = {
  // =========================
  // LESSON 11 — Príroda a počasie
  // =========================
  [phraseKey("sucho", "посуха", "b1-11")]: {
    sk: "Tento rok je veľké sucho a úroda je slabšia.",
    ua: "Цього року сильна посуха, і врожай гірший.",
    ru: "В этом году сильная засуха, и урожай хуже.",
    tokens: ["Tento", "rok", "je", "veľké", "sucho", "a", "úroda", "je", "slabšia", "."],
  },

  [phraseKey("povodeň", "повінь", "b1-11")]: {
    sk: "Po silných dažďoch prišla povodeň a rieka vystúpila z brehov.",
    ua: "Після сильних дощів прийшла повінь, і річка вийшла з берегів.",
    ru: "После сильных дождей пришло наводнение, и река вышла из берегов.",
    tokens: ["Po", "silných", "dažďoch", "prišla", "povodeň", "a", "rieka", "vystúpila", "z", "brehov", "."],
  },

  [phraseKey("klíma", "клімат", "b1-11")]: {
    sk: "Klíma sa mení, preto sú extrémy častejšie.",
    ua: "Клімат змінюється, тому екстремальні явища трапляються частіше.",
    ru: "Климат меняется, поэтому экстремальные явления случаются чаще.",
    tokens: ["Klíma", "sa", "mení", ",", "preto", "sú", "extrémy", "častejšie", "."],
  },

  [phraseKey("oblačnosť", "хмарність", "b1-11")]: {
    sk: "Oblačnosť bude popoludní vysoká, ale pršať nemusí.",
    ua: "Удень хмарність буде високою, але дощу може не бути.",
    ru: "Днём облачность будет высокой, но дождя может не быть.",
    tokens: ["Oblačnosť", "bude", "popoludní", "vysoká", ",", "ale", "pršať", "nemusí", "."],
  },

  [phraseKey("lavína", "лавина", "b1-11")]: {
    sk: "V horách hrozí lavína, preto nejdeme mimo trasy.",
    ua: "У горах є загроза лавини, тому ми не йдемо поза маршрутом.",
    ru: "В горах есть угроза лавины, поэтому мы не идём вне маршрута.",
    tokens: ["V", "horách", "hrozí", "lavína", ",", "preto", "nejdeme", "mimo", "trasy", "."],
  },

  [phraseKey("zemetrasenie", "землетрус", "b1-11")]: {
    sk: "Zemetrasenie bolo krátke, ale ľudia ho cítili.",
    ua: "Землетрус був короткий, але люди його відчули.",
    ru: "Землетрясение было коротким, но люди его почувствовали.",
    tokens: ["Zemetrasenie", "bolo", "krátke", ",", "ale", "ľudia", "ho", "cítili", "."],
  },

  [phraseKey("vlhkosť", "вологість", "b1-11")]: {
    sk: "Vlhkosť je dnes vysoká, preto sa mi zle dýcha.",
    ua: "Вологість сьогодні висока, тому мені важко дихається.",
    ru: "Влажность сегодня высокая, поэтому мне тяжело дышится.",
    tokens: ["Vlhkosť", "je", "dnes", "vysoká", ",", "preto", "sa", "mi", "zle", "dýcha", "."],
  },

  [phraseKey("topenie", "танення", "b1-11")]: {
    sk: "Topenie snehu môže spôsobiť zvýšenú hladinu vody.",
    ua: "Танення снігу може спричинити підвищення рівня води.",
    ru: "Таяние снега может вызвать повышение уровня воды.",
    tokens: ["Topenie", "snehu", "môže", "spôsobiť", "zvýšenú", "hladinu", "vody", "."],
  },

  [phraseKey("záplava", "затоплення", "b1-11")]: {
    sk: "Po búrke sme mali v pivnici záplavu.",
    ua: "Після бурі в нас у підвалі було затоплення.",
    ru: "После бури у нас в подвале было затопление.",
    tokens: ["Po", "búrke", "sme", "mali", "v", "pivnici", "záplavu", "."],
  },

  [phraseKey("prírodná katastrofa", "природна катастрофа", "b1-11")]: {
    sk: "Prírodná katastrofa môže zmeniť život celej oblasti.",
    ua: "Природна катастрофа може змінити життя цілого регіону.",
    ru: "Природная катастрофа может изменить жизнь целого региона.",
    tokens: ["Prírodná", "katastrofa", "môže", "zmeniť", "život", "celej", "oblasti", "."],
  },

  // =========================
  // LESSON 12 — V meste: administratíva
  // =========================
  [phraseKey("prechodný pobyt", "тимчасове проживання", "b1-12")]: {
    sk: "Prechodný pobyt som si vybavil na cudzineckej polícii.",
    ua: "Тимчасове проживання я оформив у міграційній поліції.",
    ru: "Временное проживание я оформил в миграционной полиции.",
    tokens: ["Prechodný", "pobyt", "som", "si", "vybavil", "na", "cudzineckej", "polícii", "."],
  },

  [phraseKey("vyhlásenie", "заява / декларація", "b1-12")]: {
    sk: "Musím podpísať vyhlásenie, že údaje sú pravdivé.",
    ua: "Мені треба підписати заяву, що дані правдиві.",
    ru: "Мне нужно подписать заявление, что данные верны.",
    tokens: ["Musím", "podpísať", "vyhlásenie", ",", "že", "údaje", "sú", "pravdivé", "."],
  },

  [phraseKey("overenie totožnosti", "перевірка особи", "b1-12")]: {
    sk: "Overenie totožnosti prebehlo rýchlo, stačil pas.",
    ua: "Перевірка особи пройшла швидко, вистачило паспорта.",
    ru: "Проверка личности прошла быстро, хватило паспорта.",
    tokens: ["Overenie", "totožnosti", "prebehlo", "rýchlo", ",", "stačil", "pas", "."],
  },

  [phraseKey("zákonný", "законний", "b1-12")]: {
    sk: "Chcem mať všetko zákonné, aby som nemal problémy.",
    ua: "Я хочу, щоб усе було законно, щоб не мати проблем.",
    ru: "Я хочу, чтобы всё было законно, чтобы не иметь проблем.",
    tokens: ["Chcem", "mať", "všetko", "zákonné", ",", "aby", "som", "nemal", "problémy", "."],
  },

  [phraseKey("občianstvo", "громадянство", "b1-12")]: {
    sk: "O občianstvo môžeš požiadať až po splnení podmienok.",
    ua: "На громадянство можна подати заявку лише після виконання умов.",
    ru: "На гражданство можно подать заявку только после выполнения условий.",
    tokens: ["O", "občianstvo", "môžeš", "požiadať", "až", "po", "splnení", "podmienok", "."],
  },

  [phraseKey("povinnosť", "обов’язок", "b1-12")]: {
    sk: "Je moja povinnosť nahlásiť zmenu adresy do tridsiatich dní.",
    ua: "Мій обов’язок — повідомити про зміну адреси протягом тридцяти днів.",
    ru: "Моя обязанность — сообщить об изменении адреса в течение тридцати дней.",
    tokens: ["Je", "moja", "povinnosť", "nahlásiť", "zmenu", "adresy", "do", "tridsiatich", "dní", "."],
  },

  [phraseKey("oprávnenie", "право / повноваження", "b1-12")]: {
    sk: "Úradník má oprávnenie overiť tvoje doklady.",
    ua: "Працівник установи має право перевірити твої документи.",
    ru: "Сотрудник учреждения имеет право проверить твои документы.",
    tokens: ["Úradník", "má", "oprávnenie", "overiť", "tvoje", "doklady", "."],
  },

  [phraseKey("zápis", "запис / внесення до реєстру", "b1-12")]: {
    sk: "Zápis do registra trvá zvyčajne niekoľko dní.",
    ua: "Внесення до реєстру зазвичай триває кілька днів.",
    ru: "Внесение в реестр обычно занимает несколько дней.",
    tokens: ["Zápis", "do", "registra", "trvá", "zvyčajne", "niekoľko", "dní", "."],
  },

  [phraseKey("odvolanie", "апеляція / оскарження", "b1-12")]: {
    sk: "Ak nesúhlasíš s rozhodnutím, môžeš podať odvolanie.",
    ua: "Якщо не згоден з рішенням, можеш подати оскарження.",
    ru: "Если не согласен с решением, можешь подать обжалование.",
    tokens: ["Ak", "nesúhlasíš", "s", "rozhodnutím", ",", "môžeš", "podať", "odvolanie", "."],
  },

  [phraseKey("úradný dokument", "офіційний документ", "b1-12")]: {
    sk: "Úradný dokument musí byť podpísaný a opečiatkovaný.",
    ua: "Офіційний документ має бути підписаний і з печаткою.",
    ru: "Официальный документ должен быть подписан и с печатью.",
    tokens: ["Úradný", "dokument", "musí", "byť", "podpísaný", "a", "opečiatkovaný", "."],
  },

  // =========================
  // LESSON 13 — Služby a zákazník
  // =========================
  [phraseKey("ochota", "готовність допомогти", "b1-13")]: {
    sk: "Oceňujem vašu ochotu pomôcť, veľmi mi to uľahčilo situáciu.",
    ua: "Ціную вашу готовність допомогти — це дуже полегшило ситуацію.",
    ru: "Ценю вашу готовность помочь — это очень облегчило ситуацию.",
    tokens: ["Oceňujem", "vašu", "ochotu", "pomôcť", ",", "veľmi", "mi", "to", "uľahčilo", "situáciu", "."],
  },

  [phraseKey("zákazník", "клієнт", "b1-13")]: {
    sk: "Zákazník má právo na jasné informácie o službe.",
    ua: "Клієнт має право на чітку інформацію про послугу.",
    ru: "Клиент имеет право на четкую информацию об услуге.",
    tokens: ["Zákazník", "má", "právo", "na", "jasné", "informácie", "o", "službe", "."],
  },

  [phraseKey("poskytovať služby", "надавати послуги", "b1-13")]: {
    sk: "Snažíme sa poskytovať služby na vysokej úrovni.",
    ua: "Ми намагаємося надавати послуги на високому рівні.",
    ru: "Мы стараемся предоставлять услуги на высоком уровне.",
    tokens: ["Snažíme", "sa", "poskytovať", "služby", "na", "vysokej", "úrovni", "."],
  },

  [phraseKey("vybavenie požiadavky", "обробка запиту", "b1-13")]: {
    sk: "Vybavenie požiadavky môže trvať dva až tri pracovné dni.",
    ua: "Обробка запиту може тривати два–три робочі дні.",
    ru: "Обработка запроса может занять два–три рабочих дня.",
    tokens: ["Vybavenie", "požiadavky", "môže", "trvať", "dva", "až", "tri", "pracovné", "dni", "."],
  },

  [phraseKey("spokojnosť", "задоволеність", "b1-13")]: {
    sk: "Spokojnosť zákazníkov je pre nás najdôležitejšia.",
    ua: "Задоволеність клієнтів для нас найважливіша.",
    ru: "Удовлетворенность клиентов для нас важнее всего.",
    tokens: ["Spokojnosť", "zákazníkov", "je", "pre", "nás", "najdôležitejšia", "."],
  },

  [phraseKey("nespokojný", "незадоволений", "b1-13")]: {
    sk: "Bol nespokojný, pretože odpoveď prišla príliš neskoro.",
    ua: "Він був незадоволений, бо відповідь прийшла занадто пізно.",
    ru: "Он был недоволен, потому что ответ пришел слишком поздно.",
    tokens: ["Bol", "nespokojný", ",", "pretože", "odpoveď", "prišla", "príliš", "neskoro", "."],
  },

  [phraseKey("zodpovedať za", "нести відповідальність за", "b1-13")]: {
    sk: "Každý z nás zodpovedá za svoju časť práce.",
    ua: "Кожен із нас несе відповідальність за свою частину роботи.",
    ru: "Каждый из нас несет ответственность за свою часть работы.",
    tokens: ["Každý", "z", "nás", "zodpovedá", "za", "svoju", "časť", "práce", "."],
  },

  [phraseKey("vyhovieť", "задовольнити (вимогу)", "b1-13")]: {
    sk: "Pokúsime sa vám vyhovieť, ak to bude možné.",
    ua: "Ми спробуємо задовольнити вашу вимогу, якщо це буде можливо.",
    ru: "Мы постараемся удовлетворить ваше требование, если это будет возможно.",
    tokens: ["Pokúsime", "sa", "vám", "vyhovieť", ",", "ak", "to", "bude", "možné", "."],
  },

  [phraseKey("podpora zákazníkov", "служба підтримки клієнтів", "b1-13")]: {
    sk: "Podpora zákazníkov je dostupná aj cez chat.",
    ua: "Служба підтримки клієнтів доступна також через чат.",
    ru: "Служба поддержки клиентов доступна также через чат.",
    tokens: ["Podpora", "zákazníkov", "je", "dostupná", "aj", "cez", "chat", "."],
  },

  [phraseKey("požiadavka", "вимога / запит", "b1-13")]: {
    sk: "Pošlite nám požiadavku e-mailom, prosím.",
    ua: "Надішліть нам запит електронною поштою, будь ласка.",
    ru: "Отправьте нам запрос по электронной почте, пожалуйста.",
    tokens: ["Pošlite", "nám", "požiadavku", "e-mailom", ",", "prosím", "."],
  },

  // =========================
  // LESSON 14 — Strava a návyky
  // =========================
  [phraseKey("stravovanie", "харчування", "b1-14")]: {
    sk: "Moje stravovanie sa zlepšilo, odkedy jem pravidelnejšie.",
    ua: "Моє харчування покращилося, відколи я їм регулярніше.",
    ru: "Моё питание улучшилось, с тех пор как я ем регулярнее.",
    tokens: ["Moje", "stravovanie", "sa", "zlepšilo", ",", "odkedy", "jem", "pravidelnejšie", "."],
  },

  [phraseKey("zloženie", "склад", "b1-14")]: {
    sk: "Vždy si čítam zloženie, najmä pri hotových jedlách.",
    ua: "Я завжди читаю склад, особливо в готових стравах.",
    ru: "Я всегда читаю состав, особенно у готовых блюд.",
    tokens: ["Vždy", "si", "čítam", "zloženie", ",", "najmä", "pri", "hotových", "jedlách", "."],
  },

  [phraseKey("porcia", "порція", "b1-14")]: {
    sk: "Táto porcia je na mňa príliš veľká.",
    ua: "Ця порція для мене занадто велика.",
    ru: "Эта порция для меня слишком большая.",
    tokens: ["Táto", "porcia", "je", "na", "mňa", "príliš", "veľká", "."],
  },

  [phraseKey("intolerancia", "непереносимість", "b1-14")]: {
    sk: "Mám intoleranciu na laktózu, preto sa vyhýbam mlieku.",
    ua: "У мене непереносимість лактози, тому уникаю молока.",
    ru: "У меня непереносимость лактозы, поэтому я избегаю молока.",
    tokens: ["Mám", "intoleranciu", "na", "laktózu", ",", "preto", "sa", "vyhýbam", "mlieku", "."],
  },

  [phraseKey("návyk", "звичка", "b1-14")]: {
    sk: "Je ťažké zmeniť návyk, ale dá sa to.",
    ua: "Важко змінити звичку, але це можливо.",
    ru: "Трудно изменить привычку, но это возможно.",
    tokens: ["Je", "ťažké", "zmeniť", "návyk", ",", "ale", "dá", "sa", "to", "."],
  },

  [phraseKey("obmedziť", "обмежити", "b1-14")]: {
    sk: "Chcem obmedziť sladké, lebo sa necítim dobre.",
    ua: "Хочу обмежити солодке, бо почуваюся не дуже добре.",
    ru: "Хочу ограничить сладкое, потому что чувствую себя не очень хорошо.",
    tokens: ["Chcem", "obmedziť", "sladké", ",", "lebo", "sa", "necítim", "dobre", "."],
  },

  [phraseKey("vyvážená strava", "збалансоване харчування", "b1-14")]: {
    sk: "Vyvážená strava by mala obsahovať aj bielkoviny, aj zeleninu.",
    ua: "Збалансоване харчування має містити і білки, і овочі.",
    ru: "Сбалансированное питание должно включать и белки, и овощи.",
    tokens: ["Vyvážená", "strava", "by", "mala", "obsahovať", "aj", "bielkoviny", ",", "aj", "zeleninu", "."],
  },

  [phraseKey("výživový doplnok", "харчова добавка", "b1-14")]: {
    sk: "Výživový doplnok beriem len po konzultácii s lekárom.",
    ua: "Харчову добавку приймаю лише після консультації з лікарем.",
    ru: "Пищевую добавку принимаю только после консультации с врачом.",
    tokens: ["Výživový", "doplnok", "beriem", "len", "po", "konzultácii", "s", "lekárom", "."],
  },

  [phraseKey("pravidelnosť", "регулярність", "b1-14")]: {
    sk: "Pravidelnosť je dôležitá, či už pri jedle alebo pri spánku.",
    ua: "Регулярність важлива — і в їжі, і в сні.",
    ru: "Регулярность важна — и в еде, и во сне.",
    tokens: ["Pravidelnosť", "je", "dôležitá", ",", "či", "už", "pri", "jedle", "alebo", "pri", "spánku", "."],
  },

  [phraseKey("zdravý životný štýl", "здоровий спосіб життя", "b1-14")]: {
    sk: "Zdravý životný štýl nie je o diétach, ale o rovnováhe.",
    ua: "Здоровий спосіб життя — не про дієти, а про баланс.",
    ru: "Здоровый образ жизни — не про диеты, а про баланс.",
    tokens: ["Zdravý", "životný", "štýl", "nie", "je", "o", "diétach", ",", "ale", "o", "rovnováhe", "."],
  },

  // =========================
  // LESSON 15 — Šport a forma
  // =========================
  [phraseKey("výdrž", "витривалість", "b1-15")]: {
    sk: "Na dlhý beh potrebujem lepšiu výdrž.",
    ua: "Для довгого бігу мені потрібна краща витривалість.",
    ru: "Для долгого бега мне нужна лучшая выносливость.",
    tokens: ["Na", "dlhý", "beh", "potrebujem", "lepšiu", "výdrž", "."],
  },

  [phraseKey("sval", "м’яз", "b1-15")]: {
    sk: "Po tréningu ma bolí každý sval.",
    ua: "Після тренування болить кожен м’яз.",
    ru: "После тренировки болит каждая мышца.",
    tokens: ["Po", "tréningu", "ma", "bolí", "každý", "sval", "."],
  },

  [phraseKey("rozohriatie", "розігрів", "b1-15")]: {
    sk: "Pred cvičením je rozohriatie veľmi dôležité.",
    ua: "Перед вправами розігрів дуже важливий.",
    ru: "Перед упражнениями разминка очень важна.",
    tokens: ["Pred", "cvičením", "je", "rozohriatie", "veľmi", "dôležité", "."],
  },

  [phraseKey("strečing", "розтяжка", "b1-15")]: {
    sk: "Po tréningu si dám krátky strečing.",
    ua: "Після тренування зроблю коротку розтяжку.",
    ru: "После тренировки сделаю короткую растяжку.",
    tokens: ["Po", "tréningu", "si", "dám", "krátky", "strečing", "."],
  },

  [phraseKey("životospráva", "здоровий спосіб життя", "b1-15")]: {
    sk: "Dobrá životospráva sa prejaví aj na nálade.",
    ua: "Хороший спосіб життя впливає навіть на настрій.",
    ru: "Хороший образ жизни влияет даже на настроение.",
    tokens: ["Dobrá", "životospráva", "sa", "prejaví", "aj", "na", "nálade", "."],
  },

  [phraseKey("kondícia", "фізична форма", "b1-15")]: {
    sk: "Moja kondícia je lepšia než minulý mesiac.",
    ua: "Моя фізична форма краща, ніж минулого місяця.",
    ru: "Моя физическая форма лучше, чем в прошлом месяце.",
    tokens: ["Moja", "kondícia", "je", "lepšia", "než", "minulý", "mesiac", "."],
  },

  [phraseKey("výkon", "резultat / продуктивність", "b1-15")]: {
    sk: "Môj výkon závisí aj od spánku a regenerácie.",
    ua: "Мій результат/продуктивність залежить також від сну та відновлення.",
    ru: "Мой результат/продуктивность зависит также от сна и восстановления.",
    tokens: ["Môj", "výkon", "závisí", "aj", "od", "spánku", "a", "regenerácie", "."],
  },

  [phraseKey("zlepšiť výkon", "покращити результат", "b1-15")]: {
    sk: "Ak chcem zlepšiť výkon, musím trénovať pravidelne.",
    ua: "Якщо хочу покращити результат, маю тренуватися регулярно.",
    ru: "Если хочу улучшить результат, должен тренироваться регулярно.",
    tokens: ["Ak", "chcem", "zlepšiť", "výkon", ",", "musím", "trénovať", "pravidelne", "."],
  },

  [phraseKey("preťaženie", "перевантаження", "b1-15")]: {
    sk: "Preťaženie môže viesť k zraneniu, preto si dávam pozor.",
    ua: "Перевантаження може призвести до травми, тому я обережний.",
    ru: "Перегрузка может привести к травме, поэтому я осторожен.",
    tokens: ["Preťaženie", "môže", "viesť", "k", "zraneniu", ",", "preto", "si", "dávam", "pozor", "."],
  },

  [phraseKey("oddych", "відпочинок", "b1-15")]: {
    sk: "Odpočinok je súčasť tréningu, nie strata času.",
    ua: "Відпочинок — частина тренування, а не втрата часу.",
    ru: "Отдых — часть тренировки, а не потеря времени.",
    tokens: ["Odpočinok", "je", "súčasť", "tréningu", ",", "nie", "strata", "času", "."],
  },

  // =========================
  // LESSON 16 — Kultúra a voľný čas
  // =========================
  [phraseKey("vkus", "смак (уподobання)", "b1-16")]: {
    sk: "Máme iný vkus, ale vieme sa dohodnúť.",
    ua: "У нас різні смаки, але ми можемо домовитися.",
    ru: "У нас разные вкусы, но мы можем договориться.",
    tokens: ["Máme", "iný", "vkus", ",", "ale", "vieme", "sa", "dohodnúť", "."],
  },

  [phraseKey("recenzia", "рецензія", "b1-16")]: {
    sk: "Prečítal som recenziu a potom som sa rozhodol ísť do kina.",
    ua: "Я прочитав рецензію, а потім вирішив піти в кіно.",
    ru: "Я прочитал рецензию, а потом решил пойти в кино.",
    tokens: ["Prečítal", "som", "recenziu", "a", "potom", "som", "sa", "rozhodol", "ísť", "do", "kina", "."],
  },

  [phraseKey("zážitok", "враження", "b1-16")]: {
    sk: "Bol to silný zážitok, na ktorý nezabudnem.",
    ua: "Це було сильне враження, яке я не забуду.",
    ru: "Это было сильное впечатление, которое я не забуду.",
    tokens: ["Bol", "to", "silný", "zážitok", ",", "na", "ktorý", "nezabudnem", "."],
  },

  [phraseKey("vystúpenie", "виступ", "b1-16")]: {
    sk: "Vystúpenie bolo krátke, ale veľmi pôsobivé.",
    ua: "Виступ був короткий, але дуже вражаючий.",
    ru: "Выступление было коротким, но очень впечатляющим.",
    tokens: ["Vystúpenie", "bolo", "krátke", ",", "ale", "veľmi", "pôsobivé", "."],
  },

  [phraseKey("voľný čas", "вільний час", "b1-16")]: {
    sk: "Voľný čas trávim najradšej s rodinou alebo v prírode.",
    ua: "Вільний час я найохочіше проводжу з родиною або на природі.",
    ru: "Свободное время я охотнее всего провожу с семьёй или на природе.",
    tokens: ["Voľný", "čas", "trávim", "najradšej", "s", "rodinou", "alebo", "v", "prírode", "."],
  },

  [phraseKey("účinkovať", "виступати (брати участь)", "b1-16")]: {
    sk: "V programe budú účinkovať aj známi herci.",
    ua: "У програмі виступатимуть також відомі актори.",
    ru: "В программе будут выступать и известные актёры.",
    tokens: ["V", "programe", "budú", "účinkovať", "aj", "známi", "herci", "."],
  },

  [phraseKey("navštíviť", "відвідати", "b1-16")]: {
    sk: "Chcem navštíviť výstavu, kým ešte trvá.",
    ua: "Хочу відвідати виставку, поки вона ще триває.",
    ru: "Хочу посетить выставку, пока она ещё идёт.",
    tokens: ["Chcem", "navštíviť", "výstavu", ",", "kým", "ešte", "trvá", "."],
  },

  [phraseKey("premiéra", "прем’єра", "b1-16")]: {
    sk: "Premiéra filmu bude budúci týždeň.",
    ua: "Прем’єра фільму буде наступного тижня.",
    ru: "Премьера фильма будет на следующей неделе.",
    tokens: ["Premiéra", "filmu", "bude", "budúci", "týždeň", "."],
  },

  [phraseKey("program podujatia", "програма заходу", "b1-16")]: {
    sk: "Program podujatia nájdeš na webovej stránke organizátora.",
    ua: "Програму заходу знайдеш на сайті організатора.",
    ru: "Программу мероприятия найдёшь на сайте организатора.",
    tokens: ["Program", "podujatia", "nájdeš", "na", "webovej", "stránke", "organizátora", "."],
  },

  [phraseKey("rezervácia miesta", "бронювання місця", "b1-16")]: {
    sk: "Rezervácia miesta je nutná, lebo kapacita je obmedzená.",
    ua: "Бронювання місця обов’язкове, бо кількість місць обмежена.",
    ru: "Бронирование места обязательно, потому что количество мест ограничено.",
    tokens: ["Rezervácia", "miesta", "je", "nutná", ",", "lebo", "kapacita", "je", "obmedzená", "."],
  },

  // =========================
  // LESSON 17 — Šport
  // =========================
  [phraseKey("tréning", "тренування", "b1-17")]: {
    sk: "Dnes večer mám tréning, tak prídem domov neskôr.",
    ua: "Сьогодні ввечері в мене тренування, тож прийду додому пізніше.",
    ru: "Сегодня вечером у меня тренировка, поэтому приду домой позже.",
    tokens: ["Dnes", "večer", "mám", "tréning", ",", "tak", "prídem", "domov", "neskôr", "."],
  },

  [phraseKey("zápas", "матч", "b1-17")]: {
    sk: "Zápas sa začne o siedmej a očakávame veľa divákov.",
    ua: "Матч почнеться о сьомій, і ми очікуємо багато глядачів.",
    ru: "Матч начнётся в семь, и мы ожидаем много зрителей.",
    tokens: ["Zápas", "sa", "začne", "o", "siedmej", "a", "očakávame", "veľa", "divákov", "."],
  },

  [phraseKey("výhra", "перемога", "b1-17")]: {
    sk: "Výhra nám dodala sebavedomie do ďalších zápasov.",
    ua: "Перемога додала нам впевненості для наступних матчів.",
    ru: "Победа добавила нам уверенности для следующих матчей.",
    tokens: ["Výhra", "nám", "dodala", "sebavedomie", "do", "ďalších", "zápasov", "."],
  },

  [phraseKey("prehra", "поразка", "b1-17")]: {
    sk: "Prehra bola nepríjemná, ale poučili sme sa z nej.",
    ua: "Поразка була неприємною, але ми зробили з неї висновки.",
    ru: "Поражение было неприятным, но мы сделали выводы.",
    tokens: ["Prehra", "bola", "nepríjemná", ",", "ale", "poučili", "sme", "sa", "z", "nej", "."],
  },

  [phraseKey("rozhodca", "суддя", "b1-17")]: {
    sk: "Rozhodca ukončil zápas o pár minút skôr.",
    ua: "Суддя завершив матч на кілька хвилин раніше.",
    ru: "Судья завершил матч на несколько минут раньше.",
    tokens: ["Rozhodca", "ukončil", "zápas", "o", "pár", "minút", "skôr", "."],
  },

  [phraseKey("súťaž", "змагання", "b1-17")]: {
    sk: "Na súťaž sa pripravujeme už niekoľko týždňov.",
    ua: "До змагання ми готуємося вже кілька тижнів.",
    ru: "К соревнованию мы готовимся уже несколько недель.",
    tokens: ["Na", "súťaž", "sa", "pripravujeme", "už", "niekoľko", "týždňov", "."],
  },

  [phraseKey("divák", "глядач", "b1-17")]: {
    sk: "Divákov bolo toľko, že sme nemali kde zaparkovať.",
    ua: "Глядачів було стільки, що нам не було де припаркуватися.",
    ru: "Зрителей было так много, что нам негде было припарковаться.",
    tokens: ["Divákov", "bolo", "toľko", ",", "že", "sme", "nemali", "kde", "zaparkovať", "."],
  },

  [phraseKey("tím", "команда", "b1-17")]: {
    sk: "Tím funguje lepšie, keď si navzájom veríme.",
    ua: "Команда працює краще, коли ми довіряємо одне одному.",
    ru: "Команда работает лучше, когда мы доверяем друг другу.",
    tokens: ["Tím", "funguje", "lepšie", ",", "keď", "si", "navzájom", "veríme", "."],
  },

  [phraseKey("výkon", "результат / виступ", "b1-17")]: {
    sk: "Jeho výkon bol výborný, aj keď mal menšie zranenie.",
    ua: "Його виступ був чудовим, хоча він мав невелику травму.",
    ru: "Его выступление было отличным, хотя у него была небольшая травма.",
    tokens: ["Jeho", "výkon", "bol", "výborný", ",", "aj", "keď", "mal", "menšie", "zranenie", "."],
  },

  [phraseKey("zranenie", "травма", "b1-17")]: {
    sk: "Kvôli zraneniu musel na chvíľu prerušiť tréning.",
    ua: "Через травму він мусив на деякий час перервати тренування.",
    ru: "Из-за травмы ему пришлось на время прервать тренировку.",
    tokens: ["Kvôli", "zraneniu", "musel", "na", "chvíľu", "prerušiť", "tréning", "."],
  },

  // =========================
  // LESSON 18 — Geografia
  // =========================
  [phraseKey("kontinent", "континент", "b1-18")]: {
    sk: "Európa je kontinent s bohatou históriou.",
    ua: "Європа — континент із багатою історією.",
    ru: "Европа — континент с богатой историей.",
    tokens: ["Európa", "je", "kontinent", "s", "bohatou", "históriou", "."],
  },

  [phraseKey("hranica", "кордон", "b1-18")]: {
    sk: "Na hranici môžu skontrolovať doklady.",
    ua: "На кордоні можуть перевірити документи.",
    ru: "На границе могут проверить документы.",
    tokens: ["Na", "hranici", "môžu", "skontrolovať", "doklady", "."],
  },

  [phraseKey("obyvateľstvo", "населення", "b1-18")]: {
    sk: "Obyvateľstvo mesta sa v posledných rokoch zvýšilo.",
    ua: "Населення міста останніми роками збільшилося.",
    ru: "Население города в последние годы увеличилось.",
    tokens: ["Obyvateľstvo", "mesta", "sa", "v", "posledných", "rokoch", "zvýšilo", "."],
  },

  [phraseKey("podnebie", "клімат", "b1-18")]: {
    sk: "Podnebie pri mori je miernejšie než vo vnútrozemí.",
    ua: "Клімат біля моря м’якший, ніж у внутрішніх районах.",
    ru: "Климат у моря мягче, чем во внутренних районах.",
    tokens: ["Podnebie", "pri", "mori", "je", "miernejšie", "než", "vo", "vnútrozemí", "."],
  },

  [phraseKey("hlavné mesto", "столиця", "b1-18")]: {
    sk: "Hlavné mesto Slovenska je Bratislava.",
    ua: "Столиця Словаччини — Братислава.",
    ru: "Столица Словакии — Братислава.",
    tokens: ["Hlavné", "mesto", "Slovenska", "je", "Bratislava", "."],
  },

  [phraseKey("povrch", "поверхня", "b1-18")]: {
    sk: "Povrch tejto oblasti je prevažne hornatý.",
    ua: "Поверхня цієї місцевості переважно гориста.",
    ru: "Поверхность этой местности преимущественно гористая.",
    tokens: ["Povrch", "tejto", "oblasti", "je", "prevažne", "hornatý", "."],
  },

  [phraseKey("pobrežie", "узбережжя", "b1-18")]: {
    sk: "Na pobreží býva v lete viac turistov.",
    ua: "На узбережжі влітку більше туристів.",
    ru: "На побережье летом больше туристов.",
    tokens: ["Na", "pobreží", "býva", "v", "lete", "viac", "turistov", "."],
  },

  [phraseKey("ostrov", "острів", "b1-18")]: {
    sk: "Na ostrov sa dá dostať len loďou alebo lietadlom.",
    ua: "На острів можна дістатися лише кораблем або літаком.",
    ru: "На остров можно добраться только на корабле или самолёте.",
    tokens: ["Na", "ostrov", "sa", "dá", "dostať", "len", "loďou", "alebo", "lietadlom", "."],
  },

  [phraseKey("vnútrozemie", "внутрішня територія", "b1-18")]: {
    sk: "Vo vnútrozemí je často väčší rozdiel teplôt.",
    ua: "У внутрішніх районах часто більша різниця температур.",
    ru: "Во внутренних районах часто больше разница температур.",
    tokens: ["Vo", "vnútrozemí", "je", "často", "väčší", "rozdiel", "teplôt", "."],
  },

  [phraseKey("zemepis", "географія", "b1-18")]: {
    sk: "Zemepis ma baví, lebo sa dozviem veľa o krajinách.",
    ua: "Мені подобається географія, бо я дізнаюся багато про країни.",
    ru: "Мне нравится география, потому что я узнаю много о странах.",
    tokens: ["Zemepis", "ma", "baví", ",", "lebo", "sa", "dozviem", "veľa", "o", "krajinách", "."],
  },

  // =========================
  // LESSON 19 — Matematika
  // =========================
  [phraseKey("rovnica", "рівняння", "b1-19")]: {
    sk: "V tejto úlohe musíme vyriešiť rovnicu.",
    ua: "У цьому завданні ми маємо розв’язати рівняння.",
    ru: "В этой задаче мы должны решить уравнение.",
    tokens: ["V", "tejto", "úlohe", "musíme", "vyriešiť", "rovnicu", "."],
  },

  [phraseKey("výsledok", "результат", "b1-19")]: {
    sk: "Výsledok mi vyšiel iný, tak som to prepočítal ešte raz.",
    ua: "У мене вийшов інший результат, тож я перерахував ще раз.",
    ru: "У меня получился другой результат, поэтому я пересчитал ещё раз.",
    tokens: ["Výsledok", "mi", "vyšiel", "iný", ",", "tak", "som", "to", "prepočítal", "ešte", "raz", "."],
  },

  [phraseKey("násobiť", "множити", "b1-19")]: {
    sk: "Najprv budeme násobiť a potom sčítať.",
    ua: "Спочатку будемо множити, а потім додавати.",
    ru: "Сначала будем умножать, а потом складывать.",
    tokens: ["Najprv", "budeme", "násobiť", "a", "potom", "sčítať", "."],
  },

  [phraseKey("deliť", "ділити", "b1-19")]: {
    sk: "Ak chceš deliť zlomky, musíš dodržať postup.",
    ua: "Якщо хочеш ділити дроби, треба дотримуватися алгоритму.",
    ru: "Если хочешь делить дроби, нужно соблюдать алгоритм.",
    tokens: ["Ak", "chceš", "deliť", "zlomky", ",", "musíš", "dodržať", "postup", "."],
  },

  [phraseKey("odčítať", "віднімати", "b1-19")]: {
    sk: "Nezabudni odčítať nulu, inak bude výsledok zlý.",
    ua: "Не забудь відняти нуль, інакше результат буде неправильний.",
    ru: "Не забудь вычесть ноль, иначе результат будет неправильным.",
    tokens: ["Nezabudni", "odčítať", "nulu", ",", "inak", "bude", "výsledok", "zlý", "."],
  },

  [phraseKey("sčítať", "додавати", "b1-19")]: {
    sk: "Keď sčítaš tieto čísla, dostaneš správny výsledok.",
    ua: "Коли додаси ці числа, отримаєш правильний результат.",
    ru: "Когда сложишь эти числа, получишь правильный результат.",
    tokens: ["Keď", "sčítaš", "tieto", "čísla", ",", "dostaneš", "správny", "výsledok", "."],
  },

  [phraseKey("zlomok", "дріб", "b1-19")]: {
    sk: "Zlomok sa dá zjednodušiť, keď vydelíš čitateľa aj menovateľa.",
    ua: "Дріб можна спростити, якщо поділити чисельник і знаменник.",
    ru: "Дробь можно упростить, если разделить числитель и знаменатель.",
    tokens: ["Zlomok", "sa", "dá", "zjednodušiť", ",", "keď", "vydelíš", "čitateľa", "aj", "menovateľa", "."],
  },

  [phraseKey("percento", "відсоток", "b1-19")]: {
    sk: "Koľko percento z ceny tvorí zľava?",
    ua: "Скільки відсотків від ціни становить знижка?",
    ru: "Сколько процентов от цены составляет скидка?",
    tokens: ["Koľko", "percento", "z", "ceny", "tvorí", "zľava", "?"],
  },

  [phraseKey("graf", "графік", "b1-19")]: {
    sk: "Z grafu vidno, že predaj v lete stúpa.",
    ua: "З графіка видно, що продажі влітку зростають.",
    ru: "По графику видно, что продажи летом растут.",
    tokens: ["Z", "grafu", "vidno", ",", "že", "predaj", "v", "lete", "stúpa", "."],
  },

  [phraseKey("vypočítať", "обчислити", "b1-19")]: {
    sk: "Vieš vypočítať, koľko to bude spolu?",
    ua: "Можеш обчислити, скільки це буде разом?",
    ru: "Можешь вычислить, сколько это будет всего?",
    tokens: ["Vieš", "vypočítať", ",", "koľko", "to", "bude", "spolu", "?"],
  },

  // =========================
  // LESSON 20 — Štát a spoločnosť
  // =========================
  [phraseKey("zákon", "закон", "b1-20")]: {
    sk: "Zákon platí pre všetkých rovnako.",
    ua: "Закон однаковий для всіх.",
    ru: "Закон одинаков для всех.",
    tokens: ["Zákon", "platí", "pre", "všetkých", "rovnako", "."],
  },

  [phraseKey("voľby", "вибори", "b1-20")]: {
    sk: "Voľby sa konajú každé štyri roky.",
    ua: "Вибори проводяться кожні чотири роки.",
    ru: "Выборы проходят каждые четыре года.",
    tokens: ["Voľby", "sa", "konajú", "každé", "štyri", "roky", "."],
  },

  [phraseKey("vláda", "уряд", "b1-20")]: {
    sk: "Vláda predstavila nový plán na podporu rodín.",
    ua: "Уряд представив новий план підтримки сімей.",
    ru: "Правительство представило новый план поддержки семей.",
    tokens: ["Vláda", "predstavila", "nový", "plán", "na", "podporu", "rodín", "."],
  },

  [phraseKey("občan", "громадянин", "b1-20")]: {
    sk: "Ako občan mám práva, ale aj povinnosti.",
    ua: "Як громадянин я маю права, але й обов’язки.",
    ru: "Как гражданин я имею права, но и обязанности.",
    tokens: ["Ako", "občan", "mám", "práva", ",", "ale", "aj", "povinnosti", "."],
  },

  [phraseKey("parlament", "парламент", "b1-20")]: {
    sk: "Parlament schválil zmeny po dlhej diskusii.",
    ua: "Парламент ухвалив зміни після довгої дискусії.",
    ru: "Парламент одобрил изменения после долгой дискуссии.",
    tokens: ["Parlament", "schválil", "zmeny", "po", "dlhej", "diskusii", "."],
  },

  [phraseKey("prezident", "президент", "b1-20")]: {
    sk: "Prezident má reprezentatívnu úlohu, ale aj právomoci.",
    ua: "Президент має представницьку роль, але також повноваження.",
    ru: "Президент выполняет представительскую роль, но имеет и полномочия.",
    tokens: ["Prezident", "má", "reprezentatívnu", "úlohu", ",", "ale", "aj", "právomoci", "."],
  },

  [phraseKey("ústava", "конституція", "b1-20")]: {
    sk: "Ústava je základný zákon štátu.",
    ua: "Конституція — основний закон держави.",
    ru: "Конституция — основной закон государства.",
    tokens: ["Ústava", "je", "základný", "zákon", "štátu", "."],
  },

  [phraseKey("ministerstvo", "міністерство", "b1-20")]: {
    sk: "Ministerstvo zverejnilo nové pravidlá na svojej stránke.",
    ua: "Міністерство опублікувало нові правила на своєму сайті.",
    ru: "Министерство опубликовало новые правила на своём сайте.",
    tokens: ["Ministerstvo", "zverejnilo", "nové", "pravidlá", "na", "svojej", "stránke", "."],
  },

  [phraseKey("referendum", "референдум", "b1-20")]: {
    sk: "O dôležitých otázkach sa niekedy rozhoduje v referende.",
    ua: "Важливі питання іноді вирішують на референдумі.",
    ru: "Важные вопросы иногда решают на референдуме.",
    tokens: ["O", "dôležitých", "otázkach", "sa", "niekedy", "rozhoduje", "v", "referende", "."],
  },

  [phraseKey("štátna správa", "державне управління", "b1-20")]: {
    sk: "Štátna správa by mala fungovať efektívne a transparentne.",
    ua: "Державне управління має працювати ефективно та прозоро.",
    ru: "Государственное управление должно работать эффективно и прозрачно.",
    tokens: ["Štátna", "správa", "by", "mala", "fungovať", "efektívne", "a", "transparentne", "."],
  },
};
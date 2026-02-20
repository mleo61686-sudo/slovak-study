// app/learning/phrases/a2-1.ts
import type { Phrase } from "./a2";
import { phraseKey } from "./phraseKey";

export const A2_PHRASES_1: Record<string, Phrase> = {
  // =========================
  // LESSON 1 — Dom a bývanie (rozšírené)
  // =========================
  [phraseKey("nájom", "оренда", "a2-1")]: {
    sk: "Platím nájom každý mesiac.",
    ua: "Я плачу оренду щомісяця.",
    ru: "Я плачу аренду каждый месяц.",
    tokens: ["Platím", "nájom", "každý", "mesiac", "."],
  },

  [phraseKey("nájomná zmluva", "договір оренди", "a2-1")]: {
    sk: "Podpísali sme nájomnú zmluvu na jeden rok.",
    ua: "Ми підписали договір оренди на один рік.",
    ru: "Мы подписали договор аренды на один год.",
    tokens: ["Podpísali", "sme", "nájomnú", "zmluvu", "na", "jeden", "rok", "."],
  },

  [phraseKey("majiteľ", "власник", "a2-1")]: {
    sk: "Majiteľ bytu býva vedľa.",
    ua: "Власник квартири живе поруч.",
    ru: "Владелец квартиры живёт рядом.",
    tokens: ["Majiteľ", "bytu", "býva", "vedľa", "."],
  },

  [phraseKey("podnájomník", "орендар", "a2-1")]: {
    sk: "Podnájomník musí dodržiavať pravidlá domu.",
    ua: "Орендар має дотримуватися правил будинку.",
    ru: "Арендатор должен соблюдать правила дома.",
    tokens: ["Podnájomník", "musí", "dodržiavať", "pravidlá", "domu", "."],
  },

  [phraseKey("účty", "рахунки (комунальні)", "a2-1")]: {
    sk: "Tento mesiac sú účty vyššie.",
    ua: "Цього місяця рахунки вищі.",
    ru: "В этом месяце счета выше.",
    tokens: ["Tento", "mesiac", "sú", "účty", "vyššie", "."],
  },

  [phraseKey("energie", "комунальні послуги/енергія", "a2-1")]: {
    sk: "V cene nájmu sú energie.",
    ua: "У вартість оренди входять комунальні послуги.",
    ru: "В стоимость аренды входят коммунальные услуги.",
    tokens: ["V", "cene", "nájmu", "sú", "energie", "."],
  },

  [phraseKey("oprava", "ремонт", "a2-1")]: {
    sk: "Oprava práčky bude zajtra.",
    ua: "Ремонт пральної машини буде завтра.",
    ru: "Ремонт стиральной машины будет завтра.",
    tokens: ["Oprava", "práčky", "bude", "zajtra", "."],
  },

  [phraseKey("pokazený", "зламаний", "a2-1")]: {
    sk: "Výťah je pokazený.",
    ua: "Ліфт зламаний.",
    ru: "Лифт сломан.",
    tokens: ["Výťah", "je", "pokazený", "."],
  },

  [phraseKey("sused", "сусід", "a2-1")]: {
    sk: "Sused je večer veľmi hlučný.",
    ua: "Сусід увечері дуже шумний.",
    ru: "Сосед вечером очень шумный.",
    tokens: ["Sused", "je", "večer", "veľmi", "hlučný", "."],
  },

  [phraseKey("sťahovanie", "переїзд", "a2-1")]: {
    sk: "Sťahovanie plánujeme na budúci víkend.",
    ua: "Переїзд плануємо на наступні вихідні.",
    ru: "Переезд планируем на следующие выходные.",
    tokens: ["Sťahovanie", "plánujeme", "na", "budúci", "víkend", "."],
  },

  // =========================
  // LESSON 2 — U lekára
  // =========================
  [phraseKey("vyšetrenie", "обстеження", "a2-2")]: {
    sk: "Zajtra mám vyšetrenie u lekára.",
    ua: "Завтра маю обстеження у лікаря.",
    ru: "Завтра у меня обследование у врача.",
    tokens: ["Zajtra", "mám", "vyšetrenie", "u", "lekára", "."],
  },

  [phraseKey("diagnóza", "діагноз", "a2-2")]: {
    sk: "Lekár mi vysvetlil diagnózu.",
    ua: "Лікар мені пояснив діагноз.",
    ru: "Врач мне объяснил диагноз.",
    tokens: ["Lekár", "mi", "vysvetlil", "diagnózu", "."],
  },

  [phraseKey("príznak", "симптом", "a2-2")]: {
    sk: "Hlavný príznak je kašeľ.",
    ua: "Основний симптом — кашель.",
    ru: "Главный симптом — кашель.",
    tokens: ["Hlavný", "príznak", "je", "kašeľ", "."],
  },

  [phraseKey("bolesť hrdla", "біль у горлі", "a2-2")]: {
    sk: "Mám bolesť hrdla už tri dni.",
    ua: "У мене болить горло вже три дні.",
    ru: "У меня болит горло уже три дня.",
    tokens: ["Mám", "bolesť", "hrdla", "už", "tri", "dni", "."],
  },

  [phraseKey("teplomer", "термометр", "a2-2")]: {
    sk: "Máte doma teplomer?",
    ua: "У вас є вдома термометр?",
    ru: "У вас дома есть термометр?",
    tokens: ["Máte", "doma", "teplomer", "?"],
  },

  [phraseKey("krvný tlak", "артеріальний тиск", "a2-2")]: {
    sk: "Zmerali mi krvný tlak.",
    ua: "Мені виміряли артеріальний тиск.",
    ru: "Мне измерили артериальное давление.",
    tokens: ["Zmerali", "mi", "krvný", "tlak", "."],
  },

  [phraseKey("recept", "рецепт (лікарський)", "a2-2")]: {
    sk: "Dostal som recept na antibiotiká.",
    ua: "Я отримав рецепт на антибіотики.",
    ru: "Я получил рецепт на антибиотики.",
    tokens: ["Dostal", "som", "recept", "na", "antibiotiká", "."],
  },

  [phraseKey("alergia", "алергія", "a2-2")]: {
    sk: "Mám alergiu na peľ.",
    ua: "У мене алергія на пилок.",
    ru: "У меня аллергия на пыльцу.",
    tokens: ["Mám", "alergiu", "na", "peľ", "."],
  },

  [phraseKey("zápal", "запалення", "a2-2")]: {
    sk: "Vyzerá to na zápal priedušiek.",
    ua: "Схоже на запалення бронхів.",
    ru: "Похоже на воспаление бронхов.",
    tokens: ["Vyzerá", "to", "na", "zápal", "priedušiek", "."],
  },

  [phraseKey("odporúčanie", "рекомендація", "a2-2")]: {
    sk: "Podľa odporúčania lekára teraz oddychujem.",
    ua: "За рекомендацією лікаря зараз відпочиваю.",
    ru: "По рекомендации врача я сейчас отдыхаю.",
    tokens: ["Podľa", "odporúčania", "lekára", "teraz", "oddychujem", "."],
  },

  // =========================
  // LESSON 3 — Mesto a služby
  // =========================
  [phraseKey("mestský úrad", "міська рада/мерія", "a2-3")]: {
    sk: "Potrebujem ísť na mestský úrad.",
    ua: "Мені потрібно піти до мерії.",
    ru: "Мне нужно пойти в мэрию.",
    tokens: ["Potrebujem", "ísť", "na", "mestský", "úrad", "."],
  },

  [phraseKey("oddelenie", "відділення/відділ", "a2-3")]: {
    sk: "Na ktorom oddelení to vybavím?",
    ua: "У якому відділі я це оформлю?",
    ru: "В каком отделе я это оформлю?",
    tokens: ["Na", "ktorom", "oddelení", "to", "vybavím", "?"],
  },

  [phraseKey("žiadateľ", "заявник", "a2-3")]: {
    sk: "Žiadateľ musí vyplniť formulár.",
    ua: "Заявник має заповнити бланк.",
    ru: "Заявитель должен заполнить бланк.",
    tokens: ["Žiadateľ", "musí", "vyplniť", "formulár", "."],
  },

  [phraseKey("žiadosť", "заява", "a2-3")]: {
    sk: "Podal som žiadosť o potvrdenie.",
    ua: "Я подав заяву на довідку.",
    ru: "Я подал заявление на справку.",
    tokens: ["Podal", "som", "žiadosť", "o", "potvrdenie", "."],
  },

  [phraseKey("doklad", "документ", "a2-3")]: {
    sk: "Prosím, pripravte si doklad totožnosti.",
    ua: "Будь ласка, підготуйте документ, що посвідчує особу.",
    ru: "Пожалуйста, подготовьте документ, удостоверяющий личность.",
    tokens: ["Prosím", ",", "pripravte", "si", "doklad", "totožnosti", "."],
  },

  [phraseKey("potvrdenie", "підтвердження/довідка", "a2-3")]: {
    sk: "Potvrdenie vám pošleme e-mailom.",
    ua: "Підтвердження надішлемо вам електронною поштою.",
    ru: "Подтверждение отправим вам по e-mail.",
    tokens: ["Potvrdenie", "vám", "pošleme", "e-mailom", "."],
  },

  [phraseKey("poplatok", "збір/плата", "a2-3")]: {
    sk: "Správny poplatok je desať eur.",
    ua: "Адміністративний збір — десять євро.",
    ru: "Административный сбор — десять евро.",
    tokens: ["Správny", "poplatok", "je", "desať", "eur", "."],
  },

  [phraseKey("objednať sa", "записатися (на прийом)", "a2-3")]: {
    sk: "Musím sa objednať vopred.",
    ua: "Мені потрібно записатися заздалегідь.",
    ru: "Мне нужно записаться заранее.",
    tokens: ["Musím", "sa", "objednať", "vopred", "."],
  },

  [phraseKey("otváracie hodiny", "години роботи", "a2-3")]: {
    sk: "Aké sú otváracie hodiny?",
    ua: "Які години роботи?",
    ru: "Какие часы работы?",
    tokens: ["Aké", "sú", "otváracie", "hodiny", "?"],
  },

  [phraseKey("formulár", "бланк/форма", "a2-3")]: {
    sk: "Kde nájdem tento formulár?",
    ua: "Де я знайду цей бланк?",
    ru: "Где я найду этот бланк?",
    tokens: ["Kde", "nájdem", "tento", "formulár", "?"],
  },

  // =========================
  // LESSON 4 — Práca a kariéra
  // =========================
  [phraseKey("pohovor", "співбесіда", "a2-4")]: {
    sk: "Zajtra mám pracovný pohovor.",
    ua: "Завтра маю співбесіду.",
    ru: "Завтра у меня собеседование.",
    tokens: ["Zajtra", "mám", "pracovný", "pohovor", "."],
  },

  [phraseKey("životopis", "резюме (CV)", "a2-4")]: {
    sk: "Pošlem vám životopis v PDF.",
    ua: "Я надішлю вам резюме у PDF.",
    ru: "Я отправлю вам резюме в PDF.",
    tokens: ["Pošlem", "vám", "životopis", "v", "PDF", "."],
  },

  [phraseKey("prax", "досвід роботи/практика", "a2-4")]: {
    sk: "Mám trojročnú prax v servise.",
    ua: "У мене трирічний досвід роботи в сервісі.",
    ru: "У меня трёхлетний опыт работы в сервисе.",
    tokens: ["Mám", "trojročnú", "prax", "v", "servise", "."],
  },

  [phraseKey("zručnosť", "навичка", "a2-4")]: {
    sk: "Táto zručnosť je pre túto pozíciu dôležitá.",
    ua: "Ця навичка важлива для цієї посади.",
    ru: "Этот навык важен для этой должности.",
    tokens: ["Táto", "zručnosť", "je", "pre", "túto", "pozíciu", "dôležitá", "."],
  },

  [phraseKey("požiadavka", "вимога", "a2-4")]: {
    sk: "Jedna požiadavka je angličtina.",
    ua: "Одна вимога — англійська.",
    ru: "Одно требование — английский.",
    tokens: ["Jedna", "požiadavka", "je", "angličtina", "."],
  },

  [phraseKey("pracovná ponuka", "вакансія", "a2-4")]: {
    sk: "Našiel som zaujímavú pracovnú ponuku.",
    ua: "Я знайшов цікаву вакансію.",
    ru: "Я нашёл интересную вакансию.",
    tokens: ["Našiel", "som", "zaujímavú", "pracovnú", "ponuku", "."],
  },

  [phraseKey("pracovná pozícia", "посада", "a2-4")]: {
    sk: "Táto pracovná pozícia je na plný úväzok.",
    ua: "Ця посада на повну зайнятість.",
    ru: "Эта должность на полную занятость.",
    tokens: ["Táto", "pracovná", "pozícia", "je", "na", "plný", "úväzok", "."],
  },

  [phraseKey("zodpovednosť", "відповідальність", "a2-4")]: {
    sk: "Moja zodpovednosť bude komunikácia so zákazníkmi.",
    ua: "Моя відповідальність — комунікація з клієнтами.",
    ru: "Моя ответственность — коммуникация с клиентами.",
    tokens: ["Moja", "zodpovednosť", "bude", "komunikácia", "so", "zákazníkmi", "."],
  },

  [phraseKey("výhody", "переваги/бонуси", "a2-4")]: {
    sk: "Medzi výhody patrí aj stravné.",
    ua: "Серед бонусів є також харчування/компенсація на їжу.",
    ru: "Среди бонусов есть также питание/компенсация на еду.",
    tokens: ["Medzi", "výhody", "patrí", "aj", "stravné", "."],
  },

  [phraseKey("skúšobná doba", "випробувальний термін", "a2-4")]: {
    sk: "Skúšobná doba trvá tri mesiace.",
    ua: "Випробувальний термін триває три місяці.",
    ru: "Испытательный срок длится три месяца.",
    tokens: ["Skúšobná", "doba", "trvá", "tri", "mesiace", "."],
  },

  // =========================
  // LESSON 5 — Cestovanie (situácie)
  // =========================
  [phraseKey("rezervácia", "бронювання", "a2-5")]: {
    sk: "Moja rezervácia je na meno Novák.",
    ua: "Моє бронювання на прізвище Новак.",
    ru: "Моё бронирование на фамилию Новак.",
    tokens: ["Moja", "rezervácia", "je", "na", "meno", "Novák", "."],
  },

  [phraseKey("ubytovanie", "проживання", "a2-5")]: {
    sk: "Hľadáme lacné ubytovanie pri stanici.",
    ua: "Шукаємо недороге проживання біля вокзалу.",
    ru: "Ищем недорогое жильё рядом с вокзалом.",
    tokens: ["Hľadáme", "lacné", "ubytovanie", "pri", "stanici", "."],
  },

  [phraseKey("potvrdiť", "підтвердити", "a2-5")]: {
    sk: "Môžete mi potvrdiť rezerváciu?",
    ua: "Можете підтвердити моє бронювання?",
    ru: "Можете подтвердить моё бронирование?",
    tokens: ["Môžete", "mi", "potvrdiť", "rezerváciu", "?"],
  },

  [phraseKey("zrušiť", "скасувати", "a2-5")]: {
    sk: "Chcel by som zrušiť objednávku.",
    ua: "Я хотів би скасувати замовлення.",
    ru: "Я хотел бы отменить заказ.",
    tokens: ["Chcel", "by", "som", "zrušiť", "objednávku", "."],
  },

  [phraseKey("meškanie", "затримка", "a2-5")]: {
    sk: "Let má meškanie dve hodiny.",
    ua: "Рейс має затримку дві години.",
    ru: "Рейс задерживается на два часа.",
    tokens: ["Let", "má", "meškanie", "dve", "hodiny", "."],
  },

  [phraseKey("presun", "переміщення/трансфер", "a2-5")]: {
    sk: "Potrebujem presun na letisko.",
    ua: "Мені потрібен трансфер до аеропорту.",
    ru: "Мне нужен трансфер в аэропорт.",
    tokens: ["Potrebujem", "presun", "na", "letisko", "."],
  },

  [phraseKey("jednosmerný", "в один бік", "a2-5")]: {
    sk: "Prosím si jednosmerný lístok.",
    ua: "Будь ласка, один квиток в один бік.",
    ru: "Пожалуйста, билет в одну сторону.",
    tokens: ["Prosím", "si", "jednosmerný", "lístok", "."],
  },

  [phraseKey("spiatočný", "туди-й-назад", "a2-5")]: {
    sk: "Kúpim si spiatočný lístok.",
    ua: "Я куплю квиток туди-й-назад.",
    ru: "Я куплю билет туда-обратно.",
    tokens: ["Kúpim", "si", "spiatočný", "lístok", "."],
  },

  [phraseKey("cestovné poistenie", "туристична страховка", "a2-5")]: {
    sk: "Máte cestovné poistenie?",
    ua: "У вас є туристична страховка?",
    ru: "У вас есть туристическая страховка?",
    tokens: ["Máte", "cestovné", "poistenie", "?"],
  },

  [phraseKey("batožina", "багаж", "a2-5")]: {
    sk: "Moja batožina je príliš ťažká.",
    ua: "Мій багаж занадто важкий.",
    ru: "Мой багаж слишком тяжёлый.",
    tokens: ["Moja", "batožina", "je", "príliš", "ťažká", "."],
  },

  // =========================
  // LESSON 6 — Peniaze a financie
  // =========================
  [phraseKey("rozpočet", "бюджет", "a2-6")]: {
    sk: "Tento mesiac musím dodržať rozpočet.",
    ua: "Цього місяця я маю дотриматися бюджету.",
    ru: "В этом месяце мне нужно уложиться в бюджет.",
    tokens: ["Tento", "mesiac", "musím", "dodržať", "rozpočet", "."],
  },

  [phraseKey("príjem", "дохід", "a2-6")]: {
    sk: "Môj mesačný príjem je stabilný.",
    ua: "Мій місячний дохід стабільний.",
    ru: "Мой месячный доход стабильный.",
    tokens: ["Môj", "mesačný", "príjem", "je", "stabilný", "."],
  },

  [phraseKey("výdavky", "витрати", "a2-6")]: {
    sk: "Výdavky na bývanie sú vysoké.",
    ua: "Витрати на житло високі.",
    ru: "Расходы на жильё высокие.",
    tokens: ["Výdavky", "na", "bývanie", "sú", "vysoké", "."],
  },

  [phraseKey("ušetriť", "заощадити", "a2-6")]: {
    sk: "Chcem ušetriť na dovolenku.",
    ua: "Хочу заощадити на відпустку.",
    ru: "Хочу сэкономить на отпуск.",
    tokens: ["Chcem", "ušetriť", "na", "dovolenku", "."],
  },

  [phraseKey("minúť", "витратити", "a2-6")]: {
    sk: "Tento týždeň som minul veľa peňazí.",
    ua: "Цього тижня я витратив багато грошей.",
    ru: "На этой неделе я потратил много денег.",
    tokens: ["Tento", "týždeň", "som", "minul", "veľa", "peňazí", "."],
  },

  [phraseKey("prevod", "переказ", "a2-6")]: {
    sk: "Urobím prevod na váš účet.",
    ua: "Я зроблю переказ на ваш рахунок.",
    ru: "Я сделаю перевод на ваш счёт.",
    tokens: ["Urobím", "prevod", "na", "váš", "účet", "."],
  },

  [phraseKey("bankový účet", "банківський рахунок", "a2-6")]: {
    sk: "Mám nový bankový účet.",
    ua: "У мене новий банківський рахунок.",
    ru: "У меня новый банковский счёт.",
    tokens: ["Mám", "nový", "bankový", "účet", "."],
  },

  [phraseKey("trvalý príkaz", "постійне доручення (автоплатіж)", "a2-6")]: {
    sk: "Nastavil som trvalý príkaz na nájom.",
    ua: "Я налаштував постійне доручення на оренду.",
    ru: "Я настроил постоянное поручение на аренду.",
    tokens: ["Nastavil", "som", "trvalý", "príkaz", "na", "nájom", "."],
  },

  [phraseKey("úrok", "відсоток (interest)", "a2-6")]: {
    sk: "Úrok na tomto účte je nízky.",
    ua: "Відсоток на цьому рахунку низький.",
    ru: "Процент по этому счёту низкий.",
    tokens: ["Úrok", "na", "tomto", "účte", "je", "nízky", "."],
  },

  [phraseKey("poplatok", "комісія/збір", "a2-6")]: {
    sk: "Banka si účtuje poplatok za výber.",
    ua: "Банк бере комісію за зняття.",
    ru: "Банк взимает комиссию за снятие.",
    tokens: ["Banka", "si", "účtuje", "poplatok", "za", "výber", "."],
  },

  // =========================
  // LESSON 7 — Komunikácia a názory
  // =========================
  [phraseKey("podľa mňa", "на мою думку", "a2-7")]: {
    sk: "Podľa mňa je to dobrý nápad.",
    ua: "На мою думку, це хороша ідея.",
    ru: "По-моему, это хорошая идея.",
    tokens: ["Podľa", "mňa", "je", "to", "dobrý", "nápad", "."],
  },

  [phraseKey("myslím si", "я думаю", "a2-7")]: {
    sk: "Myslím si, že prídeme načas.",
    ua: "Я думаю, що ми прийдемо вчасно.",
    ru: "Я думаю, что мы придём вовремя.",
    tokens: ["Myslím", "si", ",", "že", "prídeme", "načas", "."],
  },

  [phraseKey("zdá sa mi", "мені здається", "a2-7")]: {
    sk: "Zdá sa mi, že je unavený.",
    ua: "Мені здається, що він втомлений.",
    ru: "Мне кажется, что он устал.",
    tokens: ["Zdá", "sa", "mi", ",", "že", "je", "unavený", "."],
  },

  [phraseKey("navrhnúť", "запропонувати", "a2-7")]: {
    sk: "Chcem navrhnúť inú možnosť.",
    ua: "Хочу запропонувати інший варіант.",
    ru: "Хочу предложить другой вариант.",
    tokens: ["Chcem", "navrhnúť", "inú", "možnosť", "."],
  },

  [phraseKey("zhrnúť", "підсумувати", "a2-7")]: {
    sk: "Na záver to zhrniem.",
    ua: "Наприкінці я це підсумую.",
    ru: "В конце я это подытожу.",
    tokens: ["Na", "záver", "to", "zhrniem", "."],
  },

  [phraseKey("vyjadriť názor", "висловити думку", "a2-7")]: {
    sk: "Môžem vyjadriť názor?",
    ua: "Можу висловити думку?",
    ru: "Можно высказать мнение?",
    tokens: ["Môžem", "vyjadriť", "názor", "?"],
  },

  [phraseKey("argumentovať", "аргументувати", "a2-7")]: {
    sk: "Skúsil som argumentovať faktami.",
    ua: "Я спробував аргументувати фактами.",
    ru: "Я попытался аргументировать фактами.",
    tokens: ["Skúsil", "som", "argumentovať", "faktami", "."],
  },

  [phraseKey("presvedčiť", "переконати", "a2-7")]: {
    sk: "Neviem ho presvedčiť.",
    ua: "Я не можу його переконати.",
    ru: "Я не могу его убедить.",
    tokens: ["Neviem", "ho", "presvedčiť", "."],
  },

  [phraseKey("spomenúť", "згадати", "a2-7")]: {
    sk: "Chcel som spomenúť jednu vec.",
    ua: "Я хотів згадати одну річ.",
    ru: "Я хотел упомянуть одну вещь.",
    tokens: ["Chcel", "som", "spomenúť", "jednu", "vec", "."],
  },

  [phraseKey("reagovať", "реагувати", "a2-7")]: {
    sk: "Ako budeš reagovať na tú správu?",
    ua: "Як ти відреагуєш на те повідомлення?",
    ru: "Как ты отреагируешь на это сообщение?",
    tokens: ["Ako", "budeš", "reagovať", "na", "tú", "správu", "?"],
  },

  // =========================
  // LESSON 8 — Čas, plány, udalosti
  // =========================
  [phraseKey("posunúť", "перенести (дату/зустріч)", "a2-8")]: {
    sk: "Môžeme posunúť stretnutie na pondelok?",
    ua: "Можемо перенести зустріч на понеділок?",
    ru: "Можем перенести встречу на понедельник?",
    tokens: ["Môžeme", "posunúť", "stretnutie", "na", "pondelok", "?"],
  },

  [phraseKey("naplánovať", "запланувати", "a2-8")]: {
    sk: "Potrebujem naplánovať cestu.",
    ua: "Мені потрібно запланувати поїздку.",
    ru: "Мне нужно запланировать поездку.",
    tokens: ["Potrebujem", "naplánovať", "cestu", "."],
  },

  [phraseKey("odložiť", "відкласти", "a2-8")]: {
    sk: "Musíme to odložiť na neskôr.",
    ua: "Ми мусимо відкласти це на потім.",
    ru: "Нам нужно отложить это на потом.",
    tokens: ["Musíme", "to", "odložiť", "na", "neskôr", "."],
  },

  [phraseKey("zúčastniť sa", "взяти участь", "a2-8")]: {
    sk: "Chcem sa zúčastniť školenia.",
    ua: "Хочу взяти участь у навчанні.",
    ru: "Хочу принять участие в обучении.",
    tokens: ["Chcem", "sa", "zúčastniť", "školenia", "."],
  },

  [phraseKey("zmeniť plán", "змінити план", "a2-8")]: {
    sk: "Museli sme zmeniť plán.",
    ua: "Нам довелося змінити план.",
    ru: "Нам пришлось изменить план.",
    tokens: ["Museli", "sme", "zmeniť", "plán", "."],
  },

  [phraseKey("konať sa", "відбуватися", "a2-8")]: {
    sk: "Podujatie sa bude konať v sobotu.",
    ua: "Захід відбудеться в суботу.",
    ru: "Мероприятие состоится в субботу.",
    tokens: ["Podujatie", "sa", "bude", "konať", "v", "sobotu", "."],
  },

  [phraseKey("organizovať", "організувати", "a2-8")]: {
    sk: "Kto bude organizovať stretnutie?",
    ua: "Хто буде організовувати зустріч?",
    ru: "Кто будет организовывать встречу?",
    tokens: ["Kto", "bude", "organizovať", "stretnutie", "?"],
  },

  [phraseKey("uskutočniť sa", "відбутися", "a2-8")]: {
    sk: "Stretnutie sa uskutoční online.",
    ua: "Зустріч відбудеться онлайн.",
    ru: "Встреча состоится онлайн.",
    tokens: ["Stretnutie", "sa", "uskutoční", "online", "."],
  },

  [phraseKey("meškať", "запізнюватися", "a2-8")]: {
    sk: "Prepáčte, budem meškať desať minút.",
    ua: "Вибачте, я запізнюся на десять хвилин.",
    ru: "Извините, я опоздаю на десять минут.",
    tokens: ["Prepáčte", ",", "budem", "meškať", "desať", "minút", "."],
  },

  [phraseKey("stihnúť", "встигнути", "a2-8")]: {
    sk: "Stihnem posledný autobus.",
    ua: "Я встигну на останній автобус.",
    ru: "Я успею на последний автобус.",
    tokens: ["Stihnem", "posledný", "autobus", "."],
  },

  // =========================
  // LESSON 9 — Nákupy a reklamácie
  // =========================
  [phraseKey("podmienky", "умови", "a2-9")]: {
    sk: "Aké sú podmienky vrátenia?",
    ua: "Які умови повернення?",
    ru: "Какие условия возврата?",
    tokens: ["Aké", "sú", "podmienky", "vrátenia", "?"],
  },

  [phraseKey("sťažnosť", "скарга", "a2-9")]: {
    sk: "Chcem podať sťažnosť.",
    ua: "Я хочу подати скаргу.",
    ru: "Я хочу подать жалобу.",
    tokens: ["Chcem", "podať", "sťažnosť", "."],
  },

  [phraseKey("peniaze späť", "гроші назад", "a2-9")]: {
    sk: "Chcem peniaze späť.",
    ua: "Я хочу гроші назад.",
    ru: "Я хочу деньги обратно.",
    tokens: ["Chcem", "peniaze", "späť", "."],
  },

  [phraseKey("vrátenie tovaru", "повернення товару", "a2-9")]: {
    sk: "Vrátenie tovaru je do štrnástich dní.",
    ua: "Повернення товару можливе протягом 14 днів.",
    ru: "Возврат товара возможен в течение 14 дней.",
    tokens: ["Vrátenie", "tovaru", "je", "do", "štrnástich", "dní", "."],
  },

  [phraseKey("pokladničný blok", "касовий чек", "a2-9")]: {
    sk: "Potrebujem pokladničný blok.",
    ua: "Мені потрібен касовий чек.",
    ru: "Мне нужен кассовый чек.",
    tokens: ["Potrebujem", "pokladničný", "blok", "."],
  },

  [phraseKey("reklamovať", "подати рекламацію", "a2-9")]: {
    sk: "Chcel by som reklamovať tento výrobok.",
    ua: "Я хотів би подати рекламацію на цей товар.",
    ru: "Я хотел бы подать рекламацию на этот товар.",
    tokens: ["Chcel", "by", "som", "reklamovať", "tento", "výrobok", "."],
  },

  [phraseKey("doklad", "документ / підтвердження", "a2-9")]: {
    sk: "Máte k tomu doklad?",
    ua: "У вас є до цього документ/підтвердження?",
    ru: "У вас есть к этому документ/подтверждение?",
    tokens: ["Máte", "k", "tomu", "doklad", "?"],
  },

  [phraseKey("výmena", "обмін", "a2-9")]: {
    sk: "Je možná výmena za iný kus?",
    ua: "Можливий обмін на інший товар?",
    ru: "Возможен обмен на другой товар?",
    tokens: ["Je", "možná", "výmena", "za", "iný", "kus", "?"],
  },

  [phraseKey("lehota", "термін", "a2-9")]: {
    sk: "Aká je lehota vybavenia reklamácie?",
    ua: "Який термін розгляду рекламації?",
    ru: "Какой срок рассмотрения рекламации?",
    tokens: ["Aká", "je", "lehota", "vybavenia", "reklamácie", "?"],
  },

  [phraseKey("náhrada", "компенсація / заміна", "a2-9")]: {
    sk: "Dostanem náhradu alebo opravu?",
    ua: "Я отримаю компенсацію чи ремонт?",
    ru: "Я получу компенсацию или ремонт?",
    tokens: ["Dostanem", "náhradu", "alebo", "opravu", "?"],
  },

  // =========================
  // LESSON 10 — Počasie a príroda (rozšírené)
  // =========================
  [phraseKey("predpoveď", "прогноз", "a2-10")]: {
    sk: "Podľa predpovede bude pršať.",
    ua: "За прогнозом буде дощ.",
    ru: "По прогнозу будет дождь.",
    tokens: ["Podľa", "predpovede", "bude", "pršať", "."],
  },

  [phraseKey("polooblačno", "мінлива хмарність", "a2-10")]: {
    sk: "Zajtra bude polooblačno.",
    ua: "Завтра буде мінлива хмарність.",
    ru: "Завтра будет переменная облачность.",
    tokens: ["Zajtra", "bude", "polooblačno", "."],
  },

  [phraseKey("prehánka", "злива/короткий дощ", "a2-10")]: {
    sk: "Poobede príde krátka prehánka.",
    ua: "Після обіду буде коротка злива.",
    ru: "После обеда будет кратковременный дождь.",
    tokens: ["Poobede", "príde", "krátka", "prehánka", "."],
  },

  [phraseKey("jasno", "ясно", "a2-10")]: {
    sk: "Ráno bude jasno.",
    ua: "Вранці буде ясно.",
    ru: "Утром будет ясно.",
    tokens: ["Ráno", "bude", "jasno", "."],
  },

  [phraseKey("poľadovica", "ожеледиця", "a2-10")]: {
    sk: "Pozor, na cestách je poľadovica.",
    ua: "Обережно, на дорогах ожеледиця.",
    ru: "Осторожно, на дорогах гололёд.",
    tokens: ["Pozor", ",", "na", "cestách", "je", "poľadovica", "."],
  },

  [phraseKey("vlhkosť", "вологість", "a2-10")]: {
    sk: "Vlhkosť je dnes vysoká.",
    ua: "Вологість сьогодні висока.",
    ru: "Влажность сегодня высокая.",
    tokens: ["Vlhkosť", "je", "dnes", "vysoká", "."],
  },

  [phraseKey("oblačno", "хмарно", "a2-10")]: {
    sk: "Dnes je oblačno a chladno.",
    ua: "Сьогодні хмарно і прохолодно.",
    ru: "Сегодня облачно и прохладно.",
    tokens: ["Dnes", "je", "oblačno", "a", "chladno", "."],
  },

  [phraseKey("ochladiť sa", "похолоднішати", "a2-10")]: {
    sk: "Večer sa má ochladiť.",
    ua: "Увечері має похолоднішати.",
    ru: "Вечером должно похолодать.",
    tokens: ["Večer", "sa", "má", "ochladiť", "."],
  },

  [phraseKey("otepliť sa", "потеплішати", "a2-10")]: {
    sk: "V piatok sa má otepliť.",
    ua: "У п’ятницю має потеплішати.",
    ru: "В пятницу должно потеплеть.",
    tokens: ["V", "piatok", "sa", "má", "otepliť", "."],
  },

  [phraseKey("prudký vietor", "сильний вітер", "a2-10")]: {
    sk: "Fúka prudký vietor.",
    ua: "Дме сильний вітер.",
    ru: "Дует сильный ветер.",
    tokens: ["Fúka", "prudký", "vietor", "."],
  },
};
// app/learning/phrases/a2-1.ts
import type { Phrase } from "./a2";
import { phraseKey } from "./phraseKey";

export const A2_PHRASES_1: Record<string, Phrase> = {
  // =========================
  // LESSON 1 — Dom a bývanie (rozšírené)
  // =========================
  [phraseKey("nájom", "a2-1")]: {
    sk: "Platím nájom každý mesiac.",
    ua: "Я плачу оренду щомісяця.",
    ru: "Я плачу аренду каждый месяц.",
    en: "I pay rent every month.",
    tokens: ["Platím", "nájom", "každý", "mesiac", "."],
  },

  [phraseKey("nájomná zmluva", "a2-1")]: {
    sk: "Podpísali sme nájomnú zmluvu na jeden rok.",
    ua: "Ми підписали договір оренди на один рік.",
    ru: "Мы подписали договор аренды на один год.",
    en: "We signed a rental contract for one year.",
    tokens: ["Podpísali", "sme", "nájomnú", "zmluvu", "na", "jeden", "rok", "."],
  },

  [phraseKey("majiteľ", "a2-1")]: {
    sk: "Majiteľ bytu býva vedľa.",
    ua: "Власник квартири живе поруч.",
    ru: "Владелец квартиры живёт рядом.",
    en: "The apartment owner lives next door.",
    tokens: ["Majiteľ", "bytu", "býva", "vedľa", "."],
  },

  [phraseKey("podnájomník", "a2-1")]: {
    sk: "Podnájomník musí dodržiavať pravidlá domu.",
    ua: "Орендар має дотримуватися правил будинку.",
    ru: "Арендатор должен соблюдать правила дома.",
    en: "The tenant must follow the house rules.",
    tokens: ["Podnájomník", "musí", "dodržiavať", "pravidlá", "domu", "."],
  },

  [phraseKey("účty", "a2-1")]: {
    sk: "Tento mesiac sú účty vyššie.",
    ua: "Цього місяця рахунки вищі.",
    ru: "В этом месяце счета выше.",
    en: "This month the bills are higher.",
    tokens: ["Tento", "mesiac", "sú", "účty", "vyššie", "."],
  },

  [phraseKey("energie", "a2-1")]: {
    sk: "V cene nájmu sú energie.",
    ua: "У вартість оренди входять комунальні послуги.",
    ru: "В стоимость аренды входят коммунальные услуги.",
    en: "Utilities are included in the rent.",
    tokens: ["V", "cene", "nájmu", "sú", "energie", "."],
  },

  [phraseKey("oprava", "a2-1")]: {
    sk: "Oprava práčky bude zajtra.",
    ua: "Ремонт пральної машини буде завтра.",
    ru: "Ремонт стиральной машины будет завтра.",
    en: "The washing machine repair is scheduled for tomorrow.",
    tokens: ["Oprava", "práčky", "bude", "zajtra", "."],
  },

  [phraseKey("pokazený", "a2-1")]: {
    sk: "Výťah je pokazený.",
    ua: "Ліфт зламаний.",
    ru: "Лифт сломан.",
    en: "The elevator is broken.",
    tokens: ["Výťah", "je", "pokazený", "."],
  },

  [phraseKey("sused", "a2-1")]: {
    sk: "Sused je večer veľmi hlučný.",
    ua: "Сусід увечері дуже шумний.",
    ru: "Сосед вечером очень шумный.",
    en: "The neighbor is very noisy in the evening.",
    tokens: ["Sused", "je", "večer", "veľmi", "hlučný", "."],
  },

  [phraseKey("sťahovanie", "a2-1")]: {
    sk: "Sťahovanie plánujeme na budúci víkend.",
    ua: "Переїзд плануємо на наступні вихідні.",
    ru: "Переезд планируем на следующие выходные.",
    en: "We are planning the move for next weekend.",
    tokens: ["Sťahovanie", "plánujeme", "na", "budúci", "víkend", "."],
  },

  // =========================
  // LESSON 2 — U lekára
  // =========================
  [phraseKey("vyšetrenie", "a2-2")]: {
    sk: "Zajtra mám vyšetrenie u lekára.",
    ua: "Завтра маю обстеження у лікаря.",
    ru: "Завтра у меня обследование у врача.",
    en: "Tomorrow I have an examination at the doctor's.",
    tokens: ["Zajtra", "mám", "vyšetrenie", "u", "lekára", "."],
  },

  [phraseKey("diagnóza", "a2-2")]: {
    sk: "Lekár mi vysvetlil diagnózu.",
    ua: "Лікар мені пояснив діагноз.",
    ru: "Врач мне объяснил диагноз.",
    en: "The doctor explained the diagnosis to me.",
    tokens: ["Lekár", "mi", "vysvetlil", "diagnózu", "."],
  },

  [phraseKey("príznak", "a2-2")]: {
    sk: "Hlavný príznak je kašeľ.",
    ua: "Основний симптом — кашель.",
    ru: "Главный симптом — кашель.",
    en: "The main symptom is a cough.",
    tokens: ["Hlavný", "príznak", "je", "kašeľ", "."],
  },

  [phraseKey("bolesť hrdla", "a2-2")]: {
    sk: "Mám bolesť hrdla už tri dni.",
    ua: "У мене болить горло вже три дні.",
    ru: "У меня болит горло уже три дня.",
    en: "I have had a sore throat for three days already.",
    tokens: ["Mám", "bolesť", "hrdla", "už", "tri", "dni", "."],
  },

  [phraseKey("teplomer", "a2-2")]: {
    sk: "Máte doma teplomer?",
    ua: "У вас є вдома термометр?",
    ru: "У вас дома есть термометр?",
    en: "Do you have a thermometer at home?",
    tokens: ["Máte", "doma", "teplomer", "?"],
  },

  [phraseKey("krvný tlak", "a2-2")]: {
    sk: "Zmerali mi krvný tlak.",
    ua: "Мені виміряли артеріальний тиск.",
    ru: "Мне измерили артериальное давление.",
    en: "They measured my blood pressure.",
    tokens: ["Zmerali", "mi", "krvný", "tlak", "."],
  },

  [phraseKey("recept", "a2-2")]: {
    sk: "Dostal som recept na antibiotiká.",
    ua: "Я отримав рецепт на антибіотики.",
    ru: "Я получил рецепт на антибиотики.",
    en: "I got a prescription for antibiotics.",
    tokens: ["Dostal", "som", "recept", "na", "antibiotiká", "."],
  },

  [phraseKey("alergia", "a2-2")]: {
    sk: "Mám alergiu na peľ.",
    ua: "У мене алергія на пилок.",
    ru: "У меня аллергия на пыльцу.",
    en: "I am allergic to pollen.",
    tokens: ["Mám", "alergiu", "na", "peľ", "."],
  },

  [phraseKey("zápal", "a2-2")]: {
    sk: "Vyzerá to na zápal priedušiek.",
    ua: "Схоже на запалення бронхів.",
    ru: "Похоже на воспаление бронхов.",
    en: "It looks like bronchitis.",
    tokens: ["Vyzerá", "to", "na", "zápal", "priedušiek", "."],
  },

  [phraseKey("odporúčanie", "a2-2")]: {
    sk: "Podľa odporúčania lekára teraz oddychujem.",
    ua: "За рекомендацією лікаря зараз відпочиваю.",
    ru: "По рекомендации врача я сейчас отдыхаю.",
    en: "Following the doctor's recommendation, I am resting now.",
    tokens: ["Podľa", "odporúčania", "lekára", "teraz", "oddychujem", "."],
  },

  // =========================
  // LESSON 3 — Mesto a služby
  // =========================
  [phraseKey("mestský úrad", "a2-3")]: {
    sk: "Potrebujem ísť na mestský úrad.",
    ua: "Мені потрібно піти до мерії.",
    ru: "Мне нужно пойти в мэрию.",
    en: "I need to go to the city hall.",
    tokens: ["Potrebujem", "ísť", "na", "mestský", "úrad", "."],
  },

  [phraseKey("oddelenie", "a2-3")]: {
    sk: "Na ktorom oddelení to vybavím?",
    ua: "У якому відділі я це оформлю?",
    ru: "В каком отделе я это оформлю?",
    en: "At which department can I arrange it?",
    tokens: ["Na", "ktorom", "oddelení", "to", "vybavím", "?"],
  },

  [phraseKey("žiadateľ", "a2-3")]: {
    sk: "Žiadateľ musí vyplniť formulár.",
    ua: "Заявник має заповнити бланк.",
    ru: "Заявитель должен заполнить бланк.",
    en: "The applicant must fill out the form.",
    tokens: ["Žiadateľ", "musí", "vyplniť", "formulár", "."],
  },

  [phraseKey("žiadosť", "a2-3")]: {
    sk: "Podal som žiadosť o potvrdenie.",
    ua: "Я подав заяву на довідку.",
    ru: "Я подал заявление на справку.",
    en: "I submitted a request for a certificate.",
    tokens: ["Podal", "som", "žiadosť", "o", "potvrdenie", "."],
  },

  [phraseKey("doklad", "a2-3")]: {
    sk: "Prosím, pripravte si doklad totožnosti.",
    ua: "Будь ласка, підготуйте документ, що посвідчує особу.",
    ru: "Пожалуйста, подготовьте документ, удостоверяющий личность.",
    en: "Please prepare your identity document.",
    tokens: ["Prosím", ",", "pripravte", "si", "doklad", "totožnosti", "."],
  },

  [phraseKey("potvrdenie", "a2-3")]: {
    sk: "Potvrdenie vám pošleme e-mailom.",
    ua: "Підтвердження надішлемо вам електронною поштою.",
    ru: "Подтверждение отправим вам по e-mail.",
    en: "We will send you the confirmation by email.",
    tokens: ["Potvrdenie", "vám", "pošleme", "e-mailom", "."],
  },

  [phraseKey("poplatok", "a2-3")]: {
    sk: "Správny poplatok je desať eur.",
    ua: "Адміністративний збір — десять євро.",
    ru: "Административный сбор — десять евро.",
    en: "The administrative fee is ten euros.",
    tokens: ["Správny", "poplatok", "je", "desať", "eur", "."],
  },

  [phraseKey("objednať sa", "a2-3")]: {
    sk: "Musím sa objednať vopred.",
    ua: "Мені потрібно записатися заздалегідь.",
    ru: "Мне нужно записаться заранее.",
    en: "I have to make an appointment in advance.",
    tokens: ["Musím", "sa", "objednať", "vopred", "."],
  },

  [phraseKey("otváracie hodiny", "a2-3")]: {
    sk: "Aké sú otváracie hodiny?",
    ua: "Які години роботи?",
    ru: "Какие часы работы?",
    en: "What are the opening hours?",
    tokens: ["Aké", "sú", "otváracie", "hodiny", "?"],
  },

  [phraseKey("formulár", "a2-3")]: {
    sk: "Kde nájdem tento formulár?",
    ua: "Де я знайду цей бланк?",
    ru: "Где я найду этот бланк?",
    en: "Where can I find this form?",
    tokens: ["Kde", "nájdem", "tento", "formulár", "?"],
  },

  // =========================
  // LESSON 4 — Práca a kariéra
  // =========================
  [phraseKey("pohovor", "a2-4")]: {
    sk: "Zajtra mám pracovný pohovor.",
    ua: "Завтра маю співбесіду.",
    ru: "Завтра у меня собеседование.",
    en: "Tomorrow I have a job interview.",
    tokens: ["Zajtra", "mám", "pracovný", "pohovor", "."],
  },

  [phraseKey("životopis", "a2-4")]: {
    sk: "Pošlem vám životopis v PDF.",
    ua: "Я надішлю вам резюме у PDF.",
    ru: "Я отправлю вам резюме в PDF.",
    en: "I will send you my CV in PDF.",
    tokens: ["Pošlem", "vám", "životopis", "v", "PDF", "."],
  },

  [phraseKey("prax", "a2-4")]: {
    sk: "Mám trojročnú prax v servise.",
    ua: "У мене трирічний досвід роботи в сервісі.",
    ru: "У меня трёхлетний опыт работы в сервисе.",
    en: "I have three years of experience in service.",
    tokens: ["Mám", "trojročnú", "prax", "v", "servise", "."],
  },

  [phraseKey("zručnosť", "a2-4")]: {
    sk: "Táto zručnosť je pre túto pozíciu dôležitá.",
    ua: "Ця навичка важлива для цієї посади.",
    ru: "Этот навык важен для этой должности.",
    en: "This skill is important for this position.",
    tokens: ["Táto", "zručnosť", "je", "pre", "túto", "pozíciu", "dôležitá", "."],
  },

  [phraseKey("požiadavka", "a2-4")]: {
    sk: "Jedna požiadavka je angličtina.",
    ua: "Одна вимога — англійська.",
    ru: "Одно требование — английский.",
    en: "One requirement is English.",
    tokens: ["Jedna", "požiadavka", "je", "angličtina", "."],
  },

  [phraseKey("pracovná ponuka", "a2-4")]: {
    sk: "Našiel som zaujímavú pracovnú ponuku.",
    ua: "Я знайшов цікаву вакансію.",
    ru: "Я нашёл интересную вакансию.",
    en: "I found an interesting job offer.",
    tokens: ["Našiel", "som", "zaujímavú", "pracovnú", "ponuku", "."],
  },

  [phraseKey("pracovná pozícia", "a2-4")]: {
    sk: "Táto pracovná pozícia je na plný úväzok.",
    ua: "Ця посада на повну зайнятість.",
    ru: "Эта должность на полную занятость.",
    en: "This position is full-time.",
    tokens: ["Táto", "pracovná", "pozícia", "je", "na", "plný", "úväzok", "."],
  },

  [phraseKey("zodpovednosť", "a2-4")]: {
    sk: "Moja zodpovednosť bude komunikácia so zákazníkmi.",
    ua: "Моя відповідальність — комунікація з клієнтами.",
    ru: "Моя ответственность — коммуникация с клиентами.",
    en: "My responsibility will be communication with customers.",
    tokens: ["Moja", "zodpovednosť", "bude", "komunikácia", "so", "zákazníkmi", "."],
  },

  [phraseKey("výhody", "a2-4")]: {
    sk: "Medzi výhody patrí aj stravné.",
    ua: "Серед бонусів є також компенсація на їжу.",
    ru: "Среди бонусов есть также компенсация на еду.",
    en: "The benefits also include a meal allowance.",
    tokens: ["Medzi", "výhody", "patrí", "aj", "stravné", "."],
  },

  [phraseKey("skúšobná doba", "a2-4")]: {
    sk: "Skúšobná doba trvá tri mesiace.",
    ua: "Випробувальний термін триває три місяці.",
    ru: "Испытательный срок длится три месяца.",
    en: "The probation period lasts three months.",
    tokens: ["Skúšobná", "doba", "trvá", "tri", "mesiace", "."],
  },

  // =========================
  // LESSON 5 — Cestovanie (situácie)
  // =========================
  [phraseKey("rezervácia", "a2-5")]: {
    sk: "Moja rezervácia je na meno Novák.",
    ua: "Моє бронювання на прізвище Новак.",
    ru: "Моё бронирование на фамилию Новак.",
    en: "My reservation is under the name Novák.",
    tokens: ["Moja", "rezervácia", "je", "na", "meno", "Novák", "."],
  },

  [phraseKey("ubytovanie", "a2-5")]: {
    sk: "Hľadáme lacné ubytovanie pri stanici.",
    ua: "Шукаємо недороге проживання біля вокзалу.",
    ru: "Ищем недорогое жильё рядом с вокзалом.",
    en: "We are looking for cheap accommodation near the station.",
    tokens: ["Hľadáme", "lacné", "ubytovanie", "pri", "stanici", "."],
  },

  [phraseKey("potvrdiť", "a2-5")]: {
    sk: "Môžete mi potvrdiť rezerváciu?",
    ua: "Можете підтвердити моє бронювання?",
    ru: "Можете подтвердить моё бронирование?",
    en: "Can you confirm my reservation?",
    tokens: ["Môžete", "mi", "potvrdiť", "rezerváciu", "?"],
  },

  [phraseKey("zrušiť", "a2-5")]: {
    sk: "Chcel by som zrušiť objednávku.",
    ua: "Я хотів би скасувати замовлення.",
    ru: "Я хотел бы отменить заказ.",
    en: "I would like to cancel the order.",
    tokens: ["Chcel", "by", "som", "zrušiť", "objednávku", "."],
  },

  [phraseKey("meškanie", "a2-5")]: {
    sk: "Let má meškanie dve hodiny.",
    ua: "Рейс затримується на дві години.",
    ru: "Рейс задерживается на два часа.",
    en: "The flight is delayed by two hours.",
    tokens: ["Let", "má", "meškanie", "dve", "hodiny", "."],
  },

  [phraseKey("presun", "a2-5")]: {
    sk: "Potrebujem presun na letisko.",
    ua: "Мені потрібен трансфер до аеропорту.",
    ru: "Мне нужен трансфер в аэропорт.",
    en: "I need a transfer to the airport.",
    tokens: ["Potrebujem", "presun", "na", "letisko", "."],
  },

  [phraseKey("jednosmerný", "a2-5")]: {
    sk: "Prosím si jednosmerný lístok.",
    ua: "Будь ласка, один квиток в один бік.",
    ru: "Пожалуйста, билет в одну сторону.",
    en: "One one-way ticket, please.",
    tokens: ["Prosím", "si", "jednosmerný", "lístok", "."],
  },

  [phraseKey("spiatočný", "a2-5")]: {
    sk: "Kúpim si spiatočný lístok.",
    ua: "Я куплю квиток туди-й-назад.",
    ru: "Я куплю билет туда-обратно.",
    en: "I will buy a return ticket.",
    tokens: ["Kúpim", "si", "spiatočný", "lístok", "."],
  },

  [phraseKey("cestovné poistenie", "a2-5")]: {
    sk: "Máte cestovné poistenie?",
    ua: "У вас є туристична страховка?",
    ru: "У вас есть туристическая страховка?",
    en: "Do you have travel insurance?",
    tokens: ["Máte", "cestovné", "poistenie", "?"],
  },

  [phraseKey("batožina", "a2-5")]: {
    sk: "Moja batožina je príliš ťažká.",
    ua: "Мій багаж занадто важкий.",
    ru: "Мой багаж слишком тяжёлый.",
    en: "My luggage is too heavy.",
    tokens: ["Moja", "batožina", "je", "príliš", "ťažká", "."],
  },

  // =========================
  // LESSON 6 — Peniaze a financie
  // =========================
  [phraseKey("rozpočet", "a2-6")]: {
    sk: "Tento mesiac musím dodržať rozpočet.",
    ua: "Цього місяця я маю дотриматися бюджету.",
    ru: "В этом месяце мне нужно уложиться в бюджет.",
    en: "This month I have to stick to the budget.",
    tokens: ["Tento", "mesiac", "musím", "dodržať", "rozpočet", "."],
  },

  [phraseKey("príjem", "a2-6")]: {
    sk: "Môj mesačný príjem je stabilný.",
    ua: "Мій місячний дохід стабільний.",
    ru: "Мой месячный доход стабильный.",
    en: "My monthly income is stable.",
    tokens: ["Môj", "mesačný", "príjem", "je", "stabilný", "."],
  },

  [phraseKey("výdavky", "a2-6")]: {
    sk: "Výdavky na bývanie sú vysoké.",
    ua: "Витрати на житло високі.",
    ru: "Расходы на жильё высокие.",
    en: "Housing expenses are high.",
    tokens: ["Výdavky", "na", "bývanie", "sú", "vysoké", "."],
  },

  [phraseKey("ušetriť", "a2-6")]: {
    sk: "Chcem ušetriť na dovolenku.",
    ua: "Хочу заощадити на відпустку.",
    ru: "Хочу сэкономить на отпуск.",
    en: "I want to save money for a vacation.",
    tokens: ["Chcem", "ušetriť", "na", "dovolenku", "."],
  },

  [phraseKey("minúť", "a2-6")]: {
    sk: "Tento týždeň som minul veľa peňazí.",
    ua: "Цього тижня я витратив багато грошей.",
    ru: "На этой неделе я потратил много денег.",
    en: "This week I spent a lot of money.",
    tokens: ["Tento", "týždeň", "som", "minul", "veľa", "peňazí", "."],
  },

  [phraseKey("prevod", "a2-6")]: {
    sk: "Urobím prevod na váš účet.",
    ua: "Я зроблю переказ на ваш рахунок.",
    ru: "Я сделаю перевод на ваш счёт.",
    en: "I will make a transfer to your account.",
    tokens: ["Urobím", "prevod", "na", "váš", "účet", "."],
  },

  [phraseKey("bankový účet", "a2-6")]: {
    sk: "Mám nový bankový účet.",
    ua: "У мене новий банківський рахунок.",
    ru: "У меня новый банковский счёт.",
    en: "I have a new bank account.",
    tokens: ["Mám", "nový", "bankový", "účet", "."],
  },

  [phraseKey("trvalý príkaz", "a2-6")]: {
    sk: "Nastavil som trvalý príkaz na nájom.",
    ua: "Я налаштував постійне доручення на оренду.",
    ru: "Я настроил постоянное поручение на аренду.",
    en: "I set up a standing order for the rent.",
    tokens: ["Nastavil", "som", "trvalý", "príkaz", "na", "nájom", "."],
  },

  [phraseKey("úrok", "a2-6")]: {
    sk: "Úrok na tomto účte je nízky.",
    ua: "Відсоток на цьому рахунку низький.",
    ru: "Процент по этому счёту низкий.",
    en: "The interest on this account is low.",
    tokens: ["Úrok", "na", "tomto", "účte", "je", "nízky", "."],
  },

  [phraseKey("poplatok", "a2-6")]: {
    sk: "Banka si účtuje poplatok za výber.",
    ua: "Банк бере комісію за зняття.",
    ru: "Банк взимает комиссию за снятие.",
    en: "The bank charges a fee for withdrawal.",
    tokens: ["Banka", "si", "účtuje", "poplatok", "za", "výber", "."],
  },

  // =========================
  // LESSON 7 — Komunikácia a názory
  // =========================
  [phraseKey("podľa mňa", "a2-7")]: {
    sk: "Podľa mňa je to dobrý nápad.",
    ua: "На мою думку, це хороша ідея.",
    ru: "По-моему, это хорошая идея.",
    en: "In my opinion, it is a good idea.",
    tokens: ["Podľa", "mňa", "je", "to", "dobrý", "nápad", "."],
  },

  [phraseKey("myslím si", "a2-7")]: {
    sk: "Myslím si, že prídeme načas.",
    ua: "Я думаю, що ми прийдемо вчасно.",
    ru: "Я думаю, что мы придём вовремя.",
    en: "I think we will arrive on time.",
    tokens: ["Myslím", "si", ",", "že", "prídeme", "načas", "."],
  },

  [phraseKey("zdá sa mi", "a2-7")]: {
    sk: "Zdá sa mi, že je unavený.",
    ua: "Мені здається, що він втомлений.",
    ru: "Мне кажется, что он устал.",
    en: "It seems to me that he is tired.",
    tokens: ["Zdá", "sa", "mi", ",", "že", "je", "unavený", "."],
  },

  [phraseKey("navrhnúť", "a2-7")]: {
    sk: "Chcem navrhnúť inú možnosť.",
    ua: "Хочу запропонувати інший варіант.",
    ru: "Хочу предложить другой вариант.",
    en: "I want to suggest another option.",
    tokens: ["Chcem", "navrhnúť", "inú", "možnosť", "."],
  },

  [phraseKey("zhrnúť", "a2-7")]: {
    sk: "Na záver to zhrniem.",
    ua: "Наприкінці я це підсумую.",
    ru: "В конце я это подытожу.",
    en: "In conclusion, I will summarize it.",
    tokens: ["Na", "záver", "to", "zhrniem", "."],
  },

  [phraseKey("vyjadriť názor", "a2-7")]: {
    sk: "Môžem vyjadriť názor?",
    ua: "Можу висловити думку?",
    ru: "Можно высказать мнение?",
    en: "May I express an opinion?",
    tokens: ["Môžem", "vyjadriť", "názor", "?"],
  },

  [phraseKey("argumentovať", "a2-7")]: {
    sk: "Skúsil som argumentovať faktami.",
    ua: "Я спробував аргументувати фактами.",
    ru: "Я попытался аргументировать фактами.",
    en: "I tried to argue with facts.",
    tokens: ["Skúsil", "som", "argumentovať", "faktami", "."],
  },

  [phraseKey("presvedčiť", "a2-7")]: {
    sk: "Neviem ho presvedčiť.",
    ua: "Я не можу його переконати.",
    ru: "Я не могу его убедить.",
    en: "I cannot convince him.",
    tokens: ["Neviem", "ho", "presvedčiť", "."],
  },

  [phraseKey("spomenúť", "a2-7")]: {
    sk: "Chcel som spomenúť jednu vec.",
    ua: "Я хотів згадати одну річ.",
    ru: "Я хотел упомянуть одну вещь.",
    en: "I wanted to mention one thing.",
    tokens: ["Chcel", "som", "spomenúť", "jednu", "vec", "."],
  },

  [phraseKey("reagovať", "a2-7")]: {
    sk: "Ako budeš reagovať na tú správu?",
    ua: "Як ти відреагуєш на те повідомлення?",
    ru: "Как ты отреагируешь на это сообщение?",
    en: "How will you react to that message?",
    tokens: ["Ako", "budeš", "reagovať", "na", "tú", "správu", "?"],
  },

  // =========================
  // LESSON 8 — Čas, plány, udalosti
  // =========================
  [phraseKey("posunúť", "a2-8")]: {
    sk: "Môžeme posunúť stretnutie na pondelok?",
    ua: "Можемо перенести зустріч на понеділок?",
    ru: "Можем перенести встречу на понедельник?",
    en: "Can we move the meeting to Monday?",
    tokens: ["Môžeme", "posunúť", "stretnutie", "na", "pondelok", "?"],
  },

  [phraseKey("naplánovať", "a2-8")]: {
    sk: "Potrebujem naplánovať cestu.",
    ua: "Мені потрібно запланувати поїздку.",
    ru: "Мне нужно запланировать поездку.",
    en: "I need to plan the trip.",
    tokens: ["Potrebujem", "naplánovať", "cestu", "."],
  },

  [phraseKey("odložiť", "a2-8")]: {
    sk: "Musíme to odložiť na neskôr.",
    ua: "Ми мусимо відкласти це на потім.",
    ru: "Нам нужно отложить это на потом.",
    en: "We have to postpone it until later.",
    tokens: ["Musíme", "to", "odložiť", "na", "neskôr", "."],
  },

  [phraseKey("zúčastniť sa", "a2-8")]: {
    sk: "Chcem sa zúčastniť školenia.",
    ua: "Хочу взяти участь у навчанні.",
    ru: "Хочу принять участие в обучении.",
    en: "I want to take part in the training.",
    tokens: ["Chcem", "sa", "zúčastniť", "školenia", "."],
  },

  [phraseKey("zmeniť plán", "a2-8")]: {
    sk: "Museli sme zmeniť plán.",
    ua: "Нам довелося змінити план.",
    ru: "Нам пришлось изменить план.",
    en: "We had to change the plan.",
    tokens: ["Museli", "sme", "zmeniť", "plán", "."],
  },

  [phraseKey("konať sa", "a2-8")]: {
    sk: "Podujatie sa bude konať v sobotu.",
    ua: "Захід відбудеться в суботу.",
    ru: "Мероприятие состоится в субботу.",
    en: "The event will take place on Saturday.",
    tokens: ["Podujatie", "sa", "bude", "konať", "v", "sobotu", "."],
  },

  [phraseKey("organizovať", "a2-8")]: {
    sk: "Kto bude organizovať stretnutie?",
    ua: "Хто буде організовувати зустріч?",
    ru: "Кто будет организовывать встречу?",
    en: "Who will organize the meeting?",
    tokens: ["Kto", "bude", "organizovať", "stretnutie", "?"],
  },

  [phraseKey("uskutočniť sa", "a2-8")]: {
    sk: "Stretnutie sa uskutoční online.",
    ua: "Зустріч відбудеться онлайн.",
    ru: "Встреча состоится онлайн.",
    en: "The meeting will take place online.",
    tokens: ["Stretnutie", "sa", "uskutoční", "online", "."],
  },

  [phraseKey("meškať", "a2-8")]: {
    sk: "Prepáčte, budem meškať desať minút.",
    ua: "Вибачте, я запізнюся на десять хвилин.",
    ru: "Извините, я опоздаю на десять минут.",
    en: "Sorry, I will be ten minutes late.",
    tokens: ["Prepáčte", ",", "budem", "meškať", "desať", "minút", "."],
  },

  [phraseKey("stihnúť", "a2-8")]: {
    sk: "Stihnem posledný autobus.",
    ua: "Я встигну на останній автобус.",
    ru: "Я успею на последний автобус.",
    en: "I will catch the last bus.",
    tokens: ["Stihnem", "posledný", "autobus", "."],
  },

  // =========================
  // LESSON 9 — Nákupy a reklamácie
  // =========================
  [phraseKey("podmienky", "a2-9")]: {
    sk: "Aké sú podmienky vrátenia?",
    ua: "Які умови повернення?",
    ru: "Какие условия возврата?",
    en: "What are the return conditions?",
    tokens: ["Aké", "sú", "podmienky", "vrátenia", "?"],
  },

  [phraseKey("sťažnosť", "a2-9")]: {
    sk: "Chcem podať sťažnosť.",
    ua: "Я хочу подати скаргу.",
    ru: "Я хочу подать жалобу.",
    en: "I want to file a complaint.",
    tokens: ["Chcem", "podať", "sťažnosť", "."],
  },

  [phraseKey("peniaze späť", "a2-9")]: {
    sk: "Chcem peniaze späť.",
    ua: "Я хочу гроші назад.",
    ru: "Я хочу деньги обратно.",
    en: "I want my money back.",
    tokens: ["Chcem", "peniaze", "späť", "."],
  },

  [phraseKey("vrátenie tovaru", "a2-9")]: {
    sk: "Vrátenie tovaru je do štrnástich dní.",
    ua: "Повернення товару можливе протягом 14 днів.",
    ru: "Возврат товара возможен в течение 14 дней.",
    en: "The return of goods is possible within fourteen days.",
    tokens: ["Vrátenie", "tovaru", "je", "do", "štrnástich", "dní", "."],
  },

  [phraseKey("pokladničný blok", "a2-9")]: {
    sk: "Potrebujem pokladničný blok.",
    ua: "Мені потрібен касовий чек.",
    ru: "Мне нужен кассовый чек.",
    en: "I need the receipt.",
    tokens: ["Potrebujem", "pokladničný", "blok", "."],
  },

  [phraseKey("reklamovať", "a2-9")]: {
    sk: "Chcel by som reklamovať tento výrobok.",
    ua: "Я хотів би подати рекламацію на цей товар.",
    ru: "Я хотел бы подать рекламацию на этот товар.",
    en: "I would like to make a complaint about this product.",
    tokens: ["Chcel", "by", "som", "reklamovať", "tento", "výrobok", "."],
  },

  [phraseKey("doklad", "a2-9")]: {
    sk: "Máte k tomu doklad?",
    ua: "У вас є до цього підтвердження?",
    ru: "У вас есть к этому подтверждение?",
    en: "Do you have proof of that?",
    tokens: ["Máte", "k", "tomu", "doklad", "?"],
  },

  [phraseKey("výmena", "a2-9")]: {
    sk: "Je možná výmena za iný kus?",
    ua: "Можливий обмін на інший товар?",
    ru: "Возможен обмен на другой товар?",
    en: "Is an exchange for another item possible?",
    tokens: ["Je", "možná", "výmena", "za", "iný", "kus", "?"],
  },

  [phraseKey("lehota", "a2-9")]: {
    sk: "Aká je lehota vybavenia reklamácie?",
    ua: "Який термін розгляду рекламації?",
    ru: "Какой срок рассмотрения рекламации?",
    en: "What is the time limit for handling the complaint?",
    tokens: ["Aká", "je", "lehota", "vybavenia", "reklamácie", "?"],
  },

  [phraseKey("náhrada", "a2-9")]: {
    sk: "Dostanem náhradu alebo opravu?",
    ua: "Я отримаю компенсацію чи ремонт?",
    ru: "Я получу компенсацию или ремонт?",
    en: "Will I get compensation or a repair?",
    tokens: ["Dostanem", "náhradu", "alebo", "opravu", "?"],
  },

  // =========================
  // LESSON 10 — Počasie a príroda (rozšírené)
  // =========================
  [phraseKey("predpoveď", "a2-10")]: {
    sk: "Podľa predpovede bude pršať.",
    ua: "За прогнозом буде дощ.",
    ru: "По прогнозу будет дождь.",
    en: "According to the forecast, it will rain.",
    tokens: ["Podľa", "predpovede", "bude", "pršať", "."],
  },

  [phraseKey("polooblačno", "a2-10")]: {
    sk: "Zajtra bude polooblačno.",
    ua: "Завтра буде мінлива хмарність.",
    ru: "Завтра будет переменная облачность.",
    en: "Tomorrow it will be partly cloudy.",
    tokens: ["Zajtra", "bude", "polooblačno", "."],
  },

  [phraseKey("prehánka", "a2-10")]: {
    sk: "Poobede príde krátka prehánka.",
    ua: "Після обіду буде коротка злива.",
    ru: "После обеда будет кратковременный дождь.",
    en: "There will be a short shower in the afternoon.",
    tokens: ["Poobede", "príde", "krátka", "prehánka", "."],
  },

  [phraseKey("jasno", "a2-10")]: {
    sk: "Ráno bude jasno.",
    ua: "Вранці буде ясно.",
    ru: "Утром будет ясно.",
    en: "It will be clear in the morning.",
    tokens: ["Ráno", "bude", "jasno", "."],
  },

  [phraseKey("poľadovica", "a2-10")]: {
    sk: "Pozor, na cestách je poľadovica.",
    ua: "Обережно, на дорогах ожеледиця.",
    ru: "Осторожно, на дорогах гололёд.",
    en: "Be careful, the roads are icy.",
    tokens: ["Pozor", ",", "na", "cestách", "je", "poľadovica", "."],
  },

  [phraseKey("vlhkosť", "a2-10")]: {
    sk: "Vlhkosť je dnes vysoká.",
    ua: "Вологість сьогодні висока.",
    ru: "Влажность сегодня высокая.",
    en: "The humidity is high today.",
    tokens: ["Vlhkosť", "je", "dnes", "vysoká", "."],
  },

  [phraseKey("oblačno", "a2-10")]: {
    sk: "Dnes je oblačno a chladno.",
    ua: "Сьогодні хмарно і прохолодно.",
    ru: "Сегодня облачно и прохладно.",
    en: "Today it is cloudy and cool.",
    tokens: ["Dnes", "je", "oblačno", "a", "chladno", "."],
  },

  [phraseKey("ochladiť sa", "a2-10")]: {
    sk: "Večer sa má ochladiť.",
    ua: "Увечері має похолоднішати.",
    ru: "Вечером должно похолодать.",
    en: "It is expected to get colder in the evening.",
    tokens: ["Večer", "sa", "má", "ochladiť", "."],
  },

  [phraseKey("otepliť sa", "a2-10")]: {
    sk: "V piatok sa má otepliť.",
    ua: "У п’ятницю має потеплішати.",
    ru: "В пятницу должно потеплеть.",
    en: "It is expected to get warmer on Friday.",
    tokens: ["V", "piatok", "sa", "má", "otepliť", "."],
  },

  [phraseKey("prudký vietor", "a2-10")]: {
    sk: "Fúka prudký vietor.",
    ua: "Дме сильний вітер.",
    ru: "Дует сильный ветер.",
    en: "A strong wind is blowing.",
    tokens: ["Fúka", "prudký", "vietor", "."],
  },
};
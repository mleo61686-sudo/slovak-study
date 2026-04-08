// app/learning/phrases/b1-1.ts
import type { Phrase } from "./b1";
import { phraseKey } from "./phraseKey";

export const B1_PHRASES_1: Record<string, Phrase> = {
  // =========================
  // LESSON 1 — Robota a kariéra
  // =========================
  [phraseKey("pracovná doba", "b1-1")]: {
    sk: "Moja pracovná doba je od ôsmej do štvrtej.",
    ua: "Мій робочий час — з восьмої до четвертої.",
    ru: "Моё рабочее время — с восьми до четырёх.",
    en: "My working hours are from eight to four.",
    tokens: ["Moja", "pracovná", "doba", "je", "od", "ôsmej", "do", "štvrtej", "."],
  },

  [phraseKey("nástup", "b1-1")]: {
    sk: "Nástup do práce mám od prvého marca.",
    ua: "Початок роботи в мене з першого березня.",
    ru: "Выход на работу у меня с первого марта.",
    en: "I start work from the first of March.",
    tokens: ["Nástup", "do", "práce", "mám", "od", "prvého", "marca", "."],
  },

  [phraseKey("skúšobná doba", "b1-1")]: {
    sk: "Skúšobná doba trvá tri mesiace.",
    ua: "Випробувальний термін триває три місяці.",
    ru: "Испытательный срок длится три месяца.",
    en: "The probation period lasts three months.",
    tokens: ["Skúšobná", "doba", "trvá", "tri", "mesiace", "."],
  },

  [phraseKey("pracovný pomer", "b1-1")]: {
    sk: "Pracovný pomer mi začína po podpise zmluvy.",
    ua: "Трудові відносини починаються після підпису договору.",
    ru: "Трудовые отношения начинаются после подписания договора.",
    en: "My employment starts after signing the contract.",
    tokens: ["Pracovný", "pomer", "mi", "začína", "po", "podpise", "zmluvy", "."],
  },

  [phraseKey("výplata", "b1-1")]: {
    sk: "Výplata mi chodí vždy pätnásteho.",
    ua: "Зарплату мені виплачують завжди п’ятнадцятого числа.",
    ru: "Зарплата приходит мне всегда пятнадцатого числа.",
    en: "My salary arrives on the fifteenth every month.",
    tokens: ["Výplata", "mi", "chodí", "vždy", "pätnásteho", "."],
  },

  [phraseKey("príspevok", "b1-1")]: {
    sk: "Firma mi dáva príspevok na cestovanie.",
    ua: "Фірма доплачує мені на проїзд.",
    ru: "Компания доплачивает мне на проезд.",
    en: "The company gives me a travel allowance.",
    tokens: ["Firma", "mi", "dáva", "príspevok", "na", "cestovanie", "."],
  },

  [phraseKey("dochádzka", "b1-1")]: {
    sk: "Dochádzku si zapisujeme v aplikácii.",
    ua: "Табель ми відмічаємо в додатку.",
    ru: "Табель мы отмечаем в приложении.",
    en: "We record attendance in the app.",
    tokens: ["Dochádzku", "si", "zapisujeme", "v", "aplikácii", "."],
  },

  [phraseKey("benefit", "b1-1")]: {
    sk: "Ako benefit máme stravné a multisport kartu.",
    ua: "Як бонус у нас є харчування та мультиспорт-картка.",
    ru: "Как бонус у нас есть питание и мультиспорт-карта.",
    en: "As a benefit, we have meal vouchers and a multisport card.",
    tokens: ["Ako", "benefit", "máme", "stravné", "a", "multisport", "kartu", "."],
  },

  [phraseKey("nadriadený", "b1-1")]: {
    sk: "Môj nadriadený chce, aby som prišiel načas.",
    ua: "Мій керівник хоче, щоб я приходив вчасно.",
    ru: "Мой руководитель хочет, чтобы я приходил вовремя.",
    en: "My supervisor wants me to arrive on time.",
    tokens: ["Môj", "nadriadený", "chce", ",", "aby", "som", "prišiel", "načas", "."],
  },

  [phraseKey("podriadený", "b1-1")]: {
    sk: "Ako vedúci musím podporiť aj nového podriadeného.",
    ua: "Як керівник я маю підтримати навіть нового підлеглого.",
    ru: "Как руководитель я должен поддержать даже нового подчинённого.",
    en: "As a manager, I must support even a new subordinate.",
    tokens: ["Ako", "vedúci", "musím", "podporiť", "aj", "nového", "podriadeného", "."],
  },

  // =========================
  // LESSON 2 — Komunikácia v tíme
  // =========================
  [phraseKey("nedorozumenie", "b1-2")]: {
    sk: "Vzniklo nedorozumenie, lebo sme sa zle pochopili.",
    ua: "Виникло непорозуміння, бо ми неправильно зрозуміли одне одного.",
    ru: "Возникло недоразумение, потому что мы неправильно поняли друг друга.",
    en: "A misunderstanding arose because we misunderstood each other.",
    tokens: ["Vzniklo", "nedorozumenie", ",", "lebo", "sme", "sa", "zle", "pochopili", "."],
  },

  [phraseKey("spolupráca", "b1-2")]: {
    sk: "Spolupráca medzi oddeleniami je pre projekt kľúčová.",
    ua: "Співпраця між відділами є ключовою для проєкту.",
    ru: "Сотрудничество между отделами ключевое для проекта.",
    en: "Cooperation between departments is key for the project.",
    tokens: ["Spolupráca", "medzi", "oddeleniami", "je", "pre", "projekt", "kľúčová", "."],
  },

  [phraseKey("komunikácia", "b1-2")]: {
    sk: "Bez dobrej komunikácie sa tím rýchlo rozpadne.",
    ua: "Без хорошої комунікації команда швидко розвалиться.",
    ru: "Без хорошей коммуникации команда быстро развалится.",
    en: "Without good communication, the team will quickly fall apart.",
    tokens: ["Bez", "dobrej", "komunikácie", "sa", "tím", "rýchlo", "rozpadne", "."],
  },

  [phraseKey("vyjadriť sa", "b1-2")]: {
    sk: "Môžeš sa k tomu vyjadriť ešte dnes?",
    ua: "Можеш висловитися щодо цього ще сьогодні?",
    ru: "Можешь высказаться по этому поводу ещё сегодня?",
    en: "Can you comment on it today?",
    tokens: ["Môžeš", "sa", "k", "tomu", "vyjadriť", "ešte", "dnes", "?"],
  },

  [phraseKey("navrhnúť", "b1-2")]: {
    sk: "Navrhol som riešenie, ktoré šetrí čas aj peniaze.",
    ua: "Я запропонував рішення, яке економить час і гроші.",
    ru: "Я предложил решение, которое экономит время и деньги.",
    en: "I proposed a solution that saves both time and money.",
    tokens: ["Navrhol", "som", "riešenie", ",", "ktoré", "šetrí", "čas", "aj", "peniaze", "."],
  },

  [phraseKey("súhlas", "b1-2")]: {
    sk: "Potrebujem tvoj súhlas, aby sme mohli pokračovať.",
    ua: "Мені потрібна твоя згода, щоб ми могли продовжити.",
    ru: "Мне нужно твоё согласие, чтобы мы могли продолжить.",
    en: "I need your approval so we can continue.",
    tokens: ["Potrebujem", "tvoj", "súhlas", ",", "aby", "sme", "mohli", "pokračovať", "."],
  },

  [phraseKey("nesúhlas", "b1-2")]: {
    sk: "Vyjadril nesúhlas, ale navrhol aj alternatívu.",
    ua: "Він висловив незгоду, але запропонував і альтернативу.",
    ru: "Он выразил несогласие, но предложил и альтернативу.",
    en: "He expressed disagreement but also suggested an alternative.",
    tokens: ["Vyjadril", "nesúhlas", ",", "ale", "navrhol", "aj", "alternatívu", "."],
  },

  [phraseKey("vysvetlenie", "b1-2")]: {
    sk: "Ďakujem za vysvetlenie, už je mi to jasné.",
    ua: "Дякую за пояснення, тепер мені все ясно.",
    ru: "Спасибо за объяснение, теперь мне всё ясно.",
    en: "Thank you for the explanation, it is clear now.",
    tokens: ["Ďakujem", "za", "vysvetlenie", ",", "už", "je", "mi", "to", "jasné", "."],
  },

  [phraseKey("upozorniť", "b1-2")]: {
    sk: "Chcem ťa upozorniť, že termín sa blíži.",
    ua: "Хочу звернути твою увагу, що термін наближається.",
    ru: "Хочу предупредить, что срок приближается.",
    en: "I want to warn you that the deadline is approaching.",
    tokens: ["Chcem", "ťa", "upozorniť", ",", "že", "termín", "sa", "blíži", "."],
  },

  [phraseKey("reagovať", "b1-2")]: {
    sk: "Ak sa niečo zmení, reaguj prosím hneď.",
    ua: "Якщо щось зміниться, відреагуй, будь ласка, одразу.",
    ru: "Если что-то изменится, отреагируй, пожалуйста, сразу.",
    en: "If anything changes, please respond immediately.",
    tokens: ["Ak", "sa", "niečo", "zmení", ",", "reaguj", "prosím", "hneď", "."],
  },

  // =========================
  // LESSON 3 — Cestovanie a doprava
  // =========================
  [phraseKey("príručná batožina", "b1-3")]: {
    sk: "Príručnú batožinu si beriem so sebou do kabíny.",
    ua: "Ручну поклажу я беру з собою в салон.",
    ru: "Ручную кладь я беру с собой в салон.",
    en: "I take my carry-on luggage with me into the cabin.",
    tokens: ["Príručnú", "batožinu", "si", "beriem", "so", "sebou", "do", "kabíny", "."],
  },

  [phraseKey("nástup", "b1-3")]: {
    sk: "Nástup do lietadla začne o dvadsať minút.",
    ua: "Посадка на літак почнеться за двадцять хвилин.",
    ru: "Посадка на самолёт начнётся через двадцать минут.",
    en: "Boarding will start in twenty minutes.",
    tokens: ["Nástup", "do", "lietadla", "začne", "o", "dvadsať", "minút", "."],
  },

  [phraseKey("cestujúci", "b1-3")]: {
    sk: "Cestujúci musia mať lístok pripravený na kontrolu.",
    ua: "Пасажири повинні мати готовий квиток до перевірки.",
    ru: "Пассажиры должны иметь билет готовым к проверке.",
    en: "Passengers must have their ticket ready for inspection.",
    tokens: ["Cestujúci", "musia", "mať", "lístok", "pripravený", "na", "kontrolu", "."],
  },

  [phraseKey("zrušenie", "b1-3")]: {
    sk: "Zrušenie spoja nám spôsobilo veľké meškanie.",
    ua: "Скасування рейсу спричинило нам велике запізнення.",
    ru: "Отмена рейса вызвала у нас большую задержку.",
    en: "The cancellation caused us a big delay.",
    tokens: ["Zrušenie", "spoja", "nám", "spôsobilo", "veľké", "meškanie", "."],
  },

  [phraseKey("prestupovať", "b1-3")]: {
    sk: "V Bratislave budeme prestupovať na rýchlik.",
    ua: "У Братиславі ми будемо робити пересадку на швидкий потяг.",
    ru: "В Братиславе мы будем делать пересадку на скорый поезд.",
    en: "We will transfer to an express train in Bratislava.",
    tokens: ["V", "Bratislave", "budeme", "prestupovať", "na", "rýchlik", "."],
  },

  [phraseKey("cestovný doklad", "b1-3")]: {
    sk: "Bez cestovného dokladu ťa do vlaku nepustia.",
    ua: "Без проїзного документа тебе не пустять у потяг.",
    ru: "Без проездного документа тебя не пустят в поезд.",
    en: "Without a travel document, you will not be allowed on the train.",
    tokens: ["Bez", "cestovného", "dokladu", "ťa", "do", "vlaku", "nepustia", "."],
  },

  [phraseKey("bezpečnostná kontrola", "b1-3")]: {
    sk: "Na bezpečnostnej kontrole si musím vybrať opasok.",
    ua: "На контролі безпеки я маю зняти ремінь.",
    ru: "На контроле безопасности я должен снять ремень.",
    en: "At security control, I have to take off my belt.",
    tokens: ["Na", "bezpečnostnej", "kontrole", "si", "musím", "vybrať", "opasok", "."],
  },

  [phraseKey("palubný lístok", "b1-3")]: {
    sk: "Palubný lístok si uložím do mobilu aj do peňaženky.",
    ua: "Посадковий талон збережу і в телефоні, і в гаманці.",
    ru: "Посадочный талон сохраню и в телефоне, и в кошельке.",
    en: "I will save my boarding pass in my phone and wallet.",
    tokens: ["Palubný", "lístok", "si", "uložím", "do", "mobilu", "aj", "do", "peňaženky", "."],
  },

  [phraseKey("odovzdať batožinu", "b1-3")]: {
    sk: "Pri prepážke musím odovzdať batožinu.",
    ua: "На стійці реєстрації я маю здати багаж.",
    ru: "У стойки регистрации я должен сдать багаж.",
    en: "At the counter, I have to check in my luggage.",
    tokens: ["Pri", "prepážke", "musím", "odovzdať", "batožinu", "."],
  },

  [phraseKey("colná kontrola", "b1-3")]: {
    sk: "Na colnej kontrole sa ma pýtali, čo prevážam.",
    ua: "На митному контролі мене питали, що я везу.",
    ru: "На таможенном контроле меня спрашивали, что я везу.",
    en: "At customs, they asked me what I was carrying.",
    tokens: ["Na", "colnej", "kontrole", "sa", "ma", "pýtali", ",", "čo", "prevážam", "."],
  },

  // =========================
  // LESSON 4 — Zdravie a lekár
  // =========================
  [phraseKey("liečba", "b1-4")]: {
    sk: "Liečba bude trvať asi dva týždne.",
    ua: "Лікування триватиме приблизно два тижні.",
    ru: "Лечение будет длиться примерно две недели.",
    en: "The treatment will last about two weeks.",
    tokens: ["Liečba", "bude", "trvať", "asi", "dva", "týždne", "."],
  },

  [phraseKey("vyšetriť", "b1-4")]: {
    sk: "Lekár ma vyšetrel a odporučil mi oddych.",
    ua: "Лікар мене оглянув і порадив відпочинок.",
    ru: "Врач меня осмотрел и посоветовал отдых.",
    en: "The doctor examined me and recommended rest.",
    tokens: ["Lekár", "ma", "vyšetrel", "a", "odporučil", "mi", "oddych", "."],
  },

  [phraseKey("predpísať", "b1-4")]: {
    sk: "Doktorka mi predpísala antibiotiká.",
    ua: "Лікарка призначила мені антибіотики.",
    ru: "Врач назначила мне антибиотики.",
    en: "The doctor prescribed antibiotics for me.",
    tokens: ["Doktorka", "mi", "predpísala", "antibiotiká", "."],
  },

  [phraseKey("zhoršiť sa", "b1-4")]: {
    sk: "V noci sa mi stav zhoršil a mal som horúčku.",
    ua: "Вночі мій стан погіршився, і в мене була температура.",
    ru: "Ночью моё состояние ухудшилось, и у меня была температура.",
    en: "At night my condition got worse and I had a fever.",
    tokens: ["V", "noci", "sa", "mi", "stav", "zhoršil", "a", "mal", "som", "horúčku", "."],
  },

  [phraseKey("zlepšiť sa", "b1-4")]: {
    sk: "Po liekoch sa mi výrazne zlepšilo dýchanie.",
    ua: "Після ліків у мене помітно покращилося дихання.",
    ru: "После лекарств у меня заметно улучшилось дыхание.",
    en: "After the medicine, my breathing improved significantly.",
    tokens: ["Po", "liekoch", "sa", "mi", "výrazne", "zlepšilo", "dýchanie", "."],
  },

  [phraseKey("hospitalizácia", "b1-4")]: {
    sk: "Hospitalizácia nebola nutná, stačila domáca liečba.",
    ua: "Госпіталізація не була потрібна, вистачило домашнього лікування.",
    ru: "Госпитализация не понадобилась, хватило домашнего лечения.",
    en: "Hospitalization was not necessary, home treatment was enough.",
    tokens: ["Hospitalizácia", "nebola", "nutná", ",", "stačila", "domáca", "liečba", "."],
  },

  [phraseKey("príznak", "b1-4")]: {
    sk: "Hlavný príznak bol silný kašeľ.",
    ua: "Головним симптомом був сильний кашель.",
    ru: "Главным симптомом был сильный кашель.",
    en: "The main symptom was a strong cough.",
    tokens: ["Hlavný", "príznak", "bol", "silný", "kašeľ", "."],
  },

  [phraseKey("zdravotný stav", "b1-4")]: {
    sk: "Môj zdravotný stav sa postupne stabilizuje.",
    ua: "Мій стан здоров’я поступово стабілізується.",
    ru: "Моё состояние здоровья постепенно стабилизируется.",
    en: "My health condition is gradually stabilizing.",
    tokens: ["Môj", "zdravotný", "stav", "sa", "postupne", "stabilizuje", "."],
  },

  [phraseKey("zotavenie", "b1-4")]: {
    sk: "Na úplné zotavenie potrebujem ešte pár dní.",
    ua: "Для повного одужання мені потрібно ще кілька днів.",
    ru: "Для полного выздоровления мне нужно ещё несколько дней.",
    en: "I still need a few more days for full recovery.",
    tokens: ["Na", "úplné", "zotavenie", "potrebujem", "ešte", "pár", "dní", "."],
  },

  [phraseKey("predpis", "b1-4")]: {
    sk: "Dodržiavam predpis a beriem lieky pravidelne.",
    ua: "Я дотримуюся призначення і приймаю ліки регулярно.",
    ru: "Я соблюдаю предписание и принимаю лекарства регулярно.",
    en: "I follow the prescription and take the medicine regularly.",
    tokens: ["Dodržiavam", "predpis", "a", "beriem", "lieky", "pravidelne", "."],
  },

  // =========================
  // LESSON 5 — Emócie a vzťahy
  // =========================
  [phraseKey("hádka", "b1-5")]: {
    sk: "Včera sme mali hádku kvôli maličkosti.",
    ua: "Вчора ми посварилися через дрібницю.",
    ru: "Вчера мы поссорились из-за мелочи.",
    en: "Yesterday we had an argument over something small.",
    tokens: ["Včera", "sme", "mali", "hádku", "kvôli", "maličkosti", "."],
  },

  [phraseKey("zmierenie", "b1-5")]: {
    sk: "Po rozhovore prišlo zmierenie a úľava.",
    ua: "Після розмови настало примирення і полегшення.",
    ru: "После разговора пришло примирение и облегчение.",
    en: "After the conversation came reconciliation and relief.",
    tokens: ["Po", "rozhovore", "prišlo", "zmierenie", "a", "úľava", "."],
  },

  [phraseKey("sklamať", "b1-5")]: {
    sk: "Nechcel som ťa sklamať, len som to nestihol.",
    ua: "Я не хотів тебе розчарувати, я просто не встиг.",
    ru: "Я не хотел тебя разочаровать, я просто не успел.",
    en: "I did not want to disappoint you, I just did not make it.",
    tokens: ["Nechcel", "som", "ťa", "sklamať", ",", "len", "som", "to", "nestihol", "."],
  },

  [phraseKey("oceniť", "b1-5")]: {
    sk: "Veľmi si vážim, že to vieš oceniť.",
    ua: "Я дуже ціную, що ти вмієш це оцінити.",
    ru: "Я очень ценю, что ты умеешь это оценить.",
    en: "I really appreciate that you can value it.",
    tokens: ["Veľmi", "si", "vážim", ",", "že", "to", "vieš", "oceniť", "."],
  },

  [phraseKey("žiarlivosť", "b1-5")]: {
    sk: "Žiarlivosť často zničí aj dobrý vzťah.",
    ua: "Ревнощі часто руйнують навіть хороші стосунки.",
    ru: "Ревность часто разрушает даже хорошие отношения.",
    en: "Jealousy often destroys even a good relationship.",
    tokens: ["Žiarlivosť", "často", "zničí", "aj", "dobrý", "vzťah", "."],
  },

  [phraseKey("odpustiť", "b1-5")]: {
    sk: "Dokážem odpustiť, ale potrebujem čas.",
    ua: "Я можу пробачити, але мені потрібен час.",
    ru: "Я могу простить, но мне нужно время.",
    en: "I can forgive, but I need time.",
    tokens: ["Dokážem", "odpustiť", ",", "ale", "potrebujem", "čas", "."],
  },

  [phraseKey("rešpekt", "b1-5")]: {
    sk: "Bez rešpektu sa nedá budovať dôvera.",
    ua: "Без поваги неможливо будувати довіру.",
    ru: "Без уважения невозможно строить доверие.",
    en: "Without respect, trust cannot be built.",
    tokens: ["Bez", "rešpektu", "sa", "nedá", "budovať", "dôvera", "."],
  },

  [phraseKey("uraziť sa", "b1-5")]: {
    sk: "Neuraz sa, len som povedal svoj názor.",
    ua: "Не ображайся, я просто сказав свою думку.",
    ru: "Не обижайся, я просто сказал своё мнение.",
    en: "Do not be offended, I just said my opinion.",
    tokens: ["Neuraz", "sa", ",", "len", "som", "povedal", "svoj", "názor", "."],
  },

  [phraseKey("zblížiť sa", "b1-5")]: {
    sk: "Na výlete sme sa viac zblížili.",
    ua: "Під час поїздки ми більше зблизилися.",
    ru: "Во время поездки мы больше сблизились.",
    en: "We grew closer during the trip.",
    tokens: ["Na", "výlete", "sme", "sa", "viac", "zblížili", "."],
  },

  [phraseKey("vzťah", "b1-5")]: {
    sk: "Dobrý vzťah stojí na úprimnosti a komunikácii.",
    ua: "Хороші стосунки тримаються на щирості та спілкуванні.",
    ru: "Хорошие отношения держатся на искренности и общении.",
    en: "A good relationship is based on honesty and communication.",
    tokens: ["Dobrý", "vzťah", "stojí", "na", "úprimnosti", "a", "komunikácii", "."],
  },

  // =========================
  // LESSON 6 — Vzdelávanie a učenie
  // =========================
  [phraseKey("seminár", "b1-6")]: {
    sk: "Zajtra mám seminár, tak si pripravím poznámky.",
    ua: "Завтра в мене семінар, тож підготую нотатки.",
    ru: "Завтра у меня семинар, поэтому подготовлю заметки.",
    en: "Tomorrow I have a seminar, so I will prepare my notes.",
    tokens: ["Zajtra", "mám", "seminár", ",", "tak", "si", "pripravím", "poznámky", "."],
  },

  [phraseKey("zadanie", "b1-6")]: {
    sk: "Zadanie musím odovzdať do piatku.",
    ua: "Завдання потрібно здати до п’ятниці.",
    ru: "Задание нужно сдать до пятницы.",
    en: "I have to submit the assignment by Friday.",
    tokens: ["Zadanie", "musím", "odovzdať", "do", "piatku", "."],
  },

  [phraseKey("hodnotenie", "b1-6")]: {
    sk: "Hodnotenie bude spravodlivé, ak splníš kritériá.",
    ua: "Оцінювання буде справедливим, якщо ти виконаєш критерії.",
    ru: "Оценивание будет справедливым, если ты выполнишь критерии.",
    en: "The assessment will be fair if you meet the criteria.",
    tokens: ["Hodnotenie", "bude", "spravodlivé", ",", "ak", "splníš", "kritériá", "."],
  },

  [phraseKey("sústredenie", "b1-6")]: {
    sk: "Na skúške potrebujem úplné sústredenie.",
    ua: "На іспиті мені потрібна повна концентрація.",
    ru: "На экзамене мне нужна полная концентрация.",
    en: "I need complete concentration during the exam.",
    tokens: ["Na", "skúške", "potrebujem", "úplné", "sústredenie", "."],
  },

  [phraseKey("zlepšenie", "b1-6")]: {
    sk: "Vidím zlepšenie, lebo robím menej chýb.",
    ua: "Я бачу покращення, бо роблю менше помилок.",
    ru: "Я вижу улучшение, потому что делаю меньше ошибок.",
    en: "I see improvement because I make fewer mistakes.",
    tokens: ["Vidím", "zlepšenie", ",", "lebo", "robím", "menej", "chýb", "."],
  },

  [phraseKey("známka", "b1-6")]: {
    sk: "Za test som dostal známku jedna.",
    ua: "За тест я отримав оцінку «один».",
    ru: "За тест я получил оценку «единица».",
    en: "I got the top grade on the test.",
    tokens: ["Za", "test", "som", "dostal", "známku", "jedna", "."],
  },

  [phraseKey("ročník", "b1-6")]: {
    sk: "Som v druhom ročníku a mám viac praxe.",
    ua: "Я на другому курсі й маю більше практики.",
    ru: "Я на втором курсе и у меня больше практики.",
    en: "I am in the second year and I have more practical experience.",
    tokens: ["Som", "v", "druhom", "ročníku", "a", "mám", "viac", "praxe", "."],
  },

  [phraseKey("prednášať", "b1-6")]: {
    sk: "Profesor bude prednášať o histórii Slovenska.",
    ua: "Професор читатиме лекцію про історію Словаччини.",
    ru: "Профессор будет читать лекцию об истории Словакии.",
    en: "The professor will lecture about the history of Slovakia.",
    tokens: ["Profesor", "bude", "prednášať", "o", "histórii", "Slovenska", "."],
  },

  [phraseKey("vypracovať", "b1-6")]: {
    sk: "Musím vypracovať projekt podľa pokynov.",
    ua: "Мені треба виконати проєкт за інструкціями.",
    ru: "Мне нужно выполнить проект по инструкциям.",
    en: "I have to complete the project according to the instructions.",
    tokens: ["Musím", "vypracovať", "projekt", "podľa", "pokynov", "."],
  },

  [phraseKey("termín odovzdania", "b1-6")]: {
    sk: "Termín odovzdania je v pondelok o polnoci.",
    ua: "Термін здачі — у понеділок опівночі.",
    ru: "Срок сдачи — в понедельник в полночь.",
    en: "The submission deadline is Monday at midnight.",
    tokens: ["Termín", "odovzdania", "je", "v", "pondelok", "o", "polnoci", "."],
  },

  // =========================
  // LESSON 7 — Technológie a internet
  // =========================
  [phraseKey("nastavenie", "b1-7")]: {
    sk: "V nastavení si môžem zmeniť jazyk aplikácie.",
    ua: "У налаштуваннях я можу змінити мову додатка.",
    ru: "В настройках я могу изменить язык приложения.",
    en: "In the settings, I can change the app language.",
    tokens: ["V", "nastavení", "si", "môžem", "zmeniť", "jazyk", "aplikácie", "."],
  },

  [phraseKey("heslo", "b1-7")]: {
    sk: "Heslo si radšej pravidelne mením.",
    ua: "Пароль я краще регулярно змінюю.",
    ru: "Пароль я лучше регулярно меняю.",
    en: "I prefer to change my password regularly.",
    tokens: ["Heslo", "si", "radšej", "pravidelne", "mením", "."],
  },

  [phraseKey("prihlásenie", "b1-7")]: {
    sk: "Prihlásenie nefunguje, lebo som zabudol heslo.",
    ua: "Вхід не працює, бо я забув пароль.",
    ru: "Вход не работает, потому что я забыл пароль.",
    en: "The login does not work because I forgot the password.",
    tokens: ["Prihlásenie", "nefunguje", ",", "lebo", "som", "zabudol", "heslo", "."],
  },

  [phraseKey("súkromie", "b1-7")]: {
    sk: "Záleží mi na súkromí, preto mám profil nastavený ako súkromný.",
    ua: "Мені важлива приватність, тому профіль у мене приватний.",
    ru: "Мне важна приватность, поэтому профиль у меня закрытый.",
    en: "Privacy matters to me, so I have my profile set to private.",
    tokens: ["Záleží", "mi", "na", "súkromí", ",", "preto", "mám", "profil", "nastavený", "ako", "súkromný", "."],
  },

  [phraseKey("nahrať", "b1-7")]: {
    sk: "Chcem nahrať fotky, ale internet je pomalý.",
    ua: "Хочу завантажити фото, але інтернет повільний.",
    ru: "Хочу загрузить фото, но интернет медленный.",
    en: "I want to upload photos, but the internet is slow.",
    tokens: ["Chcem", "nahrať", "fotky", ",", "ale", "internet", "je", "pomalý", "."],
  },

  [phraseKey("zdieľať", "b1-7")]: {
    sk: "Môžeš to zdieľať s tímom cez odkaz.",
    ua: "Можеш поділитися цим з командою через посилання.",
    ru: "Можешь поделиться этим с командой через ссылку.",
    en: "You can share it with the team via a link.",
    tokens: ["Môžeš", "to", "zdieľať", "s", "tímom", "cez", "odkaz", "."],
  },

  [phraseKey("prehliadač", "b1-7")]: {
    sk: "V prehliadači mám otvorených príliš veľa kariet.",
    ua: "У браузері в мене відкрито занадто багато вкладок.",
    ru: "В браузере у меня открыто слишком много вкладок.",
    en: "I have too many tabs open in the browser.",
    tokens: ["V", "prehliadači", "mám", "otvorených", "príliš", "veľa", "kariet", "."],
  },

  [phraseKey("aplikácia", "b1-7")]: {
    sk: "Táto aplikácia mi uľahčuje plánovanie.",
    ua: "Цей додаток полегшує мені планування.",
    ru: "Это приложение облегчает мне планирование.",
    en: "This app makes planning easier for me.",
    tokens: ["Táto", "aplikácia", "mi", "uľahčuje", "plánovanie", "."],
  },

  [phraseKey("vyhľadávať", "b1-7")]: {
    sk: "Neviem to nájsť, skúsim vyhľadávať podľa názvu.",
    ua: "Не можу знайти, спробую пошукати за назвою.",
    ru: "Не могу найти, попробую поискать по названию.",
    en: "I cannot find it, I will try searching by name.",
    tokens: ["Neviem", "to", "nájsť", ",", "skúsim", "vyhľadávať", "podľa", "názvu", "."],
  },

  [phraseKey("ochrana údajov", "b1-7")]: {
    sk: "Ochrana údajov je dôležitá, najmä pri online platbách.",
    ua: "Захист даних важливий, особливо під час онлайн-оплат.",
    ru: "Защита данных важна, особенно при онлайн-платежах.",
    en: "Data protection is important, especially during online payments.",
    tokens: ["Ochrana", "údajov", "je", "dôležitá", ",", "najmä", "pri", "online", "platbách", "."],
  },

  // =========================
  // LESSON 8 — Financie a nákupy
  // =========================
  [phraseKey("splátka", "b1-8")]: {
    sk: "Mesačná splátka je pre mňa prijateľná.",
    ua: "Щомісячний платіж частинами для мене прийнятний.",
    ru: "Ежемесячный платёж в рассрочку для меня приемлемый.",
    en: "The monthly installment is acceptable for me.",
    tokens: ["Mesačná", "splátka", "je", "pre", "mňa", "prijateľná", "."],
  },

  [phraseKey("pokladničný doklad", "b1-8")]: {
    sk: "Pokladničný doklad si nechám pre prípad reklamácie.",
    ua: "Чек залишу на випадок рекламації.",
    ru: "Чек оставлю на случай рекламации.",
    en: "I will keep the receipt in case of a complaint.",
    tokens: ["Pokladničný", "doklad", "si", "nechám", "pre", "prípad", "reklamácie", "."],
  },

  [phraseKey("predajca", "b1-8")]: {
    sk: "Predajca mi poradil vhodný model.",
    ua: "Продавець порадив мені відповідну модель.",
    ru: "Продавец посоветовал мне подходящую модель.",
    en: "The seller recommended a suitable model to me.",
    tokens: ["Predajca", "mi", "poradil", "vhodný", "model", "."],
  },

  [phraseKey("pôžička", "b1-8")]: {
    sk: "Pôžičku si vezmem len vtedy, ak to bude naozaj nutné.",
    ua: "Позику візьму лише тоді, якщо це буде справді необхідно.",
    ru: "Я возьму кредит только тогда, если это будет действительно нужно.",
    en: "I will take a loan only if it is really necessary.",
    tokens: ["Pôžičku", "si", "vezmem", "len", "vtedy", ",", "ak", "to", "bude", "naozaj", "nutné", "."],
  },

  [phraseKey("úrok", "b1-8")]: {
    sk: "Úrok závisí od banky a od dĺžky splácania.",
    ua: "Відсоток залежить від банку та тривалості виплат.",
    ru: "Процент зависит от банка и срока выплаты.",
    en: "The interest rate depends on the bank and the repayment period.",
    tokens: ["Úrok", "závisí", "od", "banky", "a", "od", "dĺžky", "splácania", "."],
  },

  [phraseKey("dlh", "b1-8")]: {
    sk: "Nechcem mať dlh, preto si všetko plánujem dopredu.",
    ua: "Я не хочу мати борг, тому все планую наперед.",
    ru: "Я не хочу иметь долг, поэтому всё планирую заранее.",
    en: "I do not want to have debt, so I plan everything in advance.",
    tokens: ["Nechcem", "mať", "dlh", ",", "preto", "si", "všetko", "plánujem", "dopredu", "."],
  },

  [phraseKey("výpis z účtu", "b1-8")]: {
    sk: "Výpis z účtu si stiahnem v internet bankingu.",
    ua: "Виписку з рахунку завантажу в інтернет-банкінгу.",
    ru: "Выписку со счёта скачаю в интернет-банкинге.",
    en: "I will download the bank statement in internet banking.",
    tokens: ["Výpis", "z", "účtu", "si", "stiahnem", "v", "internet", "bankingu", "."],
  },

  [phraseKey("zostatok", "b1-8")]: {
    sk: "Skontroloval som zostatok a zistil som, že mi chýbajú peniaze.",
    ua: "Я перевірив залишок і побачив, що мені не вистачає грошей.",
    ru: "Я проверил остаток и увидел, что мне не хватает денег.",
    en: "I checked the balance and found out that I am short of money.",
    tokens: ["Skontroloval", "som", "zostatok", "a", "zistil", "som", ",", "že", "mi", "chýbajú", "peniaze", "."],
  },

  [phraseKey("zamietnuť", "b1-8")]: {
    sk: "Banke môžu žiadosť zamietnuť, ak chýbajú doklady.",
    ua: "Банк може відхилити заявку, якщо бракує документів.",
    ru: "Банк может отклонить заявку, если не хватает документов.",
    en: "The bank may reject the application if documents are missing.",
    tokens: ["Banke", "môžu", "žiadosť", "zamietnuť", ",", "ak", "chýbajú", "doklady", "."],
  },

  [phraseKey("splatnosť", "b1-8")]: {
    sk: "Splatnosť faktúry je do desiatich dní.",
    ua: "Термін погашення рахунку — до десяти днів.",
    ru: "Срок оплаты счета — до десяти дней.",
    en: "The invoice is due within ten days.",
    tokens: ["Splatnosť", "faktúry", "je", "do", "desiatich", "dní", "."],
  },

  // =========================
  // LESSON 9 — Dom: opravy a služby
  // =========================
  [phraseKey("montáž", "b1-9")]: {
    sk: "Montáž novej práčky trvala len pol hodiny.",
    ua: "Монтаж нової пральної машини тривав лише пів години.",
    ru: "Монтаж новой стиральной машины занял всего полчаса.",
    en: "The installation of the new washing machine took only half an hour.",
    tokens: ["Montáž", "novej", "práčky", "trvala", "len", "pol", "hodiny", "."],
  },

  [phraseKey("technická podpora", "b1-9")]: {
    sk: "Technická podpora mi odpísala do desiatich minút.",
    ua: "Техпідтримка відповіла мені за десять хвилин.",
    ru: "Техподдержка ответила мне за десять минут.",
    en: "Technical support replied to me within ten minutes.",
    tokens: ["Technická", "podpora", "mi", "odpísala", "do", "desiatich", "minút", "."],
  },

  [phraseKey("údržba", "b1-9")]: {
    sk: "Pravidelná údržba predĺži životnosť zariadenia.",
    ua: "Регулярне обслуговування продовжить термін служби пристрою.",
    ru: "Регулярное обслуживание продлит срок службы устройства.",
    en: "Regular maintenance will extend the life of the device.",
    tokens: ["Pravidelná", "údržba", "predĺži", "životnosť", "zariadenia", "."],
  },

  [phraseKey("objednať servis", "b1-9")]: {
    sk: "Musím si objednať servis, lebo to už nefunguje správne.",
    ua: "Мені треба викликати сервіс, бо це вже працює неправильно.",
    ru: "Мне нужно вызвать сервис, потому что это уже работает неправильно.",
    en: "I have to book service because it no longer works properly.",
    tokens: ["Musím", "si", "objednať", "servis", ",", "lebo", "to", "už", "nefunguje", "správne", "."],
  },

  [phraseKey("zmluvný servis", "b1-9")]: {
    sk: "Radšej pôjdem do zmluvného servisu, aby som nestratil záruku.",
    ua: "Краще піду в офіційний сервіс, щоб не втратити гарантію.",
    ru: "Лучше пойду в официальный сервис, чтобы не потерять гарантию.",
    en: "I would rather go to an authorized service center so I do not lose the warranty.",
    tokens: ["Radšej", "pôjdem", "do", "zmluvného", "servisu", ",", "aby", "som", "nestratil", "záruku", "."],
  },

  [phraseKey("porucha zariadenia", "b1-9")]: {
    sk: "Porucha zariadenia sa objavila hneď po výpadku elektriny.",
    ua: "Поломка пристрою з’явилася одразу після відключення електрики.",
    ru: "Поломка устройства появилась сразу после отключения электричества.",
    en: "The device malfunction occurred right after the power outage.",
    tokens: ["Porucha", "zariadenia", "sa", "objavila", "hneď", "po", "výpadku", "elektriny", "."],
  },

  [phraseKey("oprava na mieste", "b1-9")]: {
    sk: "Oprava na mieste je rýchlejšia než posielať to do servisu.",
    ua: "Ремонт на місці швидший, ніж відправляти це в сервіс.",
    ru: "Ремонт на месте быстрее, чем отправлять это в сервис.",
    en: "On-site repair is faster than sending it to a service center.",
    tokens: ["Oprava", "na", "mieste", "je", "rýchlejšia", "než", "posielať", "to", "do", "servisu", "."],
  },

  [phraseKey("zásah technika", "b1-9")]: {
    sk: "Zásah technika je v cene, ak je zariadenie v záruke.",
    ua: "Виїзд майстра входить у вартість, якщо пристрій на гарантії.",
    ru: "Выезд техника входит в стоимость, если устройство на гарантии.",
    en: "The technician’s visit is included in the price if the device is under warranty.",
    tokens: ["Zásah", "technika", "je", "v", "cene", ",", "ak", "je", "zariadenie", "v", "záruke", "."],
  },

  [phraseKey("pracovný postup", "b1-9")]: {
    sk: "Dodržiavame pracovný postup, aby sa predišlo chybám.",
    ua: "Ми дотримуємося робочої процедури, щоб уникнути помилок.",
    ru: "Мы соблюдаем рабочую процедуру, чтобы избежать ошибок.",
    en: "We follow the work procedure to avoid mistakes.",
    tokens: ["Dodržiavame", "pracovný", "postup", ",", "aby", "sa", "predišlo", "chybám", "."],
  },

  [phraseKey("odstrániť chybu", "b1-9")]: {
    sk: "Technik prišiel odstrániť chybu ešte v ten istý deň.",
    ua: "Майстер прийшов усунути несправність того ж дня.",
    ru: "Техник пришёл устранить неисправность в тот же день.",
    en: "The technician came to fix the fault the very same day.",
    tokens: ["Technik", "prišiel", "odstrániť", "chybu", "ešte", "v", "ten", "istý", "deň", "."],
  },

  // =========================
  // LESSON 10 — Komunikácia a médiá
  // =========================
  [phraseKey("rozhovor", "b1-10")]: {
    sk: "Viedli sme rozhovor o tom, čo sa zmenilo v tíme.",
    ua: "Ми провели розмову про те, що змінилося в команді.",
    ru: "Мы провели разговор о том, что изменилось в команде.",
    en: "We had a conversation about what changed in the team.",
    tokens: ["Viedli", "sme", "rozhovor", "o", "tom", ",", "čo", "sa", "zmenilo", "v", "tíme", "."],
  },

  [phraseKey("reportáž", "b1-10")]: {
    sk: "Pozeral som reportáž o situácii v Európe.",
    ua: "Я дивився репортаж про ситуацію в Європі.",
    ru: "Я смотрел репортаж о ситуации в Европе.",
    en: "I watched a report about the situation in Europe.",
    tokens: ["Pozeral", "som", "reportáž", "o", "situácii", "v", "Európe", "."],
  },

  [phraseKey("tlačová správa", "b1-10")]: {
    sk: "Spoločnosť vydala tlačovú správu k novému produktu.",
    ua: "Компанія випустила пресреліз щодо нового продукту.",
    ru: "Компания выпустила пресс-релиз по поводу нового продукта.",
    en: "The company issued a press release about the new product.",
    tokens: ["Spoločnosť", "vydala", "tlačovú", "správu", "k", "novému", "produktu", "."],
  },

  [phraseKey("sledovať", "b1-10")]: {
    sk: "Sledujem správy, ale overujem si zdroje.",
    ua: "Я стежу за новинами, але перевіряю джерела.",
    ru: "Я слежу за новостями, но проверяю источники.",
    en: "I follow the news, but I verify the sources.",
    tokens: ["Sledujem", "správy", ",", "ale", "overujem", "si", "zdroje", "."],
  },

  [phraseKey("ovplyvniť", "b1-10")]: {
    sk: "Jedna veta môže ovplyvniť, ako to ľudia pochopia.",
    ua: "Одне речення може вплинути на те, як люди це зрозуміють.",
    ru: "Одна фраза может повлиять на то, как люди это поймут.",
    en: "One sentence can influence how people understand it.",
    tokens: ["Jedna", "veta", "môže", "ovplyvniť", ",", "ako", "to", "ľudia", "pochopia", "."],
  },

  [phraseKey("uveriteľný", "b1-10")]: {
    sk: "Zdroj musí byť uveriteľný, inak tomu neverím.",
    ua: "Джерело має бути достовірним, інакше я цьому не вірю.",
    ru: "Источник должен быть достоверным, иначе я этому не верю.",
    en: "The source must be credible, otherwise I do not believe it.",
    tokens: ["Zdroj", "musí", "byť", "uveriteľný", ",", "inak", "tomu", "neverím", "."],
  },

  [phraseKey("informovať", "b1-10")]: {
    sk: "Prosím, informuj ma, keď budeš mať výsledky.",
    ua: "Будь ласка, повідом мене, коли матимеш результати.",
    ru: "Пожалуйста, сообщи мне, когда будут результаты.",
    en: "Please inform me when you have the results.",
    tokens: ["Prosím", ",", "informuj", "ma", ",", "keď", "budeš", "mať", "výsledky", "."],
  },

  [phraseKey("vyjadriť názor", "b1-10")]: {
    sk: "Chcem vyjadriť názor, ale slušne a vecne.",
    ua: "Хочу висловити думку, але ввічливо й по суті.",
    ru: "Хочу выразить мнение, но вежливо и по делу.",
    en: "I want to express my opinion, but politely and to the point.",
    tokens: ["Chcem", "vyjadriť", "názor", ",", "ale", "slušne", "a", "vecne", "."],
  },

  [phraseKey("komentár", "b1-10")]: {
    sk: "Pod článkom bolo veľa negatívnych komentárov.",
    ua: "Під статтею було багато негативних коментарів.",
    ru: "Под статьёй было много негативных комментариев.",
    en: "There were many negative comments under the article.",
    tokens: ["Pod", "článkom", "bolo", "veľa", "negatívnych", "komentárov", "."],
  },

  [phraseKey("verejnosť", "b1-10")]: {
    sk: "Verejnosť sa o tom dozvedela až neskôr.",
    ua: "Громадськість дізналася про це лише пізніше.",
    ru: "Общественность узнала об этом только позже.",
    en: "The public found out about it only later.",
    tokens: ["Verejnosť", "sa", "o", "tom", "dozvedela", "až", "neskôr", "."],
  },
};
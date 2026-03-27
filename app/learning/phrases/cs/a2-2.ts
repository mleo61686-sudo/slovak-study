import type { Phrase } from "../registry";
import { phraseKey } from "../phraseKey";

export const CS_A2_PHRASES_2: Record<string, Phrase> = {
  // =========================
  // LESSON A2-11 — Харчування та здорові звички
  // =========================
  [phraseKey("strava", "a2-11")]: {
    sk: "Zdravá strava je pro mě důležitá.",
    ua: "Здорове харчування для мене важливе.",
    ru: "Здоровое питание для меня важно.",
    tokens: ["Zdravá", "strava", "je", "pro", "mě", "důležitá", "."],
  },

  [phraseKey("zdravé jídlo", "a2-11")]: {
    sk: "Snažím se jíst zdravé jídlo každý den.",
    ua: "Я намагаюся їсти здорову їжу щодня.",
    ru: "Я стараюсь есть здоровую еду каждый день.",
    tokens: ["Snažím", "se", "jíst", "zdravé", "jídlo", "každý", "den", "."],
  },

  [phraseKey("nezdravý", "a2-11")]: {
    sk: "Tohle jídlo je moc nezdravé.",
    ua: "Ця їжа дуже нездорова.",
    ru: "Эта еда очень нездоровая.",
    tokens: ["Tohle", "jídlo", "je", "moc", "nezdravé", "."],
  },

  [phraseKey("kalorie", "a2-11")]: {
    sk: "Nechci počítat každou kalorii.",
    ua: "Я не хочу рахувати кожну калорію.",
    ru: "Я не хочу считать каждую калорию.",
    tokens: ["Nechci", "počítat", "každou", "kalorii", "."],
  },

  [phraseKey("vitamíny", "a2-11")]: {
    sk: "V ovoci je hodně vitamínů.",
    ua: "У фруктах багато вітамінів.",
    ru: "Во фруктах много витаминов.",
    tokens: ["V", "ovoci", "je", "hodně", "vitamínů", "."],
  },

  [phraseKey("bílkoviny", "a2-11")]: {
    sk: "Po tréninku potřebuji bílkoviny.",
    ua: "Після тренування мені потрібні білки.",
    ru: "После тренировки мне нужны белки.",
    tokens: ["Po", "tréninku", "potřebuji", "bílkoviny", "."],
  },

  [phraseKey("tuky", "a2-11")]: {
    sk: "Ne všechny tuky jsou špatné.",
    ua: "Не всі жири шкідливі.",
    ru: "Не все жиры вредны.",
    tokens: ["Ne", "všechny", "tuky", "jsou", "špatné", "."],
  },

  [phraseKey("cukr", "a2-11")]: {
    sk: "Snažím se omezit cukr.",
    ua: "Я намагаюся обмежити цукор.",
    ru: "Я стараюсь ограничить сахар.",
    tokens: ["Snažím", "se", "omezit", "cukr", "."],
  },

  [phraseKey("sůl", "a2-11")]: {
    sk: "V té polévce je moc soli.",
    ua: "У тому супі забагато солі.",
    ru: "В этом супе слишком много соли.",
    tokens: ["V", "té", "polévce", "je", "moc", "soli", "."],
  },

  [phraseKey("hydratace", "a2-11")]: {
    sk: "Při sportu je hydratace důležitá.",
    ua: "Під час спорту важливо підтримувати водний баланс.",
    ru: "Во время спорта важно поддерживать водный баланс.",
    tokens: ["Při", "sportu", "je", "hydratace", "důležitá", "."],
  },

  // =========================
  // LESSON A2-12 — Спорт і активність
  // =========================
  [phraseKey("trénink", "a2-12")]: {
    sk: "Dnešní trénink byl opravdu těžký.",
    ua: "Сьогоднішнє тренування було справді важким.",
    ru: "Сегодняшняя тренировка была действительно тяжёлой.",
    tokens: ["Dnešní", "trénink", "byl", "opravdu", "těžký", "."],
  },

  [phraseKey("cvičit", "a2-12")]: {
    sk: "Chci cvičit aspoň třikrát týdně.",
    ua: "Я хочу тренуватися щонайменше тричі на тиждень.",
    ru: "Я хочу тренироваться как минимум три раза в неделю.",
    tokens: ["Chci", "cvičit", "aspoň", "třikrát", "týdně", "."],
  },

  [phraseKey("posilovna", "a2-12")]: {
    sk: "Po práci chodím do posilovny.",
    ua: "Після роботи я ходжу в спортзал.",
    ru: "После работы я хожу в спортзал.",
    tokens: ["Po", "práci", "chodím", "do", "posilovny", "."],
  },

  [phraseKey("vytrvalost", "a2-12")]: {
    sk: "Běh zlepšuje vytrvalost.",
    ua: "Біг покращує витривалість.",
    ru: "Бег улучшает выносливость.",
    tokens: ["Běh", "zlepšuje", "vytrvalost", "."],
  },

  [phraseKey("síla", "a2-12")]: {
    sk: "Postupně se mi zlepšila síla.",
    ua: "Поступово моя сила зросла.",
    ru: "Постепенно моя сила выросла.",
    tokens: ["Postupně", "se", "mi", "zlepšila", "síla", "."],
  },

  [phraseKey("tempo", "a2-12")]: {
    sk: "Dnes běžíme pomalejším tempem.",
    ua: "Сьогодні ми біжимо повільнішим темпом.",
    ru: "Сегодня мы бежим в более медленном темпе.",
    tokens: ["Dnes", "běžíme", "pomalejším", "tempem", "."],
  },

  [phraseKey("zahřát se", "a2-12")]: {
    sk: "Před během se musíš zahřát.",
    ua: "Перед бігом ти маєш розігрітися.",
    ru: "Перед бегом ты должен разогреться.",
    tokens: ["Před", "během", "se", "musíš", "zahřát", "."],
  },

  [phraseKey("protáhnout se", "a2-12")]: {
    sk: "Po cvičení je dobré se protáhnout.",
    ua: "Після тренування добре розтягнутися.",
    ru: "После тренировки полезно потянуться.",
    tokens: ["Po", "cvičení", "je", "dobré", "se", "protáhnout", "."],
  },

  [phraseKey("zranění", "a2-12")]: {
    sk: "Kvůli zranění teď nemůžu sportovat.",
    ua: "Через травму я зараз не можу займатися спортом.",
    ru: "Из-за травмы я сейчас не могу заниматься спортом.",
    tokens: ["Kvůli", "zranění", "teď", "nemůžu", "sportovat", "."],
  },

  [phraseKey("regenerace", "a2-12")]: {
    sk: "Po těžkém tréninku je regenerace nutná.",
    ua: "Після важкого тренування відновлення необхідне.",
    ru: "После тяжёлой тренировки восстановление необходимо.",
    tokens: ["Po", "těžkém", "tréninku", "je", "regenerace", "nutná", "."],
  },

  // =========================
  // LESSON A2-13 — Відносини та спілкування
  // =========================
  [phraseKey("vztah", "a2-13")]: {
    sk: "Dobrý vztah potřebuje čas.",
    ua: "Хороші стосунки потребують часу.",
    ru: "Хорошие отношения требуют времени.",
    tokens: ["Dobrý", "vztah", "potřebuje", "čas", "."],
  },

  [phraseKey("důvěra", "a2-13")]: {
    sk: "Bez důvěry to nepůjde.",
    ua: "Без довіри це не вийде.",
    ru: "Без доверия это не получится.",
    tokens: ["Bez", "důvěry", "to", "nepůjde", "."],
  },

  [phraseKey("respekt", "a2-13")]: {
    sk: "Ve vztahu je respekt velmi důležitý.",
    ua: "У стосунках повага дуже важлива.",
    ru: "В отношениях уважение очень важно.",
    tokens: ["Ve", "vztahu", "je", "respekt", "velmi", "důležitý", "."],
  },

  [phraseKey("podpora", "a2-13")]: {
    sk: "Děkuji ti za podporu.",
    ua: "Дякую тобі за підтримку.",
    ru: "Спасибо тебе за поддержку.",
    tokens: ["Děkuji", "ti", "za", "podporu", "."],
  },

  [phraseKey("hádat se", "a2-13")]: {
    sk: "Nechci se s tebou hádat.",
    ua: "Я не хочу з тобою сваритися.",
    ru: "Я не хочу с тобой ссориться.",
    tokens: ["Nechci", "se", "s", "tebou", "hádat", "."],
  },

  [phraseKey("smířit se", "a2-13")]: {
    sk: "Po rozhovoru jsme se smířili.",
    ua: "Після розмови ми помирилися.",
    ru: "После разговора мы помирились.",
    tokens: ["Po", "rozhovoru", "jsme", "se", "smířili", "."],
  },

  [phraseKey("dohoda", "a2-13")]: {
    sk: "Nakonec jsme našli dohodu.",
    ua: "Зрештою ми знайшли домовленість.",
    ru: "В итоге мы пришли к договорённости.",
    tokens: ["Nakonec", "jsme", "našli", "dohodu", "."],
  },

  [phraseKey("kompromis", "a2-13")]: {
    sk: "Musíme udělat kompromis.",
    ua: "Ми маємо піти на компроміс.",
    ru: "Мы должны пойти на компромисс.",
    tokens: ["Musíme", "udělat", "kompromis", "."],
  },

  [phraseKey("upřímný", "a2-13")]: {
    sk: "Byl ke mně upřímný.",
    ua: "Він був щирим зі мною.",
    ru: "Он был со мной искренним.",
    tokens: ["Byl", "ke", "mně", "upřímný", "."],
  },

  [phraseKey("trpělivost", "a2-13")]: {
    sk: "Na tohle potřebuješ trpělivost.",
    ua: "Для цього тобі потрібне терпіння.",
    ru: "Для этого тебе нужно терпение.",
    tokens: ["Na", "tohle", "potřebuješ", "trpělivost", "."],
  },

  // =========================
  // LESSON A2-14 — Покупки онлайн і доставка
  // =========================
  [phraseKey("objednávka", "a2-14")]: {
    sk: "Moje objednávka už byla odeslaná.",
    ua: "Моє замовлення вже було відправлене.",
    ru: "Мой заказ уже был отправлен.",
    tokens: ["Moje", "objednávka", "už", "byla", "odeslaná", "."],
  },

  [phraseKey("doručení", "a2-14")]: {
    sk: "Doručení trvá dva až tři dny.",
    ua: "Доставка триває два-три дні.",
    ru: "Доставка занимает два-три дня.",
    tokens: ["Doručení", "trvá", "dva", "až", "tři", "dny", "."],
  },

  [phraseKey("balík", "a2-14")]: {
    sk: "Balík dnes ještě nepřišel.",
    ua: "Посилка сьогодні ще не прийшла.",
    ru: "Посылка сегодня ещё не пришла.",
    tokens: ["Balík", "dnes", "ještě", "nepřišel", "."],
  },

  [phraseKey("kurýr", "a2-14")]: {
    sk: "Kurýr mi bude volat odpoledne.",
    ua: "Кур’єр зателефонує мені після обіду.",
    ru: "Курьер позвонит мне после обеда.",
    tokens: ["Kurýr", "mi", "bude", "volat", "odpoledne", "."],
  },

  [phraseKey("sledování zásilky", "a2-14")]: {
    sk: "Sledování zásilky funguje online.",
    ua: "Відстеження посилки працює онлайн.",
    ru: "Отслеживание посылки работает онлайн.",
    tokens: ["Sledování", "zásilky", "funguje", "online", "."],
  },

  [phraseKey("doručovací adresa", "a2-14")]: {
    sk: "Musím změnit doručovací adresu.",
    ua: "Мені треба змінити адресу доставки.",
    ru: "Мне нужно изменить адрес доставки.",
    tokens: ["Musím", "změnit", "doručovací", "adresu", "."],
  },

  [phraseKey("vrácení", "a2-14")]: {
    sk: "Vrácení zboží bylo jednoduché.",
    ua: "Повернення товару було простим.",
    ru: "Возврат товара был простым.",
    tokens: ["Vrácení", "zboží", "bylo", "jednoduché", "."],
  },

  [phraseKey("výmena", "a2-14")]: {
    sk: "Chci raději výměnu než vrácení.",
    ua: "Я краще виберу обмін, ніж повернення.",
    ru: "Я лучше выберу обмен, чем возврат.",
    tokens: ["Chci", "raději", "výměnu", "než", "vrácení", "."],
  },

  [phraseKey("poštovné", "a2-14")]: {
    sk: "Poštovné bylo tentokrát zdarma.",
    ua: "Доставка цього разу була безкоштовною.",
    ru: "Доставка в этот раз была бесплатной.",
    tokens: ["Poštovné", "bylo", "tentokrát", "zdarma", "."],
  },

  [phraseKey("platba kartou", "a2-14")]: {
    sk: "V obchodě preferuji platbu kartou.",
    ua: "У магазині я віддаю перевагу оплаті карткою.",
    ru: "В магазине я предпочитаю оплату картой.",
    tokens: ["V", "obchodě", "preferuji", "platbu", "kartou", "."],
  },

  // =========================
  // LESSON A2-15 — Технології (побутові ситуації)
  // =========================
  [phraseKey("nastavit", "a2-15")]: {
    sk: "Potřebuji nastavit nový telefon.",
    ua: "Мені треба налаштувати новий телефон.",
    ru: "Мне нужно настроить новый телефон.",
    tokens: ["Potřebuji", "nastavit", "nový", "telefon", "."],
  },

  [phraseKey("aktualizace", "a2-15")]: {
    sk: "Po aktualizaci aplikace funguje lépe.",
    ua: "Після оновлення застосунок працює краще.",
    ru: "После обновления приложение работает лучше.",
    tokens: ["Po", "aktualizaci", "aplikace", "funguje", "lépe", "."],
  },

  [phraseKey("připojení", "a2-15")]: {
    sk: "Máme problém s internetovým připojením.",
    ua: "У нас проблема з інтернет-підключенням.",
    ru: "У нас проблема с интернет-подключением.",
    tokens: ["Máme", "problém", "s", "internetovým", "připojením", "."],
  },

  [phraseKey("signál", "a2-15")]: {
    sk: "Tady je velmi slabý signál.",
    ua: "Тут дуже слабкий сигнал.",
    ru: "Здесь очень слабый сигнал.",
    tokens: ["Tady", "je", "velmi", "slabý", "signál", "."],
  },

  [phraseKey("výpadek", "a2-15")]: {
    sk: "Ráno byl krátký výpadek proudu.",
    ua: "Вранці було коротке відключення електрики.",
    ru: "Утром было короткое отключение электричества.",
    tokens: ["Ráno", "byl", "krátký", "výpadek", "proudu", "."],
  },

  [phraseKey("zaseknout se", "a2-15")]: {
    sk: "Počítač se mi znovu zasekl.",
    ua: "Комп’ютер у мене знову завис.",
    ru: "Компьютер у меня снова завис.",
    tokens: ["Počítač", "se", "mi", "znovu", "zasekl", "."],
  },

  [phraseKey("restartovat", "a2-15")]: {
    sk: "Zkus zařízení restartovat.",
    ua: "Спробуй перезавантажити пристрій.",
    ru: "Попробуй перезагрузить устройство.",
    tokens: ["Zkus", "zařízení", "restartovat", "."],
  },

  [phraseKey("nainstalovat", "a2-15")]: {
    sk: "Musím nainstalovat nový program.",
    ua: "Мені треба встановити нову програму.",
    ru: "Мне нужно установить новую программу.",
    tokens: ["Musím", "nainstalovat", "nový", "program", "."],
  },

  [phraseKey("vymazat", "a2-15")]: {
    sk: "Omylem jsem vymazal důležitý soubor.",
    ua: "Я випадково видалив важливий файл.",
    ru: "Я случайно удалил важный файл.",
    tokens: ["Omylem", "jsem", "vymazal", "důležitý", "soubor", "."],
  },

  [phraseKey("obnovit", "a2-15")]: {
    sk: "Naštěstí šel dokument obnovit.",
    ua: "На щастя, документ вдалося відновити.",
    ru: "К счастью, документ удалось восстановить.",
    tokens: ["Naštěstí", "šel", "dokument", "obnovit", "."],
  },

  // =========================
  // LESSON A2-16 — Освіта і навчання
  // =========================
  [phraseKey("kurz", "a2-16")]: {
    sk: "Přihlásil jsem se na jazykový kurz.",
    ua: "Я записався на мовний курс.",
    ru: "Я записался на языковой курс.",
    tokens: ["Přihlásil", "jsem", "se", "na", "jazykový", "kurz", "."],
  },

  [phraseKey("přednáška", "a2-16")]: {
    sk: "Dnešní přednáška byla zajímavá.",
    ua: "Сьогоднішня лекція була цікавою.",
    ru: "Сегодняшняя лекция была интересной.",
    tokens: ["Dnešní", "přednáška", "byla", "zajímavá", "."],
  },

  [phraseKey("poznámky", "a2-16")]: {
    sk: "Dělám si poznámky během hodiny.",
    ua: "Я роблю нотатки під час заняття.",
    ru: "Я делаю заметки во время занятия.",
    tokens: ["Dělám", "si", "poznámky", "během", "hodiny", "."],
  },

  [phraseKey("domácí úkol", "a2-16")]: {
    sk: "Zapomněl jsem na domácí úkol.",
    ua: "Я забув про домашнє завдання.",
    ru: "Я забыл про домашнее задание.",
    tokens: ["Zapomněl", "jsem", "na", "domácí", "úkol", "."],
  },

  [phraseKey("zkouška", "a2-16")]: {
    sk: "Na zkoušku se učím každý večer.",
    ua: "До іспиту я вчуся щовечора.",
    ru: "К экзамену я учусь каждый вечер.",
    tokens: ["Na", "zkoušku", "se", "učím", "každý", "večer", "."],
  },

  [phraseKey("certifikát", "a2-16")]: {
    sk: "Po kurzu dostaneme certifikát.",
    ua: "Після курсу ми отримаємо сертифікат.",
    ru: "После курса мы получим сертификат.",
    tokens: ["Po", "kurzu", "dostaneme", "certifikát", "."],
  },

  [phraseKey("zručnost", "a2-16")]: {
    sk: "Poslech je důležitá jazyková zručnost.",
    ua: "Сприйняття на слух — важлива мовна навичка.",
    ru: "Аудирование — важный языковой навык.",
    tokens: ["Poslech", "je", "důležitá", "jazyková", "zručnost", "."],
  },

  [phraseKey("zlepšit se", "a2-16")]: {
    sk: "Moje čeština se hodně zlepšila.",
    ua: "Моя чеська значно покращилася.",
    ru: "Мой чешский сильно улучшился.",
    tokens: ["Moje", "čeština", "se", "hodně", "zlepšila", "."],
  },

  [phraseKey("opakovat", "a2-16")]: {
    sk: "Musím si tu látku opakovat.",
    ua: "Мені треба повторювати цей матеріал.",
    ru: "Мне нужно повторять этот материал.",
    tokens: ["Musím", "si", "tu", "látku", "opakovat", "."],
  },

  [phraseKey("učit se nazpaměť", "a2-16")]: {
    sk: "Nemám rád učit se text nazpaměť.",
    ua: "Я не люблю вчити текст напам’ять.",
    ru: "Я не люблю учить текст наизусть.",
    tokens: ["Nemám", "rád", "učit", "se", "text", "nazpaměť", "."],
  },

  // =========================
  // LESSON A2-17 — На роботі (комунікація)
  // =========================
  [phraseKey("rozdělit úkoly", "a2-17")]: {
    sk: "Nejdřív musíme rozdělit úkoly.",
    ua: "Спочатку ми маємо розподілити завдання.",
    ru: "Сначала мы должны распределить задачи.",
    tokens: ["Nejdřív", "musíme", "rozdělit", "úkoly", "."],
  },

  [phraseKey("spolupracovat", "a2-17")]: {
    sk: "S novým kolegou se dobře spolupracuje.",
    ua: "З новим колегою добре працювати.",
    ru: "С новым коллегой хорошо работается.",
    tokens: ["S", "novým", "kolegou", "se", "dobře", "spolupracuje", "."],
  },

  [phraseKey("priorita", "a2-17")]: {
    sk: "Teď je prioritou dokončit projekt.",
    ua: "Зараз пріоритет — завершити проєкт.",
    ru: "Сейчас приоритет — завершить проект.",
    tokens: ["Teď", "je", "prioritou", "dokončit", "projekt", "."],
  },

  [phraseKey("zodpovídat", "a2-17")]: {
    sk: "Za tento úkol zodpovídám já.",
    ua: "За це завдання відповідаю я.",
    ru: "За эту задачу отвечаю я.",
    tokens: ["Za", "tento", "úkol", "zodpovídám", "já", "."],
  },

  [phraseKey("odvzdat", "a2-17")]: {
    sk: "Musíme to odvzdat do pátku.",
    ua: "Ми маємо здати це до п’ятниці.",
    ru: "Мы должны сдать это до пятницы.",
    tokens: ["Musíme", "to", "odvzdat", "do", "pátku", "."],
  },

  [phraseKey("zkontrolovat", "a2-17")]: {
    sk: "Ještě to jednou zkontroluju.",
    ua: "Я ще раз це перевірю.",
    ru: "Я ещё раз это проверю.",
    tokens: ["Ještě", "to", "jednou", "zkontroluju", "."],
  },

  [phraseKey("organizovat", "a2-17")]: {
    sk: "Budeš organizovat tu poradu?",
    ua: "Ти будеш організовувати цю нараду?",
    ru: "Ты будешь организовывать это совещание?",
    tokens: ["Budeš", "organizovat", "tu", "poradu", "?"],
  },

  [phraseKey("zpětná vazba", "a2-17")]: {
    sk: "Potřebuji od tebe zpětnou vazbu.",
    ua: "Мені потрібен від тебе зворотний зв’язок.",
    ru: "Мне нужна от тебя обратная связь.",
    tokens: ["Potřebuji", "od", "tebe", "zpětnou", "vazbu", "."],
  },

  [phraseKey("navrhnout řešení", "a2-17")]: {
    sk: "Můžeš navrhnout jiné řešení?",
    ua: "Можеш запропонувати інше рішення?",
    ru: "Можешь предложить другое решение?",
    tokens: ["Můžeš", "navrhnout", "jiné", "řešení", "?"],
  },

  [phraseKey("dokončit", "a2-17")]: {
    sk: "Chceme to dokončit ještě dnes.",
    ua: "Ми хочемо завершити це ще сьогодні.",
    ru: "Мы хотим закончить это ещё сегодня.",
    tokens: ["Chceme", "to", "dokončit", "ještě", "dnes", "."],
  },

  // =========================
  // LESSON A2-18 — Банківські справи
  // =========================
  [phraseKey("založit účet", "a2-18")]: {
    sk: "Chci si založit nový účet.",
    ua: "Я хочу відкрити новий рахунок.",
    ru: "Я хочу открыть новый счёт.",
    tokens: ["Chci", "si", "založit", "nový", "účet", "."],
  },

  [phraseKey("výběr", "a2-18")]: {
    sk: "Za výběr z cizího bankomatu je poplatek.",
    ua: "За зняття з чужого банкомата є комісія.",
    ru: "За снятие в чужом банкомате есть комиссия.",
    tokens: ["Za", "výběr", "z", "cizího", "bankomatu", "je", "poplatek", "."],
  },

  [phraseKey("vklad", "a2-18")]: {
    sk: "Hotovostní vklad můžete udělat na pobočce.",
    ua: "Готівкове внесення можна зробити у відділенні.",
    ru: "Наличный взнос можно сделать в отделении.",
    tokens: ["Hotovostní", "vklad", "můžete", "udělat", "na", "pobočce", "."],
  },

  [phraseKey("převést", "a2-18")]: {
    sk: "Potřebuji převést peníze dnes.",
    ua: "Мені потрібно перевести гроші сьогодні.",
    ru: "Мне нужно перевести деньги сегодня.",
    tokens: ["Potřebuji", "převést", "peníze", "dnes", "."],
  },

  [phraseKey("platební karta", "a2-18")]: {
    sk: "Moje platební karta už nefunguje.",
    ua: "Моя платіжна картка вже не працює.",
    ru: "Моя платёжная карта уже не работает.",
    tokens: ["Moje", "platební", "karta", "už", "nefunguje", "."],
  },

  [phraseKey("PIN kód", "a2-18")]: {
    sk: "Zapomněl jsem svůj PIN kód.",
    ua: "Я забув свій пін-код.",
    ru: "Я забыл свой пин-код.",
    tokens: ["Zapomněl", "jsem", "svůj", "PIN", "kód", "."],
  },

  [phraseKey("limit", "a2-18")]: {
    sk: "Denní limit si můžu změnit v aplikaci.",
    ua: "Я можу змінити денний ліміт у застосунку.",
    ru: "Я могу изменить дневной лимит в приложении.",
    tokens: ["Denní", "limit", "si", "můžu", "změnit", "v", "aplikaci", "."],
  },

  [phraseKey("poplatek", "a2-18")]: {
    sk: "Za tu službu je vysoký poplatek.",
    ua: "За цю послугу стягується висока комісія.",
    ru: "За эту услугу высокая комиссия.",
    tokens: ["Za", "tu", "službu", "je", "vysoký", "poplatek", "."],
  },

  [phraseKey("výpis", "a2-18")]: {
    sk: "Potřebuji měsíční výpis z účtu.",
    ua: "Мені потрібна місячна виписка з рахунку.",
    ru: "Мне нужна месячная выписка со счёта.",
    tokens: ["Potřebuji", "měsíční", "výpis", "z", "účtu", "."],
  },

  [phraseKey("zablokovat kartu", "a2-18")]: {
    sk: "Musel jsem zablokovat kartu po ztrátě.",
    ua: "Мені довелося заблокувати картку після втрати.",
    ru: "Мне пришлось заблокировать карту после потери.",
    tokens: ["Musel", "jsem", "zablokovat", "kartu", "po", "ztrátě", "."],
  },

  // =========================
  // LESSON A2-19 — Державні документи
  // =========================
  [phraseKey("povolení", "a2-19")]: {
    sk: "K práci potřebuji platné povolení.",
    ua: "Для роботи мені потрібен чинний дозвіл.",
    ru: "Для работы мне нужно действующее разрешение.",
    tokens: ["K", "práci", "potřebuji", "platné", "povolení", "."],
  },

  [phraseKey("pobyt", "a2-19")]: {
    sk: "Musím prodloužit svůj pobyt.",
    ua: "Мені треба продовжити свій дозвіл на проживання.",
    ru: "Мне нужно продлить свой вид на жительство.",
    tokens: ["Musím", "prodloužit", "svůj", "pobyt", "."],
  },

  [phraseKey("občanský průkaz", "a2-19")]: {
    sk: "Bez občanského průkazu to nevyřídíš.",
    ua: "Без посвідчення особи ти цього не оформиш.",
    ru: "Без удостоверения личности ты это не оформишь.",
    tokens: ["Bez", "občanského", "průkazu", "to", "nevyřídíš", "."],
  },

  [phraseKey("registrace", "a2-19")]: {
    sk: "Online registrace byla rychlá.",
    ua: "Онлайн-реєстрація була швидкою.",
    ru: "Онлайн-регистрация была быстрой.",
    tokens: ["Online", "registrace", "byla", "rychlá", "."],
  },

  [phraseKey("podpis", "a2-19")]: {
    sk: "Tady prosím dejte svůj podpis.",
    ua: "Тут, будь ласка, поставте свій підпис.",
    ru: "Здесь, пожалуйста, поставьте свою подпись.",
    tokens: ["Tady", "prosím", "dejte", "svůj", "podpis", "."],
  },

  [phraseKey("fotografie", "a2-19")]: {
    sk: "K žádosti potřebujete jednu fotografii.",
    ua: "До заяви вам потрібне одне фото.",
    ru: "К заявлению вам нужна одна фотография.",
    tokens: ["K", "žádosti", "potřebujete", "jednu", "fotografii", "."],
  },

  [phraseKey("ověřit", "a2-19")]: {
    sk: "Tento dokument je potřeba ověřit.",
    ua: "Цей документ потрібно завірити.",
    ru: "Этот документ нужно заверить.",
    tokens: ["Tento", "dokument", "je", "potřeba", "ověřit", "."],
  },

  [phraseKey("termín schůzky", "a2-19")]: {
    sk: "Termín schůzky mám na úterý ráno.",
    ua: "Дата прийому в мене у вівторок вранці.",
    ru: "Дата приёма у меня во вторник утром.",
    tokens: ["Termín", "schůzky", "mám", "na", "úterý", "ráno", "."],
  },

  [phraseKey("vyřídit", "a2-19")]: {
    sk: "Tohle chci vyřídit co nejdřív.",
    ua: "Я хочу оформити це якомога швидше.",
    ru: "Я хочу решить это как можно скорее.",
    tokens: ["Tohle", "chci", "vyřídit", "co", "nejdřív", "."],
  },

  [phraseKey("rodné číslo", "a2-19")]: {
    sk: "Ve formuláři chybí rodné číslo.",
    ua: "У бланку бракує ідентифікаційного номера.",
    ru: "В бланке не хватает идентификационного номера.",
    tokens: ["Ve", "formuláři", "chybí", "rodné", "číslo", "."],
  },

  // =========================
  // LESSON A2-20 — Повторення A2 (11–19)
  // =========================
  [phraseKey("strava", "a2-20")]: {
    sk: "Moje strava je teď zdravější.",
    ua: "Моє харчування зараз здоровіше.",
    ru: "Моё питание сейчас здоровее.",
    tokens: ["Moje", "strava", "je", "teď", "zdravější", "."],
  },

  [phraseKey("trénink", "a2-20")]: {
    sk: "Včerejší trénink mi dal zabrat.",
    ua: "Вчорашнє тренування мене добряче виснажило.",
    ru: "Вчерашняя тренировка меня хорошо вымотала.",
    tokens: ["Včerejší", "trénink", "mi", "dal", "zabrat", "."],
  },

  [phraseKey("kompromis", "a2-20")]: {
    sk: "Nakonec jsme přijali kompromis.",
    ua: "Зрештою ми прийняли компроміс.",
    ru: "В итоге мы приняли компромисс.",
    tokens: ["Nakonec", "jsme", "přijali", "kompromis", "."],
  },

  [phraseKey("doručení", "a2-20")]: {
    sk: "Doručení bylo tentokrát rychlé.",
    ua: "Доставка цього разу була швидкою.",
    ru: "Доставка в этот раз была быстрой.",
    tokens: ["Doručení", "bylo", "tentokrát", "rychlé", "."],
  },

  [phraseKey("aktualizace", "a2-20")]: {
    sk: "Po aktualizaci je systém stabilnější.",
    ua: "Після оновлення система стабільніша.",
    ru: "После обновления система стабильнее.",
    tokens: ["Po", "aktualizaci", "je", "systém", "stabilnější", "."],
  },

  [phraseKey("přednáška", "a2-20")]: {
    sk: "Ta přednáška mě opravdu bavila.",
    ua: "Та лекція мені справді сподобалася.",
    ru: "Эта лекция мне действительно понравилась.",
    tokens: ["Ta", "přednáška", "mě", "opravdu", "bavila", "."],
  },

  [phraseKey("zpětná vazba", "a2-20")]: {
    sk: "Dostal jsem užitečnou zpětnou vazbu.",
    ua: "Я отримав корисний зворотний зв’язок.",
    ru: "Я получил полезную обратную связь.",
    tokens: ["Dostal", "jsem", "užitečnou", "zpětnou", "vazbu", "."],
  },

  [phraseKey("výpis", "a2-20")]: {
    sk: "Výpis z účtu přišel e-mailem.",
    ua: "Виписка з рахунку прийшла електронною поштою.",
    ru: "Выписка со счёта пришла по электронной почте.",
    tokens: ["Výpis", "z", "účtu", "přišel", "e-mailem", "."],
  },

  [phraseKey("povolení", "a2-20")]: {
    sk: "Bez povolení to není možné.",
    ua: "Без дозволу це неможливо.",
    ru: "Без разрешения это невозможно.",
    tokens: ["Bez", "povolení", "to", "není", "možné", "."],
  },

  [phraseKey("vyřídit", "a2-20")]: {
    sk: "Dnes musím vyřídit několik věcí.",
    ua: "Сьогодні мені треба владнати кілька справ.",
    ru: "Сегодня мне нужно решить несколько дел.",
    tokens: ["Dnes", "musím", "vyřídit", "několik", "věcí", "."],
  },
};
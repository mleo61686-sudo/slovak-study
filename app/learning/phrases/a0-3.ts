// app/learning/phrases/a0-3.ts
import type { Phrase } from "./a0";

const k = (sk: string, ua: string) => `${sk}||${ua}`.toLowerCase();

export const A0_PHRASES_3: Record<string, Phrase> = {

  // =========================
  // LESSON 21 — Місця
  // =========================
  [k("miesto", "місце")]: {
    sk: "Toto je pekné miesto.",
    ua: "Це гарне місце.",
    ru: "Это хорошее место.",
    tokens: ["Toto", "je", "pekné", "miesto", "."],
  },
  [k("centrum", "центр")]: {
    sk: "Som v centre.",
    ua: "Я в центрі.",
    ru: "Я в центре.",
    tokens: ["Som", "v", "centre", "."],
  },
  [k("obchod", "магазин")]: {
    sk: "Idem do obchodu.",
    ua: "Я йду в магазин.",
    ru: "Я иду в магазин.",
    tokens: ["Idem", "do", "obchodu", "."],
  },
  [k("reštaurácia", "ресторан")]: {
    sk: "Reštaurácia je otvorená.",
    ua: "Ресторан відкритий.",
    ru: "Ресторан открыт.",
    tokens: ["Reštaurácia", "je", "otvorená", "."],
  },
  [k("kaviareň", "кафе")]: {
    sk: "Sedím v kaviarni.",
    ua: "Я сиджу в кафе.",
    ru: "Я сижу в кафе.",
    tokens: ["Sedím", "v", "kaviarni", "."],
  },
  [k("park", "парк")]: {
    sk: "Som v parku.",
    ua: "Я в парку.",
    ru: "Я в парке.",
    tokens: ["Som", "v", "parku", "."],
  },
  [k("banka", "банк")]: {
    sk: "Idem do banky.",
    ua: "Я йду в банк.",
    ru: "Я иду в банк.",
    tokens: ["Idem", "do", "banky", "."],
  },
  [k("pošta", "пошта")]: {
    sk: "Pošta je blízko.",
    ua: "Пошта близько.",
    ru: "Почта рядом.",
    tokens: ["Pošta", "je", "blízko", "."],
  },
  [k("polícia", "поліція")]: {
    sk: "Volám políciu.",
    ua: "Я викликаю поліцію.",
    ru: "Я вызываю полицию.",
    tokens: ["Volám", "políciu", "."],
  },
  [k("stanica", "станція / вокзал")]: {
    sk: "Stanica je tam.",
    ua: "Станція там.",
    ru: "Станция там.",
    tokens: ["Stanica", "je", "tam", "."],
  },

  // =========================
  // LESSON 22 — Емоції
  // =========================
  [k("radosť", "радість")]: {
    sk: "Cítim radosť.",
    ua: "Я відчуваю радість.",
    ru: "Я чувствую радость.",
    tokens: ["Cítim", "radosť", "."],
  },
  [k("smútok", "смуток")]: {
    sk: "Cítim smútok.",
    ua: "Я відчуваю смуток.",
    ru: "Я чувствую грусть.",
    tokens: ["Cítim", "smútok", "."],
  },
  [k("strach", "страх")]: {
    sk: "Mám strach.",
    ua: "Мені страшно.",
    ru: "Мне страшно.",
    tokens: ["Mám", "strach", "."],
  },
  [k("hnev", "злість")]: {
    sk: "Cítim hnev.",
    ua: "Я відчуваю злість.",
    ru: "Я чувствую злость.",
    tokens: ["Cítim", "hnev", "."],
  },
  [k("láska", "любов")]: {
    sk: "Láska je dôležitá.",
    ua: "Любов важлива.",
    ru: "Любовь важна.",
    tokens: ["Láska", "je", "dôležitá", "."],
  },
  [k("šťastie", "щастя")]: {
    sk: "Mám šťastie.",
    ua: "Мені пощастило.",
    ru: "Мне повезло.",
    tokens: ["Mám", "šťastie", "."],
  },
  [k("únava", "втома")]: {
    sk: "Cítim únavu.",
    ua: "Я відчуваю втому.",
    ru: "Я чувствую усталость.",
    tokens: ["Cítim", "únavu", "."],
  },
  [k("stres", "стрес")]: {
    sk: "Mám stres.",
    ua: "У мене стрес.",
    ru: "У меня стресс.",
    tokens: ["Mám", "stres", "."],
  },
  [k("pokoj", "спокій")]: {
    sk: "Chcem pokoj.",
    ua: "Я хочу спокою.",
    ru: "Я хочу покоя.",
    tokens: ["Chcem", "pokoj", "."],
  },
  [k("prekvapenie", "здивування")]: {
    sk: "To je prekvapenie.",
    ua: "Це здивування.",
    ru: "Это удивление.",
    tokens: ["To", "je", "prekvapenie", "."],
  },

  // =========================
  // LESSON 23 — Хобі
  // =========================
  [k("hobby", "хобі")]: {
    sk: "Moje hobby je šport.",
    ua: "Моє хобі — спорт.",
    ru: "Моё хобби — спорт.",
    tokens: ["Moje", "hobby", "je", "šport", "."],
  },
  [k("šport", "спорт")]: {
    sk: "Mám rád šport.",
    ua: "Я люблю спорт.",
    ru: "Я люблю спорт.",
    tokens: ["Mám", "rád", "šport", "."],
  },
  [k("futbal", "футбол")]: {
    sk: "Hrám futbal.",
    ua: "Я граю у футбол.",
    ru: "Я играю в футбол.",
    tokens: ["Hrám", "futbal", "."],
  },
  [k("hudba", "музика")]: {
    sk: "Počúvam hudbu.",
    ua: "Я слухаю музику.",
    ru: "Я слушаю музыку.",
    tokens: ["Počúvam", "hudbu", "."],
  },
  [k("film", "фільм")]: {
    sk: "Pozerám film.",
    ua: "Я дивлюся фільм.",
    ru: "Я смотрю фильм.",
    tokens: ["Pozerám", "film", "."],
  },
  [k("čítanie", "читання")]: {
    sk: "Mám rád čítanie.",
    ua: "Я люблю читання.",
    ru: "Я люблю чтение.",
    tokens: ["Mám", "rád", "čítanie", "."],
  },
  [k("cestovanie", "подорожі")]: {
    sk: "Milujem cestovanie.",
    ua: "Я люблю подорожі.",
    ru: "Я люблю путешествия.",
    tokens: ["Milujem", "cestovanie", "."],
  },
  [k("hra", "гра")]: {
    sk: "Tá hra je zaujímavá.",
    ua: "Ця гра цікава.",
    ru: "Эта игра интересная.",
    tokens: ["Tá", "hra", "je", "zaujímavá", "."],
  },
  [k("maľovanie", "малювання")]: {
    sk: "Mám rád maľovanie.",
    ua: "Я люблю малювання.",
    ru: "Я люблю рисование.",
    tokens: ["Mám", "rád", "maľovanie", "."],
  },
  [k("tanec", "танець")]: {
    sk: "Tanec je super.",
    ua: "Танець — це класно.",
    ru: "Танец — это классно.",
    tokens: ["Tanec", "je", "super", "."],
  },

  // =========================
  // LESSON 24 — Спілкування
  // =========================
  [k("hovoriť", "говорити")]: {
    sk: "Rád hovorím po slovensky.",
    ua: "Я люблю говорити словацькою.",
    ru: "Я люблю говорить по-словацки.",
    tokens: ["Rád", "hovorím", "po", "slovensky", "."],
  },
  [k("rozprávať", "розповідати")]: {
    sk: "Rozprávam príbeh.",
    ua: "Я розповідаю історію.",
    ru: "Я рассказываю историю.",
    tokens: ["Rozprávam", "príbeh", "."],
  },
  [k("počúvať", "слухати")]: {
    sk: "Počúvam ťa.",
    ua: "Я слухаю тебе.",
    ru: "Я слушаю тебя.",
    tokens: ["Počúvam", "ťa", "."],
  },
  [k("pýtať sa", "питати")]: {
    sk: "Chcem sa pýtať.",
    ua: "Я хочу запитати.",
    ru: "Я хочу спросить.",
    tokens: ["Chcem", "sa", "pýtať", "."],
  },
  [k("odpovedať", "відповідати")]: {
    sk: "Odpovedám na otázku.",
    ua: "Я відповідаю на питання.",
    ru: "Я отвечаю на вопрос.",
    tokens: ["Odpovedám", "na", "otázku", "."],
  },
  [k("telefonovať", "телефонувати")]: {
    sk: "Telefonujem mame.",
    ua: "Я телефоную мамі.",
    ru: "Я звоню маме.",
    tokens: ["Telefonujem", "mame", "."],
  },
  [k("správa", "повідомлення")]: {
    sk: "Posielam správu.",
    ua: "Я надсилаю повідомлення.",
    ru: "Я отправляю сообщение.",
    tokens: ["Posielam", "správu", "."],
  },
  [k("stretnutie", "зустріч")]: {
    sk: "Máme stretnutie.",
    ua: "У нас зустріч.",
    ru: "У нас встреча.",
    tokens: ["Máme", "stretnutie", "."],
  },
  [k("diskusia", "обговорення")]: {
    sk: "Je diskusia.",
    ua: "Є обговорення.",
    ru: "Идёт обсуждение.",
    tokens: ["Je", "diskusia", "."],
  },
  [k("pozdrav", "привітання")]: {
    sk: "To je pekný pozdrav.",
    ua: "Це гарне привітання.",
    ru: "Это хорошее приветствие.",
    tokens: ["To", "je", "pekný", "pozdrav", "."],
  },

  // =========================
  // LESSON 25 — Подорожі
  // =========================
  [k("cesta", "подорож")]: {
    sk: "Tá cesta je dlhá.",
    ua: "Ця подорож довга.",
    ru: "Это путешествие длинное.",
    tokens: ["Tá", "cesta", "je", "dlhá", "."],
  },
  [k("cestovať", "подорожувати")]: {
    sk: "Chcem cestovať.",
    ua: "Я хочу подорожувати.",
    ru: "Я хочу путешествовать.",
    tokens: ["Chcem", "cestovať", "."],
  },
  [k("kufor", "валіза")]: {
    sk: "Mám veľký kufor.",
    ua: "У мене велика валіза.",
    ru: "У меня большой чемодан.",
    tokens: ["Mám", "veľký", "kufor", "."],
  },
  [k("pas", "паспорт")]: {
    sk: "Potrebujem pas.",
    ua: "Мені потрібен паспорт.",
    ru: "Мне нужен паспорт.",
    tokens: ["Potrebujem", "pas", "."],
  },
  [k("letenka", "авіаквиток")]: {
    sk: "Mám letenku.",
    ua: "У мене авіаквиток.",
    ru: "У меня авиабилет.",
    tokens: ["Mám", "letenku", "."],
  },
  [k("vlak", "поїзд")]: {
    sk: "Vlak je rýchly.",
    ua: "Потяг швидкий.",
    ru: "Поезд быстрый.",
    tokens: ["Vlak", "je", "rýchly", "."],
  },
  [k("autobus", "автобус")]: {
    sk: "Čakám na autobus.",
    ua: "Я чекаю на автобус.",
    ru: "Я жду автобус.",
    tokens: ["Čakám", "na", "autobus", "."],
  },
  [k("letisko", "аеропорт")]: {
    sk: "Som na letisku.",
    ua: "Я в аеропорту.",
    ru: "Я в аэропорту.",
    tokens: ["Som", "na", "letisku", "."],
  },
  [k("mapa", "карта")]: {
    sk: "Mám mapu.",
    ua: "У мене є карта.",
    ru: "У меня есть карта.",
    tokens: ["Mám", "mapu", "."],
  },
  [k("rezervácia", "бронювання")]: {
    sk: "Mám rezerváciu.",
    ua: "У мене є бронювання.",
    ru: "У меня есть бронирование.",
    tokens: ["Mám", "rezerváciu", "."],
  },

  // =========================
  // LESSON 26 — Готель і ресторан
  // =========================
  [k("hotel", "готель")]: {
    sk: "Hotel je blízko.",
    ua: "Готель близько.",
    ru: "Отель рядом.",
    tokens: ["Hotel", "je", "blízko", "."],
  },
  [k("izba", "кімната")]: {
    sk: "Izba je čistá.",
    ua: "Кімната чиста.",
    ru: "Комната чистая.",
    tokens: ["Izba", "je", "čistá", "."],
  },
  [k("recepcia", "ресепшн")]: {
    sk: "Recepcia je dole.",
    ua: "Ресепшн внизу.",
    ru: "Ресепшн внизу.",
    tokens: ["Recepcia", "je", "dole", "."],
  },
  [k("menu", "меню")]: {
    sk: "Prosím, menu.",
    ua: "Будь ласка, меню.",
    ru: "Пожалуйста, меню.",
    tokens: ["Prosím", ",", "menu", "."],
  },
  [k("objednať", "замовити")]: {
    sk: "Chcem objednať obed.",
    ua: "Я хочу замовити обід.",
    ru: "Я хочу заказать обед.",
    tokens: ["Chcem", "objednať", "obed", "."],
  },
  [k("raňajky", "сніданок")]: {
    sk: "Raňajky sú o ôsmej.",
    ua: "Сніданок о восьмій.",
    ru: "Завтрак в восемь.",
    tokens: ["Raňajky", "sú", "o", "ôsmej", "."],
  },
  [k("obed", "обід")]: {
    sk: "Obed je chutný.",
    ua: "Обід смачний.",
    ru: "Обед вкусный.",
    tokens: ["Obed", "je", "chutný", "."],
  },
  [k("večera", "вечеря")]: {
    sk: "Večera je o siedmej.",
    ua: "Вечеря о сьомій.",
    ru: "Ужин в семь.",
    tokens: ["Večera", "je", "o", "siedmej", "."],
  },
  [k("účet", "рахунок")]: {
    sk: "Prosím účet.",
    ua: "Рахунок, будь ласка.",
    ru: "Счёт, пожалуйста.",
    tokens: ["Prosím", "účet", "."],
  },

  // =========================
  // LESSON 27 — Гроші
  // =========================
  [k("peniaze", "гроші")]: {
    sk: "Nemám peniaze.",
    ua: "У мене немає грошей.",
    ru: "У меня нет денег.",
    tokens: ["Nemám", "peniaze", "."],
  },
  [k("euro", "євро")]: {
    sk: "To je jedno euro.",
    ua: "Це одне євро.",
    ru: "Это одно евро.",
    tokens: ["To", "je", "jedno", "euro", "."],
  },
  [k("cena", "ціна")]: {
    sk: "Aká je cena?",
    ua: "Яка ціна?",
    ru: "Какая цена?",
    tokens: ["Aká", "je", "cena", "?"],
  },
  [k("platba", "платіж")]: {
    sk: "Platba je kartou.",
    ua: "Платіж карткою.",
    ru: "Оплата картой.",
    tokens: ["Platba", "je", "kartou", "."],
  },
  [k("hotovosť", "готівка")]: {
    sk: "Platím hotovosťou.",
    ua: "Я плачу готівкою.",
    ru: "Я плачу наличными.",
    tokens: ["Platím", "hotovosťou", "."],
  },
  [k("karta", "картка")]: {
    sk: "Mám kartu.",
    ua: "У мене є картка.",
    ru: "У меня есть карта.",
    tokens: ["Mám", "kartu", "."],
  },
  [k("zľava", "знижка")]: {
    sk: "Je zľava.",
    ua: "Є знижка.",
    ru: "Есть скидка.",
    tokens: ["Je", "zľava", "."],
  },
  [k("výdavky", "витрати")]: {
    sk: "Mám veľké výdavky.",
    ua: "У мене великі витрати.",
    ru: "У меня большие расходы.",
    tokens: ["Mám", "veľké", "výdavky", "."],
  },

  // =========================
  // LESSON 28 — Технології
  // =========================
  [k("technológia", "технологія")]: {
    sk: "Technológia je moderná.",
    ua: "Технологія сучасна.",
    ru: "Технология современная.",
    tokens: ["Technológia", "je", "moderná", "."],
  },
  [k("počítač", "комп’ютер")]: {
    sk: "Mám nový počítač.",
    ua: "У мене новий комп’ютер.",
    ru: "У меня новый компьютер.",
    tokens: ["Mám", "nový", "počítač", "."],
  },
  [k("telefón", "телефон")]: {
    sk: "Môj telefón je nový.",
    ua: "Мій телефон новий.",
    ru: "Мой телефон новый.",
    tokens: ["Môj", "telefón", "je", "nový", "."],
  },
  [k("internet", "інтернет")]: {
    sk: "Používam internet.",
    ua: "Я користуюся інтернетом.",
    ru: "Я пользуюсь интернетом.",
    tokens: ["Používam", "internet", "."],
  },
  [k("aplikácia", "додаток")]: {
    sk: "Tá aplikácia je dobrá.",
    ua: "Цей додаток хороший.",
    ru: "Это приложение хорошее.",
    tokens: ["Tá", "aplikácia", "je", "dobrá", "."],
  },
  [k("program", "програма")]: {
    sk: "Ten program je nový.",
    ua: "Ця програма нова.",
    ru: "Эта программа новая.",
    tokens: ["Ten", "program", "je", "nový", "."],
  },
  [k("systém", "система")]: {
    sk: "Systém funguje.",
    ua: "Система працює.",
    ru: "Система работает.",
    tokens: ["Systém", "funguje", "."],
  },
  [k("sieť", "мережа")]: {
    sk: "Nemám sieť.",
    ua: "У мене немає мережі.",
    ru: "У меня нет сети.",
    tokens: ["Nemám", "sieť", "."],
  },
  [k("dáta", "дані")]: {
    sk: "Nemám dáta.",
    ua: "У мене немає даних.",
    ru: "У меня нет данных.",
    tokens: ["Nemám", "dáta", "."],
  },
  [k("heslo", "пароль")]: {
    sk: "Zabudol som heslo.",
    ua: "Я забув пароль.",
    ru: "Я забыл пароль.",
    tokens: ["Zabudol", "som", "heslo", "."],
  },

  // =========================
  // LESSON 29 — Повсякденні фрази
  // =========================
  [k("dobrý deň", "добрий день")]: {
    sk: "Dobrý deň!",
    ua: "Добрий день!",
    ru: "Добрый день!",
    tokens: ["Dobrý", "deň", "!"],
  },
  [k("ahoj", "привіт")]: {
    sk: "Ahoj!",
    ua: "Привіт!",
    ru: "Привет!",
    tokens: ["Ahoj", "!"],
  },
  [k("ďakujem", "дякую")]: {
    sk: "Ďakujem pekne.",
    ua: "Дякую дуже.",
    ru: "Большое спасибо.",
    tokens: ["Ďakujem", "pekne", "."],
  },
  [k("prosím", "будь ласка")]: {
    sk: "Prosím.",
    ua: "Будь ласка.",
    ru: "Пожалуйста.",
    tokens: ["Prosím", "."],
  },
  [k("prepáč", "вибач")]: {
    sk: "Prepáč mi.",
    ua: "Вибач мені.",
    ru: "Извини меня.",
    tokens: ["Prepáč", "mi", "."],
  },
  [k("rozumiem", "розумію")]: {
    sk: "Rozumiem.",
    ua: "Я розумію.",
    ru: "Я понимаю.",
    tokens: ["Rozumiem", "."],
  },
  [k("nerozumiem", "не розумію")]: {
    sk: "Nerozumiem.",
    ua: "Я не розумію.",
    ru: "Я не понимаю.",
    tokens: ["Nerozumiem", "."],
  },
  [k("pomôžte", "допоможіть")]: {
    sk: "Pomôžte mi, prosím.",
    ua: "Допоможіть мені, будь ласка.",
    ru: "Помогите мне, пожалуйста.",
    tokens: ["Pomôžte", "mi", ",", "prosím", "."],
  },
  [k("jasné", "ясно")]: {
    sk: "Jasné.",
    ua: "Ясно.",
    ru: "Ясно.",
    tokens: ["Jasné", "."],
  },
  [k("dobre", "добре")]: {
    sk: "Dobre.",
    ua: "Добре.",
    ru: "Хорошо.",
    tokens: ["Dobre", "."],
  },

  // =========================
  // LESSON 30 — Повторення бази
  // =========================
  [k("ja", "я")]: {
    sk: "Ja som tu.",
    ua: "Я тут.",
    ru: "Я здесь.",
    tokens: ["Ja", "som", "tu", "."],
  },
  [k("ty", "ти")]: {
    sk: "Ty si doma.",
    ua: "Ти вдома.",
    ru: "Ты дома.",
    tokens: ["Ty", "si", "doma", "."],
  },
  [k("on", "він")]: {
    sk: "On je doma.",
    ua: "Він вдома.",
    ru: "Он дома.",
    tokens: ["On", "je", "doma", "."],
  },
  [k("ona", "вона")]: {
    sk: "Ona je tu.",
    ua: "Вона тут.",
    ru: "Она здесь.",
    tokens: ["Ona", "je", "tu", "."],
  },
  [k("my", "ми")]: {
    sk: "My sme doma.",
    ua: "Ми вдома.",
    ru: "Мы дома.",
    tokens: ["My", "sme", "doma", "."],
  },
  [k("vy", "ви")]: {
    sk: "Vy ste pripravení.",
    ua: "Ви готові.",
    ru: "Вы готовы.",
    tokens: ["Vy", "ste", "pripravení", "."],
  },
  [k("oni", "вони")]: {
    sk: "Oni sú doma.",
    ua: "Вони вдома.",
    ru: "Они дома.",
    tokens: ["Oni", "sú", "doma", "."],
  },
  [k("byť", "бути")]: {
    sk: "Chcem byť šťastný.",
    ua: "Я хочу бути щасливим.",
    ru: "Я хочу быть счастливым.",
    tokens: ["Chcem", "byť", "šťastný", "."],
  },
  [k("mať", "мати")]: {
    sk: "Chcem mať auto.",
    ua: "Я хочу мати авто.",
    ru: "Я хочу иметь машину.",
    tokens: ["Chcem", "mať", "auto", "."],
  },
  [k("ísť", "йти")]: {
    sk: "Chcem ísť domov.",
    ua: "Я хочу йти додому.",
    ru: "Я хочу идти домой.",
    tokens: ["Chcem", "ísť", "domov", "."],
  },

};

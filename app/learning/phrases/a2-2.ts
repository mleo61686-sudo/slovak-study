// app/learning/phrases/a2-2.ts
import type { Phrase } from "./a2";
import { phraseKey } from "./phraseKey";

export const A2_PHRASES_2: Record<string, Phrase> = {
  // =========================
  // LESSON 11 — Strava a zdravé návyky
  // =========================
  [phraseKey("strava", "харчування", "a2-11")]: {
    sk: "Moja strava je teraz vyváženejšia.",
    ua: "Моє харчування зараз більш збалансоване.",
    ru: "Моё питание сейчас более сбалансированное.",
    tokens: ["Moja", "strava", "je", "teraz", "vyváženejšia", "."],
  },

  [phraseKey("zdravé jedlo", "здорова їжа", "a2-11")]: {
    sk: "Zdravé jedlo mi dodáva energiu.",
    ua: "Здорова їжа дає мені енергію.",
    ru: "Здоровая еда даёт мне энергию.",
    tokens: ["Zdravé", "jedlo", "mi", "dodáva", "energiu", "."],
  },

  [phraseKey("nezdravé", "нездоровий", "a2-11")]: {
    sk: "Fast food je väčšinou nezdravý.",
    ua: "Фастфуд здебільшого нездоровий.",
    ru: "Фастфуд чаще всего нездоровый.",
    tokens: ["Fast", "food", "je", "väčšinou", "nezdravý", "."],
  },

  [phraseKey("kalórie", "калорії", "a2-11")]: {
    sk: "Počítam kalórie len občas.",
    ua: "Я рахую калорії лише інколи.",
    ru: "Я считаю калории только иногда.",
    tokens: ["Počítam", "kalórie", "len", "občas", "."],
  },

  [phraseKey("vitamíny", "вітаміни", "a2-11")]: {
    sk: "Vitamíny získavam z ovocia a zeleniny.",
    ua: "Вітаміни я отримую з фруктів і овочів.",
    ru: "Витамины я получаю из фруктов и овощей.",
    tokens: ["Vitamíny", "získavam", "z", "ovocia", "a", "zeleniny", "."],
  },

  [phraseKey("bielkoviny", "білки", "a2-11")]: {
    sk: "Po tréningu potrebujem viac bielkovín.",
    ua: "Після тренування мені потрібно більше білків.",
    ru: "После тренировки мне нужно больше белка.",
    tokens: ["Po", "tréningu", "potrebujem", "viac", "bielkovín", "."],
  },

  [phraseKey("tuky", "жири", "a2-11")]: {
    sk: "Nie všetky tuky sú zlé.",
    ua: "Не всі жири погані.",
    ru: "Не все жиры плохие.",
    tokens: ["Nie", "všetky", "tuky", "sú", "zlé", "."],
  },

  [phraseKey("cukor", "цукор", "a2-11")]: {
    sk: "Snažím sa obmedziť cukor.",
    ua: "Я намагаюся обмежити цукор.",
    ru: "Я стараюсь ограничить сахар.",
    tokens: ["Snažím", "sa", "obmedziť", "cukor", "."],
  },

  [phraseKey("soľ", "сіль", "a2-11")]: {
    sk: "Dávam do jedla menej soli.",
    ua: "Я додаю в їжу менше солі.",
    ru: "Я добавляю в еду меньше соли.",
    tokens: ["Dávam", "do", "jedla", "menej", "soli", "."],
  },

  [phraseKey("hydratácia", "гідратація", "a2-11")]: {
    sk: "Hydratácia je dôležitá počas celého dňa.",
    ua: "Гідратація важлива протягом усього дня.",
    ru: "Гидратация важна в течение всего дня.",
    tokens: ["Hydratácia", "je", "dôležitá", "počas", "celého", "dňa", "."],
  },

  // =========================
  // LESSON 12 — Šport a aktivita
  // =========================
  [phraseKey("tréning", "тренування", "a2-12")]: {
    sk: "Mám tréning trikrát do týždňa.",
    ua: "Я тренуюся тричі на тиждень.",
    ru: "Я тренируюсь три раза в неделю.",
    tokens: ["Mám", "tréning", "trikrát", "do", "týždňa", "."],
  },

  [phraseKey("cvičiť", "тренуватися", "a2-12")]: {
    sk: "Začal som cvičiť pravidelne.",
    ua: "Я почав тренуватися регулярно.",
    ru: "Я начал тренироваться регулярно.",
    tokens: ["Začal", "som", "cvičiť", "pravidelne", "."],
  },

  [phraseKey("posilňovňa", "спортзал", "a2-12")]: {
    sk: "Dnes idem do posilňovne po práci.",
    ua: "Сьогодні йду в спортзал після роботи.",
    ru: "Сегодня иду в спортзал после работы.",
    tokens: ["Dnes", "idem", "do", "posilňovne", "po", "práci", "."],
  },

  [phraseKey("vytrvalosť", "витривалість", "a2-12")]: {
    sk: "Chcem zlepšiť svoju vytrvalosť.",
    ua: "Хочу покращити свою витривалість.",
    ru: "Хочу улучшить свою выносливость.",
    tokens: ["Chcem", "zlepšiť", "svoju", "vytrvalosť", "."],
  },

  [phraseKey("sila", "сила", "a2-12")]: {
    sk: "Sila prichádza postupne.",
    ua: "Сила приходить поступово.",
    ru: "Сила приходит постепенно.",
    tokens: ["Sila", "prichádza", "postupne", "."],
  },

  [phraseKey("tempo", "темп", "a2-12")]: {
    sk: "Držím rovnaké tempo počas behu.",
    ua: "Я тримаю однаковий темп під час бігу.",
    ru: "Я держу одинаковый темп во время бега.",
    tokens: ["Držím", "rovnaké", "tempo", "počas", "behu", "."],
  },

  [phraseKey("zahriať sa", "розігрітися", "a2-12")]: {
    sk: "Pred tréningom sa musím zahriať.",
    ua: "Перед тренуванням мені треба розігрітися.",
    ru: "Перед тренировкой мне нужно разогреться.",
    tokens: ["Pred", "tréningom", "sa", "musím", "zahriať", "."],
  },

  [phraseKey("natiahnuť sa", "розтягнутися", "a2-12")]: {
    sk: "Po tréningu sa vždy natiahnem.",
    ua: "Після тренування я завжди розтягуюся.",
    ru: "После тренировки я всегда растягиваюсь.",
    tokens: ["Po", "tréningu", "sa", "vždy", "natiahnem", "."],
  },

  [phraseKey("zranenie", "травма", "a2-12")]: {
    sk: "Kvôli zraneniu som týždeň necvičil.",
    ua: "Через травму я тиждень не тренувався.",
    ru: "Из-за травмы я неделю не тренировался.",
    tokens: ["Kvôli", "zraneniu", "som", "týždeň", "necvičil", "."],
  },

  [phraseKey("regenerácia", "відновлення", "a2-12")]: {
    sk: "Regenerácia je rovnako dôležitá ako tréning.",
    ua: "Відновлення так само важливе, як тренування.",
    ru: "Восстановление так же важно, как тренировка.",
    tokens: ["Regenerácia", "je", "rovnako", "dôležitá", "ako", "tréning", "."],
  },

  // =========================
  // LESSON 13 — Vzťahy a komunikácia
  // =========================
  [phraseKey("vzťah", "стосунки", "a2-13")]: {
    sk: "Vzťah potrebuje čas a pozornosť.",
    ua: "Стосункам потрібні час і увага.",
    ru: "Отношениям нужны время и внимание.",
    tokens: ["Vzťah", "potrebuje", "čas", "a", "pozornosť", "."],
  },

  [phraseKey("dôvera", "довіра", "a2-13")]: {
    sk: "Bez dôvery to nefunguje.",
    ua: "Без довіри це не працює.",
    ru: "Без доверия это не работает.",
    tokens: ["Bez", "dôvery", "to", "nefunguje", "."],
  },

  [phraseKey("rešpekt", "повага", "a2-13")]: {
    sk: "Rešpekt je základ dobrých vzťahov.",
    ua: "Повага — основа добрих стосунків.",
    ru: "Уважение — основа хороших отношений.",
    tokens: ["Rešpekt", "je", "základ", "dobrých", "vzťahov", "."],
  },

  [phraseKey("podpora", "підтримка", "a2-13")]: {
    sk: "Ďakujem ti za podporu.",
    ua: "Дякую тобі за підтримку.",
    ru: "Спасибо тебе за поддержку.",
    tokens: ["Ďakujem", "ti", "za", "podporu", "."],
  },

  [phraseKey("hádať sa", "сваритися", "a2-13")]: {
    sk: "Nechcem sa hádať kvôli maličkostiam.",
    ua: "Я не хочу сваритися через дрібниці.",
    ru: "Я не хочу ссориться из-за мелочей.",
    tokens: ["Nechcem", "sa", "hádať", "kvôli", "maličkostiam", "."],
  },

  [phraseKey("zmieriť sa", "помиритися", "a2-13")]: {
    sk: "Skúsme sa zmieriť a začať odznova.",
    ua: "Давай помиримося і почнемо знову.",
    ru: "Давай помиримся и начнём заново.",
    tokens: ["Skúsme", "sa", "zmieriť", "a", "začať", "odznova", "."],
  },

  [phraseKey("dohoda", "домовленість", "a2-13")]: {
    sk: "Platí naša dohoda?",
    ua: "Наша домовленість чинна?",
    ru: "Наша договорённость в силе?",
    tokens: ["Platí", "naša", "dohoda", "?"],
  },

  [phraseKey("kompromis", "компроміс", "a2-13")]: {
    sk: "Niekedy je kompromis najlepšie riešenie.",
    ua: "Іноді компроміс — найкраще рішення.",
    ru: "Иногда компромисс — лучшее решение.",
    tokens: ["Niekedy", "je", "kompromis", "najlepšie", "riešenie", "."],
  },

  [phraseKey("úprimný", "щирий", "a2-13")]: {
    sk: "Buď úprimný a povedz mi pravdu.",
    ua: "Будь щирим і скажи мені правду.",
    ru: "Будь искренним и скажи мне правду.",
    tokens: ["Buď", "úprimný", "a", "povedz", "mi", "pravdu", "."],
  },

  [phraseKey("trpezlivosť", "терпіння", "a2-13")]: {
    sk: "Na toto treba trpezlivosť.",
    ua: "Для цього потрібне терпіння.",
    ru: "Для этого нужно терпение.",
    tokens: ["Na", "toto", "treba", "trpezlivosť", "."],
  },

  // =========================
  // LESSON 14 — Online nákupy a doručenie
  // =========================
  [phraseKey("objednávka", "замовлення", "a2-14")]: {
    sk: "Moja objednávka ešte neprišla.",
    ua: "Моє замовлення ще не прийшло.",
    ru: "Мой заказ ещё не пришёл.",
    tokens: ["Moja", "objednávka", "ešte", "neprišla", "."],
  },

  [phraseKey("doručenie", "доставка", "a2-14")]: {
    sk: "Doručenie trvá dva až tri dni.",
    ua: "Доставка триває два-три дні.",
    ru: "Доставка занимает два-три дня.",
    tokens: ["Doručenie", "trvá", "dva", "až", "tri", "dni", "."],
  },

  [phraseKey("balík", "посилка", "a2-14")]: {
    sk: "Balík je už na ceste.",
    ua: "Посилка вже в дорозі.",
    ru: "Посылка уже в пути.",
    tokens: ["Balík", "je", "už", "na", "ceste", "."],
  },

  [phraseKey("kuriér", "кур’єр", "a2-14")]: {
    sk: "Kuriér mi zavolá pred doručením.",
    ua: "Кур’єр подзвонить мені перед доставкою.",
    ru: "Курьер позвонит мне перед доставкой.",
    tokens: ["Kuriér", "mi", "zavolá", "pred", "doručením", "."],
  },

  [phraseKey("sledovanie zásielky", "відстеження посилки", "a2-14")]: {
    sk: "V aplikácii vidím sledovanie zásielky.",
    ua: "У додатку я бачу відстеження посилки.",
    ru: "В приложении я вижу отслеживание посылки.",
    tokens: ["V", "aplikácii", "vidím", "sledovanie", "zásielky", "."],
  },

  [phraseKey("adresa doručenia", "адреса доставки", "a2-14")]: {
    sk: "Zmenil som adresu doručenia.",
    ua: "Я змінив адресу доставки.",
    ru: "Я изменил адрес доставки.",
    tokens: ["Zmenil", "som", "adresu", "doručenia", "."],
  },

  [phraseKey("vrátenie", "повернення", "a2-14")]: {
    sk: "Chcem požiadať o vrátenie.",
    ua: "Я хочу подати запит на повернення.",
    ru: "Я хочу оформить возврат.",
    tokens: ["Chcem", "požiadať", "o", "vrátenie", "."],
  },

  [phraseKey("výmena", "обмін", "a2-14")]: {
    sk: "Je možná výmena veľkosti?",
    ua: "Можливий обмін розміру?",
    ru: "Возможен обмен размера?",
    tokens: ["Je", "možná", "výmena", "veľkosti", "?"],
  },

  [phraseKey("poštovné", "вартість доставки", "a2-14")]: {
    sk: "Poštovné je v cene alebo zvlášť?",
    ua: "Вартість доставки входить у ціну чи окремо?",
    ru: "Стоимость доставки входит в цену или отдельно?",
    tokens: ["Poštovné", "je", "v", "cene", "alebo", "zvlášť", "?"],
  },

  [phraseKey("platba kartou", "оплата карткою", "a2-14")]: {
    sk: "Preferujem platbu kartou.",
    ua: "Я надаю перевагу оплаті карткою.",
    ru: "Я предпочитаю оплату картой.",
    tokens: ["Preferujem", "platbu", "kartou", "."],
  },

  // =========================
  // LESSON 15 — Technológie (situácie)
  // =========================
  [phraseKey("nastaviť", "налаштувати", "a2-15")]: {
    sk: "Pomôžete mi nastaviť internet?",
    ua: "Допоможете мені налаштувати інтернет?",
    ru: "Поможете мне настроить интернет?",
    tokens: ["Pomôžete", "mi", "nastaviť", "internet", "?"],
  },

  [phraseKey("aktualizácia", "оновлення", "a2-15")]: {
    sk: "Po aktualizácii sa telefón reštartoval.",
    ua: "Після оновлення телефон перезавантажився.",
    ru: "После обновления телефон перезагрузился.",
    tokens: ["Po", "aktualizácii", "sa", "telefón", "reštartoval", "."],
  },

  [phraseKey("pripojenie", "підключення", "a2-15")]: {
    sk: "Pripojenie je dnes nestabilné.",
    ua: "Підключення сьогодні нестабільне.",
    ru: "Подключение сегодня нестабильное.",
    tokens: ["Pripojenie", "je", "dnes", "nestabilné", "."],
  },

  [phraseKey("signál", "сигнал", "a2-15")]: {
    sk: "V tejto miestnosti je slabý signál.",
    ua: "У цій кімнаті слабкий сигнал.",
    ru: "В этой комнате слабый сигнал.",
    tokens: ["V", "tejto", "miestnosti", "je", "slabý", "signál", "."],
  },

  [phraseKey("výpadok", "збій/відключення", "a2-15")]: {
    sk: "Máme výpadok elektriny.",
    ua: "У нас відключення електрики.",
    ru: "У нас отключение электричества.",
    tokens: ["Máme", "výpadok", "elektriny", "."],
  },

  [phraseKey("zaseknúť sa", "зависнути", "a2-15")]: {
    sk: "Aplikácia sa mi zasekla.",
    ua: "У мене завис додаток.",
    ru: "У меня зависло приложение.",
    tokens: ["Aplikácia", "sa", "mi", "zasekla", "."],
  },

  [phraseKey("reštartovať", "перезавантажити", "a2-15")]: {
    sk: "Skúsim reštartovať počítač.",
    ua: "Спробую перезавантажити комп’ютер.",
    ru: "Попробую перезагрузить компьютер.",
    tokens: ["Skúsim", "reštartovať", "počítač", "."],
  },

  [phraseKey("nainštalovať", "встановити", "a2-15")]: {
    sk: "Musím nainštalovať nový program.",
    ua: "Мені потрібно встановити нову програму.",
    ru: "Мне нужно установить новую программу.",
    tokens: ["Musím", "nainštalovať", "nový", "program", "."],
  },

  [phraseKey("vymazať", "видалити", "a2-15")]: {
    sk: "Chcem vymazať staré súbory.",
    ua: "Я хочу видалити старі файли.",
    ru: "Я хочу удалить старые файлы.",
    tokens: ["Chcem", "vymazať", "staré", "súbory", "."],
  },

  [phraseKey("obnoviť", "відновити", "a2-15")]: {
    sk: "Dá sa to obnoviť zo zálohy.",
    ua: "Це можна відновити з резервної копії.",
    ru: "Это можно восстановить из резервной копии.",
    tokens: ["Dá", "sa", "to", "obnoviť", "zo", "zálohy", "."],
  },

  // =========================
  // LESSON 16 — Vzdelanie a učenie sa
  // =========================
  [phraseKey("kurz", "курс", "a2-16")]: {
    sk: "Zapísal som sa na kurz slovenčiny.",
    ua: "Я записався на курс словацької.",
    ru: "Я записался на курс словацкого.",
    tokens: ["Zapísal", "som", "sa", "na", "kurz", "slovenčiny", "."],
  },

  [phraseKey("prednáška", "лекція", "a2-16")]: {
    sk: "Prednáška začína o ôsmej.",
    ua: "Лекція починається о восьмій.",
    ru: "Лекция начинается в восемь.",
    tokens: ["Prednáška", "začína", "o", "ôsmej", "."],
  },

  [phraseKey("poznámky", "конспект/нотатки", "a2-16")]: {
    sk: "Robím si poznámky počas hodiny.",
    ua: "Я роблю нотатки під час уроку.",
    ru: "Я делаю заметки во время урока.",
    tokens: ["Robím", "si", "poznámky", "počas", "hodiny", "."],
  },

  [phraseKey("domáca úloha", "домашнє завдання", "a2-16")]: {
    sk: "Domácu úlohu musím odovzdať do piatku.",
    ua: "Домашнє завдання треба здати до п’ятниці.",
    ru: "Домашнее задание нужно сдать до пятницы.",
    tokens: ["Domácu", "úlohu", "musím", "odovzdať", "do", "piatku", "."],
  },

  [phraseKey("skúška", "іспит", "a2-16")]: {
    sk: "Na skúšku sa pripravujem celý týždeň.",
    ua: "До іспиту готуюся весь тиждень.",
    ru: "К экзамену готовлюсь всю неделю.",
    tokens: ["Na", "skúšku", "sa", "pripravujem", "celý", "týždeň", "."],
  },

  [phraseKey("certifikát", "сертифікат", "a2-16")]: {
    sk: "Po kurze dostanem certifikát.",
    ua: "Після курсу я отримаю сертифікат.",
    ru: "После курса я получу сертификат.",
    tokens: ["Po", "kurze", "dostanem", "certifikát", "."],
  },

  [phraseKey("zručnosť", "навичка", "a2-16")]: {
    sk: "Táto zručnosť sa mi zíde v práci.",
    ua: "Ця навичка стане мені в пригоді на роботі.",
    ru: "Этот навык пригодится мне на работе.",
    tokens: ["Táto", "zručnosť", "sa", "mi", "zíde", "v", "práci", "."],
  },

  [phraseKey("zlepšiť sa", "покращитися", "a2-16")]: {
    sk: "Chcem sa zlepšiť v gramatike.",
    ua: "Хочу покращитися в граматиці.",
    ru: "Хочу улучшиться в грамматике.",
    tokens: ["Chcem", "sa", "zlepšiť", "v", "gramatike", "."],
  },

  [phraseKey("opakovať", "повторювати", "a2-16")]: {
    sk: "Každý deň opakujem nové slová.",
    ua: "Щодня повторюю нові слова.",
    ru: "Каждый день повторяю новые слова.",
    tokens: ["Každý", "deň", "opakujem", "nové", "slová", "."],
  },

  [phraseKey("učiť sa naspamäť", "вчити напам’ять", "a2-16")]: {
    sk: "Nemusíš sa to učiť naspamäť.",
    ua: "Тобі не потрібно вчити це напам’ять.",
    ru: "Тебе не нужно учить это наизусть.",
    tokens: ["Nemusíš", "sa", "to", "učiť", "naspamäť", "."],
  },

  // =========================
  // LESSON 17 — V práci (komunikácia)
  // =========================
  [phraseKey("rozdeliť úlohy", "розподілити завдання", "a2-17")]: {
    sk: "Musíme rozdeliť úlohy medzi tím.",
    ua: "Ми маємо розподілити завдання між командою.",
    ru: "Нам нужно распределить задачи между командой.",
    tokens: ["Musíme", "rozdeliť", "úlohy", "medzi", "tím", "."],
  },

  [phraseKey("spolupracovať", "співпрацювати", "a2-17")]: {
    sk: "Je dôležité spolupracovať.",
    ua: "Важливо співпрацювати.",
    ru: "Важно сотрудничать.",
    tokens: ["Je", "dôležité", "spolupracovať", "."],
  },

  [phraseKey("priorita", "пріоритет", "a2-17")]: {
    sk: "Toto je teraz moja priorita.",
    ua: "Це зараз мій пріоритет.",
    ru: "Это сейчас мой приоритет.",
    tokens: ["Toto", "je", "teraz", "moja", "priorita", "."],
  },

  [phraseKey("zodpovedať", "відповідати (бути відповідальним)", "a2-17")]: {
    sk: "Za výsledok zodpovedám ja.",
    ua: "За результат відповідаю я.",
    ru: "За результат отвечаю я.",
    tokens: ["Za", "výsledok", "zodpovedám", "ja", "."],
  },

  [phraseKey("odovzdať", "здати/передати", "a2-17")]: {
    sk: "Odovzdám to do konca dňa.",
    ua: "Я здам це до кінця дня.",
    ru: "Я сдам это до конца дня.",
    tokens: ["Odovzdám", "to", "do", "konca", "dňa", "."],
  },

  [phraseKey("skontrolovať", "перевірити", "a2-17")]: {
    sk: "Môžete to ešte raz skontrolovať?",
    ua: "Можете ще раз це перевірити?",
    ru: "Можете ещё раз это проверить?",
    tokens: ["Môžete", "to", "ešte", "raz", "skontrolovať", "?"],
  },

  [phraseKey("organizovať", "організовувати", "a2-17")]: {
    sk: "Kto bude organizovať poradu?",
    ua: "Хто буде організовувати нараду?",
    ru: "Кто будет организовывать совещание?",
    tokens: ["Kto", "bude", "organizovať", "poradu", "?"],
  },

  [phraseKey("spätná väzba", "зворотний зв’язок", "a2-17")]: {
    sk: "Pošlite mi, prosím, spätnú väzbu.",
    ua: "Надішліть мені, будь ласка, зворотний зв’язок.",
    ru: "Пришлите мне, пожалуйста, обратную связь.",
    tokens: ["Pošlite", "mi", ",", "prosím", ",", "spätnú", "väzbu", "."],
  },

  [phraseKey("navrhnúť riešenie", "запропонувати рішення", "a2-17")]: {
    sk: "Môžem navrhnúť riešenie?",
    ua: "Можу запропонувати рішення?",
    ru: "Могу предложить решение?",
    tokens: ["Môžem", "navrhnúť", "riešenie", "?"],
  },

  [phraseKey("dokončiť", "завершити", "a2-17")]: {
    sk: "Potrebujem to dokončiť dnes.",
    ua: "Мені потрібно завершити це сьогодні.",
    ru: "Мне нужно закончить это сегодня.",
    tokens: ["Potrebujem", "to", "dokončiť", "dnes", "."],
  },

  // =========================
  // LESSON 18 — Banka
  // =========================
  [phraseKey("založiť účet", "відкрити рахунок", "a2-18")]: {
    sk: "Chcem si založiť účet v tejto banke.",
    ua: "Я хочу відкрити рахунок у цьому банку.",
    ru: "Я хочу открыть счёт в этом банке.",
    tokens: ["Chcem", "si", "založiť", "účet", "v", "tejto", "banke", "."],
  },

  [phraseKey("výber", "зняття (грошей)", "a2-18")]: {
    sk: "Za výber z bankomatu je poplatok.",
    ua: "За зняття в банкоматі є комісія.",
    ru: "За снятие в банкомате есть комиссия.",
    tokens: ["Za", "výber", "z", "bankomatu", "je", "poplatok", "."],
  },

  [phraseKey("vklad", "внесення (грошей)", "a2-18")]: {
    sk: "Vklad môžem urobiť aj na pobočke.",
    ua: "Внесення можу зробити також у відділенні.",
    ru: "Внесение могу сделать также в отделении.",
    tokens: ["Vklad", "môžem", "urobiť", "aj", "na", "pobočke", "."],
  },

  [phraseKey("previesť", "перевести (гроші)", "a2-18")]: {
    sk: "Môžete previesť peniaze na tento účet?",
    ua: "Можете переказати гроші на цей рахунок?",
    ru: "Можете перевести деньги на этот счёт?",
    tokens: ["Môžete", "previesť", "peniaze", "na", "tento", "účet", "?"],
  },

  [phraseKey("platobná karta", "платіжна картка", "a2-18")]: {
    sk: "Platobnú kartu vám pošleme poštou.",
    ua: "Платіжну картку надішлемо вам поштою.",
    ru: "Платёжную карту мы отправим вам по почте.",
    tokens: ["Platobnú", "kartu", "vám", "pošleme", "poštou", "."],
  },

  [phraseKey("PIN kód", "пін-код", "a2-18")]: {
    sk: "PIN kód si nikomu nepíšte ani nehovorte.",
    ua: "Пін-код нікому не записуйте і не говоріть.",
    ru: "ПИН-код никому не записывайте и не говорите.",
    tokens: ["PIN", "kód", "si", "nikomu", "nepíšte", "ani", "nehovorte", "."],
  },

  [phraseKey("limit", "ліміт", "a2-18")]: {
    sk: "Môžem si zmeniť denný limit?",
    ua: "Я можу змінити денний ліміт?",
    ru: "Я могу изменить дневной лимит?",
    tokens: ["Môžem", "si", "zmeniť", "denný", "limit", "?"],
  },

  [phraseKey("poplatok", "комісія", "a2-18")]: {
    sk: "Aký poplatok je za vedenie účtu?",
    ua: "Яка комісія за обслуговування рахунку?",
    ru: "Какая комиссия за обслуживание счёта?",
    tokens: ["Aký", "poplatok", "je", "za", "vedenie", "účtu", "?"],
  },

  [phraseKey("výpis", "виписка", "a2-18")]: {
    sk: "Potrebujem výpis z účtu za minulý mesiac.",
    ua: "Мені потрібна виписка з рахунку за минулий місяць.",
    ru: "Мне нужна выписка со счёта за прошлый месяц.",
    tokens: ["Potrebujem", "výpis", "z", "účtu", "za", "minulý", "mesiac", "."],
  },

  [phraseKey("blokovať kartu", "заблокувати картку", "a2-18")]: {
    sk: "Musím si blokovať kartu, lebo som ju stratil.",
    ua: "Мені треба заблокувати картку, бо я її загубив.",
    ru: "Мне нужно заблокировать карту, потому что я её потерял.",
    tokens: ["Musím", "si", "blokovať", "kartu", ",", "lebo", "som", "ju", "stratil", "."],
  },

  // =========================
  // LESSON 19 — Úrady a doklady
  // =========================
  [phraseKey("povolenie", "дозвіл", "a2-19")]: {
    sk: "Potrebujem povolenie na prácu.",
    ua: "Мені потрібен дозвіл на роботу.",
    ru: "Мне нужно разрешение на работу.",
    tokens: ["Potrebujem", "povolenie", "na", "prácu", "."],
  },

  [phraseKey("pobyt", "дозвіл на проживання/побут", "a2-19")]: {
    sk: "Žiadam o prechodný pobyt.",
    ua: "Я подаю на тимчасове проживання.",
    ru: "Я подаю на временный вид на жительство.",
    tokens: ["Žiadam", "o", "prechodný", "pobyt", "."],
  },

  [phraseKey("občiansky preukaz", "ID-картка", "a2-19")]: {
    sk: "Potrebujem občiansky preukaz alebo pas.",
    ua: "Мені потрібна ID-картка або паспорт.",
    ru: "Мне нужна ID-карта или паспорт.",
    tokens: ["Potrebujem", "občiansky", "preukaz", "alebo", "pas", "."],
  },

  [phraseKey("registrácia", "реєстрація", "a2-19")]: {
    sk: "Registrácia prebieha online.",
    ua: "Реєстрація проходить онлайн.",
    ru: "Регистрация проходит онлайн.",
    tokens: ["Registrácia", "prebieha", "online", "."],
  },

  [phraseKey("podpis", "підпис", "a2-19")]: {
    sk: "Tu je môj podpis.",
    ua: "Ось мій підпис.",
    ru: "Вот моя подпись.",
    tokens: ["Tu", "je", "môj", "podpis", "."],
  },

  [phraseKey("fotografia", "фото", "a2-19")]: {
    sk: "Potrebujete aj fotografiu na doklad.",
    ua: "Потрібне також фото на документ.",
    ru: "Нужна также фотография на документ.",
    tokens: ["Potrebujete", "aj", "fotografiu", "na", "doklad", "."],
  },

  [phraseKey("overiť", "завірити/підтвердити", "a2-19")]: {
    sk: "Môžete mi overiť podpis?",
    ua: "Можете мені завірити підпис?",
    ru: "Можете мне заверить подпись?",
    tokens: ["Môžete", "mi", "overiť", "podpis", "?"],
  },

  [phraseKey("termín stretnutia", "дата прийому", "a2-19")]: {
    sk: "Aký je termín stretnutia?",
    ua: "Яка дата прийому?",
    ru: "Какая дата приёма?",
    tokens: ["Aký", "je", "termín", "stretnutia", "?"],
  },

  [phraseKey("vybaviť", "оформити/вирішити (справу)", "a2-19")]: {
    sk: "Potrebujem to vybaviť čo najskôr.",
    ua: "Мені треба це оформити/вирішити якнайшвидше.",
    ru: "Мне нужно это оформить/решить как можно скорее.",
    tokens: ["Potrebujem", "to", "vybaviť", "čo", "najskôr", "."],
  },

  [phraseKey("rodné číslo", "ідентифікаційний номер", "a2-19")]: {
    sk: "Prosím, uveďte rodné číslo.",
    ua: "Будь ласка, вкажіть ідентифікаційний номер.",
    ru: "Пожалуйста, укажите идентификационный номер.",
    tokens: ["Prosím", ",", "uveďte", "rodné", "číslo", "."],
  },

  // =========================
  // LESSON 20 — Opakovanie A2 (11–19)
  // =========================
  [phraseKey("strava", "харчування", "a2-20")]: {
    sk: "Počas týždňa mám jednoduchú stravu.",
    ua: "Протягом тижня в мене просте харчування.",
    ru: "В течение недели у меня простое питание.",
    tokens: ["Počas", "týždňa", "mám", "jednoduchú", "stravu", "."],
  },

  [phraseKey("tréning", "тренування", "a2-20")]: {
    sk: "Dnešný tréning bol náročný, ale dobrý.",
    ua: "Сьогоднішнє тренування було складне, але добре.",
    ru: "Сегодняшняя тренировка была тяжёлой, но хорошей.",
    tokens: ["Dnešný", "tréning", "bol", "náročný", ",", "ale", "dobrý", "."],
  },

  [phraseKey("kompromis", "компроміс", "a2-20")]: {
    sk: "Nakoniec sme našli kompromis.",
    ua: "Зрештою ми знайшли компроміс.",
    ru: "В итоге мы нашли компромисс.",
    tokens: ["Nakoniec", "sme", "našli", "kompromis", "."],
  },

  [phraseKey("doručenie", "доставка", "a2-20")]: {
    sk: "Doručenie bolo rýchlejšie, než som čakal.",
    ua: "Доставка була швидшою, ніж я очікував.",
    ru: "Доставка была быстрее, чем я ожидал.",
    tokens: ["Doručenie", "bolo", "rýchlejšie", ",", "než", "som", "čakal", "."],
  },

  [phraseKey("aktualizácia", "оновлення", "a2-20")]: {
    sk: "Po aktualizácii už všetko funguje.",
    ua: "Після оновлення все вже працює.",
    ru: "После обновления всё уже работает.",
    tokens: ["Po", "aktualizácii", "už", "všetko", "funguje", "."],
  },

  [phraseKey("prednáška", "лекція", "a2-20")]: {
    sk: "Prednáška bola zaujímavá a praktická.",
    ua: "Лекція була цікава і практична.",
    ru: "Лекция была интересной и практичной.",
    tokens: ["Prednáška", "bola", "zaujímavá", "a", "praktická", "."],
  },

  [phraseKey("spätná väzba", "зворотний зв’язок", "a2-20")]: {
    sk: "Spätná väzba mi pomohla zlepšiť sa.",
    ua: "Зворотний зв’язок допоміг мені покращитися.",
    ru: "Обратная связь помогла мне улучшиться.",
    tokens: ["Spätná", "väzba", "mi", "pomohla", "zlepšiť", "sa", "."],
  },

  [phraseKey("výpis", "виписка", "a2-20")]: {
    sk: "Výpis som si stiahol z internet bankingu.",
    ua: "Я завантажив виписку з інтернет-банкінгу.",
    ru: "Я скачал выписку из интернет-банкинга.",
    tokens: ["Výpis", "som", "si", "stiahol", "z", "internet", "bankingu", "."],
  },

  [phraseKey("povolenie", "дозвіл", "a2-20")]: {
    sk: "Bez povolenia to nemôžem urobiť.",
    ua: "Без дозволу я не можу це зробити.",
    ru: "Без разрешения я не могу это сделать.",
    tokens: ["Bez", "povolenia", "to", "nemôžem", "urobiť", "."],
  },

  [phraseKey("vybaviť", "оформити/вирішити", "a2-20")]: {
    sk: "Zajtra to skúsim vybaviť na úrade.",
    ua: "Завтра спробую це оформити в установі.",
    ru: "Завтра попробую это оформить в учреждении.",
    tokens: ["Zajtra", "to", "skúsim", "vybaviť", "na", "úrade", "."],
  },
};
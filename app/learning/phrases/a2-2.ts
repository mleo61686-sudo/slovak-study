// app/learning/phrases/a2-2.ts
import type { Phrase } from "./a2";
import { phraseKey } from "./phraseKey";

export const A2_PHRASES_2: Record<string, Phrase> = {
  // =========================
  // LESSON 11 — Strava a zdravé návyky
  // =========================
  [phraseKey("strava", "a2-11")]: {
    sk: "Moja strava je teraz vyváženejšia.",
    ua: "Моє харчування зараз більш збалансоване.",
    ru: "Моё питание сейчас более сбалансированное.",
    en: "My diet is more balanced now.",
    tokens: ["Moja", "strava", "je", "teraz", "vyváženejšia", "."],
  },

  [phraseKey("zdravé jedlo", "a2-11")]: {
    sk: "Zdravé jedlo mi dodáva energiu.",
    ua: "Здорова їжа дає мені енергію.",
    ru: "Здоровая еда даёт мне энергию.",
    en: "Healthy food gives me energy.",
    tokens: ["Zdravé", "jedlo", "mi", "dodáva", "energiu", "."],
  },

  [phraseKey("nezdravé", "a2-11")]: {
    sk: "Fast food je väčšinou nezdravý.",
    ua: "Фастфуд здебільшого нездоровий.",
    ru: "Фастфуд чаще всего нездоровый.",
    en: "Fast food is usually unhealthy.",
    tokens: ["Fast", "food", "je", "väčšinou", "nezdravý", "."],
  },

  [phraseKey("kalórie", "a2-11")]: {
    sk: "Počítam kalórie len občas.",
    ua: "Я рахую калорії лише інколи.",
    ru: "Я считаю калории только иногда.",
    en: "I only count calories sometimes.",
    tokens: ["Počítam", "kalórie", "len", "občas", "."],
  },

  [phraseKey("vitamíny", "a2-11")]: {
    sk: "Vitamíny získavam z ovocia a zeleniny.",
    ua: "Вітаміни я отримую з фруктів і овочів.",
    ru: "Витамины я получаю из фруктов и овощей.",
    en: "I get vitamins from fruit and vegetables.",
    tokens: ["Vitamíny", "získavam", "z", "ovocia", "a", "zeleniny", "."],
  },

  [phraseKey("bielkoviny", "a2-11")]: {
    sk: "Po tréningu potrebujem viac bielkovín.",
    ua: "Після тренування мені потрібно більше білків.",
    ru: "После тренировки мне нужно больше белка.",
    en: "After training I need more protein.",
    tokens: ["Po", "tréningu", "potrebujem", "viac", "bielkovín", "."],
  },

  [phraseKey("tuky", "a2-11")]: {
    sk: "Nie všetky tuky sú zlé.",
    ua: "Не всі жири погані.",
    ru: "Не все жиры плохие.",
    en: "Not all fats are bad.",
    tokens: ["Nie", "všetky", "tuky", "sú", "zlé", "."],
  },

  [phraseKey("cukor", "a2-11")]: {
    sk: "Snažím sa obmedziť cukor.",
    ua: "Я намагаюся обмежити цукор.",
    ru: "Я стараюсь ограничить сахар.",
    en: "I try to limit sugar.",
    tokens: ["Snažím", "sa", "obmedziť", "cukor", "."],
  },

  [phraseKey("soľ", "a2-11")]: {
    sk: "Dávam do jedla menej soli.",
    ua: "Я додаю в їжу менше солі.",
    ru: "Я добавляю в еду меньше соли.",
    en: "I put less salt in food.",
    tokens: ["Dávam", "do", "jedla", "menej", "soli", "."],
  },

  [phraseKey("hydratácia", "a2-11")]: {
    sk: "Hydratácia je dôležitá počas celého dňa.",
    ua: "Гідратація важлива протягом усього дня.",
    ru: "Гидратация важна в течение всего дня.",
    en: "Hydration is important throughout the whole day.",
    tokens: ["Hydratácia", "je", "dôležitá", "počas", "celého", "dňa", "."],
  },

  // =========================
  // LESSON 12 — Šport a aktivita
  // =========================
  [phraseKey("tréning", "a2-12")]: {
    sk: "Mám tréning trikrát do týždňa.",
    ua: "Я тренуюся тричі на тиждень.",
    ru: "Я тренируюсь три раза в неделю.",
    en: "I train three times a week.",
    tokens: ["Mám", "tréning", "trikrát", "do", "týždňa", "."],
  },

  [phraseKey("cvičiť", "a2-12")]: {
    sk: "Začal som cvičiť pravidelne.",
    ua: "Я почав тренуватися регулярно.",
    ru: "Я начал тренироваться регулярно.",
    en: "I started exercising regularly.",
    tokens: ["Začal", "som", "cvičiť", "pravidelne", "."],
  },

  [phraseKey("posilňovňa", "a2-12")]: {
    sk: "Dnes idem do posilňovne po práci.",
    ua: "Сьогодні йду в спортзал після роботи.",
    ru: "Сегодня иду в спортзал после работы.",
    en: "Today I am going to the gym after work.",
    tokens: ["Dnes", "idem", "do", "posilňovne", "po", "práci", "."],
  },

  [phraseKey("vytrvalosť", "a2-12")]: {
    sk: "Chcem zlepšiť svoju vytrvalosť.",
    ua: "Хочу покращити свою витривалість.",
    ru: "Хочу улучшить свою выносливость.",
    en: "I want to improve my endurance.",
    tokens: ["Chcem", "zlepšiť", "svoju", "vytrvalosť", "."],
  },

  [phraseKey("sila", "a2-12")]: {
    sk: "Sila prichádza postupne.",
    ua: "Сила приходить поступово.",
    ru: "Сила приходит постепенно.",
    en: "Strength comes gradually.",
    tokens: ["Sila", "prichádza", "postupne", "."],
  },

  [phraseKey("tempo", "a2-12")]: {
    sk: "Držím rovnaké tempo počas behu.",
    ua: "Я тримаю однаковий темп під час бігу.",
    ru: "Я держу одинаковый темп во время бега.",
    en: "I keep the same pace while running.",
    tokens: ["Držím", "rovnaké", "tempo", "počas", "behu", "."],
  },

  [phraseKey("zahriať sa", "a2-12")]: {
    sk: "Pred tréningom sa musím zahriať.",
    ua: "Перед тренуванням мені треба розігрітися.",
    ru: "Перед тренировкой мне нужно разогреться.",
    en: "I need to warm up before training.",
    tokens: ["Pred", "tréningom", "sa", "musím", "zahriať", "."],
  },

  [phraseKey("natiahnuť sa", "a2-12")]: {
    sk: "Po tréningu sa vždy natiahnem.",
    ua: "Після тренування я завжди розтягуюся.",
    ru: "После тренировки я всегда растягиваюсь.",
    en: "I always stretch after training.",
    tokens: ["Po", "tréningu", "sa", "vždy", "natiahnem", "."],
  },

  [phraseKey("zranenie", "a2-12")]: {
    sk: "Kvôli zraneniu som týždeň necvičil.",
    ua: "Через травму я тиждень не тренувався.",
    ru: "Из-за травмы я неделю не тренировался.",
    en: "Because of an injury, I did not exercise for a week.",
    tokens: ["Kvôli", "zraneniu", "som", "týždeň", "necvičil", "."],
  },

  [phraseKey("regenerácia", "a2-12")]: {
    sk: "Regenerácia je rovnako dôležitá ako tréning.",
    ua: "Відновлення так само важливе, як тренування.",
    ru: "Восстановление так же важно, как тренировка.",
    en: "Recovery is just as important as training.",
    tokens: ["Regenerácia", "je", "rovnako", "dôležitá", "ako", "tréning", "."],
  },

  // =========================
  // LESSON 13 — Vzťahy a komunikácia
  // =========================
  [phraseKey("vzťah", "a2-13")]: {
    sk: "Vzťah potrebuje čas a pozornosť.",
    ua: "Стосункам потрібні час і увага.",
    ru: "Отношениям нужны время и внимание.",
    en: "A relationship needs time and attention.",
    tokens: ["Vzťah", "potrebuje", "čas", "a", "pozornosť", "."],
  },

  [phraseKey("dôvera", "a2-13")]: {
    sk: "Bez dôvery to nefunguje.",
    ua: "Без довіри це не працює.",
    ru: "Без доверия это не работает.",
    en: "Without trust, it does not work.",
    tokens: ["Bez", "dôvery", "to", "nefunguje", "."],
  },

  [phraseKey("rešpekt", "a2-13")]: {
    sk: "Rešpekt je základ dobrých vzťahov.",
    ua: "Повага — основа добрих стосунків.",
    ru: "Уважение — основа хороших отношений.",
    en: "Respect is the foundation of good relationships.",
    tokens: ["Rešpekt", "je", "základ", "dobrých", "vzťahov", "."],
  },

  [phraseKey("podpora", "a2-13")]: {
    sk: "Ďakujem ti za podporu.",
    ua: "Дякую тобі за підтримку.",
    ru: "Спасибо тебе за поддержку.",
    en: "Thank you for your support.",
    tokens: ["Ďakujem", "ti", "za", "podporu", "."],
  },

  [phraseKey("hádať sa", "a2-13")]: {
    sk: "Nechcem sa hádať kvôli maličkostiam.",
    ua: "Я не хочу сваритися через дрібниці.",
    ru: "Я не хочу ссориться из-за мелочей.",
    en: "I do not want to argue over small things.",
    tokens: ["Nechcem", "sa", "hádať", "kvôli", "maličkostiam", "."],
  },

  [phraseKey("zmieriť sa", "a2-13")]: {
    sk: "Skúsme sa zmieriť a začať odznova.",
    ua: "Давай помиримося і почнемо знову.",
    ru: "Давай помиримся и начнём заново.",
    en: "Let us make peace and start again.",
    tokens: ["Skúsme", "sa", "zmieriť", "a", "začať", "odznova", "."],
  },

  [phraseKey("dohoda", "a2-13")]: {
    sk: "Platí naša dohoda?",
    ua: "Наша домовленість чинна?",
    ru: "Наша договорённость в силе?",
    en: "Is our agreement still valid?",
    tokens: ["Platí", "naša", "dohoda", "?"],
  },

  [phraseKey("kompromis", "a2-13")]: {
    sk: "Niekedy je kompromis najlepšie riešenie.",
    ua: "Іноді компроміс — найкраще рішення.",
    ru: "Иногда компромисс — лучшее решение.",
    en: "Sometimes compromise is the best solution.",
    tokens: ["Niekedy", "je", "kompromis", "najlepšie", "riešenie", "."],
  },

  [phraseKey("úprimný", "a2-13")]: {
    sk: "Buď úprimný a povedz mi pravdu.",
    ua: "Будь щирим і скажи мені правду.",
    ru: "Будь искренним и скажи мне правду.",
    en: "Be honest and tell me the truth.",
    tokens: ["Buď", "úprimný", "a", "povedz", "mi", "pravdu", "."],
  },

  [phraseKey("trpezlivosť", "a2-13")]: {
    sk: "Na toto treba trpezlivosť.",
    ua: "Для цього потрібне терпіння.",
    ru: "Для этого нужно терпение.",
    en: "This requires patience.",
    tokens: ["Na", "toto", "treba", "trpezlivosť", "."],
  },

  // =========================
  // LESSON 14 — Online nákupy a doručenie
  // =========================
  [phraseKey("objednávka", "a2-14")]: {
    sk: "Moja objednávka ešte neprišla.",
    ua: "Моє замовлення ще не прийшло.",
    ru: "Мой заказ ещё не пришёл.",
    en: "My order has not arrived yet.",
    tokens: ["Moja", "objednávka", "ešte", "neprišla", "."],
  },

  [phraseKey("doručenie", "a2-14")]: {
    sk: "Doručenie trvá dva až tri dni.",
    ua: "Доставка триває два-три дні.",
    ru: "Доставка занимает два-три дня.",
    en: "Delivery takes two to three days.",
    tokens: ["Doručenie", "trvá", "dva", "až", "tri", "dni", "."],
  },

  [phraseKey("balík", "a2-14")]: {
    sk: "Balík je už na ceste.",
    ua: "Посилка вже в дорозі.",
    ru: "Посылка уже в пути.",
    en: "The parcel is already on the way.",
    tokens: ["Balík", "je", "už", "na", "ceste", "."],
  },

  [phraseKey("kuriér", "a2-14")]: {
    sk: "Kuriér mi zavolá pred doručením.",
    ua: "Кур’єр подзвонить мені перед доставкою.",
    ru: "Курьер позвонит мне перед доставкой.",
    en: "The courier will call me before delivery.",
    tokens: ["Kuriér", "mi", "zavolá", "pred", "doručením", "."],
  },

  [phraseKey("sledovanie zásielky", "a2-14")]: {
    sk: "V aplikácii vidím sledovanie zásielky.",
    ua: "У додатку я бачу відстеження посилки.",
    ru: "В приложении я вижу отслеживание посылки.",
    en: "I can see parcel tracking in the app.",
    tokens: ["V", "aplikácii", "vidím", "sledovanie", "zásielky", "."],
  },

  [phraseKey("adresa doručenia", "a2-14")]: {
    sk: "Zmenil som adresu doručenia.",
    ua: "Я змінив адресу доставки.",
    ru: "Я изменил адрес доставки.",
    en: "I changed the delivery address.",
    tokens: ["Zmenil", "som", "adresu", "doručenia", "."],
  },

  [phraseKey("vrátenie", "a2-14")]: {
    sk: "Chcem požiadať o vrátenie.",
    ua: "Я хочу подати запит на повернення.",
    ru: "Я хочу оформить возврат.",
    en: "I want to request a return.",
    tokens: ["Chcem", "požiadať", "o", "vrátenie", "."],
  },

  [phraseKey("výmena", "a2-14")]: {
    sk: "Je možná výmena veľkosti?",
    ua: "Можливий обмін розміру?",
    ru: "Возможен обмен размера?",
    en: "Is a size exchange possible?",
    tokens: ["Je", "možná", "výmena", "veľkosti", "?"],
  },

  [phraseKey("poštovné", "a2-14")]: {
    sk: "Poštovné je v cene alebo zvlášť?",
    ua: "Вартість доставки входить у ціну чи окремо?",
    ru: "Стоимость доставки входит в цену или отдельно?",
    en: "Is shipping included in the price or is it separate?",
    tokens: ["Poštovné", "je", "v", "cene", "alebo", "zvlášť", "?"],
  },

  [phraseKey("platba kartou", "a2-14")]: {
    sk: "Preferujem platbu kartou.",
    ua: "Я надаю перевагу оплаті карткою.",
    ru: "Я предпочитаю оплату картой.",
    en: "I prefer paying by card.",
    tokens: ["Preferujem", "platbu", "kartou", "."],
  },

  // =========================
  // LESSON 15 — Technológie (situácie)
  // =========================
  [phraseKey("nastaviť", "a2-15")]: {
    sk: "Pomôžete mi nastaviť internet?",
    ua: "Допоможете мені налаштувати інтернет?",
    ru: "Поможете мне настроить интернет?",
    en: "Can you help me set up the internet?",
    tokens: ["Pomôžete", "mi", "nastaviť", "internet", "?"],
  },

  [phraseKey("aktualizácia", "a2-15")]: {
    sk: "Po aktualizácii sa telefón reštartoval.",
    ua: "Після оновлення телефон перезавантажився.",
    ru: "После обновления телефон перезагрузился.",
    en: "After the update, the phone restarted.",
    tokens: ["Po", "aktualizácii", "sa", "telefón", "reštartoval", "."],
  },

  [phraseKey("pripojenie", "a2-15")]: {
    sk: "Pripojenie je dnes nestabilné.",
    ua: "Підключення сьогодні нестабільне.",
    ru: "Подключение сегодня нестабильное.",
    en: "The connection is unstable today.",
    tokens: ["Pripojenie", "je", "dnes", "nestabilné", "."],
  },

  [phraseKey("signál", "a2-15")]: {
    sk: "V tejto miestnosti je slabý signál.",
    ua: "У цій кімнаті слабкий сигнал.",
    ru: "В этой комнате слабый сигнал.",
    en: "There is a weak signal in this room.",
    tokens: ["V", "tejto", "miestnosti", "je", "slabý", "signál", "."],
  },

  [phraseKey("výpadok", "a2-15")]: {
    sk: "Máme výpadok elektriny.",
    ua: "У нас відключення електрики.",
    ru: "У нас отключение электричества.",
    en: "We have a power outage.",
    tokens: ["Máme", "výpadok", "elektriny", "."],
  },

  [phraseKey("zaseknúť sa", "a2-15")]: {
    sk: "Aplikácia sa mi zasekla.",
    ua: "У мене завис додаток.",
    ru: "У меня зависло приложение.",
    en: "The app froze on me.",
    tokens: ["Aplikácia", "sa", "mi", "zasekla", "."],
  },

  [phraseKey("reštartovať", "a2-15")]: {
    sk: "Skúsim reštartovať počítač.",
    ua: "Спробую перезавантажити комп’ютер.",
    ru: "Попробую перезагрузить компьютер.",
    en: "I will try to restart the computer.",
    tokens: ["Skúsim", "reštartovať", "počítač", "."],
  },

  [phraseKey("nainštalovať", "a2-15")]: {
    sk: "Musím nainštalovať nový program.",
    ua: "Мені потрібно встановити нову програму.",
    ru: "Мне нужно установить новую программу.",
    en: "I need to install a new program.",
    tokens: ["Musím", "nainštalovať", "nový", "program", "."],
  },

  [phraseKey("vymazať", "a2-15")]: {
    sk: "Chcem vymazať staré súbory.",
    ua: "Я хочу видалити старі файли.",
    ru: "Я хочу удалить старые файлы.",
    en: "I want to delete old files.",
    tokens: ["Chcem", "vymazať", "staré", "súbory", "."],
  },

  [phraseKey("obnoviť", "a2-15")]: {
    sk: "Dá sa to obnoviť zo zálohy.",
    ua: "Це можна відновити з резервної копії.",
    ru: "Это можно восстановить из резервной копии.",
    en: "It can be restored from a backup.",
    tokens: ["Dá", "sa", "to", "obnoviť", "zo", "zálohy", "."],
  },

  // =========================
  // LESSON 16 — Vzdelanie a učenie sa
  // =========================
  [phraseKey("kurz", "a2-16")]: {
    sk: "Zapísal som sa na kurz slovenčiny.",
    ua: "Я записався на курс словацької.",
    ru: "Я записался на курс словацкого.",
    en: "I enrolled in a Slovak language course.",
    tokens: ["Zapísal", "som", "sa", "na", "kurz", "slovenčiny", "."],
  },

  [phraseKey("prednáška", "a2-16")]: {
    sk: "Prednáška začína o ôsmej.",
    ua: "Лекція починається о восьмій.",
    ru: "Лекция начинается в восемь.",
    en: "The lecture starts at eight.",
    tokens: ["Prednáška", "začína", "o", "ôsmej", "."],
  },

  [phraseKey("poznámky", "a2-16")]: {
    sk: "Robím si poznámky počas hodiny.",
    ua: "Я роблю нотатки під час уроку.",
    ru: "Я делаю заметки во время урока.",
    en: "I take notes during the lesson.",
    tokens: ["Robím", "si", "poznámky", "počas", "hodiny", "."],
  },

  [phraseKey("domáca úloha", "a2-16")]: {
    sk: "Domácu úlohu musím odovzdať do piatku.",
    ua: "Домашнє завдання треба здати до п’ятниці.",
    ru: "Домашнее задание нужно сдать до пятницы.",
    en: "I have to submit the homework by Friday.",
    tokens: ["Domácu", "úlohu", "musím", "odovzdať", "do", "piatku", "."],
  },

  [phraseKey("skúška", "a2-16")]: {
    sk: "Na skúšku sa pripravujem celý týždeň.",
    ua: "До іспиту готуюся весь тиждень.",
    ru: "К экзамену готовлюсь всю неделю.",
    en: "I have been preparing for the exam all week.",
    tokens: ["Na", "skúšku", "sa", "pripravujem", "celý", "týždeň", "."],
  },

  [phraseKey("certifikát", "a2-16")]: {
    sk: "Po kurze dostanem certifikát.",
    ua: "Після курсу я отримаю сертифікат.",
    ru: "После курса я получу сертификат.",
    en: "After the course I will get a certificate.",
    tokens: ["Po", "kurze", "dostanem", "certifikát", "."],
  },

  [phraseKey("zručnosť", "a2-16")]: {
    sk: "Táto zručnosť sa mi zíde v práci.",
    ua: "Ця навичка стане мені в пригоді на роботі.",
    ru: "Этот навык пригодится мне на работе.",
    en: "This skill will be useful to me at work.",
    tokens: ["Táto", "zručnosť", "sa", "mi", "zíde", "v", "práci", "."],
  },

  [phraseKey("zlepšiť sa", "a2-16")]: {
    sk: "Chcem sa zlepšiť v gramatike.",
    ua: "Хочу покращити свою граматику.",
    ru: "Хочу улучшить свою грамматику.",
    en: "I want to improve my grammar.",
    tokens: ["Chcem", "sa", "zlepšiť", "v", "gramatike", "."],
  },

  [phraseKey("opakovať", "a2-16")]: {
    sk: "Každý deň opakujem nové slová.",
    ua: "Щодня повторюю нові слова.",
    ru: "Каждый день повторяю новые слова.",
    en: "I repeat new words every day.",
    tokens: ["Každý", "deň", "opakujem", "nové", "slová", "."],
  },

  [phraseKey("učiť sa naspamäť", "a2-16")]: {
    sk: "Nemusíš sa to učiť naspamäť.",
    ua: "Тобі не потрібно вчити це напам’ять.",
    ru: "Тебе не нужно учить это наизусть.",
    en: "You do not have to learn it by heart.",
    tokens: ["Nemusíš", "sa", "to", "učiť", "naspamäť", "."],
  },

  // =========================
  // LESSON 17 — V práci (komunikácia)
  // =========================
  [phraseKey("rozdeliť úlohy", "a2-17")]: {
    sk: "Musíme rozdeliť úlohy medzi tím.",
    ua: "Ми маємо розподілити завдання між командою.",
    ru: "Нам нужно распределить задачи между командой.",
    en: "We need to divide the tasks among the team.",
    tokens: ["Musíme", "rozdeliť", "úlohy", "medzi", "tím", "."],
  },

  [phraseKey("spolupracovať", "a2-17")]: {
    sk: "Je dôležité spolupracovať.",
    ua: "Важливо співпрацювати.",
    ru: "Важно сотрудничать.",
    en: "It is important to cooperate.",
    tokens: ["Je", "dôležité", "spolupracovať", "."],
  },

  [phraseKey("priorita", "a2-17")]: {
    sk: "Toto je teraz moja priorita.",
    ua: "Це зараз мій пріоритет.",
    ru: "Это сейчас мой приоритет.",
    en: "This is my priority now.",
    tokens: ["Toto", "je", "teraz", "moja", "priorita", "."],
  },

  [phraseKey("zodpovedať", "a2-17")]: {
    sk: "Za výsledok zodpovedám ja.",
    ua: "За результат відповідаю я.",
    ru: "За результат отвечаю я.",
    en: "I am responsible for the result.",
    tokens: ["Za", "výsledok", "zodpovedám", "ja", "."],
  },

  [phraseKey("odovzdať", "a2-17")]: {
    sk: "Odovzdám to do konca dňa.",
    ua: "Я здам це до кінця дня.",
    ru: "Я сдам это до конца дня.",
    en: "I will submit it by the end of the day.",
    tokens: ["Odovzdám", "to", "do", "konca", "dňa", "."],
  },

  [phraseKey("skontrolovať", "a2-17")]: {
    sk: "Môžete to ešte raz skontrolovať?",
    ua: "Можете ще раз це перевірити?",
    ru: "Можете ещё раз это проверить?",
    en: "Can you check it once again?",
    tokens: ["Môžete", "to", "ešte", "raz", "skontrolovať", "?"],
  },

  [phraseKey("organizovať", "a2-17")]: {
    sk: "Kto bude organizovať poradu?",
    ua: "Хто буде організовувати нараду?",
    ru: "Кто будет организовывать совещание?",
    en: "Who will organize the meeting?",
    tokens: ["Kto", "bude", "organizovať", "poradu", "?"],
  },

  [phraseKey("spätná väzba", "a2-17")]: {
    sk: "Pošlite mi, prosím, spätnú väzbu.",
    ua: "Надішліть мені, будь ласка, зворотний зв’язок.",
    ru: "Пришлите мне, пожалуйста, обратную связь.",
    en: "Please send me feedback.",
    tokens: ["Pošlite", "mi", ",", "prosím", ",", "spätnú", "väzbu", "."],
  },

  [phraseKey("navrhnúť riešenie", "a2-17")]: {
    sk: "Môžem navrhnúť riešenie?",
    ua: "Можу запропонувати рішення?",
    ru: "Могу предложить решение?",
    en: "May I suggest a solution?",
    tokens: ["Môžem", "navrhnúť", "riešenie", "?"],
  },

  [phraseKey("dokončiť", "a2-17")]: {
    sk: "Potrebujem to dokončiť dnes.",
    ua: "Мені потрібно завершити це сьогодні.",
    ru: "Мне нужно закончить это сегодня.",
    en: "I need to finish it today.",
    tokens: ["Potrebujem", "to", "dokončiť", "dnes", "."],
  },

  // =========================
  // LESSON 18 — Banka
  // =========================
  [phraseKey("založiť účet", "a2-18")]: {
    sk: "Chcem si založiť účet v tejto banke.",
    ua: "Я хочу відкрити рахунок у цьому банку.",
    ru: "Я хочу открыть счёт в этом банке.",
    en: "I want to open an account at this bank.",
    tokens: ["Chcem", "si", "založiť", "účet", "v", "tejto", "banke", "."],
  },

  [phraseKey("výber", "a2-18")]: {
    sk: "Za výber z bankomatu je poplatok.",
    ua: "За зняття в банкоматі є комісія.",
    ru: "За снятие в банкомате есть комиссия.",
    en: "There is a fee for withdrawing cash from the ATM.",
    tokens: ["Za", "výber", "z", "bankomatu", "je", "poplatok", "."],
  },

  [phraseKey("vklad", "a2-18")]: {
    sk: "Vklad môžem urobiť aj na pobočke.",
    ua: "Я також можу зробити внесення у відділенні.",
    ru: "Я также могу сделать внесение в отделении.",
    en: "I can also make a deposit at the branch.",
    tokens: ["Vklad", "môžem", "urobiť", "aj", "na", "pobočke", "."],
  },

  [phraseKey("previesť", "a2-18")]: {
    sk: "Môžete previesť peniaze na tento účet?",
    ua: "Можете переказати гроші на цей рахунок?",
    ru: "Можете перевести деньги на этот счёт?",
    en: "Can you transfer money to this account?",
    tokens: ["Môžete", "previesť", "peniaze", "na", "tento", "účet", "?"],
  },

  [phraseKey("platobná karta", "a2-18")]: {
    sk: "Platobnú kartu vám pošleme poštou.",
    ua: "Платіжну картку надішлемо вам поштою.",
    ru: "Платёжную карту мы отправим вам по почте.",
    en: "We will send you the payment card by mail.",
    tokens: ["Platobnú", "kartu", "vám", "pošleme", "poštou", "."],
  },

  [phraseKey("PIN kód", "a2-18")]: {
    sk: "PIN kód si nikomu nepíšte ani nehovorte.",
    ua: "Пін-код нікому не записуйте і не говоріть.",
    ru: "ПИН-код никому не записывайте и не говорите.",
    en: "Do not write down or tell your PIN code to anyone.",
    tokens: ["PIN", "kód", "si", "nikomu", "nepíšte", "ani", "nehovorte", "."],
  },

  [phraseKey("limit", "a2-18")]: {
    sk: "Môžem si zmeniť denný limit?",
    ua: "Я можу змінити денний ліміт?",
    ru: "Я могу изменить дневной лимит?",
    en: "Can I change my daily limit?",
    tokens: ["Môžem", "si", "zmeniť", "denný", "limit", "?"],
  },

  [phraseKey("poplatok", "a2-18")]: {
    sk: "Aký poplatok je za vedenie účtu?",
    ua: "Яка комісія за обслуговування рахунку?",
    ru: "Какая комиссия за обслуживание счёта?",
    en: "What is the fee for maintaining the account?",
    tokens: ["Aký", "poplatok", "je", "za", "vedenie", "účtu", "?"],
  },

  [phraseKey("výpis", "a2-18")]: {
    sk: "Potrebujem výpis z účtu za minulý mesiac.",
    ua: "Мені потрібна виписка з рахунку за минулий місяць.",
    ru: "Мне нужна выписка со счёта за прошлый месяц.",
    en: "I need a bank statement for last month.",
    tokens: ["Potrebujem", "výpis", "z", "účtu", "za", "minulý", "mesiac", "."],
  },

  [phraseKey("blokovať kartu", "a2-18")]: {
    sk: "Musím si blokovať kartu, lebo som ju stratil.",
    ua: "Мені треба заблокувати картку, бо я її загубив.",
    ru: "Мне нужно заблокировать карту, потому что я её потерял.",
    en: "I need to block my card because I lost it.",
    tokens: ["Musím", "si", "blokovať", "kartu", ",", "lebo", "som", "ju", "stratil", "."],
  },

  // =========================
  // LESSON 19 — Úrady a doklady
  // =========================
  [phraseKey("povolenie", "a2-19")]: {
    sk: "Potrebujem povolenie na prácu.",
    ua: "Мені потрібен дозвіл на роботу.",
    ru: "Мне нужно разрешение на работу.",
    en: "I need a work permit.",
    tokens: ["Potrebujem", "povolenie", "na", "prácu", "."],
  },

  [phraseKey("pobyt", "a2-19")]: {
    sk: "Žiadam o prechodný pobyt.",
    ua: "Я подаю на тимчасове проживання.",
    ru: "Я подаю на временный вид на жительство.",
    en: "I am applying for temporary residence.",
    tokens: ["Žiadam", "o", "prechodný", "pobyt", "."],
  },

  [phraseKey("občiansky preukaz", "a2-19")]: {
    sk: "Potrebujem občiansky preukaz alebo pas.",
    ua: "Мені потрібна ID-картка або паспорт.",
    ru: "Мне нужна ID-карта или паспорт.",
    en: "I need an ID card or a passport.",
    tokens: ["Potrebujem", "občiansky", "preukaz", "alebo", "pas", "."],
  },

  [phraseKey("registrácia", "a2-19")]: {
    sk: "Registrácia prebieha online.",
    ua: "Реєстрація проходить онлайн.",
    ru: "Регистрация проходит онлайн.",
    en: "Registration takes place online.",
    tokens: ["Registrácia", "prebieha", "online", "."],
  },

  [phraseKey("podpis", "a2-19")]: {
    sk: "Tu je môj podpis.",
    ua: "Ось мій підпис.",
    ru: "Вот моя подпись.",
    en: "Here is my signature.",
    tokens: ["Tu", "je", "môj", "podpis", "."],
  },

  [phraseKey("fotografia", "a2-19")]: {
    sk: "Potrebujete aj fotografiu na doklad.",
    ua: "Потрібне також фото на документ.",
    ru: "Нужна также фотография на документ.",
    en: "You also need a photo for the document.",
    tokens: ["Potrebujete", "aj", "fotografiu", "na", "doklad", "."],
  },

  [phraseKey("overiť", "a2-19")]: {
    sk: "Môžete mi overiť podpis?",
    ua: "Можете мені завірити підпис?",
    ru: "Можете мне заверить подпись?",
    en: "Can you certify my signature?",
    tokens: ["Môžete", "mi", "overiť", "podpis", "?"],
  },

  [phraseKey("termín stretnutia", "a2-19")]: {
    sk: "Aký je termín stretnutia?",
    ua: "Яка дата прийому?",
    ru: "Какая дата приёма?",
    en: "What is the appointment date?",
    tokens: ["Aký", "je", "termín", "stretnutia", "?"],
  },

  [phraseKey("vybaviť", "a2-19")]: {
    sk: "Potrebujem to vybaviť čo najskôr.",
    ua: "Мені треба це оформити якнайшвидше.",
    ru: "Мне нужно это оформить как можно скорее.",
    en: "I need to arrange it as soon as possible.",
    tokens: ["Potrebujem", "to", "vybaviť", "čo", "najskôr", "."],
  },

  [phraseKey("rodné číslo", "a2-19")]: {
    sk: "Prosím, uveďte rodné číslo.",
    ua: "Будь ласка, вкажіть ідентифікаційний номер.",
    ru: "Пожалуйста, укажите идентификационный номер.",
    en: "Please provide your personal identification number.",
    tokens: ["Prosím", ",", "uveďte", "rodné", "číslo", "."],
  },

  // =========================
  // LESSON 20 — Opakovanie A2 (11–19)
  // =========================
  [phraseKey("strava", "a2-20")]: {
    sk: "Počas týždňa mám jednoduchú stravu.",
    ua: "Протягом тижня в мене просте харчування.",
    ru: "В течение недели у меня простое питание.",
    en: "During the week I have a simple diet.",
    tokens: ["Počas", "týždňa", "mám", "jednoduchú", "stravu", "."],
  },

  [phraseKey("tréning", "a2-20")]: {
    sk: "Dnešný tréning bol náročný, ale dobrý.",
    ua: "Сьогоднішнє тренування було складне, але добре.",
    ru: "Сегодняшняя тренировка была тяжёлой, но хорошей.",
    en: "Today's training was hard but good.",
    tokens: ["Dnešný", "tréning", "bol", "náročný", ",", "ale", "dobrý", "."],
  },

  [phraseKey("kompromis", "a2-20")]: {
    sk: "Nakoniec sme našli kompromis.",
    ua: "Зрештою ми знайшли компроміс.",
    ru: "В итоге мы нашли компромисс.",
    en: "In the end, we found a compromise.",
    tokens: ["Nakoniec", "sme", "našli", "kompromis", "."],
  },

  [phraseKey("doručenie", "a2-20")]: {
    sk: "Doručenie bolo rýchlejšie, než som čakal.",
    ua: "Доставка була швидшою, ніж я очікував.",
    ru: "Доставка была быстрее, чем я ожидал.",
    en: "The delivery was faster than I expected.",
    tokens: ["Doručenie", "bolo", "rýchlejšie", ",", "než", "som", "čakal", "."],
  },

  [phraseKey("aktualizácia", "a2-20")]: {
    sk: "Po aktualizácii už všetko funguje.",
    ua: "Після оновлення все вже працює.",
    ru: "После обновления всё уже работает.",
    en: "After the update, everything is working already.",
    tokens: ["Po", "aktualizácii", "už", "všetko", "funguje", "."],
  },

  [phraseKey("prednáška", "a2-20")]: {
    sk: "Prednáška bola zaujímavá a praktická.",
    ua: "Лекція була цікава і практична.",
    ru: "Лекция была интересной и практичной.",
    en: "The lecture was interesting and practical.",
    tokens: ["Prednáška", "bola", "zaujímavá", "a", "praktická", "."],
  },

  [phraseKey("spätná väzba", "a2-20")]: {
    sk: "Spätná väzba mi pomohla zlepšiť sa.",
    ua: "Зворотний зв’язок допоміг мені покращитися.",
    ru: "Обратная связь помогла мне улучшиться.",
    en: "The feedback helped me improve.",
    tokens: ["Spätná", "väzba", "mi", "pomohla", "zlepšiť", "sa", "."],
  },

  [phraseKey("výpis", "a2-20")]: {
    sk: "Výpis som si stiahol z internet bankingu.",
    ua: "Я завантажив виписку з інтернет-банкінгу.",
    ru: "Я скачал выписку из интернет-банкинга.",
    en: "I downloaded the statement from internet banking.",
    tokens: ["Výpis", "som", "si", "stiahol", "z", "internet", "bankingu", "."],
  },

  [phraseKey("povolenie", "a2-20")]: {
    sk: "Bez povolenia to nemôžem urobiť.",
    ua: "Без дозволу я не можу це зробити.",
    ru: "Без разрешения я не могу это сделать.",
    en: "I cannot do it without permission.",
    tokens: ["Bez", "povolenia", "to", "nemôžem", "urobiť", "."],
  },

  [phraseKey("vybaviť", "a2-20")]: {
    sk: "Zajtra to skúsim vybaviť na úrade.",
    ua: "Завтра спробую це оформити в установі.",
    ru: "Завтра попробую это оформить в учреждении.",
    en: "Tomorrow I will try to arrange it at the office.",
    tokens: ["Zajtra", "to", "skúsim", "vybaviť", "na", "úrade", "."],
  },
};
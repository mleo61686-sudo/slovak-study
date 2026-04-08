export type Lang = "ua" | "ru" | "en";

export type UpdateItem = {
  date: string; // "2026-02-15"
  title: Partial<Record<Lang, string>>;
  items: Partial<Record<Lang, string[]>>;
};

export const UPDATES: UpdateItem[] = [
  {
    date: "2026-04-04",
    title: {
      ua: "Оновлення: додано рівень B2 та покращено вправи",
      ru: "Обновление: добавлен уровень B2 и улучшены упражнения",
      en: "Update: B2 level added and exercises improved",
    },
    items: {
      ua: [
        "Додано рівень B2 для словацького курсу — нові складніші уроки, слова та вправи вже доступні",
        "Відредаговано деякі речення у вправах попередніх рівнів, щоб переклади були точнішими та природнішими",
        "Покращено вправу з написання слів(3) — тепер можна вводити відповіді без діакритики (наприклад, \"zavazok\" замість \"záväzok\")",
        "Після правильної відповіді тепер відображається правильний варіант слова з діакритикою для кращого запам’ятовування",
      ],
      ru: [
        "Добавлен уровень B2 для словацкого курса — новые более сложные уроки, слова и упражнения уже доступны",
        "Отредактированы некоторые предложения в упражнениях предыдущих уровней, чтобы переводы были более точными и естественными",
        "Улучшено упражнение с написанием слов(3) — теперь можно вводить ответы без диакритики (например, \"zavazok\" вместо \"záväzok\")",
        "После правильного ответа теперь отображается правильный вариант слова с диакритикой для лучшего запоминания",
      ],
      en: [
        "The B2 level has been added for the Slovak course — new, more advanced lessons, words, and exercises are now available",
        "Some sentences in exercises from previous levels were edited so that the translations are more accurate and natural",
        "The word-writing exercise (3) has been improved — now you can enter answers without diacritics (for example, \"zavazok\" instead of \"záväzok\")",
        "After a correct answer, the correct version of the word with diacritics is now shown for better memorization",
      ],
    },
  },
  {
    date: "2026-03-28",
    title: {
      ua: "Оновлення: нова вправа та виправлення багів",
      ru: "Обновление: новое упражнение и исправление багов",
      en: "Update: new exercise and bug fixes",
    },
    items: {
      ua: [
        "Додано нову, сьому вправу для уроків — «Збери переклад», яка допомагає краще закріплювати розуміння фраз",
        "Виправлено баг у вправі «Збери речення», пов’язаний з кнопкою «Назад» (дублювання слів)",
        "Покращено стабільність роботи вправ та обробку швидких кліків",
        "Наступний крок — додавання рівня B2 для словацького та чеського курсів",
      ],
      ru: [
        "Добавлено новое, седьмое упражнение для уроков — «Собери перевод», которое помогает лучше закреплять понимание фраз",
        "Исправлен баг в упражнении «Собери предложение», связанный с кнопкой «Назад» (дублирование слов)",
        "Улучшена стабильность работы упражнений и обработка быстрых кликов",
        "Следующий шаг — добавление уровня B2 для словацкого и чешского курсов",
      ],
      en: [
        "A new seventh exercise for lessons has been added — “Build the translation”, which helps reinforce phrase comprehension better",
        "A bug in the “Build the sentence” exercise related to the “Back” button was fixed (duplicate words)",
        "The stability of exercises and handling of fast clicks have been improved",
        "The next step is adding the B2 level for the Slovak and Czech courses",
      ],
    },
  },
  {
    date: "2026-03-21",
    title: {
      ua: "Велике оновлення: чеський курс і розширення платформи",
      ru: "Большое обновление: чешский курс и расширение платформы",
      en: "Major update: Czech course and platform expansion",
    },
    items: {
      ua: [
        "Додано новий курс чеської мови — тепер можна вивчати не тільки словацьку",
        "Платформа стала мультикурсовою — у майбутньому планується додати польську мову",
        "Оновлено сторінку реєстрації — тепер курс обирається одразу при створенні акаунта",
        "Оновлено меню профілю — тепер можна змінити курс у будь-який момент",
        "Додано можливість перемикатися між курсами прямо в профілі",
        "Планується розширення уроків до 7 типів вправ для більш ефективного навчання",
        "Розпочато додавання рівня B2 — нові складніші уроки вже в розробці",
      ],
      ru: [
        "Добавлен новый курс чешского языка — теперь можно изучать не только словацкий",
        "Платформа стала мультикурсовой — в будущем планируется добавить польский язык",
        "Обновлена страница регистрации — теперь курс выбирается сразу при создании аккаунта",
        "Обновлено меню профиля — теперь можно менять курс в любой момент",
        "Добавлена возможность переключаться между курсами прямо в профиле",
        "Планируется расширение уроков до 7 типов упражнений для более эффективного обучения",
        "Начато добавление уровня B2 — новые более сложные уроки уже в разработке",
      ],
      en: [
        "A new Czech language course has been added — now you can study not only Slovak",
        "The platform has become multi-course — Polish is planned to be added in the future",
        "The registration page has been updated — now the course is chosen immediately when creating an account",
        "The profile menu has been updated — now you can change the course at any time",
        "The ability to switch between courses directly in the profile has been added",
        "The lessons are planned to be expanded to 7 exercise types for more effective learning",
        "Work on the B2 level has started — new, more advanced lessons are already in development",
      ],
    },
  },
  {
    date: "2026-03-04",
    title: {
      ua: "Оновлення: нова сторінка зі сленгом і покращена робота сайту",
      ru: "Обновление: новая страница со сленгом и улучшенная работа сайта",
      en: "Update: new slang page and improved site performance",
    },
    items: {
      ua: [
        "Додано нову сторінку «Сленг і розмовна мова» з живими фразами, які словаки використовують у повсякденному житті",
        "На сторінці є приклади речень, переклад та озвучка слів і фраз",
        "Покращено словник — тепер ним зручніше користуватися і швидше знаходити потрібні слова",
        "Покращено швидкість і стабільність роботи сайту",
      ],
      ru: [
        "Добавлена новая страница «Сленг и разговорная речь» с живыми фразами, которые словаки используют в повседневной жизни",
        "На странице есть примеры предложений, перевод и озвучка слов и фраз",
        "Улучшен словарь — теперь им удобнее пользоваться и быстрее находить нужные слова",
        "Улучшена скорость и стабильность работы сайта",
      ],
      en: [
        "A new “Slang and spoken language” page has been added with real-life phrases that Slovaks use in everyday life",
        "The page includes example sentences, translations, and audio for words and phrases",
        "The dictionary has been improved — now it is easier to use and faster to find the words you need",
        "The site’s speed and stability have been improved",
      ],
    },
  },
  {
    date: "2026-02-27",
    title: {
      ua: "Оновлення: завершено B1, оновлено словник, тренажер і головну сторінку",
      ru: "Обновление: завершён B1, обновлены словарь, тренажёр и главная страница",
      en: "Update: B1 completed, dictionary, trainer, and homepage updated",
    },
    items: {
      ua: [
        "Завершено рівень B1: уроки, слова та вправи готові",
        "Словник оновлено — тепер він містить лише слова з рівнів A0–B1",
        "Покращено тренажер: зручніше тренуватися та повторювати матеріал",
        "Покращено головну сторінку — тепер легше зрозуміти, як почати навчання",
      ],
      ru: [
        "Завершён уровень B1: уроки, слова и упражнения готовы",
        "Словарь обновлён — теперь он содержит только слова из уровней A0–B1",
        "Улучшен тренажёр: стало удобнее тренироваться и повторять материал",
        "Улучшена главная страница — теперь проще понять, как начать обучение",
      ],
      en: [
        "The B1 level has been completed: lessons, words, and exercises are ready",
        "The dictionary has been updated — now it contains only words from levels A0–B1",
        "The trainer has been improved: now it is more convenient to practice and review material",
        "The homepage has been improved — now it is easier to understand how to start learning",
      ],
    },
  },
  {
    date: "2026-02-22",
    title: {
      ua: "Велике оновлення: завершено A2, нова AI-озвучка та покращений інтерфейс",
      ru: "Большое обновление: завершён A2, новая AI-озвучка и улучшенный интерфейс",
      en: "Major update: A2 completed, new AI voice-over, and improved interface",
    },
    items: {
      ua: [
        "Рівень A2 повністю завершено: уроки, слова та вправи готові до повноцінного навчання",
        "Для A2 додано відповідні фрази свого рівня — складніші, більш природні та наближені до реального мовлення",
        "Додана AI-озвучка голосом носія словацької мови для словника, сторінок граматики та рівнів A0/A1/A2",
        "Покращено дизайн: фото отримали заокруглення, картки стали акуратнішими, інтерфейс виглядає чистіше та сучасніше",
        "Виправлено численні баги, які дозволяли проходити рівні без помилок",
        "Допрацьовано сторінки «Алфавіт і вимова», «Дієслова (теперішній час)» та «Відмінки»",
      ],
      ru: [
        "Уровень A2 полностью завершён: уроки, слова и упражнения готовы к полноценному обучению",
        "Для A2 добавлены соответствующие фразы уровня — более сложные и естественные",
        "Добавлена AI-озвучка с естественным произношением носителя словацкого языка для словаря, страниц грамматики и уровней A0/A1/A2",
        "Улучшен дизайн: фото получили скругления, карточки стали аккуратнее, интерфейс выглядит чище и современнее",
        "Исправлены многочисленные баги, которые позволяли проходить уровни без ошибок",
        "Доработаны страницы «Алфавит и произношение», «Глаголы (настоящее время)» и «Падежи»",
      ],
      en: [
        "The A2 level has been fully completed: lessons, words, and exercises are ready for full learning",
        "Matching A2-level phrases have been added — more complex, more natural, and closer to real speech",
        "AI voice-over with a native Slovak speaker’s voice has been added for the dictionary, grammar pages, and levels A0/A1/A2",
        "The design has been improved: photos now have rounded corners, cards look cleaner, and the interface feels more modern",
        "Numerous bugs that allowed users to pass levels without mistakes have been fixed",
        "The “Alphabet and pronunciation”, “Verbs (present tense)”, and “Cases” pages have been improved",
      ],
    },
  },
  {
    date: "2026-02-15",
    title: {
      ua: "Покращено сторінку «Оновлення»",
      ru: "Улучшена страница «Обновления»",
      en: "The “Updates” page has been improved",
    },
    items: {
      ua: [
        "Додано архів оновлень із групуванням по місяцях",
        "Можна перемикатися між оновленнями без перезавантаження сторінки",
        "На головній сторінці зʼявилася кнопка «Що нового»",
        "Покращена швидкість завантаження фото",
      ],
      ru: [
        "Добавлен архив обновлений с группировкой по месяцам",
        "Можно переключаться между обновлениями без перезагрузки страницы",
        "На главной странице появилась кнопка «Что нового»",
        "Улучшена скорость загрузки фото",
      ],
      en: [
        "An updates archive grouped by months has been added",
        "You can switch between updates without reloading the page",
        "A “What’s new” button has appeared on the homepage",
        "Photo loading speed has been improved",
      ],
    },
  },
];
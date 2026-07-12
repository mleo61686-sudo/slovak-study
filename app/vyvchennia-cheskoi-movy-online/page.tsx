import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Чеська мова онлайн з нуля для українців | Flunio",
  description:
    "Вивчай чеську мову онлайн з нуля у Flunio: чеська для українців, базові слова, вимова ř і ě, фрази, граматика, вправи та короткі уроки A0–B2.",

  alternates: {
    canonical: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
    languages: {
      en: `${SITE_URL}/learn-czech`,
      ru: `${SITE_URL}/ru/learn-czech`,
      uk: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
      "x-default": `${SITE_URL}/learn-czech`,
    },
  },

  openGraph: {
    title: "Чеська мова онлайн з нуля для українців | Flunio",
    description:
      "Онлайн навчання чеської: базові слова, вимова, фрази, граматика, вправи та короткі уроки для початківців.",
    url: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

type CardItem = {
  title: string;
  text: string;
};

type RouteCard = CardItem & {
  href: string;
};

type PhraseItem = {
  cs: string;
  ua: string;
  note: string;
};

type PronunciationItem = {
  sound: string;
  example: string;
  note: string;
};

const FAQ = [
  {
    q: "Чи можна вивчати чеську мову онлайн з нуля?",
    a: "Так. У Flunio можна почати з рівня A0: базові чеські слова, короткі уроки, озвучка, вправи та поступовий перехід до A1, A2, B1 і B2.",
  },
  {
    q: "Чи чеська легка для українців?",
    a: "Чеська має багато схожих слів з українською та іншими слов’янськими мовами, але вимова, довгі голосні, літера ř, відмінки й фальшиві друзі потребують окремої практики.",
  },
  {
    q: "Що вчити першим у чеській мові?",
    a: "Спочатку краще вивчити вимову, привітання, базові слова, прості фрази для магазину, роботи, транспорту, лікаря й документів. Граматику варто додавати поступово.",
  },
  {
    q: "Скільки часу потрібно займатися щодня?",
    a: "Для старту достатньо 10–20 хвилин на день. Коротка щоденна практика зазвичай ефективніша, ніж довгі, але рідкісні заняття.",
  },
  {
    q: "Чи підходить Flunio для життя або роботи в Чехії?",
    a: "Так. Курс допомагає вивчати практичну лексику для побуту, роботи, навчання, документів, транспорту, лікаря та щоденного спілкування в Чехії.",
  },
  {
    q: "Чи треба починати з чеської граматики?",
    a: "Не обов’язково. Якщо ти починаєш з нуля, краще спочатку вивчити слова, вимову та прості фрази. Граматика стає зрозумілішою, коли вже є приклади.",
  },
];

const routeCards: RouteCard[] = [
  {
    title: "Чеська для початківців →",
    text: "Покроковий маршрут: що вчити у перші 7 і 30 днів, які слова брати на старті та коли додавати граматику.",
    href: "/czech-for-beginners",
  },
  {
    title: "Чеські слова за темами →",
    text: "Базова лексика: привітання, сім’я, дім, їжа, транспорт, робота, навчання та щоденні ситуації.",
    href: "/czech-vocabulary",
  },
  {
    title: "Чеські слова з аудіо →",
    text: "Слухай чеську вимову й повторюй слова вголос, щоб не вчити мову тільки як текст.",
    href: "/czech-words-with-audio",
  },
  {
    title: "Чеська граматика →",
    text: "Алфавіт, вимова, дієслова, відмінки, порядок слів і прості речення з прикладами.",
    href: "/czech-grammar",
  },
];

const whyCzechForUkrainians: CardItem[] = [
  {
    title: "Чеська схожа, але не копія української",
    text: "Українцям легше впізнавати частину чеських слів, але схожість не гарантує правильне значення, вимову або граматику.",
  },
  {
    title: "Вимова має свої особливості",
    text: "Літера ř, звук ch, довгі голосні á, é, í, ý, ů та форми з ě краще вчити через аудіо й повторення.",
  },
  {
    title: "Граматика потребує порядку",
    text: "Чеські відмінки, роди, дієслова й закінчення легше засвоюються через приклади, а не через спробу одразу вивчити всі таблиці.",
  },
  {
    title: "Мова потрібна для життя в Чехії",
    text: "Чеська часто потрібна для роботи, документів, лікаря, школи, житла, транспорту, магазину й щоденного спілкування.",
  },
];

const studySteps: CardItem[] = [
  {
    title: "Крок 1: звикни до чеської вимови",
    text: "Почни з ř, č, š, ž, ě, ch, довгих голосних і слів, які часто звучать інакше, ніж виглядають для українця.",
  },
  {
    title: "Крок 2: вчи слова за ситуаціями",
    text: "Не вчи випадкові списки. Почни з привітань, магазину, транспорту, роботи, житла, документів, лікаря та базових дієслів.",
  },
  {
    title: "Крок 3: одразу складай короткі фрази",
    text: "Слова краще запам’ятовуються у фразах: Nerozumím, Mám otázku, Kde je obchod, Potřebuji pomoc.",
  },
  {
    title: "Крок 4: додавай граматику через приклади",
    text: "Чеські відмінки й дієслова легше зрозуміти, коли ти вже знаєш фрази й бачиш, як слова змінюються в реченні.",
  },
];

const pronunciation: PronunciationItem[] = [
  {
    sound: "ř",
    example: "dobře, řeka",
    note: "один із найскладніших чеських звуків; краще вчити через аудіо",
  },
  {
    sound: "ě",
    example: "město, děkuji",
    note: "впливає на звучання попереднього приголосного",
  },
  {
    sound: "ch",
    example: "chléb, trochu",
    note: "окремий чеський звук, не просто c + h",
  },
  {
    sound: "ů / ú",
    example: "dům, úkol",
    note: "довгий звук “у”; важливо не скорочувати його",
  },
  {
    sound: "č / š / ž",
    example: "člověk, škola, žena",
    note: "схожі на українські ч/ш/ж, але вимову все одно варто слухати",
  },
  {
    sound: "á / é / í / ý",
    example: "práce, mléko, dobrý",
    note: "довгі голосні можуть змінювати природність звучання слова",
  },
];

const phrases: PhraseItem[] = [
  {
    cs: "Dobrý den",
    ua: "Добрий день",
    note: "ввічливе привітання",
  },
  {
    cs: "Ahoj",
    ua: "Привіт",
    note: "неформальне привітання",
  },
  {
    cs: "Děkuji",
    ua: "Дякую",
    note: "одне з найважливіших слів",
  },
  {
    cs: "Nerozumím",
    ua: "Я не розумію",
    note: "коли чеська звучить занадто швидко",
  },
  {
    cs: "Mám otázku",
    ua: "У мене є питання",
    note: "корисно на роботі, в школі або в установі",
  },
  {
    cs: "Kde je obchod?",
    ua: "Де магазин?",
    note: "місто, покупки, орієнтація",
  },
];

const situations: CardItem[] = [
  {
    title: "Чеська для роботи",
    text: "Слова й фрази для графіку, колег, інструкцій, співбесіди, документів і простого спілкування на роботі.",
  },
  {
    title: "Чеська для документів",
    text: "Базова лексика для úřad, adresa, pojištění, lékař, škola, banka, bydlení та інших побутових справ.",
  },
  {
    title: "Чеська для магазину й транспорту",
    text: "Фрази для покупок, оплати, автобусів, поїздів, зупинок, адрес, питань і коротких відповідей.",
  },
  {
    title: "Чеська для навчання",
    text: "Лексика для школи, університету, курсів, викладачів, домашніх завдань і щоденного навчального середовища.",
  },
];

const falseFriends: CardItem[] = [
  {
    title: "pozor",
    text: "У чеській це часто означає “увага”, а не тільки “позір/погляд”. Наприклад: Pozor! — Увага!",
  },
  {
    title: "čerstvý",
    text: "Означає “свіжий”, хоча для українця слово може звучати незвично або плутатися з іншим значенням.",
  },
  {
    title: "úžasný",
    text: "Означає “чудовий / прекрасний”, а не щось жахливе. Це типовий приклад слова, яке може обманути на слух.",
  },
  {
    title: "nápad",
    text: "Означає “ідея”. Наприклад: dobrý nápad — хороша ідея.",
  },
];

const commonMistakes: CardItem[] = [
  {
    title: "Думати, що чеська повністю зрозуміла без навчання",
    text: "Схожість допомагає, але через неї легко пропускати різницю у вимові, значеннях і граматиці.",
  },
  {
    title: "Ігнорувати довгі голосні",
    text: "У чеській довгі й короткі голосні важливі. Якщо їх не чути, слово може звучати неприродно або незрозуміло.",
  },
  {
    title: "Не тренувати звук ř",
    text: "Його не треба ідеально вимовляти з першого дня, але треба регулярно слухати й пробувати повторювати.",
  },
  {
    title: "Починати з важких відмінкових таблиць",
    text: "Граматика потрібна, але на старті краще йти від прикладів до правил, а не навпаки.",
  },
];

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";
const primaryButton =
  "theme-primary-button inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const secondaryButton =
  "theme-secondary-button inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const secondaryBlock =
  "theme-secondary-button rounded-2xl p-4 font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const textLink =
  "font-semibold theme-accent-text underline-offset-4 hover:underline";

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Чеська мова онлайн з нуля для українців",
    description:
      "Онлайн курс чеської мови у Flunio з уроками, словником, граматикою, вимовою, вправами та прогресом.",
    provider: {
      "@type": "Organization",
      name: "Flunio",
      url: SITE_URL,
    },
    url: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
    inLanguage: "uk",
    educationalLevel: "A0–B2",
    isAccessibleForFree: true,
  };

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-czech-ua"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Script
        id="course-schema-czech-ua"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold theme-text-muted">
          Чеська онлайн · для українців · A0–B2 · слова, вимова, граматика
        </div>

        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Чеська мова онлайн з нуля для українців
        </h1>

        <p className="theme-text-muted">
          Flunio допомагає вивчати чеську мову онлайн системно: з базових слів,
          вимови, простих фраз і коротких вправ. Це не просто список чеських
          слів, а послідовний шлях для тих, хто хоче почати з нуля й поступово
          перейти до впевненішого спілкування.
        </p>

        <p className="theme-text-muted">
          Для українців чеська може здаватися знайомою, але саме через цю
          схожість легко пропустити важливі відмінності: вимову ř, довгі
          голосні, фальшиві друзі, чеські відмінки та типові фрази для життя в
          Чехії.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Почати навчання
          </Link>

          <Link href="/czech-for-beginners" className={secondaryButton}>
            Чеська для початківців
          </Link>

          <Link href="/czech-vocabulary" className={secondaryButton}>
            Чеські слова
          </Link>

          <Link href="/czech-words-with-audio" className={secondaryButton}>
            Чеські слова з аудіо
          </Link>

          <Link href="/czech-grammar" className={secondaryButton}>
            Граматика
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {whyCzechForUkrainians.map((item) => (
          <div key={item.title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-text">{item.title}</h2>
            <p className="mt-2 theme-text-muted">{item.text}</p>
          </div>
        ))}
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Швидкий маршрут для вивчення чеської
        </h2>

        <p className="theme-text-muted">
          Якщо ти починаєш чеську з нуля, не треба відкривати всі теми підряд.
          Краще йти маршрутом: вимова, перші слова, фрази для реального життя,
          а потім граматика й повторення.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {routeCards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${softCard} block p-4`}
            >
              <h3 className="font-semibold theme-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Як почати вивчати чеську мову онлайн
        </h2>

        <p className="theme-text-muted">
          Найкращий старт — це не велика граматична таблиця, а коротка щоденна
          практика. Спочатку слухай чеську, вчи слова за ситуаціями й одразу
          пробуй складати прості фрази.
        </p>

        <div className="grid gap-4">
          {studySteps.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-text">{item.title}</h3>
              <p className="mt-2 theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Перейти до навчання →
          </Link>

          <Link href="/czech-for-beginners" className={secondaryButton}>
            План для початківців →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Чеська вимова: що найчастіше складно на старті
        </h2>

        <p className="theme-text-muted">
          Чеська вимова — одна з головних причин, чому початківцям буває
          складно. Багато слів можна впізнати письмово, але на слух вони звучать
          не так очевидно. Тому аудіо й повторення важливі з перших днів.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {pronunciation.map((item) => (
            <div key={item.sound} className={`${softCard} p-4`}>
              <h3 className="text-lg font-bold theme-accent-text">
                {item.sound}
              </h3>
              <p className="mt-1 text-sm font-semibold theme-text">
                Example: {item.example}
              </p>
              <p className="mt-2 text-sm theme-text-muted">{item.note}</p>
            </div>
          ))}
        </div>

        <Link href="/czech-words-with-audio" className={secondaryButton}>
          Відкрити чеські слова з аудіо →
        </Link>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Перші чеські фрази для українців
        </h2>

        <p className="theme-text-muted">
          Чеську краще вчити не тільки окремими словами, а й короткими фразами.
          Так ти швидше починаєш розуміти живі речення й можеш використовувати
          мову в реальних ситуаціях.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {phrases.map((phrase) => (
            <div key={phrase.cs} className={`${softCard} p-4`}>
              <h3 className="text-lg font-bold theme-text">{phrase.cs}</h3>
              <p className="mt-1 theme-text-muted">{phrase.ua}</p>
              <p className="mt-2 text-sm font-semibold theme-accent-text">
                {phrase.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Чеська для роботи, документів і життя в Чехії
        </h2>

        <p className="theme-text-muted">
          Багато людей вивчають чеську не “для екзамену”, а для реального життя:
          робота, житло, лікар, школа, транспорт, магазин, документи та
          спілкування з людьми. Тому практична лексика має бути в центрі
          навчання.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {situations.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/czech-vocabulary" className={secondaryButton}>
            Чеська лексика →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Фальшиві друзі у чеській мові
        </h2>

        <p className="theme-text-muted">
          Через схожість слов’янських мов деякі чеські слова можуть здаватися
          очевидними, але означати не зовсім те, що очікує українець. Такі слова
          краще помічати одразу.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {falseFriends.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Чеська граматика без хаосу
        </h2>

        <p className="theme-text-muted">
          Чеська граматика важлива, але її не потрібно вивчати всю одразу.
          Відмінки, дієслова й закінчення легше зрозуміти, коли ти вже знаєш
          приклади. Наприклад, якщо ти знаєш práce, потім легше зрозуміти do
          práce. Якщо знаєш dům, легше пояснити v domě.
        </p>

        <p className="theme-text-muted">
          Такий підхід допомагає не застрягнути на теорії й поступово переходити
          до реального використання чеської.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/czech-grammar" className={secondaryBlock}>
            Чеська граматика →
          </Link>

          <Link href="/czech-vocabulary" className={secondaryBlock}>
            Чеські слова →
          </Link>

          <Link href="/czech-for-beginners" className={secondaryBlock}>
            Roadmap для початківців →
          </Link>

          <Link href="/learn-czech" className={secondaryBlock}>
            Learn Czech page →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Типові помилки українців у чеській
        </h2>

        <div className="grid gap-4">
          {commonMistakes.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-text">{item.title}</h3>
              <p className="mt-2 theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Український маршрут: що вивчати після цієї сторінки
        </h2>

        <p className="theme-text-muted">
          Ця сторінка — український хаб для старту чеської мови онлайн. Далі
          можна перейти до конкретної теми: план для початківців, слова, вимова,
          граматика або сам курс Flunio.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {routeCards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${softCard} block p-4`}
            >
              <div className="font-semibold theme-text">{item.title}</div>
              <div className="mt-1 text-sm theme-text-muted">{item.text}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Кому підійде навчання чеської у Flunio
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            Flunio підійде тим, хто хоче вивчати чеську онлайн у простому,
            структурованому і практичному форматі. Це хороший варіант, якщо ти
            починаєш з нуля, повертаєшся до мови після перерви або хочеш
            створити стабільну звичку щоденного навчання.
          </p>

          <p>
            Курс також корисний, якщо чеська потрібна для повсякденного життя,
            роботи, навчання, документів, подорожей або базового спілкування в
            Чехії. Можна рухатися у власному темпі та повертатися до попередніх
            уроків для повторення.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Почати навчання →
          </Link>

          <Link href="/czech-for-beginners" className={secondaryButton}>
            План для початківців
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className={`${softCard} p-4`}>
              <div className="font-semibold theme-text">{item.q}</div>
              <div className="mt-2 theme-text-muted">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Почни чеську з короткого уроку
        </h2>

        <p className="theme-text-muted">
          Найкращий наступний крок — не просто читати про навчання, а перейти до
          практики: відкрити курс, вивчити перші слова, послухати вимову й
          повернутися до повторення.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Перейти до навчання →
          </Link>

          <Link href="/czech-vocabulary" className={secondaryButton}>
            Чеські слова
          </Link>

          <Link href="/learn-czech" className={secondaryButton}>
            Learn Czech page
          </Link>
        </div>
      </section>
    </main>
  );
}
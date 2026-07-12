import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Польська мова онлайн з нуля для українців | Flunio",
  description:
    "Вивчай польську мову онлайн з нуля у Flunio: польська для українців, базові слова, вимова, фрази, граматика, вправи та короткі уроки A0–B2.",

  alternates: {
    canonical: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
    languages: {
      en: `${SITE_URL}/learn-polish`,
      ru: `${SITE_URL}/ru/learn-polish`,
      uk: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
      "x-default": `${SITE_URL}/learn-polish`,
    },
  },

  openGraph: {
    title: "Польська мова онлайн з нуля для українців | Flunio",
    description:
      "Онлайн навчання польської: базові слова, вимова, фрази, граматика, вправи та короткі уроки для початківців.",
    url: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
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
  pl: string;
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
    q: "Чи можна вивчати польську мову онлайн з нуля?",
    a: "Так. У Flunio можна почати з рівня A0: базові польські слова, короткі уроки, озвучка, вправи та поступовий перехід до A1, A2, B1 і B2.",
  },
  {
    q: "Чи польська легка для українців?",
    a: "Польська має багато схожих слів з українською, тому старт може бути легшим. Але вимова, правопис, відмінки, дієслова та фальшиві друзі потребують окремої уваги.",
  },
  {
    q: "Що вчити першим у польській мові?",
    a: "Спочатку краще вивчити вимову, привітання, базові слова, прості фрази для магазину, роботи, транспорту й документів. Граматику варто додавати поступово.",
  },
  {
    q: "Скільки часу потрібно займатися щодня?",
    a: "Для старту достатньо 10–20 хвилин на день. Коротка щоденна практика зазвичай ефективніша, ніж довгі, але рідкісні заняття.",
  },
  {
    q: "Чи підходить Flunio для життя або роботи в Польщі?",
    a: "Так. Курс допомагає вивчати практичну лексику для побуту, роботи, навчання, документів, транспорту та щоденного спілкування.",
  },
  {
    q: "Чи треба починати з польської граматики?",
    a: "Не обов’язково. Якщо ти починаєш з нуля, краще спочатку вивчити слова, вимову та прості фрази. Граматика стає зрозумілішою, коли вже є приклади.",
  },
];

const routeCards: RouteCard[] = [
  {
    title: "Польська для початківців →",
    text: "Покроковий маршрут: що вчити у перші 7 і 30 днів, які слова брати на старті та коли додавати граматику.",
    href: "/polish-for-beginners",
  },
  {
    title: "Польські слова за темами →",
    text: "Базова лексика: привітання, сім’я, дім, їжа, транспорт, робота, навчання та щоденні ситуації.",
    href: "/polish-vocabulary",
  },
  {
    title: "Польські слова з аудіо →",
    text: "Слухай польську вимову й повторюй слова вголос, щоб не вчити мову тільки як текст.",
    href: "/polish-words-with-audio",
  },
  {
    title: "Польська граматика →",
    text: "Алфавіт, вимова, дієслова, відмінки, порядок слів і прості речення з прикладами.",
    href: "/polish-grammar",
  },
];

const whyPolishForUkrainians: CardItem[] = [
  {
    title: "Багато схожих слів",
    text: "Українцям легше впізнавати частину польської лексики, але схожість може обманювати: не кожне знайоме слово означає те саме.",
  },
  {
    title: "Вимова потребує практики",
    text: "Польські звуки й буквосполучення sz, cz, rz, ż, ą, ę, ł краще вчити через аудіо та повторення.",
  },
  {
    title: "Граматика схожа, але не така сама",
    text: "Відмінки, роди й дієслова можуть нагадувати українську, але польські закінчення та форми мають свої правила.",
  },
  {
    title: "Мова потрібна для реального життя",
    text: "Польська часто потрібна для роботи, документів, навчання, житла, транспорту, магазину й спілкування з людьми.",
  },
];

const studySteps: CardItem[] = [
  {
    title: "Крок 1: звикни до польської вимови",
    text: "Почни зі звуків sz, cz, rz, ż, ś, ć, ł, ą, ę. Якщо вивчити слово без звуку, потім важче правильно його впізнавати на слух.",
  },
  {
    title: "Крок 2: вчи польські слова за ситуаціями",
    text: "Не вчи випадкові списки. Почни з привітань, магазину, роботи, транспорту, житла, документів і базових дієслів.",
  },
  {
    title: "Крок 3: одразу складай короткі фрази",
    text: "Слова краще запам’ятовуються у фразах: Mam pytanie, Nie rozumiem, Gdzie jest sklep, Chcę wodę.",
  },
  {
    title: "Крок 4: додавай граматику через приклади",
    text: "Польські відмінки й дієслова легше зрозуміти, коли ти вже знаєш фрази й бачиш, як слова змінюються в реченні.",
  },
];

const pronunciation: PronunciationItem[] = [
  {
    sound: "sz",
    example: "szkoła",
    note: "схоже на українське “ш”",
  },
  {
    sound: "cz",
    example: "człowiek",
    note: "схоже на “ч”",
  },
  {
    sound: "rz / ż",
    example: "przepraszam, żona",
    note: "важливий польський звук, часто плутається на старті",
  },
  {
    sound: "ł",
    example: "łóżko",
    note: "часто звучить близько до англійського “w”",
  },
  {
    sound: "ą",
    example: "pieniądze",
    note: "носовий звук, краще вчити через аудіо",
  },
  {
    sound: "ę",
    example: "dziękuję",
    note: "носовий звук, часто трапляється у словах і закінченнях",
  },
];

const phrases: PhraseItem[] = [
  {
    pl: "Dzień dobry",
    ua: "Добрий день",
    note: "ввічливе привітання",
  },
  {
    pl: "Cześć",
    ua: "Привіт",
    note: "неформальне привітання",
  },
  {
    pl: "Dziękuję",
    ua: "Дякую",
    note: "одне з найважливіших слів",
  },
  {
    pl: "Nie rozumiem",
    ua: "Я не розумію",
    note: "коли польська звучить занадто швидко",
  },
  {
    pl: "Mam pytanie",
    ua: "У мене є питання",
    note: "корисно на роботі, в офісі або школі",
  },
  {
    pl: "Gdzie jest sklep?",
    ua: "Де магазин?",
    note: "місто, покупки, орієнтація",
  },
];

const situations: CardItem[] = [
  {
    title: "Польська для роботи",
    text: "Слова й фрази для графіку, колег, інструкцій, документів, співбесіди та простого спілкування на роботі.",
  },
  {
    title: "Польська для документів",
    text: "Базові слова для установ, заяв, адреси, номера PESEL, школи, банку, лікаря та інших побутових справ.",
  },
  {
    title: "Польська для магазину й міста",
    text: "Фрази для покупок, транспорту, вулиці, кафе, аптеки, оплати, питань і коротких відповідей.",
  },
  {
    title: "Польська для навчання",
    text: "Лексика для школи, університету, курсів, викладачів, завдань і щоденного навчального середовища.",
  },
];

const commonMistakes: CardItem[] = [
  {
    title: "Думати, що польська повністю така сама, як українська",
    text: "Схожість допомагає, але через неї легко помилитися у значеннях, вимові й граматиці.",
  },
  {
    title: "Ігнорувати вимову",
    text: "Польська вимова дуже важлива. Якщо вчити слова тільки очима, потім складніше розуміти живу мову.",
  },
  {
    title: "Вчити багато слів без фраз",
    text: "Слово краще запам’ятовується, коли ти бачиш його у простому реченні.",
  },
  {
    title: "Починати з важких граматичних таблиць",
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
    name: "Польська мова онлайн з нуля для українців",
    description:
      "Онлайн курс польської мови у Flunio з уроками, словником, граматикою, вимовою, вправами та прогресом.",
    provider: {
      "@type": "Organization",
      name: "Flunio",
      url: SITE_URL,
    },
    url: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
    inLanguage: "uk",
    educationalLevel: "A0–B2",
    isAccessibleForFree: true,
  };

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-polish-uk"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Script
        id="course-schema-polish-uk"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold theme-text-muted">
          Польська онлайн · для українців · A0–B2 · слова, вимова, граматика
        </div>

        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Польська мова онлайн з нуля для українців
        </h1>

        <p className="theme-text-muted">
          Flunio допомагає вивчати польську мову онлайн системно: з базових
          слів, вимови, простих фраз і коротких вправ. Це не просто список
          польських слів, а послідовний шлях для тих, хто хоче почати з нуля й
          поступово перейти до впевненішого спілкування.
        </p>

        <p className="theme-text-muted">
          Для українців польська часто здається знайомою, але саме через цю
          схожість легко робити помилки. Тому на цій сторінці ми робимо акцент
          на вимову, фрази, фальшиві схожості, практичну лексику для Польщі та
          граматику через приклади.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Почати навчання
          </Link>

          <Link href="/polish-for-beginners" className={secondaryButton}>
            Польська для початківців
          </Link>

          <Link href="/polish-vocabulary" className={secondaryButton}>
            Польські слова
          </Link>

          <Link href="/polish-words-with-audio" className={secondaryButton}>
            Польські слова з аудіо
          </Link>

          <Link href="/polish-grammar" className={secondaryButton}>
            Граматика
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {whyPolishForUkrainians.map((item) => (
          <div key={item.title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-text">{item.title}</h2>
            <p className="mt-2 theme-text-muted">{item.text}</p>
          </div>
        ))}
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Швидкий маршрут для вивчення польської
        </h2>

        <p className="theme-text-muted">
          Якщо ти починаєш польську з нуля, не треба відкривати всі теми
          підряд. Краще йти маршрутом: вимова, перші слова, фрази для реального
          життя, а потім граматика й повторення.
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
          Як почати вивчати польську мову онлайн
        </h2>

        <p className="theme-text-muted">
          Найкращий старт — це не велика граматична таблиця, а коротка щоденна
          практика. Спочатку слухай польську, вчи слова за ситуаціями й одразу
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

          <Link href="/polish-for-beginners" className={secondaryButton}>
            План для початківців →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Польська вимова: що найчастіше складно на старті
        </h2>

        <p className="theme-text-muted">
          Польська вимова — одна з головних причин, чому початківцям буває
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

        <Link href="/polish-words-with-audio" className={secondaryButton}>
          Відкрити польські слова з аудіо →
        </Link>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Перші польські фрази для українців
        </h2>

        <p className="theme-text-muted">
          Польську краще вчити не тільки окремими словами, а й короткими
          фразами. Так ти швидше починаєш розуміти живі речення й можеш
          використовувати мову в реальних ситуаціях.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {phrases.map((phrase) => (
            <div key={phrase.pl} className={`${softCard} p-4`}>
              <h3 className="text-lg font-bold theme-text">{phrase.pl}</h3>
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
          Польська для роботи, документів і життя в Польщі
        </h2>

        <p className="theme-text-muted">
          Багато людей вивчають польську не “для екзамену”, а для реального
          життя: робота, житло, лікар, школа, транспорт, магазин, документи та
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
          <Link href="/polish-vocabulary" className={secondaryButton}>
            Польська лексика →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Польська граматика без хаосу
        </h2>

        <p className="theme-text-muted">
          Польська граматика важлива, але її не потрібно вивчати всю одразу.
          Відмінки, дієслова й закінчення легше зрозуміти, коли ти вже знаєш
          приклади. Наприклад, якщо ти знаєш praca, потім легше зрозуміти do
          pracy. Якщо знаєш dom, легше пояснити w domu.
        </p>

        <p className="theme-text-muted">
          Такий підхід допомагає не застрягнути на теорії й поступово переходити
          до реального використання польської.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/polish-grammar" className={secondaryBlock}>
            Польська граматика →
          </Link>

          <Link href="/polish-vocabulary" className={secondaryBlock}>
            Польські слова →
          </Link>

          <Link href="/polish-for-beginners" className={secondaryBlock}>
            Roadmap для початківців →
          </Link>

          <Link href="/learn-polish" className={secondaryBlock}>
            Learn Polish page →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Типові помилки українців у польській
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
          Ця сторінка — український хаб для старту польської мови онлайн. Далі
          можна перейти до конкретної теми: план для початківців, слова,
          вимова, граматика або сам курс Flunio.
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
          Кому підійде навчання польської у Flunio
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            Flunio підійде тим, хто хоче вивчати польську онлайн у простому,
            структурованому і практичному форматі. Це хороший варіант, якщо ти
            починаєш з нуля, повертаєшся до мови після перерви або хочеш
            створити стабільну звичку щоденного навчання.
          </p>

          <p>
            Курс також корисний, якщо польська потрібна для повсякденного життя,
            роботи, навчання, документів, подорожей або базового спілкування.
            Можна рухатися у власному темпі та повертатися до попередніх уроків
            для повторення.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Почати навчання →
          </Link>

          <Link href="/polish-for-beginners" className={secondaryButton}>
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
          Почни польську з короткого уроку
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

          <Link href="/polish-vocabulary" className={secondaryButton}>
            Польські слова
          </Link>

          <Link href="/learn-polish" className={secondaryButton}>
            Learn Polish page
          </Link>
        </div>
      </section>
    </main>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Курси словацької мови онлайн з нуля A0–B2 | Flunio",
  description:
    "Онлайн курс словацької мови у Flunio: вивчення словацької з нуля, A0 безкоштовно, уроки, слова, граматика, вимова, вправи та прогрес.",

  alternates: {
    canonical: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    languages: {
      en: `${SITE_URL}/learn-slovak`,
      ru: `${SITE_URL}/ru/learn-slovak`,
      uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
      "x-default": `${SITE_URL}/learn-slovak`,
    },
  },

  openGraph: {
    title: "Курси словацької мови онлайн з нуля A0–B2 | Flunio",
    description:
      "Словацька мова онлайн: короткі уроки, словник, граматика, вимова, вправи та прогрес в одному місці.",
    url: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

type RouteCard = {
  title: string;
  text: string;
  href: string;
};

type FeatureCard = {
  title: string;
  text: string;
};

type WordGroup = {
  title: string;
  words: string;
};

type PhraseItem = {
  sk: string;
  ua: string;
  note: string;
};

const FAQ = [
  {
    q: "Чи можна вивчати словацьку мову онлайн з нуля?",
    a: "Так. У Flunio можна почати з рівня A0: базові слова, короткі уроки, озвучка, вправи та поступовий перехід до A1, A2, B1 і B2.",
  },
  {
    q: "Чи є безкоштовний онлайн курс словацької?",
    a: "Так. У Flunio рівень A0 доступний безкоштовно. Можна пройти перші уроки, вивчити базові слова, слухати вимову та виконувати вправи без Premium.",
  },
  {
    q: "Скільки часу потрібно займатися щодня?",
    a: "Оптимально 10–20 хвилин на день. Регулярні короткі заняття зазвичай працюють краще, ніж довгі, але рідкісні сесії.",
  },
  {
    q: "Що входить в онлайн навчання словацької?",
    a: "На платформі є уроки по рівнях, словник, граматика з прикладами, озвучка слів і фраз, а також вправи для повторення.",
  },
  {
    q: "Чи підходить Flunio для життя або роботи у Словаччині?",
    a: "Так. Курс допомагає вивчати практичну лексику для побуту, роботи, навчання, документів, транспорту та щоденного спілкування.",
  },
  {
    q: "Чи треба починати з граматики?",
    a: "Не обов’язково. Якщо ти починаєш з нуля, краще спочатку вивчити базові слова, вимову та прості фрази, а граматику додавати поступово.",
  },
  {
    q: "Чи зберігається прогрес?",
    a: "Так, прогрес уроків зберігається, щоб ти бачив пройдені теми та міг повертатися до повторення.",
  },
];

const routeCards: RouteCard[] = [
  {
    title: "Словацька для початківців →",
    text: "Що вчити першим, як пройти перші 7 і 30 днів, які слова та граматику брати на старті.",
    href: "/slovak-for-beginners",
  },
  {
    title: "Перший урок A0 →",
    text: "Почни з короткого уроку, вивчи перші слова, послухай вимову й одразу виконай вправи.",
    href: "/learning/a0-1",
  },
  {
    title: "Словацькі слова з перекладом →",
    text: "Базова лексика за темами: привітання, сім’я, дім, їжа, транспорт, робота й навчання.",
    href: "/slovatski-slova-z-perekladom",
  },
  {
    title: "Словацька граматика →",
    text: "Алфавіт, дієслова, відмінки, порядок слів і базові правила з простими поясненнями.",
    href: "/slovak-grammar",
  },
];

const features: FeatureCard[] = [
  {
    title: "1) Уроки словацької по рівнях",
    text: "Матеріал організований від A0 до B2, щоб ти завжди розумів, що вчити далі. Це допомагає рухатися послідовно, а не стрибати між випадковими темами.",
  },
  {
    title: "2) Коротка щоденна практика",
    text: "Уроки короткі, тому їх легко проходити щодня. 10–20 хвилин на день достатньо, щоб поступово накопичувати словниковий запас і не вигорати.",
  },
  {
    title: "3) Озвучка слів і фраз",
    text: "Словацьку важливо не тільки читати, а й чути. Озвучка допомагає звикати до вимови, повторювати слова вголос і краще сприймати мову на слух.",
  },
  {
    title: "4) Словник і граматика разом",
    text: "У Flunio є уроки, словник, граматичні теми та вправи. Це дозволяє не просто запам’ятовувати слова, а й розуміти, як використовувати їх у реченнях.",
  },
];

const studySteps: FeatureCard[] = [
  {
    title: "Крок 1: Почни з A0",
    text: "Якщо ти вивчаєш словацьку з нуля, не починай з B1-граматики або складних таблиць. Спочатку відкрий перші A0-уроки.",
  },
  {
    title: "Крок 2: Вчи слова за темами",
    text: "Привітання, сім’я, дім, їжа, транспорт, робота, здоров’я, документи — це база для реального життя у Словаччині.",
  },
  {
    title: "Крок 3: Слухай вимову",
    text: "Словацькі звуки č, š, ž, ľ, ô і довгі голосні легше засвоюються через регулярне слухання та повторення.",
  },
  {
    title: "Крок 4: Додавай граматику поступово",
    text: "Відмінки, дієслова й закінчення краще розуміти через уже знайомі слова та приклади, а не через сухі таблиці.",
  },
];

const levelCards: FeatureCard[] = [
  {
    title: "A0 — старт з нуля",
    text: "Перші слова, базові фрази, вимова, прості вправи й поступове звикання до словацької мови.",
  },
  {
    title: "A1 — базове спілкування",
    text: "Більше тем для щоденного життя, прості речення, найчастіші дієслова та перші граматичні конструкції.",
  },
  {
    title: "A2 — впевненіша база",
    text: "Більше лексики для роботи, навчання, транспорту, документів, побуту й реальних ситуацій.",
  },
  {
    title: "B1–B2 — розвиток мови",
    text: "Розширення словника, складніші речення, повторення, граматика й підготовка до впевненішого користування мовою.",
  },
];

const wordGroups: WordGroup[] = [
  {
    title: "Перші слова",
    words: "dom, práca, obchod, rodina, voda, jedlo, mesto, škola, zdravie.",
  },
  {
    title: "Щоденні ситуації",
    words: "dobrý deň, ďakujem, prosím, prepáčte, nerozumiem, kde je...",
  },
  {
    title: "Робота й навчання",
    words: "pracovať, rozumieť, hovoriť, dokument, kolega, škola, čas.",
  },
  {
    title: "Транспорт і місто",
    words: "autobus, vlak, zastávka, ulica, cesta, ísť, prísť, odísť.",
  },
];

const phrases: PhraseItem[] = [
  {
    sk: "Dobrý deň",
    ua: "Добрий день",
    note: "ввічливе привітання",
  },
  {
    sk: "Ako sa máš?",
    ua: "Як справи?",
    note: "просте спілкування",
  },
  {
    sk: "Nerozumiem",
    ua: "Я не розумію",
    note: "коли словацька звучить занадто швидко",
  },
  {
    sk: "Prosím vás",
    ua: "Будь ласка / перепрошую",
    note: "ввічливе звертання",
  },
  {
    sk: "Kde je obchod?",
    ua: "Де магазин?",
    note: "місто й покупки",
  },
  {
    sk: "Chcem vodu",
    ua: "Я хочу воду",
    note: "просте речення",
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
    name: "Курси словацької мови онлайн з нуля A0–B2",
    description:
      "Онлайн курс словацької мови у Flunio з уроками, словником, граматикою, вимовою, вправами та прогресом.",
    provider: {
      "@type": "Organization",
      name: "Flunio",
      url: SITE_URL,
    },
    url: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    inLanguage: "uk",
    educationalLevel: "A0–B2",
    isAccessibleForFree: true,
  };

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-uk-online"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Script
        id="course-schema-uk-slovak-online"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold theme-text-muted">
          Онлайн курс словацької · A0 безкоштовно · A1–B2 Premium
        </div>

        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Курси словацької мови онлайн — вивчення з нуля до B2
        </h1>

        <p className="theme-text-muted">
          Flunio — це онлайн курс словацької мови для тих, хто хоче почати з
          нуля і рухатися без хаосу. Замість випадкових списків слів, відео та
          складних пояснень ти проходиш короткі уроки, слухаєш вимову, виконуєш
          вправи й поступово будуєш словниковий запас.
        </p>

        <p className="theme-text-muted">
          Курс підходить для життя, роботи, навчання, документів і щоденного
          спілкування у Словаччині. Рівень A0 доступний безкоштовно, а A1, A2,
          B1 і B2 відкриваються у Premium.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className={primaryButton} href="/learning/a0-1">
            Почати A0 безкоштовно →
          </Link>

          <Link className={secondaryButton} href="/learning">
            Усі рівні курсу
          </Link>

          <Link className={secondaryButton} href="/slovak-for-beginners">
            Словацька для початківців
          </Link>

          <Link className={secondaryButton} href="/slovak-grammar">
            Граматика
          </Link>

          <Link className={secondaryButton} href="/dictionary">
            Словник
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Швидкий маршрут для вивчення словацької
        </h2>

        <p className="theme-text-muted">
          Якщо ти тільки починаєш, краще не відкривати одразу всі теми. Йди
          маршрутом: перший урок, базові слова, вимова, прості фрази, а вже
          потім граматика та регулярне повторення.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {routeCards.map((item) => (
            <Link key={item.href} href={item.href} className={`${softCard} block p-4`}>
              <h3 className="font-semibold theme-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {features.map((item) => (
          <div key={item.title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-text">{item.title}</h2>
            <p className="mt-2 theme-text-muted">{item.text}</p>
          </div>
        ))}
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Як почати вивчати словацьку мову онлайн
        </h2>

        <p className="theme-text-muted">
          Якщо ти починаєш з нуля, не варто одразу намагатися вивчити всю
          граматику. Спочатку краще створити базу: найчастіші слова, прості
          фрази, вимова та базові конструкції. Коли в пам’яті вже є приклади,
          граматика сприймається значно легше.
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
          <Link className={primaryButton} href="/learning/a0-1">
            Перейти до A0 →
          </Link>

          <Link className={secondaryButton} href="/yak-vyvchyty-slovatsku-movu">
            Як вивчити словацьку →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Рівні онлайн курсу словацької
        </h2>

        <p className="theme-text-muted">
          Flunio побудований як послідовний курс. A0 допомагає стартувати з
          нуля, A1–A2 розширюють базу, а B1–B2 дають більше практики, лексики й
          граматики для впевненішого користування мовою.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {levelCards.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <Link href="/learning" className={secondaryButton}>
          Подивитися всі рівні →
        </Link>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Що найскладніше у словацькій для початківців?
        </h2>

        <p className="theme-text-muted">
          Словацька мова має багато спільного з іншими слов’янськими мовами, але
          все одно потребує системного підходу. Найчастіше складність викликають
          відмінки, закінчення слів, форми дієслів і вимова окремих звуків. Це
          нормально: такі речі краще засвоюються поступово, через приклади та
          регулярне повторення.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Вимова</h3>
            <p className="mt-2 text-sm theme-text-muted">
              У словацькій є довгі голосні, м’які звуки та літери č, š, ž, ľ,
              ô. Озвучка допомагає звикнути до них швидше.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Відмінки</h3>
            <p className="mt-2 text-sm theme-text-muted">
              Іменники та прикметники змінюються залежно від ролі у реченні. Це
              легше зрозуміти через готові приклади.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Дієслова</h3>
            <p className="mt-2 text-sm theme-text-muted">
              Дієслова змінюються за особами, часом і значенням. Починати краще
              з найчастіших дієслів у теперішньому часі.
            </p>
          </div>
        </div>

        <p className="theme-text-muted">
          Щоб не застрягти на старті, подивись також сторінку про{" "}
          <Link className={textLink} href="/pomylky-v-slovatskii-movi">
            типові помилки у словацькій мові
          </Link>
          . Вона допоможе не вчити неправильні звички з самого початку.
        </p>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Словацька лексика для реальних ситуацій
        </h2>

        <p className="theme-text-muted">
          Хороше навчання словацької має давати не тільки окремі слова, а й
          лексику для реального життя: знайомство, покупки, транспорт, житло,
          робота, навчання, документи та щоденне спілкування.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {wordGroups.map((group) => (
            <div key={group.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-text">{group.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{group.words}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/slovatski-slova-z-perekladom" className={secondaryButton}>
            Словацькі слова з перекладом →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Корисні словацькі фрази для старту
        </h2>

        <p className="theme-text-muted">
          Щоб словацька не залишалася лише списком слів, одразу з’єднуй лексику
          з короткими фразами. Так легше зрозуміти порядок слів і базову логіку
          речення.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {phrases.map((phrase) => (
            <div key={phrase.sk} className={`${softCard} p-4`}>
              <h3 className="text-lg font-bold theme-text">{phrase.sk}</h3>
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
          Граматика має допомагати, а не блокувати навчання
        </h2>

        <p className="theme-text-muted">
          Граматика важлива, але її краще вивчати тоді, коли вона пояснює вже
          знайомі приклади. Спочатку можна накопичувати слова і фрази, а потім
          відкривати граматичні теми, щоб зрозуміти, чому речення побудоване
          саме так.
        </p>

        <p className="theme-text-muted">
          Такий підхід особливо корисний для словацької, бо відмінки, дієслова
          і закінчення легше засвоюються не як суха теорія, а через контекст і
          повторення. Для окремого огляду правил відкрий сторінку{" "}
          <Link className={textLink} href="/slovak-grammar">
            словацької граматики
          </Link>
          .
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/slovak-grammar" className={secondaryBlock}>
            Словацька граматика →
          </Link>

          <Link href="/grammar" className={secondaryBlock}>
            Усі граматичні теми →
          </Link>

          <Link href="/dictionary" className={secondaryBlock}>
            Відкрити словник →
          </Link>

          <Link href="/learning" className={secondaryBlock}>
            Перейти до навчання →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Український маршрут: що вивчати після цієї сторінки
        </h2>

        <p className="theme-text-muted">
          Ця сторінка — центральний український хаб для старту словацької мови
          онлайн. Далі можна перейти до конкретних сторінок залежно від того, що
          тобі потрібно саме зараз: перший урок, план навчання, слова, граматика
          або виправлення типових помилок.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/slovak-for-beginners" className={`${softCard} block p-4`}>
            <div className="font-semibold theme-text">
              Якщо ти починаєш з нуля →
            </div>
            <div className="mt-1 text-sm theme-text-muted">
              Відкрий roadmap для початківців: перші 7 днів, 30 днів і базові
              теми.
            </div>
          </Link>

          <Link
            href="/yak-vyvchyty-slovatsku-movu"
            className={`${softCard} block p-4`}
          >
            <div className="font-semibold theme-text">
              Якщо хочеш план навчання →
            </div>
            <div className="mt-1 text-sm theme-text-muted">
              Подивись, як вивчати словацьку без хаосу й що робити поетапно.
            </div>
          </Link>

          <Link
            href="/slovatski-slova-z-perekladom"
            className={`${softCard} block p-4`}
          >
            <div className="font-semibold theme-text">Якщо потрібні слова →</div>
            <div className="mt-1 text-sm theme-text-muted">
              Почни з базової лексики за темами й перекладом українською.
            </div>
          </Link>

          <Link
            href="/pomylky-v-slovatskii-movi"
            className={`${softCard} block p-4`}
          >
            <div className="font-semibold theme-text">
              Якщо боїшся помилок →
            </div>
            <div className="mt-1 text-sm theme-text-muted">
              Розбери типові помилки у вимові, словах, граматиці та реченнях.
            </div>
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Кому підійде онлайн курс словацької
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            Flunio підійде тим, хто хоче вивчати словацьку онлайн у простому,
            структурованому і практичному форматі. Це хороший варіант, якщо ти
            починаєш з нуля, повертаєшся до мови після перерви або хочеш
            створити стабільну звичку щоденного навчання.
          </p>

          <p>
            Курс також корисний, якщо словацька потрібна для повсякденного
            життя, роботи, навчання, документів, подорожей або базового
            спілкування. Можна рухатися у власному темпі та повертатися до
            попередніх уроків для повторення.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className={primaryButton} href="/learning/a0-1">
            Почати перший урок →
          </Link>

          <Link className={secondaryButton} href="/premium">
            Що відкриває Premium
          </Link>

          <Link className={secondaryButton} href="/dictionary">
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
          Почни словацьку з першого уроку
        </h2>

        <p className="theme-text-muted">
          Найкращий наступний крок — не просто читати про навчання, а відкрити
          перший короткий урок, пройти вправи й повернутися до повторення. Так
          словацька поступово переходить із теорії в реальну практику.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className={primaryButton} href="/learning/a0-1">
            Почати з A0-1 →
          </Link>

          <Link className={secondaryButton} href="/slovak-for-beginners">
            План для початківців
          </Link>

          <Link className={secondaryButton} href="/learn-slovak">
            Learn Slovak page
          </Link>
        </div>
      </section>
    </main>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Як вивчити словацьку мову з нуля: покроковий план | Flunio",
  description:
    "Як самостійно вивчити словацьку мову з нуля: покроковий план для початківців, перші слова, вимова, граматика, практика та типові помилки.",

  alternates: {
    canonical: `${SITE_URL}/yak-vyvchyty-slovatsku-movu`,
  },

  openGraph: {
    title: "Як вивчити словацьку мову з нуля: покроковий план | Flunio",
    description:
      "Покроковий план для тих, хто хоче почати вивчати словацьку мову з нуля і не загубитися в словах, граматиці та вправах.",
    url: `${SITE_URL}/yak-vyvchyty-slovatsku-movu`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "З чого почати вивчати словацьку мову?",
    a: "Найкраще почати з базових слів, простих фраз, вимови та коротких щоденних уроків. Не варто одразу вчити всю граматику без прикладів.",
  },
  {
    q: "Чи можна вивчити словацьку мову самостійно?",
    a: "Так, можна. Важливо мати систему: уроки по рівнях, повторення, озвучку, вправи та регулярну практику хоча б 10–20 хвилин на день.",
  },
  {
    q: "Скільки часу потрібно, щоб вивчити словацьку з нуля?",
    a: "Першу базу для простого спілкування можна створити за кілька місяців регулярної практики. Швидкість залежить від часу, повторення і того, як часто ти використовуєш мову.",
  },
  {
    q: "Що складніше у словацькій для українців?",
    a: "Найчастіше складність викликають відмінки, закінчення, дієслова, довгі голосні та деякі звуки. Але через приклади й повторення це засвоюється поступово.",
  },
  {
    q: "Чи підходить Flunio для початківців?",
    a: "Так. У Flunio можна почати з рівня A0, проходити короткі уроки, слухати озвучку, виконувати вправи та поступово переходити до наступних рівнів.",
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
const textLink = "font-semibold theme-accent-text underline-offset-4 hover:underline";

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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Вивчення словацької",
        item: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Як вивчити словацьку мову",
        item: `${SITE_URL}/yak-vyvchyty-slovatsku-movu`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-yak-vyvchyty-slovatsku-movu"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Script
        id="breadcrumb-schema-yak-vyvchyty-slovatsku-movu"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold theme-text-muted">
          План навчання · словацька з нуля · A0–A1 старт
        </div>

        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Як вивчити словацьку мову з нуля: простий план
        </h1>

        <p className="theme-text-muted">
          Вивчення словацької мови з нуля часто здається складним: багато нових
          слів, незнайома вимова, відмінки, дієслова і граматика. Але якщо
          рухатися поступово, словацьку можна вивчати без хаосу і перевантаження.
        </p>

        <p className="theme-text-muted">
          Головне — не намагатися вивчити все одразу. Краще почати з базових
          слів, простих фраз, правильної вимови і короткої щоденної практики.
          Саме такий підхід допомагає створити основу для реального спілкування.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Почати з A0 →
          </Link>

          <Link href="/slovak-for-beginners" className={secondaryButton}>
            Словацька для початківців
          </Link>

          <Link href="/learn-slovak" className={secondaryButton}>
            Курс словацької
          </Link>

          <Link
            href="/vyvchennia-slovatskoi-movy-online"
            className={secondaryButton}
          >
            Словацька онлайн
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Короткий маршрут: що відкрити першим
        </h2>

        <p className="theme-text-muted">
          Якщо ти не знаєш, з чого почати, не відкривай усе підряд. Краще йти
          простим маршрутом: план для початківців, перший урок, слова, граматика
          і практика.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/slovak-for-beginners" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              1. Словацька для початківців →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Roadmap для старту: що вчити першим, перші 7 днів, перші 30 днів,
              базові слова, вимова й граматика.
            </p>
          </Link>

          <Link href="/learning/a0-1" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              2. Перший урок A0 →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Почни не з теорії, а з короткого уроку, де слова одразу
              закріплюються через озвучку й вправи.
            </p>
          </Link>

          <Link
            href="/slovatski-slova-z-perekladom"
            className={`${softCard} block p-4`}
          >
            <h3 className="font-semibold theme-text">
              3. Словацькі слова →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Базова лексика з перекладом українською: дім, їжа, транспорт,
              робота, дієслова й корисні прикметники.
            </p>
          </Link>

          <Link href="/slovak-grammar" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              4. Словацька граматика →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Пояснення граматики без перевантаження: алфавіт, дієслова,
              відмінки, порядок слів і базові речення.
            </p>
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Чи складно вивчити словацьку мову?
        </h2>

        <p className="theme-text-muted">
          Словацька мова має багато спільного з українською, тому частина слів
          може здаватися знайомою. Але це не означає, що все буде автоматично
          зрозуміло. Часто саме схожість мов створює помилки: слово виглядає
          знайомо, але має інше значення або вживається інакше.
        </p>

        <p className="theme-text-muted">
          Для початківця найкраща стратегія — не зубрити правила окремо, а
          вчити слова і фрази в контексті. Коли ти бачиш приклади речень,
          слухаєш вимову і повторюєш матеріал, граматика поступово стає
          зрозумілішою. Детальніший стартовий маршрут є на сторінці{" "}
          <Link className={textLink} href="/slovak-for-beginners">
            словацька для початківців
          </Link>
          .
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">1) Почни зі слів</h2>
          <p className="mt-2 theme-text-muted">
            Спочатку вчи найчастіші слова для щоденного життя: люди, їжа, дім,
            робота, транспорт, покупки, час і прості дії.
          </p>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">2) Додавай фрази</h2>
          <p className="mt-2 theme-text-muted">
            Окремі слова важливі, але говорити допомагають фрази. Вчи готові
            конструкції для знайомства, питань, магазину, роботи і документів.
          </p>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">3) Слухай вимову</h2>
          <p className="mt-2 theme-text-muted">
            Словацьку треба не тільки читати, а й чути. Озвучка допомагає
            звикнути до ритму мови, довгих голосних і характерних звуків.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Покроковий план: як вивчити словацьку з нуля
        </h2>

        <ol className="list-decimal space-y-3 pl-5 theme-text-muted">
          <li>
            <strong className="theme-text">Почни з рівня A0.</strong> Не
            перескакуй одразу до складної граматики. Спочатку створи базу з
            найпростіших слів і фраз. Найпростіший старт —{" "}
            <Link className={textLink} href="/learning/a0-1">
              перший урок A0
            </Link>
            .
          </li>

          <li>
            <strong className="theme-text">Вчи невеликими порціями.</strong> 10
            нових слів на день краще, ніж 100 слів один раз на тиждень без
            повторення. Для старту відкрий{" "}
            <Link className={textLink} href="/slovatski-slova-z-perekladom">
              словацькі слова з перекладом
            </Link>
            .
          </li>

          <li>
            <strong className="theme-text">Слухай кожне слово.</strong>{" "}
            Повторюй уголос, навіть якщо спочатку звучить незвично. Вимова
            формується через регулярність.
          </li>

          <li>
            <strong className="theme-text">Роби вправи після уроку.</strong>{" "}
            Просто прочитати слово недостатньо. Треба впізнати його, згадати
            переклад і використати в завданні. Для цього використовуй{" "}
            <Link className={textLink} href="/practice">
              практику
            </Link>
            .
          </li>

          <li>
            <strong className="theme-text">Повторюй старі слова.</strong> Без
            повторення слова швидко забуваються. Краще повертатися до них через
            день, тиждень і місяць.
          </li>

          <li>
            <strong className="theme-text">
              Підключай граматику поступово.
            </strong>{" "}
            Відмінки, дієслова і закінчення краще пояснювати на прикладах, які
            ти вже бачив. Для цього відкрий{" "}
            <Link className={textLink} href="/slovak-grammar">
              словацьку граматику
            </Link>
            .
          </li>

          <li>
            <strong className="theme-text">Не чекай ідеального моменту.</strong>{" "}
            Почни з короткої практики сьогодні, навіть якщо маєш тільки 10
            хвилин.
          </li>
        </ol>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Почати перший урок →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Перейти до практики
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          План на 30 днів для початківця
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Дні 1–7: база</h3>
            <p className="mt-2 theme-text-muted">
              Вчи найпростіші слова: привітання, числа, сім’я, їжа, дім, базові
              дієслова і короткі фрази для щоденного спілкування. Для цього
              підійде сторінка{" "}
              <Link className={textLink} href="/slovatski-slova-z-perekladom">
                словацьких слів
              </Link>
              .
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Дні 8–14: фрази</h3>
            <p className="mt-2 theme-text-muted">
              Додавай готові речення: як попросити, запитати, відповісти,
              подякувати, щось купити або пояснити просту ситуацію. Закріплюй
              їх у{" "}
              <Link className={textLink} href="/learning">
                коротких уроках
              </Link>
              .
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Дні 15–21: граматика</h3>
            <p className="mt-2 theme-text-muted">
              Почни розбирати базові дієслова, порядок слів, прості питання і
              перші відмінкові форми через приклади. Окремий огляд є в розділі{" "}
              <Link className={textLink} href="/slovak-grammar">
                словацької граматики
              </Link>
              .
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Дні 22–30: повторення</h3>
            <p className="mt-2 theme-text-muted">
              Повторюй пройдені слова, роби вправи, слухай вимову і пробуй
              складати прості речення зі знайомою лексикою. Для повторення
              використовуй{" "}
              <Link className={textLink} href="/practice">
                practice
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Типові помилки при вивченні словацької
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            <strong className="theme-text">
              Помилка 1: вчити тільки списки слів.
            </strong>{" "}
            Слова потрібні, але без прикладів і вправ вони швидко забуваються.
          </p>

          <p>
            <strong className="theme-text">
              Помилка 2: ігнорувати вимову.
            </strong>{" "}
            Якщо тільки читати, потім важче розуміти живу мову на слух.
          </p>

          <p>
            <strong className="theme-text">
              Помилка 3: починати з важкої граматики.
            </strong>{" "}
            Граматика без базових слів виглядає страшніше, ніж є насправді.
          </p>

          <p>
            <strong className="theme-text">
              Помилка 4: займатися нерегулярно.
            </strong>{" "}
            Для мови краще 10 хвилин щодня, ніж одна довга сесія раз на
            тиждень.
          </p>

          <p>
            <strong className="theme-text">
              Помилка 5: боятися помилятися.
            </strong>{" "}
            Помилки — це частина навчання. Головне — помічати їх і поступово
            виправляти.
          </p>
        </div>

        <p className="theme-text-muted">
          Детальніше ці проблеми винесені на окрему сторінку{" "}
          <Link className={textLink} href="/pomylky-v-slovatskii-movi">
            типові помилки в словацькій мові
          </Link>
          . Її варто прочитати після перших уроків, щоб не закріпити неправильні
          звички.
        </p>

        <div className="pt-2">
          <Link href="/pomylky-v-slovatskii-movi" className={secondaryButton}>
            Типові помилки →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Як не втратити мотивацію
        </h2>

        <p className="theme-text-muted">
          Мотивація часто зникає не тому, що мова занадто складна, а тому що
          людина не бачить прогресу. Тому важливо мати маленькі цілі: пройти
          один урок, повторити 10 слів, зробити вправу, послухати вимову або
          згадати старі слова.
        </p>

        <p className="theme-text-muted">
          Коли навчання коротке і зрозуміле, його легше зробити звичкою. Саме
          тому у Flunio уроки побудовані так, щоб ти міг рухатися поступово: від
          A0 до складніших рівнів, з озвучкою, словником, граматикою і вправами.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Спробувати Flunio →
          </Link>

          <Link href="/slovak-grammar" className={secondaryButton}>
            Граматика
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Вправи
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Корисні сторінки для старту
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/slovak-for-beginners" className={secondaryBlock}>
            Словацька для початківців →
          </Link>

          <Link
            href="/vyvchennia-slovatskoi-movy-online"
            className={secondaryBlock}
          >
            Вивчення словацької онлайн →
          </Link>

          <Link href="/learn-slovak" className={secondaryBlock}>
            Learn Slovak online →
          </Link>

          <Link href="/slovatski-slova-z-perekladom" className={secondaryBlock}>
            Словацькі слова з перекладом →
          </Link>

          <Link href="/slovak-grammar" className={secondaryBlock}>
            Словацька граматика →
          </Link>

          <Link href="/dictionary" className={secondaryBlock}>
            Словацький словник →
          </Link>

          <Link href="/pomylky-v-slovatskii-movi" className={secondaryBlock}>
            Типові помилки →
          </Link>

          <Link href="/practice" className={secondaryBlock}>
            Вправи для повторення →
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
          Почни з маленького уроку вже зараз
        </h2>

        <p className="theme-text-muted">
          Найпростіший спосіб не застрягти в плануванні — відкрити перший урок і
          пройти його. Після цього вже буде зрозуміліше, які слова повторити, яку
          граматику подивитися і які помилки виправити.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Почати A0-1 →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Перейти до практики
          </Link>
        </div>
      </section>
    </main>
  );
}
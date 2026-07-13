import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Словацькі слова з перекладом українською | Flunio",
  description:
    "Базові словацькі слова з перекладом українською: привітання, їжа, дім, робота, транспорт, час, дієслова та корисні фрази для початківців.",

  alternates: {
    canonical: `${SITE_URL}/slovatski-slova-z-perekladom`,
    languages: {
      uk: `${SITE_URL}/slovatski-slova-z-perekladom`,
      ru: `${SITE_URL}/ru/slovak-vocabulary`,
      "x-default": `${SITE_URL}/slovatski-slova-z-perekladom`,
    },
  },

  openGraph: {
    title: "Словацькі слова з перекладом українською | Flunio",
    description:
      "Добірка базових словацьких слів для початківців: теми, переклад, поради для запам’ятовування і посилання на уроки.",
    url: `${SITE_URL}/slovatski-slova-z-perekladom`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Які словацькі слова вчити першими?",
    a: "Почни з привітань, базових дієслів, чисел, їжі, дому, транспорту, роботи та слів для щоденного спілкування.",
  },
  {
    q: "Скільки слів потрібно знати для базового спілкування?",
    a: "Для простого побутового спілкування часто достатньо 500–1000 найуживаніших слів, якщо ти також вмієш складати прості речення.",
  },
  {
    q: "Як краще запам’ятовувати словацькі слова?",
    a: "Вчи слова маленькими групами, слухай вимову, повторюй уголос, використовуй слова у реченнях і регулярно повертайся до старої лексики.",
  },
];

const sections = [
  {
    title: "Привітання та ввічливість",
    words: [
      ["Ahoj", "привіт"],
      ["Dobrý deň", "добрий день"],
      ["Dobrý večer", "добрий вечір"],
      ["Ďakujem", "дякую"],
      ["Prosím", "будь ласка / прошу"],
      ["Prepáčte", "вибачте"],
      ["Áno", "так"],
      ["Nie", "ні"],
    ],
  },
  {
    title: "Люди та сім’я",
    words: [
      ["človek", "людина"],
      ["muž", "чоловік"],
      ["žena", "жінка"],
      ["dieťa", "дитина"],
      ["rodina", "сім’я"],
      ["mama", "мама"],
      ["otec", "батько"],
      ["priateľ", "друг / хлопець"],
    ],
  },
  {
    title: "Дім і побут",
    words: [
      ["dom", "дім"],
      ["byt", "квартира"],
      ["izba", "кімната"],
      ["kuchyňa", "кухня"],
      ["dvere", "двері"],
      ["okno", "вікно"],
      ["posteľ", "ліжко"],
      ["stôl", "стіл"],
    ],
  },
  {
    title: "Їжа та напої",
    words: [
      ["chlieb", "хліб"],
      ["voda", "вода"],
      ["káva", "кава"],
      ["čaj", "чай"],
      ["mlieko", "молоко"],
      ["mäso", "м’ясо"],
      ["ryža", "рис"],
      ["polievka", "суп"],
    ],
  },
  {
    title: "Транспорт і місто",
    words: [
      ["auto", "авто"],
      ["autobus", "автобус"],
      ["vlak", "поїзд"],
      ["zastávka", "зупинка"],
      ["cesta", "дорога"],
      ["ulica", "вулиця"],
      ["mesto", "місто"],
      ["obchod", "магазин"],
    ],
  },
  {
    title: "Робота та навчання",
    words: [
      ["práca", "робота"],
      ["škola", "школа"],
      ["učiteľ", "вчитель"],
      ["študent", "студент"],
      ["kolega", "колега"],
      ["firma", "фірма / компанія"],
      ["peniaze", "гроші"],
      ["čas", "час"],
    ],
  },
  {
    title: "Базові дієслова",
    words: [
      ["byť", "бути"],
      ["mať", "мати"],
      ["ísť", "йти"],
      ["robiť", "робити"],
      ["vedieť", "знати / вміти"],
      ["chcieť", "хотіти"],
      ["vidieť", "бачити"],
      ["hovoriť", "говорити"],
    ],
  },
  {
    title: "Корисні прикметники",
    words: [
      ["dobrý", "добрий / хороший"],
      ["zlý", "поганий"],
      ["veľký", "великий"],
      ["malý", "малий"],
      ["nový", "новий"],
      ["starý", "старий"],
      ["rýchly", "швидкий"],
      ["dôležitý", "важливий"],
    ],
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

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-slovatski-slova-z-perekladom"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold theme-text-muted">
          Словацька лексика · переклад українською · A0–A1
        </div>

        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Словацькі слова з перекладом українською
        </h1>

        <p className="theme-text-muted">
          Якщо ти тільки починаєш вивчати словацьку мову, найкраще почати з
          базових слів для щоденного життя. Саме вони допомагають розуміти прості
          фрази, будувати перші речення і швидше звикати до словацької.
        </p>

        <p className="theme-text-muted">
          Нижче зібрані словацькі слова з перекладом українською за темами:
          привітання, сім’я, дім, їжа, транспорт, робота, дієслова та
          прикметники. Це хороша база для рівня A0–A1.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Почати уроки A0 →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник
          </Link>

          <Link href="/slovak-for-beginners" className={secondaryButton}>
            Словацька для початківців
          </Link>

          <Link
            href="/vyvchennia-slovatskoi-movy-online"
            className={secondaryButton}
          >
            Вивчення словацької онлайн
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Як використовувати цей список слів
        </h2>

        <p className="theme-text-muted">
          Ця сторінка — не просто таблиця. Її краще використовувати як стартову
          карту лексики: спочатку переглянь базові теми, потім відкрий перший
          урок, а після цього повторюй слова у словнику й практиці.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/slovak-for-beginners" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              Якщо ти починаєш з нуля →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Перейди до beginner-roadmap: перші 7 днів, 30 днів, перші слова,
              вимова й базова граматика.
            </p>
          </Link>

          <Link href="/learn-slovak" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              Якщо хочеш сторінку курсу →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Відкрий загальну сторінку Slovak course з рівнями A0–B2, уроками,
              вимовою та вправами.
            </p>
          </Link>

          <Link href="/slovak-grammar" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              Якщо потрібні правила →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Подивись огляд словацької граматики: алфавіт, дієслова, відмінки
              й порядок слів.
            </p>
          </Link>

          <Link href="/practice" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              Якщо хочеш повторення →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Переходь до практики, щоб не просто читати слова, а закріплювати
              їх у вправах.
            </p>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-text">{section.title}</h2>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 theme-simple:border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-left theme-text-muted theme-simple:bg-slate-50">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Словацькою</th>
                    <th className="px-3 py-2 font-semibold">Українською</th>
                  </tr>
                </thead>
                <tbody>
                  {section.words.map(([sk, ua]) => (
                    <tr
                      key={sk}
                      className="border-t border-white/10 theme-simple:border-slate-200"
                    >
                      <td className="px-3 py-2 font-medium theme-text">{sk}</td>
                      <td className="px-3 py-2 theme-text-muted">{ua}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Як правильно вчити словацькі слова
        </h2>

        <p className="theme-text-muted">
          Не варто просто читати великий список слів один раз. Так слова швидко
          забуваються. Краще вчити невеликі групи, слухати вимову, повторювати
          уголос і одразу використовувати слова у вправах або простих реченнях.
        </p>

        <ul className="list-disc space-y-2 pl-5 theme-text-muted">
          <li>Вчи 10–20 нових слів за раз, а не сотню одразу.</li>
          <li>Повторюй старі слова через день, тиждень і місяць.</li>
          <li>Слухай вимову, бо словацьку важливо не тільки читати.</li>
          <li>Складай прості речення з новими словами.</li>
          <li>Поєднуй слова з темами: дім, робота, магазин, транспорт.</li>
        </ul>

        <p className="theme-text-muted">
          У Flunio слова краще вчити не ізольовано, а через{" "}
          <Link className={textLink} href="/learning/a0-1">
            короткі уроки A0
          </Link>
          ,{" "}
          <Link className={textLink} href="/dictionary">
            словник
          </Link>{" "}
          і{" "}
          <Link className={textLink} href="/practice">
            вправи для повторення
          </Link>
          . Так лексика швидше переходить із пасивної пам’яті в реальне
          використання.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Вчити слова у Flunio →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник →
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Повторювати у вправах →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Типові помилки при вивченні словацьких слів
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            <strong className="theme-text">1. Вчити слова без контексту.</strong>{" "}
            Краще запам’ятати не тільки слово <em>dom</em>, а й просту фразу:{" "}
            <em>Som doma</em> — я вдома.
          </p>

          <p>
            <strong className="theme-text">2. Не слухати вимову.</strong> Деякі
            слова виглядають зрозуміло, але звучать інакше, ніж очікує
            україномовний студент.
          </p>

          <p>
            <strong className="theme-text">3. Плутати схожі слова.</strong> У
            словацькій є слова, які схожі на українські, але можуть мати інше
            значення або вживатися в іншій ситуації.
          </p>

          <p>
            <strong className="theme-text">4. Не повторювати.</strong> Навіть
            прості слова забуваються, якщо не повертатися до них регулярно.
          </p>
        </div>

        <p className="theme-text-muted">
          Якщо хочеш окремо розібрати часті проблеми, відкрий сторінку{" "}
          <Link className={textLink} href="/pomylky-v-slovatskii-movi">
            типові помилки в словацькій мові
          </Link>
          . Вона добре доповнює цю добірку слів.
        </p>

        <div className="pt-2">
          <Link href="/pomylky-v-slovatskii-movi" className={secondaryButton}>
            Типові помилки →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Що вчити після базових слів?
        </h2>

        <p className="theme-text-muted">
          Коли ти вже знаєш перші слова, переходь до коротких фраз і простих
          речень. Наприклад: як представитися, запитати дорогу, купити щось у
          магазині, відповісти на роботі або пояснити базову ситуацію.
        </p>

        <p className="theme-text-muted">
          Далі варто поступово додавати граматику: дієслова, відмінки, порядок
          слів і прості питання. Але граматика краще працює тоді, коли в тебе
          вже є словникова база.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/slovak-for-beginners" className={secondaryBlock}>
            Словацька для початківців →
          </Link>

          <Link href="/slovak-grammar" className={secondaryBlock}>
            Словацька граматика →
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

          <Link href="/learning/a0-1" className={secondaryBlock}>
            Почати з першого уроку →
          </Link>

          <Link href="/practice" className={secondaryBlock}>
            Вправи для повторення →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Слова, граматика й практика мають працювати разом
        </h2>

        <p className="theme-text-muted">
          Список слів — це тільки перший шар. Щоб реально розуміти словацьку,
          потрібно бачити, як слова змінюються у реченнях, як працюють дієслова,
          які закінчення з’являються після прийменників і як будувати прості
          питання.
        </p>

        <p className="theme-text-muted">
          Тому після базової лексики варто перейти до{" "}
          <Link className={textLink} href="/slovak-grammar">
            словацької граматики
          </Link>
          , а потім регулярно повертатися до{" "}
          <Link className={textLink} href="/practice">
            практики
          </Link>
          . Так навчання не розвалюється на окремі списки, а складається в
          систему.
        </p>
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
          Почни вчити словацькі слова у коротких уроках
        </h2>

        <p className="theme-text-muted">
          Якщо список уже зрозумілий, наступний крок — пройти перший урок. Там
          слова одразу закріплюються через озвучку, переклад і вправи, а не
          залишаються просто таблицею.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Почати з A0-1 →
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
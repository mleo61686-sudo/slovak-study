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
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 text-white">
      <Script
        id="faq-schema-slovatski-slova-z-perekladom"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card space-y-4 rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Словацькі слова з перекладом українською
        </h1>

        <p className="text-white/65">
          Якщо ти тільки починаєш вивчати словацьку мову, найкраще почати з
          базових слів для щоденного життя. Саме вони допомагають розуміти прості
          фрази, будувати перші речення і швидше звикати до словацької.
        </p>

        <p className="text-white/65">
          Нижче зібрані словацькі слова з перекладом українською за темами:
          привітання, сім’я, дім, їжа, транспорт, робота, дієслова та
          прикметники. Це хороша база для рівня A0–A1.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/learning/a0-1"
            className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Почати уроки A0 →
          </Link>

          <Link
            href="/dictionary"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Відкрити словник
          </Link>

          <Link
            href="/yak-vyvchyty-slovatsku-movu"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Як вивчити словацьку
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <h2 className="text-lg font-bold">{section.title}</h2>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-left text-white/75">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Словацькою</th>
                    <th className="px-3 py-2 font-semibold">Українською</th>
                  </tr>
                </thead>
                <tbody>
                  {section.words.map(([sk, ua]) => (
                    <tr key={sk} className="border-t border-white/10">
                      <td className="px-3 py-2 font-medium text-white">{sk}</td>
                      <td className="px-3 py-2 text-white/65">{ua}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Як правильно вчити словацькі слова
        </h2>

        <p className="text-white/65">
          Не варто просто читати великий список слів один раз. Так слова швидко
          забуваються. Краще вчити невеликі групи, слухати вимову, повторювати
          уголос і одразу використовувати слова у вправах або простих реченнях.
        </p>

        <ul className="list-disc space-y-2 pl-5 text-white/65">
          <li>Вчи 10–20 нових слів за раз, а не сотню одразу.</li>
          <li>Повторюй старі слова через день, тиждень і місяць.</li>
          <li>Слухай вимову, бо словацьку важливо не тільки читати.</li>
          <li>Складай прості речення з новими словами.</li>
          <li>Поєднуй слова з темами: дім, робота, магазин, транспорт.</li>
        </ul>

        <div className="pt-2">
          <Link
            href="/learning"
            className="inline-flex rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Вчити слова у Flunio →
          </Link>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Типові помилки при вивченні словацьких слів
        </h2>

        <div className="space-y-3 text-white/65">
          <p>
            <strong className="text-white">1. Вчити слова без контексту.</strong>{" "}
            Краще запам’ятати не тільки слово <em>dom</em>, а й просту фразу:{" "}
            <em>Som doma</em> — я вдома.
          </p>

          <p>
            <strong className="text-white">2. Не слухати вимову.</strong> Деякі
            слова виглядають зрозуміло, але звучать інакше, ніж очікує
            україномовний студент.
          </p>

          <p>
            <strong className="text-white">3. Плутати схожі слова.</strong> У
            словацькій є слова, які схожі на українські, але можуть мати інше
            значення або вживатися в іншій ситуації.
          </p>

          <p>
            <strong className="text-white">4. Не повторювати.</strong> Навіть
            прості слова забуваються, якщо не повертатися до них регулярно.
          </p>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">Що вчити після базових слів?</h2>

        <p className="text-white/65">
          Коли ти вже знаєш перші слова, переходь до коротких фраз і простих
          речень. Наприклад: як представитися, запитати дорогу, купити щось у
          магазині, відповісти на роботі або пояснити базову ситуацію.
        </p>

        <p className="text-white/65">
          Далі варто поступово додавати граматику: дієслова, відмінки, порядок
          слів і прості питання. Але граматика краще працює тоді, коли в тебе
          вже є словникова база.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/slovak-grammar"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Словацька граматика →
          </Link>

          <Link
            href="/vyvchennia-slovatskoi-movy-online"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Вивчення словацької онлайн →
          </Link>

          <Link
            href="/slovak-for-ukrainians"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Словацька для українців →
          </Link>

          <Link
            href="/practice"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Вправи для повторення →
          </Link>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <div className="font-semibold">{item.q}</div>
              <div className="mt-2 text-white/65">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
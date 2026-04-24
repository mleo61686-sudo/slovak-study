import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Вивчення польської мови онлайн — курс A0–B2 | Flunio",
  description:
    "Вивчення польської мови онлайн у Flunio: рівні A0–B2, уроки, вправи, словник, граматика та озвучка. Почни з нуля і навчайся системно.",

  alternates: {
    canonical: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
    languages: {
      uk: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
      ru: `${SITE_URL}/ru/vyvchennia-polskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Вивчення польської мови онлайн — курс A0–B2 | Flunio",
    description:
      "Уроки польської A0–B2, словник, граматика, вправи та озвучка — все в одній платформі.",
    url: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Чи можна вивчати польську онлайн з нуля?",
    a: "Так. У Flunio можна почати з рівня A0: короткі уроки, базові слова, озвучка та вправи для закріплення.",
  },
  {
    q: "Скільки часу потрібно займатися щодня?",
    a: "Оптимально 10–20 хвилин на день. Регулярна практика працює краще, ніж рідкі довгі заняття.",
  },
  {
    q: "Що є на платформі крім уроків?",
    a: "Крім уроків, є словник, сторінки граматики, озвучка слів і фраз, а також вправи для тренування та повторення.",
  },
  {
    q: "Чи підходить курс для життя і роботи в Польщі?",
    a: "Так. Платформа допомагає вивчати повсякденну лексику, базову граматику та корисні слова для побуту, навчання, документів і спілкування.",
  },
  {
    q: "Чи зберігається прогрес навчання?",
    a: "Так. Прогрес уроків зберігається, тому ти бачиш, що вже пройдено і що варто повторити.",
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
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10">
      <Script
        id="faq-schema-polish-uk"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Вивчення польської мови онлайн — курс A0–B2
        </h1>

        <p className="text-slate-700">
          Flunio — це онлайн-платформа для системного вивчення польської мови.
          Тут можна проходити уроки по рівнях, закріплювати слова у вправах,
          користуватися словником і паралельно розбирати граматику.
        </p>

        <p className="text-slate-700">
          Платформа підійде тим, хто хоче вивчати польську для життя, роботи,
          навчання або щоденного спілкування в Польщі.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className="rounded-xl bg-black px-4 py-2 text-white">
            Почати навчання
          </Link>

          <Link href="/learning/a0" className="rounded-xl border px-4 py-2">
            Почати з A0 →
          </Link>

          <Link href="/dictionary" className="rounded-xl border px-4 py-2">
            Словник
          </Link>

          <Link href="/grammar" className="rounded-xl border px-4 py-2">
            Граматика
          </Link>

          <Link href="/ru/vyvchennia-polskoi-movy-online" className="rounded-xl border px-4 py-2">
            Русская версия →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">1) Навчання по рівнях</h2>
          <p className="mt-2 text-slate-700">
            Уроки побудовані по рівнях A0–B2, щоб ти рухався поступово і без хаосу.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">2) Вправи після уроків</h2>
          <p className="mt-2 text-slate-700">
            Нові слова не просто читаються, а одразу закріплюються у вправах і повторенні.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">3) Озвучка слів і фраз</h2>
          <p className="mt-2 text-slate-700">
            Слухай вимову та тренуй сприйняття польської мови на слух.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">4) Словник і граматика</h2>
          <p className="mt-2 text-slate-700">
            На платформі є словник з пошуком і сторінки граматики з прикладами та поясненнями.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Як почати вивчати польську онлайн</h2>

        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Почни з рівня A0, якщо вивчаєш польську з нуля.</li>
          <li>Проходь короткі уроки і одразу виконуй вправи.</li>
          <li>Повторюй слова через словник та озвучку.</li>
          <li>Паралельно відкривай граматику, коли хочеш краще зрозуміти тему.</li>
          <li>Рухайся далі до A1, A2, B1 і B2 у своєму темпі.</li>
        </ol>

        <div className="pt-2">
          <Link href="/learning/a0" className="inline-flex rounded-xl bg-black px-4 py-2 text-white">
            Перейти до A0 →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Кому підійде онлайн курс польської</h2>

        <div className="space-y-3 text-slate-700">
          <p>
            Flunio підійде тим, хто хоче вивчати польську в зручному форматі без
            перевантаження. Тут можна займатися короткими сесіями, бачити прогрес
            і повертатися до матеріалу в будь-який момент.
          </p>

          <p>
            Це хороший варіант для тих, хто хоче підтягнути базову лексику,
            зрозуміти граматику і поступово перейти до більш впевненого спілкування
            польською мовою.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-xl border p-4">
              <div className="font-semibold">{item.q}</div>
              <div className="mt-2 text-slate-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
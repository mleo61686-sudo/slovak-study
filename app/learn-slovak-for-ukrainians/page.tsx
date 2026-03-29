import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Словацька мова для українців онлайн (A0–B2) | Flunio",
  description:
    "Вивчення словацької мови для українців онлайн: рівні A0–B2, слова, вправи, граматика та вимова. Почни вчити словацьку з нуля у Flunio.",

  alternates: {
    canonical: `${SITE_URL}/learn-slovak-for-ukrainians`,
  },

  openGraph: {
    title: "Словацька мова для українців онлайн | Flunio",
    description:
      "Онлайн курс словацької для українців: уроки A0–B2, словник, граматика, вправи та озвучка.",
    url: `${SITE_URL}/learn-slovak-for-ukrainians`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Чи можна вивчити словацьку з нуля?",
    a: "Так. У Flunio можна почати з рівня A0 і поступово перейти до A1, A2 і вище.",
  },
  {
    q: "Скільки часу потрібно, щоб вивчити словацьку?",
    a: "Базовий рівень можна отримати за 1–3 місяці при щоденній практиці.",
  },
  {
    q: "Чи підходить курс для роботи у Словаччині?",
    a: "Так. Курс включає лексику для повсякденного життя, роботи та документів.",
  },
  {
    q: "Чи є переклад українською?",
    a: "Так. Усі слова та фрази мають український переклад.",
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
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-10">
      <Script
        id="faq-schema-sk-ua"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Словацька мова для українців онлайн (A0–B2)
        </h1>

        <p className="text-slate-700">
          Flunio — це онлайн платформа, де ти можеш вивчити словацьку мову з нуля.
          Уроки побудовані спеціально для українців: з перекладом, прикладами та
          простою структурою.
        </p>

        <p className="text-slate-700">
          Ти можеш вивчати словацьку для роботи, життя у Словаччині, документів
          або повсякденного спілкування.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="/learning"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            Почати навчання
          </Link>

          <Link href="/dictionary" className="rounded-xl border px-4 py-2">
            Словник
          </Link>

          <Link href="/grammar" className="rounded-xl border px-4 py-2">
            Граматика
          </Link>
        </div>
      </section>

      {/* WHY */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <h2 className="font-bold">1) Переклад українською</h2>
          <p className="mt-2 text-slate-700">
            Кожне слово та фраза мають український переклад для легшого розуміння.
          </p>
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="font-bold">2) Короткі уроки</h2>
          <p className="mt-2 text-slate-700">
            Уроки по 10 слів допомагають не перевантажуватися.
          </p>
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="font-bold">3) Вимова</h2>
          <p className="mt-2 text-slate-700">
            Слухай правильну вимову та тренуй сприйняття.
          </p>
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="font-bold">4) Практика</h2>
          <p className="mt-2 text-slate-700">
            Закріплюй слова через вправи та повторення.
          </p>
        </div>
      </section>

      {/* HOW */}
      <section className="rounded-2xl border p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Як почати вивчати словацьку
        </h2>

        <ol className="list-decimal pl-5 space-y-2 text-slate-700">
          <li>Почни з рівня A0</li>
          <li>Вчи по 10 слів за урок</li>
          <li>Проходь вправи</li>
          <li>Повторюй кожен день</li>
        </ol>

        <Link
          href="/learning"
          className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
        >
          Перейти до курсів →
        </Link>
      </section>

      {/* INTERNAL LINKS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Корисні сторінки
        </h2>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Link href="/learn-slovak" className="underline">
              Словацька мова онлайн
            </Link>
          </li>

          <li>
            <Link href="/grammar" className="underline">
              Граматика словацької
            </Link>
          </li>

          <li>
            <Link href="/dictionary" className="underline">
              Словацький словник
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="rounded-2xl border p-6 space-y-4">
        <h2 className="text-2xl font-bold">FAQ</h2>

        {FAQ.map((item) => (
          <div key={item.q}>
            <div className="font-semibold">{item.q}</div>
            <div className="text-slate-700 mt-1">{item.a}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
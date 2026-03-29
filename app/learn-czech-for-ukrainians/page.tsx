import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Чеська мова для українців онлайн (A0–B2) | Flunio",
  description:
    "Вивчення чеської мови для українців онлайн: рівні A0–B2, слова, вправи, граматика та вимова. Почни вчити чеську з нуля у Flunio.",

  alternates: {
    canonical: `${SITE_URL}/learn-czech-for-ukrainians`,
  },

  openGraph: {
    title: "Чеська мова для українців онлайн | Flunio",
    description:
      "Онлайн курс чеської для українців: уроки A0–B2, словник, граматика, вправи та озвучка.",
    url: `${SITE_URL}/learn-czech-for-ukrainians`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Чи можна вивчити чеську з нуля?",
    a: "Так. У Flunio можна почати з рівня A0 і поступово перейти до A1, A2 і вище.",
  },
  {
    q: "Скільки часу потрібно, щоб вивчити чеську?",
    a: "Базовий рівень можна отримати за 1–3 місяці при щоденній практиці.",
  },
  {
    q: "Чи підходить курс для роботи у Чехії?",
    a: "Так. Курс включає лексику для повсякденного життя, роботи, навчання та документів.",
  },
  {
    q: "Чи є переклад українською?",
    a: "Так. Слова та фрази мають український переклад, тому стартувати значно легше.",
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
        id="faq-schema-cs-ua"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Чеська мова для українців онлайн (A0–B2)
        </h1>

        <p className="text-slate-700">
          Flunio — це онлайн платформа, де ти можеш вивчити чеську мову з нуля.
          Уроки побудовані зручно для українців: з перекладом, прикладами,
          вимовою та простою структурою.
        </p>

        <p className="text-slate-700">
          Ти можеш вивчати чеську для життя в Чехії, роботи, навчання,
          документів або щоденного спілкування.
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

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <h2 className="font-bold">1) Переклад українською</h2>
          <p className="mt-2 text-slate-700">
            Слова і фрази мають український переклад для швидшого старту.
          </p>
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="font-bold">2) Короткі уроки</h2>
          <p className="mt-2 text-slate-700">
            Невеликі уроки допомагають вчитися регулярно без перевантаження.
          </p>
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="font-bold">3) Вимова</h2>
          <p className="mt-2 text-slate-700">
            Слухай озвучку слів і фраз та звикай до звучання чеської мови.
          </p>
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="font-bold">4) Практика</h2>
          <p className="mt-2 text-slate-700">
            Закріплюй нові слова через вправи, повторення та поступовий прогрес.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Як почати вивчати чеську
        </h2>

        <ol className="list-decimal pl-5 space-y-2 text-slate-700">
          <li>Почни з рівня A0.</li>
          <li>Вчи слова маленькими порціями.</li>
          <li>Проходь вправи після уроків.</li>
          <li>Повторюй щодня хоча б 10–20 хвилин.</li>
        </ol>

        <Link
          href="/learning"
          className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
        >
          Перейти до курсів →
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Корисні сторінки
        </h2>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Link href="/learn-czech" className="underline">
              Чеська мова онлайн
            </Link>
          </li>
          <li>
            <Link href="/grammar" className="underline">
              Граматика чеської
            </Link>
          </li>
          <li>
            <Link href="/dictionary" className="underline">
              Чеський словник
            </Link>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border p-6 space-y-4">
        <h2 className="text-2xl font-bold">FAQ</h2>

        {FAQ.map((item) => (
          <div key={item.q}>
            <div className="font-semibold">{item.q}</div>
            <div className="mt-1 text-slate-700">{item.a}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
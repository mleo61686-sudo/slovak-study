import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://slovak-study.com";

export const metadata: Metadata = {
  title: "Словацька мова для українців — безкоштовне навчання A0–B2 | Slovak Study",
  description:
    "Вивчення словацької мови для українців: уроки A0–B2, словник, граматика, вправи та прогрес. Почни з нуля онлайн.",
  alternates: {
    canonical: `${SITE_URL}/slovak-for-ukrainians`,
    languages: {
      uk: `${SITE_URL}/slovak-for-ukrainians`,
      ru: `${SITE_URL}/ru/slovak-for-ukrainians`,
    },
  },
  openGraph: {
    title: "Словацька мова для українців | Slovak Study",
    description:
      "Уроки A0–B2, словник і граматика — вчи словацьку системно, з вправами та прогресом.",
    url: `${SITE_URL}/slovak-for-ukrainians`,
    siteName: "Slovak Study",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Чи можна вчити словацьку мову з нуля?",
    a: "Так. Почни з рівня A0: короткі уроки по 10 слів, озвучка та прості вправи. Далі переходь на A1 та A2.",
  },
  {
    q: "Скільки часу потрібно, щоб заговорити словацькою?",
    a: "Зазвичай базовий рівень A1 досягають за 4–8 тижнів регулярних занять. Важлива щоденна практика 10–20 хвилин.",
  },
  {
    q: "Чим Slovak Study відрізняється від підручників?",
    a: "Тут є інтерактивні вправи, озвучка, прогрес і повторення. Ти вчишся не лише читати, а й одразу тренуєш навички.",
  },
  {
    q: "Де знайти граматику словацької?",
    a: "На сторінці граматики є теми з прикладами та озвучкою.",
  },
  {
    q: "Чи є словник словацької з перекладом українською?",
    a: "Так, у словнику можна шукати слова й слухати вимову.",
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
      {/* ✅ FAQ Schema (JSON-LD) */}
      <Script
        id="faq-schema-uk"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Словацька мова для українців — навчання онлайн (A0–B2)
        </h1>
        <p className="text-slate-700">
          Slovak Study — це тренажер для системного вивчення словацької: короткі уроки,
          озвучка, вправи, словник та граматика. Підійде, якщо ти живеш/плануєш жити у
          Словаччині та хочеш швидко підтягнути мову.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/learning">
            Почати навчання
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/dictionary">
            Відкрити словник
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/grammar">
            Перейти до граматики
          </Link>

          <Link
            className="px-4 py-2 rounded-xl border"
            href="/ru/slovak-for-ukrainians"
            hrefLang="ru"
          >
            Русская версия →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">1) Рівні A0–B2</h2>
          <p className="mt-2 text-slate-700">
            Вчи слова по уроках і одразу закріплюй вправами. Прогрес зберігається.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">2) Озвучка</h2>
          <p className="mt-2 text-slate-700">
            Слухай вимову та тренуй сприйняття на слух у вправах.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">3) Словник</h2>
          <p className="mt-2 text-slate-700">
            Швидкий пошук слів + переклад українською та приклади.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">4) Граматика</h2>
          <p className="mt-2 text-slate-700">
            Пояснення тем з прикладами: від алфавіту до відмінків і дієслів.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Як почати (простий план)</h2>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700">
          <li>Почни з рівня A0 і пройди 5–10 уроків.</li>
          <li>Щодня роби 10–20 хвилин вправ.</li>
          <li>Паралельно відкривай граматику тем, які трапляються в уроках.</li>
          <li>Слухай озвучку слів і повторюй уголос.</li>
        </ol>
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
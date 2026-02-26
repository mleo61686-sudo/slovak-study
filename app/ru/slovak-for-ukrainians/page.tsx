import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://slovak-study.com";

export const metadata: Metadata = {
  title: "Словацкий язык: обучение онлайн A0–B2 | Slovak Study",
  description:
    "Словацкий язык онлайн: уровни A0–B2, словарь, грамматика, упражнения и прогресс. Начни с нуля и учись системно.",

  alternates: {
    canonical: `${SITE_URL}/ru/slovak-for-ukrainians`,
  },

  openGraph: {
    title: "Словацкий язык онлайн (A0–B2) | Slovak Study",
    description:
      "Уроки A0–B2, словарь и грамматика — учи словацкий системно, с упражнениями и прогрессом.",
    url: `${SITE_URL}/ru/slovak-for-ukrainians`,
    siteName: "Slovak Study",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Можно ли выучить словацкий с нуля?",
    a: "Да. Начни с уровня A0: короткие уроки по 10 слов, озвучка и простые упражнения. Дальше переходи на A1 и A2.",
  },
  {
    q: "Сколько времени нужно, чтобы начать говорить?",
    a: "Обычно базовый уровень A1 достигают за 4–8 недель регулярных занятий. Важно заниматься 10–20 минут каждый день.",
  },
  {
    q: "Чем Slovak Study лучше учебников?",
    a: "Здесь есть интерактивные упражнения, озвучка, прогресс и повторение. Ты не только читаешь, но сразу тренируешь навыки.",
  },
  {
    q: "Где найти грамматику словацкого?",
    a: "На странице грамматики есть темы с примерами и озвучкой.",
  },
  {
    q: "Есть ли словацкий словарь с переводом?",
    a: "Да, в словаре можно искать слова и слушать произношение.",
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
        id="faq-schema-ru-slovak-for-ukrainians"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Словацкий язык — обучение онлайн (A0–B2)
        </h1>

        <p className="text-slate-700">
          Slovak Study — тренажёр для системного изучения словацкого: короткие уроки,
          озвучка, упражнения, словарь и грамматика. Подойдёт, если ты живёшь/планируешь
          жить в Словакии и хочешь быстро подтянуть язык.
        </p>

        {/* ✅ SEO internal link (RU) */}
        <p className="text-slate-700">
          Подробное описание формата обучения смотри на странице{" "}
          <Link href="/ru/vyvchennia-slovatskoi-movy-online" className="underline">
            «Изучение словацкого языка онлайн»
          </Link>
          .
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/learning">
            Начать обучение
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/dictionary">
            Открыть словарь
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/grammar">
            Перейти к грамматике
          </Link>

          <Link className="px-4 py-2 rounded-xl border" href="/slovak-for-ukrainians">
            Українська версія →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">1) Уровни A0–B2</h2>
          <p className="mt-2 text-slate-700">
            Учи слова по урокам и сразу закрепляй упражнениями. Прогресс сохраняется.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">2) Озвучка</h2>
          <p className="mt-2 text-slate-700">
            Слушай произношение и тренируй восприятие на слух.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">3) Словарь</h2>
          <p className="mt-2 text-slate-700">
            Быстрый поиск слов + перевод и примеры.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">4) Грамматика</h2>
          <p className="mt-2 text-slate-700">
            Объяснения тем с примерами: от алфавита до падежей и глаголов.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Как начать (простой план)</h2>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700">
          <li>Начни с уровня A0 и пройди 5–10 уроков.</li>
          <li>Каждый день делай 10–20 минут упражнений.</li>
          <li>Параллельно открывай грамматику тем, которые встречаются в уроках.</li>
          <li>Слушай озвучку и повторяй вслух.</li>
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
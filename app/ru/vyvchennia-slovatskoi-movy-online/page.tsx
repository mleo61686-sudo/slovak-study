import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://slovak-study.com";

export const metadata: Metadata = {
  title:
    "Изучение словацкого языка онлайн — курс A0–B2, упражнения, словарь | Slovak Study",
  description:
    "Изучение словацкого языка онлайн для украинцев: уровни A0–B2, упражнения, озвучка, словарь и грамматика. Начни с нуля и отслеживай прогресс.",
  alternates: {
    canonical: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    languages: {
      uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
      ru: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    },
  },
  openGraph: {
    title: "Изучение словацкого языка онлайн | Slovak Study",
    description:
      "Онлайн-курс словацкого: A0–B2, упражнения, словарь, грамматика и прогресс. Начни обучение с нуля.",
    url: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    siteName: "Slovak Study",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Подходит ли Slovak Study для обучения онлайн с нуля?",
    a: "Да. Начни с A0: короткие уроки по 10 слов, озвучка и упражнения. Дальше — A1 и A2 с постепенным усложнением.",
  },
  {
    q: "Сколько времени нужно заниматься каждый день?",
    a: "Достаточно 10–20 минут в день. Главное — регулярность: слова + короткие упражнения + повторение.",
  },
  {
    q: "Есть ли здесь словарь и грамматика?",
    a: "Да. Есть словарь с поиском и озвучкой, а также грамматика с примерами, чтобы закрывать пробелы по ходу обучения.",
  },
  {
    q: "Сохраняется ли прогресс?",
    a: "Да. Прогресс уроков сохраняется, чтобы ты видел, что уже прошёл и что повторить.",
  },
  {
    q: "Чем онлайн-формат лучше учебника?",
    a: "Ты сразу тренируешься: выбор ответа, ввод слова, аудио-упражнения, пары и составление предложений — это быстрее даёт результат.",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-10">
      <Script
        id="faq-schema-ru-online"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Изучение словацкого языка онлайн — курс A0–B2
        </h1>
        <p className="text-slate-700">
          Slovak Study — онлайн-тренажёр для украинцев: короткие уроки, озвучка,
          упражнения, словарь и грамматика. Подойдёт для жизни и работы в
          Словакии: учишься системно и видишь прогресс.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/learning">
            Начать обучение
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/learning/a0">
            Старт с A0 →
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/dictionary">
            Словарь
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/grammar">
            Грамматика
          </Link>

          <Link
            className="px-4 py-2 rounded-xl border"
            href="/vyvchennia-slovatskoi-movy-online"
            hrefLang="uk"
          >
            Українська версія →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">1) Обучение по уровням</h2>
          <p className="mt-2 text-slate-700">
            Уровни A0–B2: уроки по 10 слов + упражнения. Легко держать темп и не выгореть.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">2) Практика, а не только чтение</h2>
          <p className="mt-2 text-slate-700">
            Выбор ответа, ввод слова, аудио-упражнения, пары и составление предложений.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">3) Озвучка</h2>
          <p className="mt-2 text-slate-700">
            Слушай произношение слов и фраз — это сильно прокачивает “на слух”.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">4) Словарь + грамматика</h2>
          <p className="mt-2 text-slate-700">
            Параллельно закрываешь грамматику и расширяешь словарный запас.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Как начать учиться онлайн (план на 7 дней)</h2>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700">
          <li>День 1: стартуй с A0 и пройди 2 урока.</li>
          <li>День 2–3: ещё 2–4 урока + упражнения.</li>
          <li>День 4: открой грамматику (алфавит/произношение) и повтори слова.</li>
          <li>День 5–6: продолжай A0 + слушай озвучку и повторяй вслух.</li>
          <li>День 7: закрепи — пройди упражнения по предыдущим урокам.</li>
        </ol>
        <div className="pt-2">
          <Link
            className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
            href="/learning/levels/a0"
          >
            Почати з A0 →
          </Link>
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
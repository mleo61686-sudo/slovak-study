import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Изучение словацкого языка онлайн — курс A0–B2 | Flunio",
  description:
    "Онлайн курс словацкого языка во Flunio: уровни A0–B2, уроки, упражнения, словарь, грамматика и озвучка. Начни учить словацкий системно и удобно.",

  alternates: {
    canonical: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    languages: {
      uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
      ru: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Изучение словацкого языка онлайн — курс A0–B2 | Flunio",
    description:
      "Уроки словацкого A0–B2, словарь, грамматика, упражнения и озвучка — всё в одной платформе.",
    url: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Можно ли изучать словацкий онлайн с нуля?",
    a: "Да. Во Flunio можно начать с уровня A0: короткие уроки, озвучка, базовые слова и упражнения для закрепления материала.",
  },
  {
    q: "Сколько времени нужно заниматься каждый день?",
    a: "Оптимально 10–20 минут в день. Лучший результат даёт регулярная практика: уроки, повторение и работа со словарём.",
  },
  {
    q: "Что есть на платформе, кроме уроков?",
    a: "Кроме уроков, во Flunio есть словарь, страницы грамматики, озвучка слов и фраз, а также упражнения для повторения и тренировки.",
  },
  {
    q: "Подходит ли Flunio для жизни и работы в Словакии?",
    a: "Да. Платформа помогает изучать повседневную лексику, базовую грамматику и полезные слова для быта, документов, работы и общения.",
  },
  {
    q: "Сохраняется ли прогресс обучения?",
    a: "Да. Прогресс уроков сохраняется, поэтому ты всегда видишь, что уже пройдено и что стоит повторить.",
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
        id="faq-schema-ru-online"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Изучение словацкого языка онлайн — курс A0–B2
        </h1>

        <p className="text-slate-700">
          Flunio — это онлайн-платформа для системного изучения словацкого
          языка. Здесь можно проходить уроки по уровням, закреплять слова в
          упражнениях, пользоваться словарём и параллельно закрывать грамматику.
        </p>

        <p className="text-slate-700">
          Платформа подойдёт тем, кто хочет учить словацкий для жизни, работы,
          документов, учёбы или повседневного общения в Словакии.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            className="rounded-xl bg-black px-4 py-2 text-white"
            href="/learning"
          >
            Начать обучение
          </Link>

          <Link className="rounded-xl border px-4 py-2" href="/learning">
            Все курсы и уровни →
          </Link>

          <Link className="rounded-xl border px-4 py-2" href="/dictionary">
            Словарь
          </Link>

          <Link className="rounded-xl border px-4 py-2" href="/grammar">
            Грамматика
          </Link>

          <Link
            className="rounded-xl border px-4 py-2"
            href="/vyvchennia-slovatskoi-movy-online"
          >
            Українська версія →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">1) Обучение по уровням</h2>
          <p className="mt-2 text-slate-700">
            Уроки построены по уровням A0–B2, чтобы ты двигался постепенно и без
            хаоса.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">2) Упражнения после уроков</h2>
          <p className="mt-2 text-slate-700">
            Новые слова не просто читаются, а сразу закрепляются в упражнениях и
            повторении.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">3) Озвучка слов и фраз</h2>
          <p className="mt-2 text-slate-700">
            Слушай произношение и тренируй восприятие словацкого языка на слух.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">4) Словарь и грамматика</h2>
          <p className="mt-2 text-slate-700">
            На платформе есть словарь с поиском и страницы грамматики с
            примерами и объяснениями.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Как начать изучать словацкий онлайн
        </h2>

        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Начни с уровня A0, если учишь словацкий с нуля.</li>
          <li>Проходи короткие уроки и сразу выполняй упражнения.</li>
          <li>Повторяй слова через словарь и озвучку.</li>
          <li>Параллельно открывай грамматику, когда хочешь лучше понять тему.</li>
          <li>Двигайся дальше к A1, A2, B1 и B2 в своём темпе.</li>
        </ol>

        <div className="pt-2">
          <Link
            className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
            href="/learning"
          >
            Перейти к курсам →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Кому подойдёт онлайн курс словацкого
        </h2>

        <div className="space-y-3 text-slate-700">
          <p>
            Flunio подойдёт тем, кто хочет изучать словацкий язык в удобном
            формате без перегруза. Здесь можно заниматься короткими сессиями,
            видеть прогресс и возвращаться к материалу в любой момент.
          </p>

          <p>
            Если тебе нужен отдельный акцент на словацком языке и обучении с
            нуля, посмотри также страницу{" "}
            <Link href="/learn-slovak" className="underline">
              Learn Slovak
            </Link>
            .
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
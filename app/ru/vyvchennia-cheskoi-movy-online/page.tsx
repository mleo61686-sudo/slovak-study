import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Изучение чешского языка онлайн — курс A0–B2 | Flunio",
  description:
    "Онлайн курс чешского языка во Flunio: уровни A0–B2, уроки, упражнения, словарь, грамматика и озвучка. Начни изучать чешский системно и удобно.",

  alternates: {
    canonical: `${SITE_URL}/ru/vyvchennia-cheskoi-movy-online`,
    languages: {
      uk: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
      ru: `${SITE_URL}/ru/vyvchennia-cheskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Изучение чешского языка онлайн — курс A0–B2 | Flunio",
    description:
      "Уроки чешского A0–B2, словарь, грамматика, упражнения и озвучка — всё в одной платформе.",
    url: `${SITE_URL}/ru/vyvchennia-cheskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Можно ли изучать чешский онлайн с нуля?",
    a: "Да. Во Flunio можно начать с уровня A0: короткие уроки, базовые слова, озвучка и упражнения для закрепления.",
  },
  {
    q: "Сколько времени нужно заниматься каждый день?",
    a: "Оптимально 10–20 минут в день. Лучший результат даёт регулярная практика без больших перерывов.",
  },
  {
    q: "Что есть на платформе, кроме уроков?",
    a: "Кроме уроков, есть словарь, страницы грамматики, озвучка слов и фраз, а также упражнения для тренировки и повторения.",
  },
  {
    q: "Подходит ли этот курс для жизни и работы в Чехии?",
    a: "Да. Платформа помогает изучать повседневную лексику, базовую грамматику и полезные слова для быта, учёбы, документов и общения.",
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
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10">
      <Script
        id="faq-schema-czech-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Изучение чешского языка онлайн — курс A0–B2
        </h1>

        <p className="text-slate-700">
          Flunio — это онлайн-платформа для системного изучения чешского языка.
          Здесь можно проходить уроки по уровням, закреплять слова в
          упражнениях, пользоваться словарём и параллельно закрывать грамматику.
        </p>

        <p className="text-slate-700">
          Платформа подойдёт тем, кто хочет учить чешский для жизни, работы,
          учёбы или повседневного общения в Чехии.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/learning"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            Начать обучение
          </Link>

          <Link href="/learning" className="rounded-xl border px-4 py-2">
            Все курсы и уровни →
          </Link>

          <Link href="/dictionary" className="rounded-xl border px-4 py-2">
            Словарь
          </Link>

          <Link href="/grammar" className="rounded-xl border px-4 py-2">
            Грамматика
          </Link>

          <Link
            href="/vyvchennia-cheskoi-movy-online"
            className="rounded-xl border px-4 py-2"
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
            Слушай произношение и тренируй восприятие чешского языка на слух.
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
        <h2 className="text-2xl font-bold">Как начать изучать чешский онлайн</h2>

        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Начни с уровня A0, если учишь чешский с нуля.</li>
          <li>Проходи короткие уроки и сразу выполняй упражнения.</li>
          <li>Повторяй слова через словарь и озвучку.</li>
          <li>Параллельно открывай грамматику, когда хочешь лучше понять тему.</li>
          <li>Двигайся дальше к A1, A2, B1 и B2 в своём темпе.</li>
        </ol>

        <div className="pt-2">
          <Link
            href="/learning"
            className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
          >
            Перейти к курсам →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Кому подойдёт онлайн курс чешского</h2>

        <div className="space-y-3 text-slate-700">
          <p>
            Flunio подойдёт тем, кто хочет изучать чешский в удобном формате без
            перегруза. Здесь можно заниматься короткими сессиями, видеть прогресс
            и возвращаться к материалу в любой момент.
          </p>

          <p>
            Это хороший вариант для тех, кто хочет подтянуть базовую лексику,
            понять грамматику и постепенно перейти к более уверенному общению на
            чешском языке.
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
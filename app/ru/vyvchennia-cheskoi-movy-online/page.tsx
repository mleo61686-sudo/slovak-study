import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Изучение чешского языка онлайн с нуля A0–B2 | Flunio",
  description:
    "Изучай чешский язык онлайн во Flunio: короткие уроки A0–B2, словарь, грамматика, упражнения, озвучка и прогресс для ежедневного обучения.",

  alternates: {
    canonical: `${SITE_URL}/ru/vyvchennia-cheskoi-movy-online`,
    languages: {
      uk: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
      ru: `${SITE_URL}/ru/vyvchennia-cheskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Изучение чешского языка онлайн с нуля A0–B2 | Flunio",
    description:
      "Чешский язык онлайн: уроки, словарь, грамматика, упражнения, озвучка и прогресс в одном месте.",
    url: `${SITE_URL}/ru/vyvchennia-cheskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Можно ли изучать чешский онлайн с нуля?",
    a: "Да. Во Flunio можно начать с уровня A0: базовые слова, короткие уроки, озвучка, упражнения и постепенный переход к A1, A2, B1 и B2.",
  },
  {
    q: "Сколько времени нужно заниматься каждый день?",
    a: "Оптимально 10–20 минут в день. Регулярные короткие занятия обычно работают лучше, чем длинные, но редкие сессии.",
  },
  {
    q: "Что входит в обучение?",
    a: "На платформе есть уроки по уровням, словарь, грамматика с примерами, озвучка слов и фраз, а также упражнения для повторения.",
  },
  {
    q: "Подходит ли Flunio для жизни или работы в Чехии?",
    a: "Да. Курс помогает изучать практическую лексику для быта, работы, учёбы, документов, транспорта и ежедневного общения.",
  },
  {
    q: "Сохраняется ли прогресс?",
    a: "Да, прогресс уроков сохраняется, чтобы ты видел пройденные темы и мог возвращаться к повторению.",
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
          Изучение чешского языка онлайн — курс с нуля до B2
        </h1>

        <p className="text-slate-700">
          Flunio помогает изучать чешский язык онлайн системно и без хаоса.
          Вместо случайных списков слов, видео и сложных грамматических
          объяснений ты можешь проходить короткие уроки, слушать произношение,
          выполнять упражнения и постепенно строить словарный запас.
        </p>

        <p className="text-slate-700">
          Курс подходит для тех, кто начинает с нуля, хочет улучшить повседневное
          общение или изучает чешский для жизни, работы, учёбы или документов в
          Чехии. Начни с A0 и двигайся дальше к A1, A2, B1 и B2 в своём темпе.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/learning"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            Начать обучение
          </Link>

          <Link href="/learning/a0-1" className="rounded-xl border px-4 py-2">
            Начать с A0 →
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
          <h2 className="text-lg font-bold">1) Уроки чешского по уровням</h2>
          <p className="mt-2 text-slate-700">
            Материал организован от A0 до B2, чтобы ты всегда понимал, что учить
            дальше. Это помогает двигаться последовательно, а не прыгать между
            случайными темами.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">2) Короткая ежедневная практика</h2>
          <p className="mt-2 text-slate-700">
            Уроки короткие, поэтому их легко проходить каждый день. 10–20 минут
            в день достаточно, чтобы постепенно накапливать словарный запас и не
            выгорать.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">3) Озвучка слов и фраз</h2>
          <p className="mt-2 text-slate-700">
            Чешский важно не только читать, но и слышать. Озвучка помогает
            привыкать к произношению, повторять слова вслух и лучше воспринимать
            язык на слух.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">4) Словарь и грамматика вместе</h2>
          <p className="mt-2 text-slate-700">
            Во Flunio есть уроки, словарь, грамматические темы и упражнения. Это
            позволяет не просто запоминать слова, а понимать, как использовать
            их в предложениях.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Как начать изучать чешский язык онлайн
        </h2>

        <p className="text-slate-700">
          Если ты начинаешь с нуля, не стоит сразу пытаться выучить всю
          грамматику. Сначала лучше создать базу: самые частые слова, простые
          фразы, произношение и базовые конструкции. Когда в памяти уже есть
          примеры, грамматика воспринимается намного легче.
        </p>

        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Начни с A0, если изучаешь чешский с нуля.</li>
          <li>Проходи небольшие уроки с полезными словами.</li>
          <li>Слушай озвучку и повторяй слова вслух.</li>
          <li>Делай упражнения сразу после урока.</li>
          <li>Пользуйся словарём для поиска и повторения.</li>
          <li>Открывай грамматику, когда нужно понять правило.</li>
          <li>Переходи к A1, A2, B1 и B2 постепенно, без спешки.</li>
        </ol>

        <div className="pt-2">
          <Link
            href="/learning/a0-1"
            className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
          >
            Перейти к A0 →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Что самое сложное в чешском для начинающих?
        </h2>

        <p className="text-slate-700">
          Чешский язык имеет много общего с другими славянскими языками, но всё
          равно требует системного подхода. Чаще всего сложность вызывают падежи,
          окончания слов, формы глаголов и произношение отдельных звуков. Это
          нормально: такие вещи лучше усваиваются постепенно, через примеры и
          регулярное повторение.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Произношение</h3>
            <p className="mt-2 text-sm text-slate-700">
              В чешском есть характерные звуки и буквы ř, č, š, ž, ě. Озвучка
              помогает быстрее привыкнуть к произношению.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Падежи</h3>
            <p className="mt-2 text-sm text-slate-700">
              Существительные и прилагательные меняются в зависимости от роли в
              предложении. Это легче понять через готовые примеры.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Глаголы</h3>
            <p className="mt-2 text-sm text-slate-700">
              Глаголы меняются по лицам, времени и значению. Начинать лучше с
              самых частых глаголов в настоящем времени.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Чешская лексика для реальных ситуаций
        </h2>

        <p className="text-slate-700">
          Хорошее обучение чешскому должно давать не только отдельные слова, но
          и лексику для реальной жизни: знакомство, покупки, транспорт, жильё,
          работа, учёба, документы и ежедневное общение.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Повседневный чешский</h3>
            <p className="mt-2 text-slate-700">
              Учи слова и фразы для приветствий, еды, семьи, покупок, жилья,
              транспорта и повседневных разговоров.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Чешский для работы и учёбы</h3>
            <p className="mt-2 text-slate-700">
              Постепенно добавляй слова для инструкций, графиков, документов,
              коммуникации, учёбы и рабочих ситуаций.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Грамматика должна помогать, а не блокировать обучение
        </h2>

        <p className="text-slate-700">
          Грамматика важна, но её лучше изучать тогда, когда она объясняет уже
          знакомые примеры. Сначала можно накапливать слова и фразы, а потом
          открывать грамматические темы, чтобы понять, почему предложение
          построено именно так.
        </p>

        <p className="text-slate-700">
          Такой подход особенно полезен для чешского, потому что падежи, глаголы
          и окончания легче усваиваются не как сухая теория, а через контекст и
          повторение.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/grammar" className="rounded-xl border px-4 py-2">
            Открыть грамматику
          </Link>

          <Link href="/dictionary" className="rounded-xl border px-4 py-2">
            Открыть словарь
          </Link>

          <Link href="/practice" className="rounded-xl border px-4 py-2">
            Перейти к упражнениям
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Кому подойдёт обучение чешскому во Flunio
        </h2>

        <div className="space-y-3 text-slate-700">
          <p>
            Flunio подойдёт тем, кто хочет изучать чешский онлайн в простом,
            структурированном и практичном формате. Это хороший вариант, если ты
            начинаешь с нуля, возвращаешься к языку после перерыва или хочешь
            создать стабильную привычку ежедневного обучения.
          </p>

          <p>
            Курс также полезен, если чешский нужен для повседневной жизни,
            работы, учёбы, документов, путешествий или базового общения. Можно
            двигаться в своём темпе и возвращаться к предыдущим урокам для
            повторения.
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
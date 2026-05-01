import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Изучение словацкого языка онлайн с нуля A0–B2 | Flunio",
  description:
    "Изучай словацкий язык онлайн во Flunio: короткие уроки A0–B2, словарь, грамматика, упражнения, озвучка и прогресс для ежедневного обучения.",

  alternates: {
    canonical: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    languages: {
      uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
      ru: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Изучение словацкого языка онлайн с нуля A0–B2 | Flunio",
    description:
      "Словацкий язык онлайн: уроки, словарь, грамматика, упражнения, озвучка и прогресс в одном месте.",
    url: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Можно ли изучать словацкий онлайн с нуля?",
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
    q: "Подходит ли Flunio для жизни или работы в Словакии?",
    a: "Да. Курс помогает изучать практическую лексику для быта, работы, учёбы, документов, транспорта и ежедневного общения.",
  },
  {
    q: "Сохраняется ли прогресс?",
    a: "Да, прогресс уроков сохраняется, чтобы ты видел пройденные темы и мог возвращаться к повторению.",
  },
];

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";
const primaryButton =
  "theme-primary-button inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const secondaryButton =
  "theme-secondary-button inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";

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
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-ru-online"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Изучение словацкого языка онлайн — курс с нуля до B2
        </h1>

        <p className="theme-text-muted">
          Flunio помогает изучать словацкий язык онлайн системно и без хаоса.
          Вместо случайных списков слов, видео и сложных грамматических
          объяснений ты можешь проходить короткие уроки, слушать произношение,
          выполнять упражнения и постепенно строить словарный запас.
        </p>

        <p className="theme-text-muted">
          Курс подходит для тех, кто начинает с нуля, хочет улучшить повседневное
          общение или изучает словацкий для жизни, работы, учёбы или документов
          в Словакии. Начни с A0 и двигайся дальше к A1, A2, B1 и B2 в своём
          темпе.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className={primaryButton} href="/learning">
            Начать обучение
          </Link>

          <Link className={secondaryButton} href="/learning/a0-1">
            Начать с A0 →
          </Link>

          <Link className={secondaryButton} href="/dictionary">
            Словарь
          </Link>

          <Link className={secondaryButton} href="/grammar">
            Грамматика
          </Link>

          <Link className={secondaryButton} href="/vyvchennia-slovatskoi-movy-online">
            Українська версія →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            1) Уроки словацкого по уровням
          </h2>
          <p className="mt-2 theme-text-muted">
            Материал организован от A0 до B2, чтобы ты всегда понимал, что учить
            дальше. Это помогает двигаться последовательно, а не прыгать между
            случайными темами.
          </p>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            2) Короткая ежедневная практика
          </h2>
          <p className="mt-2 theme-text-muted">
            Уроки короткие, поэтому их легко проходить каждый день. 10–20 минут
            в день достаточно, чтобы постепенно накапливать словарный запас и не
            выгорать.
          </p>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            3) Озвучка слов и фраз
          </h2>
          <p className="mt-2 theme-text-muted">
            Словацкий важно не только читать, но и слышать. Озвучка помогает
            привыкать к произношению, повторять слова вслух и лучше воспринимать
            язык на слух.
          </p>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            4) Словарь и грамматика вместе
          </h2>
          <p className="mt-2 theme-text-muted">
            Во Flunio есть уроки, словарь, грамматические темы и упражнения. Это
            позволяет не просто запоминать слова, а понимать, как использовать
            их в предложениях.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Как начать изучать словацкий язык онлайн
        </h2>

        <p className="theme-text-muted">
          Если ты начинаешь с нуля, не стоит сразу пытаться выучить всю
          грамматику. Сначала лучше создать базу: самые частые слова, простые
          фразы, произношение и базовые конструкции. Когда в памяти уже есть
          примеры, грамматика воспринимается намного легче.
        </p>

        <ol className="list-decimal space-y-2 pl-5 theme-text-muted">
          <li>Начни с A0, если изучаешь словацкий с нуля.</li>
          <li>Проходи небольшие уроки с полезными словами.</li>
          <li>Слушай озвучку и повторяй слова вслух.</li>
          <li>Делай упражнения сразу после урока.</li>
          <li>Пользуйся словарём для поиска и повторения.</li>
          <li>Открывай грамматику, когда нужно понять правило.</li>
          <li>Переходи к A1, A2, B1 и B2 постепенно, без спешки.</li>
        </ol>

        <div className="pt-2">
          <Link className={primaryButton} href="/learning/a0-1">
            Перейти к A0 →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Что самое сложное в словацком для начинающих?
        </h2>

        <p className="theme-text-muted">
          Словацкий язык имеет много общего с другими славянскими языками, но всё
          равно требует системного подхода. Чаще всего сложность вызывают
          падежи, окончания слов, формы глаголов и произношение отдельных
          звуков. Это нормально: такие вещи лучше усваиваются постепенно, через
          примеры и регулярное повторение.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Произношение</h3>
            <p className="mt-2 text-sm theme-text-muted">
              В словацком есть долгие гласные, мягкие звуки и буквы č, š, ž, ľ,
              ô. Озвучка помогает быстрее привыкнуть к произношению.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Падежи</h3>
            <p className="mt-2 text-sm theme-text-muted">
              Существительные и прилагательные меняются в зависимости от роли в
              предложении. Это легче понять через готовые примеры.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Глаголы</h3>
            <p className="mt-2 text-sm theme-text-muted">
              Глаголы меняются по лицам, времени и значению. Начинать лучше с
              самых частых глаголов в настоящем времени.
            </p>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Словацкая лексика для реальных ситуаций
        </h2>

        <p className="theme-text-muted">
          Хорошее обучение словацкому должно давать не только отдельные слова,
          но и лексику для реальной жизни: знакомство, покупки, транспорт, жильё,
          работа, учёба, документы и ежедневное общение.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Повседневный словацкий</h3>
            <p className="mt-2 theme-text-muted">
              Учи слова и фразы для приветствий, еды, семьи, покупок, жилья,
              транспорта и повседневных разговоров.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">
              Словацкий для работы и учёбы
            </h3>
            <p className="mt-2 theme-text-muted">
              Постепенно добавляй слова для инструкций, графиков, документов,
              коммуникации, учёбы и рабочих ситуаций.
            </p>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Грамматика должна помогать, а не блокировать обучение
        </h2>

        <p className="theme-text-muted">
          Грамматика важна, но её лучше изучать тогда, когда она объясняет уже
          знакомые примеры. Сначала можно накапливать слова и фразы, а потом
          открывать грамматические темы, чтобы понять, почему предложение
          построено именно так.
        </p>

        <p className="theme-text-muted">
          Такой подход особенно полезен для словацкого, потому что падежи,
          глаголы и окончания легче усваиваются не как сухая теория, а через
          контекст и повторение.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/grammar" className={secondaryButton}>
            Открыть грамматику
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Открыть словарь
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Перейти к упражнениям
          </Link>

          <Link href="/ru/slovak-for-ukrainians" className={secondaryButton}>
            Словацкий для жизни в Словакии →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Кому подойдёт обучение словацкому во Flunio
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            Flunio подойдёт тем, кто хочет изучать словацкий онлайн в простом,
            структурированном и практичном формате. Это хороший вариант, если ты
            начинаешь с нуля, возвращаешься к языку после перерыва или хочешь
            создать стабильную привычку ежедневного обучения.
          </p>

          <p>
            Курс также полезен, если словацкий нужен для повседневной жизни,
            работы, учёбы, документов, путешествий или базового общения. Можно
            двигаться в своём темпе и возвращаться к предыдущим урокам для
            повторения.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className={`${softCard} p-4`}>
              <div className="font-semibold theme-text">{item.q}</div>
              <div className="mt-2 theme-text-muted">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
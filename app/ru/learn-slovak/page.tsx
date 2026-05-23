import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Учить словацкий язык онлайн с нуля до B2 | Flunio",
  description:
    "Учите словацкий язык онлайн с нуля: уроки A0–B2, слова с переводом, грамматика, аудио произношение и упражнения для ежедневной практики.",

  alternates: {
    canonical: `${SITE_URL}/ru/learn-slovak`,
    languages: {
      en: `${SITE_URL}/learn-slovak`,
      ru: `${SITE_URL}/ru/learn-slovak`,
      uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Учить словацкий язык онлайн с нуля до B2 | Flunio",
    description:
      "Изучайте словацкий язык пошагово: короткие уроки, словарь, грамматика, аудио и упражнения.",
    url: `${SITE_URL}/ru/learn-slovak`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Можно ли выучить словацкий язык онлайн с нуля?",
    a: "Да. Flunio подходит для начинающих: можно начать с уровня A0, учить базовые слова, слушать произношение и постепенно переходить к более сложным темам.",
  },
  {
    q: "Сколько времени нужно заниматься словацким каждый день?",
    a: "Для стабильного прогресса достаточно 10–20 минут в день. Короткая ежедневная практика обычно работает лучше, чем редкие длинные занятия.",
  },
  {
    q: "Что входит в курс словацкого языка?",
    a: "Курс включает структурированные уроки, словарь, грамматические темы, аудио произношение и упражнения для повторения слов и фраз.",
  },
  {
    q: "Сложно ли учить словацкий язык?",
    a: "Словацкий может казаться сложным из-за падежей, окончаний, форм глаголов и произношения. Но если учить язык постепенно, с примерами и практикой, он становится намного понятнее.",
  },
  {
    q: "Подходит ли курс для жизни и работы в Словакии?",
    a: "Да. Flunio помогает учить практические слова и темы, которые нужны для повседневной жизни, работы, учебы, документов, транспорта и общения в Словакии.",
  },
];

const card = "flunio-card rounded-3xl";

const softCard = "theme-home-soft-card rounded-2xl";

const primaryButton =
  "theme-primary-button rounded-xl px-4 py-2 font-semibold";

const secondaryButton =
  "theme-secondary-button rounded-xl px-4 py-2 font-semibold";

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
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10 theme-text">
      <Script
        id="faq-schema-slovak-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-4">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Словацкий курс
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Учить словацкий язык онлайн — структурированный курс от A0 до B2
          </h1>

          <p className="theme-text-muted">
            Flunio помогает учить словацкий язык онлайн спокойно и по порядку.
            Вместо случайных списков слов, видео и отдельных объяснений вы
            проходите короткие уроки, учите полезную лексику, слушаете
            произношение и постепенно строите базу словацкого языка.
          </p>

          <p className="theme-text-muted">
            Курс подходит тем, кто начинает словацкий с нуля, хочет лучше
            понимать повседневную речь или готовится к жизни, работе, учебе и
            общению в Словакии.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning" className={primaryButton}>
              Начать учить словацкий
            </Link>

            {[
              ["Начать с A0 →", "/learning/a0-1"],
              ["Словацкий словарь", "/dictionary"],
              ["Грамматика", "/grammar"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className={secondaryButton}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {[
          [
            "1) Уроки словацкого по уровням",
            "Уроки идут от A0 до B2, поэтому вы понимаете, что учить сейчас и что будет дальше. Это помогает не прыгать хаотично между темами.",
          ],
          [
            "2) Короткая ежедневная практика",
            "Каждый урок можно проходить небольшими шагами. Достаточно 10–20 минут в день, чтобы учить слова и сразу закреплять их в упражнениях.",
          ],
          [
            "3) Аудио произношение",
            "Словацкое произношение легче запоминать, когда вы регулярно слышите слова. Аудио помогает привыкнуть к звукам и улучшить понимание на слух.",
          ],
          [
            "4) Слова и грамматика вместе",
            "Flunio объединяет лексику, грамматику, словарь и упражнения, чтобы вы не просто запоминали слова, а понимали, как использовать их в предложениях.",
          ],
        ].map(([title, text]) => (
          <div key={title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-accent-text">{title}</h2>
            <p className="mt-2 theme-text-muted">{text}</p>
          </div>
        ))}
      </section>

      {[
        {
          title: "Как начать учить словацкий язык онлайн",
          body: (
            <>
              <p>
                Если вы начинаете с нуля, не стоит сразу перегружать себя
                сложной грамматикой. Сначала лучше построить основу: частые
                слова, простые фразы, произношение и базовые модели предложений.
              </p>

              <ol className="list-decimal space-y-2 pl-5">
                <li>Начните с уровня A0, если вы учите словацкий с нуля.</li>
                <li>Проходите небольшую группу полезных слов в каждом уроке.</li>
                <li>Слушайте аудио и повторяйте слова вслух.</li>
                <li>Делайте упражнения сразу после урока.</li>
                <li>Используйте словарь, когда нужно найти или повторить слово.</li>
                <li>Открывайте грамматику, когда нужна понятная подсказка.</li>
                <li>Переходите к A1, A2, B1 и B2 постепенно.</li>
              </ol>

              <Link href="/learning/a0-1" className={primaryButton}>
                Перейти к урокам A0 →
              </Link>
            </>
          ),
        },
        {
          title: "Словацкие слова для реальных ситуаций",
          body: (
            <p>
              Хороший курс словацкого языка должен учить не только отдельные
              слова. Важно знать лексику для реальных ситуаций: знакомство,
              покупки, транспорт, работа, документы, учеба и ежедневное общение.
            </p>
          ),
        },
        {
          title: "Грамматика тогда, когда она действительно нужна",
          body: (
            <>
              <p>
                Грамматика важна, но она не должна останавливать обучение. Во
                Flunio можно сначала учить полезные слова и фразы, а затем
                открывать грамматические темы, когда появляется конкретный
                вопрос.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  ["Открыть грамматику", "/grammar"],
                  ["Искать слова", "/dictionary"],
                  ["Практика", "/practice"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className={secondaryButton}>
                    {label}
                  </Link>
                ))}
              </div>
            </>
          ),
        },
        {
          title: "Кому подойдет этот курс словацкого",
          body: (
            <>
              <p>
                Flunio подойдет тем, кто хочет учить словацкий язык онлайн
                просто, структурированно и без хаоса.
              </p>
              <p>
                Курс особенно полезен, если словацкий нужен для жизни в
                Словакии, работы, учебы, документов, поездок или общения с
                людьми.
              </p>
            </>
          ),
        },
      ].map((section) => (
        <section key={section.title} className={`${card} space-y-4 p-6`}>
          <h2 className="text-2xl font-bold theme-text">{section.title}</h2>
          <div className="space-y-4 theme-text-muted">{section.body}</div>
        </section>
      ))}

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Что сложного в словацком языке для начинающих?
        </h2>

        <p className="theme-text-muted">
          Словацкий — славянский язык с богатой грамматикой и изменением
          окончаний. Начинающие часто замечают, что слова меняются в зависимости
          от роли в предложении, времени и формы.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Произношение", "В словацком есть звуки и буквы č, š, ž, ľ, ô."],
            ["Падежи", "Слова меняют форму в зависимости от смысла в предложении."],
            ["Глаголы", "Глаголы изменяются по лицам, временам и формам."],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Что учить в первую очередь?
        </h2>

        <p className="theme-text-muted">
          Для старта лучше всего выучить базовые слова и фразы, которые часто
          встречаются в обычной жизни. После этого легче понимать грамматику и
          строить первые предложения.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              "Первые слова",
              "дом, работа, город, еда, семья, день, время, транспорт, документы.",
            ],
            [
              "Первые фразы",
              "приветствие, просьба, благодарность, вопрос, простое описание себя.",
            ],
            [
              "Базовая грамматика",
              "настоящее время, род существительных, простые предложения, частые глаголы.",
            ],
            [
              "Произношение",
              "слушайте слова с аудио и повторяйте их вслух, чтобы привыкнуть к звучанию.",
            ],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className={`${softCard} p-4`}>
              <div className="font-semibold theme-accent-text">{item.q}</div>
              <div className="mt-2 theme-text-muted">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
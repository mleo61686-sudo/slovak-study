import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Вивчення словацької мови онлайн з нуля A0–B2 | Flunio",
  description:
    "Вивчай словацьку мову онлайн у Flunio: короткі уроки A0–B2, словник, граматика, вправи, озвучка та прогрес для щоденного навчання.",

  alternates: {
    canonical: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    languages: {
      uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
      ru: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Вивчення словацької мови онлайн з нуля A0–B2 | Flunio",
    description:
      "Словацька мова онлайн: уроки, словник, граматика, вправи, озвучка та прогрес в одному місці.",
    url: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Чи можна вивчати словацьку онлайн з нуля?",
    a: "Так. У Flunio можна почати з рівня A0: базові слова, короткі уроки, озвучка, вправи та поступовий перехід до A1, A2, B1 і B2.",
  },
  {
    q: "Скільки часу потрібно займатися щодня?",
    a: "Оптимально 10–20 хвилин на день. Регулярні короткі заняття зазвичай працюють краще, ніж довгі, але рідкісні сесії.",
  },
  {
    q: "Що входить у навчання?",
    a: "На платформі є уроки по рівнях, словник, граматика з прикладами, озвучка слів і фраз, а також вправи для повторення.",
  },
  {
    q: "Чи підходить Flunio для життя або роботи у Словаччині?",
    a: "Так. Курс допомагає вивчати практичну лексику для побуту, роботи, навчання, документів, транспорту та щоденного спілкування.",
  },
  {
    q: "Чи зберігається прогрес?",
    a: "Так, прогрес уроків зберігається, щоб ти бачив пройдені теми та міг повертатися до повторення.",
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
        id="faq-schema-uk-online"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Вивчення словацької мови онлайн — курс з нуля до B2
        </h1>

        <p className="theme-text-muted">
          Flunio допомагає вивчати словацьку мову онлайн системно і без хаосу.
          Замість випадкових списків слів, відео та складних граматичних
          пояснень ти можеш проходити короткі уроки, слухати вимову, виконувати
          вправи та поступово будувати словниковий запас.
        </p>

        <p className="theme-text-muted">
          Курс підходить для тих, хто починає з нуля, хоче покращити щоденне
          спілкування або вивчає словацьку для життя, роботи, навчання чи
          документів у Словаччині. Почни з A0 і рухайся далі до A1, A2, B1 та B2
          у своєму темпі.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className={primaryButton} href="/learning">
            Почати навчання
          </Link>

          <Link className={secondaryButton} href="/learning/a0-1">
            Почати з A0 →
          </Link>

          <Link className={secondaryButton} href="/dictionary">
            Словник
          </Link>

          <Link className={secondaryButton} href="/grammar">
            Граматика
          </Link>

          <Link className={secondaryButton} href="/ru/vyvchennia-slovatskoi-movy-online">
            Русская версия →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            1) Уроки словацької по рівнях
          </h2>
          <p className="mt-2 theme-text-muted">
            Матеріал організований від A0 до B2, щоб ти завжди розумів, що
            вчити далі. Це допомагає рухатися послідовно, а не стрибати між
            випадковими темами.
          </p>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            2) Коротка щоденна практика
          </h2>
          <p className="mt-2 theme-text-muted">
            Уроки короткі, тому їх легко проходити щодня. 10–20 хвилин на день
            достатньо, щоб поступово накопичувати словниковий запас і не
            вигорати.
          </p>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            3) Озвучка слів і фраз
          </h2>
          <p className="mt-2 theme-text-muted">
            Словацьку важливо не тільки читати, а й чути. Озвучка допомагає
            звикати до вимови, повторювати слова вголос і краще сприймати мову
            на слух.
          </p>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            4) Словник і граматика разом
          </h2>
          <p className="mt-2 theme-text-muted">
            У Flunio є уроки, словник, граматичні теми та вправи. Це дозволяє
            не просто запам’ятовувати слова, а й розуміти, як використовувати їх
            у реченнях.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Як почати вивчати словацьку мову онлайн
        </h2>

        <p className="theme-text-muted">
          Якщо ти починаєш з нуля, не варто одразу намагатися вивчити всю
          граматику. Спочатку краще створити базу: найчастіші слова, прості
          фрази, вимова та базові конструкції. Коли в пам’яті вже є приклади,
          граматика сприймається значно легше.
        </p>

        <ol className="list-decimal space-y-2 pl-5 theme-text-muted">
          <li>Почни з A0, якщо вивчаєш словацьку з нуля.</li>
          <li>Проходь невеликі уроки з корисними словами.</li>
          <li>Слухай озвучку і повторюй слова вголос.</li>
          <li>Роби вправи одразу після уроку.</li>
          <li>Користуйся словником для пошуку і повторення.</li>
          <li>Відкривай граматику, коли потрібно зрозуміти правило.</li>
          <li>Переходь до A1, A2, B1 і B2 поступово, без поспіху.</li>
        </ol>

        <div className="pt-2">
          <Link className={primaryButton} href="/learning/a0-1">
            Перейти до A0 →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Що найскладніше у словацькій для початківців?
        </h2>

        <p className="theme-text-muted">
          Словацька мова має багато спільного з іншими слов’янськими мовами, але
          все одно потребує системного підходу. Найчастіше складність викликають
          відмінки, закінчення слів, форми дієслів і вимова окремих звуків. Це
          нормально: такі речі краще засвоюються поступово, через приклади та
          регулярне повторення.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Вимова</h3>
            <p className="mt-2 text-sm theme-text-muted">
              У словацькій є довгі голосні, м’які звуки та літери č, š, ž, ľ,
              ô. Озвучка допомагає звикнути до них швидше.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Відмінки</h3>
            <p className="mt-2 text-sm theme-text-muted">
              Іменники та прикметники змінюються залежно від ролі у реченні. Це
              легше зрозуміти через готові приклади.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Дієслова</h3>
            <p className="mt-2 text-sm theme-text-muted">
              Дієслова змінюються за особами, часом і значенням. Починати краще
              з найчастіших дієслів у теперішньому часі.
            </p>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Словацька лексика для реальних ситуацій
        </h2>

        <p className="theme-text-muted">
          Хороше навчання словацької має давати не тільки окремі слова, а й
          лексику для реального життя: знайомство, покупки, транспорт, житло,
          робота, навчання, документи та щоденне спілкування.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Щоденна словацька</h3>
            <p className="mt-2 theme-text-muted">
              Вчи слова і фрази для привітань, їжі, сім’ї, покупок, житла,
              транспорту та повсякденних розмов.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">
              Словацька для роботи й навчання
            </h3>
            <p className="mt-2 theme-text-muted">
              Поступово додавай слова для інструкцій, графіків, документів,
              комунікації, навчання і робочих ситуацій.
            </p>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Граматика має допомагати, а не блокувати навчання
        </h2>

        <p className="theme-text-muted">
          Граматика важлива, але її краще вивчати тоді, коли вона пояснює вже
          знайомі приклади. Спочатку можна накопичувати слова і фрази, а потім
          відкривати граматичні теми, щоб зрозуміти, чому речення побудоване
          саме так.
        </p>

        <p className="theme-text-muted">
          Такий підхід особливо корисний для словацької, бо відмінки, дієслова
          і закінчення легше засвоюються не як суха теорія, а через контекст і
          повторення.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/grammar" className={secondaryButton}>
            Відкрити граматику
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Перейти до вправ
          </Link>

          <Link href="/slovatski-slova-z-perekladom" className={secondaryButton}>
            Словацькі слова з перекладом →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Кому підійде онлайн курс словацької
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            Flunio підійде тим, хто хоче вивчати словацьку онлайн у простому,
            структурованому і практичному форматі. Це хороший варіант, якщо ти
            починаєш з нуля, повертаєшся до мови після перерви або хочеш
            створити стабільну звичку щоденного навчання.
          </p>

          <p>
            Курс також корисний, якщо словацька потрібна для повсякденного
            життя, роботи, навчання, документів, подорожей або базового
            спілкування. Можна рухатися у власному темпі та повертатися до
            попередніх уроків для повторення.
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
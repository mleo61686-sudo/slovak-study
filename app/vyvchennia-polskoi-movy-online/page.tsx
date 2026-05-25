import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Вивчення польської мови онлайн з нуля A0–B2 | Flunio",
  description:
    "Вивчай польську мову онлайн у Flunio: короткі уроки A0–B2, словник, граматика, вправи, озвучка та прогрес для щоденного навчання.",

  alternates: {
    canonical: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
    languages: {
      uk: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
      ru: `${SITE_URL}/ru/learn-polish`,
      en: `${SITE_URL}/learn-polish`,
    },
  },

  openGraph: {
    title: "Вивчення польської мови онлайн з нуля A0–B2 | Flunio",
    description:
      "Польська мова онлайн: уроки, словник, граматика, вправи, озвучка та прогрес в одному місці.",
    url: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Чи можна вивчати польську онлайн з нуля?",
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
    q: "Чи підходить Flunio для життя або роботи в Польщі?",
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
const textLink = "font-semibold theme-accent-text underline-offset-4 hover:underline";

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
        id="faq-schema-polish-uk"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold theme-text-muted">
          Польська онлайн · A0–B2 · уроки, граматика, словник і аудіо
        </div>

        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Вивчення польської мови онлайн — курс з нуля до B2
        </h1>

        <p className="theme-text-muted">
          Flunio допомагає вивчати польську мову онлайн системно і без хаосу.
          Замість випадкових списків слів, відео та складних граматичних
          пояснень ти можеш проходити короткі уроки, слухати вимову, виконувати
          вправи та поступово будувати словниковий запас.
        </p>

        <p className="theme-text-muted">
          Курс підходить для тих, хто починає з нуля, хоче покращити щоденне
          спілкування або вивчає польську для життя, роботи, навчання чи
          документів у Польщі. Почни з A0 і рухайся далі до A1, A2, B1 та B2 у
          своєму темпі.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Почати навчання
          </Link>

          <Link href="/learning/a0-1" className={secondaryButton}>
            Почати з A0 →
          </Link>

          <Link href="/polish-for-beginners" className={secondaryButton}>
            Польська для початківців
          </Link>

          <Link href="/polish-vocabulary" className={secondaryButton}>
            Польські слова
          </Link>

          <Link href="/polish-grammar" className={secondaryButton}>
            Граматика
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Швидкий маршрут для вивчення польської
        </h2>

        <p className="theme-text-muted">
          Якщо ти починаєш польську з нуля, не треба одразу відкривати всі теми
          підряд. Краще йти маршрутом: перший урок, базова лексика, вимова,
          граматика, словник і регулярна практика.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/polish-for-beginners" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              Польська для початківців →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Що вчити першим, як пройти перші 7 і 30 днів, які слова,
              вимову та граматику брати на старті.
            </p>
          </Link>

          <Link href="/learn-polish" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">Learn Polish online →</h3>
            <p className="mt-2 text-sm theme-text-muted">
              Англомовна сторінка курсу польської з рівнями, уроками, вимовою,
              словником і вправами.
            </p>
          </Link>

          <Link href="/polish-vocabulary" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">Польська лексика →</h3>
            <p className="mt-2 text-sm theme-text-muted">
              Базові польські слова за темами: сім’я, дім, їжа, транспорт,
              робота, навчання й щоденні ситуації.
            </p>
          </Link>

          <Link href="/polish-grammar" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">Польська граматика →</h3>
            <p className="mt-2 text-sm theme-text-muted">
              Огляд граматики: алфавіт, вимова, дієслова, відмінки, порядок
              слів і базові речення.
            </p>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            1) Уроки польської по рівнях
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
            Польську важливо не тільки читати, а й чути. Озвучка допомагає
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
          Як почати вивчати польську мову онлайн
        </h2>

        <p className="theme-text-muted">
          Якщо ти починаєш з нуля, не варто одразу намагатися вивчити всю
          граматику. Спочатку краще створити базу: найчастіші слова, прості
          фрази, вимова та базові конструкції. Коли в пам’яті вже є приклади,
          граматика сприймається значно легше.
        </p>

        <ol className="list-decimal space-y-2 pl-5 theme-text-muted">
          <li>
            Прочитай короткий маршрут{" "}
            <Link className={textLink} href="/polish-for-beginners">
              польської для початківців
            </Link>
            .
          </li>
          <li>
            Почни з{" "}
            <Link className={textLink} href="/learning/a0-1">
              першого уроку A0
            </Link>
            , якщо вивчаєш польську з нуля.
          </li>
          <li>
            Відкрий{" "}
            <Link className={textLink} href="/polish-vocabulary">
              польську лексику
            </Link>{" "}
            і вивчи базові слова за темами.
          </li>
          <li>
            Слухай{" "}
            <Link className={textLink} href="/polish-words-with-audio">
              польські слова з аудіо
            </Link>{" "}
            і повторюй вимову вголос.
          </li>
          <li>
            Роби вправи у розділі{" "}
            <Link className={textLink} href="/practice">
              practice
            </Link>{" "}
            одразу після уроку.
          </li>
          <li>
            Користуйся{" "}
            <Link className={textLink} href="/dictionary">
              словником
            </Link>{" "}
            для пошуку і повторення.
          </li>
          <li>
            Відкривай{" "}
            <Link className={textLink} href="/polish-grammar">
              польську граматику
            </Link>
            , коли потрібно зрозуміти правило.
          </li>
        </ol>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Перейти до A0 →
          </Link>

          <Link href="/polish-for-beginners" className={secondaryButton}>
            План для початківців →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Що найскладніше у польській для початківців?
        </h2>

        <p className="theme-text-muted">
          Польська мова має багато спільного з іншими слов’янськими мовами, але
          все одно потребує системного підходу. Найчастіше складність викликають
          вимова, буквосполучення, відмінки, закінчення слів і форми дієслів.
          Це нормально: такі речі краще засвоюються поступово, через приклади та
          регулярне повторення.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Вимова</h3>
            <p className="mt-2 text-sm theme-text-muted">
              У польській є характерні звуки та буквосполучення sz, cz, rz, ż,
              ś, ć, ł. Озвучка допомагає швидше звикнути до вимови.
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

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-grammar" className={secondaryButton}>
            Польська граматика →
          </Link>

          <Link href="/polish-words-with-audio" className={secondaryButton}>
            Польська вимова й аудіо →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Польська лексика для реальних ситуацій
        </h2>

        <p className="theme-text-muted">
          Хороше навчання польської має давати не тільки окремі слова, а й
          лексику для реального життя: знайомство, покупки, транспорт, житло,
          робота, навчання, документи та щоденне спілкування.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Щоденна польська</h3>
            <p className="mt-2 theme-text-muted">
              Вчи слова і фрази для привітань, їжі, сім’ї, покупок, житла,
              транспорту та повсякденних розмов.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">
              Польська для роботи й навчання
            </h3>
            <p className="mt-2 theme-text-muted">
              Поступово додавай слова для інструкцій, графіків, документів,
              комунікації, навчання і робочих ситуацій.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-vocabulary" className={secondaryButton}>
            Польська лексика →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник →
          </Link>
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
          Такий підхід особливо корисний для польської, бо відмінки, дієслова і
          закінчення легше засвоюються не як суха теорія, а через контекст і
          повторення. Для окремого огляду правил відкрий сторінку{" "}
          <Link className={textLink} href="/polish-grammar">
            польської граматики
          </Link>
          .
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-grammar" className={secondaryButton}>
            Польська граматика
          </Link>

          <Link href="/grammar" className={secondaryButton}>
            Усі граматичні теми
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Перейти до вправ
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Український маршрут: що вивчати після цієї сторінки
        </h2>

        <p className="theme-text-muted">
          Ця сторінка — центральний український хаб для старту польської мови
          онлайн. Далі можна перейти до конкретних сторінок залежно від того, що
          тобі потрібно саме зараз: перший урок, beginner-roadmap, слова,
          граматика, вимова або практика.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/polish-for-beginners" className={`${softCard} block p-4`}>
            <div className="font-semibold theme-text">
              Якщо ти починаєш з нуля →
            </div>
            <div className="mt-1 text-sm theme-text-muted">
              Відкрий roadmap для початківців: перші 7 днів, 30 днів і базові
              теми.
            </div>
          </Link>

          <Link href="/learn-polish" className={`${softCard} block p-4`}>
            <div className="font-semibold theme-text">
              Якщо хочеш сторінку курсу →
            </div>
            <div className="mt-1 text-sm theme-text-muted">
              Подивись загальну сторінку польського курсу Flunio з рівнями,
              уроками й вправами.
            </div>
          </Link>

          <Link href="/polish-vocabulary" className={`${softCard} block p-4`}>
            <div className="font-semibold theme-text">
              Якщо потрібні слова →
            </div>
            <div className="mt-1 text-sm theme-text-muted">
              Почни з базової польської лексики за темами й ситуаціями.
            </div>
          </Link>

          <Link
            href="/polish-words-with-audio"
            className={`${softCard} block p-4`}
          >
            <div className="font-semibold theme-text">
              Якщо важлива вимова →
            </div>
            <div className="mt-1 text-sm theme-text-muted">
              Слухай польські слова з аудіо й повторюй їх уголос.
            </div>
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Кому підійде навчання польської у Flunio
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            Flunio підійде тим, хто хоче вивчати польську онлайн у простому,
            структурованому і практичному форматі. Це хороший варіант, якщо ти
            починаєш з нуля, повертаєшся до мови після перерви або хочеш
            створити стабільну звичку щоденного навчання.
          </p>

          <p>
            Курс також корисний, якщо польська потрібна для повсякденного життя,
            роботи, навчання, документів, подорожей або базового спілкування.
            Можна рухатися у власному темпі та повертатися до попередніх уроків
            для повторення.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Почати перший урок →
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Відкрити практику
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник
          </Link>
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

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Почни польську з першого уроку
        </h2>

        <p className="theme-text-muted">
          Найкращий наступний крок — не просто читати про навчання, а відкрити
          перший короткий урок, пройти вправи й повернутися до повторення. Так
          польська поступово переходить із теорії в реальну практику.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Почати з A0-1 →
          </Link>

          <Link href="/polish-for-beginners" className={secondaryButton}>
            План для початківців
          </Link>

          <Link href="/learn-polish" className={secondaryButton}>
            Learn Polish page
          </Link>
        </div>
      </section>
    </main>
  );
}
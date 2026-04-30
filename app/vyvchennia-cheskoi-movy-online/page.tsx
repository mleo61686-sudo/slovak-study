import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Вивчення чеської мови онлайн з нуля A0–B2 | Flunio",
  description:
    "Вивчай чеську мову онлайн у Flunio: короткі уроки A0–B2, словник, граматика, вправи, озвучка та прогрес для щоденного навчання.",

  alternates: {
    canonical: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
    languages: {
      uk: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
      ru: `${SITE_URL}/ru/vyvchennia-cheskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Вивчення чеської мови онлайн з нуля A0–B2 | Flunio",
    description:
      "Чеська мова онлайн: уроки, словник, граматика, вправи, озвучка та прогрес в одному місці.",
    url: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Чи можна вивчати чеську онлайн з нуля?",
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
    q: "Чи підходить Flunio для життя або роботи в Чехії?",
    a: "Так. Курс допомагає вивчати практичну лексику для побуту, роботи, навчання, документів, транспорту та щоденного спілкування.",
  },
  {
    q: "Чи зберігається прогрес?",
    a: "Так, прогрес уроків зберігається, щоб ти бачив пройдені теми та міг повертатися до повторення.",
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
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 text-white">
      <Script
        id="faq-schema-czech-ua"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card space-y-4 rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Вивчення чеської мови онлайн — курс з нуля до B2
        </h1>

        <p className="text-white/65">
          Flunio допомагає вивчати чеську мову онлайн системно і без хаосу.
          Замість випадкових списків слів, відео та складних граматичних
          пояснень ти можеш проходити короткі уроки, слухати вимову, виконувати
          вправи та поступово будувати словниковий запас.
        </p>

        <p className="text-white/65">
          Курс підходить для тих, хто починає з нуля, хоче покращити щоденне
          спілкування або вивчає чеську для життя, роботи, навчання чи
          документів у Чехії. Почни з A0 і рухайся далі до A1, A2, B1 та B2 у
          своєму темпі.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/learning"
            className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Почати навчання
          </Link>

          <Link
            href="/learning/a0-1"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Почати з A0 →
          </Link>

          <Link
            href="/dictionary"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Словник
          </Link>

          <Link
            href="/grammar"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Граматика
          </Link>

          <Link
            href="/ru/vyvchennia-cheskoi-movy-online"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Русская версия →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="text-lg font-bold">1) Уроки чеської по рівнях</h2>
          <p className="mt-2 text-white/65">
            Матеріал організований від A0 до B2, щоб ти завжди розумів, що
            вчити далі. Це допомагає рухатися послідовно, а не стрибати між
            випадковими темами.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="text-lg font-bold">2) Коротка щоденна практика</h2>
          <p className="mt-2 text-white/65">
            Уроки короткі, тому їх легко проходити щодня. 10–20 хвилин на день
            достатньо, щоб поступово накопичувати словниковий запас і не
            вигорати.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="text-lg font-bold">3) Озвучка слів і фраз</h2>
          <p className="mt-2 text-white/65">
            Чеську важливо не тільки читати, а й чути. Озвучка допомагає звикати
            до вимови, повторювати слова вголос і краще сприймати мову на слух.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="text-lg font-bold">4) Словник і граматика разом</h2>
          <p className="mt-2 text-white/65">
            У Flunio є уроки, словник, граматичні теми та вправи. Це дозволяє
            не просто запам’ятовувати слова, а й розуміти, як використовувати їх
            у реченнях.
          </p>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Як почати вивчати чеську мову онлайн
        </h2>

        <p className="text-white/65">
          Якщо ти починаєш з нуля, не варто одразу намагатися вивчити всю
          граматику. Спочатку краще створити базу: найчастіші слова, прості
          фрази, вимова та базові конструкції. Коли в пам’яті вже є приклади,
          граматика сприймається значно легше.
        </p>

        <ol className="list-decimal space-y-2 pl-5 text-white/65">
          <li>Почни з A0, якщо вивчаєш чеську з нуля.</li>
          <li>Проходь невеликі уроки з корисними словами.</li>
          <li>Слухай озвучку і повторюй слова вголос.</li>
          <li>Роби вправи одразу після уроку.</li>
          <li>Користуйся словником для пошуку і повторення.</li>
          <li>Відкривай граматику, коли потрібно зрозуміти правило.</li>
          <li>Переходь до A1, A2, B1 і B2 поступово, без поспіху.</li>
        </ol>

        <div className="pt-2">
          <Link
            href="/learning/a0-1"
            className="inline-flex rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Перейти до A0 →
          </Link>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Що найскладніше у чеській для початківців?
        </h2>

        <p className="text-white/65">
          Чеська мова має багато спільного з іншими слов’янськими мовами, але
          все одно потребує системного підходу. Найчастіше складність викликають
          відмінки, закінчення слів, форми дієслів і вимова окремих звуків. Це
          нормально: такі речі краще засвоюються поступово, через приклади та
          регулярне повторення.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="font-semibold">Вимова</h3>
            <p className="mt-2 text-sm text-white/65">
              У чеській є характерні звуки та літери ř, č, š, ž, ě. Озвучка
              допомагає швидше звикнути до вимови.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="font-semibold">Відмінки</h3>
            <p className="mt-2 text-sm text-white/65">
              Іменники та прикметники змінюються залежно від ролі у реченні. Це
              легше зрозуміти через готові приклади.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="font-semibold">Дієслова</h3>
            <p className="mt-2 text-sm text-white/65">
              Дієслова змінюються за особами, часом і значенням. Починати краще
              з найчастіших дієслів у теперішньому часі.
            </p>
          </div>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Чеська лексика для реальних ситуацій
        </h2>

        <p className="text-white/65">
          Хороше навчання чеської має давати не тільки окремі слова, а й лексику
          для реального життя: знайомство, покупки, транспорт, житло, робота,
          навчання, документи та щоденне спілкування.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="font-semibold">Щоденна чеська</h3>
            <p className="mt-2 text-white/65">
              Вчи слова і фрази для привітань, їжі, сім’ї, покупок, житла,
              транспорту та повсякденних розмов.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="font-semibold">Чеська для роботи й навчання</h3>
            <p className="mt-2 text-white/65">
              Поступово додавай слова для інструкцій, графіків, документів,
              комунікації, навчання і робочих ситуацій.
            </p>
          </div>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Граматика має допомагати, а не блокувати навчання
        </h2>

        <p className="text-white/65">
          Граматика важлива, але її краще вивчати тоді, коли вона пояснює вже
          знайомі приклади. Спочатку можна накопичувати слова і фрази, а потім
          відкривати граматичні теми, щоб зрозуміти, чому речення побудоване
          саме так.
        </p>

        <p className="text-white/65">
          Такий підхід особливо корисний для чеської, бо відмінки, дієслова і
          закінчення легше засвоюються не як суха теорія, а через контекст і
          повторення.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/grammar"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Відкрити граматику
          </Link>

          <Link
            href="/dictionary"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Відкрити словник
          </Link>

          <Link
            href="/practice"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Перейти до вправ
          </Link>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Кому підійде навчання чеської у Flunio
        </h2>

        <div className="space-y-3 text-white/65">
          <p>
            Flunio підійде тим, хто хоче вивчати чеську онлайн у простому,
            структурованому і практичному форматі. Це хороший варіант, якщо ти
            починаєш з нуля, повертаєшся до мови після перерви або хочеш
            створити стабільну звичку щоденного навчання.
          </p>

          <p>
            Курс також корисний, якщо чеська потрібна для повсякденного життя,
            роботи, навчання, документів, подорожей або базового спілкування.
            Можна рухатися у власному темпі та повертатися до попередніх уроків
            для повторення.
          </p>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <div className="font-semibold">{item.q}</div>
              <div className="mt-2 text-white/65">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
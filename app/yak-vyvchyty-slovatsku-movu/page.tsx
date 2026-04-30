import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Як вивчити словацьку мову з нуля — простий план | Flunio",
  description:
    "Як вивчити словацьку мову з нуля: покроковий план, поради для початківців, типові помилки, щоденна практика, слова, граматика та вправи онлайн.",

  alternates: {
    canonical: `${SITE_URL}/yak-vyvchyty-slovatsku-movu`,
  },

  openGraph: {
    title: "Як вивчити словацьку мову з нуля — простий план | Flunio",
    description:
      "Покроковий план для тих, хто хоче почати вивчати словацьку мову з нуля і не загубитися в словах, граматиці та вправах.",
    url: `${SITE_URL}/yak-vyvchyty-slovatsku-movu`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "З чого почати вивчати словацьку мову?",
    a: "Найкраще почати з базових слів, простих фраз, вимови та коротких щоденних уроків. Не варто одразу вчити всю граматику без прикладів.",
  },
  {
    q: "Чи можна вивчити словацьку мову самостійно?",
    a: "Так, можна. Важливо мати систему: уроки по рівнях, повторення, озвучку, вправи та регулярну практику хоча б 10–20 хвилин на день.",
  },
  {
    q: "Скільки часу потрібно, щоб вивчити словацьку з нуля?",
    a: "Першу базу для простого спілкування можна створити за кілька місяців регулярної практики. Швидкість залежить від часу, повторення і того, як часто ти використовуєш мову.",
  },
  {
    q: "Що складніше у словацькій для українців?",
    a: "Найчастіше складність викликають відмінки, закінчення, дієслова, довгі голосні та деякі звуки. Але через приклади й повторення це засвоюється поступово.",
  },
  {
    q: "Чи підходить Flunio для початківців?",
    a: "Так. У Flunio можна почати з рівня A0, проходити короткі уроки, слухати озвучку, виконувати вправи та поступово переходити до наступних рівнів.",
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
        id="faq-schema-yak-vyvchyty-slovatsku-movu"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card space-y-4 rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Як вивчити словацьку мову з нуля: простий план
        </h1>

        <p className="text-white/65">
          Вивчення словацької мови з нуля часто здається складним: багато нових
          слів, незнайома вимова, відмінки, дієслова і граматика. Але якщо
          рухатися поступово, словацьку можна вивчати без хаосу і перевантаження.
        </p>

        <p className="text-white/65">
          Головне — не намагатися вивчити все одразу. Краще почати з базових
          слів, простих фраз, правильної вимови і короткої щоденної практики.
          Саме такий підхід допомагає створити основу для реального спілкування.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/learning/a0-1"
            className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Почати з A0 →
          </Link>

          <Link
            href="/learn-slovak"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Курс словацької
          </Link>

          <Link
            href="/vyvchennia-slovatskoi-movy-online"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Словацька онлайн
          </Link>

          <Link
            href="/dictionary"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Словник
          </Link>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Чи складно вивчити словацьку мову?
        </h2>

        <p className="text-white/65">
          Словацька мова має багато спільного з українською, тому частина слів
          може здаватися знайомою. Але це не означає, що все буде автоматично
          зрозуміло. Часто саме схожість мов створює помилки: слово виглядає
          знайомо, але має інше значення або вживається інакше.
        </p>

        <p className="text-white/65">
          Для початківця найкраща стратегія — не зубрити правила окремо, а
          вчити слова і фрази в контексті. Коли ти бачиш приклади речень,
          слухаєш вимову і повторюєш матеріал, граматика поступово стає
          зрозумілішою.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="text-lg font-bold">1) Почни зі слів</h2>
          <p className="mt-2 text-white/65">
            Спочатку вчи найчастіші слова для щоденного життя: люди, їжа, дім,
            робота, транспорт, покупки, час і прості дії.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="text-lg font-bold">2) Додавай фрази</h2>
          <p className="mt-2 text-white/65">
            Окремі слова важливі, але говорити допомагають фрази. Вчи готові
            конструкції для знайомства, питань, магазину, роботи і документів.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="text-lg font-bold">3) Слухай вимову</h2>
          <p className="mt-2 text-white/65">
            Словацьку треба не тільки читати, а й чути. Озвучка допомагає
            звикнути до ритму мови, довгих голосних і характерних звуків.
          </p>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Покроковий план: як вивчити словацьку з нуля
        </h2>

        <ol className="list-decimal space-y-3 pl-5 text-white/65">
          <li>
            <strong className="text-white">Почни з рівня A0.</strong> Не
            перескакуй одразу до складної граматики. Спочатку створи базу з
            найпростіших слів і фраз.
          </li>

          <li>
            <strong className="text-white">Вчи невеликими порціями.</strong> 10
            нових слів на день краще, ніж 100 слів один раз на тиждень без
            повторення.
          </li>

          <li>
            <strong className="text-white">Слухай кожне слово.</strong>{" "}
            Повторюй уголос, навіть якщо спочатку звучить незвично. Вимова
            формується через регулярність.
          </li>

          <li>
            <strong className="text-white">Роби вправи після уроку.</strong>{" "}
            Просто прочитати слово недостатньо. Треба впізнати його, згадати
            переклад і використати в завданні.
          </li>

          <li>
            <strong className="text-white">Повторюй старі слова.</strong> Без
            повторення слова швидко забуваються. Краще повертатися до них через
            день, тиждень і місяць.
          </li>

          <li>
            <strong className="text-white">
              Підключай граматику поступово.
            </strong>{" "}
            Відмінки, дієслова і закінчення краще пояснювати на прикладах, які
            ти вже бачив.
          </li>

          <li>
            <strong className="text-white">Не чекай ідеального моменту.</strong>{" "}
            Почни з короткої практики сьогодні, навіть якщо маєш тільки 10
            хвилин.
          </li>
        </ol>

        <div className="pt-2">
          <Link
            href="/learning/a0-1"
            className="inline-flex rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Почати перший урок →
          </Link>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">План на 30 днів для початківця</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="font-semibold">Дні 1–7: база</h3>
            <p className="mt-2 text-white/65">
              Вчи найпростіші слова: привітання, числа, сім’я, їжа, дім, базові
              дієслова і короткі фрази для щоденного спілкування.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="font-semibold">Дні 8–14: фрази</h3>
            <p className="mt-2 text-white/65">
              Додавай готові речення: як попросити, запитати, відповісти,
              подякувати, щось купити або пояснити просту ситуацію.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="font-semibold">Дні 15–21: граматика</h3>
            <p className="mt-2 text-white/65">
              Почни розбирати базові дієслова, порядок слів, прості питання і
              перші відмінкові форми через приклади.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="font-semibold">Дні 22–30: повторення</h3>
            <p className="mt-2 text-white/65">
              Повторюй пройдені слова, роби вправи, слухай вимову і пробуй
              складати прості речення зі знайомою лексикою.
            </p>
          </div>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          Типові помилки при вивченні словацької
        </h2>

        <div className="space-y-3 text-white/65">
          <p>
            <strong className="text-white">
              Помилка 1: вчити тільки списки слів.
            </strong>{" "}
            Слова потрібні, але без прикладів і вправ вони швидко забуваються.
          </p>

          <p>
            <strong className="text-white">
              Помилка 2: ігнорувати вимову.
            </strong>{" "}
            Якщо тільки читати, потім важче розуміти живу мову на слух.
          </p>

          <p>
            <strong className="text-white">
              Помилка 3: починати з важкої граматики.
            </strong>{" "}
            Граматика без базових слів виглядає страшніше, ніж є насправді.
          </p>

          <p>
            <strong className="text-white">
              Помилка 4: займатися нерегулярно.
            </strong>{" "}
            Для мови краще 10 хвилин щодня, ніж одна довга сесія раз на
            тиждень.
          </p>

          <p>
            <strong className="text-white">
              Помилка 5: боятися помилятися.
            </strong>{" "}
            Помилки — це частина навчання. Головне — помічати їх і поступово
            виправляти.
          </p>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">Як не втратити мотивацію</h2>

        <p className="text-white/65">
          Мотивація часто зникає не тому, що мова занадто складна, а тому що
          людина не бачить прогресу. Тому важливо мати маленькі цілі: пройти
          один урок, повторити 10 слів, зробити вправу, послухати вимову або
          згадати старі слова.
        </p>

        <p className="text-white/65">
          Коли навчання коротке і зрозуміле, його легше зробити звичкою. Саме
          тому у Flunio уроки побудовані так, щоб ти міг рухатися поступово: від
          A0 до складніших рівнів, з озвучкою, словником, граматикою і вправами.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/learning"
            className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Спробувати Flunio →
          </Link>

          <Link
            href="/grammar"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Граматика
          </Link>

          <Link
            href="/practice"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Вправи
          </Link>
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">Корисні сторінки для старту</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/slovak-for-ukrainians"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Словацька для українців →
          </Link>

          <Link
            href="/vyvchennia-slovatskoi-movy-online"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Вивчення словацької онлайн →
          </Link>

          <Link
            href="/slovak-grammar"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Словацька граматика →
          </Link>

          <Link
            href="/dictionary"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            Словацький словник →
          </Link>
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
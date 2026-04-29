import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Типові помилки в словацькій мові | Flunio",
  description:
    "Типові помилки в словацькій мові для українців: неправильні слова, схожі форми, переклад дослівно, вимова, дієслова та приклади правильного вживання.",

  alternates: {
    canonical: `${SITE_URL}/pomylky-v-slovatskii-movi`,
  },

  openGraph: {
    title: "Типові помилки в словацькій мові | Flunio",
    description:
      "Розбір частих помилок у словацькій: як не перекладати дослівно, які слова не плутати і як говорити природніше.",
    url: `${SITE_URL}/pomylky-v-slovatskii-movi`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Які помилки найчастіше роблять українці у словацькій?",
    a: "Найчастіше плутають схожі слова, перекладають фрази дослівно з української, неправильно використовують відмінки, дієслова та прийменники.",
  },
  {
    q: "Чому словацька здається легкою, але викликає помилки?",
    a: "Словацька схожа на українську, тому багато слів здаються знайомими. Але схожість може обманювати: значення, форма або вживання часто відрізняються.",
  },
  {
    q: "Як швидше виправити помилки у словацькій?",
    a: "Вчи слова і фрази в контексті, слухай вимову, повторюй правильні приклади і не покладайся тільки на дослівний переклад.",
  },
];

const mistakes = [
  {
    wrong: "Ja mám 25 rokov starý.",
    correct: "Mám 25 rokov.",
    ua: "Мені 25 років.",
    note: "У словацькій не треба дослівно казати «я маю 25 років старий». Достатньо: Mám 25 rokov.",
  },
  {
    wrong: "Ja som hladný na kávu.",
    correct: "Mám chuť na kávu.",
    ua: "Я хочу кави / маю бажання випити каву.",
    note: "Hladný означає голодний. Для бажання чогось краще використовувати mám chuť na...",
  },
  {
    wrong: "Ja idem do práca.",
    correct: "Idem do práce.",
    ua: "Я йду на роботу.",
    note: "Після do часто змінюється форма слова. Práca → do práce.",
  },
  {
    wrong: "Som na Slovensko.",
    correct: "Som na Slovensku.",
    ua: "Я у Словаччині.",
    note: "Коли говоримо про перебування у країні, потрібна форма na Slovensku.",
  },
  {
    wrong: "Ja robím chyba.",
    correct: "Robím chybu.",
    ua: "Я роблю помилку.",
    note: "Слово chyba змінює форму: robiť chybu.",
  },
  {
    wrong: "Mám rád Slovensko jazyk.",
    correct: "Mám rád slovenský jazyk.",
    ua: "Мені подобається словацька мова.",
    note: "Slovensko — це країна, а slovenský — словацький.",
  },
  {
    wrong: "Ja chcem učiť slovenský.",
    correct: "Chcem sa učiť slovenčinu.",
    ua: "Я хочу вчити словацьку.",
    note: "Мову як предмет краще називати slovenčina. Також потрібно sa učiť.",
  },
  {
    wrong: "Ja neviem hovoriť po slovenský.",
    correct: "Neviem hovoriť po slovensky.",
    ua: "Я не вмію говорити словацькою.",
    note: "Правильна форма: po slovensky.",
  },
  {
    wrong: "To je dobrá človek.",
    correct: "To je dobrý človek.",
    ua: "Це хороша людина.",
    note: "Človek — чоловічий рід, тому dobrý človek.",
  },
  {
    wrong: "Ja idem v obchod.",
    correct: "Idem do obchodu.",
    ua: "Я йду в магазин.",
    note: "Коли є рух кудись, часто потрібно do + правильна форма: do obchodu.",
  },
  {
    wrong: "Ja som v autobus.",
    correct: "Som v autobuse.",
    ua: "Я в автобусі.",
    note: "Коли говоримо де саме, форма змінюється: v autobuse.",
  },
  {
    wrong: "Ja mám rád káva.",
    correct: "Mám rád kávu.",
    ua: "Я люблю каву.",
    note: "Після mám rád об’єкт часто змінює форму: káva → kávu.",
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
        id="faq-schema-pomylky-v-slovatskii-movi"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Типові помилки в словацькій мові
        </h1>

        <p className="text-slate-700">
          Словацька мова здається близькою до української, але саме через цю
          схожість часто виникають помилки. Людина думає, що можна перекласти
          фразу дослівно, але словацькою це звучить неприродно або неправильно.
        </p>

        <p className="text-slate-700">
          Нижче — часті помилки у словацькій мові, які роблять початківці:
          неправильні форми слів, дослівний переклад, плутанина між схожими
          словами та типові проблеми з прийменниками.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/learning/a0-1"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            Почати з A0 →
          </Link>

          <Link
            href="/yak-vyvchyty-slovatsku-movu"
            className="rounded-xl border px-4 py-2"
          >
            Як вивчити словацьку
          </Link>

          <Link
            href="/slovatski-slova-z-perekladom"
            className="rounded-xl border px-4 py-2"
          >
            Словацькі слова
          </Link>

          <Link href="/slovak-grammar" className="rounded-xl border px-4 py-2">
            Граматика
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Чому виникають помилки у словацькій?
        </h2>

        <p className="text-slate-700">
          Багато українців швидко впізнають словацькі слова, бо мови мають
          спільне слов’янське коріння. Але схожість не означає, що можна завжди
          перекладати буквально. У словацькій є свої форми, прийменники,
          закінчення та сталі фрази.
        </p>

        <p className="text-slate-700">
          Найкращий спосіб уникати помилок — вчити не тільки окремі слова, а й
          готові приклади речень. Так ти бачиш, як слово реально працює у
          фразі.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Часті помилки: неправильно → правильно
        </h2>

        <div className="space-y-4">
          {mistakes.map((item) => (
            <div key={item.wrong} className="rounded-2xl border bg-white p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                  <div className="text-sm font-semibold text-red-700">
                    Неправильно
                  </div>
                  <div className="mt-1 text-lg font-bold text-red-900">
                    {item.wrong}
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <div className="text-sm font-semibold text-emerald-700">
                    Правильно
                  </div>
                  <div className="mt-1 text-lg font-bold text-emerald-900">
                    {item.correct}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-slate-700">
                <strong>Переклад:</strong> {item.ua}
              </p>

              <p className="mt-2 text-slate-700">
                <strong>Пояснення:</strong> {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          5 правил, які допоможуть уникати помилок
        </h2>

        <ol className="list-decimal space-y-3 pl-5 text-slate-700">
          <li>
            <strong>Не перекладай усе дослівно.</strong> Фраза, яка звучить
            нормально українською, може бути неприродною словацькою.
          </li>
          <li>
            <strong>Вчи слова у реченнях.</strong> Окреме слово — це тільки
            половина знання. Важливо бачити його форму у фразі.
          </li>
          <li>
            <strong>Слухай вимову.</strong> Деякі слова легко впізнати на
            письмі, але важче зрозуміти на слух.
          </li>
          <li>
            <strong>Звертай увагу на прийменники.</strong> Наприклад: do práce,
            v autobuse, na Slovensku.
          </li>
          <li>
            <strong>Повторюй правильні приклади.</strong> Краще запам’ятати одну
            правильну фразу, ніж десять окремих слів без контексту.
          </li>
        </ol>

        <div className="pt-2">
          <Link
            href="/learning"
            className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
          >
            Практикуватися у Flunio →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Які теми найчастіше викликають труднощі?
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Відмінки</h3>
            <p className="mt-2 text-sm text-slate-700">
              Форми слів змінюються залежно від ролі у реченні: do práce, v
              autobuse, mám kávu.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Дієслова</h3>
            <p className="mt-2 text-sm text-slate-700">
              Не всі дієслова працюють так само, як в українській. Наприклад:
              učiť sa slovenčinu.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Схожі слова</h3>
            <p className="mt-2 text-sm text-slate-700">
              Деякі слова схожі на українські, але мають інше значення або інше
              вживання.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Що вчити далі?</h2>

        <p className="text-slate-700">
          Щоб робити менше помилок, варто поєднувати лексику, граматику і
          практику. Почни з базових слів, потім додавай короткі фрази, а
          граматику вчи через приклади.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/slovatski-slova-z-perekladom"
            className="rounded-xl border p-4 hover:bg-slate-50"
          >
            Словацькі слова з перекладом →
          </Link>

          <Link
            href="/yak-vyvchyty-slovatsku-movu"
            className="rounded-xl border p-4 hover:bg-slate-50"
          >
            Як вивчити словацьку з нуля →
          </Link>

          <Link
            href="/slovak-grammar"
            className="rounded-xl border p-4 hover:bg-slate-50"
          >
            Словацька граматика →
          </Link>

          <Link
            href="/dictionary"
            className="rounded-xl border p-4 hover:bg-slate-50"
          >
            Словацький словник →
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
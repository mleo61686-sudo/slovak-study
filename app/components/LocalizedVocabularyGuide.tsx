import Link from "next/link";

export type GuideWord = {
  word: string;
  translation: string;
  example: string;
  exampleTranslation: string;
};
export type GuideTopic = {
  heading: string;
  context: string;
  words: GuideWord[];
};
export type GuidePhrase = {
  phrase: string;
  translation: string;
  usage: string;
};
export type GuideNote = { title: string; explanation: string };
export type GuideFAQ = { q: string; a: string };
export type GuideData = {
  lang: "uk" | "ru";
  courseLang: "cs" | "pl";
  eyebrow: string;
  title: string;
  lead: string;
  introduction: string;
  courseHref: string;
  topics: GuideTopic[];
  phrases: GuidePhrase[];
  notes: GuideNote[];
  faqs: GuideFAQ[];
  languageUrls: { uk: string; ru: string; en: string };
};

const TEXT = {
  uk: {
    choose: "Цей словник іншими мовами пояснень",
    nav: "Мови пояснень",
    languages: { uk: "Українська", ru: "Російська", en: "Англійська" },
    start: "Перейти до курсу A0",
    hint: "Почни з кількох слів, прочитай приклади вголос і перевір себе в курсі. Повний рівень A0 безкоштовний.",
    topics: "Слова за життєвими ситуаціями",
    word: "Слово", meaning: "Переклад", example: "Приклад і переклад",
    phrases: "Готові фрази для розмови",
    notice: "Як не плутати слова та звуки",
    practice: "Як запам’ятати нові слова",
    steps: [
      "Вибери одну тему й вивчи 5–7 слів разом із прикладами.",
      "Закрий переклад і спробуй пояснити значення самостійно.",
      "Склади 2–3 власні речення, а наступного дня повтори лексику.",
      "Відкрий відповідний курс Flunio та попрактикуй слова в уроках.",
    ],
    faq: "Запитання початківців",
    cta: "Продовжити навчання",
    dictionary: "Відкрити словник Flunio",
    caveat: "Приклади на цій сторінці є навчальними. У живому мовленні форма слова може змінюватися за контекстом.",
  },
  ru: {
    choose: "Этот словарь на других языках объяснений",
    nav: "Языки объяснений",
    languages: { uk: "Украинский", ru: "Русский", en: "Английский" },
    start: "Перейти к курсу A0",
    hint: "Начните с нескольких слов, прочитайте примеры вслух и потренируйтесь в курсе. Полный уровень A0 бесплатный.",
    topics: "Слова по жизненным ситуациям",
    word: "Слово", meaning: "Перевод", example: "Пример и перевод",
    phrases: "Готовые фразы для разговора",
    notice: "Что легко перепутать",
    practice: "Как запомнить новые слова",
    steps: [
      "Выберите одну тему и выучите 5–7 слов вместе с примерами.",
      "Закройте перевод и попробуйте вспомнить значение самостоятельно.",
      "Составьте 2–3 своих предложения, а на следующий день повторите слова.",
      "Откройте польский курс Flunio и закрепите материал на практике.",
    ],
    faq: "Частые вопросы начинающих",
    cta: "Продолжить обучение",
    dictionary: "Открыть словарь Flunio",
    caveat: "Это учебные примеры. В разговоре форма слова может меняться в зависимости от контекста.",
  },
} as const;

export default function LocalizedVocabularyGuide({ data }: { data: GuideData }) {
  const t = TEXT[data.lang];
  const languages = (["uk", "ru", "en"] as const);
  return (
    <main lang={data.lang} className="mx-auto max-w-5xl space-y-7 px-4 py-10 sm:px-6">
      <header className="flunio-card space-y-5 rounded-3xl p-6 sm:p-8">
        <p className="text-sm font-semibold theme-accent-text">{data.eyebrow}</p>
        <h1 className="text-3xl font-bold leading-tight theme-text sm:text-4xl">{data.title}</h1>
        <p className="text-lg leading-8 theme-text-muted">{data.lead}</p>
        <p className="leading-7 theme-text-muted">{data.introduction}</p>
        <Link href={data.courseHref} className="theme-primary-button inline-flex rounded-xl px-5 py-3 font-semibold">
          {t.start}
        </Link>
        <p className="text-sm theme-text-muted">{t.hint}</p>
      </header>

      <nav className="flunio-card rounded-3xl p-6" aria-label={t.nav}>
        <h2 className="text-lg font-semibold theme-text">{t.choose}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {languages.map(language => (
            <Link key={language} href={data.languageUrls[language]} hrefLang={language}
              aria-current={language===data.lang ? "page" : undefined}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${language===data.lang ? "theme-primary-button" : "theme-secondary-button"}`}>
              {t.languages[language]}
            </Link>
          ))}
        </div>
      </nav>

      <section className="space-y-5" aria-labelledby="vocab-heading">
        <h2 id="vocab-heading" className="text-2xl font-bold theme-text">{t.topics}</h2>
        {data.topics.map(topic => (
          <section key={topic.heading} className="flunio-card space-y-4 rounded-3xl p-5 sm:p-7">
            <h3 className="text-xl font-bold theme-text">{topic.heading}</h3>
            <p className="theme-text-muted">{topic.context}</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[530px] border-collapse text-left text-sm">
                <thead className="theme-text">
                  <tr className="border-b border-current/20">
                    <th scope="col" className="p-3">{t.word}</th>
                    <th scope="col" className="p-3">{t.meaning}</th>
                    <th scope="col" className="p-3">{t.example}</th>
                  </tr>
                </thead>
                <tbody>
                  {topic.words.map(word => (
                    <tr key={word.word} className="border-b border-current/10 last:border-0">
                      <th scope="row" lang={data.courseLang} className="p-3 font-bold theme-text">{word.word}</th>
                      <td className="p-3 theme-text-muted">{word.translation}</td>
                      <td className="p-3 theme-text-muted">
                        <span lang={data.courseLang} className="font-medium theme-text">{word.example}</span>
                        <span className="mt-1 block">{word.exampleTranslation}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </section>

      <section className="flunio-card rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold theme-text">{t.phrases}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {data.phrases.map(item => (
            <div key={item.phrase} className="theme-home-soft-card rounded-2xl p-4">
              <p lang={data.courseLang} className="font-bold theme-text">{item.phrase}</p>
              <p className="mt-2 theme-text-muted">{item.translation}</p>
              <p className="mt-2 text-sm theme-text-muted">{item.usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flunio-card rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold theme-text">{t.notice}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {data.notes.map(note => (
            <div key={note.title} className="theme-home-soft-card rounded-2xl p-4">
              <h3 className="font-semibold theme-text">{note.title}</h3>
              <p className="mt-2 leading-7 theme-text-muted">{note.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold theme-text">{t.practice}</h2>
        <ol className="list-decimal space-y-2 pl-6 leading-7 theme-text-muted">
          {t.steps.map(step => <li key={step}>{step}</li>)}
        </ol>
        <p className="text-sm theme-text-muted">{t.caveat}</p>
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold theme-text">{t.faq}</h2>
        {data.faqs.map(item => (
          <details key={item.q} className="theme-home-soft-card rounded-2xl p-4">
            <summary className="cursor-pointer font-semibold theme-text">{item.q}</summary>
            <p className="mt-3 leading-7 theme-text-muted">{item.a}</p>
          </details>
        ))}
      </section>

      <section className="flunio-card space-y-4 rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold theme-text">{t.cta}</h2>
        <div className="flex flex-wrap gap-3">
          <Link href={data.courseHref} className="theme-primary-button rounded-xl px-5 py-3 font-semibold">{t.start}</Link>
          <Link href="/dictionary" className="theme-secondary-button rounded-xl px-5 py-3 font-semibold">{t.dictionary}</Link>
        </div>
      </section>
    </main>
  );
}

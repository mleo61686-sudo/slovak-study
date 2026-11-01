import Link from "next/link";

type Course = "sk" | "cs" | "pl";
type PageLang = "uk" | "ru" | "en";

type Props = {
  course: Course;
  lang: PageLang;
};

const ROUTES: Record<Course, Record<PageLang, string>> = {
  sk: {
    uk: "/vyvchennia-slovatskoi-movy-online",
    ru: "/ru/learn-slovak",
    en: "/learn-slovak",
  },
  cs: {
    uk: "/vyvchennia-cheskoi-movy-online",
    ru: "/ru/learn-czech",
    en: "/learn-czech",
  },
  pl: {
    uk: "/vyvchennia-polskoi-movy-online",
    ru: "/ru/learn-polish",
    en: "/learn-polish",
  },
};

const COPY = {
  uk: {
    title: "Обери мову пояснень",
    subtitle: "Цей курс доступний українською, російською та англійською.",
    other: "Інші курси Flunio",
    current: "Поточна сторінка",
    languages: { uk: "Українська", ru: "Російська", en: "Англійська" },
    courses: { sk: "Словацька", cs: "Чеська", pl: "Польська" },
  },
  ru: {
    title: "Выберите язык объяснений",
    subtitle: "Этот курс доступен на украинском, русском и английском.",
    other: "Другие курсы Flunio",
    current: "Текущая страница",
    languages: { uk: "Украинский", ru: "Русский", en: "Английский" },
    courses: { sk: "Словацкий", cs: "Чешский", pl: "Польский" },
  },
  en: {
    title: "Choose your explanation language",
    subtitle: "Explore this course in Ukrainian, Russian or English.",
    other: "Other Flunio courses",
    current: "Current page",
    languages: { uk: "Ukrainian", ru: "Russian", en: "English" },
    courses: { sk: "Slovak", cs: "Czech", pl: "Polish" },
  },
} as const;

const LANGUAGES: PageLang[] = ["uk", "ru", "en"];
const COURSES: Course[] = ["sk", "cs", "pl"];

export default function CourseSeoNavigation({ course, lang }: Props) {
  const copy = COPY[lang];
  return (
    <section className="flunio-card rounded-3xl p-6 sm:p-8" aria-label={copy.title}>
      <h2 className="text-2xl font-bold theme-text">{copy.title}</h2>
      <p className="mt-2 theme-text-muted">{copy.subtitle}</p>
      <nav className="mt-5 flex flex-wrap gap-3" aria-label={copy.title}>
        {LANGUAGES.map((language) => {
          const selected = language === lang;
          return (
            <Link
              key={language}
              href={ROUTES[course][language]}
              hrefLang={language}
              aria-current={selected ? "page" : undefined}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                selected ? "theme-primary-button" : "theme-secondary-button"
              }`}
            >
              {copy.languages[language]}
              {selected ? ` · ${copy.current}` : ""}
            </Link>
          );
        })}
      </nav>
      <h3 className="mt-7 font-bold theme-text">{copy.other}</h3>
      <nav className="mt-3 flex flex-wrap gap-3" aria-label={copy.other}>
        {COURSES.filter((otherCourse) => otherCourse !== course).map(
          (otherCourse) => (
            <Link
              key={otherCourse}
              href={ROUTES[otherCourse][lang]}
              className="theme-home-soft-card rounded-xl px-4 py-2 text-sm font-semibold theme-text"
            >
              {copy.courses[otherCourse]}
            </Link>
          )
        )}
      </nav>
    </section>
  );
}

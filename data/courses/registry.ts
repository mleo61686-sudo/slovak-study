export type Lang = "ua" | "ru" | "en";

export type CourseId = "sk" | "cs" | "pl";

export type CourseFeature = "learn" | "grammar" | "dictionary" | "practice";
export type CourseStatus = "active" | "comingSoon";

export type CourseDefinition = {
  id: CourseId;
  title: string;
  subtitle: string;
  description: Partial<Record<Lang, string>>;
  enabled: boolean;
  status: CourseStatus;
  features: Record<CourseFeature, boolean>;
};

export const COURSES: CourseDefinition[] = [
  {
    id: "sk",
    title: "Slovak",
    subtitle: "Slovenčina",
    description: {
      ua: "Почни з нуля та вивчай словацьку через уроки, граматику, словник і тренажер.",
      ru: "Начни с нуля и изучай словацкий через уроки, грамматику, словарь и тренажёр.",
      en: "Start from zero and learn Slovak through lessons, grammar, dictionary, and practice.",
    },
    enabled: true,
    status: "active",
    features: { learn: true, grammar: true, dictionary: true, practice: true },
  },
  {
    id: "cs",
    title: "Czech",
    subtitle: "Čeština",
    description: {
      ua: "Чеський курс уже доступний. Деякі рівні та матеріали ще допрацьовуються.",
      ru: "Чешский курс уже доступен. Некоторые уровни и материалы ещё дорабатываются.",
      en: "The Czech course is already available. Some levels and materials are still being improved.",
    },
    enabled: true,
    status: "active",
    features: { learn: true, grammar: false, dictionary: false, practice: false },
  },
  {
    id: "pl",
    title: "Polish",
    subtitle: "Polski",
    description: {
      ua: "Польська мова з’явиться пізніше після завершення словацького й чеського напрямків.",
      ru: "Польский язык появится позже, после завершения словацкого и чешского направлений.",
      en: "Polish will be added later after the Slovak and Czech tracks are completed.",
    },
    enabled: false,
    status: "comingSoon",
    features: { learn: false, grammar: false, dictionary: false, practice: false },
  },
];

export function isCourseId(x: string): x is CourseId {
  return x === "sk" || x === "cs" || x === "pl";
}

export function getCourseOrDefault(id: string | null | undefined): CourseId {
  if (!id) return "sk";
  return isCourseId(id) ? id : "sk";
}
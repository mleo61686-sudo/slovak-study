// data/courses/registry.ts

export type CourseId = "sk" | "cs" | "pl";

export type CourseFeature = "learn" | "grammar" | "dictionary" | "practice";
export type CourseStatus = "active" | "comingSoon";

export type CourseDefinition = {
  id: CourseId;
  title: string;    // "Slovak"
  subtitle: string; // "Slovenčina"
  enabled: boolean; // чи доступний курс зараз
  status: CourseStatus;
  features: Record<CourseFeature, boolean>;
};

export const COURSES: CourseDefinition[] = [
  {
    id: "sk",
    title: "Slovak",
    subtitle: "Slovenčina",
    enabled: true,
    status: "active",
    features: { learn: true, grammar: true, dictionary: true, practice: true },
  },
  {
    id: "cs",
    title: "Czech",
    subtitle: "Čeština",
    enabled: true,
    status: "active",
    features: { learn: true, grammar: true, dictionary: true, practice: true },
  },
  {
    id: "pl",
    title: "Polish",
    subtitle: "Polski",
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
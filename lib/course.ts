export type CourseId = "sk" | "cs" | "pl";

export const COURSES: {
  id: CourseId;
  title: string;
  subtitle: string;
  enabled: boolean;
}[] = [
  { id: "sk", title: "Slovak", subtitle: "Slovenčina", enabled: true },
  { id: "cs", title: "Czech", subtitle: "Čeština", enabled: false },
  { id: "pl", title: "Polish", subtitle: "Polski", enabled: false },
];

export const COURSE_STORAGE_KEY = "slovakStudy.activeCourse";

export function getDefaultCourse(): CourseId {
  return "sk";
}
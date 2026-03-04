export type { CourseId } from "@/data/courses/registry";
export { COURSES } from "@/data/courses/registry";

export const COURSE_STORAGE_KEY = "slovakStudy.activeCourse";

export function getDefaultCourse() {
  return "sk" as const;
}
import type { Lesson } from "../data";
import type { CourseId } from "./registry";
import { getLessonsByBand } from "./registry";

export function getLessonsForCourse(courseId: CourseId): Lesson[] {
  const byBand = getLessonsByBand(courseId);
  // порядок рівнів важливий
  return [
    ...byBand.a0,
    ...byBand.a1,
    ...byBand.a2,
    ...byBand.b1,
    ...byBand.b2,
  ];
}
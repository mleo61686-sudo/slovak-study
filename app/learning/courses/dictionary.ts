import type { CourseId } from "./registry";
import { getLessonsByBand } from "./registry";
import {
  buildDictionaryFromLessonsByBand,
  buildSrsWordsFromLessonsByBand,
} from "../data";

export function getDictionaryForCourse(courseId: CourseId) {
  return buildDictionaryFromLessonsByBand(getLessonsByBand(courseId));
}

export function getSrsWordsForCourse(courseId: CourseId) {
  return buildSrsWordsFromLessonsByBand(getLessonsByBand(courseId));
}
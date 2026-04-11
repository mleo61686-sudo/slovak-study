import { cookies } from "next/headers";
import WordsSrsPage from "@/app/components/WordsSrsPage";
import CourseGate from "@/app/components/CourseGate";
import { getSrsWordsForCourse } from "@/app/learning/courses/dictionary";
import type { CourseId } from "@/app/learning/courses/registry";
import type { Word } from "@/app/learning/data";

function getCourseIdFromCookie(value?: string): CourseId {
  if (value === "cs") return "cs";
  if (value === "pl") return "pl";
  return "sk";
}

export default async function WordsPage() {
  const cookieStore = await cookies();
  const activeCourseCookie = cookieStore.get("slovakStudyActiveCourse")?.value;
  const courseId = getCourseIdFromCookie(activeCourseCookie);

  const initialWords = getSrsWordsForCourse(courseId) as Word[];

  return (
    <CourseGate>
      <WordsSrsPage
        backHref="/"
        initialCourseId={courseId}
        initialWords={initialWords}
      />
    </CourseGate>
  );
}
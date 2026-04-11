import { cookies } from "next/headers";
import CourseGate from "@/app/components/CourseGate";
import PracticeClient from "./PracticeClient";
import { getSrsWordsForCourse } from "@/app/learning/courses/dictionary";
import type { CourseId } from "@/app/learning/courses/registry";
import type { Word } from "@/app/learning/data";

type PracticePageProps = {
  searchParams?: Promise<{
    pack?: string | string[];
    level?: string | string[];
    cat?: string | string[];
  }>;
};

function getCourseIdFromCookie(value?: string): CourseId {
  if (value === "cs") return "cs";
  if (value === "pl") return "pl";
  return "sk";
}

function getSingleParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PracticePage({ searchParams }: PracticePageProps) {
  const cookieStore = await cookies();
  const activeCourseCookie = cookieStore.get("slovakStudyActiveCourse")?.value;
  const courseId = getCourseIdFromCookie(activeCourseCookie);

  const params = searchParams ? await searchParams : undefined;

  const pack = getSingleParam(params?.pack) ?? null;
  const level = getSingleParam(params?.level) ?? null;
  const cat = getSingleParam(params?.cat) ?? null;

  const initialWords = getSrsWordsForCourse(courseId) as Word[];

  return (
    <CourseGate>
      <PracticeClient
        initialCourseId={courseId}
        initialWords={initialWords}
        pack={pack}
        slangLevel={level}
        slangCat={cat}
      />
    </CourseGate>
  );
}
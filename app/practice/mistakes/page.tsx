import { cookies } from "next/headers";
import CourseGate from "@/app/components/CourseGate";
import type { CourseId } from "@/app/learning/courses/registry";
import MistakesClient from "./MistakesClient";

function getCourseId(value?: string): CourseId {
  if (value === "cs") return "cs";
  if (value === "pl") return "pl";
  return "sk";
}

export default async function PracticeMistakesPage() {
  const cookieStore = await cookies();
  const courseId = getCourseId(cookieStore.get("slovakStudyActiveCourse")?.value);

  return (
    <CourseGate>
      <MistakesClient courseId={courseId} />
    </CourseGate>
  );
}

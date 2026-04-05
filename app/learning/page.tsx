import type { Metadata } from "next";
import { cookies } from "next/headers";

import LearningClient from "./LearningClient";
import { CEFR_LEVELS, type CefrBand, type CefrBandId } from "./data";
import { getLessonsByBand } from "@/app/learning/courses/registry";
import { SITE_URL } from "@/lib/site";
import CourseGate from "@/app/components/CourseGate";

export const metadata: Metadata = {
  title: "Вивчення мов по рівнях A0–B2 | Flunio",
  description:
    "Навчання мов онлайн: рівні A0–B2, уроки по 10 слів, вправи та прогрес. Вивчай словацьку та чеську системно.",

  alternates: {
    canonical: `${SITE_URL}/learning`,
  },

  openGraph: {
    title: "Навчання по рівнях A0–B2 | Flunio",
    description:
      "Уроки по рівнях A0–B2, вправи та прогрес. Вивчай словацьку та чеську системно.",
    url: `${SITE_URL}/learning`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const COURSE_COOKIE_KEY = "slovakStudyActiveCourse";

function toCourseBands(courseId: string): CefrBand[] {
  const safeCourseId = courseId === "cs" || courseId === "pl" ? courseId : "sk";
  const lessonsByBand = getLessonsByBand(safeCourseId);

  return CEFR_LEVELS.map((band) => {
    const lessons = lessonsByBand[band.id as CefrBandId] ?? [];

    return {
      ...band,
      lessons: lessons.map((lesson, idx) => ({
        id: `${band.id}-${idx + 1}`,
        title: lesson.title,
        wordsCount: lesson.words.length > 0 ? lesson.words.length : 10,
      })),
    };
  });
}

export default async function LearningPage() {
  const cookieStore = await cookies();
  const activeCourse = cookieStore.get(COURSE_COOKIE_KEY)?.value ?? "sk";
  const bands = toCourseBands(activeCourse);

  return (
    <CourseGate>
      <LearningClient bands={bands} />
    </CourseGate>
  );
}
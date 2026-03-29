import type { Metadata } from "next";
import { cookies } from "next/headers";

import LearningClient from "./LearningClient";
import { CEFR_LEVELS, type CefrBand, type CefrBandId } from "./data";
import { getLessonsByBand } from "@/app/learning/courses/registry";
import { SITE_URL } from "@/lib/site";
import CourseGate from "@/app/components/CourseGate";

export const metadata: Metadata = {
  title: "Курси мов A0–B2 | Flunio",
  description:
    "Онлайн курси мов у Flunio: словацька та чеська, рівні A0–B2, уроки по 10 слів, вправи та прогрес. Почни навчання системно.",

  alternates: {
    canonical: `${SITE_URL}/learning`,
  },

  openGraph: {
    title: "Курси мов A0–B2 | Flunio",
    description:
      "Словацька та чеська мови онлайн: рівні A0–B2, уроки, вправи та прогрес в одній платформі.",
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
      <div>
        <LearningClient bands={bands} />

        {/* ✅ SEO internal links */}
        <section className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Вивчай мову повністю
          </h2>

          <div className="flex flex-col gap-2 items-center">
            <a href="/learn-slovak" className="text-blue-600 hover:underline">
              🇸🇰 Словацька мова онлайн
            </a>

            <a href="/learn-czech" className="text-blue-600 hover:underline">
              🇨🇿 Чеська мова онлайн
            </a>
          </div>
        </section>
      </div>
    </CourseGate>
  );
}
import type { Metadata } from "next";
import { cookies } from "next/headers";
import DictionaryClient from "./DictionaryClient";
import { SITE_URL } from "@/lib/site";
import CourseGate from "@/app/components/CourseGate";
import { getDictionaryForCourse } from "@/app/learning/courses/dictionary";
import SeoHubLinks from "@/app/components/SeoHubLinks";

export const metadata: Metadata = {
  title: "Slovak, Czech & Polish Online Dictionary | Flunio",
  description:
    "Search Slovak, Czech and Polish words with translations, pronunciation and examples. Use the Flunio online dictionary together with lessons and vocabulary guides.",

  alternates: {
    canonical: `${SITE_URL}/dictionary`,
  },

  openGraph: {
    title: "Slovak, Czech & Polish Online Dictionary | Flunio",
    description:
      "Search Slovak, Czech and Polish words with translations, pronunciation, examples and links to beginner vocabulary guides.",
    url: `${SITE_URL}/dictionary`,
    siteName: "Flunio",
    type: "website",
    images: ["/opengraph-image"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Slovak, Czech & Polish Online Dictionary | Flunio",
    description:
      "Search Slovak, Czech and Polish words with translations, pronunciation, examples and links to beginner vocabulary guides.",
    images: ["/opengraph-image"],
  },

  robots: { index: true, follow: true },
};

type DictionaryWord = {
  key?: string;
  term?: string;
  sk?: string;
  ua?: string;
  ru?: string;
  en?: string;
  ipa?: string;
};

function getCourseIdFromCookie(value?: string): "sk" | "cs" | "pl" {
  if (value === "cs") return "cs";
  if (value === "pl") return "pl";
  return "sk";
}

export default async function DictionaryPage() {
  const cookieStore = await cookies();
  const activeCourseCookie = cookieStore.get("slovakStudyActiveCourse")?.value;
  const courseId = getCourseIdFromCookie(activeCourseCookie);

  const dictionary = getDictionaryForCourse(courseId) as DictionaryWord[];

  return (
    <>
      <CourseGate>
        <DictionaryClient
          initialCourseId={courseId}
          initialDictionary={dictionary}
        />
      </CourseGate>

      <SeoHubLinks kind="dictionary" />
    </>
  );
}
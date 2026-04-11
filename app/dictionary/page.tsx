import type { Metadata } from "next";
import { cookies } from "next/headers";
import DictionaryClient from "./DictionaryClient";
import { SITE_URL } from "@/lib/site";
import CourseGate from "@/app/components/CourseGate";
import { getDictionaryForCourse } from "@/app/learning/courses/dictionary";

export const metadata: Metadata = {
  title: "Online dictionary | Flunio",
  description:
    "Flunio online dictionary: word translations, pronunciation, examples, and convenient search for learning Slovak and Czech.",

  alternates: {
    canonical: `${SITE_URL}/dictionary`,
  },

  openGraph: {
    title: "Online dictionary | Flunio",
    description:
      "Word translations, pronunciation, examples, and convenient search for learning Slovak and Czech.",
    url: `${SITE_URL}/dictionary`,
    siteName: "Flunio",
    type: "website",
    images: ["/opengraph-image"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Online dictionary | Flunio",
    description:
      "Word translations, pronunciation, examples, and convenient search for learning Slovak and Czech.",
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
    <CourseGate>
      <DictionaryClient initialCourseId={courseId} initialDictionary={dictionary} />
    </CourseGate>
  );
}
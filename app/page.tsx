import type { Metadata } from "next";
import { cookies } from "next/headers";
import HomeContent from "./HomeContent";
import { SITE_URL } from "@/lib/site";
import { UPDATES } from "@/app/updates/updates";
import {
  DEFAULT_LANG,
  LANG_STORAGE_KEY,
  normalizeLang,
  type Lang,
} from "@/lib/src/language";

export const metadata: Metadata = {
  title: "Flunio — вивчення мов онлайн (A0–B2)",

  description:
    "Flunio — онлайн платформа для вивчення мов: словацька та чеська, уроки A0–B2, словник, граматика з прикладами, вправи та озвучка.",

  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      uk: `${SITE_URL}/`,
      ru: `${SITE_URL}/`,
      en: `${SITE_URL}/`,
      "x-default": `${SITE_URL}/`,
    },
  },

  openGraph: {
    title: "Flunio — вивчення мов онлайн",
    description:
      "Вивчай словацьку та чеську онлайн: уроки A0–B2, словник, граматика з прикладами, вправи та озвучка.",
    url: `${SITE_URL}/`,
    siteName: "Flunio",
    type: "website",
    images: ["/opengraph-image"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Flunio — вивчення мов онлайн",
    description:
      "Словацька та Чеська мови онлайн: уроки A0–B2, граматика, словник, вправи та озвучка.",
    images: ["/opengraph-image"],
  },

  robots: { index: true, follow: true },
};

const COURSE_COOKIE_KEY = "slovakStudyActiveCourse";

export default async function HomePage() {
  const cookieStore = await cookies();

  const latestDate = UPDATES[0]?.date;
  const latestBadge = latestDate
    ? latestDate.slice(5).replace("-", ".").split(".").reverse().join(".")
    : null;

  const langCookie = cookieStore.get(LANG_STORAGE_KEY)?.value;
  const lang: Lang = langCookie ? normalizeLang(langCookie) : DEFAULT_LANG;

  const rawCourseId = cookieStore.get(COURSE_COOKIE_KEY)?.value;
  const courseId = rawCourseId ?? "sk";

  return (
    <HomeContent
      latestBadge={latestBadge}
      lang={lang}
      courseId={courseId}
    />
  );
}
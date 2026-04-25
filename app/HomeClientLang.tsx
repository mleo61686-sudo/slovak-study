"use client";

import HomeContent from "./HomeContent";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";

export default function HomeClientLang({
  latestBadge,
  initialLang,
  courseId,
}: {
  latestBadge: string | null;
  initialLang: Lang;
  courseId: string;
}) {
  const { lang } = useLanguage();

  const activeLang: Lang =
    lang === "ru" ? "ru" : lang === "en" ? "en" : initialLang;

  return (
    <HomeContent
      latestBadge={latestBadge}
      lang={activeLang}
      courseId={courseId}
    />
  );
}
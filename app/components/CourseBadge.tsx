"use client";

import { useActiveCourse } from "@/hooks/useActiveCourse";

type CourseKey = "sk" | "cs" | "pl";

const COURSE_META: Record<
  CourseKey,
  { code: string; flag: string; alt: string }
> = {
  sk: {
    code: "SK",
    flag: "https://flagcdn.com/w40/sk.png",
    alt: "Slovakia flag",
  },
  cs: {
    code: "CS",
    flag: "https://flagcdn.com/w40/cz.png",
    alt: "Czech Republic flag",
  },
  pl: {
    code: "PL",
    flag: "https://flagcdn.com/w40/pl.png",
    alt: "Poland flag",
  },
};

export default function CourseBadge() {
  const { course, ready } = useActiveCourse();
  const c: CourseKey = (ready ? (course as CourseKey) : "sk") || "sk";
  const meta = COURSE_META[c] ?? COURSE_META.sk;

  return (
    <span className="inline-flex items-center gap-2">
      <img
        src={meta.flag}
        alt={meta.alt}
        className="h-7 w-10 rounded-[4px] border border-slate-200 object-cover shrink-0"
      />
      <span className="text-sm font-semibold uppercase">{meta.code}</span>
    </span>
  );
}
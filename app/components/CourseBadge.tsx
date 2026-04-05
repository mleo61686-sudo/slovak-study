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
    code: "CZ",
    flag: "https://flagcdn.com/w40/cz.png",
    alt: "Czech Republic flag",
  },
  pl: {
    code: "PL",
    flag: "https://flagcdn.com/w40/pl.png",
    alt: "Poland flag",
  },
};

function isCourseKey(value: string): value is CourseKey {
  return value === "sk" || value === "cs" || value === "pl";
}

export default function CourseBadge() {
  const { course, ready } = useActiveCourse();

  const safeCourse: CourseKey =
    ready && isCourseKey(course) ? course : "sk";

  const meta = COURSE_META[safeCourse];

  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="shrink-0 overflow-hidden rounded-md ring-1 ring-slate-200 shadow-sm">
        <img
          src={meta.flag}
          alt={meta.alt}
          className="h-5 w-7 object-cover"
        />
      </span>

      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
        {meta.code}
      </span>
    </span>
  );
}
"use client";

import { useActiveCourse } from "@/hooks/useActiveCourse";

function getFlag(course: string) {
  switch (course) {
    case "cs":
      return "🇨🇿";
    case "pl":
      return "🇵🇱";
    case "sk":
    default:
      return "🇸🇰";
  }
}

export default function CourseBadge() {
  const { course, ready } = useActiveCourse();
  const c = (ready ? course : "sk") || "sk";

  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-xl">{getFlag(c)}</span>
      <span className="text-sm font-semibold uppercase">{c}</span>
    </span>
  );
}
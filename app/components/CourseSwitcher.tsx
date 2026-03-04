"use client";

import { COURSES } from "@/lib/course";
import { useActiveCourse } from "@/hooks/useActiveCourse";

export function CourseSwitcher() {
  const { course, setCourse, ready } = useActiveCourse();

  if (!ready) return null;

  return (
    <div className="px-4 py-3">
      <div className="text-xs text-slate-500 mb-1">Course</div>

      <select
        value={course}
        onChange={(e) => setCourse(e.target.value as any)}
        className="h-10 w-full rounded-xl border bg-white px-3 text-sm"
      >
        {COURSES.map((c) => (
          <option key={c.id} value={c.id} disabled={!c.enabled}>
            {c.title} {c.enabled ? "" : "• Coming soon"}
          </option>
        ))}
      </select>
    </div>
  );
}
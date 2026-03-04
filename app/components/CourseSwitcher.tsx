"use client";

import { COURSE_REGISTRY, COURSES, type CourseId } from "@/app/learning/courses/registry";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

type Props = {
  onChanged?: () => void;
};

export function CourseSwitcher({ onChanged }: Props) {
  const { courseId, setActiveCourse } = useActiveCourse();

  return (
    <div className="px-4 py-3">
      <div className="mb-1 text-xs text-slate-500">Course</div>

      <select
        value={courseId}
        onChange={(e) => {
          const next = e.target.value as CourseId;
          const def = COURSE_REGISTRY[next];
          if (!def) return;

          if (def.status !== "live") return;

          setActiveCourse(next);
          onChanged?.();
        }}
        className="h-10 w-full rounded-xl border bg-white px-3 text-sm"
      >
        {COURSES.map((id) => {
          const c = COURSE_REGISTRY[id];
          const isLive = c.status === "live";
          return (
            <option key={c.id} value={c.id} disabled={!isLive}>
              {c.emoji} {c.title} {isLive ? "" : "• Coming soon"}
            </option>
          );
        })}
      </select>
    </div>
  );
}
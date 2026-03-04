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
                onChange={(e) => {
                    const next = e.target.value as any;
                    const def = COURSES.find((x) => x.id === next);
                    if (!def || !def.enabled) return; // не даємо вибрати coming soon
                    setCourse(next);
                }}
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
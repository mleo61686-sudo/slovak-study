"use client";


import { COURSES } from "@/lib/course";
import {
  setStoredCourseId,
  type CourseId,
} from "@/app/learning/courses/useActiveCourse";

export default function LearnPage() {


  function chooseCourse(id: string, enabled: boolean) {
    if (!enabled) return;

    setStoredCourseId(id as CourseId);
    window.location.href = "/learning";
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Choose a language</h1>
      <p className="mt-2 text-slate-600">
        Pick what you want to learn. You can change it anytime.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {COURSES.map((c) => (
          <button
            key={c.id}
            onClick={() => chooseCourse(c.id, c.enabled)}
            className="rounded-2xl border bg-white p-4 text-left hover:shadow-sm disabled:opacity-60"
            disabled={!c.enabled}
            type="button"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{c.title}</div>
                <div className="text-sm text-slate-500">{c.subtitle}</div>
              </div>

              {!c.enabled && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  Coming soon
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
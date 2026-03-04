"use client";

import { COURSES, COURSE_STORAGE_KEY } from "@/lib/course";
import { useRouter } from "next/navigation";

export default function LearnPage() {
  const router = useRouter();

  function chooseCourse(id: string, enabled: boolean) {
    if (!enabled) return;

    localStorage.setItem(COURSE_STORAGE_KEY, id);

    router.push("/learning");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Choose a language</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {COURSES.map((c) => (
          <button
            key={c.id}
            onClick={() => chooseCourse(c.id, c.enabled)}
            className="rounded-2xl border bg-white p-4 text-left hover:shadow-sm"
          >
            <div className="text-lg font-semibold">{c.title}</div>
            <div className="text-sm text-slate-500">{c.subtitle}</div>

            {!c.enabled && (
              <div className="mt-2 text-xs text-slate-400">
                Coming soon
              </div>
            )}
          </button>
        ))}
      </div>
    </main>
  );
}
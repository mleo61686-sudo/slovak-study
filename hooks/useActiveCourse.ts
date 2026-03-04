"use client";

import { useEffect, useState } from "react";
import type { CourseId } from "@/lib/course";
import { COURSE_STORAGE_KEY, getDefaultCourse } from "@/lib/course";

export function useActiveCourse() {
  const [course, setCourse] = useState<CourseId>(getDefaultCourse());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COURSE_STORAGE_KEY) as CourseId | null;
      if (saved) setCourse(saved);
    } finally {
      setReady(true);
    }
  }, []);

  function updateCourse(next: CourseId) {
    setCourse(next);
    try {
      localStorage.setItem(COURSE_STORAGE_KEY, next);
      // подія на майбутнє (щоб інші компоненти могли реагувати)
      window.dispatchEvent(new CustomEvent("slovakStudy:courseChanged", { detail: next }));
    } catch {}
  }

  return { course, setCourse: updateCourse, ready };
}
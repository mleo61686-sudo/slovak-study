"use client";

import { useEffect, useState } from "react";
import type { CourseId } from "@/lib/course";
import { COURSE_STORAGE_KEY, getDefaultCourse } from "@/lib/course";

function readStoredCourse(): CourseId {
  if (typeof window === "undefined") {
    return getDefaultCourse();
  }

  try {
    const saved = localStorage.getItem(COURSE_STORAGE_KEY) as CourseId | null;
    return saved ?? getDefaultCourse();
  } catch {
    return getDefaultCourse();
  }
}

export function useActiveCourse() {
  const [course, setCourseState] = useState<CourseId>(getDefaultCourse());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const syncCourse = () => {
      setCourseState(readStoredCourse());
      setReady(true);
    };

    syncCourse();

    function handleStorage(e: Event) {
      if (e instanceof StorageEvent) {
        if (e.key && e.key !== COURSE_STORAGE_KEY) return;
      }
      syncCourse();
    }

    function handleCourseChanged() {
      syncCourse();
    }

    window.addEventListener("storage", handleStorage);
    window.addEventListener(
      "slovakStudy:courseChanged",
      handleCourseChanged as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(
        "slovakStudy:courseChanged",
        handleCourseChanged as EventListener
      );
    };
  }, []);

  function updateCourse(next: CourseId) {
    setCourseState(next);

    try {
      localStorage.setItem(COURSE_STORAGE_KEY, next);
      window.dispatchEvent(
        new CustomEvent("slovakStudy:courseChanged", { detail: next })
      );
      window.dispatchEvent(new Event("slovakStudy:progressChanged"));
    } catch {}
  }

  return { course, setCourse: updateCourse, ready };
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { COURSE_REGISTRY } from "./registry";

const LS_KEY = "slovakStudy.activeCourse";
const COOKIE_KEY = "slovakStudyActiveCourse";

// CourseId автоматично береться з ключів COURSE_REGISTRY
export type CourseId = keyof typeof COURSE_REGISTRY;

const ALL_COURSE_IDS = Object.keys(COURSE_REGISTRY) as CourseId[];

// дефолт: якщо є "sk" — беремо його, інакше перший ключ
const DEFAULT_COURSE_ID: CourseId =
  (("sk" as CourseId) in COURSE_REGISTRY ? ("sk" as CourseId) : ALL_COURSE_IDS[0]);

function isCourseId(x: string): x is CourseId {
  return (ALL_COURSE_IDS as readonly string[]).includes(x);
}

export function getStoredCourseId(): CourseId {
  if (typeof window === "undefined") return DEFAULT_COURSE_ID;
  const raw = window.localStorage.getItem(LS_KEY);
  if (raw && isCourseId(raw)) return raw;
  return DEFAULT_COURSE_ID;
}

export function setStoredCourseId(courseId: CourseId) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_KEY, courseId);
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(courseId)}; path=/; max-age=31536000; samesite=lax`;
  window.dispatchEvent(
    new CustomEvent("slovakStudy:courseChanged", { detail: { courseId } })
  );
}

export function useActiveCourse() {
  const [courseId, setCourseId] = useState<CourseId>(DEFAULT_COURSE_ID);

  useEffect(() => {
    setCourseId(getStoredCourseId());

    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY && typeof e.newValue === "string" && isCourseId(e.newValue)) {
        setCourseId(e.newValue);
      }
    };

    const onCustom = (e: Event) => {
      const ce = e as CustomEvent<{ courseId?: string }>;
      const next = ce.detail?.courseId;
      if (next && isCourseId(next)) setCourseId(next);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("slovakStudy:courseChanged", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("slovakStudy:courseChanged", onCustom);
    };
  }, []);

  const setActiveCourse = (next: CourseId) => {
    setCourseId(next);
    setStoredCourseId(next);
  };

  // зручно мати об'єкт курсу
  const course = useMemo(() => COURSE_REGISTRY[courseId], [courseId]);

  return { courseId, course, setActiveCourse, allCourseIds: ALL_COURSE_IDS };
}
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { COURSE_STORAGE_KEY, getDefaultCourse } from "@/lib/course";

export default function CourseBootstrap() {
  const pathname = usePathname();

  useEffect(() => {
    // ❌ не чіпаємо learn (логіка вибору курсу)
    if (pathname === "/learn") return;

    try {
      const saved = localStorage.getItem(COURSE_STORAGE_KEY);

      // ✅ якщо вже є — нічого не робимо (важливо!)
      if (saved) return;

      const def = getDefaultCourse();

      localStorage.setItem(COURSE_STORAGE_KEY, def);

      // ✅ одразу повідомляємо всі компоненти
      window.dispatchEvent(
        new CustomEvent("slovakStudy:courseChanged", { detail: def })
      );
    } catch {}
  }, [pathname]);

  return null;
}
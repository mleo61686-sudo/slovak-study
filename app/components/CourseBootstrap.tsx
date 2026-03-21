/**
 * CourseBootstrap – клієнтський bootstrap для активного курсу.
 * Що робить:
 * При першому завантаженні перевіряє localStorage і, якщо курс
 * не встановлений, автоматично ставить default курс (Slovak).
 * Пов’язані файли:
 * - lib/course.ts
 * - CourseSwitcher
 * - CourseGate
 * Роль у Flunio:
 * Забезпечує стабільний activeCourse для multi-course системи.
 */

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { COURSE_STORAGE_KEY, getDefaultCourse } from "@/lib/course";

export default function CourseBootstrap() {
  const pathname = usePathname();

  useEffect(() => {
    // не чіпаємо /learn (щоб не зациклюватись)
    if (pathname === "/learn") return;

    const saved = localStorage.getItem(COURSE_STORAGE_KEY);

    // ✅ якщо курсу нема — тихо ставимо Slovak і все
    if (!saved) {
      localStorage.setItem(COURSE_STORAGE_KEY, getDefaultCourse());
    }
  }, [pathname]);

  return null;
}
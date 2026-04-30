"use client";

import { usePathname } from "next/navigation";

export default function MainShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLessonPage = /^\/learning\/(a0|a1|a2|b1|b2)-\d+$/i.test(pathname);

  return (
    <main
      className={[
        "mx-auto w-full max-w-6xl px-4 text-white",
        "transition-colors duration-300",
        isLessonPage
          ? "min-h-[70vh] py-4"
          : "flex-1 py-8 sm:py-12",
      ].join(" ")}
    >
      {children}
    </main>
  );
}
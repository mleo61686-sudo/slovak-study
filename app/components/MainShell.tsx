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
        "mx-auto w-full max-w-6xl flex-1 px-4 theme-text",
        "transition-colors duration-300",
        isLessonPage ? "min-h-[calc(100vh-170px)] py-4" : "py-8 sm:py-12",
      ].join(" ")}
    >
      {children}
    </main>
  );
}
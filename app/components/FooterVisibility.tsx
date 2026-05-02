"use client";

import { usePathname } from "next/navigation";
import FooterClient from "./FooterClient";

function shouldHideFooter(pathname: string) {
  // Ховаємо footer тільки на сторінках конкретних уроків:
  // /learning/a0-1
  // /learning/a1-12
  // /learning/b2-50
  //
  // Але НЕ ховаємо на /learning, /learn, /grammar, /dictionary тощо.
  return /^\/learning\/[^/]+$/.test(pathname);
}

export default function FooterVisibility() {
  const pathname = usePathname();

  if (shouldHideFooter(pathname)) {
    return null;
  }

  return <FooterClient />;
}
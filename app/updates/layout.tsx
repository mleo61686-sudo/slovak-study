import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/updates`;

export const metadata: Metadata = {
  title: "Оновлення Flunio | Нові уроки та покращення",
  description:
    "Останні оновлення Flunio: нові уроки словацької, чеської та польської мов, вправи, озвучка й покращення платформи.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Оновлення Flunio | Нові уроки та покращення",
    description:
      "Дізнавайтеся про нові уроки, вправи, озвучку та інші покращення платформи Flunio.",
    url: PAGE_URL,
    siteName: "Flunio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Оновлення Flunio",
    description:
      "Нові уроки, вправи, озвучка та покращення платформи Flunio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function UpdatesLayout({ children }: { children: ReactNode }) {
  return children;
}
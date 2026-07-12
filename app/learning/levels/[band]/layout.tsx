import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SITE_URL } from "@/lib/site";

type BandId = "a0" | "a1" | "a2" | "b1" | "b2";

type BandSeo = {
  title: string;
  description: string;
};

const BAND_SEO: Record<BandId, BandSeo> = {
  a0: {
    title: "Рівень A0 — безкоштовні уроки для початківців | Flunio",
    description:
      "Почніть вивчати словацьку, чеську або польську з нуля: базові слова, озвучка та інтерактивні вправи рівня A0 у Flunio.",
  },
  a1: {
    title: "Рівень A1 — базові мовні уроки онлайн | Flunio",
    description:
      "Уроки рівня A1 у Flunio: повсякденна лексика, короткі фрази, озвучка та вправи зі словацької, чеської або польської мови.",
  },
  a2: {
    title: "Рівень A2 — уроки для впевненого спілкування | Flunio",
    description:
      "Розвивайте словниковий запас і навички спілкування на рівні A2 зі словацької, чеської або польської мови у Flunio.",
  },
  b1: {
    title: "Рівень B1 — мовні уроки середнього рівня | Flunio",
    description:
      "Уроки рівня B1 у Flunio допомагають краще розуміти живу мову, будувати речення та впевненіше спілкуватися.",
  },
  b2: {
    title: "Рівень B2 — поглиблені мовні уроки онлайн | Flunio",
    description:
      "Поглиблені уроки рівня B2 зі словацької, чеської або польської мови: складніша лексика, фрази та практика у Flunio.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ band: string }>;
}): Promise<Metadata> {
  const { band: rawBand } = await params;
  const band = rawBand.toLowerCase() as BandId;
  const seo = BAND_SEO[band];

  if (!seo) {
    return {
      title: "Рівень не знайдено | Flunio",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = `${SITE_URL}/learning/levels/${band}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: "Flunio",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BandLayout({ children }: { children: ReactNode }) {
  return children;
}
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import Navbar from "./components/Navbar";
import SessionProviderClient from "./components/SessionProviderClient";
import ProgressSync from "./components/ProgressSync";
import SrsSync from "./components/SrsSync";
import CourseBootstrap from "@/app/components/CourseBootstrap";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://flunio.com"),

  title: {
    default: "Flunio — вивчення мов онлайн",
    template: "%s | Flunio",
  },

  description:
    "Flunio — онлайн платформа для вивчення мов: словацька та чеська, уроки A0–B2, граматика, словник, вправи та озвучка.",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [{ url: "/favicon.ico" }],
  },

  openGraph: {
    title: "Flunio — вивчення мов онлайн",
    description:
      "Вивчай словацьку та чеську онлайн: уроки A0–B2, граматика, словник, вправи та озвучка.",
    url: "/",
    siteName: "Flunio",
    type: "website",
    images: ["/opengraph-image"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Flunio — вивчення мов онлайн",
    description:
      "Словацька та чеська онлайн: уроки A0–B2, граматика, словник, вправи та озвучка.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const revalidate = 3600;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://flunio.com/#organization",
        name: "Flunio",
        url: "https://flunio.com/",
        logo: "https://flunio.com/logo.png",
      },
      {
        "@type": "WebSite",
        "@id": "https://flunio.com/#website",
        url: "https://flunio.com/",
        name: "Flunio",
        publisher: { "@id": "https://flunio.com/#organization" },
        inLanguage: ["uk", "ru"],
        description:
          "Онлайн платформа для вивчення мов зі словацьким і чеським курсами, граматикою, словником і вправами.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://flunio.com/dictionary?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "EducationalWebSite",
        "@id": "https://flunio.com/#educational-website",
        url: "https://flunio.com/",
        name: "Flunio",
        description:
          "Онлайн платформа для вивчення мов: словацька та чеська, уроки A0–B2, граматика, словник, вправи та практика.",
        inLanguage: ["uk", "ru"],
        educationalUse: "language learning",
      },
    ],
  };

  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-1760161415033749"
        />

        <link rel="alternate" hrefLang="uk" href="https://flunio.com/" />
        <link rel="alternate" hrefLang="ru" href="https://flunio.com/ru/" />
        <link rel="alternate" hrefLang="x-default" href="https://flunio.com/" />

        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1760161415033749"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>

      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <CourseBootstrap />
        <Navbar />

        <SessionProviderClient>
          <ProgressSync />
          <SrsSync />

          <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
            {children}
          </main>
        </SessionProviderClient>

        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Flunio — вивчай мови щодня.</div>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a className="hover:underline" href="/learn">
                Курси
              </a>
              <a className="hover:underline" href="/grammar">
                Граматика
              </a>
              <a className="hover:underline" href="/dictionary">
                Словник
              </a>
              <a className="hover:underline" href="/practice">
                Тренажер
              </a>
              <a className="hover:underline" href="/support">
                Підтримка
              </a>
            </div>
          </div>
        </footer>

        <SpeedInsights />
      </body>
    </html>
  );
}
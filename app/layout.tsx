import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import Navbar from "./components/Navbar";
import FooterClient from "./components/FooterClient"; // 👈 ДОДАНО
import SessionProviderClient from "./components/SessionProviderClient";
import ProgressSync from "./components/ProgressSync";
import SrsSync from "./components/SrsSync";
import CourseBootstrap from "@/app/components/CourseBootstrap";
import MainShell from "@/app/components/MainShell";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OnboardingOverlay from "./components/OnboardingOverlay";

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
    languages: {
      uk: "/",
      ru: "/",
      en: "/",
      "x-default": "/",
    },
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
      "Словацька та чеська мови онлайн: уроки A0–B2, граматика, словник, вправи та озвучка.",
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
        inLanguage: ["uk", "ru", "en"],
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
        inLanguage: ["uk", "ru", "en"],
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
        <link rel="alternate" hrefLang="ru" href="https://flunio.com/" />
        <link rel="alternate" hrefLang="en" href="https://flunio.com/" />
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
        <SessionProviderClient>
          <CourseBootstrap />
          <Navbar />
          <ProgressSync />
          <SrsSync />
          <OnboardingOverlay />

          <MainShell>{children}</MainShell>
        </SessionProviderClient>

        <FooterClient />

        <SpeedInsights />
      </body>
    </html>
  );
}
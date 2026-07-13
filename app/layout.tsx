import "./globals.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";

import Navbar from "./components/Navbar";
import FooterVisibility from "./components/FooterVisibility";
import SessionProviderClient from "./components/SessionProviderClient";
import ProgressSync from "./components/ProgressSync";
import SrsSync from "./components/SrsSync";
import ActivityTracker from "./components/ActivityTracker";
import CourseBootstrap from "@/app/components/CourseBootstrap";
import MainShell from "@/app/components/MainShell";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OnboardingOverlay from "./components/OnboardingOverlay";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://flunio.com"),

  title: "Flunio — вивчення мов онлайн",

  description:
    "Flunio — онлайн-платформа для вивчення словацької, чеської та польської мов: уроки A0–B2, граматика, словник, вправи й озвучка.",

  icons: {
    icon: [{ url: "/favicon.ico" }],
  },

  openGraph: {
    title: "Flunio — вивчення мов онлайн",
    description:
      "Вивчай словацьку, чеську та польську онлайн: уроки A0–B2, граматика, словник, вправи й озвучка.",
    siteName: "Flunio",
    type: "website",
    images: ["/opengraph-image"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Flunio — вивчення мов онлайн",
    description:
      "Словацька, чеська та польська онлайн: уроки A0–B2, граматика, словник, вправи й озвучка.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
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
        logo: "https://flunio.com/icon.png",
      },
      {
        "@type": "WebSite",
        "@id": "https://flunio.com/#website",
        url: "https://flunio.com/",
        name: "Flunio",
        publisher: {
          "@id": "https://flunio.com/#organization",
        },
        inLanguage: ["uk", "ru", "en"],
        description:
          "Онлайн-платформа для вивчення мов зі словацьким, чеським і польським курсами, граматикою, словником і вправами.",
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


        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrg),
          }}
        />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1760161415033749"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>

      <body
        suppressHydrationWarning
        className="theme-flunio min-h-screen"
      >
        <SessionProviderClient>
          <div className="flex min-h-screen flex-col">
            <CourseBootstrap />
            <ActivityTracker />
            <Navbar />
            <ProgressSync />
            <SrsSync />
            <OnboardingOverlay />

            <MainShell>{children}</MainShell>

            <FooterVisibility />
          </div>
        </SessionProviderClient>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

import Navbar from "./components/Navbar";
import SessionProviderClient from "./components/SessionProviderClient";
import TopBanner from "./components/TopBanner";
import ProgressSync from "./components/ProgressSync";
import SrsSync from "./components/SrsSync";
import CourseBootstrap from "@/app/components/CourseBootstrap";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://slovak-study.com"),

  title: {
    default: "Slovak Study — словацька мова онлайн",
    template: "%s | Slovak Study",
  },

  description:
    "Slovak Study — онлайн навчання словацької мови: уроки A0–B2, граматика з прикладами, словник, вправи та озвучка.",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [{ url: "/favicon.ico" }],
  },

  openGraph: {
    title: "Slovak Study — словацька мова онлайн",
    description:
      "Уроки A0–B2, граматика з прикладами, словник та вправи для практики. Онлайн навчання словацької мови.",
    url: "/",
    siteName: "Slovak Study",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Slovak Study — словацька мова онлайн",
    description:
      "Уроки A0–B2, граматика, словник та вправи. Вчи словацьку системно.",
    images: ["/opengraph-image"],
  },

  robots: { index: true, follow: true },
};

export const viewport = {
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
        "@id": "https://slovak-study.com/#organization",
        name: "Slovak Study",
        url: "https://slovak-study.com/",
        logo: "https://slovak-study.com/logo.png",
      },
      {
        "@type": "WebSite",
        "@id": "https://slovak-study.com/#website",
        url: "https://slovak-study.com/",
        name: "Slovak Study",
        publisher: { "@id": "https://slovak-study.com/#organization" },
        inLanguage: ["uk", "ru"],
        potentialAction: {
          "@type": "SearchAction",
          target: "https://slovak-study.com/dictionary?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
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

        <link rel="alternate" hrefLang="uk" href="https://slovak-study.com/" />
        <link rel="alternate" hrefLang="ru" href="https://slovak-study.com/ru/" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://slovak-study.com/"
        />

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

        <TopBanner />
        <Navbar />

        <SessionProviderClient>
          <ProgressSync />
          <SrsSync />

          <main className="flex-1 mx-auto max-w-4xl px-4 py-8 sm:py-12">
            {children}
          </main>
        </SessionProviderClient>

        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              © {new Date().getFullYear()} Slovak Study — вчи словацьку щодня.
            </div>

            <div className="flex flex-wrap gap-4">
              <a className="hover:underline" href="/slovak-for-ukrainians">
                Словацька для українців
              </a>

              <a
                className="hover:underline"
                href="/vyvchennia-slovatskoi-movy-online"
              >
                Вивчення словацької онлайн
              </a>

              <a className="hover:underline" href="/ru/slovak-for-ukrainians">
                Словацкий для украинцев
              </a>

              <a
                className="hover:underline"
                href="/ru/vyvchennia-slovatskoi-movy-online"
              >
                Изучение словацкого онлайн
              </a>
            </div>
          </div>
        </footer>

        <SpeedInsights />
      </body>
    </html>
  );
}
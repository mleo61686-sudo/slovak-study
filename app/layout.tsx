import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "./components/Navbar";
import ProgressSync from "./components/ProgressSync";
import SessionProviderClient from "./components/SessionProviderClient";
import TopBanner from "./components/TopBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://slovak-study.com"),
  title: "Slovak Study — вивчення словацької",
  description: "Граматика, словник і тренажер для україномовних.",

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        {/* ✅ AdSense meta verification */}
        <meta
          name="google-adsense-account"
          content="ca-pub-1760161415033749"
        />

        {/* AdSense script (можна залишити) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1760161415033749"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>

      <body>
        <TopBanner />
        <Navbar />

        <SessionProviderClient>
          <ProgressSync />
          <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
            {children}
          </main>
        </SessionProviderClient>

        <footer className="mt-auto">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
            © {new Date().getFullYear()} Slovak Study — вчи словацьку щодня.
          </div>
        </footer>
      </body>
    </html>
  );
}
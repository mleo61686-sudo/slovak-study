import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import ProgressSync from "./components/ProgressSync";
import SessionProviderClient from "./components/SessionProviderClient";
import TopBanner from "./components/TopBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://slovak-study.com"),
  title: "Slovak Study — вивчення словацької",
  description: "Граматика, словник і тренажер для україномовних.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="min-h-screen flex flex-col">
        <TopBanner />
        <Navbar />

        <SessionProviderClient>
          <ProgressSync />
          <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12 flex-1">
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
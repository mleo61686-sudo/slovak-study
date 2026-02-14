import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import ProgressSync from "./components/ProgressSync";
import SessionProviderClient from "./components/SessionProviderClient";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export const metadata: Metadata = {
  title: "Slovak Study — вивчення словацької",
  description: "Граматика, словник і тренажер для україномовних.",
  colorScheme: "light",
  verification: {
    google: "Vf__jszEN37vi_wmJQYr10o8iZFtAInen8V__txW3Ds",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" style={{ colorScheme: "light" }}>
      <body
        className="min-h-dvh text-slate-900 overflow-x-hidden
  bg-[radial-gradient(ellipse_at_top,_#f8fafc_0%,_#f1f5f9_40%,_#e2e8f0_100%)]"
        suppressHydrationWarning
      >
        <Navbar />

        <SessionProviderClient>
          <ProgressSync />

          <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
            {children}
          </main>
        </SessionProviderClient>

        <footer className="border-t bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
            © {new Date().getFullYear()} Slovak Study — вчи словацьку щодня.
          </div>
        </footer>
      </body>
    </html>
  );
}

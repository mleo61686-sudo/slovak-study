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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" style={{ colorScheme: "light" }}>
      <body
        className="min-h-dvh bg-slate-50 text-slate-900 overflow-x-hidden"
        suppressHydrationWarning
      >
        <Navbar />

        <SessionProviderClient>
          <ProgressSync />

          <main className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
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

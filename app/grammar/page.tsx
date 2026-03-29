import type { Metadata } from "next";
import Link from "next/link";
import GrammarClient from "./GrammarClient";
import CourseGate from "@/app/components/CourseGate";

export const metadata: Metadata = {
  title: "Граматика | Flunio",
  description:
    "Граматика словацької та чеської мов: алфавіт, відмінки, дієслова, приклади речень та міні-вправи.",
  alternates: {
    canonical: "https://flunio.com/grammar",
  },
  openGraph: {
    title: "Граматика — Flunio",
    description:
      "Алфавіт, відмінки, дієслова та приклади речень для словацької й чеської мов.",
    url: "https://flunio.com/grammar",
    siteName: "Flunio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GrammarPage() {
  return (
    <CourseGate>
      <div className="space-y-12">
        <GrammarClient />

        <section className="text-center">
          <h2 className="mb-4 text-xl font-semibold">
            Почни повне навчання мови
          </h2>

          <div className="flex flex-col items-center gap-2">
            <Link
              href="/learn-slovak"
              className="text-blue-600 hover:underline"
            >
              🇸🇰 Вивчення словацької мови онлайн
            </Link>

            <Link
              href="/learn-czech"
              className="text-blue-600 hover:underline"
            >
              🇨🇿 Вивчення чеської мови онлайн
            </Link>
          </div>
        </section>
      </div>
    </CourseGate>
  );
}
import type { Metadata } from "next";
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
      <div>
        <GrammarClient />

        {/* ✅ SEO internal links */}
        <section className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Почни повне навчання мови
          </h2>

          <div className="flex flex-col gap-2 items-center">
            <a href="/learn-slovak" className="text-blue-600 hover:underline">
              🇸🇰 Вивчення словацької мови онлайн
            </a>

            <a href="/learn-czech" className="text-blue-600 hover:underline">
              🇨🇿 Вивчення чеської мови онлайн
            </a>
          </div>
        </section>
      </div>
    </CourseGate>
  );
}
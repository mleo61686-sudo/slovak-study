import type { Metadata } from "next";
import DictionaryClient from "./DictionaryClient";
import { SITE_URL } from "@/lib/site";
import CourseGate from "@/app/components/CourseGate";

export const metadata: Metadata = {
  title: "Онлайн словник | Flunio",
  description:
    "Онлайн словник у Flunio: переклад слів, вимова, приклади та зручний пошук для вивчення словацької та чеської мов.",

  alternates: {
    canonical: `${SITE_URL}/dictionary`,
  },

  openGraph: {
    title: "Онлайн словник — Flunio",
    description:
      "Переклад слів, вимова, приклади та зручний пошук для вивчення словацької та чеської мов.",
    url: `${SITE_URL}/dictionary`,
    siteName: "Flunio",
    type: "website",
    images: ["/opengraph-image"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Онлайн словник — Flunio",
    description:
      "Переклад слів, вимова, приклади та зручний пошук для вивчення словацької та чеської мов.",
    images: ["/opengraph-image"],
  },

  robots: { index: true, follow: true },
};

export default function DictionaryPage() {
  return (
    <CourseGate>
      <div>
        <DictionaryClient />

        {/* ✅ SEO internal links */}
        <section className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Почни навчання мови
          </h2>

          <div className="flex flex-col gap-2 items-center">
            <a href="/learn-slovak" className="text-blue-600 hover:underline">
              🇸🇰 Словацька мова онлайн
            </a>

            <a href="/learn-czech" className="text-blue-600 hover:underline">
              🇨🇿 Чеська мова онлайн
            </a>
          </div>
        </section>
      </div>
    </CourseGate>
  );
}
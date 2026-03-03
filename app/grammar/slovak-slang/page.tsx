import type { Metadata } from "next";
import SlangClient from "./SlangClient";

export const metadata: Metadata = {
  title: "Словацький сленг і розмовні фрази | Slovak Study",
  description:
    "Словацький сленг та розмовні вирази: як говорять словаки в реальному житті. Приклади речень і практика.",
  alternates: {
    canonical: "https://slovak-study.com/grammar/slovak-slang",
  },
  openGraph: {
    title: "Словацький сленг — Slovak Study",
    description:
      "Живі фрази та вирази, які використовують словаки щодня.",
    url: "https://slovak-study.com/grammar/slovak-slang",
    siteName: "Slovak Study",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SlovakSlangPage() {
  return <SlangClient />;
}
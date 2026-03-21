import type { Metadata } from "next";
import SlangClient from "./SlangClient";

export const metadata: Metadata = {
  title: "Сленг і розмовні фрази (Slovak & Czech) | Flunio",
  description:
    "Словацький і чеський сленг та розмовні фрази: як реально говорять у Словаччині та Чехії. Приклади речень, переклади та практика.",
  alternates: {
    canonical: "https://flunio.com/grammar/slovak-slang",
  },
  openGraph: {
    title: "Сленг і розмовна мова — Flunio",
    description:
      "Живі словацькі та чеські розмовні фрази, які використовують у реальному житті.",
    url: "https://flunio.com/grammar/slovak-slang",
    siteName: "Flunio",
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
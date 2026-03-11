import type { Metadata } from "next";
import SlangClient from "./SlangClient";

export const metadata: Metadata = {
  title: "Сленг і розмовні фрази (Slovak & Czech) | Slovak Study",
  description:
    "Словацький і чеський сленг та розмовні фрази: як реально говорять у Словаччині та Чехії. Приклади речень, переклади та практика.",
  alternates: {
    canonical: "https://slovak-study.com/grammar/slovak-slang",
  },
  openGraph: {
    title: "Сленг і розмовна мова — Slovak Study",
    description:
      "Живі словацькі та чеські розмовні фрази, які використовують у реальному житті.",
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
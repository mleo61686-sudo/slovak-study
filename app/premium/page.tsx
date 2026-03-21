import type { Metadata } from "next";
import PremiumClient from "./PremiumClient";

export const metadata: Metadata = {
  title: "Premium — Flunio",
  description: "Premium підписка: уроки без ліміту, тренажер, озвучка і статистика.",
};

export default function PremiumPage() {
  return <PremiumClient />;
}

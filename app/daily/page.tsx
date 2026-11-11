import type { Metadata } from "next";
import DailyClient from "./DailyClient";
import "./daily.css";

export const metadata: Metadata = {
  title: "Flunio Arcade – щоденні мовні ігри",
  description: "Практикуй вибрану мову в Flunio Arcade: щоденна місія, вільний тренажер і повторення помилок. Інтерактивні вправи зі словацької, чеської та польської.",
  alternates: { canonical: "https://flunio.com/daily" },
  openGraph: { title: "Flunio Arcade – мовна гра на щодень", description: "Щоденні ігрові вправи, нові тренувальні сесії та повторення складних слів.", url: "https://flunio.com/daily", siteName: "Flunio", type: "website" },
  robots: { index: true, follow: true },
};

export default function DailyPage() { return <DailyClient />; }

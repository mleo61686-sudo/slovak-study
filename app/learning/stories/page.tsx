import type { Metadata } from "next";
import CourseGate from "@/app/components/CourseGate";
import StoriesHome from "./StoriesHome";

export const metadata: Metadata = {
  title: "Інтерактивні історії словацькою, чеською та польською | Flunio",
  description: "Читай словацькою, чеською або польською, обирай розвиток історій та перевіряй розуміння контексту.",
};

export default function StoriesPage() { return <CourseGate><StoriesHome /></CourseGate>; }

import type { Metadata } from "next";
import CourseGate from "@/app/components/CourseGate";
import MissionsHome from "./MissionsHome";

export const metadata: Metadata = {
  title: "Життєві місії словацькою, чеською та польською | Flunio",
  description: "Ситуаційні уроки трьома мовами: магазин, запис до лікаря, розмова на роботі.",
};

export default function MissionsPage() {
  return <CourseGate><MissionsHome /></CourseGate>;
}

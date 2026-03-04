import WordsSrsPage from "@/app/components/WordsSrsPage";
import CourseGate from "@/app/components/CourseGate";

export default function PracticeWordsPage() {
  return (
    <CourseGate>
      <WordsSrsPage backHref="/practice" />
    </CourseGate>
  );
}
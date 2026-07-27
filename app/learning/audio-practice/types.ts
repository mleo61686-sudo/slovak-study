import type { CefrBandId, LocalizedText } from "@/app/learning/data";
import type { CourseId } from "@/app/learning/courses/registry";

export type AudioPracticeQuestion = {
  question: LocalizedText;
  answers: LocalizedText[];
  correctIndex: number;
};

export type AudioPracticeItem = {
  id: string;
  slug: string;
  courseId: CourseId;
  band: CefrBandId;
  title: LocalizedText;
  description: LocalizedText;
  audioSrc: string;
  durationLabel?: string;
  transcript: string;
  questions: AudioPracticeQuestion[];
};

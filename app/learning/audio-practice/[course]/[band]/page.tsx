import { notFound } from "next/navigation";

import AudioPracticeListClient from "../../AudioPracticeListClient";
import {
  getAudioPracticeItems,
  isAudioBandId,
  isAudioCourseId,
} from "../../data";

type PageProps = {
  params: Promise<{
    course: string;
    band: string;
  }>;
};

export default async function AudioPracticeListPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { course, band } = resolvedParams;

  if (!isAudioCourseId(course) || !isAudioBandId(band)) {
    notFound();
  }

  const items = getAudioPracticeItems(course, band);

  return <AudioPracticeListClient courseId={course} band={band} items={items} />;
}
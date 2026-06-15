import { notFound } from "next/navigation";

import AudioPracticeClient from "../../../AudioPracticeClient";
import {
  getAudioPracticeItem,
  isAudioBandId,
  isAudioCourseId,
} from "../../../data";

type PageProps = {
  params: Promise<{
    course: string;
    band: string;
    slug: string;
  }>;
};

export default async function AudioPracticeItemPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { course, band, slug } = resolvedParams;

  if (!isAudioCourseId(course) || !isAudioBandId(band)) {
    notFound();
  }

  const item = getAudioPracticeItem(course, band, slug);
  if (!item) notFound();

  return <AudioPracticeClient item={item} />;
}
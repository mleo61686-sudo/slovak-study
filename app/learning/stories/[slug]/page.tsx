import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import CourseGate from "@/app/components/CourseGate";
import StoryRunner from "../StoryRunner";
import { getStory } from "../data";

export const metadata = { robots: { index: false, follow: false } };

type Params = { params: Promise<{ slug: string }> };
export default async function StoryPage({ params }: Params) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  if (story.premium) {
    const session = await auth();
    const email = session?.user?.email?.toLowerCase() || "";
    const admin = Boolean(email) && (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).includes(email);
    const user = email ? await prisma.user.findUnique({ where: { email }, select: { isPremium: true, premiumUntil: true } }) : null;
    const premium = user?.isPremium === true && (!user.premiumUntil || user.premiumUntil > new Date());
    if (!premium && !admin) redirect("/premium");
  }
  return <CourseGate><StoryRunner story={story} /></CourseGate>;
}

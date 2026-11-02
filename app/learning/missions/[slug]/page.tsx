import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import CourseGate from "@/app/components/CourseGate";
import MissionRunner from "../MissionRunner";
import { getMission } from "../data";

export const metadata = { robots: { index: false, follow: false } };

type Params = { params: Promise<{ slug: string }> };

export default async function MissionPage({ params }: Params) {
  const { slug } = await params;
  const mission = getMission(slug);
  if (!mission) notFound();
  if (mission.premium) {
    const session = await auth();
    const email = session?.user?.email?.toLowerCase() || "";
    const isAdmin = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
      .split(",").map((s) => s.trim().toLowerCase()).includes(email) && Boolean(email);
    const user = email ? await prisma.user.findUnique({
      where: { email }, select: { isPremium: true, premiumUntil: true },
    }) : null;
    const premium = user?.isPremium === true && (!user.premiumUntil || user.premiumUntil > new Date());
    if (!premium && !isAdmin) redirect("/premium");
  }
  return <CourseGate><MissionRunner mission={mission} /></CourseGate>;
}

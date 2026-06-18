import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // 🔒 must be logged in
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      isPremium: true,
      premiumUntil: true,
    },
  });

  const hasActivePremium =
    session.user.isAdmin === true ||
    (user?.isPremium === true &&
      (!user.premiumUntil || user.premiumUntil > new Date()));

  // 🔒 premium only
  if (!hasActivePremium) redirect("/premium");

  return <>{children}</>;
}
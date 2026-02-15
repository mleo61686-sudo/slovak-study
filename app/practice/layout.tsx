import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // 🔒 must be logged in
  if (!session) redirect("/login");

  // 🔒 premium only
  if (!session.user?.isPremium) redirect("/premium");

  return <>{children}</>;
}

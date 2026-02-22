import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // якщо залогінений — одразу на головну
  redirect("/");
}
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const name = session.user?.name ?? "User";
  const email = session.user?.email ?? "";

  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Привіт, {name} 👋</h1>
            <p className="mt-2 text-slate-600">{email}</p>

            <div className="mt-4">
              <Link
                href="/"
                className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Перейти до навчання
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ProfileClient />
      </div>
    </div>
  );
}
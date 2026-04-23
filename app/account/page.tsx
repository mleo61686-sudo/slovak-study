import type { Metadata } from "next";
import AccountClient from "./AccountClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account | Flunio",
  description: "Your Flunio account, subscription, and learning settings.",
  alternates: {
    canonical: `${SITE_URL}/account`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountPage() {
  return <AccountClient />;
}
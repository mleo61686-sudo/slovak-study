import { handleEmailVerification } from "@/lib/email-verification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return handleEmailVerification(req);
}

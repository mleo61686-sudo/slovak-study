import { createHash, createHmac, randomBytes } from "crypto";

export const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000;
export const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export function createEmailVerificationToken() {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashEmailVerificationToken(token);

  return { token, tokenHash };
}

export function hashEmailVerificationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function abuseSecret() {
  return (
    process.env.TRIAL_ABUSE_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "flunio-local-development-only"
  );
}

function hashAbuseValue(namespace: string, value: string) {
  return createHmac("sha256", abuseSecret())
    .update(`${namespace}:${value}`)
    .digest("hex");
}

export function normalizeTrialDeviceId(value: unknown) {
  if (typeof value !== "string") return null;

  const normalized = value.trim();

  if (normalized.length < 16 || normalized.length > 200) {
    return null;
  }

  return normalized;
}

export function hashTrialDeviceId(deviceId: string) {
  return hashAbuseValue("trial-device", deviceId);
}

export function getRequestIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();

  return firstForwarded || realIp || null;
}

export function hashRequestIp(ip: string | null) {
  return ip ? hashAbuseValue("trial-ip", ip) : null;
}

export function getTrialIpLimit() {
  const raw = Number(process.env.TRIAL_MAX_PER_IP_30D ?? "3");
  return Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : 3;
}

export function addTrialDuration(from = new Date()) {
  return new Date(from.getTime() + TRIAL_DURATION_MS);
}

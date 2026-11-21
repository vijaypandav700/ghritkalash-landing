import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ghritkalash2026";
const SECRET_SALT = process.env.RAZORPAY_KEY_SECRET || "gk_admin_secure_salt_key";

export function getExpectedSessionToken() {
  return crypto
    .createHmac("sha256", SECRET_SALT)
    .update(`admin_session_${ADMIN_PASSWORD}`)
    .digest("hex");
}

export function verifyAdminPassword(password) {
  if (!password) return false;
  return password === ADMIN_PASSWORD;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("gk_admin_session");
  if (!sessionCookie || !sessionCookie.value) return false;

  const expected = getExpectedSessionToken();
  try {
    return crypto.timingSafeEqual(
      Buffer.from(sessionCookie.value, "utf-8"),
      Buffer.from(expected, "utf-8")
    );
  } catch {
    return false;
  }
}

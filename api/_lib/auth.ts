import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "govan_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

function isProduction(): boolean {
  // VERCEL_ENV is "production" | "preview" | "development" on Vercel; falls
  // back to NODE_ENV locally (e.g. under `vercel dev`).
  return (
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  );
}

export async function signSession(username: string): Promise<string> {
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

async function verifySession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

function parseCookie(header: string | undefined, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

export function setSessionCookie(res: VercelResponse, token: string): void {
  const attrs = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${SESSION_TTL_SECONDS}`,
  ];
  if (isProduction()) attrs.push("Secure");
  res.setHeader("Set-Cookie", attrs.join("; "));
}

export function clearSessionCookie(res: VercelResponse): void {
  const attrs = [
    `${COOKIE_NAME}=`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (isProduction()) attrs.push("Secure");
  res.setHeader("Set-Cookie", attrs.join("; "));
}

/** Returns true if the request carries a valid admin session cookie. */
export async function requireAdmin(req: VercelRequest): Promise<boolean> {
  const token = parseCookie(req.headers.cookie, COOKIE_NAME);
  if (!token) return false;
  return verifySession(token);
}

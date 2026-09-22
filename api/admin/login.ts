import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { loginSchema } from "../../shared/packageSchema";
import { signSession, setSessionCookie } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminUsername || !adminPasswordHash) {
    console.error("[api/admin/login] ADMIN_USERNAME/ADMIN_PASSWORD_HASH not configured");
    return res.status(500).json({ error: "Admin login is not configured" });
  }

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  const { username, password } = parsed.data;

  const usernameOk = username === adminUsername;
  const passwordOk = await bcrypt.compare(password, adminPasswordHash);

  if (!usernameOk || !passwordOk) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = await signSession(username);
  setSessionCookie(res, token);
  return res.status(200).json({ authenticated: true });
}

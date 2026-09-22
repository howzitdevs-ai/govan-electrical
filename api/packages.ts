import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./_lib/db.js";
import { rowToPackage, type PackageRow } from "./_lib/packages.js";

// Public endpoint — returns active packages ordered for display. Used by
// /solar-packages instead of the old hardcoded PACKAGES array.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rows = (await sql(
      `select * from packages where is_active = true order by sort_order asc, id asc`
    )) as PackageRow[];

    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=30, stale-while-revalidate=300"
    );
    return res.status(200).json(rows.map(rowToPackage));
  } catch (err) {
    console.error("[api/packages] GET failed", err);
    return res.status(500).json({ error: "Failed to load packages" });
  }
}

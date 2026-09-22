import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { rowToPackage, type PackageRow } from "../_lib/packages.js";
import { requireAdmin } from "../_lib/auth.js";
import { packageInputSchema } from "../../shared/packageSchema.js";

// Update/delete a single package, identified by ?id=<n> (query param rather
// than a /packages/[id] path segment — Vercel wasn't recognizing the bracket
// dynamic-route file in this project, so this sidesteps that entirely).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAdmin(req))) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const idParam = req.query.id;
  const id = Number(Array.isArray(idParam) ? idParam[0] : idParam);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid package id" });
  }

  if (req.method === "PUT") {
    const parsed = packageInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const p = parsed.data;
    try {
      const rows = (await sql(
        `update packages set
           title = $1, tag = $2, tag2 = $3, tag_color = $4, image_url = $5,
           features = $6, price_cents = $7, old_price_cents = $8, categories = $9,
           is_active = coalesce($10, is_active), updated_at = now()
         where id = $11
         returning *`,
        [
          p.title,
          p.tag || null,
          p.tag2 || null,
          p.tagColor || null,
          p.imageUrl,
          p.features,
          p.priceCents,
          p.oldPriceCents ?? null,
          p.categories,
          p.isActive ?? null,
          id,
        ]
      )) as PackageRow[];

      if (rows.length === 0) {
        return res.status(404).json({ error: "Package not found" });
      }
      return res.status(200).json(rowToPackage(rows[0]));
    } catch (err) {
      console.error("[api/admin/package] PUT failed", err);
      return res.status(500).json({ error: "Failed to update package" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const rows = (await sql(
        `delete from packages where id = $1 returning id`,
        [id]
      )) as { id: number }[];
      if (rows.length === 0) {
        return res.status(404).json({ error: "Package not found" });
      }
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("[api/admin/package] DELETE failed", err);
      return res.status(500).json({ error: "Failed to delete package" });
    }
  }

  res.setHeader("Allow", "PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}

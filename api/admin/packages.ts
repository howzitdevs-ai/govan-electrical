import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { rowToPackage, type PackageRow } from "../_lib/packages.js";
import { requireAdmin } from "../_lib/auth.js";
import { packageInputSchema } from "../../shared/packageSchema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAdmin(req))) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.method === "GET") {
    try {
      const rows = (await sql(
        `select * from packages order by sort_order asc, id asc`
      )) as PackageRow[];
      return res.status(200).json(rows.map(rowToPackage));
    } catch (err) {
      console.error("[api/admin/packages] GET failed", err);
      return res.status(500).json({ error: "Failed to load packages" });
    }
  }

  if (req.method === "POST") {
    const parsed = packageInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const p = parsed.data;
    try {
      const [maxRow] = (await sql(
        `select coalesce(max(sort_order), -1) as max_sort from packages`
      )) as { max_sort: number }[];
      const nextSortOrder = (maxRow?.max_sort ?? -1) + 1;

      const [row] = (await sql(
        `insert into packages
           (title, tag, tag2, tag_color, image_url, features, price_cents, old_price_cents, categories, sort_order, is_active)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
          nextSortOrder,
          p.isActive ?? true,
        ]
      )) as PackageRow[];

      return res.status(201).json(rowToPackage(row));
    } catch (err) {
      console.error("[api/admin/packages] POST failed", err);
      return res.status(500).json({ error: "Failed to create package" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}

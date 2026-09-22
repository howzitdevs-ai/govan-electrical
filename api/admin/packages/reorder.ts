import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../../_lib/db";
import { requireAdmin } from "../../_lib/auth";
import { reorderSchema } from "../../../shared/packageSchema";

// Bulk-persists a new package order. Body: { orderedIds: number[] } — the
// array's position becomes each package's new sort_order.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAdmin(req))) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = reorderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "orderedIds array is required" });
  }
  const { orderedIds } = parsed.data;

  try {
    await sql.transaction(
      orderedIds.map((id, index) =>
        sql`update packages set sort_order = ${index}, updated_at = now() where id = ${id}`
      )
    );
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[api/admin/packages/reorder] failed", err);
    return res.status(500).json({ error: "Failed to reorder packages" });
  }
}

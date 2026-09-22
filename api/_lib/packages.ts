import type { Package } from "../../shared/types";

// Raw shape returned by node-postgres/neon for a `packages` row
// (snake_case columns, arrays come back as JS arrays already).
export interface PackageRow {
  id: number;
  title: string;
  tag: string | null;
  tag2: string | null;
  tag_color: string | null;
  image_url: string;
  features: string[];
  price_cents: number;
  old_price_cents: number | null;
  categories: string[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function rowToPackage(row: PackageRow): Package {
  return {
    id: row.id,
    title: row.title,
    tag: row.tag,
    tag2: row.tag2,
    tagColor: row.tag_color,
    imageUrl: row.image_url,
    features: row.features ?? [],
    priceCents: row.price_cents,
    oldPriceCents: row.old_price_cents,
    categories: row.categories ?? [],
    sortOrder: row.sort_order,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

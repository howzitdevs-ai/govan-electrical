// Shared package shape used by both the /api serverless handlers and the
// frontend (public fetch + admin dashboard/form). Prices are stored/moved as
// integer cents; display formatting happens in the frontend.

export interface Package {
  id: number;
  title: string;
  tag?: string | null;
  tag2?: string | null;
  tagColor?: string | null;
  imageUrl: string;
  features: string[];
  priceCents: number;
  oldPriceCents?: number | null;
  categories: string[];
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Payload shape sent by the admin create/edit form. `id`/`sortOrder`/
// timestamps are server-assigned.
export type PackageInput = Omit<
  Package,
  "id" | "sortOrder" | "isActive" | "createdAt" | "updatedAt"
> & {
  isActive?: boolean;
};

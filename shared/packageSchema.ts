import { z } from "zod";

// Validates admin create/update payloads for a package. Reused by
// AdminPackageForm.tsx (via zodResolver) and every /api/admin/packages*
// handler, so client and server can never validate a save differently.
export const packageInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  tag: z.string().trim().max(40).optional().or(z.literal("")),
  tag2: z.string().trim().max(40).optional().or(z.literal("")),
  tagColor: z.string().trim().max(60).optional().or(z.literal("")),
  imageUrl: z.string().trim().min(1, "An image is required"),
  features: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one feature"),
  priceCents: z.number().int().nonnegative(),
  oldPriceCents: z.number().int().nonnegative().nullable().optional(),
  categories: z.array(z.string()).default([]),
  isActive: z.boolean().optional(),
});

export type PackageInputPayload = z.infer<typeof packageInputSchema>;

export const reorderSchema = z.object({
  orderedIds: z.array(z.number().int().positive()).min(1),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

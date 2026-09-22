// Canonical category slugs shared between the DB (packages.categories), the
// admin package form (category checkboxes) and the public filter bar on
// /solar-packages. Keeping this one list in sync everywhere replaces the old
// regex-against-title matching that lived directly in SolarPackages.tsx.

export interface PackageCategory {
  slug: string;
  label: string;
}

export const PACKAGE_CATEGORIES: PackageCategory[] = [
  { slug: "3kw", label: "3kW" },
  { slug: "5kw", label: "5kW" },
  { slug: "6kw", label: "6kW" },
  { slug: "8kw", label: "8kW" },
  { slug: "10kw", label: "10kW" },
  { slug: "12kw", label: "12kW" },
  { slug: "14kw", label: "14kW" },
  { slug: "16kw", label: "16kW" },
  { slug: "deye-dyness", label: "Deye/Dyness" },
  { slug: "luxpower", label: "Luxpower" },
  { slug: "sunsynk", label: "Sunsynk" },
  { slug: "special-offer", label: "Special Offers" },
  { slug: "most-popular", label: "Most Popular" },
];

export const ALL_PACKAGES_FILTER = "All Packages";

export const PACKAGE_FILTERS: string[] = [
  ALL_PACKAGES_FILTER,
  ...PACKAGE_CATEGORIES.map((c) => c.label),
];

const LABEL_TO_SLUG = new Map(PACKAGE_CATEGORIES.map((c) => [c.label, c.slug]));

export function filterLabelToSlug(label: string): string | undefined {
  return LABEL_TO_SLUG.get(label);
}

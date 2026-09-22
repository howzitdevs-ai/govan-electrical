import type { Package } from "@shared/types";

export async function fetchPackages(): Promise<Package[]> {
  const res = await fetch("/api/packages");
  if (!res.ok) {
    throw new Error(`Failed to load packages (${res.status})`);
  }
  return res.json();
}

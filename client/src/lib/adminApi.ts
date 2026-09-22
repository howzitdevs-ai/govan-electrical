import { upload } from "@vercel/blob/client";
import type { Package, PackageInput } from "@shared/types";

async function parseJsonOrThrow(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof data?.error === "string" ? data.error : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export async function loginAdmin(username: string, password: string): Promise<void> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  await parseJsonOrThrow(res);
}

export async function logoutAdmin(): Promise<void> {
  await fetch("/api/admin/logout", { method: "POST" });
}

export async function fetchAdminMe(): Promise<boolean> {
  const res = await fetch("/api/admin/me");
  return res.ok;
}

export async function fetchAdminPackages(): Promise<Package[]> {
  const res = await fetch("/api/admin/packages");
  return parseJsonOrThrow(res);
}

export async function createPackage(input: PackageInput): Promise<Package> {
  const res = await fetch("/api/admin/packages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseJsonOrThrow(res);
}

export async function updatePackage(id: number, input: PackageInput): Promise<Package> {
  const res = await fetch(`/api/admin/package?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseJsonOrThrow(res);
}

export async function deletePackage(id: number): Promise<void> {
  const res = await fetch(`/api/admin/package?id=${id}`, { method: "DELETE" });
  await parseJsonOrThrow(res);
}

export async function reorderPackages(orderedIds: number[]): Promise<void> {
  const res = await fetch("/api/admin/packages/reorder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderedIds }),
  });
  await parseJsonOrThrow(res);
}

export async function uploadPackageImage(file: File): Promise<string> {
  const blob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/admin/upload",
  });
  return blob.url;
}

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import type { Package, PackageInput } from "@shared/types";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { AdminPackageForm } from "@/components/admin/AdminPackageForm";
import {
  createPackage,
  deletePackage,
  fetchAdminPackages,
  reorderPackages,
  updatePackage,
} from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const NAVY = "#1A1A1A";
const ORANGE = "#FFD700";

function formatRand(cents: number): string {
  return `R${(cents / 100).toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function DashboardInner() {
  const { logout } = useAdminAuth();
  const [, navigate] = useLocation();

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [reordering, setReordering] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminPackages();
      setPackages(data.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const openCreate = () => {
    setEditingPackage(null);
    setDialogOpen(true);
  };

  const openEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setDialogOpen(true);
  };

  const handleFormSubmit = async (input: PackageInput) => {
    try {
      if (editingPackage) {
        await updatePackage(editingPackage.id, input);
        toast.success("Package updated");
      } else {
        await createPackage(input);
        toast.success("Package created");
      }
      setDialogOpen(false);
      setEditingPackage(null);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
  };

  const handleDelete = async () => {
    if (pendingDeleteId === null) return;
    try {
      await deletePackage(pendingDeleteId);
      toast.success("Package deleted");
      setPendingDeleteId(null);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= packages.length) return;

    const reordered = [...packages];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    setPackages(reordered);
    setReordering(true);
    try {
      await reorderPackages(reordered.map((p) => p.id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Reorder failed");
      await load();
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-4 sm:px-8 py-4 flex items-center justify-between text-white" style={{ backgroundColor: NAVY }}>
        <h1 className="text-lg sm:text-xl font-extrabold">
          Govan Electrical <span style={{ color: ORANGE }}>Admin</span>
        </h1>
        <Button variant="ghost" className="text-white hover:bg-white/10" onClick={handleLogout}>
          <LogOut className="size-4" /> Log out
        </Button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
            Solar Packages
          </h2>
          <Button onClick={openCreate} style={{ backgroundColor: ORANGE, color: NAVY }}>
            <Plus className="size-4" /> Add package
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner className="size-8" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={load}>
              Retry
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Badges</TableHead>
                  <TableHead>Visible</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg, index) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          disabled={index === 0 || reordering}
                          onClick={() => move(index, -1)}
                        >
                          <ArrowUp className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          disabled={index === packages.length - 1 || reordering}
                          onClick={() => move(index, 1)}
                        >
                          <ArrowDown className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <img src={pkg.imageUrl} alt={pkg.title} className="w-12 h-12 object-cover rounded" />
                    </TableCell>
                    <TableCell className="whitespace-normal max-w-xs">{pkg.title}</TableCell>
                    <TableCell>
                      {pkg.oldPriceCents && (
                        <span className="line-through text-gray-400 mr-1 text-xs">
                          {formatRand(pkg.oldPriceCents)}
                        </span>
                      )}
                      <span className="font-semibold">{formatRand(pkg.priceCents)}</span>
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {[pkg.tag, pkg.tag2].filter(Boolean).join(", ") || "—"}
                    </TableCell>
                    <TableCell>{pkg.isActive ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(pkg)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setPendingDeleteId(pkg.id)}
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {packages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-400 whitespace-normal">
                      No packages yet. Click "Add package" to create your first one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPackage ? "Edit package" : "Add package"}</DialogTitle>
          </DialogHeader>
          <AdminPackageForm
            key={editingPackage?.id ?? "new"}
            initialPackage={editingPackage}
            onSubmit={handleFormSubmit}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={pendingDeleteId !== null} onOpenChange={(open) => !open && setPendingDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this package?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove it from the public solar packages page. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminRoute>
      <DashboardInner />
    </AdminRoute>
  );
}

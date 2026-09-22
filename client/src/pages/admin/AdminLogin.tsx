import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const NAVY = "#1A1A1A";
const ORANGE = "#FFD700";

const loginFormSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function AdminLogin() {
  useSEO({
    title: "Admin Login | Govan Electrical",
    description: "Govan Electrical admin login.",
    canonical: "/admin/login",
  });

  const { login, isAuthenticated } = useAdminAuth();
  const [, navigate] = useLocation();
  const [error, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" },
  });

  if (isAuthenticated) {
    navigate("/admin");
    return null;
  }

  const onSubmit = async (values: LoginFormValues) => {
    setError("");
    try {
      await login(values.username, values.password);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a2a2a 100%)` }}
    >
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-extrabold mb-1" style={{ color: NAVY }}>
          Admin Login
        </h1>
        <p className="text-sm text-gray-500 mb-6">Manage your solar package pricing.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input autoComplete="username" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full font-bold"
              style={{ backgroundColor: ORANGE, color: NAVY }}
            >
              {form.formState.isSubmitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

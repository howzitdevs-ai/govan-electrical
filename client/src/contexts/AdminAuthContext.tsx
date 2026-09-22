import { createContext, useContext, useEffect, useState } from "react";
import { fetchAdminMe, loginAdmin, logoutAdmin } from "@/lib/adminApi";

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdminMe()
      .then(setIsAuthenticated)
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    await loginAdmin(username, password);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

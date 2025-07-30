"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { apiClient, setAuthToken, removeAuthToken } from "@/lib/api";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  name: string;
  schools: string;
  points: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: UserData | null) => void;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await apiClient<UserData>("/user/me");
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setUser(null);
      setError("Failed to load user data.");
      removeAuthToken();
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setError, router]);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  const handleLogin = async (token: string) => {
    setAuthToken(token);
    await fetchUser();
  };

  const handleLogout = () => {
    setUser(null);
    removeAuthToken();
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        setUser,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}

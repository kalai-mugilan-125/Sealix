"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, UserRole } from "@/types/user";
import {
  login as apiLogin,
  register as apiRegister,
  verifyUser,
  logout as apiLogout,
} from "@/app/api/auth";
import { LoginPayload } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginPayload) => Promise<void>;
  register: (credentials: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const login = async (credentials: LoginPayload) => {
    try {
      const { token, user: userData } = await apiLogin(credentials);
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userData.role);
      setUser(userData);
      router.push(`/${userData.role}`);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (credentials: any) => {
    try {
      const { user: userData } = await apiRegister(credentials);
      setUser(userData);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await verifyUser(token);
          setUser(userData);
          router.push(`/${userData.role}`);
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
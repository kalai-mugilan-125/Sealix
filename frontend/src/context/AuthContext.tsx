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
    console.log("🚀 Login attempt with credentials:", {
      email: credentials.email,
    });

    try {
      // apiLogin now returns the clean { token, user } object
      const { token, user: userData } = await apiLogin(credentials);

      // Validate token and userData
      if (!token || !userData) {
        throw new Error('Invalid login response: Missing token or user data');
      }

      // Validate userData structure
      if (!userData.role) {
        throw new Error('Invalid user data: Missing role');
      }

      console.log("✅ Valid login data received:", {
        hasToken: !!token,
        userData: {
          ...userData,
          role: userData.role
        }
      });

      // Store data
      localStorage.setItem("token", token);
      setUser(userData);
      
      console.log(`🔄 Redirecting to /${userData.role}`);
      router.push(`/${userData.role}`);

    } catch (error: any) {
      console.error("❌ Login failed:", {
        error: error.message,
        stack: error.stack
      });
      
      // Cleanup on error
      localStorage.removeItem("token");
      setUser(null);
      
      const errorMessage = error.message || 'Login failed. Please try again.';
      alert(errorMessage);
      throw error;
    }
  };

  const register = async (credentials: any) => {
    console.log("🚀 Register attempt");
    try {
      const { user: userData } = await apiRegister(credentials);
      console.log("✅ Register success:", userData);
      setUser(userData);
    } catch (error: any) {
      console.error("❌ Registration failed:", error);
      alert(error.message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    console.log("🚪 Logout initiated");
    apiLogout();
    setUser(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Checking authentication state");
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.log("❌ No token found");
        setLoading(false);
        return;
      }

      console.log("🔑 Token found, verifying...");
      
      try {
        const userData = await verifyUser(token);
        console.log("✅ User verified:", userData);

        if (!userData || !userData.role) {
          throw new Error('Invalid user data received from verification');
        }

        setUser(userData);
        router.push(`/${userData.role}`);
      } catch (error: any) {
        console.error("❌ Auth verification failed:", error);
        localStorage.removeItem("token");
        setUser(null);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const contextValue = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
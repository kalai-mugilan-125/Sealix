"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";

interface RoleContextType {
  role: UserRole | null;
  loading: boolean;
}

const RoleContext = createContext<RoleContextType | null>(null);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs whenever the user or authLoading state changes
    if (!authLoading) {
      if (user) {
        setRole(user.role);
      } else {
        setRole(null);
      }
      setLoading(false);
    }
  }, [user, authLoading]);

  // The provider makes the role and loading state available to all children
  return (
    <RoleContext.Provider value={{ role, loading }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
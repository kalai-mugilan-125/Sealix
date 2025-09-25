"use client";

import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { UserRole } from "@/types/user"; 
import { useAuth } from "@/hooks/useAuth"; 

interface RoleContextType {
  role: UserRole | null;
  loading: boolean;
  // Utility booleans for easy access to roles
  isUser: boolean;
  isIssuer: boolean;
  isVerifier: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth(); 

  // FIX: Use useMemo for efficient, synchronous derivation of role state
  const contextValue = useMemo(() => {
    const userRole = user?.role || null; 
    
    return {
      role: userRole,
      loading: loading,
      // Check against the expected lowercase role strings
      isUser: userRole === 'user',
      isIssuer: userRole === 'issuer',
      isVerifier: userRole === 'verifier',
    };
  }, [user, loading]);

  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
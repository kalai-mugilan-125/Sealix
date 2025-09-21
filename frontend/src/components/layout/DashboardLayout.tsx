"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { UserRole } from "@/types/user";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROLES } from "@/lib/constants";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role: userRole, loading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userRole !== role) {
      if (userRole) {
        router.push(`/${userRole}`);
      } else {
        router.push("/auth/login");
      }
    }
  }, [userRole, role, loading, router]);

  if (loading || userRole !== role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 md:hidden">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 text-2xl">&#9776;</button>
        </header>
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth"; // 👈 Import useAuth

export default function UserDashboard() {
  const { user } = useAuth(); // 👈 Get user object

  const dashboardData = {
    ownedDocuments: 5,
    pendingVerifications: 1,
  };

  return (
    <DashboardLayout role="user">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        
        {/* 🚨 PROFILE SECTION ADDED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <Card className="p-6 col-span-1 bg-green-500 text-white shadow-lg">
            <h2 className="text-lg font-semibold mb-2 border-b border-green-400 pb-1">My Profile</h2>
            <p className="text-sm font-light">Name: <span className="font-medium">{user?.name || 'Loading...'}</span></p>
            <p className="text-sm font-light">Email: <span className="font-medium">{user?.email || 'Loading...'}</span></p>
            <p className="text-sm font-light">Role: <span className="font-bold uppercase">{user?.role || 'Loading...'}</span></p>
            <Link href="/user/settings" className="text-xs mt-3 block text-green-200 hover:text-green-100 underline">
                Go to Settings &rarr;
            </Link>
          </Card>

          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">My Documents</h2>
            <p className="text-4xl font-bold text-green-600">{dashboardData.ownedDocuments}</p>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Pending Actions</h2>
            <p className="text-4xl font-bold text-yellow-600">{dashboardData.pendingVerifications}</p>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-4">
              <Link href="/user/my-documents" className="btn btn-primary text-center">
                View My Documents
              </Link>
              <Link href="/user/upload" className="btn btn-secondary text-center">
                Upload New Document
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
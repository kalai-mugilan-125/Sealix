"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Link from "next/link";
import VerificationTrends from "@/components/charts/VerificationTrends";
import { useAuth } from "@/hooks/useAuth"; // 👈 Import useAuth

export default function VerifierDashboard() {
  const { user } = useAuth(); // 👈 Get user object

  const dashboardData = {
    totalVerifications: 58,
    valid: 45,
    revoked: 5,
    invalid: 8,
  };

  const chartData = [
    { name: 'Jan', verifications: 10 }, { name: 'Feb', verifications: 15 }, { name: 'Mar', verifications: 8 },
    { name: 'Apr', verifications: 12 }, { name: 'May', verifications: 13 }, { name: 'Jun', verifications: 10 },
  ];

  return (
    <DashboardLayout role="verifier">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Verifier Dashboard</h1>
        
        {/* 🚨 PROFILE SECTION ADDED */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          
          <Card className="p-6 col-span-1 bg-purple-500 text-white shadow-lg">
            <h2 className="text-lg font-semibold mb-2 border-b border-purple-400 pb-1">My Profile</h2>
            <p className="text-sm font-light">Name: <span className="font-medium">{user?.name || 'Loading...'}</span></p>
            <p className="text-sm font-light">Email: <span className="font-medium">{user?.email || 'Loading...'}</span></p>
            <p className="text-sm font-light">Role: <span className="font-bold uppercase">{user?.role || 'Loading...'}</span></p>
            <Link href="/verifier/settings" className="text-xs mt-3 block text-purple-200 hover:text-purple-100 underline">
                Go to Settings &rarr;
            </Link>
          </Card>
          
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Total Checks</h2>
            <p className="text-4xl font-bold text-green-600">{dashboardData.totalVerifications}</p>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Valid Docs</h2>
            <p className="text-4xl font-bold text-green-600">{dashboardData.valid}</p>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Revoked</h2>
            <p className="text-4xl font-bold text-red-600">{dashboardData.revoked}</p>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Invalid Hash</h2>
            <p className="text-4xl font-bold text-gray-500">{dashboardData.invalid}</p>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Verification Trends</h2>
            <VerificationTrends data={chartData} />
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-4">
              <Link href="/verifier/verify" className="btn btn-primary text-center">
                Verify Document
              </Link>
              <Link href="/verifier/history" className="btn btn-secondary text-center">
                View History
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
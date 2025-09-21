import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Link from "next/link";
import DocumentStatsChart from "@/components/charts/DocumentStatsChart";

export default function IssuerDashboard() {
  const dashboardData = {
    totalIssued: 124,
    valid: 110,
    revoked: 14,
  };

  const chartData = [
    { name: 'Jan', issued: 40 }, { name: 'Feb', issued: 30 }, { name: 'Mar', issued: 20 },
    { name: 'Apr', issued: 27 }, { name: 'May', issued: 18 }, { name: 'Jun', issued: 23 },
  ];

  return (
    <DashboardLayout role="issuer">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Issuer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Total Issued</h2>
            <p className="text-4xl font-bold text-indigo-600">{dashboardData.totalIssued}</p>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Valid Documents</h2>
            <p className="text-4xl font-bold text-green-600">{dashboardData.valid}</p>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Revoked Documents</h2>
            <p className="text-4xl font-bold text-red-600">{dashboardData.revoked}</p>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Document Stats</h2>
            <DocumentStatsChart data={chartData} />
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-4">
              <Link href="/issuer/documents/issue" className="btn btn-primary text-center">
                Issue New Document
              </Link>
              <Link href="/issuer/documents/manage" className="btn btn-secondary text-center">
                Manage Documents
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

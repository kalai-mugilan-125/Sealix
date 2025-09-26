import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";

export default function AdminDashboard() {
  const stats = {
    totalUsers: 120,
    activeUsers: 95,
    issuedDocuments: 500,
    totalVerifications: 800,
  };
  
  /*return (
    <DashboardLayout role="admin">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Total Users</h2>
            <p className="text-4xl font-bold text-green-600">{stats.totalUsers}</p>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Active Users</h2>
            <p className="text-4xl font-bold text-green-600">{stats.activeUsers}</p>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Issued Docs</h2>
            <p className="text-4xl font-bold text-yellow-600">{stats.issuedDocuments}</p>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">Verifications</h2>
            <p className="text-4xl font-bold text-blue-600">{stats.totalVerifications}</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );*/
}
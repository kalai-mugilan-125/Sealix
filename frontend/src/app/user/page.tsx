import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function UserDashboard() {
  const dashboardData = {
    ownedDocuments: 5,
    pendingVerifications: 1,
  };

  return (
    <DashboardLayout role="user">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-500">My Documents</h2>
            <p className="text-4xl font-bold text-indigo-600">{dashboardData.ownedDocuments}</p>
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
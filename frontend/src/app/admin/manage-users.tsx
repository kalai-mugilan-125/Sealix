import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const mockUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "issuer", status: "active" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "verifier", status: "active" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "user", status: "inactive" },
];

export default function ManageUsersPage() {
  const handleRoleChange = (userId: number, newRole: string) => {
    console.log(`Changing user ${userId} to role ${newRole}`);
  };

  const handleDeactivate = (userId: number) => {
    console.log(`Deactivating user ${userId}`);
  };

  return (
    <DashboardLayout role="admin">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
        <Card className="p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <select
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="input w-fit"
                      value={user.role}
                    >
                      <option value="user">User</option>
                      <option value="issuer">Issuer</option>
                      <option value="verifier">Verifier</option>
                    </select>
                    <Button onClick={() => handleDeactivate(user.id)} variant="secondary">
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
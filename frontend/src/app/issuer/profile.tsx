"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function IssuerProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to update profile
    setTimeout(() => {
      console.log("Profile updated", { name, email });
      setLoading(false);
    }, 1500);
  };

  return (
    <DashboardLayout role="issuer">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Issuer Profile</h1>
        <Card className="p-6">
          <form onSubmit={handleUpdate} className="space-y-4 max-w-lg">
            <Input
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <h2 className="text-xl font-semibold pt-4">KYC Information</h2>
            <div className="text-sm text-gray-500">
              KYC upload placeholder. Implement a file upload component for ID verification documents.
            </div>
            <Button type="submit" variant="default" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
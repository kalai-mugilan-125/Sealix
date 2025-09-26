"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerificationTable from "@/components/tables/VerificationTable";
import Card from "@/components/ui/Card";
import { VerificationHistoryItem } from "@/types/document";

const mockHistory: VerificationHistoryItem[] = [
  { id: "v1", timestamp: "2024-05-15T12:00:00Z", documentHash: "0x123abc...", result: "valid", verifier: "Verifier Inc." },
  { id: "v2", timestamp: "2024-05-14T10:30:00Z", documentHash: "0x456def...", result: "revoked", verifier: "Verifier Inc." },
  { id: "v3", timestamp: "2024-05-13T09:00:00Z", documentHash: "0x789ghi...", result: "invalid", verifier: "Verifier Inc." },
];

export default function VerifierHistoryPage() {
  const [history, setHistory] = useState<VerificationHistoryItem[]>(mockHistory);
  const [filters, setFilters] = useState({ dateRange: '', result: '' });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredHistory = history.filter(item => {
    if (filters.result && item.result !== filters.result) return false;
    return true; // Simple filtering, date range would be more complex
  });

  return (
    <DashboardLayout role="verifier">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Verification History</h1>
        <Card className="p-6">
          <div className="flex space-x-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Filter by Result</label>
              <select name="result" value={filters.result} onChange={handleFilterChange} className="input mt-1">
                <option value="">All</option>
                <option value="valid">Valid</option>
                <option value="revoked">Revoked</option>
                <option value="invalid">Invalid</option>
              </select>
            </div>
          </div>
          <VerificationTable history={filteredHistory} />
        </Card>
      </div>
    </DashboardLayout>
  );
}

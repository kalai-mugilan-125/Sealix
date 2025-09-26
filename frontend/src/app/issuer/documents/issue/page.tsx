"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import IssueForm from "@/components/forms/IssueForm";
import Card from "@/components/ui/Card";
import { IssuePayload } from "@/types/document";

export default function IssueDocumentPage() {
  const handleSubmit = (payload: IssuePayload): Promise<{ documentId: string; blockchainHash: string; qrCode: string }> => {
    console.log("Submitting document:", payload);
    // Simulate API call
    return new Promise((resolve) => setTimeout(() => {
      const mockResponse = {
        documentId: "doc-12345",
        blockchainHash: "0xabc123def456789...",
        qrCode: "data:image/png;base64,..."
      };
      resolve(mockResponse);
    }, 2000));
  };

  return (
    <DashboardLayout role="issuer">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Issue New Document</h1>
        <Card className="p-6">
          <IssueForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </DashboardLayout>
  );
}
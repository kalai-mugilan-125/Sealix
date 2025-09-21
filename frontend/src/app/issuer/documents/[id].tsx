"use client";

import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import { Document, DocumentStatus } from "@/types/document";
import { formatDate } from "@/lib/helpers";
import Link from "next/link";

const mockDocument: Document = {
  id: "doc1",
  title: "Degree Certificate",
  recipientName: "Jane Doe",
  recipientEmail: "jane.doe@example.com",
  documentType: "PDF",
  issuedAt: "2024-01-15T10:30:00Z",
  status: "valid",
  blockchainHash: "0x123abc456def7890123abc456def7890123abc456def7890123abc",
  metadata: {
    university: "State University",
    degree: "B.Sc. Computer Science",
    graduationDate: "2023-12-15"
  }
};

export default function DocumentDetailsPage() {
  const params = useParams();
  const documentId = params.id as string;
  const document = mockDocument;

  if (!document) {
    return (
      <DashboardLayout role="issuer">
        <div className="p-8">Document not found.</div>
      </DashboardLayout>
    );
  }

  const statusColor = document.status === "valid" ? "text-green-600" : "text-red-600";

  return (
    <DashboardLayout role="issuer">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Document Details</h1>
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">{document.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Recipient Name</p>
              <p className="font-medium">{document.recipientName}</p>
            </div>
            <div>
              <p className="text-gray-500">Recipient Email</p>
              <p className="font-medium">{document.recipientEmail}</p>
            </div>
            <div>
              <p className="text-gray-500">Document Type</p>
              <p className="font-medium">{document.documentType}</p>
            </div>
            <div>
              <p className="text-gray-500">Issuance Date</p>
              <p className="font-medium">{formatDate(document.issuedAt)}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className={`font-medium capitalize ${statusColor}`}>{document.status}</p>
            </div>
            <div>
              <p className="text-gray-500">Blockchain Hash</p>
              <Link
                href={`#`} // Replace with actual blockchain explorer link
                className="font-medium text-indigo-600 hover:underline break-all"
                target="_blank"
              >
                {document.blockchainHash}
              </Link>
            </div>
          </div>
          {document.metadata && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-xl font-semibold mb-2">Additional Metadata</h3>
              {Object.entries(document.metadata).map(([key, value]) => (
                <div key={key} className="flex space-x-2">
                  <span className="text-gray-500 capitalize">{key}:</span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}

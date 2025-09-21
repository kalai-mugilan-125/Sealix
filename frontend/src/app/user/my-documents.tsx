"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Document } from "@/types/document";
import { useState } from "react";
import { formatDate } from "@/lib/helpers";

const mockDocuments: Document[] = [
  { id: "user-doc1", title: "Passport", issuedAt: "2022-10-01", status: "valid", documentType: "PDF" },
  { id: "user-doc2", title: "Driver's License", issuedAt: "2021-05-20", status: "valid", documentType: "PDF" },
  { id: "user-doc3", title: "Medical Record", issuedAt: "2023-08-11", status: "valid", documentType: "PDF" },
];

export default function MyDocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments);

  return (
    <DashboardLayout role="user">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">My Documents</h1>
        <Card className="p-6">
          <ul className="space-y-4">
            {documents.map(doc => (
              <li key={doc.id} className="border-b pb-4 last:pb-0 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{doc.title}</h2>
                    <p className="text-sm text-gray-500">Issued: {formatDate(doc.issuedAt)}</p>
                    <p className={`text-sm capitalize ${doc.status === 'valid' ? 'text-green-600' : 'text-red-600'}`}>
                      Status: {doc.status}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="secondary">Download</Button>
                    <Button variant="default">Share</Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
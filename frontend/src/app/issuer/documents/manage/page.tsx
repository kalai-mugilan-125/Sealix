"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DocumentTable from "@/components/tables/DocumentTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Document } from "@/types/document";

const mockDocuments: Document[] = [
  { id: "doc1", title: "Degree Certificate", recipientName: "Jane Doe", issuedAt: "2024-01-15", status: "valid", blockchainHash: "0x123abc...", documentType: "PDF" },
  { id: "doc2", title: "Project Completion Letter", recipientName: "John Smith", issuedAt: "2024-02-20", status: "revoked", blockchainHash: "0x456def...", documentType: "PDF" },
  { id: "doc3", title: "Certification of Excellence", recipientName: "Emily White", issuedAt: "2024-03-10", status: "valid", blockchainHash: "0x789ghi...", documentType: "PDF" },
];

export default function ManageDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [search, setSearch] = useState("");

  const handleRevoke = (id: string) => {
    // Simulate API call to revoke document
    console.log(`Revoking document with ID: ${id}`);
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, status: 'revoked' } : doc));
  };

  const filteredDocs = documents.filter(doc =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    (doc.recipientName && doc.recipientName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout role="issuer">
      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Documents</h1>
          <Link href="/issuer/documents/issue">
            <Button variant="default">Issue New Document</Button>
          </Link>
        </div>
        <Card className="p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search documents..."
              className="input w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DocumentTable documents={filteredDocs} onRevoke={handleRevoke} />
        </Card>
      </div>
    </DashboardLayout>
  );
}
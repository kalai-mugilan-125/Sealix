"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import UploadForm from "./UploadForm";
import Modal from "@/components/ui/Modal";
import QRCode from "react-qr-code";
import { IssuePayload } from "@/types/document";

interface IssueFormProps {
  onSubmit: (payload: IssuePayload) => Promise<{ documentId: string; blockchainHash: string; qrCode: string }>;
}

export default function IssueForm({ onSubmit }: IssueFormProps) {
  const [formData, setFormData] = useState<Partial<IssuePayload>>({
    title: "",
    recipientName: "",
    recipientEmail: "",
    documentType: "",
    file: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<{ documentId: string; blockchainHash: string; qrCode: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File) => {
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      setError("Please upload a document file.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await onSubmit(formData as IssuePayload);
      setResult(response);
      setShowModal(true);
    } catch (err: any) {
      setError(err.message || "Failed to issue document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          label="Recipient Name"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          required
        />
        <Input
          label="Recipient Email"
          name="recipientEmail"
          value={formData.recipientEmail}
          onChange={handleChange}
          type="email"
          required
        />
        <Input
          label="Document Type"
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          required
        />
        <UploadForm onUpload={handleFileChange} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" variant="default" disabled={loading}>
          {loading ? "Issuing..." : "Issue Document"}
        </Button>
      </form>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Document Issued Successfully">
        <div className="text-center space-y-4">
          <p>The document has been issued and recorded on the blockchain.</p>
          <div className="flex justify-center my-4">
            {result?.qrCode ? (
                <QRCode value={`/verify?hash=${result.blockchainHash}`} size={150} />
            ) : (
                <p>Generating QR code...</p>
            )}
          </div>
          <p className="break-all font-mono text-xs">
            Hash: {result?.blockchainHash}
          </p>
          <p>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </p>
        </div>
      </Modal>
    </>
  );
}
"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import UploadForm from "@/components/forms/UploadForm";
import { api } from "@/lib/api";
import { VerificationResult } from "@/types/document";

export default function VerifyPage() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!hash) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const verificationResult = await api.verify.verifyDocument(hash);
      setResult(verificationResult);
    } catch (err: any) {
      setError(err.message || "Verification failed. Document not found or invalid.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // In a real app, this would upload the file and get its hash, then verify.
      const mockHash = "0x" + Math.random().toString(16).slice(2, 10);
      const verificationResult = await api.verify.verifyDocument(mockHash);
      setResult(verificationResult);
    } catch (err: any) {
      setError(err.message || "Verification failed. Could not process file.");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = result?.status === 'valid' ? 'text-green-600' : result?.status === 'revoked' ? 'text-red-600' : 'text-gray-500';

  return (
    <DashboardLayout role="verifier">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Verify Document</h1>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Verify by Hash or QR Code</h2>
          <div className="flex space-x-2 mb-4">
            <Input
              label="Document Hash"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="Enter document hash or scan QR"
              className="flex-grow"
            />
            <Button onClick={handleVerify} variant="default" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
          <h2 className="text-xl font-semibold mb-4">Or Upload Document</h2>
          <UploadForm onUpload={handleFileUpload} />
          {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
          {result && (
            <div className="mt-6 p-4 border rounded-md">
              <h3 className="text-xl font-semibold mb-2">Verification Result: <span className={`capitalize ${statusColor}`}>{result.status}</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Issuer</p>
                  <p className="font-medium">{result.issuerName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Issued At</p>
                  <p className="font-medium">{new Date(result.issuedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Blockchain Tx</p>
                  <p className="font-medium break-all">{result.blockchainHash}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
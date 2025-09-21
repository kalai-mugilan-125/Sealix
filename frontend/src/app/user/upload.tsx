"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import UploadForm from "@/components/forms/UploadForm";
import Button from "@/components/ui/Button";

export default function UploadPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    setFileName(file.name);
    // Simulate API call
    console.log("Uploading file:", file.name);
    setTimeout(() => {
      setLoading(false);
      alert("File uploaded successfully!");
    }, 2000);
  };

  return (
    <DashboardLayout role="user">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Upload Document</h1>
        <Card className="p-6">
          <UploadForm onUpload={handleUpload} />
          {loading && <p className="text-center mt-4">Uploading {fileName}...</p>}
          {fileName && !loading && (
            <div className="mt-4 p-4 border rounded-md text-center">
              <h3 className="text-lg font-semibold">File Uploaded: {fileName}</h3>
              <p className="text-sm text-gray-500">
                You can now share this document or request an issuer to formally issue a verifiable credential.
              </p>
              <Button variant="default" className="mt-4">
                Request Issuance
              </Button>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
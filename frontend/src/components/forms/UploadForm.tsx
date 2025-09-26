"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface UploadFormProps {
  onUpload: (file: File) => void;
  allowedFileTypes?: string[];
  maxFileSizeMB?: number;
}

export default function UploadForm({ onUpload, allowedFileTypes = ['application/pdf'], maxFileSizeMB = 5 }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!allowedFileTypes.includes(selectedFile.type)) {
        setError(`Invalid file type. Only ${allowedFileTypes.map(t => t.split('/')[1]).join(', ')} are allowed.`);
        setFile(null);
        return;
      }
      if (selectedFile.size > maxFileSizeMB * 1024 * 1024) {
        setError(`File size exceeds the limit of ${maxFileSizeMB}MB.`);
        setFile(null);
        return;
      }
      setError(null);
      setFile(selectedFile);
      onUpload(selectedFile);
      // Simulate progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
        <label htmlFor="file-upload" className="cursor-pointer text-green-600 hover:underline">
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            accept={allowedFileTypes.join(',')}
          />
          {file ? file.name : "Click to upload file"}
        </label>
        {file && (
          <div className="mt-2 text-sm text-gray-500">
            <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}

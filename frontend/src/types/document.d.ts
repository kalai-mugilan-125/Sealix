import { Role } from "./user";

export type DocumentStatus = "valid" | "revoked" | "pending" | "invalid";

export interface Document {
  id: string;
  title: string;
  recipientName?: string;
  recipientEmail?: string;
  documentType: string;
  issuedAt: string;
  status: DocumentStatus;
  blockchainHash?: string;
  metadata?: Record<string, any>;
  fileUrl?: string;
}

export interface IssuePayload {
  title: string;
  recipientName: string;
  recipientEmail: string;
  documentType: string;
  file: File;
  metadata?: Record<string, any>;
  expiryDate?: string;
}

export interface VerificationResult {
  status: "valid" | "revoked" | "invalid";
  issuerName: string;
  issuedAt: string;
  blockchainHash: string;
  confidence: number;
  proofLink?: string;
}

export interface VerificationHistoryItem {
  id: string;
  timestamp: string;
  documentHash: string;
  result: VerificationResult["status"];
  verifier: string;
}

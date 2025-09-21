import axios from "axios";
import { LoginPayload, LoginResponse, RegisterPayload, ForgotPasswordPayload } from "@/types/auth";
import { Document, IssuePayload, VerificationResult } from "@/types/document";

const API_BASE_URL = "http://localhost:5000";
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// --- Mock Data ---
const MOCK_ISSUER_USER = { id: 'issuer_id', name: 'Issuer User', email: 'issuer@test.com', role: 'issuer' };
const MOCK_VERIFIER_USER = { id: 'verifier_id', name: 'Verifier User', email: 'verifier@test.com', role: 'verifier' };
const MOCK_DOCUMENTS: Document[] = [
  { 
    id: 'doc1', 
    title: 'Degree Certificate', 
    status: 'valid', 
    issuedAt: new Date('2023-06-15').toISOString(), 
    documentType: 'Degree' 
  },
  { 
    id: 'doc2', 
    title: 'Course Transcript', 
    status: 'revoked', 
    issuedAt: new Date('2023-05-20').toISOString(), 
    documentType: 'Transcript' 
  },
  { 
    id: 'doc3', 
    title: 'Professional Certificate', 
    status: 'valid', 
    issuedAt: new Date('2024-01-10').toISOString(), 
    documentType: 'Certificate' 
  },
];

const MOCK_VERIFICATION_HISTORY: any[] = [
  { 
    id: 'ver1', 
    documentName: 'Driver License', 
    documentHash: '0x123abc456def',
    result: 'Valid', 
    issuerName: 'DMV Department',
    verifiedAt: new Date('2024-01-15T10:30:00Z').toISOString() 
  },
  { 
    id: 'ver2', 
    documentName: 'Passport', 
    documentHash: '0x789def123abc',
    result: 'Invalid', 
    issuerName: 'Unknown',
    verifiedAt: new Date('2024-01-10T14:20:00Z').toISOString() 
  },
  { 
    id: 'ver3', 
    documentName: 'Birth Certificate', 
    documentHash: '0xabc789def456',
    result: 'Valid', 
    issuerName: 'City Registry',
    verifiedAt: new Date('2024-01-05T09:15:00Z').toISOString() 
  },
];

const MOCK_VERIFICATION_RESULT: VerificationResult = {
  status: "valid",
  issuerName: "Test University",
  issuedAt: new Date().toISOString(),
  blockchainHash: "0xabc123def456789...",
  confidence: 0.99,
};

export const api = {
  auth: {
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
      if (!IS_PRODUCTION) {
        // Mock login logic for development
        console.log('Mocking login for:', payload.email);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (payload.email === 'issuer@test.com' && payload.password === 'password') {
          return Promise.resolve({ user: MOCK_ISSUER_USER, token: 'mock-token-issuer', role: MOCK_ISSUER_USER.role });
        }
        if (payload.email === 'verifier@test.com' && payload.password === 'password') {
          return Promise.resolve({ user: MOCK_VERIFIER_USER, token: 'mock-token-verifier', role: MOCK_VERIFIER_USER.role });
        }
        return Promise.reject(new Error('Invalid credentials'));
      }
      // Real API call for production
      const response = await apiInstance.post('/auth/login', payload);
      return response.data;
    },
    register: async (payload: RegisterPayload): Promise<void> => {
      if (!IS_PRODUCTION) {
        console.log('Mocking registration for:', payload.email);
        await new Promise(resolve => setTimeout(resolve, 800));
        return Promise.resolve();
      }
      await apiInstance.post('/auth/register', payload);
    },
    forgotPassword: async (email: string): Promise<void> => {
      if (!IS_PRODUCTION) {
        console.log('Mocking forgot password for:', email);
        await new Promise(resolve => setTimeout(resolve, 600));
        return Promise.resolve();
      }
      await apiInstance.post('/auth/forgot-password', { email });
    },
  },
  documents: {
    create: async (payload: IssuePayload): Promise<Document> => {
      if (!IS_PRODUCTION) {
        console.log('Mocking document creation with payload:', payload);
        await new Promise(resolve => setTimeout(resolve, 1200));
        return Promise.resolve({
          id: `doc_${Date.now()}`,
          title: payload.title,
          status: 'valid',
          issuedAt: new Date().toISOString(),
          documentType: payload.documentType
        });
      }
      const response = await apiInstance.post('/documents', payload);
      return response.data;
    },
    list: async (params?: { page?: number; q?: string }): Promise<Document[]> => {
      if (!IS_PRODUCTION) {
        console.log('Mocking document list with params:', params);
        await new Promise(resolve => setTimeout(resolve, 500));
        let filteredDocs = [...MOCK_DOCUMENTS];
        if (params?.q) {
          filteredDocs = filteredDocs.filter(doc => 
            doc.title.toLowerCase().includes(params.q!.toLowerCase()) ||
            doc.documentType.toLowerCase().includes(params.q!.toLowerCase())
          );
        }
        return Promise.resolve(filteredDocs);
      }
      const response = await apiInstance.get('/documents', { params });
      return response.data;
    },
    get: async (id: string): Promise<Document> => {
      if (!IS_PRODUCTION) {
        console.log('Mocking get document:', id);
        await new Promise(resolve => setTimeout(resolve, 300));
        const doc = MOCK_DOCUMENTS.find(doc => doc.id === id);
        if (!doc) {
          return Promise.reject(new Error('Document not found'));
        }
        return Promise.resolve(doc);
      }
      const response = await apiInstance.get(`/documents/${id}`);
      return response.data;
    },
    revoke: async (id: string): Promise<void> => {
      if (!IS_PRODUCTION) {
        console.log('Mocking document revocation:', id);
        await new Promise(resolve => setTimeout(resolve, 800));
        const docIndex = MOCK_DOCUMENTS.findIndex(doc => doc.id === id);
        if (docIndex !== -1) {
          MOCK_DOCUMENTS[docIndex].status = 'revoked';
        }
        return Promise.resolve();
      }
      await apiInstance.patch(`/documents/${id}/revoke`);
    },
  },
  verify: {
    verifyDocument: async (payload: string | File): Promise<VerificationResult> => {
      if (!IS_PRODUCTION) {
        console.log('Mocking document verification for:', payload);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const mockResults: VerificationResult[] = [
          {
            status: "valid",
            issuerName: "Harvard University",
            issuedAt: new Date('2023-05-15').toISOString(),
            blockchainHash: "0xabc123def456789abcdef123456789abc",
            confidence: 0.99,
          },
          {
            status: "invalid",
            issuerName: "Unknown",
            issuedAt: new Date('2023-03-10').toISOString(),
            blockchainHash: "0x000000000000000000000000000000000",
            confidence: 0.15,
          },
          {
            status: "revoked",
            issuerName: "MIT",
            issuedAt: new Date('2022-12-01').toISOString(),
            blockchainHash: "0xdef789abc123456def789abc123456def",
            confidence: 0.95,
          }
        ];
        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
        return Promise.resolve(randomResult);
      }
      const formData = new FormData();
      if (typeof payload === 'string') {
        formData.append('hash', payload);
      } else {
        formData.append('file', payload);
      }
      const response = await apiInstance.post('/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    history: async (): Promise<any[]> => {
      if (!IS_PRODUCTION) {
        console.log('Mocking verification history');
        await new Promise(resolve => setTimeout(resolve, 400));
        return Promise.resolve(MOCK_VERIFICATION_HISTORY);
      }
      const response = await apiInstance.get('/verify/history');
      return response.data;
    },
  },
};
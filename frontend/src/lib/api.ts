import axios from "axios";
import { LoginPayload, LoginResponse, RegisterPayload, ForgotPasswordPayload } from "@/types/auth";
import { Document, IssuePayload, VerificationResult } from "@/types/document";

const API_BASE_URL = "http://localhost:5000";

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

export const api = {
  auth: {
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
      const response = await apiInstance.post('/auth/login', payload);
      return response.data;
    },
    register: async (payload: RegisterPayload): Promise<void> => {
      await apiInstance.post('/auth/register', payload);
    },
    forgotPassword: async (email: string): Promise<void> => {
      await apiInstance.post('/auth/forgot-password', { email });
    },
  },
  documents: {
    create: async (payload: IssuePayload): Promise<Document> => {
      const response = await apiInstance.post('/documents', payload);
      return response.data;
    },
    list: async (params?: { page?: number; q?: string }): Promise<Document[]> => {
      const response = await apiInstance.get('/documents', { params });
      return response.data;
    },
    get: async (id: string): Promise<Document> => {
      const response = await apiInstance.get(`/documents/${id}`);
      return response.data;
    },
    revoke: async (id: string): Promise<void> => {
      await apiInstance.patch(`/documents/${id}/revoke`);
    },
  },
  verify: {
    verifyDocument: async (payload: string | File): Promise<VerificationResult> => {
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
      const response = await apiInstance.get('/verify/history');
      return response.data;
    },
  },
};
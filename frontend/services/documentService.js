// Document Service
// This service handles all document-related API calls using axios

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const documentService = {
  // Get documents issued by the current issuer
  async getIssuedDocuments() {
    try {
      const response = await apiClient.get('/documents/issued');
      return response.data;
    } catch (error) {
      console.error('Get issued documents error:', error);
      // Return mock data for demo
      return {
        success: true,
        documents: [
          {
            id: 'DOC001',
            title: 'Computer Science Degree',
            type: 'Academic Certificate',
            issuer: 'Tech University',
            issueDate: '2024-01-15',
            status: 'Verified',
            recipient: 'John Doe'
          }
        ]
      };
    }
  },

  // Get documents owned by the current user
  async getUserDocuments() {
    try {
      const response = await apiClient.get('/documents/user');
      return response.data;
    } catch (error) {
      console.error('Get user documents error:', error);
      // Return mock data for demo
      return {
        success: true,
        documents: [
          {
            id: 'DOC003',
            title: 'Bachelor of Science',
            type: 'Academic Degree',
            issuer: 'State University',
            issueDate: '2023-05-20',
            status: 'Verified'
          }
        ]
      };
    }
  },

  // Issue a new document
  async issueDocument(documentData) {
    try {
      const response = await apiClient.post('/documents/issue', documentData);
      return response.data;
    } catch (error) {
      console.error('Issue document error:', error);
      throw error;
    }
  },

  // Get a specific document by ID
  async getDocumentById(documentId) {
    try {
      const response = await apiClient.get(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Get document by ID error:', error);
      throw error;
    }
  },

  // Update document status
  async updateDocumentStatus(documentId, status) {
    try {
      const response = await apiClient.patch(`/documents/${documentId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Update document status error:', error);
      throw error;
    }
  },

  // Delete a document
  async deleteDocument(documentId) {
    try {
      const response = await apiClient.delete(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Delete document error:', error);
      throw error;
    }
  },

  // Search documents
  async searchDocuments(searchQuery) {
    try {
      const response = await apiClient.get(`/documents/search?q=${encodeURIComponent(searchQuery)}`);
      return response.data;
    } catch (error) {
      console.error('Search documents error:', error);
      throw error;
    }
  },

  // Generate QR code for document
  async generateQRCode(documentId) {
    try {
      const response = await apiClient.get(`/documents/${documentId}/qr`);
      return response.data;
    } catch (error) {
      console.error('Generate QR code error:', error);
      // Return mock QR data for demo
      return {
        success: true,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${documentId}`,
        qrData: documentId
      };
    }
  },

  // Upload document file
  async uploadDocumentFile(file, documentId) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentId', documentId);

      const response = await apiClient.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Upload document file error:', error);
      throw error;
    }
  },

  // Get document statistics
  async getDocumentStats() {
    try {
      const response = await apiClient.get('/documents/stats');
      return response.data;
    } catch (error) {
      console.error('Get document stats error:', error);
      // Return mock stats for demo
      return {
        success: true,
        stats: {
          total: 5,
          verified: 3,
          pending: 1,
          rejected: 1
        }
      };
    }
  }
};
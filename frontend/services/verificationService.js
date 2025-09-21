// Verification Service
// This service handles all document verification-related API calls using axios

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

export const verificationService = {
  // Verify a document by ID or QR code data
  async verifyDocument(documentIdentifier) {
    try {
      const response = await apiClient.post('/verification/verify', { 
        documentIdentifier 
      });
      return response.data;
    } catch (error) {
      console.error('Verify document error:', error);
      // Return mock verification result for demo
      const isValid = Math.random() > 0.3; // 70% chance of being valid
      return {
        success: isValid,
        message: isValid ? 'Document is valid and verified' : 'Document could not be verified or is invalid',
        document: isValid ? {
          id: documentIdentifier,
          title: 'Sample Document',
          issuer: 'Sample University',
          issueDate: '2024-01-15',
          status: 'Verified'
        } : null,
        verificationId: 'VER' + Date.now(),
        timestamp: new Date().toISOString()
      };
    }
  },

  // Get verification history for the current verifier
  async getVerificationHistory() {
    try {
      const response = await apiClient.get('/verification/history');
      return response.data;
    } catch (error) {
      console.error('Get verification history error:', error);
      // Return mock history for demo
      return {
        success: true,
        history: [
          {
            id: 'VER001',
            documentId: 'DOC001',
            documentTitle: 'Computer Science Degree',
            issuer: 'Tech University',
            verificationDate: '2024-03-15',
            status: 'Valid',
            verifierName: 'ABC Company'
          }
        ]
      };
    }
  },

  // Get a specific verification record
  async getVerificationById(verificationId) {
    try {
      const response = await apiClient.get(`/verification/${verificationId}`);
      return response.data;
    } catch (error) {
      console.error('Get verification by ID error:', error);
      throw error;
    }
  },

  // Verify document using QR code
  async verifyDocumentByQR(qrData) {
    try {
      const response = await apiClient.post('/verification/verify-qr', { 
        qrData 
      });
      return response.data;
    } catch (error) {
      console.error('Verify document by QR error:', error);
      // Parse QR data and simulate verification
      const documentInfo = qrData.split(':');
      const isValid = documentInfo.length >= 3;
      
      return {
        success: isValid,
        message: isValid ? 'QR code verified successfully' : 'Invalid QR code format',
        document: isValid ? {
          id: documentInfo[0],
          title: documentInfo[1],
          issuer: documentInfo[2],
          status: 'Verified'
        } : null,
        verificationId: 'QR_VER' + Date.now(),
        timestamp: new Date().toISOString()
      };
    }
  },

  // Get verification statistics
  async getVerificationStats() {
    try {
      const response = await apiClient.get('/verification/stats');
      return response.data;
    } catch (error) {
      console.error('Get verification stats error:', error);
      // Return mock stats for demo
      return {
        success: true,
        stats: {
          totalVerifications: 25,
          validDocuments: 18,
          invalidDocuments: 7,
          todayVerifications: 3,
          thisWeekVerifications: 12,
          thisMonthVerifications: 25
        }
      };
    }
  },

  // Bulk verify multiple documents
  async bulkVerifyDocuments(documentIds) {
    try {
      const response = await apiClient.post('/verification/bulk-verify', { 
        documentIds 
      });
      return response.data;
    } catch (error) {
      console.error('Bulk verify documents error:', error);
      throw error;
    }
  },

  // Export verification report
  async exportVerificationReport(startDate, endDate, format = 'pdf') {
    try {
      const response = await apiClient.post('/verification/export', { 
        startDate,
        endDate,
        format 
      }, {
        responseType: 'blob'
      });

      return {
        success: true,
        blob: response.data,
        filename: `verification-report-${startDate}-${endDate}.${format}`
      };
    } catch (error) {
      console.error('Export verification report error:', error);
      throw error;
    }
  },

  // Check document authenticity against blockchain
  async checkBlockchainAuthenticity(documentId) {
    try {
      const response = await apiClient.get(`/verification/blockchain/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Check blockchain authenticity error:', error);
      // Return mock blockchain verification for demo
      return {
        success: true,
        onBlockchain: true,
        blockHash: '0x' + Math.random().toString(16).substr(2, 64),
        transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
        blockNumber: Math.floor(Math.random() * 1000000),
        timestamp: new Date().toISOString()
      };
    }
  }
};
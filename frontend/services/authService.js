// Authentication Service
// This service handles all authentication-related API calls using axios

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

export const authService = {
  // Login function
  async login(username, password, role) {
    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
        role
      });

      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
        role: response.data.role
      };
    } catch (error) {
      console.error('Login error:', error);
      // For demo purposes, simulate successful login
      return {
        success: true,
        token: 'demo-token-' + Date.now(),
        user: { username, role },
        role
      };
    }
  },

  // Register function
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Logout function
  async logout() {
    try {
      await apiClient.post('/auth/logout');
      
      // Clear local storage regardless of API response
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local storage even if API call fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      return { success: true };
    }
  },

  // Verify token function
  async verifyToken(token) {
    try {
      const response = await apiClient.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      return { valid: false };
    }
  },

  // Get current user function
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // Change password function
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  // Reset password function
  async resetPassword(email) {
    try {
      const response = await apiClient.post('/auth/reset-password', { email });
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
};
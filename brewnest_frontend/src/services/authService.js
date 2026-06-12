// src/services/authService.js
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  // Customer Signup
  async customerSignup(userData) {
    const response = await api.post('/customer/auth/signup', userData);
    return response.data;
  },

  // Customer Login
  async customerLogin(email, password) {
    const response = await api.post('/customer/auth/login', { email, password });
    if (response.data.success && response.data.data.token) {
      await this.storeAuthData(response.data.data);
    }
    return response.data;
  },

  // Admin Login
  async adminLogin(email, password) {
    const response = await api.post('/admin/auth/login', { email, password });
    if (response.data.success && response.data.data.token) {
      await this.storeAuthData(response.data.data);
    }
    return response.data;
  },

  // Store auth data
  async storeAuthData(authData) {
    await AsyncStorage.setItem('authToken', authData.token);
    await AsyncStorage.setItem('userData', JSON.stringify({
      id: authData.id,
      email: authData.email,
      fullName: authData.fullName,
      role: authData.role,
    }));
  },

  // Logout
  async logout() {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
  },

  // Get current user
  async getCurrentUser() {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  // Get auth token
  async getAuthToken() {
    return await AsyncStorage.getItem('authToken');
  },
};
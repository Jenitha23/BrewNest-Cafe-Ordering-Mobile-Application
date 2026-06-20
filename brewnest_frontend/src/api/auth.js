import apiClient from './client';

export const authAPI = {
  // Customer endpoints
  customerSignup: (data) => apiClient.post('/customer/auth/signup', data),
  customerLogin: (data) => apiClient.post('/customer/auth/login', data),
  
  // Admin endpoints
  adminLogin: (data) => apiClient.post('/admin/auth/login', data),
  adminCheck: () => apiClient.get('/admin/auth/check'),
};

export default authAPI;
// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, userType) => {
    try {
      let response;
      if (userType === 'admin') {
        response = await authService.adminLogin(email, password);
      } else {
        response = await authService.customerLogin(email, password);
      }
      
      if (response.success) {
        const userData = {
          id: response.data.id,
          email: response.data.email,
          fullName: response.data.fullName,
          role: response.data.role,
        };
        setUser(userData);
        return { success: true, user: userData };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
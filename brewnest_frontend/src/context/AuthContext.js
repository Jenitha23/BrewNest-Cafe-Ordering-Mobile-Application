import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../api/endpoints';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      const userRole = await AsyncStorage.getItem('userRole');
      
      if (token && userData && userRole) {
        setUser({
          ...JSON.parse(userData),
          role: userRole,
          token,
        });
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const customerSignup = async (signupData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.customerSignup(signupData);
      const { data } = response.data;
      
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      await AsyncStorage.setItem('userRole', 'CUSTOMER');
      
      setUser({
        ...data,
        role: 'CUSTOMER',
        token: data.token,
      });
      
      return { success: true, data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const customerLogin = async (loginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.customerLogin(loginData);
      const { data } = response.data;
      
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      await AsyncStorage.setItem('userRole', 'CUSTOMER');
      
      setUser({
        ...data,
        role: 'CUSTOMER',
        token: data.token,
      });
      
      return { success: true, data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid email or password';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (loginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.adminLogin(loginData);
      const { data } = response.data;
      
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      await AsyncStorage.setItem('userRole', 'ADMIN');
      
      setUser({
        ...data,
        role: 'ADMIN',
        token: data.token,
      });
      
      return { success: true, data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid admin credentials';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.multiRemove(['authToken', 'userData', 'userRole']);
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        customerSignup,
        customerLogin,
        adminLogin,
        logout,
        clearError,
        isAuthenticated: !!user,
        userRole: user?.role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
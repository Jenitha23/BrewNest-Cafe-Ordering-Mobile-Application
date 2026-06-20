import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  USER_ROLE: 'userRole',
  THEME: 'theme',
  NOTIFICATIONS: 'notifications',
};

export const storage = {
  // Save data
  setItem: async (key, value) => {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  // Get data
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  // Remove data
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  // Clear all data
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },

  // Multi remove
  removeMultiple: async (keys) => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Storage multi remove error:', error);
    }
  },
};

export { STORAGE_KEYS };
export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
};

export const API_CONFIG = {
  TIMEOUT: 30000,
  BASE_URL: process.env.API_URL || 'http://localhost:8080/api',
};

export const APP_CONFIG = {
  APP_NAME: 'BrewNest',
  VERSION: '1.0.0',
};

export const STORAGE_CONFIG = {
  TOKEN_KEY: 'authToken',
  USER_KEY: 'userData',
  ROLE_KEY: 'userRole',
};
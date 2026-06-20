import apiClient from './client';
import { API_BASE_URL } from '@env';

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  return `${API_BASE_URL}${imageUrl}`;
};

const extractData = (response) => {
  return response?.data?.data ?? response?.data;
};

export const menuApi = {
  // Customer APIs
  getCustomerCategories: async () => {
    const response = await apiClient.get('/customer/menu/categories');
    return extractData(response);
  },

  getCustomerMenuItems: async ({ categoryId, search } = {}) => {
    const params = {};

    if (categoryId) params.categoryId = categoryId;
    if (search) params.search = search;

    const response = await apiClient.get('/customer/menu/items', { params });
    return extractData(response);
  },

  getCustomerMenuItemById: async (id) => {
    const response = await apiClient.get(`/customer/menu/items/${id}`);
    return extractData(response);
  },

  // Admin Category APIs
  getAdminCategories: async () => {
    const response = await apiClient.get('/admin/categories');
    return extractData(response);
  },

  createCategory: async (payload) => {
    const response = await apiClient.post('/admin/categories', payload);
    return extractData(response);
  },

  updateCategory: async (id, payload) => {
    const response = await apiClient.put(`/admin/categories/${id}`, payload);
    return extractData(response);
  },

  deleteCategory: async (id) => {
    const response = await apiClient.delete(`/admin/categories/${id}`);
    return extractData(response);
  },

  // Admin Menu Item APIs
  getAdminMenuItems: async ({ categoryId, status, search } = {}) => {
    const params = {};

    if (categoryId) params.categoryId = categoryId;
    if (status) params.status = status;
    if (search) params.search = search;

    const response = await apiClient.get('/admin/menu-items', { params });
    return extractData(response);
  },

  getAdminMenuItemById: async (id) => {
    const response = await apiClient.get(`/admin/menu-items/${id}`);
    return extractData(response);
  },

  createMenuItem: async (payload) => {
    const response = await apiClient.post('/admin/menu-items', payload);
    return extractData(response);
  },

  updateMenuItem: async (id, payload) => {
    const response = await apiClient.put(`/admin/menu-items/${id}`, payload);
    return extractData(response);
  },

  deleteMenuItem: async (id) => {
    const response = await apiClient.delete(`/admin/menu-items/${id}`);
    return extractData(response);
  },

  updateAvailability: async (id, availabilityStatus) => {
    const response = await apiClient.patch(`/admin/menu-items/${id}/availability`, {
      availabilityStatus,
    });

    return extractData(response);
  },

  uploadMenuItemImage: async (id, imageAsset) => {
    const formData = new FormData();

    const uri = imageAsset.uri;
    const fileName = imageAsset.fileName || `menu-item-${Date.now()}.jpg`;
    const type = imageAsset.mimeType || 'image/jpeg';

    formData.append('image', {
      uri,
      name: fileName,
      type,
    });

    const response = await apiClient.post(`/admin/menu-items/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return extractData(response);
  },

  removeMenuItemImage: async (id) => {
    const response = await apiClient.delete(`/admin/menu-items/${id}/image`);
    return extractData(response);
  },
};
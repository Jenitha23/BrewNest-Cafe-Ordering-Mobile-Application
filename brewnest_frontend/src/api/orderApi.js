import apiClient from './client';

export const orderApi = {

  placeOrder: async (paymentMethod) => {
    const response = await apiClient.post(
      '/customer/orders',
      { paymentMethod }
    );

    return response.data.data;
  },

  getMyOrders: async () => {
    const response = await apiClient.get(
      '/customer/orders'
    );

    return response.data.data;
  },

  getOrder: async (id) => {
    const response = await apiClient.get(
      `/customer/orders/${id}`
    );

    return response.data.data;
  },

  cancelOrder: async (id) => {
    const response = await apiClient.put(
      `/customer/orders/${id}/cancel`
    );

    return response.data.data;
  },

  getAllOrders: async () => {
    const response = await apiClient.get(
      '/admin/orders'
    );

    return response.data.data;
  },

  updateStatus: async (id, status) => {
    const response = await apiClient.put(
      `/admin/orders/${id}/status`,
      { status }
    );

    return response.data.data;
  }
};
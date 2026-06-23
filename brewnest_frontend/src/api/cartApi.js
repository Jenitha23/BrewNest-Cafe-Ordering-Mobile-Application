import apiClient from './client';

export const cartApi = {
  getCart: async () => {
    const response = await apiClient.get('/customer/cart');
    return response.data.data;
  },

  addToCart: async (menuItemId, quantity) => {
    const response = await apiClient.post(
      '/customer/cart',
      {
        menuItemId,
        quantity,
      }
    );

    return response.data.data;
  },

  updateQuantity: async (
    cartItemId,
    quantity
  ) => {
    const response = await apiClient.put(
      `/customer/cart/${cartItemId}`,
      {
        quantity,
      }
    );

    return response.data.data;
  },

  removeItem: async (cartItemId) => {
    const response = await apiClient.delete(
      `/customer/cart/${cartItemId}`
    );

    return response.data.data;
  },

  clearCart: async () => {
    const response = await apiClient.delete(
      '/customer/cart/clear'
    );

    return response.data.data;
  },
};
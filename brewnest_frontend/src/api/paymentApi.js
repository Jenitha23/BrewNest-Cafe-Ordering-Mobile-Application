import api from './client';

export const paymentApi = {
  initPayment: async (orderId) => {
    const response = await api.post(
      `/payments/init/${orderId}`
    );

    return response.data.data;
  },
};
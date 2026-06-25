import api from './client';

export const paymentApi = {
  initPayment: async (paymentRequest) => {
    const response = await api.post(
      '/payments/create',
      paymentRequest
    );

    return response.data;
  },
};
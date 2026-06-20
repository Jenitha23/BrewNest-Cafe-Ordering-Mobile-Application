import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(endpoint, options);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.skip) return;
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
};

export default useApi;
import { useState, useEffect, useCallback } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Add delay for rate limiting protection
      if (retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000 * retryCount));
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        if (response.status === 429 && retryCount < 2) {
          // Retry on rate limit with exponential backoff
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchData(), 5000 * (retryCount + 1));
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setSuccess(true);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, [url, options, retryCount]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    success,
    refetch,
  };
};

export default useFetch;

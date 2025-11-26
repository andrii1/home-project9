import { useState, useEffect } from 'react';

export const useFetch = (fetchFn, initialValue, param) => {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    const fetchData = async (id) => {
      setIsFetching(true);
      try {
        const data = await fetchFn(id);
        setFetchedData(data);
      } catch (e) {
        setError({ message: e.message || 'Failed to fetch data.' });
      }
      setIsFetching(false);
    };
    fetchData(param);
  }, [fetchFn, param]);

  return { isFetching, fetchedData, error };
};

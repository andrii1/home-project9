import { useCallback, useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';

export const useRatings = (user, fieldName, table = 'ratings') => {
  const [ratings, setRatings] = useState([]);
  const [allRatings, setAllRatings] = useState([]);

  const fetchAllRatings = useCallback(async () => {
    const url = `${apiURL()}/${table}`;
    const response = await fetch(url);
    const ratingsData = await response.json();
    setAllRatings(ratingsData);
  }, [table]);

  const fetchRatings = useCallback(async () => {
    if (!user?.uid) return;
    const url = `${apiURL()}/${table}`;
    const response = await fetch(url, {
      headers: {
        token: `token ${user.uid}`,
      },
    });
    const ratingsData = await response.json();
    setRatings(Array.isArray(ratingsData) ? ratingsData : []);
  }, [user, table]);

  useEffect(() => {
    fetchAllRatings();
  }, [fetchAllRatings]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const addRating = async (id) => {
    const response = await fetch(`${apiURL()}/${table}`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [fieldName]: id }),
    });
    if (response.ok) {
      fetchRatings();
      fetchAllRatings();
    }
  };

  const deleteRating = async (id) => {
    const response = await fetch(`${apiURL()}/${table}/${id}`, {
      method: 'DELETE',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      fetchRatings();
      fetchAllRatings();
    }
  };

  return {
    ratings,
    allRatings,
    addRating,
    deleteRating,
  };
};

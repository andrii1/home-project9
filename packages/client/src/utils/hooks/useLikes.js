import { useCallback, useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';

export const useLikes = (user, type) => {
  const [likes, setLikes] = useState([]);
  const [allLikes, setAllLikes] = useState([]);

  const table = type === 'positiveLikes' ? 'positiveLikes' : 'negativeLikes';

  const fetchAllLikes = useCallback(async () => {
    const url = `${apiURL()}/${table}`;
    const response = await fetch(url);
    const ratingsData = await response.json();
    setAllLikes(ratingsData);
  }, [table]);

  const fetchLikes = useCallback(async () => {
    if (!user?.uid) return;
    const url = `${apiURL()}/${table}`;
    const response = await fetch(url, {
      headers: {
        token: `token ${user.uid}`,
      },
    });
    const ratingsData = await response.json();
    setLikes(Array.isArray(ratingsData) ? ratingsData : []);
  }, [user, table]);

  useEffect(() => {
    fetchAllLikes();
  }, [fetchAllLikes]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const addLike = async (codeId) => {
    const response = await fetch(`${apiURL()}/${table}`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code_id: codeId }),
    });
    if (response.ok) {
      fetchLikes();
      fetchAllLikes();
    }
  };

  const deleteLike = async (codeId) => {
    const response = await fetch(`${apiURL()}/${table}/${codeId}`, {
      method: 'DELETE',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      fetchLikes();
      fetchAllLikes();
    }
  };

  return {
    likes,
    allLikes,
    addLike,
    deleteLike,
  };
};

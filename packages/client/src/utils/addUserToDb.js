/* eslint-disable no-console */
import { apiURL } from '../apiURL';

export const addUserToDb = async (user, name) => {
  if (!user || !user.email || !user.uid) return;

  try {
    const response = await fetch(`${apiURL()}/users/check`, {
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const { exists } = data;

    if (!exists) {
      await fetch(`${apiURL()}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name || user.displayName || '',
          email: user.email,
          uid: user.uid,
        }),
      });
    }
  } catch (err) {
    console.error('Error adding user to DB:', err);
  }
};

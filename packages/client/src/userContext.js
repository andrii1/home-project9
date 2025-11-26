import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { apiURL } from './apiURL';
import {
  auth,
  db,
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  logout,
  sendPasswordReset,
} from './firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [customer, setCustomer] = useState(false);
  const fetchUserName = useCallback(async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      /* error */
    }
  }, [user?.uid]);
  // const fetchIfCustomer = useCallback(async () => {
  //   const url = `${apiURL()}/stripe/customers?userEmail=${user?.email}`;
  //   const response = await fetch(url);
  //   const json = await response.json();
  //   if (!json.data.length) {
  //     return setCustomer(false);
  //   }
  //   return setCustomer(true);
  // }, [user?.email]);
  useEffect(() => {
    if (user) {
      fetchUserName();
      // fetchIfCustomer();
    }
    /* if (!user) navigate('/'); */
  }, [user, fetchUserName]);

  const fireBaseProviderValue = useMemo(
    () => ({
      user,
      db,
      name,
      loading,
      customer,
      logInWithEmailAndPassword,
      signInWithGoogle,
      registerWithEmailAndPassword,
      logout,
      sendPasswordReset,
    }),
    [user, name, loading, customer],
  );

  return (
    <UserContext.Provider value={fireBaseProviderValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error('Did you forget to put this under UserProvider');
  }
  return value;
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

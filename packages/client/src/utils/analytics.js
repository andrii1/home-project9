/* import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { analytics, logEvent } from '../firebase';

export const useFirebaseRoutesAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, 'screen_view', {
      firebase_screen: location.pathname, // <- In my case I do not want to include search params, so 'location.pathname' is just what I want
      firebase_screen_class: 'firebase-routes-analytics', // <- This name is up to you
    });
  }, [location]);

  return null;
}; */

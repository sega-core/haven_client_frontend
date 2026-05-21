import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COUNTER_ID } from '../utils';

export const useYandexMetrikaTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.ym) return;

    const fullUrl = location.pathname + location.search + location.hash;
    window.ym(COUNTER_ID, 'hit', fullUrl);
    
    if (import.meta.env.MODE === 'development') {
      console.log(`📊 Yandex Metrika: hit sent for ${fullUrl}`);
    }
  }, [location]);

  return null;
};
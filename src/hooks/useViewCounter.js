import { useState, useEffect } from 'react';

const VIEW_COUNTER_STORAGE_KEY = 'chizng:viewCounter:lastHitMs';
const VIEW_COUNTER_MIN_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

const shouldHitViewCounter = () => {
  try {
    const lastHit = Number.parseInt(localStorage.getItem(VIEW_COUNTER_STORAGE_KEY) || '0', 10);
    return Number.isNaN(lastHit) || (Date.now() - lastHit) > VIEW_COUNTER_MIN_INTERVAL_MS;
  } catch {
    return true;
  }
};

const markViewCounterHit = () => {
  try {
    localStorage.setItem(VIEW_COUNTER_STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore
  }
};

export const useViewCounter = () => {
  const [viewCount, setViewCount] = useState('—');

  useEffect(() => {
    const fetchViewCount = async () => {
      if (document.visibilityState && document.visibilityState !== 'visible') return;

      const shouldHit = shouldHitViewCounter();

      try {
        const response = await fetch(`/api/views?scope=site`, {
          method: shouldHit ? 'POST' : 'GET',
          headers: { 'Accept': 'application/json' },
        });

        const data = await response.json().catch(() => null);
        if (!response.ok || !data || typeof data.total !== 'number') {
          setViewCount('—');
          return;
        }

        setViewCount(data.total.toLocaleString());
        if (shouldHit) markViewCounterHit();
      } catch (error) {
        setViewCount('—');
      }
    };

    fetchViewCount();
  }, []);

  return viewCount;
};

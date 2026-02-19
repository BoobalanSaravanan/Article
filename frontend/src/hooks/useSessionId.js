import { useMemo } from 'react';

export const useSessionId = () => {
  return useMemo(() => {
    const key = 'chessmind_session';
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const created = crypto.randomUUID();
    localStorage.setItem(key, created);
    return created;
  }, []);
};

type CacheData = any;
const cacheStore: Record<string, CacheData> = {};

export const saveToCache = (key: string, data: CacheData) => {
  cacheStore[key] = data;
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
};

export const getFromCache = (key: string): CacheData | null => {
  const cached = cacheStore[key];
  if (cached) return cached;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

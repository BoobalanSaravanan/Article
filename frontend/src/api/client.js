const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchJSON = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || 'Request failed');
  }

  return response.json();
};

export const postEvent = async (event) => fetchJSON('/events', { method: 'POST', body: JSON.stringify(event) });

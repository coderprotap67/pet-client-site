import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:5000',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized request intercepted. User session might be expired.');
    }
    return Promise.reject(error); 
  }
);
export default api;
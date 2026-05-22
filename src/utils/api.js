import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// REQUEST
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE ERROR
api.interceptors.response.use(
  (response) => response,

  (error) => {
    console.log("ERROR URL:", error.config?.url);

    console.log("ERROR STATUS:", error.response?.status);

    console.log("ERROR DATA:", error.response?.data);

    return Promise.reject(error);
  }
);

export default api;
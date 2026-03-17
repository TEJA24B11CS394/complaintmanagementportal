import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://complaintmanagementportal.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

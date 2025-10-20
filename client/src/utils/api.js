import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};

// Resume API
export const resumeAPI = {
  save: async (resumeData) => {
    const response = await api.post('/resume/save', { resumeData });
    return response.data;
  },
  
  get: async () => {
    const response = await api.get('/resume/get');
    return response.data;
  },
  
  delete: async () => {
    const response = await api.delete('/resume/delete');
    return response.data;
  },
  
  generateSummary: async (resumeData) => {
    const response = await api.post('/resume/generate-summary', { resumeData });
    return response.data;
  },
};

export default api;

import axios from 'axios';
import { API_URL } from '../utils/constants';
import { getSession } from '../utils/storage';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  const { token } = await getSession();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    
  } else {
  
  }
  return config;
});

export const request = async (options) => {
  try {
    const response = await apiClient(options);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    throw new Error(message);
  }
};

export default apiClient;
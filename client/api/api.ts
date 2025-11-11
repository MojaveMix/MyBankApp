import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create an Axios instance
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Replace with your API's base URL
  timeout: 10000, // Optional: specify a timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    console.log('token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: add error handling logic, like refreshing the token
    return Promise.reject(error);
  }
);

export default api;

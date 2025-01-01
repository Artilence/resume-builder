import axios from 'axios';
import { logout } from '../auth/authSlice';

// Axios instance
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (Unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token request
        const refreshResponse = await axios.post(
          '/api/refresh/',
          {},
          { withCredentials: true }
        );

        if (refreshResponse.status === 200) {
          // Retry the original request after refreshing token
          return api(originalRequest);
        }
      } catch (refreshError) {
        const { store } = require('../store');
        store.dispatch(logout());
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

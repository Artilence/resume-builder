import axios from 'axios';
import { store } from '../store';
import { logout } from '../auth/authSlice';

// 🔹 Create Axios Instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true, // Send HttpOnly cookies with every request
});

// 🔹 Axios Interceptor – Refresh Token on 401
api.interceptors.response.use(
  (response) => response, // Return successful responses directly
  async (error) => {
    const originalRequest = error.config;

    // If the request fails with 401 (Unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite retry loop

      try {
        // Call /refresh/ to get a new token
        await axios.post('/refresh/', {}, { withCredentials: true });

        // Retry the original request after refresh
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out and redirect to login
        store.dispatch(logout());
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

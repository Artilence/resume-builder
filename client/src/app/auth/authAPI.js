import api from '../api/api';

// Login API Call
export const loginUser = (credentials) => {
  return api.post('/login/', credentials);
};

// Fetch User Profile (Me)
export const fetchUserProfile = () => {
  return api.get('/me/');
};

// Register API Call
export const registerUser = (userData) => {
  return api.post('/register/', userData);
};

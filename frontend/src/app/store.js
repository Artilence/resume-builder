import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import resumePreviewReducer from './resumePreviewSlice/resultPreviewSlice';
import { authAPI } from './auth/authAPI';
//Reducers Summary
//authReducer: Handles user authentication state
//resumePreviewReducer: Manages resume preview data and layout configuration
export const store = configureStore({
  reducer: {
    auth: authReducer,
    resumePreview: resumePreviewReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

export default store;

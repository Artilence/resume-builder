import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import resumePreviewReducer from './resumePreviewSlice/resultPreviewSlice';
//Reducers Summary
//authReducer: Handles user authentication state
//resumePreviewReducer: Manages resume preview data and layout configuration
export const store = configureStore({
  reducer: {
    auth: authReducer,
    resumePreview: resumePreviewReducer,
  },
});

export default store;

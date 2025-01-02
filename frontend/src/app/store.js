import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import resumePreviewReducer from './resumePreviewSlice/resultPreviewSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    resumePreview: resumePreviewReducer,
  },
});

export default store;

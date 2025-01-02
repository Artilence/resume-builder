import { createSlice } from '@reduxjs/toolkit';
import { layoutsConfig } from '../../layoutsconfig';

const initialState = {
  userDetails: {
    profile: { name: '', position: '' },
    contact: { email: '', phone: '', address: '' },
    summary: '',
    professionalExperience: [],
    education: { year: '', degree: '', institution: '' },
    skills: [],
  },
  currentLayout: 'layoutA',
  sections: layoutsConfig['layoutA'].sections,
};

export const resumePreviewSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
    },
    setLayout: (state, action) => {
      state.currentLayout = action.payload;
      state.sections = layoutsConfig[action.payload].sections;
    },
    setSections: (state, action) => {
      state.sections = action.payload;
    },
  },
});

export const { setUserDetails, setLayout, setSections } =
  resumePreviewSlice.actions;
export default resumePreviewSlice.reducer;

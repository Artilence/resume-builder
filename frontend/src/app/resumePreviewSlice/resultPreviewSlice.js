import { createSlice } from '@reduxjs/toolkit';
import { layoutsConfig } from '../../layoutsconfig';

// Dynamically generate initial userDetails from layout config(to makes sure every field in resume should be present in user form)
// --------------------------------------------------------------------------------------------------------------------------
//Future Logic for userdetails:
//1.get the Ai generated object field from backend
//2.remove fields from recieved object that are not in the layout
//  E.G if we dont have skills section in resume then we are removing skills field from object recieved by ai model.
const generateUserDetailsFromLayout = (layoutId) => {
  const layout = layoutsConfig[layoutId];
  const initialDetails = {};

  layout.sections.forEach((section) => {
    // console.log('section:', section, '\n');
    section.fields.forEach((field) => {
      // console.log('field:', field, '\n');

      const keys = field.key.split('.');
      let current = initialDetails;

      // Traverse and build nested structure
      keys.forEach((key, index) => {
        // console.log('key:', key, '\n');

        if (index === keys.length - 1) {
          current[key] =
            field.type === 'array' ? [] : field.type === 'text' ? '' : null;
        } else {
          if (!current[key]) current[key] = {};
          current = current[key];
        }
        // console.log('-KE-');
      });
      // console.log('-FE-');
    });
    // console.log('-S-');
  });
  // console.log(initialDetails);

  return initialDetails;
};

// Get initial layout and user details
const initialLayout = 'layoutA';
const initialUserDetails = generateUserDetailsFromLayout(initialLayout);

const initialState = {
  userDetails: initialUserDetails,
  currentLayout: initialLayout,
  sections: layoutsConfig[initialLayout].sections,
};

export const resumePreviewSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Update user details dynamically
    setUserDetails: (state, action) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
    },

    // Change layout and regenerate userDetails & sections
    setLayout: (state, action) => {
      const newLayout = action.payload;
      state.currentLayout = newLayout;
      state.sections = layoutsConfig[newLayout].sections;
      state.userDetails = generateUserDetailsFromLayout(newLayout); // Regenerate userDetails for new layout
    },

    setSections: (state, action) => {
      state.sections = action.payload;
    },
  },
});

export const { setUserDetails, setLayout, setSections } =
  resumePreviewSlice.actions;
export default resumePreviewSlice.reducer;

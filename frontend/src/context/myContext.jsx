// MyProvider.jsx
import React, { useEffect, useState } from 'react';
import { MyContext } from './MyContext';
import { layoutsConfig } from '../layoutsConfig';

export const MyProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    profile: { name: '', position: '' },
    contact: { email: '', phone: '', address: '' },
    summary: '',
    professionalExperience: [],
    education: { year: '', degree: '', institution: '' },
    skills: [],
  });

  // Layout selection
  const [currentLayout, setCurrentLayout] = useState('layoutA');

  // Sections order stored in context
  const [sections, setSections] = useState(
    layoutsConfig['layoutA'].sections // default to layoutA’s sections
  );

  // If user changes layout, update sections to match that new layout
  useEffect(() => {
    setSections(layoutsConfig[currentLayout].sections);
  }, [currentLayout]);

  return (
    <MyContext.Provider
      value={{
        userDetails,
        setUserDetails,
        currentLayout,
        setCurrentLayout,
        sections,
        setSections,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

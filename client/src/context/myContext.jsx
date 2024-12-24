import React from 'react';
import { MyContext } from './MyContext';

export const MyProvider = ({ children }) => {
  const [userDetails, setUserDetails] = React.useState({
    profile: {
      name: '',
      position: '',
    },
    contact: {
      email: '',
      phone: '',
      address: '',
    },
    summary: '',
    professionalExperience: [],
    education: {
      year: '',
      degree: '',
      institution: '',
    },
    skills: [],
  });

  const [sections, setSections] = React.useState([
    { id: 'profile', title: 'Profile' },
    { id: 'contact', title: 'Contact' },
    { id: 'summary', title: 'Summary' },
    { id: 'professional-experience', title: 'Professional Experience' },
    { id: 'education', title: 'Education' },
    { id: 'skills', title: 'Skills' },
  ]);

  return (
    <MyContext.Provider
      value={{ userDetails, setUserDetails, sections, setSections }}
    >
      {children}
    </MyContext.Provider>
  );
};

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
    },
  });

  return (
    <MyContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </MyContext.Provider>
  );
};

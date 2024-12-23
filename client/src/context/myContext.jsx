import React from 'react';
import { MyContext } from './MyContext';

export const MyProvider = ({ children }) => {
  const [userDetails, setUserDetails] = React.useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
  });

  return (
    <MyContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </MyContext.Provider>
  );
};

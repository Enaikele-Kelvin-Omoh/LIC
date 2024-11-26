import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pageLinks } from '../site/pageLinks';
import { hideLoader, showLoader } from '../utils/loader';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userCredential, setUserCredential] = useState(undefined);
  const [userLiveData, setUserLiveData] = useState(null);

  // Live site operations
  useEffect(() => {
    if (location.pathname === pageLinks.authPage.baseUrl) return;
    console.log(userCredential);

    switch (userCredential) {
      case null:
        hideLoader('auth-loader');
        navigate(pageLinks.authPage.baseUrl);
        break;
      case undefined:
        showLoader('auth-loader');
        break;
      default:
        hideLoader('auth-loader');
    }
  }, [userCredential, location]);
  const signup = ({ loginInformation }) => {};
  const login = () => {};
  const signout = () => {};
  return (
    <authContext.Provider
      value={{ userCredential, userLiveData, signup, login, signout }}
    >
      {children}
    </authContext.Provider>
  );
};

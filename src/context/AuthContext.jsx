import React, { createContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userCredential, setUserCredential] = useState(undefined);
  const [userLiveData, setUserLiveData] = useState(null);
  const signup = () => {};
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

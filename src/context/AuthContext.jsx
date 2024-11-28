import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pageLinks } from '../site/pageLinks';
import { hideLoader, showLoader } from '../utils/loader';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { createAccount, liveAccountData } from '../controllers/account';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserCredential(user);
    });
    // return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userCredential) return;

    liveAccountData(userCredential.uid, (data) => setUserLiveData(data));
  }, [userCredential]);

  const signup = ({ email, password, firstname, lastname }, setLoading) => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const authResp = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await createAccount(firstname, lastname, email, authResp.user.uid);

        setUserCredential(authResp.user);
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };
  const login = ({ email, password }, setLoading) => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const authResp = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUserCredential(authResp.user);
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };
  const signout = () => {
    signOut(auth);
  };
  return (
    <authContext.Provider
      value={{ userCredential, userLiveData, signup, login, signout }}
    >
      {children}
    </authContext.Provider>
  );
};

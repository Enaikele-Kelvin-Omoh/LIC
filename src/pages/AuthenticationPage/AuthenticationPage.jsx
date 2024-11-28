// import React from "react";
import './AuthenticationPage.css';
import { useState } from 'react';
import logo from '/src/assets/logo.png';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { pageLinks } from '../../site/pageLinks';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const { firstname, lastname, email, password } = signupInfo;
      if (!firstname || !lastname || !email || !password)
        return toast.error('Supply all information');

      await signup(signupInfo, setIsLoading);
      toast('Accont Successfully created');
      toast(`Welcome, ${lastname} ${firstname}`);
      navigate(pageLinks.dashboardPage.baseUrla);
    } catch (error) {
      console.error(error);
      if (error.message.includes('auth/email-already-in-use')) {
        return toast.error('Your account already exists');
      }
      toast.error("Couldn't create an account");
    }
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = loginInfo;
      console.log(loginInfo);

      if (!email || !password) return toast.error('Supply all information');

      await login(loginInfo, setIsLoading);
      toast('Account successfully validated');

      navigate(pageLinks.dashboardPage.baseUrl);
    } catch (error) {
      console.error(error);
      if (error.message.includes('auth/invalid-credential')) {
        return toast.error('Wrong credentials');
      }
      toast.error("Couldn't verify your information");
    }
  };
  return (
    <div className="AuthenticationPage drop-animation">
      <div className="auth-container">
        <img src={logo} alt="Logo" className="auth-logo" />
        <h2 className="auth-text">
          {!isLogin ? 'Create an Account' : 'Login to your account'}
        </h2>
        <div className="auth-action">
          <div
            className={`auth-login ${isLogin ? 'auth-active' : ''}`}
            onClick={!isLoading && (() => setIsLogin(true))}
          >
            <p>Login</p>
          </div>
          <span>|</span>
          <div
            className={`auth-sign-up ${!isLogin ? 'auth-active' : ''}`}
            onClick={!isLoading && (() => setIsLogin(false))}
          >
            <p>Signup</p>
          </div>
        </div>

        <form className="auth-form auth-form-login">
          <div className="form-block">
            {!isLogin && (
              <>
                <div className="name-block w-full">
                  <input
                    type="text"
                    placeholder="Firstname"
                    className="auth-fname"
                    value={signupInfo.firstname}
                    onChange={(e) =>
                      setSignupInfo({
                        ...signupInfo,
                        firstname: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Lastname"
                    className="auth-lname"
                    value={signupInfo.lastname}
                    onChange={(e) =>
                      setSignupInfo({
                        ...signupInfo,
                        lastname: e.target.value,
                      })
                    }
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="auth-email shrink-0"
                  value={signupInfo.email}
                  onChange={(e) =>
                    setSignupInfo({
                      ...signupInfo,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="auth-password  shrink-0"
                  value={signupInfo.password}
                  onChange={(e) =>
                    setSignupInfo({
                      ...signupInfo,
                      password: e.target.value,
                    })
                  }
                />
              </>
            )}
            {isLogin && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="auth-email  shrink-0"
                  value={loginInfo.email}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, email: e.target.value })
                  }
                ></input>
                <input
                  type="password"
                  placeholder="Password"
                  className="auth-password  shrink-0"
                  value={loginInfo.password}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, password: e.target.value })
                  }
                ></input>
              </>
            )}
          </div>
          <div className="btn-block">
            <Button
              isLoading={isLoading}
              loadingText={'Verifying Account'}
              className="auth-btn-submit"
              onClick={!isLogin ? handleSignup : handleLogin}
              text={!isLogin ? 'Create an account' : 'Login'}
            />
          </div>
        </form>

        {/* {isLogin && (
          <>
            <input
              type="email"
              placeholder="Email"
              className="auth-email"
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="auth-password"
            ></input>
          </>
        )} */}
      </div>
    </div>
  );
};

export default AuthenticationPage;

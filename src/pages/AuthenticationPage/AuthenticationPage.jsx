// import React from "react";
import './AuthenticationPage.css';
import { useState } from 'react';
import logo from '/src/assets/logo.png';

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(false);
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
            onClick={() => setIsLogin(true)}
          >
            <p>Login</p>
          </div>
          <span>|</span>
          <div
            className={`auth-sign-up ${!isLogin ? 'auth-active' : ''}`}
            onClick={() => setIsLogin(!isLogin)}
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
                  />
                  <input
                    type="text"
                    placeholder="Lastname"
                    className="auth-lname"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="auth-email shrink-0"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="auth-password  shrink-0"
                />
              </>
            )}
            {isLogin && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="auth-email  shrink-0"
                ></input>
                <input
                  type="password"
                  placeholder="Password"
                  className="auth-password  shrink-0"
                ></input>
              </>
            )}
          </div>
          <div className="btn-block">
            <button type="submit" className="auth-btn-submit">
              {!isLogin ? 'Create an account' : 'Login'}
            </button>
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

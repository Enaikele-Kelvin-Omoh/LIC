// import React from "react";
import './AuthenticationPage.css';
import { useState } from 'react';
import logo from '/src/assets/logo.png';

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="AuthenticationPage">
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
            Login
          </div>
          <span>|</span>
          <div
            className={`auth-sign-up ${!isLogin ? 'auth-active' : ''}`}
            onClick={() => setIsLogin(!isLogin)}
          >
            Sign up
          </div>
        </div>

        <form className="auth-form auth-form-login">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Firstname"
                className="auth-fname"
              ></input>
              <input
                type="text"
                placeholder="Lastname"
                className="auth-lname"
              ></input>
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
          )}
          {isLogin && (
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
          )}
          <button type="submit" className="auth-btn-submit">
            {!isLogin ? 'Create an account' : 'Login'}
          </button>
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

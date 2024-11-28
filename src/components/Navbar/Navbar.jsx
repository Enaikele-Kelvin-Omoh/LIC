import React, { useState } from 'react';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { pageLinks } from '../../site/pageLinks';
import LogoComponent from '../LogoComponent/LogoComponent';
import Avatar from '../Avatar/Avatar';
import AccountComponent from '../AccountComponent/AccountComponent';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLiveData, signout } = useAuth();
  const [accountVisible, setAccountVisible] = useState(false);

  if (location.pathname === pageLinks.authPage.baseUrl) return null;
  return (
    <div className="Navbar flex justify-between items-center fade-down">
      <div className="left-container">
        <LogoComponent />
      </div>
      <div className="right-container flex items-center">
        <button
          className="btn-2"
          onClick={() => navigate(pageLinks.dashboardPage.baseUrl)}
        >
          My Dashboard
          <i className="fa-solid fa-book-bookmark"></i>
        </button>
        <Avatar
          onClick={() => {
            setAccountVisible(!accountVisible);
          }}
          photoURL={userLiveData?.photoURL}
        />
      </div>
      <AccountComponent
        visible={accountVisible}
        userLiveData={userLiveData}
        onSignout={() => {
          setAccountVisible(false);
          signout();
        }}
      />
    </div>
  );
};

export default Navbar;

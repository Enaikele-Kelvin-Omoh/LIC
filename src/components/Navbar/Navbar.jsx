import React, { useState } from 'react';
import './Navbar.css';
import { useLocation } from 'react-router-dom';
import { pageLinks } from '../../site/pageLinks';
import LogoComponent from '../LogoComponent/LogoComponent';
import Avatar from '../Avatar/Avatar';
import AccountComponent from '../AccountComponent/AccountComponent';

const Navbar = () => {
  const location = useLocation();
  const [accountVisible, setAccountVisible] = useState(false);

  if (location.pathname === pageLinks.authPage.baseUrl) return null;
  return (
    <div className="Navbar flex justify-between items-center fade-down">
      <div className="left-container">
        <LogoComponent />
      </div>
      <div className="right-container flex items-center">
        <button className="btn-2">
          My Dashboard
          <i className="fa-solid fa-book-bookmark"></i>
        </button>
        <Avatar
          onClick={() => {
            console.log('kj');

            setAccountVisible(!accountVisible);
          }}
        />
      </div>
      <AccountComponent visible={accountVisible} />
    </div>
  );
};

export default Navbar;

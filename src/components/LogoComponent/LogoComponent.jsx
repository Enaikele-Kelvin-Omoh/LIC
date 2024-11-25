import React from 'react';
import './LogoComponent.css';
import Logo from '../../assets/logo.png';

const LogoComponent = () => {
  return (
    <div className="LogoComponent flex items-center">
      <img src={Logo} alt="" />
      <div className="name-container flex flex-col">
        <p className="short-name">LIC</p>
        <p className="full-name">Learn in comfort</p>
      </div>
    </div>
  );
};

export default LogoComponent;

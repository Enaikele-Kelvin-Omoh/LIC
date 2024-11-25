import React from 'react';
import './Navbar.css';
import { useLocation } from 'react-router-dom';
import { pageLinks } from '../../site/pageLinks';

const Navbar = () => {
  const location = useLocation();

  if (location.pathname === pageLinks.authPage.baseUrl) return null;
  return <div className="Navbar">Navbar</div>;
};

export default Navbar;

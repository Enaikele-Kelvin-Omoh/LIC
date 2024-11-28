import React from 'react';
import './Avatar.css';

const Avatar = ({ onClick, photoURL }) => {
  return <img src={photoURL} alt="/img" className="Avatar" onClick={onClick} />;
};

export default Avatar;

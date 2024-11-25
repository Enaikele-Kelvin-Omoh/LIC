import React from 'react';
import './Avatar.css';

const Avatar = ({ onClick }) => {
  return (
    <img
      src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt=""
      className="Avatar"
      onClick={onClick}
    />
  );
};

export default Avatar;

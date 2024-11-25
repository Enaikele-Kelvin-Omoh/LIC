import React from 'react';
import './AccountComponent.css';

const AccountComponent = ({ visible }) => {
  return (
    <div
      className={`AccountComponent ${
        visible ? ' AccountComponent-active' : 'AccountComponent-inactive'
      } flex flex-col items-center`}
    >
      <img
        src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <p className="email">oluwarotimiadeola@gmail.com</p>
      <div className="input-block w-full">
        <input type="text" placeholder="Firstname" />
        <input type="text" placeholder="Lastname" />
        <input type="text" placeholder="School or Instituition" />
      </div>
      <button>Save changes</button>
      <div className="signout-container">
        <i className="fa-solid fa-right-from-bracket"></i>
        <p>Signout</p>
      </div>
    </div>
  );
};

export default AccountComponent;

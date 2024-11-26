import React from 'react';
import './AccountComponent.css';

const AccountComponent = ({ visible, userLiveData, onSignout }) => {
  return (
    <div
      className={`AccountComponent ${
        visible ? ' AccountComponent-active' : 'AccountComponent-inactive'
      } flex flex-col items-center`}
    >
      <img src={userLiveData?.photoURL} alt="" />
      <p className="email">{userLiveData?.email}</p>
      <div className="input-block w-full">
        <input
          type="text"
          placeholder="Firstname"
          value={userLiveData?.firstname}
        />
        <input
          type="text"
          placeholder="Lastname"
          value={userLiveData?.lastname}
        />
        <input
          type="text"
          placeholder="School or Instituition"
          value={userLiveData?.institution}
        />
      </div>
      <button>Save changes</button>
      <div className="signout-container" onClick={onSignout}>
        <i className="fa-solid fa-right-from-bracket"></i>
        <p>Signout</p>
      </div>
    </div>
  );
};

export default AccountComponent;

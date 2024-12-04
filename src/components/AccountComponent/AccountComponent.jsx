import React, { useEffect, useState } from 'react';
import './AccountComponent.css';
import { toast } from 'react-toastify';
import { fetchAccountData, updateUserData } from '../../controllers/account';

const AccountComponent = ({ visible, userCredentials, onSignout }) => {
  const [accountData, setAccountData] = useState();
  const [reset, setReset] = useState(false);

  const onLoad = async () => {
    try {
      const data = await fetchAccountData(userCredentials.uid);
      setAccountData(data);
    } catch (error) {
      console.error(error);
      toast.error("Can't load account information");
    }
  };
  const handleSaveChanges = async () => {
    try {
      await updateUserData(userCredentials.uid, accountData);
      setReset((p) => !p);
      toast('Successfully saved update');
    } catch (error) {
      console.error(error);
      toast.error('Error saving update');
    }
  };
  useEffect(() => {
    if (!userCredentials) return;
    onLoad();
  }, [userCredentials, visible, reset]);
  return (
    <div
      className={`AccountComponent ${
        visible ? ' AccountComponent-active' : 'AccountComponent-inactive'
      } flex flex-col items-center`}
    >
      <img src={accountData?.photoURL} alt="" />
      <p className="email">{accountData?.email}</p>
      <div className="input-block w-full">
        <input
          type="text"
          placeholder="Firstname"
          value={accountData?.firstname}
          onChange={(e) =>
            setAccountData((p) => ({ ...p, firstname: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Lastname"
          value={accountData?.lastname}
          onChange={(e) =>
            setAccountData((p) => ({ ...p, lastname: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="School or Instituition"
          value={accountData?.institution}
          onChange={(e) =>
            setAccountData((p) => ({ ...p, institution: e.target.value }))
          }
        />
      </div>
      <button onClick={handleSaveChanges}>Save changes</button>
      <div className="signout-container" onClick={onSignout}>
        <i className="fa-solid fa-right-from-bracket"></i>
        <p>Signout</p>
      </div>
    </div>
  );
};

export default AccountComponent;

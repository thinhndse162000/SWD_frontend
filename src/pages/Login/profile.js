import React from 'react';
import { UserAuth } from '../Login/AuthContext';
import './styles.css';
const Account = () => {
  const { logOut, user } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-[300px] m-auto'>
      <h1 className='text-center text-2xl font-bold pt-12'>Profile</h1>
      <div className='container-profile-information'>
        <p>Welcome, {user?.displayName}</p>
        <img src={user?.photoURL} />
        <h1>{user?.email}</h1>
      </div>
      <div>
        <image src> </image>
      </div>
      <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>
        Logout
      </button>
    </div>
  );
};

export default Account;
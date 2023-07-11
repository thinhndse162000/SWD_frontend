
import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../Login/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles.css';
const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/profile');
    }
  }, [user]);

  return (
    <div>
      <div className='max-w-[240px] m-auto py-4'>
        <div className='google-button'>
        <h1 className='text-center text-3xl font-bold py-8'>Login</h1>
        <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default Login;
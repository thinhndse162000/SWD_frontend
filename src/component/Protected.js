import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../pages/Login/AuthContext';

const Protected = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default Protected;
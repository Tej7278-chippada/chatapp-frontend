// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" state={{ message: 'Please login first.' }} />;
  }

  return children;
};

export default PrivateRoute;

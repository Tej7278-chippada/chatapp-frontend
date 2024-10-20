import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');

  // If the user is not authenticated, redirect them to the login page
  if (!authToken) {
    return <Navigate to="/" />;
  }

  return children; // Render the child components (e.g., the Chat page) if authenticated
};

export default ProtectedRoute;

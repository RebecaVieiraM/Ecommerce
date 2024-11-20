import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ roles }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
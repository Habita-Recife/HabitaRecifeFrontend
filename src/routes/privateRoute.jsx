import React from 'react';
import { Navigate } from 'react-router-dom';
import { getDados } from '../utils/utils'; 

function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const userData = getDados(token);
  const userRoles = userData ? userData.roles : [];

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/acesso-negado" />;
  }

  return children;
}

export default PrivateRoute;
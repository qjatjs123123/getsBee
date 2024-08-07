import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userState';

const PrivateRoute = () => {
  const isAuthenticated = useRecoilValue(userState);

  return isAuthenticated ? <Outlet /> : <Navigate to="/about" replace />;
};

export default PrivateRoute;

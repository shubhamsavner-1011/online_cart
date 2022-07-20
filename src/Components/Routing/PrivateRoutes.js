import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from './RoutePath';
export const PrivateRoutes = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate(LOGIN_PAGE);
    }
  });
  return <Component />;
};

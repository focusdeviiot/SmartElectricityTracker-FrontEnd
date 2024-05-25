import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: string[];
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (auth === undefined) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredRole && !requiredRole.includes(auth.role as string)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;

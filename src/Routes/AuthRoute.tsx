import { Outlet, Navigate } from 'react-router-dom';

import useAuthContext from '../hooks/useAuthContext';

export function AuthRoute() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function NonAuthRoute() {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

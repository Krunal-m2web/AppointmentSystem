import { Navigate, useLocation } from 'react-router-dom';
import { getToken, isTokenExpired } from '../../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getToken();
  const location = useLocation();

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/auth/staff" state={{ from: location }} replace />;
  }

  return children;
};

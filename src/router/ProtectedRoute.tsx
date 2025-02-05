import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@stores/AuthStore';

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/example/login' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

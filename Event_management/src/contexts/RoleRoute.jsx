import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

function RoleRoute({ requiredRole = 'admin' }) {
  const { user, loading, isAuthenticated } = useAuth(); // auth true na 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-gray-700">Loading authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) { // auth false endru meaning inga
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (user && user.data && user.data.role === requiredRole) {
    return <Outlet />;
  }

  // If not authorized, redirect to home or unauthorized page
  return <Navigate to="/" replace />;
}

export default RoleRoute;

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!user || (user.role !== 'author' && user.role !== 'master')) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
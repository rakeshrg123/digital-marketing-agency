import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  const expiry = localStorage.getItem('admin_token_expiry');

  // Check if token is expired
  if (!token || !expiry || Date.now() > parseInt(expiry)) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token_expiry');
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;

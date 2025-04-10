import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div></div>;

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles.length > 0) {
    const hasPermission = allowedRoles.some(role => user?.roles?.includes(role));
    if (!hasPermission) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default PrivateRoute;
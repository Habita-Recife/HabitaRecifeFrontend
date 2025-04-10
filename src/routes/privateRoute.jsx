import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const hasPermission = allowedRoles.some(role => user?.roles?.includes(role));

  return hasPermission ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

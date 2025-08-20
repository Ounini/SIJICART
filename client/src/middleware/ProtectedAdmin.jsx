import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdmin = ({ children }) => {
  const { userLoggedIn, isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!userLoggedIn) return <Navigate to="/" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedAdmin;

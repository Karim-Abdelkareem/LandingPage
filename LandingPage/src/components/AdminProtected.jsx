// components/AdminProtected.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtected = ({ children }) => {
  const { isAuthenticated, loading, authChecked } = useAuth();

  if (!authChecked) return <div>Checking auth...</div>;
  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default AdminProtected;

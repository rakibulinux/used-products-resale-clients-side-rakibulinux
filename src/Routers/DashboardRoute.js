import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <h1 className="text-3xl text-center">Loading</h1>;
  }
  if (user && isAdmin) {
    return children;
  }
  return (
    signOutUser(), (<Navigate to="/login" state={{ from: location }} replace />)
  );
};

export default AdminRoute;

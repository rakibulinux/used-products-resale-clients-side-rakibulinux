import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import Spinner from "../components/Spinner/Spinner";

const AdminRoute = ({ children }) => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <Spinner />;
  }
  if (user && isAdmin) {
    return children;
  }
  return (
    signOutUser(), (<Navigate to="/login" state={{ from: location }} replace />)
  );
};

export default AdminRoute;

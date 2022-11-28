import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const {
    user,
    loading,
    signOutUser: logoutUserAccount,
  } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  // const location = useLocation();
  if (loading || isAdminLoading) {
    return <Spinner />;
  }
  if (!user && !isAdmin) {
    return (
      logoutUserAccount(),
      (<Navigate to="/" state={{ from: location }} replace />)
    );
  }
  return children;
};
export default AdminRoute;

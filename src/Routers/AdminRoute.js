import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();
  // const token = localStorage.getItem("usedPhoneToken");
  // console.log(token);
  if (loading || isAdminLoading) {
    return <Spinner />;
  }
  if (!user && !isAdmin) {
    return (
      signOutUser(),
      (<Navigate to="/login" state={{ from: location }} replace />)
    );
  }
  return children;
};

export default AdminRoute;

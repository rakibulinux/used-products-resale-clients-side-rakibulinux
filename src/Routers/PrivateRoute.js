import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("usedPhoneToken");
  console.log(token);

  if (loading) {
    return <Spinner />;
  }
  // if (!token) {
  //   return children;
  // }

  if (user && user?.uid && token) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;

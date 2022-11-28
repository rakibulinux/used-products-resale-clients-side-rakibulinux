import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../hooks/useSeller";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../contexts/AuthProvider";

const SellerRoute = ({ children }) => {
  const {
    user,
    loading,
    signOutUser: logoutUserAccount,
  } = useContext(AuthContext);
  const location = useLocation();
  const [isSeller, isSellerLoading] = useSeller(user?.email);

  if (loading || isSellerLoading) {
    return <Spinner />;
  }
  if (!user && !isSeller) {
    return (
      logoutUserAccount(),
      (
        // location(null),
        <Navigate to="/" state={{ from: location }} replace />
      )
    );
  }
  return children;
};

export default SellerRoute;

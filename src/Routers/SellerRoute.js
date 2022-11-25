import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../hooks/useSeller";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../contexts/AuthProvider";

const SellerRoute = ({ children }) => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const location = useLocation();
  if (loading || isSellerLoading) {
    return <Spinner />;
  }
  if (user && isSeller) {
    return children;
  }
  return (
    signOutUser(), (<Navigate to="/login" state={{ from: location }} replace />)
  );
};

export default SellerRoute;

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useBuyer from "../hooks/useBuyer";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../contexts/AuthProvider";

const BuyerRoute = ({ children }) => {
  const {
    user,
    loading,
    signOutUser: logoutUserAccount,
  } = useContext(AuthContext);
  const location = useLocation();

  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  // const location = useLocation();
  if (loading || isBuyerLoading) {
    return <Spinner />;
  }
  if (!user && !isBuyer) {
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

export default BuyerRoute;

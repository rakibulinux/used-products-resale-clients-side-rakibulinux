import React, { useContext } from "react";
import Spinner from "../../../../components/Spinner/Spinner";
import { AuthContext } from "../../../../contexts/AuthProvider";

const WelcomeDashboard = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-center text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-sky-600 sm:mr-3 md:mb-0">
        Welcome to your Dashboard
      </h1>
    </div>
  );
};

export default WelcomeDashboard;

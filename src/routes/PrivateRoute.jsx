import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import SandClock from "../components/SandClock";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80.36px)]">
        <SandClock></SandClock>
      </div>
    );
  } else if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  }
};

export default PrivateRoute;

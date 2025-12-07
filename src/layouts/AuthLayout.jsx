import React from "react";
import authImage from "../assets/authImage.png";
import { Outlet } from "react-router";
import Register from "../pages/Auth/Register";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center">
      <div className="hidden sm:block h-screen">
        <img className="h-full" src={authImage} alt="Authentication Image" />
      </div>
      <div className="flex-1 h-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;

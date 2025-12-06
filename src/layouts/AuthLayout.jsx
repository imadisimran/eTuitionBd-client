import React from "react";
import authImage from "../assets/authImage.png";
import { Outlet } from "react-router";
import Register from "../pages/Auth/Register";

const AuthLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden sm:block">
        <img className="h-screen" src={authImage} alt="Authentication Image" />
      </div>
      <div className="flex-1 h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;

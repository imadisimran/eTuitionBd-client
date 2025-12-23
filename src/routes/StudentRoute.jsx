import React from "react";
import useRole from "../hooks/useRole";
import SandClock from "../components/SandClock";
import { Navigate } from "react-router";

const StudentRoute = ({ children }) => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <SandClock size="250px"></SandClock>
      </div>
    );
  } else if (role === "student") {
    return children;
  } else {
    return <Navigate to="/"></Navigate>;
  }
};

export default StudentRoute;

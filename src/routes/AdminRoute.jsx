import React from "react";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  } else if (role === "admin") {
    return children;
  } else {
    return <div>You don't have access to it</div>;
  }
};

export default AdminRoute;

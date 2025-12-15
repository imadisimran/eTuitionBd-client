import React from "react";
import useRole from "../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";

const DashboardHome = () => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  } else if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  }
};

export default DashboardHome;

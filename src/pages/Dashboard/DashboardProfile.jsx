import React from "react";
import useRole from "../../hooks/useRole";
import StudentDashboardProfile from "./StudentDashboardProfile";

const DashboardProfile = () => {
  const [role, roleLoading] = useRole();

  if (roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (role === "student") {
    return <StudentDashboardProfile></StudentDashboardProfile>;
  }
};

export default DashboardProfile;

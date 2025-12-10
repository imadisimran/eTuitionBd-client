import React from "react";
import useRole from "../../hooks/useRole";
import StudentDashboardProfile from "./StudentDashboardProfile";
import AdminDashboardProfile from "./AdminDashboardProfile";
import TutorDashboardProfile from "./TutorDashboardProfile";

const DashboardProfile = () => {
  const [role, roleLoading] = useRole();

  if (roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (role === "student") {
    return <StudentDashboardProfile></StudentDashboardProfile>;
  } else if (role === "admin") {
    return <AdminDashboardProfile></AdminDashboardProfile>;
  } else if (role === "tutor") {
    return <TutorDashboardProfile></TutorDashboardProfile>;
  }
};

export default DashboardProfile;

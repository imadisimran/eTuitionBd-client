import React from "react";
import useRole from "../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import StudentDashboardHome from "./StudentDashboardHome";
import TutorDashboardHome from "./TutorDashboardHome";

const DashboardHome = () => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  } else if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "student") {
    return <StudentDashboardHome></StudentDashboardHome>;
  } else if (role === "tutor") {
    return <TutorDashboardHome></TutorDashboardHome>;
  }
};

export default DashboardHome;

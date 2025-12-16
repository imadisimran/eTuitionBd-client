import React from "react";
import useRole from "../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import StudentDashboardHome from "./StudentDashboardHome";
import TutorDashboardHome from "./TutorDashboardHome";
import SandClock from "../../components/SandClock";

const DashboardHome = () => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <SandClock size="250px"></SandClock>
      </div>
    );
  } else if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "student") {
    return <StudentDashboardHome></StudentDashboardHome>;
  } else if (role === "tutor") {
    return <TutorDashboardHome></TutorDashboardHome>;
  }
};

export default DashboardHome;

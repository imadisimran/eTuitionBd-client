import React from "react";
import useRole from "../../hooks/useRole";
import StudentDashboardProfile from "./StudentDashboardProfile";
import AdminDashboardProfile from "./AdminDashboardProfile";
import TutorDashboardProfile from "./TutorDashboardProfile";
import SandClock from "../../components/SandClock";

const DashboardProfile = () => {
  const [role, roleLoading] = useRole();

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80.36px)]">
        <SandClock></SandClock>
      </div>
    );
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

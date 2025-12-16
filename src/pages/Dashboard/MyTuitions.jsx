import React from "react";
import useRole from "../../hooks/useRole";
import MyTuitionsStudent from "./MyTuitionsStudent";
import MyTuitionTutor from "./MyTuitionTutor";
import SandClock from "../../components/SandClock";

const MyTuitions = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <SandClock size="250px"></SandClock>
      </div>
    );
  } else if (role === "student") {
    return <MyTuitionsStudent></MyTuitionsStudent>;
  } else if (role === "tutor") {
    return <MyTuitionTutor></MyTuitionTutor>;
  } else {
    return <div>You don't have access to it</div>;
  }
};

export default MyTuitions;

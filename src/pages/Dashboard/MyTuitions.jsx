import React from "react";
import useRole from "../../hooks/useRole";
import MyTuitionsStudent from "./MyTuitionsStudent";
import MyTuitionTutor from "./MyTuitionTutor";

const MyTuitions = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  } else if (role === "student") {
    return <MyTuitionsStudent></MyTuitionsStudent>;
  } else if (role === "tutor") {
    return <MyTuitionTutor></MyTuitionTutor>;
  } else {
    return <div>You don't have access to it</div>;
  }
};

export default MyTuitions;

import React from "react";
import useRole from "../../hooks/useRole";
import MyTuitionsStudent from "./MyTuitionsStudent";

const MyTuitions = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  // console.log(role)
  if (role === "student") {
    return <MyTuitionsStudent></MyTuitionsStudent>;
  }
};

export default MyTuitions;

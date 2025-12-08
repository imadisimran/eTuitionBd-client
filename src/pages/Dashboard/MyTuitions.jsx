import React from "react";
import useRole from "../../hooks/useRole";
import MyTuitionsStudent from "./MyTuitionsStudent";

const MyTuitions = () => {
  const [role] = useRole();
  console.log(role)
  if (role === "student") {
    return <MyTuitionsStudent></MyTuitionsStudent>;
  }
};

export default MyTuitions;

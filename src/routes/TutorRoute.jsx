import React from "react";
import useRole from "../hooks/useRole";

const TutorRoute = ({ children }) => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  } else if (role === "tutor") {
    return children;
  } else {
    return <div>You don't have access to it</div>;
  }
};

export default TutorRoute;

import React from "react";
import useRole from "../hooks/useRole";
import SandClock from "../components/SandClock";

const TutorRoute = ({ children }) => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <SandClock size="250px"></SandClock>
      </div>
    );
  } else if (role === "tutor") {
    return children;
  } else {
    return <div>You don't have access to it</div>;
  }
};

export default TutorRoute;

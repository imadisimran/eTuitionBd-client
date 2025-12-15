import React from "react";
import StudentDetailsModal from "./StudentDetailsModal";

const UserDetailsModal = ({ userConfig, onClose }) => {
  if (userConfig.role === "student") {
    return <StudentDetailsModal email={userConfig.email} onClose={onClose} />;
  }

  return null;
};
export default UserDetailsModal;

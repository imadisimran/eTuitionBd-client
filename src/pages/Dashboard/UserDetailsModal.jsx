import React from "react";
import StudentDetailsModal from "./StudentDetailsModal";
import TutorDetailsModal2 from "./TutorDetailsModal2";
import AdminDetailsModal from "./AdminDetailsModal";

const UserDetailsModal = ({ userConfig, onClose }) => {
  if (userConfig.role === "student") {
    return <StudentDetailsModal email={userConfig.email} onClose={onClose} />;
  } else if (userConfig.role === "tutor") {
    return (
      <TutorDetailsModal2
        email={userConfig.email}
        onClose={onClose}
      ></TutorDetailsModal2>
    );
  } else if (userConfig.role === "admin") {
    return (
      <AdminDetailsModal
        email={userConfig.email}
        onClose={onClose}
      ></AdminDetailsModal>
    );
  } else {
    return null;
  }
};
export default UserDetailsModal;

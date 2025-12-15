import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { longDate } from "../../utilities/formatDate";

const TutorDetailsModal2 = ({ email, onClose }) => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Data specific to this tutor
  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${email}`);
      return result.data;
    },
  });

  // 2. Open Modal Immediately
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const handleClose = () => {
    onClose();
    modalRef.current.close();
  };

  const tutorData = user?.tutorProfile || {};

  return (
    <dialog
      ref={modalRef}
      className="modal modal-bottom sm:modal-middle"
      onClose={handleClose}
    >
      <div className="modal-box bg-base-100 w-11/12 max-w-3xl">
        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <span className="loading loading-spinner loading-lg text-accent"></span>
            <p>Loading tutor profile...</p>
          </div>
        ) : (
          /* Main Content */
          <div className="space-y-6">
            {/* --- HEADER: Avatar, Name, Badges --- */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b pb-6">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-24 h-24 ring ring-accent ring-offset-base-100 ring-offset-2">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} />
                  ) : (
                    <span className="text-3xl font-bold uppercase">
                      {user?.displayName?.slice(0, 1) || "T"}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <h3 className="font-bold text-3xl">{user?.displayName}</h3>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                  <div className="badge badge-accent badge-outline capitalize">
                    {user?.role}
                  </div>
                  {/* Status Badge based on your data */}
                  <div
                    className={`badge ${
                      user?.status === "approved"
                        ? "badge-success text-white"
                        : "badge-warning"
                    } capitalize`}
                  >
                    {user?.status || "Pending"}
                  </div>
                  <div className="text-xs text-gray-500 content-center ml-2">
                    Joined: {longDate(user?.createdAt)}
                  </div>
                </div>

                {/* Bio Section */}
                {tutorData.bio && (
                  <p className="mt-3 text-sm text-gray-600 italic">
                    "{tutorData.bio}"
                  </p>
                )}
              </div>
            </div>

            {/* --- BODY: Grid Layout --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Contact & Personal */}
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-accent border-b border-gray-200 pb-2">
                  Personal Info
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <span className="font-semibold block text-xs text-gray-500">
                      Email
                    </span>
                    {user?.email}
                  </li>
                  <li>
                    <span className="font-semibold block text-xs text-gray-500">
                      Phone
                    </span>
                    {user?.phone || "N/A"}
                  </li>
                  <li>
                    <span className="font-semibold block text-xs text-gray-500">
                      Gender
                    </span>
                    <span className="capitalize">
                      {tutorData.gender || "N/A"}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold block text-xs text-gray-500">
                      Current Institution
                    </span>
                    {tutorData.institution || "N/A"}
                  </li>
                </ul>
              </div>

              {/* Right Column: Professional Info */}
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-accent border-b border-gray-200 pb-2">
                  Professional Info
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <span className="font-semibold block text-xs text-gray-500">
                      Qualification
                    </span>
                    {tutorData.qualification || "N/A"}
                  </li>
                  <li>
                    <span className="font-semibold block text-xs text-gray-500">
                      Experience
                    </span>
                    {tutorData.experience
                      ? `${tutorData.experience} Years`
                      : "Fresher"}
                  </li>
                </ul>

                {/* Subjects Badge List */}
                <div>
                  <span className="font-semibold block text-xs text-gray-500 mb-1">
                    Subjects
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tutorData.subjects?.length > 0 ? (
                      tutorData.subjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="badge badge-ghost text-xs uppercase font-semibold"
                        >
                          {sub}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">
                        No subjects listed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* --- FOOTER: Education History Table --- */}
            {tutorData.education && tutorData.education.length > 0 && (
              <div className="pt-2">
                <h4 className="font-bold text-lg text-accent border-b border-gray-200 pb-2 mb-3">
                  Education History
                </h4>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="table table-zebra table-xs sm:table-sm">
                    <thead>
                      <tr className="bg-base-200">
                        <th>Degree</th>
                        <th>Institute</th>
                        <th>Passing Year</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutorData.education.map((edu, idx) => (
                        <tr key={idx}>
                          <td className="font-bold uppercase text-primary">
                            {edu.degree}
                          </td>
                          <td className="capitalize">{edu.institute}</td>
                          <td>{edu.year}</td>
                          <td>
                            <div className="badge badge-sm badge-outline">
                              {edu.result}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Actions */}
        <div className="modal-action">
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default TutorDetailsModal2;

import React from "react";

const TutorDetailsModal = ({
  tutor,
  handleChangeStatus,
  tutorDetailsModalRef,
}) => {
  // Destructure for easier access, defaulting to empty objects if data is missing
  const { displayName, email, phone, photoURL, tutorProfile } = tutor || {};
  const { institution, experience, gender, bio, subjects, education } =
    tutorProfile || {};

  return (
    <dialog
      ref={tutorDetailsModalRef}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box w-11/12 max-w-4xl">
        {/* --- Header Section: Identity --- */}
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {photoURL ? (
                <img src={photoURL} alt={displayName} />
              ) : (
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Avatar"
                />
              )}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-2xl">{displayName}</h3>
            <p className="text-sm text-gray-500">
              {email} | {phone}
            </p>
          </div>
          <div className="ml-auto badge badge-ghost p-3">{gender}</div>
        </div>

        {/* --- Body Section: Details --- */}
        <div className="space-y-6">
          {/* Bio & Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-primary">Institution:</span>
              <p className="text-gray-700">{institution}</p>
            </div>
            <div>
              <span className="font-semibold text-primary">Experience:</span>
              <p className="text-gray-700">{experience} Years</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <span className="font-semibold text-primary">Bio:</span>
              <p className="text-sm text-gray-600 bg-base-200 p-2 rounded-lg">
                {bio}
              </p>
            </div>
          </div>

          {/* Subjects (Badges) */}
          <div>
            <h4 className="font-bold text-lg mb-2">Teaches Subjects</h4>
            <div className="flex flex-wrap gap-2">
              {subjects?.map((subject, idx) => (
                <div
                  key={idx}
                  className="badge badge-accent badge-outline font-medium text-transform capitalize"
                >
                  {subject}
                </div>
              ))}
            </div>
          </div>

          {/* Education (Zebra Table) */}
          <div>
            <h4 className="font-bold text-lg mb-2">Education Qualifications</h4>
            <div className="overflow-x-auto border rounded-lg">
              <table className="table table-zebra w-full">
                {/* head */}
                <thead className="bg-base-200">
                  <tr>
                    <th>Degree</th>
                    <th>Institute</th>
                    <th>Year</th>
                    <th>Result (GPA)</th>
                  </tr>
                </thead>
                <tbody>
                  {education?.map((edu, idx) => (
                    <tr key={idx}>
                      <td className="font-bold">{edu.degree}</td>
                      <td>{edu.institute}</td>
                      <td>{edu.year}</td>
                      <td>
                        <div className="badge badge-sm">{edu.result}</div>
                      </td>
                    </tr>
                  ))}
                  {(!education || education.length === 0) && (
                    <tr>
                      <td colSpan="4" className="text-center text-gray-500">
                        No education details provided.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Footer: Actions --- */}
        <div className="modal-action flex justify-between items-center mt-6">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-accent">Close</button>
          </form>

          <div className="space-x-5">
            <button
              onClick={() =>
                handleChangeStatus({
                  id: tutor._id,
                  status: "approved",
                })
              }
              className="btn btn-primary px-8"
            >
              Approve Tutor
            </button>
            <button
              onClick={() =>
                handleChangeStatus({
                  id: tutor._id,
                  status: "rejected",
                })
              }
              className="btn btn-secondary px-8"
            >
              Reject Tutor
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default TutorDetailsModal;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const ApplicationsModal = ({
  applicationsModalRef,
  selectedTuitionApplication,
}) => {
  const axiosSecure = useAxiosSecure();
  const { data: applications = [] } = useQuery({
    queryKey: ["applications", selectedTuitionApplication],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/applications/tuition/${selectedTuitionApplication}`
      );
      return result.data;
    },
    enabled: !!selectedTuitionApplication,
  });
//   console.log(applications)
  return (
    <div>
      <dialog ref={applicationsModalRef} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">
              Applications
            </h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Expected Salary & Experience</th>
                  <th>Favorite Color</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={application?.tutorImage}
                              alt={application?.tutorName}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {application?.tutorName}
                          </div>
                          <div className="text-sm opacity-50">
                            {application?.tutorInstitution}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {application?.expectedSalary}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {application?.experience}+ Years Experience
                      </span>
                    </td>
                    <td>{application?.note}</td>
                    <th>
                      <Link
                        to={`/tutor/${application.tutorId}`}
                        className="btn btn-accent btn-sm"
                      >
                        Tutor Details
                      </Link>
                    </th>
                    <td>
                        <button className="btn btn-primary btn-sm">Confirm</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Action Footer (Optional - e.g., Close button at bottom) */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>

        {/* Click outside to close (backdrop) */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ApplicationsModal;

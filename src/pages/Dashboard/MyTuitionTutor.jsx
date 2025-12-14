import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyTuitionTutor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: applications = [] } = useQuery({
    queryKey: ["applications", "tutor", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/applications?email=${user?.email}&status=accepted`
      );
      return result.data;
    },
    enabled: !!user?.email,
  });
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Tuition Title</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{application.tuitionTitle}</td>
                <td>{application.expectedSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTuitionTutor;

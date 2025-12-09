import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PostNewTuitionForm from "./PostNewTuitionForm";
import { longDate } from "../../utilities/formatDate";

const MyTuitionsStudent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: tuitions = [] } = useQuery({
    queryKey: [user?.email, "tuitions"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/tuitions?email=${user?.email}`);
      return result.data;
    },
  });
  return (
    <div>
      <PostNewTuitionForm></PostNewTuitionForm>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Posted At</th>
                <th>Budget</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((tuition, index) => {
                const min = tuition.salaryRange.min;
                const max = tuition.salaryRange.max;
                return (
                  <tr key={tuition._id}>
                    <td>{index + 1}</td>
                    <td className="capitalize">{tuition.subject}</td>
                    <td>{longDate(tuition.createdAt)}</td>
                    <td>{`BDT ${min}-${max}`}</td>
                    <td className="space-x-5">
                      <button className="btn btn-primary btn-sm">Edit</button>
                      <button className="btn btn-secondary btn-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTuitionsStudent;

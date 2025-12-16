import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { longDate, longDateFromS } from "../../utilities/formatDate";
import SandClock from "../../components/SandClock";

const MyTuitionsStudent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: [user?.email, "tuitions"],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/my-tuitions?email=${user?.email}&status=booked`
      );
      return result.data;
    },
  });

  // console.log(tuitions);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <SandClock size="200px"></SandClock>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Posted At</th>
                <th>Days Per Week</th>
                <th>Status</th>
                <th>Confirmed At</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((tuition, index) => {
                return (
                  <tr key={tuition._id}>
                    <th>{index + 1}</th>
                    <td className="capitalize">
                      {tuition.subject.split("_").join(" ")}
                    </td>
                    <td>{longDate(tuition.createdAt)}</td>
                    <td>{tuition.daysPerWeek}</td>
                    <td className="capitalize">{tuition.status}</td>
                    <td>{longDateFromS(tuition?.paidAt)}</td>
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

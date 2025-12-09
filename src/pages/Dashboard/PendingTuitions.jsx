import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { errorAlert, successAlert } from "../../utilities/alerts";
import TuitionDetailsModal from "./TuitionDetailsModal";

const PendingTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const tuitionDetailsModalRef = useRef();
  const [selectedTuitionId, setSelectedTuitionId] = useState(null);

  const handleModalToggle = (id) => {
    tuitionDetailsModalRef.current.showModal();
    setSelectedTuitionId(id);
  };

  const { data: tuitions = [], refetch } = useQuery({
    queryKey: ["tuitions", "admin"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/tuitions/admin?status=pending`);
      return result.data;
    },
  });

  const { data: tuitionDetails = {} } = useQuery({
    queryKey: ["tuition", selectedTuitionId],
    queryFn: async () => {
      const result = await axiosSecure.get(`/tuition/${selectedTuitionId}`);
      return result.data;
    },
    enabled: !!selectedTuitionId,
  });
  //   console.log(tuitions);
  const handleStatusChange = (id, status) => {
    axiosSecure
      .patch(`/tuition/admin/${id}?status=${status}`)
      .then((result) => {
        if (result.data.modifiedCount) {
          if (status === "approved") {
            successAlert("Approved Successfully");
          } else {
            successAlert("Rejected Successfully");
          }
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
        errorAlert();
      });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Days Per Week</th>
              <th>Budget Range</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map((tuition, index) => {
              const min = tuition.salaryRange.min;
              const max = tuition.salaryRange.max;
              return (
                <tr key={tuition._id}>
                  <th>{index + 1}</th>
                  <td className="capitalize">
                    {tuition.subject.split("_").join(" ")}
                  </td>
                  <td>{tuition.daysPerWeek}</td>
                  <td>{`BDT ${min}-${max}`}</td>
                  <td className="capitalize">{tuition.status}</td>
                  <td className="space-x-5">
                    <button
                      onClick={() =>
                        handleStatusChange(tuition._id, "approved")
                      }
                      className="btn btn-sm btn-primary"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(tuition._id, "rejected")
                      }
                      className="btn btn-sm btn-secondary"
                    >
                      Reject
                    </button>
                    {/* <button className="btn btn-sm btn-accent">Details</button> */}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleModalToggle(tuition._id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TuitionDetailsModal
        tuitionDetailsModalRef={tuitionDetailsModalRef}
        tuitionDetails={tuitionDetails}
      ></TuitionDetailsModal>
    </div>
  );
};

export default PendingTuitions;

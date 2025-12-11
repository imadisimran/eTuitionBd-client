import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TutorDetailsModal from "./TutorDetailsModal";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import { errorAlert, successAlert } from "../../utilities/alerts";

const PendingTutors = () => {
  const [selectedId, setSelectedId] = useState("");
  const axiosSecure = useAxiosSecure();
  const axiosNormal = useAxiosNormal();
  const tutorDetailsModalRef = useRef();
  const { data: tutors = [] } = useQuery({
    queryKey: ["pending", "tutors"],
    queryFn: async () => {
      const result = await axiosSecure.get("/admin/tutor?status=pending");
      return result.data;
    },
  });

  const { data: tutor = {} } = useQuery({
    queryKey: ["tutor", selectedId],
    queryFn: async () => {
      const result = await axiosNormal.get(`/tutor/${selectedId}`);
      return result.data;
    },
    enabled: !!selectedId,
  });

  const handleViewDetails = (id) => {
    setSelectedId(id);
    tutorDetailsModalRef.current.showModal();
  };

  const queryClient = useQueryClient();

  const { mutate: handleChangeStatus } = useMutation({
    mutationFn: ({ id, status }) => {
      return axiosSecure.patch(`/tutor/${id}`, { status: status });
    },
    onSuccess: () => {
      tutorDetailsModalRef.current.close();
      queryClient.invalidateQueries({ queryKey: ["pending", "tutors"] });
      successAlert("Approved successfully");
    },
    onError: (error) => {
      tutorDetailsModalRef.current.close();
      console.log(error);
      errorAlert();
    },
  });

  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Institution</th>
                <th>Experience</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor, index) => (
                <tr key={tutor._id}>
                  <th>{index + 1}</th>
                  <td>{tutor.displayName}</td>
                  <td>{tutor.tutorProfile.institution}</td>
                  <td>{tutor.tutorProfile.experience}</td>
                  <td>{tutor.tutorProfile.gender}</td>
                  <td className="space-x-5">
                    <button
                      onClick={() =>
                        handleChangeStatus({
                          id: tutor._id,
                          status: "approved",
                        })
                      }
                      className="btn btn-sm btn-primary"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleChangeStatus({
                          id: tutor._id,
                          status: "rejected",
                        })
                      }
                      className="btn btn-sm btn-secondary"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleViewDetails(tutor._id)}
                      className="btn btn-sm btn-accent"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TutorDetailsModal
        tutorDetailsModalRef={tutorDetailsModalRef}
        tutor={tutor}
        handleChangeStatus={handleChangeStatus}
      ></TutorDetailsModal>
    </>
  );
};

export default PendingTutors;

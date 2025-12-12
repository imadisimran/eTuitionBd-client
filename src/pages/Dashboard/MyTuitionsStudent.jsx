import React, { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PostNewTuitionForm from "./PostNewTuitionForm";
import { longDate } from "../../utilities/formatDate";
import { confirmation, errorAlert, successAlert } from "../../utilities/alerts";
import EditTuitionModal from "./EditTuitionModal";

const MyTuitionsStudent = () => {
  const [selectedTuitionId, setSelectedTuitionId] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const editModalRef = useRef();
  const { data: tuitions = [], refetch } = useQuery({
    queryKey: [user?.email, "tuitions"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-tuitions?email=${user?.email}`);
      return result.data;
    },
  });
  const handleDelete = (id) => {
    confirmation(
      "Are you want to delete this post",
      "You won't be able to revert it",
      "Delete",
      async () => {
        try {
          const result = await axiosSecure.delete(`/tuition/${id}`);
          if (result.data.deletedCount) {
            successAlert("Deleted Successfully");
            refetch();
          }
        } catch (error) {
          console.log(error);
          errorAlert();
        }
      }
    );
  };

  const handleEdit = (id) => {
    setSelectedTuitionId(id);
    editModalRef.current.showModal();
  };

  return (
    <>
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
                      <td>{index + 1}</td>
                      <td className="capitalize">
                        {tuition.subject.split("_").join(" ")}
                      </td>
                      <td>{longDate(tuition.createdAt)}</td>
                      <td>{`BDT ${min}-${max}`}</td>
                      <td>{tuition.status}</td>
                      <td className="space-x-5">
                        <button
                          onClick={() => handleEdit(tuition._id)}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tuition._id)}
                          className="btn btn-secondary btn-sm"
                        >
                          Delete
                        </button>
                        <button className="btn btn-accent btn-sm">
                          Applications
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
      <EditTuitionModal
        selectedTuitionId={selectedTuitionId}
        editModalRef={editModalRef}
      ></EditTuitionModal>
    </>
  );
};

export default MyTuitionsStudent;

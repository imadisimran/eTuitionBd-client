import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EditApplicationModal from "./EditApplicationModal";
import { Link } from "react-router";
import { confirmation, errorAlert, successAlert } from "../../utilities/alerts";
import SandClock from "../../components/SandClock";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const updateFormRef = useRef();
  const [selectedApplicationId, setSelectedApplicationId] = useState("");
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/applications?email=${user?.email}`
      );
      return result.data;
    },
    enabled: !!user?.email,
  });

  const handleEdit = (id) => {
    updateFormRef.current.showModal();
    setSelectedApplicationId(id);
  };

  const queryClient = useQueryClient();
  const { mutate: deleteFn, isPending } = useMutation({
    mutationFn: (id) => {
      return axiosSecure.delete(`/application/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      successAlert("Deleted successfully");
    },
    onError: (error) => {
      console.log(error);
      errorAlert();
    },
  });

  const handleDelete = (id) => {
    confirmation(
      "Do you want to delete?",
      "It will be deleted permanently",
      "Delete",
      () => {
        deleteFn(id);
      }
    );
  };

  if (isLoading || isPending) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <SandClock size="250px"></SandClock>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition Title</th>
                <th>Expected Salary</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr
                  className={
                    application.status === "rejected" ? "bg-red-100" : ""
                  }
                  key={index}
                >
                  <th>{index + 1}</th>
                  <td>{application?.tuitionTitle}</td>
                  <td>{application?.expectedSalary}</td>
                  <td>{application?.note}</td>
                  {application.status === "pending" && (
                    <td className="space-x-5">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(application._id)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(application._id)}
                        className="btn btn-sm btn-secondary"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/tuition/${application.tuitionId}`}
                        className="btn btn-sm btn-accent"
                      >
                        View Details
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditApplicationModal
        selectedApplicationId={selectedApplicationId}
        updateFormRef={updateFormRef}
      ></EditApplicationModal>
    </>
  );
};

export default MyApplications;

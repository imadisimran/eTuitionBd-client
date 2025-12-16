import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorAlert, successAlert } from "../../utilities/alerts";
import SandClock from "../../components/SandClock";

const EditApplicationModal = ({ selectedApplicationId, updateFormRef }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: application = {}, isLoading } = useQuery({
    queryKey: ["application", selectedApplicationId],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/application/${selectedApplicationId}`
      );
      return result.data;
    },
    enabled: !!selectedApplicationId,
  });
  const { mutate } = useMutation({
    mutationFn: (data) => {
      return axiosSecure.patch(`/application/${selectedApplicationId}`, data);
    },
    onSuccess: () => {
      updateFormRef.current.close();
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      successAlert("Applied successfully");
    },
    onError: () => {
      updateFormRef.current.close();
      errorAlert();
    },
  });
  //   console.log(application);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const expectedSalary = form.salary.value;
    const note = form.note.value;

    const applicationData = {
      expectedSalary,
      note,
    };

    mutate(applicationData);
    updateFormRef.current.close();
    form.reset();
  };

  return (
    <dialog ref={updateFormRef} className="modal modal-bottom sm:modal-middle">
      {isLoading ? (
        <SandClock size="100px"></SandClock>
      ) : (
        <div className="modal-box">
          {/* Modal Header */}
          <h3 className="font-bold text-2xl text-primary">
            Update Application
          </h3>
          <p className="py-2 text-sm text-gray-500">
            You are updating for:{" "}
            <span className="font-bold text-gray-700">
              {application?.tuitionTitle}
            </span>
          </p>

          {/* Form Section */}
          <form onSubmit={handleUpdate}>
            {/* Input 1: Expected Salary */}
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Expected Salary (BDT)
                </span>
              </label>
              <input
                type="number"
                name="salary"
                placeholder="e.g. 3000"
                className="input input-bordered w-full focus:input-primary"
                required
                defaultValue={application.expectedSalary}
              />
            </div>

            {/* Input 2: Note */}
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Note to Student/Parent
                </span>
              </label>
              <textarea
                name="note"
                className="textarea textarea-bordered h-24 focus:textarea-primary"
                placeholder="Write a short note about why you are a good fit..."
                required
                defaultValue={application.note}
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="modal-action mt-6 flex justify-between items-center">
              {/* Close Button (using type="button" to prevent submit) */}
              <button
                type="button"
                className="btn btn-ghost text-gray-500 hover:text-red-500"
                onClick={() => updateFormRef.current.close()}
              >
                Cancel
              </button>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary px-8 text-white">
                Edit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Click outside to close (Backdrop) */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EditApplicationModal;

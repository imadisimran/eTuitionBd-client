import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorAlert, successAlert } from "../../utilities/alerts";

const ApplyModalForm = ({ tuitionId, tuitionTitle, applyFormRef }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data) => {
      return axiosSecure.post(`/application/${tuitionId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applyStatus"] });
      successAlert("Applied successfully");
    },
    onError: () => {
      errorAlert();
    },
  });
  const handleApply = (e) => {
    e.preventDefault();
    const form = e.target;
    const expectedSalary = form.salary.value;
    const note = form.note.value;

    const applicationData = {
      expectedSalary,
      note,
      tuitionTitle,
    };

    mutate(applicationData);
    applyFormRef.current.close();
    form.reset();
  };

  return (
    <dialog ref={applyFormRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {/* Modal Header */}
        <h3 className="font-bold text-2xl text-primary">Apply for Tuition</h3>
        <p className="py-2 text-sm text-gray-500">
          You are applying for:{" "}
          <span className="font-bold text-gray-700">{tuitionTitle}</span>
        </p>

        {/* Form Section */}
        <form onSubmit={handleApply}>
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
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="modal-action mt-6 flex justify-between items-center">
            {/* Close Button (using type="button" to prevent submit) */}
            <button
              type="button"
              className="btn btn-ghost text-gray-500 hover:text-red-500"
              onClick={() => applyFormRef.current.close()}
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary px-8 text-white">
              Confirm Apply
            </button>
          </div>
        </form>
      </div>

      {/* Click outside to close (Backdrop) */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ApplyModalForm;

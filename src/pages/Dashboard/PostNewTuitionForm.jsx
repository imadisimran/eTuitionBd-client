import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { errorAlert, successAlert } from "../../utilities/alerts";

const subjectOptions = [
  { value: "bangla", label: "Bangla" },
  { value: "english", label: "English" },
  { value: "math", label: "General Math" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "higher_math", label: "Higher Math" },
  { value: "ict", label: "ICT" },
  { value: "accounting", label: "Accounting" },
  { value: "finance", label: "Finance & Banking" },
  { value: "economics", label: "Economics" },
  { value: "history", label: "History" },
  { value: "religion", label: "Religion" },
];

const PostNewTuitionForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    reset, // Added reset to clear form on success
    formState: { errors },
  } = useForm();

  const { data: foundUser = {} } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  const handlePostTuition = (data) => {
    axiosSecure
      .post(`/tuitions?email=${user?.email}`, data)
      .then((result) => {
        if (result.data) {
          successAlert("Posted successfully");
          reset(); // Clear the form
          formRef.current.close(); // Close modal
        }
      })
      .catch((error) => {
        console.log(error);
        errorAlert("Something went wrong");
      });
  };

  return (
    <>
      {/* --- 1. The Trigger Button --- */}
      <div className="flex justify-end my-6">
        <button
          className="btn btn-primary text-white"
          onClick={() => formRef.current.showModal()}
        >
          Post New Tuition
        </button>
      </div>

      {/* --- 2. The Modal Structure --- */}
      <dialog ref={formRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 max-w-4xl">
          {/* Close Button (Top Right) */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h2 className="card-title text-2xl justify-center mb-6">
            Post New Tuition
          </h2>

          <form onSubmit={handleSubmit(handlePostTuition)} className="space-y-4">
            {/* --- Row 1: Name & Email --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Student Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  readOnly
                  defaultValue={user?.displayName}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                />
              </div>
            </div>

            {/* --- Row 2: Title & Subject --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Post Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Need Math Tutor"
                  className="input input-bordered w-full"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-error text-xs">Title is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  defaultValue=""
                  {...register("subject", { required: true })}
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  {subjectOptions.map((sub, index) => (
                    <option key={index} value={sub.value}>
                      {sub.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* --- Row 3: Class & Medium --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Class</span>
                </label>

                <input
                  type="text"
                  readOnly
                  placeholder="Class"
                  className="input input-bordered w-full capitalize"
                  defaultValue={foundUser?.studentInfo?.class?.replaceAll(
                    "_",
                    " "
                  )}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Medium</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  defaultValue=""
                  {...register("medium", { required: true })}
                >
                  <option value="" disabled>
                    Select Medium
                  </option>
                  <option value="bangla_medium">Bangla Medium</option>
                  <option value="english_version">English Version</option>
                  <option value="english_medium">English Medium</option>
                </select>
                {errors.medium && (
                  <span className="text-error text-xs">Medium is required</span>
                )}
              </div>
            </div>

            {/* --- Row 4: Salary Range --- */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Salary Range (BDT)</span>
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  className="input input-bordered w-full"
                  {...register("salaryMin", { required: true, min: 500 })}
                />
                <span className="text-xl font-bold">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="input input-bordered w-full"
                  {...register("salaryMax", { required: true })}
                />
              </div>
            </div>

            {/* --- Row 5: Gender & Mode --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Teacher Gender */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Preferred Teacher Gender</span>
                </label>
                <div className="flex gap-4">
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Male</span>
                    <input
                      type="radio"
                      value="Male"
                      className="radio radio-primary"
                      {...register("teacherGender", { required: true })}
                    />
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Female</span>
                    <input
                      type="radio"
                      value="Female"
                      className="radio radio-primary"
                      {...register("teacherGender", { required: true })}
                    />
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Any</span>
                    <input
                      type="radio"
                      value="Any"
                      className="radio radio-primary"
                      {...register("teacherGender", { required: true })}
                    />
                  </label>
                </div>
              </div>

              {/* Mode */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tuition Mode</span>
                </label>
                <div className="flex gap-4">
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Offline</span>
                    <input
                      type="radio"
                      value="Offline"
                      className="radio radio-secondary"
                      {...register("mode", { required: true })}
                    />
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Online</span>
                    <input
                      type="radio"
                      value="Online"
                      className="radio radio-secondary"
                      {...register("mode", { required: true })}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* --- Row 6: Days Per Week --- */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Days Per Week</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[2, 3, 4, 5, 6].map((day) => (
                  <label
                    key={day}
                    className="cursor-pointer border rounded-lg p-2 hover:bg-base-200 transition has-checked:bg-primary has-checked:text-white"
                  >
                    <span className="label-text px-2 font-bold inherit">
                      {day} days
                    </span>
                    <input
                      type="radio"
                      value={day}
                      className="hidden"
                      {...register("daysPerWeek", { required: true })}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* --- Row 7: Description --- */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description / Requirements</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Details about the student..."
                {...register("description", { required: true })}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary text-white">
                Post Tuition
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default PostNewTuitionForm;

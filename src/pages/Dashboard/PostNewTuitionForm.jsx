import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { confirmation, errorAlert, successAlert } from "../../utilities/alerts";
import { useNavigate } from "react-router";
import { formatClass } from "../../utilities/textFormatter";

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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: foundUser = {} } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  // --- Modification: Use useEffect to reset form with default values ---
  useEffect(() => {
    if (user && foundUser) {
      reset({
        name: user?.displayName,
        email: user?.email,
        studentClass: formatClass(foundUser?.studentInfo?.class),
        title: "",
        subject: "",
        medium: "",
        salaryMin: "",
        salaryMax: "",
        teacherGender: "",
        mode: "",
        daysPerWeek: "",
        description: "",
      });
    }
  }, [user, foundUser, reset]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return axiosSecure.post(`/tuitions?email=${user?.email}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [user?.email, "tuitions"] });
      formRef.current.close();
      reset();
      successAlert("Posted successfully");
    },
    onError: (error) => {
      console.log(error);
      errorAlert();
    },
  });

  const handlePostTuition = (data) => {
    mutate(data);
  };

  return (
    <>
      {/* --- Trigger Button --- */}
      <div className="flex justify-end my-6">
        <button
          className="btn btn-primary text-white"
          onClick={
            foundUser?.profileStatus?.isReady
              ? () => formRef.current.showModal()
              : () => {
                  confirmation(
                    "Your profile is not completed",
                    "Complete your profile to post new tuition",
                    "Complete Now",
                    () => {
                      navigate("/dashboard/profile");
                    }
                  );
                }
          }
        >
          Post New Tuition
        </button>
      </div>

      {/* --- Modal --- */}
      <dialog ref={formRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 max-w-4xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h2 className="card-title text-2xl justify-center mb-6">
            Post New Tuition
          </h2>

          <form
            onSubmit={handleSubmit(handlePostTuition)}
            className="space-y-4"
          >
            {/* --- Row 1: Name & Email --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Student Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  readOnly
                  {...register("name")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                  {...register("email")}
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
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <ErrorMessage message={errors.title.message} />
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("subject", {
                    required: "Please select a subject",
                  })}
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
                {errors.subject && (
                  <ErrorMessage message={errors.subject.message} />
                )}
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
                  {...register("studentClass")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Medium</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("medium", { required: "Medium is required" })}
                >
                  <option value="" disabled>
                    Select Medium
                  </option>
                  <option value="bangla_medium">Bangla Medium</option>
                  <option value="english_version">English Version</option>
                  <option value="english_medium">English Medium</option>
                </select>
                {errors.medium && (
                  <ErrorMessage message={errors.medium.message} />
                )}
              </div>
            </div>

            {/* --- Row 4: Salary Range --- */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Salary Range (BDT)</span>
              </label>
              <div className="flex gap-4 items-center">
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input input-bordered w-full"
                    {...register("salaryMin", {
                      required: "Min salary is required",
                      min: { value: 500, message: "Minimum 500 BDT" },
                    })}
                  />
                  {errors.salaryMin && (
                    <ErrorMessage message={errors.salaryMin.message} />
                  )}
                </div>
                <span className="text-xl font-bold">-</span>
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Max"
                    className="input input-bordered w-full"
                    {...register("salaryMax", {
                      required: "Max salary is required",
                    })}
                  />
                  {errors.salaryMax && (
                    <ErrorMessage message={errors.salaryMax.message} />
                  )}
                </div>
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
                  {["Male", "Female", "Any"].map((gender) => (
                    <label key={gender} className="label cursor-pointer gap-2">
                      <span className="label-text">{gender}</span>
                      <input
                        type="radio"
                        value={gender}
                        className="radio radio-primary"
                        {...register("teacherGender", {
                          required: "Please select a gender preference",
                        })}
                      />
                    </label>
                  ))}
                </div>
                {errors.teacherGender && (
                  <ErrorMessage message={errors.teacherGender.message} />
                )}
              </div>

              {/* Mode */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tuition Mode</span>
                </label>
                <div className="flex gap-4">
                  {["Offline", "Online"].map((modeItem) => (
                    <label
                      key={modeItem}
                      className="label cursor-pointer gap-2"
                    >
                      <span className="label-text">{modeItem}</span>
                      <input
                        type="radio"
                        value={modeItem}
                        className="radio radio-secondary"
                        {...register("mode", {
                          required: "Please select a tuition mode",
                        })}
                      />
                    </label>
                  ))}
                </div>
                {errors.mode && <ErrorMessage message={errors.mode.message} />}
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
                      {...register("daysPerWeek", {
                        required: "Select days/week",
                      })}
                    />
                  </label>
                ))}
              </div>
              {errors.daysPerWeek && (
                <ErrorMessage message={errors.daysPerWeek.message} />
              )}
            </div>

            {/* --- Row 7: Description --- */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description / Requirements</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Details about the student..."
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && (
                <ErrorMessage message={errors.description.message} />
              )}
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

// Helper for error messages
const ErrorMessage = ({ message }) => (
  <span className="text-error text-xs mt-1 block">{message}</span>
);

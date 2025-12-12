import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { errorAlert, successAlert } from "../../utilities/alerts";
import { formatWith_ } from "../../utilities/textFormatter";

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

const EditTuitionModal = ({ selectedTuitionId, editModalRef }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: tuitionData } = useQuery({
    queryKey: ["tuition", selectedTuitionId],
    queryFn: async () => {
      const result = await axiosSecure.get(`/tuition/${selectedTuitionId}`);
      return result.data;
    },
    enabled: !!selectedTuitionId,
  });

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  // --- 1. POPULATE FORM DATA ---
  useEffect(() => {
    if (tuitionData) {
      reset({
        title: tuitionData.title,
        subject: tuitionData.subject,
        class: formatWith_(tuitionData.class),
        medium: tuitionData.medium,
        salaryMin: tuitionData.salaryRange?.min,
        salaryMax: tuitionData.salaryRange?.max,
        teacherGender: tuitionData.teacherGender,
        mode: tuitionData.mode,
        daysPerWeek: JSON.stringify(tuitionData.daysPerWeek),
        description: tuitionData.description,
      });
    }
  }, [tuitionData, reset]);

  // --- 2. UPDATE MUTATION ---
  const { mutateAsync } = useMutation({
    mutationFn: (updatedData) => {
      return axiosSecure.patch(`/tuition/${tuitionData._id}`, updatedData);
    },
    onSuccess: () => {
      editModalRef.current.close();
      queryClient.invalidateQueries({ queryKey: ["tuitions"] });
      successAlert("Tuition updated successfully!");
    },
    onError: (err) => {
      editModalRef.current.close();
      console.error(err);
      errorAlert("Failed to update tuition.");
    },
  });

  // --- 3. HANDLE SUBMIT ---
  const handleUpdate = async (data) => {
    const structuredData = {
      title: data.title,
      subject: data.subject,
      class: data.class,
      medium: data.medium,
      salaryRange: {
        min: Number(data.salaryMin),
        max: Number(data.salaryMax),
      },
      teacherGender: data.teacherGender,
      mode: data.mode,
      daysPerWeek: Number(data.daysPerWeek),
      description: data.description,
    };

    await mutateAsync(structuredData);
  };

  return (
    <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box w-11/12 max-w-4xl">
        {/* Close Button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-xl mb-6">Edit Tuition</h3>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          {/* --- Row 1: Title & Subject --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text text-gray-500">Post Title</span>
              </label>
              <input
                type="text"
                placeholder="Need Math Tutor"
                className="input input-bordered w-full"
                {...register("title", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text text-gray-500">Subject</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("subject", { required: true })}
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {subjectOptions.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* --- Row 2: Class & Medium --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text text-gray-500">Class</span>
              </label>
              <input
                type="text"
                placeholder="Class 8"
                className="input input-bordered w-full"
                {...register("class", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text text-gray-500">Medium</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("medium", { required: true })}
              >
                <option value="" disabled>
                  Select Medium
                </option>
                <option value="bangla_medium">Bangla Medium</option>
                <option value="english_version">English Version</option>
                <option value="english_medium">English Medium</option>
              </select>
            </div>
          </div>

          {/* --- Row 3: Salary Range --- */}
          <div className="form-control">
            <label className="label pt-0">
              <span className="label-text text-gray-500">
                Salary Range (BDT)
              </span>
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                placeholder="Min"
                className="input input-bordered w-full"
                {...register("salaryMin", { required: true })}
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

          {/* --- Row 4: Gender & Mode (Side by Side) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender */}
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text text-gray-500">
                  Preferred Teacher Gender
                </span>
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Male"
                    className="radio radio-success radio-sm"
                    {...register("teacherGender")}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Female"
                    className="radio radio-success radio-sm"
                    {...register("teacherGender")}
                  />
                  <span>Female</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Any"
                    className="radio radio-success radio-sm"
                    {...register("teacherGender")}
                  />
                  <span>Any</span>
                </label>
              </div>
            </div>

            {/* Mode */}
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text text-gray-500">Tuition Mode</span>
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Offline"
                    className="radio radio-error radio-sm"
                    {...register("mode")}
                  />
                  <span>Offline</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Online"
                    className="radio radio-error radio-sm"
                    {...register("mode")}
                  />
                  <span>Online</span>
                </label>
              </div>
            </div>
          </div>

          {/* --- Row 5: Days Per Week (Buttons) --- */}
          <div className="form-control">
            <label className="label pt-0">
              <span className="label-text text-gray-500">Days Per Week</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {[2, 3, 4, 5, 6].map((day) => (
                <label key={day} className="cursor-pointer">
                  <input
                    type="radio"
                    value={day}
                    className="peer hidden"
                    {...register("daysPerWeek", { required: true })}
                  />
                  {/* The visual button: styles change when 'peer' (the input) is checked */}
                  <span className="btn btn-outline btn-sm peer-checked:bg-primary  peer-checked:text-white peer-checked:border-2 peer-checked:border-primary hover:bg-gray-100">
                    {day} days
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* --- Row 6: Description --- */}
          <div className="form-control">
            <label className="label pt-0">
              <span className="label-text text-gray-500">
                Description / Requirements
              </span>
            </label>
            <textarea
              placeholder="Details about the student..."
              className="textarea textarea-bordered h-28"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          {/* --- Submit --- */}
          <div className="form-control mt-4">
            <button className="btn btn-primary text-white">Save Changes</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditTuitionModal;

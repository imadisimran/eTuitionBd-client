import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { confirmation, errorAlert, successAlert } from "../../utilities/alerts";
import CircularProgress from "./CircularProgress";
import { X } from "lucide-react";

// For understanding the code visit https://gemini.google.com/share/cbde812d745a

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

const TutorDashboardProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch User Data
  const {
    data: foundUser = {},
    isLoading: isUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  // 2. Form Setup
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
      phone: "",
      tutorProfile: {
        institution: "",
        qualification: "",
        experience: "",
        gender: "",
        bio: "",
        subjects: [],
        education: [],
      },
    },
  });

  // 3. Dynamic Fields for Subjects and Education
  const {
    fields: subjectFields,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control,
    name: "tutorProfile.subjects",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "tutorProfile.education",
  });

  // 4. Update form default values when data is loaded
  useEffect(() => {
    if (foundUser?._id) {
      reset({
        name: foundUser.displayName,
        email: foundUser.email,
        phone: foundUser.phone,
        tutorProfile: {
          institution: foundUser.tutorProfile?.institution || "",
          qualification: foundUser.tutorProfile?.qualification || "",
          experience: foundUser.tutorProfile?.experience || "",
          gender: foundUser.tutorProfile?.gender || "",
          bio: foundUser.tutorProfile?.bio || "",
          // Ensure subjects is treated as an object array for useFieldArray if simple string array in DB
          subjects: foundUser.tutorProfile?.subjects
            ? foundUser.tutorProfile.subjects.map((s) => ({ value: s }))
            : [],
          education: foundUser.tutorProfile?.education || [],
        },
      });
    }
  }, [foundUser, reset]);

  // Loading State
  if (isUserLoading || Object.keys(foundUser).length === 0) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // 5. Update Profile Logic
  const updateForm = (data) => {
    console.log(data);
    // Transform subjects back to simple array of strings for backend
    const formattedData = {
      ...data,
      tutorProfile: {
        ...data.tutorProfile,
        subjects: data.tutorProfile.subjects.map((item) => item.value),
      },
    };
    console.log(formattedData);
    confirmation(
      "Are you sure about updating?",
      "This information will be saved to your profile",
      "Yes Update",
      () => {
        axiosSecure
          .patch(`/user?email=${user?.email}`, formattedData)
          .then((result) => {
            if (result.data.modifiedCount) {
              successAlert("Updated Successfully");
              refetch();
            }
          })
          .catch((error) => {
            console.log(error);
            errorAlert("Something went wrong");
          });
      }
    );
  };

  // 6. Image Upload Logic
  const handleUpdateProfilePicture = async (e) => {
    e.preventDefault();
    const profilePicture = e.target.profilePic.files[0];

    if (!profilePicture) return;

    const formData = new FormData();
    formData.append("image", profilePicture);

    try {
      const result = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageApi}`,
        formData
      );

      if (result.data.success) {
        const data = {
          photoURL: result.data.data.display_url,
        };

        const result2 = await axiosSecure.patch(
          `/user?email=${user?.email}`,
          data
        );

        if (result2.data.modifiedCount) {
          successAlert("Uploaded successfully");
          refetch();
        }
      }
    } catch (error) {
      console.log(error);
      errorAlert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* --- LEFT SIDE: Profile Image --- */}
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 border-4 border-primary/20 rounded-full overflow-hidden mb-4">
          <img
            className="w-full h-full object-cover"
            src={foundUser?.photoURL}
            alt={foundUser?.displayName}
          />
        </div>

        {/* Update Profile Image Form */}
        <form
          onSubmit={handleUpdateProfilePicture}
          className="flex flex-col items-center gap-2 mb-6"
        >
          <input
            name="profilePic"
            type="file"
            className="file-input file-input-bordered file-input-xs w-full max-w-xs"
          />
          <button className="btn btn-secondary btn-xs btn-outline">
            Update Picture
          </button>
        </form>

        <h2 className="text-2xl font-bold text-center">
          {foundUser?.displayName}
        </h2>
        <p className="badge badge-primary badge-outline mt-2 capitalize">
          {foundUser?.role || "Tutor"}
        </p>

        <div className="mt-8">
          <CircularProgress
            percentage={foundUser?.profileStatus?.percent || 0}
          />
        </div>
      </div>

      {/* --- RIGHT SIDE: Main Form --- */}
      <div className="flex-1">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(updateForm)}
        >
          {/* 1. Basic Info */}
          <div className="card bg-base-100 border p-6 rounded-lg shadow-sm">
            <h2 className="text-xl mb-4 font-semibold text-primary">
              Basic Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Name</label>
                <input
                  defaultValue={foundUser?.displayName}
                  readOnly
                  type="text"
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  defaultValue={user?.email}
                  readOnly
                  type="email"
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  {...register("phone")}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="017..."
                />
              </div>
              <div>
                <label className="label">Gender</label>
                <select
                  {...register("tutorProfile.gender")}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label">Bio</label>
                <textarea
                  {...register("tutorProfile.bio")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Tell us about yourself..."
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>

          {/* 2. Professional Info */}
          <div className="card bg-base-100 border p-6 rounded-lg shadow-sm">
            <h2 className="text-xl mb-4 font-semibold text-primary">
              Professional Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Current Institution</label>
                <input
                  {...register("tutorProfile.institution")}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="e.g. Dhaka University"
                />
              </div>
              <div>
                <label className="label">Highest Qualification</label>
                <input
                  {...register("tutorProfile.qualification")}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="e.g. BSc in Physics"
                />
              </div>
              <div>
                <label className="label">Experience In Years</label>
                <input
                  {...register("tutorProfile.experience")}
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="e.g. 2"
                />
              </div>
            </div>

            {/* Subjects (Dynamic) */}
            <div className="mt-6">
              <label className="label font-semibold">Preferred Subjects</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {subjectFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-1">
                    <select
                      className="select select-bordered w-full"
                      defaultValue=""
                      {...register(`tutorProfile.subjects.${index}.value`)}
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
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="btn btn-xs btn-circle btn-error text-white"
                    >
                      <X />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => appendSubject({ value: "" })}
                className="btn btn-sm btn-outline btn-primary"
              >
                + Add Subject
              </button>
            </div>
          </div>

          {/* 3. Education History */}
          <div className="card bg-base-100 border p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">
                Education History
              </h2>
              <button
                type="button"
                onClick={() =>
                  appendEducation({
                    degree: "",
                    year: "",
                    result: "",
                    institute: "",
                  })
                }
                className="btn btn-sm btn-primary"
              >
                + Add Education
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {educationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-md bg-base-50 relative grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="btn btn-xs btn-circle btn-error text-white absolute -top-2 -right-2"
                  >
                    <X />
                  </button>

                  <div>
                    <label className="label label-text-alt">Degree/Exam</label>
                    <input
                      {...register(`tutorProfile.education.${index}.degree`)}
                      placeholder="e.g. HSC"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label label-text-alt">Institute</label>
                    <input
                      {...register(`tutorProfile.education.${index}.institute`)}
                      placeholder="Institute Name"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label label-text-alt">Passing Year</label>
                    <input
                      {...register(`tutorProfile.education.${index}.year`)}
                      placeholder="e.g. 2020"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label label-text-alt">Result/GPA</label>
                    <input
                      {...register(`tutorProfile.education.${index}.result`)}
                      placeholder="e.g. GPA 5.00"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>
                </div>
              ))}
              {educationFields.length === 0 && (
                <p className="text-sm text-gray-400 italic">
                  No education history added yet.
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Update Tutor Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorDashboardProfile;

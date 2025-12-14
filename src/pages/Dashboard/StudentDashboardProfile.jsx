import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { confirmation, errorAlert, successAlert } from "../../utilities/alerts";
import CircularProgress from "./CircularProgress";

const StudentDashboardProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // --- 1. React Hook Form Setup ---
  const { 
    register, 
    handleSubmit, 
    control, 
    setValue, 
    reset,
    formState: { isDirty } 
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      studentClass: "",
      division: "",
      district: "",
      address: "",
      guardianRelation: "",
      guardianPhone: ""
    }
  });

  // --- 2. Fetch Data ---
  const { data: foundUser = {}, isLoading: isUserLoading, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  const { data: divisionData = [], isLoading: isDivisionLoading } = useQuery({
    queryKey: ["division"],
    queryFn: async () => {
      const result = await axios.get("/division-district.json");
      return result.data;
    },
  });

  // --- 3. Sync Database Data to Form ---
  // This is the "Professional" way to handle default values from an API
  useEffect(() => {
    if (foundUser?.email) {
      reset({
        name: foundUser.displayName || "",
        email: user?.email || "",
        phone: foundUser.phone || "",
        studentClass: foundUser.studentInfo?.class || "",
        division: foundUser.studentInfo?.division || "",
        district: foundUser.studentInfo?.district || "",
        address: foundUser.studentInfo?.address || "",
        guardianRelation: foundUser.studentInfo?.guardian?.relation || "",
        guardianPhone: foundUser.studentInfo?.guardian?.phone || "",
      });
    }
  }, [foundUser, user, reset]);

  // --- 4. Logic for Dependent Dropdowns ---
  const selectedDivision = useWatch({ control, name: "division" });

  // Calculate districts dynamically based on the CURRENT form value
  const availableDistricts = useMemo(() => {
    if (!selectedDivision) return [];
    const found = divisionData.find((d) => d.division === selectedDivision);
    return found?.district || [];
  }, [selectedDivision, divisionData]);

  // Handle Division Change cleanly
  const handleDivisionChange = (e) => {
    setValue("division", e.target.value); // Set the new division
    setValue("district", ""); // Reset district because the list changed
  };

  // --- 5. Handlers ---
  const updateForm = (data) => {
    // Optional: Check if form is actually dirty before sending request
    if (!isDirty) {
        return errorAlert("No changes made to save.");
    }

    confirmation(
      "Are you sure about updating?",
      "This information will be saved to your profile",
      "Yes Update",
      () => {
        axiosSecure
          .patch(`/user?email=${user?.email}`, data)
          .then((result) => {
            if (result.data.modifiedCount) {
              successAlert("Updated Successfully");
              refetch();
            }
          })
          .catch((error) => {
            console.error(error);
            errorAlert("Something went wrong");
          });
      }
    );
  };

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
        const updateData = {
          photoURL: result.data.data.display_url,
        };
        const backendResult = await axiosSecure.patch(
          `/user?email=${user?.email}`,
          updateData
        );

        if (backendResult.data.modifiedCount) {
          successAlert("Uploaded successfully");
          refetch();
        }
      }
    } catch (error) {
      console.error(error);
      errorAlert("Image upload failed");
    }
  };

  if (isUserLoading || isDivisionLoading) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex gap-10 flex-col md:flex-row">
      {/* --- Left Side: Profile Image --- */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 border rounded-full overflow-hidden mb-4">
          <img
            className="w-full h-full object-cover"
            src={foundUser?.photoURL}
            alt={foundUser?.displayName}
          />
        </div>
        
        <form onSubmit={handleUpdateProfilePicture} className="flex flex-col items-center gap-2 mb-6">
          <input
            name="profilePic"
            type="file"
            className="file-input file-input-bordered file-input-xs w-full max-w-xs"
          />
          <button className="btn btn-secondary btn-xs">
            Update Picture
          </button>
        </form>

        <h2 className="text-2xl font-bold text-center">
          {foundUser?.displayName}
        </h2>
        <div className="mt-4">
            <CircularProgress percentage={foundUser?.profileStatus?.percent} />
        </div>
      </div>

      {/* --- Right Side: Main Form --- */}
      <div className="flex-1">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(updateForm)}>
          
          {/* Personal Info */}
          <div className="border p-5 rounded-lg">
            <h2 className="text-xl mb-3 font-semibold">Personal Info</h2>
            <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Name</label>
                <input
                  {...register("name")}
                  readOnly
                  type="text"
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  {...register("email")}
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
                  placeholder="Phone"
                />
              </div>
            </fieldset>
          </div>

          {/* Academic & Location */}
          <div className="border p-5 rounded-lg">
            <h2 className="text-xl mb-3 font-semibold">Academic & Location</h2>
            <fieldset className="fieldset grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">Class</label>
                <select
                  {...register("studentClass")}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">Select Class</option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={`class_${num}`}>Class {num}</option>
                  ))}
                  <option value="hsc_1">HSC 1st Year</option>
                  <option value="hsc_2">HSC 2nd Year</option>
                </select>
              </div>

              <div>
                <label className="label">Division</label>
                <select
                  {...register("division")}
                  onChange={handleDivisionChange} // Override RHF onChange manually
                  className="select select-bordered w-full"
                >
                  <option disabled value="">Select Division</option>
                  {divisionData.map((d, i) => (
                    <option key={i} value={d.division}>{d.division}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">District</label>
                <select
                  {...register("district")}
                  className="select select-bordered w-full"
                  disabled={!selectedDivision} // Disable if no division selected
                >
                  <option disabled value="">
                    {selectedDivision ? "Select District" : "Select Division First"}
                  </option>
                  {availableDistricts.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="label">Full Address</label>
                <input
                  {...register("address")}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="House No, Road No, Area, etc."
                />
              </div>
            </fieldset>
          </div>

          {/* Guardian Info */}
          <div className="border p-5 rounded-lg">
            <h2 className="text-xl mb-3 font-semibold">Guardian Info</h2>
            <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Relation</label>
                <select
                  {...register("guardianRelation")}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">Select Relation</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div>
                <label className="label">Guardian Phone</label>
                <input
                  {...register("guardianPhone")}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Guardian Phone"
                />
              </div>
            </fieldset>
          </div>

          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentDashboardProfile;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import {
  confirmation,
  errorAlert,
  successAlert,
} from "../../../utilities/alerts";

const DashboardProfile = () => {
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

  // 2. Fetch Division Data
  const { data: divisionDistrict = [], isLoading: isDivisionLoading } =
    useQuery({
      queryKey: ["division"],
      queryFn: async () => {
        const result = await axios.get("/division-district.json");
        return result.data;
      },
    });

  const { register, handleSubmit, control, setValue } = useForm();

  // 3. Watch for changes in Division
  const selectedDivision = useWatch({ control, name: "division" });

  const divisions = divisionDistrict?.map((d) => d.division);

  const getDistricts = (division) => {
    // If user hasn't selected a new division yet, use the one from the database
    const currentDivision = division || foundUser?.studentInfo?.division;

    if (!currentDivision) return [];

    const choosenDivison = divisionDistrict.find(
      (d) => d.division === currentDivision
    );
    return choosenDivison?.district || [];
  };

  //Wait for default values to load
  if (
    isUserLoading ||
    isDivisionLoading ||
    Object.keys(foundUser).length === 0
  ) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const updateForm = (data) => {
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
            }
          })
          .catch((error) => {
            console.log(error);
            errorAlert("Something went wrong");
          });
      }
    );
  };

  const handleUpdateProfilePicture = async (e) => {
    e.preventDefault();
    const profilePicture = e.target.profilePic.files[0];

    if (!profilePicture) {
      return;
    }

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
          icon: result.data.data.thumb?.url || result.data.data.display_url,
          deleteURL: result.data.data.delete_url,
        };

        const result2 = await axiosSecure.patch(`/user?email=${user?.email}`, data);

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

  // console.log(foundUser);

  return (
    <div className="flex gap-10">
      {/* Profile Image */}
      <div>
        <div className="w-30 h-30 border rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={foundUser?.photoURL}
            alt={foundUser?.displayName}
          />
        </div>
        {/* Update Profile Image */}
        <form onSubmit={handleUpdateProfilePicture} className="max-w-[200px]">
          <input
            name="profilePic"
            type="file"
            className="file-input file-input-xs"
          />
          <button className="btn-secondary btn-xs btn">
            Update Profile Picture
          </button>
        </form>
        <h2 className="text-2xl font-bold mt-5">{foundUser?.displayName}</h2>
      </div>

      {/* Form */}
      <div className="flex-1">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(updateForm)}
        >
          {/* Personal Info */}
          <div className="border p-5 rounded-lg">
            <h2 className="text-xl mb-3 font-semibold">Personal Info</h2>
            <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NAME */}
              <div>
                <label className="label">Name</label>
                <input
                  // {...register("name")}
                  defaultValue={foundUser?.displayName}
                  readOnly
                  type="text"
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                  placeholder="Name"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="label">Email</label>
                <input
                  // {...register("email")}
                  defaultValue={user?.email}
                  readOnly
                  type="email"
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="label">Phone</label>
                <input
                  {...register("phone")}
                  defaultValue={foundUser?.phone}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Phone"
                />
              </div>
            </fieldset>
          </div>

          {/* Location Info */}
          <div className="border p-5 rounded-lg">
            <h2 className="text-xl mb-3 font-semibold">Academic & Location</h2>
            <fieldset className="fieldset grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* CLASS */}
              <div>
                <label className="label">Class</label>
                <select
                  {...register("studentClass")}
                  defaultValue={foundUser?.studentInfo?.class || ""}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Select Class
                  </option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={`class${num}`}>
                      Class {num}
                    </option>
                  ))}
                  <option value="hsc1">HSC 1st Year</option>
                  <option value="hsc2">HSC 2nd Year</option>
                </select>
              </div>

              {/* DIVISION */}
              <div>
                <label className="label">Division</label>
                <select
                  {...register("division")}
                  defaultValue={foundUser?.studentInfo?.division || ""}
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    register("division").onChange(e); // Notify RHF
                    setValue("district", ""); // Reset district when division changes
                  }}
                >
                  <option disabled value="">
                    Select Division
                  </option>
                  {divisions?.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* DISTRICT */}
              <div>
                <label className="label">District</label>
                <select
                  {...register("district")}
                  defaultValue={foundUser?.studentInfo?.district || ""}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Select District
                  </option>
                  {getDistricts(selectedDivision).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              {/* ADDRESS */}
              <div className="md:col-span-3">
                <label className="label">Full Address</label>
                <input
                  {...register("address")}
                  defaultValue={foundUser?.studentInfo?.address || ""}
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
              {/* RELATION */}
              <div>
                <label className="label">Relation</label>
                <select
                  {...register("guardianRelation")}
                  defaultValue={
                    foundUser?.studentInfo?.guardian?.relation || ""
                  }
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Select Relation
                  </option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* GUARDIAN PHONE */}
              <div>
                <label className="label">Guardian Phone</label>
                <input
                  {...register("guardianPhone")}
                  defaultValue={foundUser?.studentInfo?.guardian?.phone || ""}
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

export default DashboardProfile;

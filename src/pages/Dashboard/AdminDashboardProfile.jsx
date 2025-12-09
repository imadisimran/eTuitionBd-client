import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { errorAlert, successAlert } from "../../utilities/alerts";

const AdminDashboardProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch User Data (Read-only)
  const {
    data: adminData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  // 2. Handle Profile Picture Update
  const handleUpdateProfilePicture = async (e) => {
    e.preventDefault();
    const profilePicture = e.target.profilePic.files[0];

    if (!profilePicture) {
      errorAlert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", profilePicture);

    try {
      // Upload to ImgBB
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

        // Update Backend
        const result2 = await axiosSecure.patch(
          `/user?email=${user?.email}`,
          data
        );

        if (result2.data.modifiedCount) {
          successAlert("Profile Picture Updated");
          e.target.reset(); // Clear the file input
          refetch(); // Refresh UI
        }
      }
    } catch (error) {
      console.log(error);
      errorAlert("Image upload failed");
    }
  };

  if (isLoading || !adminData) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-full py-10">
      <div className="card w-full max-w-md bg-base-100 border shadow-xl p-8 flex flex-col items-center text-center">
        {/* Profile Image Wrapper */}
        <div className="relative">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img
                src={adminData?.photoURL}
                alt={adminData?.displayName || "Admin"}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          {/* Admin Badge */}
          <div className="absolute top-0 right-0">
            <span className="badge badge-error badge-lg font-bold text-white shadow-md">
              ADMIN
            </span>
          </div>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">
            {adminData?.displayName}
          </h2>
          <p className="text-gray-500 font-medium bg-gray-100 px-4 py-1 rounded-full inline-block">
            {user?.email}
          </p>
        </div>

        <div className="divider my-6">Update Photo</div>

        {/* Image Upload Form */}
        <form
          onSubmit={handleUpdateProfilePicture}
          className="flex flex-col items-center gap-3 w-full"
        >
          <input
            name="profilePic"
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary btn-wide">
            Upload New Picture
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboardProfile;

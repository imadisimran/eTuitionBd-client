import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { longDate } from "../../utilities/formatDate";

const AdminDetailsModal = ({ email, onClose }) => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Admin Data
  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["admin", email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${email}`);
      return result.data;
    },
  });

  // 2. Open Modal Immediately
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const handleClose = () => {
    onClose();
    modalRef.current.close();
  };

  return (
    <dialog
      ref={modalRef}
      className="modal modal-bottom sm:modal-middle"
      onClose={handleClose}
    >
      <div className="modal-box bg-base-100">
        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-4">
            <span className="loading loading-spinner loading-lg text-error"></span>
            <p>Verifying admin credentials...</p>
          </div>
        ) : (
          /* Main Content */
          <div className="flex flex-col items-center">
            {/* Visual Header: Red Background Gradient for "Admin" feel */}
            <div className="w-full h-24 bg-linear-to-r from-[#006a4e] to-[#e1c16e] rounded-t-lg absolute top-0 left-0 z-0"></div>

            {/* Avatar - Overlapping the banner */}
            <div className="avatar z-10 mt-12">
              <div className="w-28 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2 shadow-xl bg-base-100">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} />
                ) : (
                  // Fallback if no image: Use a Shield Icon for Admin
                  <div className="flex items-center justify-center w-full h-full bg-base-200 text-3xl font-bold text-error">
                    🛡️
                  </div>
                )}
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center mt-4 mb-6 z-10">
              <h3 className="font-bold text-2xl">{user?.displayName}</h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="badge badge-error text-white capitalize font-semibold shadow-sm">
                  {user?.role}
                </span>
              </div>
            </div>

            {/* Details Card - Compact Layout */}
            <div className="w-full bg-base-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">
                Admin Information
              </h4>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Email Address</span>
                <span className="font-bold text-gray-800">{user?.email}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">
                  Account Created
                </span>
                <span className="text-gray-800">
                  {longDate(user?.createdAt)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Admin ID</span>
                <code className="bg-base-100 px-2 py-0.5 rounded text-xs text-gray-500 font-mono">
                  {user?._id}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="modal-action mt-6">
          <button className="btn btn-ghost" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default AdminDetailsModal;

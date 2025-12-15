import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { longDate } from "../../utilities/formatDate";
import { formatClass } from "../../utilities/textFormatter";

const StudentDetailsModal = ({ email, onClose }) => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${email}`);
      return result.data;
    },
  });

  useEffect(() => {
    modalRef.current.showModal();
  }, []);

  const handleClose = () => {
    onClose();
    modalRef.current.close();
  };

  return (
    <div>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-48 gap-4">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p>Loading student details...</p>
            </div>
          ) : (
            <div className="modal-box bg-base-100">
              {/* Header Section: Image & Basic Info */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} />
                    ) : (
                      <span className="text-3xl font-bold uppercase">
                        {user?.displayName?.slice(0, 1) || "U"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-2xl">{user?.displayName}</h3>
                  <div className="badge badge-secondary badge-outline mt-1 capitalize">
                    {user?.role}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Joined: {longDate(user?.createdAt)}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="divider">Details</div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {/* Personal Info */}
                <div className="space-y-2">
                  <h4 className="font-bold text-primary border-b pb-1">
                    Contact Info
                  </h4>
                  <p>
                    <span className="font-semibold">Email:</span> {user?.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {user?.phone || "N/A"}
                  </p>
                </div>

                {/* Academic Info */}
                <div className="space-y-2">
                  <h4 className="font-bold text-primary border-b pb-1">
                    Academic Info
                  </h4>
                  <p>
                    <span className="font-semibold">Class:</span>{" "}
                    <span className="uppercase">
                      {formatClass(user?.studentInfo?.class)}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Division:</span>{" "}
                    {user?.studentInfo?.division ?? "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">District:</span>{" "}
                    {user?.studentInfo?.district ?? "N/A"}
                  </p>
                </div>
              </div>

              {/* Full Width Sections */}
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Full Address:</span>{" "}
                  {user?.studentInfo?.address ?? "N/A"}
                </p>
              </div>

              {/* Guardian Info Box */}
              <div className="mt-6 bg-base-200 p-3 rounded-lg border border-base-300">
                <h4 className="font-bold text-sm text-gray-600 mb-2">
                  Guardian Information
                </h4>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="block text-xs text-gray-500">
                      Relation
                    </span>
                    <span className="font-medium capitalize">
                      {user?.studentInfo?.guardian?.relation ?? "N/A"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-500">
                      Guardian Phone
                    </span>
                    <span className="font-medium">
                      {user?.studentInfo?.guardian?.phone ?? "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Click outside to close backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default StudentDetailsModal;

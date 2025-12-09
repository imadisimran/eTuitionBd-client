import React from "react";
import {
  MapPin,
  DollarSign,
  BookOpen,
  User,
  Monitor,
  Clock,
  Briefcase,
} from "lucide-react";
import { longDate } from "../../utilities/formatDate";

const TuitionDetailsModal = ({ tuitionDetailsModalRef, tuitionDetails }) => {
  let tuitionClass = "";
  if (tuitionDetails?.class === "hsc_1_st_year") {
    tuitionClass = "HSC 1st Year";
  }
  if (tuitionDetails?.class === "hsc_2_nd_year") {
    tuitionClass = "HSC 2nd Year";
  }

  // console.log(tuitionDetails)

  return (
    <>
      {/* 2. The DaisyUI Modal Structure */}
      <dialog
        ref={tuitionDetailsModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box p-0 max-w-lg bg-white overflow-hidden text-left font-sans">
          {/* Header Section */}
          <div className="bg-slate-50 p-6 border-b border-gray-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="badge badge-success gap-1 text-white text-xs font-bold uppercase tracking-wider">
                  {tuitionDetails?.status}
                </div>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <Clock size={12} /> {longDate(tuitionDetails?.createdAt)}
                </span>
              </div>
              <h3 className="font-bold text-xl text-gray-800">
                {tuitionDetails?.title}
              </h3>
            </div>
            {/* X Close Button (Corner) */}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
                ✕
              </button>
            </form>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-6 space-y-6">
            {/* Student Profile */}
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content flex justify-center items-center rounded-full w-12">
                  <span className="text-xl">
                    {tuitionDetails?.studentName?.[0]}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {tuitionDetails?.studentName}
                </p>
                <p className="text-xs text-gray-500">
                  {tuitionDetails?.studentEmail}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Salary Box */}
              <div className="col-span-2 bg-green-50 p-4 rounded-xl border border-green-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-800 font-medium">
                  <DollarSign size={18} /> Salary
                </div>
                <div className="text-lg font-extrabold text-green-700">
                  {tuitionDetails?.salaryRange?.min}-
                  {tuitionDetails?.salaryRange?.max}{" "}
                  <span className="text-xs font-normal">BDT</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Subject
                </p>
                <p className="font-semibold text-gray-700 flex items-center gap-2 capitalize">
                  <BookOpen size={14} className="text-blue-500" />{" "}
                  {tuitionDetails?.subject}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Class & Medium
                </p>
                <p className="text-sm text-gray-700 font-medium capitalize">
                  {tuitionClass} • {tuitionDetails?.medium?.split("_").join(" ")}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Logistics
                </p>
                <p className="text-sm text-gray-700 font-medium flex items-center gap-1">
                  <Monitor size={14} /> {tuitionDetails?.mode} •{" "}
                  {tuitionDetails?.daysPerWeek} Days
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Tutor Pref.
                </p>
                <p className="text-sm text-gray-700 font-medium flex items-center gap-1">
                  <User size={14} /> {tuitionDetails?.teacherGender}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
              <MapPin size={16} className="mt-0.5 text-gray-400" />
              <span>{`${tuitionDetails?.location?.address}, ${tuitionDetails?.location?.district}, ${tuitionDetails?.location?.division}`}</span>
            </div>
          </div>

          {/* Action Footer (Sticky Bottom) */}
          <div className="modal-action bg-gray-50 p-4 m-0 flex justify-between items-center border-t border-gray-100">
            <form method="dialog">
              {/* This button closes the modal */}
              <button className="btn btn-ghost text-gray-500">Close</button>
            </form>
          </div>
        </div>

        {/* Backdrop click to close is handled natively by DaisyUI/HTML Dialog */}
        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </>
  );
};

export default TuitionDetailsModal;

import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import {
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUserGraduate,
  FaMars,
  FaClock,
} from "react-icons/fa";
import { formatClass, formatWith_ } from "../../utilities/textFormatter";
import { shortDate } from "../../utilities/formatDate";
import useRole from "../../hooks/useRole";
import ApplyModalForm from "../Home/ApplyModalForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { confirmation, errorAlert } from "../../utilities/alerts";

const TuitionDetails = () => {
  const { user } = useAuth();
  const axiosNormal = useAxiosNormal();
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const navigate = useNavigate();
  const { data: dbUser } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${user?.email}`);
      return result.data;
    },
  });
  const { id } = useParams();
  const applyFormRef = useRef();

  const {
    data: tuition,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const { data } = await axiosNormal.get(`/tuition/${id}`);
      return data;
    },
  });

  if (isLoading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {error.message}
      </div>
    );
  }

  const {
    studentName,
    title,
    subject,
    class: studentClass,
    medium,
    salaryRange,
    teacherGender,
    mode,
    daysPerWeek,
    description,
    location,
    createdAt,
  } = tuition;

  const handleApplyBtn = () => {
    if (dbUser.profileStatus.isReady) {
      if (dbUser?.tutorProfile?.status === "approved") {
        applyFormRef.current.showModal();
      } else {
        errorAlert("Your profile is not approved yet");
      }
    } else {
      confirmation(
        "Your profile is not completed",
        "Complete your profile to apply",
        "Complete Now",
        () => {
          navigate("/dashboard/profile");
        }
      );
    }
  };

  return (
    <>
      <div className="md:my-10">
        {/* Main Card Container */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            {/* Header Section: Title & Status */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4 border-base-200 gap-4">
              <div>
                <div className="badge badge-secondary mb-2 font-bold text-xs uppercase">
                  {formatWith_(medium)}
                </div>
                <h1 className="text-3xl font-bold text-primary">{title}</h1>
                <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
                  <FaChalkboardTeacher /> Subject:{" "}
                  <span className="text-base-content capitalize">
                    {formatWith_(subject)}
                  </span>
                </p>
              </div>
            </div>

            {/* Grid Layout for Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Column 1: Job Logistics */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-l-4 border-primary pl-3">
                  Job Details
                </h2>

                <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
                  <FaUserGraduate className="text-xl text-secondary" />
                  <div>
                    <p className="text-xs text-gray-500">Class</p>
                    <p className="font-bold text-lg capitalize">
                      {formatClass(studentClass)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
                  <FaMoneyBillWave className="text-xl text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Salary Range</p>
                    <p className="font-bold text-lg">
                      {salaryRange.min} - {salaryRange.max} BDT
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
                  <FaCalendarAlt className="text-xl text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Days Per Week</p>
                    <p className="font-bold text-lg">{daysPerWeek} Days</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
                  {/* Logic to show different icons if mode is Online/Offline */}
                  <FaClock className="text-xl text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-500">Mode</p>
                    <p className="font-bold text-lg capitalize">{mode}</p>
                  </div>
                </div>
              </div>

              {/* Column 2: Requirements & Location */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-l-4 border-primary pl-3">
                  Requirements & Location
                </h2>

                <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
                  <FaMars className="text-xl text-pink-500" />
                  <div>
                    <p className="text-xs text-gray-500">
                      Preferred Tutor Gender
                    </p>
                    <p className="font-bold text-lg">{teacherGender}</p>
                  </div>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-xl text-red-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-bold text-lg">
                        {location.division}, {location.district}
                      </p>
                      <p className="text-gray-600 mt-1">{location.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">Posted By</p>
                  <p className="font-bold">{studentName}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Posted on: {shortDate(createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-2">Description</h3>
              <div className="bg-base-200/50 p-5 rounded-xl border border-base-300">
                <p className="text-base-content leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="card-actions justify-end mt-6">
              {role === "tutor" && (
                <button
                  onClick={handleApplyBtn}
                  className="btn btn-secondary btn-wide text-lg text-white"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ApplyModalForm
        tuitionId={id}
        tuitionTitle={tuition?.title}
        applyFormRef={applyFormRef}
      ></ApplyModalForm>
    </>
  );
};

export default TuitionDetails;

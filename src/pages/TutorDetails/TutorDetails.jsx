import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SandClock from "../../components/SandClock";

const TutorDetails = () => {
  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`tutor/${id}`);
      return result.data;
    },
  });

  const { displayName, email, phone, photoURL, role, tutorProfile } =
    tutor || {};
  const {
    institution,
    qualification,
    experience,
    gender,
    bio,
    subjects,
    education,
  } = tutorProfile || {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <SandClock size="200px"></SandClock>
      </div>
    );
  }

  return (
    <div className="bg-base-200 rounded-3xl mt-10 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* --- Header / Hero Section --- */}
        <div className="card lg:card-side bg-base-100 shadow-xl mb-8 overflow-hidden">
          <figure className="lg:w-1/3 bg-primary/10 flex justify-center items-center p-8">
            <div className="avatar">
              <div className="w-48 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2 shadow-2xl">
                <img
                  src={
                    photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                  }
                  alt={displayName}
                  className="object-cover"
                />
              </div>
            </div>
          </figure>
          <div className="card-body lg:w-2/3">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div>
                <h2 className="card-title text-4xl font-bold mb-2">
                  {displayName}
                </h2>
                <p className="text-lg text-gray-500 font-medium flex items-center gap-2">
                  <FaGraduationCap className="text-primary" /> {qualification}
                </p>
                <div className="badge badge-secondary badge-outline mt-2 capitalize">
                  {role}
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                {/* Experience Badge */}
                <div className="stats shadow bg-base-200">
                  <div className="stat place-items-center p-4">
                    <div className="stat-title">Experience</div>
                    <div className="stat-value text-primary text-2xl">
                      {experience}+ Years
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-semibold">{phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current Institution</p>
                  <p className="font-semibold">{institution}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FaChalkboardTeacher />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="font-semibold">{gender}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About & Subjects */}
          <div className="lg:col-span-1 space-y-8">
            {/* About Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl border-l-4 border-primary pl-3">
                  About Me
                </h3>
                <p className="text-gray-600 leading-relaxed mt-2">
                  {bio || "No bio description available for this tutor."}
                </p>
              </div>
            </div>

            {/* Subjects Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl border-l-4 border-accent pl-3">
                  Subjects
                </h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {subjects?.map((sub, idx) => (
                    <div
                      key={idx}
                      className="badge badge-accent badge-lg text-white p-4 uppercase"
                    >
                      {sub}
                    </div>
                  ))}
                  {(!subjects || subjects.length === 0) && (
                    <p className="text-gray-400">No subjects listed.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="btn btn-primary w-full shadow-lg text-lg">
              Book This Tutor
            </button>
          </div>

          {/* Right Column: Education Table */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl h-full">
              <div className="card-body">
                <h3 className="card-title text-xl border-l-4 border-secondary pl-3 mb-6">
                  Educational Background
                </h3>

                <div className="overflow-x-auto rounded-lg border border-base-200">
                  <table className="table table-zebra w-full">
                    <thead className="bg-base-200 text-base-content uppercase text-sm">
                      <tr>
                        <th className="py-4">Degree</th>
                        <th>Institute</th>
                        <th>Year</th>
                        <th className="text-right">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {education?.map((edu, idx) => (
                        <tr key={idx} className="hover">
                          <td className="font-bold text-primary">
                            {edu.degree}
                          </td>
                          <td>
                            <span className="font-medium text-gray-700">
                              {edu.institute}
                            </span>
                          </td>
                          <td>
                            <div className="badge badge-ghost">{edu.year}</div>
                          </td>
                          <td className="text-right">
                            <span className="font-bold text-success">
                              {edu.result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;

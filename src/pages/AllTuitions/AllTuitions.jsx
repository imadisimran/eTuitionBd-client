import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState, useRef, useEffect } from "react";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import TuitionCard from "../../components/TuitionCard";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import SandClock from "../../components/SandClock";

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

const AllTuitions = () => {
  const axiosNormal = useAxiosNormal();
  const [selectedPage, setSelectedPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [filterParams, setFilterParams] = useState({
    sortBy: "post_date",
  });

  // Fetch Tuitions
  const { data: { tuitions = [], totalTuitions = 0 } = {}, isLoading } =
    useQuery({
      queryKey: ["tuitions", filterParams, selectedPage],
      queryFn: async () => {
        const result = await axiosNormal.get("/tuitions", {
          params: { ...filterParams, pageNo: selectedPage },
        });
        return result.data;
      },
    });

  // Assuming 8 items per page for a 4-column layout looks better (2 rows)
  const totalPages = Math.ceil(totalTuitions / 8);
  const pageNumber = [...Array(totalPages).keys()].map((num) => num + 1);

  // Form Setup
  const { handleSubmit, register, setValue, control, reset } = useForm({
    defaultValues: {
      division: "",
      district: "",
      searchTxt: "",
      studentClass: "",
      subject: "",
      sortBy: "post_date",
    },
  });

  // Fetch Divisions
  const { data: divisionData = [], isLoading: isDivisionLoading } = useQuery({
    queryKey: ["division"],
    queryFn: async () => {
      const result = await axios.get("/division-district.json");
      return result.data;
    },
  });

  const selectedDivision = useWatch({ control, name: "division" });

  const availableDistricts = useMemo(() => {
    if (!selectedDivision) return [];
    const found = divisionData.find((d) => d.division === selectedDivision);
    return found?.district || [];
  }, [selectedDivision, divisionData]);

  const handleDivisionChange = (e) => {
    setValue("division", e.target.value);
    setValue("district", ""); // Reset district when division changes
  };

  const handleApplyFilter = (data) => {
    const cleanFilters = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != null && v !== ""),
    );
    setFilterParams(cleanFilters);
    setSelectedPage(1);
    setIsFilterOpen(false); // Close dropdown after applying advanced filters
  };

  const handleReset = () => {
    reset({
      division: "",
      district: "",
      searchTxt: "",
      studentClass: "",
      subject: "",
      sortBy: "post_date",
    });
    setFilterParams({ sortBy: "post_date" });
    setSelectedPage(1);
    setIsFilterOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isDivisionLoading || isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80.36px)]">
        <SandClock size="250px"></SandClock>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl">
      <title>eTuitionBD - Tuitions</title>

      {/* Top Search & Filter Bar */}
      <form onSubmit={handleSubmit(handleApplyFilter)} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between w-full">
          {/* Dedicated Functional Search Bar */}
          <div className="flex-grow w-full md:max-w-xl">
            <div className="relative flex items-center">
              <svg
                className="absolute left-4 w-5 h-5 text-neutral/50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                {...register("searchTxt")}
                type="search"
                className="input input-bordered w-full pl-12 pr-24 rounded-full bg-base-100 shadow-sm focus:outline-primary"
                placeholder="Search tuitions by title, subject..."
              />
              <button
                type="submit"
                className="absolute right-1 btn btn-primary btn-sm rounded-full px-6"
              >
                Search
              </button>
            </div>
          </div>

          {/* Advanced Filters Dropdown */}
          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn btn-outline w-full md:w-auto flex items-center gap-2 rounded-full px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filters
            </button>

            {/* Dropdown Menu Box */}
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-3 w-full sm:w-80 md:w-96 bg-base-100 shadow-2xl rounded-2xl border border-base-200 z-50 p-6 overflow-y-auto max-h-[70vh]">
                <h3 className="font-bold text-lg mb-4 border-b pb-2">
                  Advanced Filters
                </h3>

                <div className="space-y-4">
                  {/* Sort */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-medium">Sort By</span>
                    </label>
                    <select
                      className="select select-bordered select-sm w-full"
                      {...register("sortBy")}
                    >
                      <option value="post_date">Post Date</option>
                      <option value="budget">Budget</option>
                    </select>
                  </div>

                  {/* Class */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-medium">Class</span>
                    </label>
                    <select
                      {...register("studentClass")}
                      className="select select-bordered select-sm w-full"
                    >
                      <option value="">Any Class</option>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={`class_${num}`}>
                            Class {num}
                          </option>
                        ),
                      )}
                      <option value="hsc_1">HSC 1st Year</option>
                      <option value="hsc_2">HSC 2nd Year</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-medium">Subject</span>
                    </label>
                    <select
                      className="select select-bordered select-sm w-full"
                      {...register("subject")}
                    >
                      <option value="">Any Subject</option>
                      {subjectOptions.map((sub, index) => (
                        <option key={index} value={sub.value}>
                          {sub.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Division */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-medium">Division</span>
                    </label>
                    <select
                      {...register("division")}
                      onChange={handleDivisionChange}
                      className="select select-bordered select-sm w-full"
                    >
                      <option value="">Any Division</option>
                      {divisionData.map((d, i) => (
                        <option key={i} value={d.division}>
                          {d.division}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-medium">District</span>
                    </label>
                    <select
                      {...register("district")}
                      className="select select-bordered select-sm w-full"
                      disabled={!selectedDivision}
                    >
                      <option value="">
                        {selectedDivision
                          ? "Any District"
                          : "Select Division First"}
                      </option>
                      {availableDistricts.map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <button type="submit" className="btn btn-primary flex-grow">
                      Apply Now
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-neutral"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Tuition Cards Grid - Now 4 columns on xl screens */}
      {tuitions.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-box border border-base-300">
          <h2 className="text-2xl font-bold text-neutral">No Tuitions Found</h2>
          <p className="text-neutral/70 mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {tuitions.length > 0 && (
        <div className="flex justify-center flex-wrap gap-2 mt-8">
          {pageNumber.map((p) => (
            <button
              key={p}
              onClick={() => {
                setSelectedPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" }); // Optional UX addition
              }}
              className={`btn btn-sm ${
                selectedPage === p ? "btn-primary" : "btn-outline"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllTuitions;

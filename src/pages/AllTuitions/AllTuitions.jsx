import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import TuitionCard from "../../components/TuitionCard";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import SmallLoader from "../../components/SmallLoader";
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
  const totalPages = Math.ceil(totalTuitions / 6);
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
    setValue("district", "");
  };

  const handleApplyFilter = (data) => {
    const cleanFilters = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != null && v !== "")
    );
    // console.log(cleanFilters);
    setFilterParams(cleanFilters);
    setSelectedPage(1)
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
    setSelectedPage(1)
  };

  if (isDivisionLoading || isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80.36px)]">
        <SandClock size="250px"></SandClock>
      </div>
    );
  }

  return (
    <section>
      <div className="drawer lg:drawer-open">
        <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col p-4 gap-4">
          <div className="lg:hidden">
            <label htmlFor="filter-drawer" className="btn btn-primary w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              Filter Tuitions
            </label>
          </div>

          {/* Tuition Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition}></TuitionCard>
            ))}
          </div>
        </div>

        <div className="drawer-side z-50 top-5">
          <label
            htmlFor="filter-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          {/* Sidebar Container */}
          <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filter Options</h2>
              <label
                htmlFor="filter-drawer"
                className="btn btn-sm btn-circle btn-ghost lg:hidden"
              >
                ✕
              </label>
            </div>

            <form
              onSubmit={handleSubmit(handleApplyFilter)}
              className="space-y-4"
            >
              {/* Search */}
              <div className="form-control">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    {...register("searchTxt")}
                    type="search"
                    className="grow"
                    placeholder="Search"
                  />
                </label>
              </div>

              {/* Sort */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sort By</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("sortBy")}
                >
                  <option value="post_date">Post Date</option>
                  <option value="budget">Budget</option>
                </select>
              </div>

              {/* Class */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Class</span>
                </label>
                <select
                  {...register("studentClass")}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Select Class
                  </option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={`class_${num}`}>
                      Class {num}
                    </option>
                  ))}
                  <option value="hsc_1">HSC 1st Year</option>
                  <option value="hsc_2">HSC 2nd Year</option>
                </select>
              </div>

              {/* Division */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Division</span>
                </label>
                <select
                  {...register("division")}
                  onChange={handleDivisionChange}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Select Division
                  </option>
                  {divisionData.map((d, i) => (
                    <option key={i} value={d.division}>
                      {d.division}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
                  {...register("district")}
                  className="select select-bordered w-full"
                  disabled={!selectedDivision}
                >
                  <option disabled value="">
                    {selectedDivision
                      ? "Select District"
                      : "Select Division First"}
                  </option>
                  {availableDistricts.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("subject")}
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
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Apply Filters
              </button>
            </form>
            <button onClick={handleReset} className="btn btn-secondary mt-5">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      <div className="w-fit mx-auto space-x-5">
        {pageNumber.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPage(p)}
            className={`btn btn-sm ${
              selectedPage === p ? "btn-accent" : "btn-neutral"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </section>
  );
};

export default AllTuitions;

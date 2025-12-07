import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";

const DashboardProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: foundUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  const { data: divisionDistrict = [] } = useQuery({
    queryKey: ["division"],
    queryFn: async () => {
      const result = await axios.get("/division-district.json");
      return result.data;
    },
  });

  const { register, handleSubmit, control } = useForm();

  const updateForm = (data) => {
    console.log(data);
  };

  const divisions = divisionDistrict?.map((d) => d.division);
  const selectedDivision = useWatch({ name: "division", control });
  const getDistricts = (division) => {
    const choosenDivison = divisionDistrict.find(
      (d) => d.division === division
    );
    const districts = choosenDivison?.district;
    return districts;
  };

  // console.log(foundUser)
  return (
    <div className="flex gap-10">
      {/* Image and little information div */}
      <div>
        <div className="w-30 h-30 border">
          <img
            className="rounded-full"
            src={foundUser?.photoURL}
            alt={foundUser?.displayName}
          />
        </div>
        <h2 className="text-2xl font-bold mt-5">{foundUser?.displayName}</h2>
      </div>
      <div>
        <form className="flex gap-5" onSubmit={handleSubmit(updateForm)}>
          <div>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                {...register("name")}
                type="text"
                className="input"
                placeholder="Name"
              />
              <label className="label">Email</label>
              <input
                {...register("email")}
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Phone</label>
              <input
                {...register("phone")}
                type="text"
                className="input"
                placeholder="Phone"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <label className="label">Class</label>
              <select
                {...register("studentClass")}
                defaultValue=""
                className="select"
              >
                <option disabled value="">
                  Select Your Class
                </option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={`class${num}`}>
                    Class {num}
                  </option>
                ))}
                <option value="hsc1">HSC 1st Year</option>
                <option value="hsc2">HSC 2nd Year</option>
              </select>
              <label className="label">Division</label>
              <select
                {...register("division")}
                defaultValue=""
                className="select"
              >
                <option disabled value="">
                  Select Your Division
                </option>
                {divisions?.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <label className="label">District</label>
              <select
                {...register("district")}
                defaultValue=""
                className="select"
              >
                <option disabled value="">
                  Select Your District
                </option>
                {getDistricts(selectedDivision)?.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <label className="label">Relation</label>
              <select
                {...register("guardianRelation")}
                defaultValue=""
                className="select"
              >
                <option disabled value="">
                  Select Your Relation
                </option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="others">Others</option>
              </select>
              <label className="label">Guardian Phone</label>
              <input type="text" className="input" placeholder="Phone" />
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardProfile;

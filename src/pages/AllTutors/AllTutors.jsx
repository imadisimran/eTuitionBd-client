import React from "react";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import { useQuery } from "@tanstack/react-query";
import TutorCard from "../../components/TutorCard";
import SandClock from "../../components/SandClock";

const AllTutors = () => {
  const axiosNormal = useAxiosNormal();
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const result = await axiosNormal.get("/tutors");
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80.36px)]">
        <SandClock size="250px"></SandClock>
      </div>
    );
  }
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {tutors.map((tutor) => (
        <TutorCard tutor={tutor} key={tutor._id}></TutorCard>
      ))}
    </section>
  );
};

export default AllTutors;

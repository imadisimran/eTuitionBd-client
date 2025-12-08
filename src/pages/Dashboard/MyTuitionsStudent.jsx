import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyTuitionsStudent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure;
  const { data: tuitions } = useQuery({
    queryKey: [user?.email, "tuitions"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/tuitions?email=${user?.email}`);
      return result.data;
    },
  });
  return <div>
    
  </div>;
};

export default MyTuitionsStudent;

import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useName = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["user", "name", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/user/name");
      return result.data;
    },
  });
  return { data, isLoading };
};

export default useName;

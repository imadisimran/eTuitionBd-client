import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useProvider = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: providerInfo = "password", isLoading } = useQuery({
    queryKey: ["user", "provider", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get("/user-provider");
      return result.data;
    },
  });
  return { providerInfo, isLoading };
};

export default useProvider;

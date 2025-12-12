import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useRole from "./useRole";
import { useQuery } from "@tanstack/react-query";

const useApplied = (tuitionId) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, roleLoading] = useRole();

  const {
    data,
    isLoading: isQueryLoading,
    refetch,
  } = useQuery({
    queryKey: ["applyStatus", tuitionId, user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/application/check?tuitionId=${tuitionId}&email=${user?.email}`
      );
      return result.data;
    },

    enabled: !!user?.email && !!tuitionId && !roleLoading && role === "tutor",
  });

  return {
    isApplied: !!data?._id,
    isLoading: isQueryLoading || roleLoading,
    refetch,
  };
};

export default useApplied;

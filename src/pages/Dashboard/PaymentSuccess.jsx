import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const { data, isLoading } = useQuery({
    queryKey: ["payment-success", session_id],
    queryFn: async () => {
      const res = await axiosSecure.patch(`/payment-success`, { session_id });
      return res.data;
    },
    enabled: !!session_id,
  });
  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Payment successful</h2>
      <p>Transaction Id: <b>{data?.transactionId}</b></p>
    </div>
  );
};

export default PaymentSuccess;

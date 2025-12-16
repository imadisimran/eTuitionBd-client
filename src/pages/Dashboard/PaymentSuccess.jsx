import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SandClock from "../../components/SandClock";

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
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <SandClock size="250px"></SandClock>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Payment successful</h2>
      <p>
        Transaction Id: <b>{data?.transactionId}</b>
      </p>
    </div>
  );
};

export default PaymentSuccess;

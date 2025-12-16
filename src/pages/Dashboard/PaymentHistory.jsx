import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { longDateFromS } from "../../utilities/formatDate";
import SandClock from "../../components/SandClock";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/payments");
      return result.data;
    },
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <SandClock size="200px"></SandClock>
      </div>
    );
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Date & Time</th>
              <th>Transaction Id</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{longDateFromS(payment.paidAt)}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

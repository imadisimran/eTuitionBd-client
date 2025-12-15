import React from "react";
import TuitionStats from "./TuitionStats";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PaymentCard from "./PaymentCard";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: { tuitionStats = [], totalTransaction = [] } = {} } = useQuery({
    queryKey: ["tuitions", "stats"],
    queryFn: async () => {
      const result = await axiosSecure.get("/admin-dashboard");
      return result.data;
    },
  });
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const result = await axiosSecure.get("/payments");
      return result.data;
    },
  });
  console.log(totalTransaction);
  return (
    <div className="flex gap-5 flex-col md:flex-row justify-center items-center md:items-start">
      <div>
        <div>
          <h2 className="text-2xl font-bold">Tuitions</h2>
          <TuitionStats tuitionStats={tuitionStats}></TuitionStats>
        </div>
        <h2 className="text-2xl font-bold">
          Total Transaction: BDT{" "}
          <span className="text-primary">{totalTransaction[0]?.total}</span>
        </h2>
      </div>
      <div className="h-[calc(100vh-80.36px)] bg-base-200 w-full p-10 rounded-3xl flex flex-col items-center md:items-start md:flex-row">
        {payments.map((data) => (
          <PaymentCard key={data._id} data={data}></PaymentCard>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;

import axios from "axios";
import React from "react";

const axiosNormal = axios.create({
  baseURL: "https://e-tuition-bd-server-gamma.vercel.app",
});
const useAxiosNormal = () => {
  return axiosNormal;
};

export default useAxiosNormal;

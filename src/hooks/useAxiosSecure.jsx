import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${user?.accessToken}`;
        return config;
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;

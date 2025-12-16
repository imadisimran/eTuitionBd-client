import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { LogOut } from "lucide-react";
import { auth } from "../firebase/firebase.config";

const axiosSecure = axios.create({
  baseURL: "https://e-tuition-bd-server-gamma.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  // console.log(user?.accessToken)
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // This ensures the token is valid right NOW.
          const token = await currentUser.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // console.log(error);
        if (error.status === 401 || error.status === 403) {
          logOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;

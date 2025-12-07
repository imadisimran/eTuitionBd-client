import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import GoogleBtn from "./GoogleBtn";
import useAuth from "../../hooks/useAuth";
import { errorAlert, successAlert } from "../../utilities/alerts";
import SubmitBtn from "./SubmitBtn";

const Login = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm();
  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        if (result.user.accessToken) {
          successAlert();
        }
      })
      .catch((error) => {
        console.log(error);
        errorAlert();
      });
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white w-full [&_input]:w-full max-w-[500px] p-10 rounded-3xl">
        <h3 className="text-xl font-bold text-center">Login</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              {...register("email")}
              type="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              {...register("password")}
              type="password"
              className="input"
              placeholder="Password"
            />
            <SubmitBtn txt='Login'></SubmitBtn>
          </fieldset>
        </form>
        <GoogleBtn></GoogleBtn>
        <div className="divider">OR</div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-secondary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

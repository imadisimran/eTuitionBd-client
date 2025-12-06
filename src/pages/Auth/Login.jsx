import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import GoogleBtn from "./GoogleBtn";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const handleLogin = (data) => {
    console.log(data);
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
            <input
              type="submit"
              value="Login"
              className="btn btn-secondary mt-5"
            />
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

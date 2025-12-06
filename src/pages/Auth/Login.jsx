import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white w-full [&_input]:w-full max-w-[500px] p-10 rounded-3xl">
         <h3 className="text-xl font-bold my-5 text-center">Login</h3>
        <form>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
            <input
              type="submit"
              value="Login"
              className="btn btn-secondary mt-5"
            />
          </fieldset>
        </form>
        <div className="divider">OR</div>
        <p className="text-center">Don't have an account? <Link to='/register' className="text-secondary">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router"; // Assuming react-router-dom in your setup
import GoogleBtn from "./GoogleBtn";
import useAuth from "../../hooks/useAuth";
import { errorAlert, successAlert } from "../../utilities/alerts";
import SubmitBtn from "./SubmitBtn";

const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        if (result.user.accessToken) {
          successAlert();
          navigate(location.state || "/");
        }
      })
      .catch((error) => {
        console.log(error);
        errorAlert();
      });
  };

  const fillWithDemo = ({ email, password }) => {
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white w-full [&_input]:w-full max-w-[500px] p-10 rounded-3xl">
        <h3 className="text-xl font-bold text-center flex relative justify-center">
          <span>Login</span>{" "}
          <details className="dropdown absolute right-0">
            <summary className="m-1 btn btn-secondary ">
              Demo Credentials
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <button
                  onClick={() =>
                    fillWithDemo({
                      email: "student1@mail.com",
                      password: "BD loose2",
                    })
                  }
                  className="btn btn-ghost btn-primary"
                >
                  Student
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    fillWithDemo({
                      email: "tutor1@mail.com",
                      password: "BD loose",
                    })
                  }
                  className="btn btn-ghost btn-primary"
                >
                  Tutor
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    fillWithDemo({
                      email: "hero@admin.com",
                      password: "heroAdmin",
                    })
                  }
                  className="btn btn-ghost btn-primary"
                >
                  Admin
                </button>
              </li>
            </ul>
          </details>
        </h3>

        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset flex flex-col gap-2">
            <label className="label">Email</label>
            <input
              // 2. Add custom error message for the required rule
              {...register("email", { required: "Email is required" })}
              type="email"
              className={`input ${errors.email ? "border-red-500" : ""}`}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
            <label className="label mt-2">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type="password"
              className={`input ${errors.password ? "border-red-500" : ""}`}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <div className="mt-4">
              <SubmitBtn txt="Login"></SubmitBtn>
            </div>
          </fieldset>
        </form>

        <div className="mt-6">
          <GoogleBtn></GoogleBtn>
        </div>
        <div className="divider my-4">OR</div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link
            state={location.state}
            to="/register"
            className="text-secondary font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

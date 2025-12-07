import React from "react";
import { useForm, useWatch } from "react-hook-form";

const StudentRegister = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });
  const studentRegister = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(studentRegister)}>
        <fieldset className="fieldset">
          {/* First Name */}
          <label className="label">First Name</label>
          <input
            {...register("firstName", { required: "First Name is required" })}
            type="text"
            className="input"
            placeholder="First Name"
          />
          {errors.firstName && (
            <span className="text-secondary text-sm">
              {errors.firstName.message}
            </span>
          )}

          {/* Last Name */}
          <label className="label">Last Name</label>
          <input
            {...register("lastName", { required: "Last Name is required" })}
            type="text"
            className="input"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span className="text-secondary text-sm">
              {errors.lastName.message}
            </span>
          )}
          <label className="label">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <span className="text-secondary text-sm">
              Password length must be at least 6 characters long
            </span>
          )}
          {errors.password && (
            <span className="text-secondary text-sm">
              {errors.password.message}
            </span>
          )}

          <label className="label">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              // 4. Compare against the variable from useWatch
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
            type="password"
            className="input"
            placeholder="Enter Password Again"
          />
          {errors.confirmPassword && (
            <span className="text-secondary text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
          <input
            type="submit"
            value="Register"
            className="btn btn-secondary mt-5"
          />
        </fieldset>
      </form>
    </div>
  );
};

export default StudentRegister;

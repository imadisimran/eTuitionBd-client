import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SubmitBtn from "./SubmitBtn";
import { errorAlert, successAlert } from "../../utilities/alerts";

const TutorRegister = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Watch the password field to compare with confirm password
  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const { setLoading, signUp, update } = useAuth();

  const tutorRegister = async (data) => {
    try {
      const result = await signUp(data.email, data.password);
      if (result.user.accessToken) {
        const name = `${data.firstName} ${data.lastName}`;
        const updateRes = await update({ displayName: name });
        console.log(updateRes)
        successAlert("Registration Successful");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorAlert();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(tutorRegister)}>
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

          {/* Institution - Not Required */}
          <label className="label">Institution</label>
          <input
            {...register("institution")}
            type="text"
            className="input"
            placeholder="Institution"
          />

          {/* Email */}
          <label className="label">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-secondary text-sm">
              {errors.email.message}
            </span>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password length must be at least 6 characters long",
              },
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-secondary text-sm">
              {errors.password.message}
            </span>
          )}

          {/* Confirm Password */}
          <label className="label">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
            type="password"
            className="input"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="text-secondary text-sm">
              {errors.confirmPassword.message}
            </span>
          )}

          <SubmitBtn txt="Register As Tutor"></SubmitBtn>
        </fieldset>
      </form>
    </div>
  );
};

export default TutorRegister;

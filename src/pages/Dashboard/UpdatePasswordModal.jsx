import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { X, Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const UpdatePasswordModal = ({ updatePasswordModalRef }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { passwordUpdate, user } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = useWatch({
    control,
    name: "newPassword",
    defaultValue: "",
  });

  // Helper to close modal programmatically and reset form
  const handleClose = () => {
    reset();
    updatePasswordModalRef.current.close();
  };

  const onSubmit = async (data) => {
    console.log(isSubmitting)
    try {
     await passwordUpdate(
        user,
        data.currentPassword,
        data.newPassword,
      );
      handleClose();
    
      Swal.fire({
        title: "Success!",
        text: "Your password has been updated successfully.",
        icon: "success",
        background: "var(--color-base-100)",
        color: "var(--color-base-content)",
        confirmButtonColor: "var(--color-primary)",
      });
      
    } catch (error) {
        handleClose();
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update password.",
        icon: "error",
        background: "var(--color-base-100)",
        color: "var(--color-base-content)",
        confirmButtonColor: "var(--color-primary)",
      });
    }
  };

  return (
    <dialog ref={updatePasswordModalRef} className="modal">
      <div className="modal-box relative bg-base-100 shadow-2xl">
        {/* DaisyUI Native Close Button */}
        <form method="dialog">
          <button
            onClick={() => reset()}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        <h3 className="text-2xl font-bold text-base-content flex items-center gap-2 mb-6">
          <Lock className="w-6 h-6 text-primary" />
          Update Password
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-base-content">
                Current Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                placeholder="Enter current password"
                className={`input input-bordered w-full pr-10 bg-base-200 focus:input-primary ${
                  errors.currentPassword ? "input-error" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50 hover:text-base-content"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <span className="text-error text-sm mt-1">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-base-content">
                New Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter new password"
                className={`input input-bordered w-full pr-10 bg-base-200 focus:input-primary ${
                  errors.newPassword ? "input-error" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50 hover:text-base-content"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <span className="text-error text-sm mt-1">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-base-content">
                Confirm New Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                placeholder="Confirm new password"
                className={`input input-bordered w-full pr-10 bg-base-200 focus:input-primary ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50 hover:text-base-content"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-error text-sm mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Action Area */}
          <div className="modal-action mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Clicking outside the modal closes it */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => reset()}>close</button>
      </form>
    </dialog>
  );
};

export default UpdatePasswordModal;

import Swal from "sweetalert2";

export const successAlert = (title = "Your work has been saved") => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: title,
    showConfirmButton: true,
    confirmButtonText: "Ok",
    timer: 1500,
  });
};

export const errorAlert = (title = "Something went wrong") => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: title,
    showConfirmButton: true,
    confirmButtonText: "Ok",
    timer: 1500,
  });
};

import Swal from "sweetalert2";

export const successAlert = (title = "Login Successful") => {
  Swal.fire({
    icon: "success",
    title: title,
    showConfirmButton: true,
    confirmButtonText: "Ok",
    timer: 1500,
  });
};

export const errorAlert = (title = "Something went wrong") => {
  Swal.fire({
    icon: "error",
    title: title,
    showConfirmButton: true,
    confirmButtonText: "Ok",
    timer: 1500,
  });
};

export const confirmation = (title1, subtitle1, confirmBtn, fn) => {
  Swal.fire({
    title: title1,
    text: subtitle1,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmBtn,
  }).then((result) => {
    if (result.isConfirmed) {
      fn();
    }
  });
};

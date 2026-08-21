import { toast, Bounce } from "react-toastify";

const displayToastr = ({ isSuccess, message }) => {
  if (isSuccess) {
    toast.success(message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
      transition: Bounce,
    });
  } else {
    toast.error(message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
      transition: Bounce,
    });
  }
};

export default displayToastr;

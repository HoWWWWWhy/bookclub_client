import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

const ToastMessage = props => {
  const notify = () => {
    switch (props.type) {
      case "info":
        toast.error(props.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          onClose: props.onCloseFcn,
          className: css({
            background: "#636e72"
          })
        });
        break;
      case "success":
        toast.success(props.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          onClose: props.onCloseFcn,
          className: css({
            background: "#27ae60"
          })
        });
        break;
      case "error":
        toast.error(props.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          onClose: props.onCloseFcn,
          className: css({
            background: "#e74c3c"
          })
        });
        break;
      case "warn":
        toast.error(props.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          onClose: props.onCloseFcn,
          className: css({
            background: "#f9ca24"
          })
        });
        break;
      default:
        break;
    }
  };
  notify();

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ToastMessage;

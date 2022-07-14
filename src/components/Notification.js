import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Notification = (props) => {
  const { notify, setNotify } = props;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({ ...notify, isOpen: false });
  };
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

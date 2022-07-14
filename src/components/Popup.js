import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Close from "@mui/icons-material/Close";
import React from "react";
import Controls from "./controls/Controls";

const Popup = (props) => {
  const { children, openPopup, setOpenPopup, setRecordForEdit, recordForEdit } =
    props;
  const handleClose = () => {
    setOpenPopup(false);
    setRecordForEdit(null);
  };
  return (
    <Dialog open={openPopup}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">
            {recordForEdit === null ? "Add User" : "Update User"}
          </Typography>
          <Controls.ActionButton onClick={() => handleClose()}>
            <Close />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;

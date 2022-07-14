import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Controls from "./controls/Controls";

const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Controls.ActionButton
          variant="contained"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Controls.ActionButton>
        <Controls.ActionButton
          color="error"
          variant="contained"
          onClick={confirmDialog.onConfirm}
        >
          Yes
        </Controls.ActionButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

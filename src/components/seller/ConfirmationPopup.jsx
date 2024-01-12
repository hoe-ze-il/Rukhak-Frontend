import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmationPopup = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={onConfirm}
          autoFocus
          size="medium"
          variant="contained"
          color="primary"
          sx={{ width: "150px" }} // Adjust width as needed
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          size="medium"
          variant="outlined"
          color="primary"
          sx={{ width: "150px" }} // Adjust width as needed
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopup;

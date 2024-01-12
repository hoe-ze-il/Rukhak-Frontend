import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const EditOrderPopup = ({ open, onClose, onConfirm }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(selectedOption);
    setSelectedOption("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Edit Order Status</Typography>
      </DialogTitle>
      <DialogContent>
        <Select
          labelId="edit-order-label"
          id="edit-order-select"
          value={selectedOption}
          onChange={handleChange}
          sx={{ fontSize: 18 }}
          fullWidth
        >
          <MenuItem value="" disabled>
            Select an option
          </MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="shipped">Shipped</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          disabled={!selectedOption}
          sx={{ marginLeft: "8px" }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrderPopup;

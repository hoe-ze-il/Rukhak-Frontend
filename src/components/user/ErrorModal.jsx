import { useState } from "react";

import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorModal = ({ error, isError, errorTitle }) => {
  const [open, setOpen] = useState(isError);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          maxWidth: "400px",
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            borderRadius: "0.25rem",

            backgroundColor: "background.paper",
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "error.main",
            }}
          >
            <ErrorOutlineIcon />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "error.main" }}
            >
              {errorTitle}
            </Typography>
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{ color: "text.secondary", marginTop: "1rem" }}
          >
            {error.data.message}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorModal;

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
};

export default function DeleteModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button disabled onClick={handleOpen} color="error">
        Delete
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{ paddingBottom: "0.5rem" }}
              id="transition-modal-title"
              variant="h5"
              component="h2"
            >
              Delete product?
            </Typography>
            Are you sure you want to delete this product?
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
            <Box>
              <Button variant="contained" color="error" onClick={handleClose}>
                Delete
              </Button>
              <Button sx={{ marginLeft: "0.5rem" }} onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

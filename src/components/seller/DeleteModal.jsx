import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDeleteOwnProductMutation } from "@/features/seller/sellerProductSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
};

export default function DeleteModal({ title, text, productId }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteOwnProduct, { isLoading, isSuccess, isError }] =
    useDeleteOwnProductMutation();

  const handleDelete = async () => {
    await deleteOwnProduct(productId);
  };

  useEffect(() => {
    if (isSuccess) navigate(-1);
  }, [isSuccess, isError]);

  return (
    <>
      <Button onClick={handleOpen} color="error">
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
              {title || "<Modal Title>"}
            </Typography>
            {text || "<Modal Detail>"}
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
            <Box>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                disabled={isLoading}
              >
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

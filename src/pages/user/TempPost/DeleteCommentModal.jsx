import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const DeleteCommentModal = ({ isOpen, setIsOpen, handleDeleteComment }) => {
  return (
    <Modal
      open={isOpen}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onClose={() => setIsOpen(false)}
    >
      <Box>
        <Box
          sx={{
            borderRadius: "0.25rem",
            margin: "1rem",
            backgroundColor: "background.paper",
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Comment
            </Typography>
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{ color: "text.secondary", marginTop: "1rem" }}
          >
            Are you sure you want to delete this comment?
          </Typography>
          {/* Button */}
          <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Button fullWidth variant="text" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleDeleteComment}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteCommentModal;

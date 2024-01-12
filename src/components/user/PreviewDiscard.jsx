import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useUser from "@/hooks/user/useUser";
import ButtonGeneral from "./ButtonGeneral";
import { useLocation, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px",
};

export default function PreviewDiscard() {
  const { openPreviewDiscard, setOpenPreviewDiscard } = useUser();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";
  const handleClose = () => setOpenPreviewDiscard(false);
  const handleDiscard = () => {
    localStorage.removeItem("deliLatitude");
    localStorage.removeItem("deliLongitude");
    setOpenPreviewDiscard(false);
    navigate(from, { replace: true });
  };

  return (
    <div>
      <Modal
        open={openPreviewDiscard}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" textAlign="center" fontWeight="400">
            Are your sure, you want to discard change?
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignSelf: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ButtonGeneral
              text="discard"
              buttonBGColor="error.main"
              buttonHover="error.light"
              onClick={handleDiscard}
            />
            <ButtonGeneral
              text="cancel"
              buttonBGColor="gray"
              buttonHover="#666666"
              onClick={handleClose}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

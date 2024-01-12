import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import reviewImage from "@/assets/review.png";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import { useNavigate } from "react-router-dom";

function PendingSeller() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Box>
        <Box component="img" src={reviewImage} alt="review-image" />
      </Box>

      <Typography variant="body1">Thank you!</Typography>
      <Typography variant="body1" textAlign="center">
        Your request will be review by our Rukhak team. Please be patient, we
        will send you notification for the information.
      </Typography>
      <ButtonGeneral text="back to home" onClick={() => navigate("/")} />
    </Box>
  );
}

export default PendingSeller;

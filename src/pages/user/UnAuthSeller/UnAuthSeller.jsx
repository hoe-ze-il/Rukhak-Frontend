import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import storeImage from "@/assets/store.png";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import authTheme from "@/theme/authTheme";
import { useNavigate } from "react-router-dom";

const UnAuthSeller = () => {
  const navigate = useNavigate();
  return (
    <Box sx={authTheme.unauthSellerContainer}>
      <Box sx={authTheme.unauthSellerImgContainer}>
        <Box component="img" width="100%" src={storeImage} alt="Store Image" />
      </Box>

      <Typography variant="body1" sx={authTheme.unauthSellerText}>
        Ready to showcase your products in Rukhak? Join us now and start
        selling!
      </Typography>
      <ButtonGeneral
        text="Register Now!"
        onClick={() => navigate("/auth/signup-seller/form")}
      />
    </Box>
  );
};

export default UnAuthSeller;

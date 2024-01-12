import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

import authTheme from "@/theme/authTheme";

function BackToLogin() {
  const navigate = useNavigate();
  const handleClickBackToLogin = () => {
    localStorage.removeItem("email");
    navigate("/auth");
  };
  return (
    <Typography variant="body1" sx={authTheme.backToLoginText}>
      Click{" "}
      <Box
        component="span"
        sx={authTheme.backToLoginSpanText}
        onClick={handleClickBackToLogin}
      >
        here
      </Box>{" "}
      back to login
    </Typography>
  );
}

export default BackToLogin;

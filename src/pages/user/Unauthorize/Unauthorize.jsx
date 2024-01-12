import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useNavigate, useLocation } from "react-router-dom";
import authTheme from "@/theme/authTheme";
import ButtonGeneral from "@/components/user/ButtonGeneral";

function Unauthorize({
  status = 403,
  text = "Your account does not have permission to access this path.",
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoBack = () => {
    if (from === "/admin") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };
  return (
    <Box sx={authTheme.unauthorizeContainer}>
      <Typography variant="h1" textAlign="center">
        {status}
      </Typography>
      <Typography variant="body1" textAlign="center" marginBottom="16px">
        {text}
      </Typography>
      <ButtonGeneral text="Go Back" onClick={handleGoBack} />
    </Box>
  );
}

export default Unauthorize;

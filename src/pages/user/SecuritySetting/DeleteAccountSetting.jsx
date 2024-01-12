import settingTheme from "@/theme/settingTheme";
import { useNavigate, useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function DeleteAccountSetting() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={settingTheme.boxContainer}
      onClick={() =>
        navigate("/setting/reason-delete-account", {
          state: { from: location },
          replace: true,
        })
      }
    >
      <Typography variant="body1">Delete Account</Typography>
      <KeyboardArrowRightIcon />
    </Box>
  );
}

export default DeleteAccountSetting;

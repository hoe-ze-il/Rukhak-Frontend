import { useNavigate, useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import EditIcon from "@mui/icons-material/Edit";

import settingTheme from "@/theme/settingTheme";

function PasswordSetting() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Box
        sx={settingTheme.boxContainer}
        onClick={() =>
          navigate("/setting/edit-password", {
            state: { from: location },
            replace: true,
          })
        }
      >
        <Box>
          <Typography variant="body1">Password</Typography>
          <Typography variant="body1">* * * *</Typography>
        </Box>
        <EditIcon fontSize="medium" sx={{ color: "primary.main" }} />
      </Box>
    </>
  );
}

export default PasswordSetting;

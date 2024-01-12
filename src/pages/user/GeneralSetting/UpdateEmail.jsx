import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import settingTheme from "@/theme/settingTheme";
import useUser from "@/hooks/user/useUser";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import { useNavigate, useLocation } from "react-router-dom";

function UpdateEmail() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = user?.email;
  return (
    <Box sx={settingTheme.boxContainer}>
      <Box>
        <Typography variant="body1">Email</Typography>
        <Typography variant="body2">{userEmail}</Typography>
      </Box>
      <ButtonGeneral
        text="update"
        onClick={() =>
          navigate("/setting/update-email", {
            state: { from: location },
            replace: true,
          })
        }
      />
    </Box>
  );
}

export default UpdateEmail;

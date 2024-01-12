import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import authTheme from "@/theme/authTheme";

function AuthLayout() {
  return (
    <Box component="main" sx={authTheme.authContainer}>
      <Outlet />
    </Box>
  );
}

export default AuthLayout;

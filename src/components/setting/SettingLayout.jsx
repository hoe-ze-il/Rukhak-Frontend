import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

// Internal component
import SettingHeader from "./SettingHeader";

import settingTheme from "@/theme/settingTheme";
import useUser from "@/hooks/user/useUser";

function SettingLayout() {
  const { isUpdateInfoSuccess } = useUser();

  return (
    <>
      <SettingHeader />
      {isUpdateInfoSuccess && (
        <Alert severity="success">User information updated</Alert>
      )}
      <Box component="main" sx={settingTheme.settingContainer}>
        <Outlet />
      </Box>
    </>
  );
}

export default SettingLayout;

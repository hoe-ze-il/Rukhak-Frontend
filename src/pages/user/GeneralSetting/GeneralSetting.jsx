// MUI component
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

// Internal component
import UserDetails from "./UserDetails";
import UserAddress from "./UserAddress";

import settingTheme from "@/theme/settingTheme";
import useUser from "@/hooks/user/useUser";

function GeneralSetting() {
  const { isLoading, isError } = useUser();
  if (isLoading) {
    return <CircularProgress color="success" sx={settingTheme.loading} />;
  } else if (isError) {
    return (
      <Alert severity="error">Internal server error! Please try again.</Alert>
    );
  }
  return (
    <Box sx={{backgroundColor: "#f5f7f8"}}>
      <UserDetails />
      <UserAddress />
    </Box>
  );
}

export default GeneralSetting;

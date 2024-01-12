import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import LogoutIcon from "@mui/icons-material/Logout";
import { useLogoutOneDeviceMutation } from "@/features/user/userApiSlice";
import useUser from "@/hooks/user/useUser";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";
import Loading from "@/components/admin/product/Loading";

import settingTheme from "@/theme/settingTheme";
function LoginDetails({ session }) {
  const { handleUpdateStatus } = useUser();
  const curAccessToken = useSelector(selectCurrentToken);
  const [logoutOneDevice, { isLoading }] = useLogoutOneDeviceMutation();

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const hours = date.getHours() % 12 || 12;
    const minutes =
      date.getMinutes() < 10
        ? "0".concat(date.getMinutes())
        : date.getMinutes();
    const ampm = date.getHours() >= 12 ? "pm" : "am";

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;

    return formattedDate;
  };
  const loginDate = formatDate(session.loginAt);

  const handleLogoutOneDevice = async () => {
    try {
      const response = await logoutOneDevice({
        sessionId: session?._id,
      }).unwrap();
      if (response?.status === "success") {
        handleUpdateStatus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={settingTheme.boxContainer}>
      <Box>
        <Typography variant="body1" fontWeight="500">
          {session.deviceType}
        </Typography>
        <Typography variant="body2">Date & time: {loginDate}</Typography>
        <Typography variant="body2">
          Location: {session.deviceLocation.address}
        </Typography>
      </Box>
      {curAccessToken === session.accessToken ? (
        <Typography variant="body2" sx={settingTheme.currentDeviceText}>
          Current Device
        </Typography>
      ) : (
        <LogoutIcon
          sx={{ color: "error.main", cursor: "pointer" }}
          onClick={handleLogoutOneDevice}
        />
      )}
    </Box>
  );
}

export default LoginDetails;

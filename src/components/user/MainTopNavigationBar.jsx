import { useNavigate } from "react-router-dom";
import styled from "@mui/material/styles/styled";

// MUI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
// MUI icons
import NotificationsIcon from "@mui/icons-material/Notifications";

// Internal components
import SideBar from "./SideBar";
import SearchComponent from "../../pages/user/SearchProductsPage/SearchComponent";

import { useDispatch, useSelector } from "react-redux";
import {
  setNotifications,
  setNotificationCount,
} from "@/features/notification/notificationSlice";
import { useEffect } from "react";
import { useGetNotificationsQuery } from "@/features/notification/getNotificationSlice";
import { selectCurrentUserId } from "@/features/auth/authSlice";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "center",
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),

  "@media all": {
    minHeight: 24,
  },
}));

const MainTopNavigationBar = () => {
  const userId = useSelector((state) => selectCurrentUserId(state));
  const { data } = useGetNotificationsQuery({
    userId: userId,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setNotifications(data));

      const unopenedNotifications = data.filter(
        (notification) => !notification.opened
      );
      dispatch(setNotificationCount(unopenedNotifications.length));
    }
  }, [data, dispatch]);

  const notificationCount = useSelector(
    (state) => state.notifications.notificationCount
  );

  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <StyledToolbar sx={{ backgroundColor: "background.default" }}>
        <IconButton
          size="large"
          edge="start"
          aria-label="open drawer"
          sx={{ mr: 2, color: "text.primary" }}
        >
          <SideBar />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            alignSelf: "center",
            fontFamily: "lemon",
            color: "primary.dark",
          }}
        >
          RUKHAK
        </Typography>
        <IconButton
          size="large"
          aria-label="notifications"
          onClick={() => navigate("/notification")}
          sx={{ color: "text.primary" }}
        >
          <Badge badgeContent={notificationCount} color="error" size="small">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <SearchComponent />
      </StyledToolbar>
    </AppBar>
  );
};

export default MainTopNavigationBar;

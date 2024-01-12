import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { updateNotificationStatus } from "@/features/notification/notificationSlice";
import {
  formatDateForDisplay,
  getCurrentTime,
} from "@/utils/formatDateForDisplay";
import { usePatchNotificationMutation } from "@/features/notification/getNotificationSlice";

function Notification() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const [patchNotification] = usePatchNotificationMutation();
  console.log(notifications);
  const handleNotificationUpdate = async (notificationId) => {
    try {
      const result = await patchNotification({ notificationId });
      console.log("Notification updated:", result);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const handleNotificationItemClick = (notification, index) => {
    if (!notification.opened) {
      dispatch(updateNotificationStatus({ id: notification.id, opened: true }));
    }
    handleNotificationUpdate(notification._id);
    console.log("Notification clicked:", notification._id);

    navigation.navigate(`/seller/order/${notification.entityId}`);
  };

  const getFormattedDate = (createdAt) => {
    const currentTime = getCurrentTime();
    const createdTime = new Date(createdAt).getTime();
    const timeDiff = currentTime - createdTime;

    if (timeDiff >= 86400000) {
      return "Earlier";
    } else if (timeDiff >= 3600000) {
      return "Today";
    } else {
      return "New";
    }
  };

  const groupNotificationsByDate = () => {
    const groupedNotifications = {};

    notifications.forEach((notification) => {
      const formattedDate = getFormattedDate(notification.createdAt);

      if (groupedNotifications[formattedDate]) {
        groupedNotifications[formattedDate].push(notification);
      } else {
        groupedNotifications[formattedDate] = [notification];
      }
    });

    return groupedNotifications;
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {notifications.length === 0 ? (
        <Typography sx={{ p: 2, fontSize: 24 }}>
          You have no new notifications.
        </Typography>
      ) : (
        Object.entries(groupNotificationsByDate()).map(
          ([date, notifications]) => (
            <Box key={date}>
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  margin: "24px 16px 8px 16px",
                }}
              >
                {date}
              </Typography>
              {notifications.map((notification, index) => (
                <Box key={index}>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "16px 24px",
                      opacity: notification.opened ? "0.7" : "1",
                      color: "#565656",
                      backgroundColor: notification.opened
                        ? "inherit"
                        : "#d5e8cf",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleNotificationItemClick(notification, index)
                    }
                  >
                    <div>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {notification.notificationType}
                      </Typography>
                      <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={{
                          __html: notification.content,
                        }}
                      />
                    </div>
                    <Typography
                      variant="body2"
                      sx={{
                        marginTop: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {formatDateForDisplay(notification.createdAt)}
                    </Typography>
                  </Typography>
                </Box>
              ))}
            </Box>
          )
        )
      )}
    </Box>
  );
}

export default Notification;


// notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    notificationCount: 0,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    updateNotificationStatus: (state, action) => {
      const { id, opened } = action.payload;
      const notificationToUpdate = state.notifications.find((n) => n.id === id);
      if (notificationToUpdate) {
        notificationToUpdate.opened = opened;
      }
    },
  },
});

export const {
  setNotifications,
  setNotificationCount,
  updateNotificationStatus,
} = notificationSlice.actions;

export default notificationSlice.reducer;

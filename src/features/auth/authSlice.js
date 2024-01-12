import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { accessToken: null, userId: null, role: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.accessToken = user.accessToken;
      state.userId = user.id;
      state.role = user.role;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.userId = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentUserRole = (state) => state.auth.role;

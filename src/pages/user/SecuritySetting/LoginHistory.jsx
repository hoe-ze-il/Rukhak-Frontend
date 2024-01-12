import SettingLineBreak from "@/components/setting/SettingLineBreak";
import LoginDetails from "./LoginDetails";
import useUser from "@/hooks/user/useUser";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";

import Box from "@mui/material/Box";

function LoginHistory() {
  const { user } = useUser();
  const sessions = user?.sessions;
  const curAccessToken = useSelector(selectCurrentToken);

  // Create a copy array
  const sortedSessions = sessions
    ? [...sessions].sort((sessionA, sessionB) => {
        if (sessionA.accessToken === curAccessToken) return -1;
        if (sessionB.accessToken === curAccessToken) return 1;
        return sessionA.accessToken.localeCompare(sessionB.accessToken);
      })
    : null;

  return (
    <Box sx={{ marginTop: "28px" }}>
      <SettingLineBreak section="Login History" />
      {sortedSessions?.map((session) => (
        <React.Fragment key={session._id}>
          <LoginDetails session={session} />
          <SettingLineBreak />
        </React.Fragment>
      ))}
    </Box>
  );
}

export default LoginHistory;

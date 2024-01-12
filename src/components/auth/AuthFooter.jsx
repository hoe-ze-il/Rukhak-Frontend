import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import authTheme from "@/theme/authTheme";

function AuthFooter({ type }) {
  const navigate = useNavigate();
  return (
    <>
      {type === "signup" ? (
        <Typography variant="body1" sx={authTheme.authFooterText}>
          Already have a Rukhak account?&nbsp;
          <Box
            component="span"
            onClick={() => navigate("/auth")}
            sx={authTheme.authFooterTextSignupLogin}
          >
            Login
          </Box>
        </Typography>
      ) : (
        <Typography sx={authTheme.authFooterText}>
          New to Rukhak?&nbsp;
          <Box
            component="span"
            onClick={() => navigate("/auth/signup")}
            sx={authTheme.authFooterTextSignupLogin}
          >
            Sign up
          </Box>
        </Typography>
      )}
    </>
  );
}

export default AuthFooter;

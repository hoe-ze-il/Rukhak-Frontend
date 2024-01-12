import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";

import authTheme from "@/theme/authTheme";

function AuthError({ errorMessage }) {
  return (
    <Box sx={authTheme.authError} borderRadius>
      <ErrorIcon
        sx={{
          color: "white",
        }}
      />
      <Typography variant="body2" color="#fff">
        {errorMessage}
      </Typography>
    </Box>
  );
}

export default AuthError;

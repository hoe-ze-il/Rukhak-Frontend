import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function OTPContent({
  title = "2-Step Verification",
  description = "Enter 6 digits OTP code that we have sent to your email address.",
}) {
  return (
    <Box>
      <Typography variant="h5" textAlign="center" marginBottom="16px">
        {title}
      </Typography>
      <Typography variant="body1" textAlign="center">
        {description}
      </Typography>
    </Box>
  );
}

export default OTPContent;

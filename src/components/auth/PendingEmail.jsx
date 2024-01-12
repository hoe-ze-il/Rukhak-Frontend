import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import AuthError from "./AuthError";
import BackToLogin from "./BackToLogin";

import authTheme from "@/theme/authTheme";

function PendingEmail({ title, text, onClick, isLoading, resendErr }) {
  const email = JSON.parse(localStorage.getItem("email"));
  return (
    <>
      {resendErr && <AuthError errorMessage={resendErr} />}
      <Box sx={authTheme.pendingEmailContainer}>
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M10 23.3333C10 21.5652 10.7024 19.8695 11.9526 18.6193C13.2029 17.369 14.8986 16.6667 16.6667 16.6667H63.3333C65.1014 16.6667 66.7971 17.369 68.0474 18.6193C69.2976 19.8695 70 21.5652 70 23.3333M10 23.3333V56.6667C10 58.4348 10.7024 60.1305 11.9526 61.3807C13.2029 62.6309 14.8986 63.3333 16.6667 63.3333H63.3333C65.1014 63.3333 66.7971 62.6309 68.0474 61.3807C69.2976 60.1305 70 58.4348 70 56.6667V23.3333M10 23.3333L40 43.3333L70 23.3333"
            stroke="#354052"
          />
        </svg>
        <Box sx={authTheme.pendingEmailBody}>
          <Typography
            variant="body2"
            sx={authTheme.pendingEmailTextBody}
            color={"text.primary"}
          >
            Please check your email{" "}
            <Box component="span" sx={{ fontWeight: "600" }}>
              {email}
            </Box>
            . We&apos;ve send an email to {text}. This email may expires within
            10 minutes.
          </Typography>
          <Box
            component="span"
            sx={authTheme.resendEmailText}
            color={isLoading ? "#DFD5D5" : "#3F7CAC"}
            onClick={onClick}
          >
            Resend Email
          </Box>
        </Box>
      </Box>
      {JSON.parse(localStorage.getItem("email")) && <BackToLogin />}
    </>
  );
}

export default PendingEmail;

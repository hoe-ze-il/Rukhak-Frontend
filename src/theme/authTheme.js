import createTheme from "@mui/material/styles/createTheme";

const authTheme = createTheme({
  authContainer: {
    padding: "16px",
    position: "relative",
    maxWidth: "500px",
    margin: "0 auto",
    height: "100vh",
  },
  authHeaderTitle: {
    fontWeight: "500",
    marginBottom: "0.25rem",
    color: "text.primary",
  },
  authHeaderText: {
    color: "#5D5F5A",
    fontWeight: "300",
  },
  authFooterText: {
    display: "flex",
    justifyContent: "center",
    mt: "32px",
    color: "text.primary",
  },
  authFooterTextSignupLogin: {
    color: "#3F7CAC",
    textDecoration: "underline",
    cursor: "pointer",
  },
  oauthButton: {
    borderRadius: "20px",
    height: "44px",
    "&:hover": {
      border: "1px solid #256C2C",
    },
    color: "#454743",
    border: "1px solid #767873",
  },
  facebookIcon: {
    color: "#1F74FD",
    mr: 1,
  },
  emailIcon: {
    color: "#354052",
    mr: 1,
  },
  authError: {
    border: "1px solid",
    borderColor: "error.main",
    backgroundColor: "error.main",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  signupForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "24px",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  forgotPasswordText: {
    mt: 1,
    color: "#3F7CAC",
    cursor: "pointer",
    float: "right",
  },
  nameInputContainer: {
    display: "flex",
    gap: "1rem",
  },
  passwordInputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    gap: "0.5rem",
  },
  pendingEmailContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "24px",
  },
  pendingEmailBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pendingEmailTextBody: {
    textAlign: "center",
    maxWidth: "500px",
  },
  resendEmailText: {
    marginTop: "24px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  backToLoginText: {
    textAlign: "center",
    position: "absolute",
    left: "50%",
    bottom: "5%",
    transform: "translateX(-50%)",
  },
  backToLoginSpanText: {
    color: "#3F7CAC",
    textDecoration: "underline",
    cursor: "pointer",
  },
  forgotPWDLayout: {
    display: "flex",
    flexDirection: "column",
    margin: "100px auto",
  },
  forgotPWDTitle: {
    marginBottom: "30px",
    textAlign: "center",
  },
  forgotPWDbodyText: {
    textAlign: "center",
    marginBottom: "16px",
  },

  emailTextFiel: {
    width: "100%",
  },
  formForgotPWD: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  resetPWDText: {
    margin: "16px 0",
  },
  formResetPWD: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  unauthorizeContainer: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    position: "absolute",
    left: "50%",
    transform: "translateY(50%) translateX(-50%)",
  },
  unauthSellerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    width: "200px",
    margin: "100px auto",
    height: "100vh",
  },
  unauthSellerImgContainer: {
    width: "200px",
  },
  unauthSellerText: {
    textAlign: "center",
    width: "350px",
  },
  signupSellerForm: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    height: "95vh",
  },
  DateAndGenderContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  dateAndGenderContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
});

export default authTheme;

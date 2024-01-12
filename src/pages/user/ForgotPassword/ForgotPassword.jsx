// Internal Component
import ArrowBack from "@/components/user/ArrowBack";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import EmailInput from "@/components/input/EmailInput";

// MUI Component
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import authTheme from "@/theme/authTheme";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/features/auth/authApiSlice";
import useAuth from "@/hooks/auth/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import AuthError from "@/components/auth/AuthError";

function ForgotPassword() {
  const { email, setEmail, isEmail } = useAuth();
  const [err, setErr] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const canSubmit = email && isEmail && true;

  const handleClick = async () => {
    if (canSubmit) {
      try {
        const response = await forgotPassword({ email }).unwrap();

        if (response?.status === "success") {
          localStorage.setItem("email", JSON.stringify(email));
          localStorage.removeItem("persist");
          navigate("/auth/pending/reset-password", {
            state: { from: location },
            replace: true,
          });
        }
      } catch (err) {
        if (err?.data.status === "fail") {
          localStorage.setItem("email", JSON.stringify(email));
          // Prevent from knowing this email is exist.
          navigate("/auth/pending/reset-password", {
            state: { from: location },
            replace: true,
          });
        } else {
          setErr("Internal server error, Please try again later.");
        }
      }
    }
  };
  return (
    <>
      <ArrowBack />
      {err && <AuthError errorMessage={err} />}
      <Box sx={authTheme.forgotPWDLayout}>
        <Box sx={authTheme.forgotPWDTitle}>
          <Typography variant="h4">Forgot Password</Typography>
        </Box>
        <Typography variant="body1" sx={authTheme.forgotPWDbodyText}>
          Please Enter Your Email Address To Receive an Email for Reset
          Password.
        </Typography>
        <Box component="form" sx={authTheme.formForgotPWD}>
          <EmailInput />
          <ButtonGeneral
            text="Send"
            onClick={handleClick}
            isLoading={isLoading}
            canClick={canSubmit}
          />
        </Box>
      </Box>
    </>
  );
}

export default ForgotPassword;

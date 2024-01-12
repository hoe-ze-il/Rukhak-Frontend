// MUI component
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Internal component
import ButtonGeneral from "@/components/user/ButtonGeneral";
import PasswordValidation from "../../../components/auth/PasswordValidation";
import Logo from "@/components/user/Logo";
import BackToLogin from "@/components/auth/BackToLogin";
import PasswordInput from "@/components/input/PasswordInput";

import { useResetPasswordMutation } from "@/features/auth/authApiSlice";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthError from "@/components/auth/AuthError";
import useAuth from "@/hooks/auth/useAuth";

import authTheme from "@/theme/authTheme";
import useUser from "@/hooks/user/useUser";

function ResetPassword() {
  const { handleUpdateStatus } = useUser();
  const { resetToken } = useParams();
  const { password, isPassword, setPassword } = useAuth();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const canReset = isPassword && password && true;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (canReset) {
      try {
        const response = await resetPassword({
          resetToken,
          newPassword: password,
        }).unwrap();

        if (response?.status === "success") {
          setPassword("");
          if (JSON.parse(localStorage.getItem("email"))) {
            localStorage.removeItem("email");
            navigate("/auth");
          } else {
            handleUpdateStatus();
            navigate("/setting/security");
          }
        }
      } catch (err) {
        if (err?.data.status === "fail") {
          if (err?.data.message.startsWith("Token")) {
            setError(err?.data.message.replace("Token", "Link"));
          } else {
            setError(err?.data.message);
          }
        } else {
          setError("Internal server error! Please try again later.");
        }
      }
    }
  };

  return (
    <>
      <Logo />
      <Typography variant="h5" sx={authTheme.resetPWDText}>
        Reset Password
      </Typography>
      {error && <AuthError errorMessage={error} />}
      <Box component="form" sx={authTheme.formResetPWD}>
        <PasswordInput errAPI={error} />
        <PasswordValidation />
        <ButtonGeneral
          isLoading={isLoading}
          text="Reset"
          canClick={canReset}
          onClick={handleResetPassword}
        />
      </Box>
      <BackToLogin />
    </>
  );
}

export default ResetPassword;

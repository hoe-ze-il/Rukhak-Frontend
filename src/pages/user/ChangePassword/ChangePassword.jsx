import AuthHeader from "@/components/auth/AuthHeader";
import PasswordValidation from "@/components/auth/PasswordValidation";
import CurrentPasswordInput from "@/components/input/CurrentPasswordInput";
import PasswordConfirmInput from "@/components/input/PasswordConfirmInput";
import PasswordInput from "@/components/input/PasswordInput";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import useAuth from "@/hooks/auth/useAuth";
import useUser from "@/hooks/user/useUser";
import { useUpdatePasswordMutation } from "@/features/user/userApiSlice";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import AuthError from "@/components/auth/AuthError";
import authTheme from "@/theme/authTheme";
import { useForgotPasswordMutation } from "@/features/auth/authApiSlice";
import Loading from "@/components/admin/product/Loading";

function ChangePassword() {
  const { curPassword, password, passwordConfirm, isPassword, isMatch } =
    useAuth();
  const { user, handleUpdateStatus } = useUser();
  const email = user?.email;
  const [errInput, setErrInput] = useState();
  const [errMessage, setErrMessage] = useState();
  const canChange =
    curPassword && password && isPassword && passwordConfirm && isMatch && true;
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [forgotPassword, { isLoading: isLoadingForgotPassword }] =
    useForgotPasswordMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from.pathname || "/";

  const handleSaveChangePassword = async (e) => {
    e.preventDefault();
    if (canChange) {
      try {
        const response = await updatePassword({
          currentPassword: curPassword,
          newPassword: password,
        }).unwrap();
        if (response?.status === "success") {
          handleUpdateStatus();
          navigate(from, { replace: true });
        }
      } catch (err) {
        if (err?.status === 401) {
          setErrInput(err?.data?.message);
        } else {
          setErrMessage("Fail to change password! Please try again.");
        }
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await forgotPassword({ email }).unwrap();
      console.log(response);
      if (response?.status === "success") {
        navigate("/auth/pending/reset-password", {
          state: { from: location },
          replace: true,
        });
      }
    } catch (err) {
      setErrMessage("Internal server error! Please try again later.");
    }
  };

  if (isLoadingForgotPassword) {
    return <Loading />;
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "24px",
        padding: "0 16px 16px 16px",
      }}
    >
      <AuthHeader title="Change Password" logo={false} />
      {errMessage && <AuthError errorMessage={errMessage} />}
      <Box>
        <CurrentPasswordInput errApi={errInput} />
        <Typography
          variant="body1"
          sx={authTheme.forgotPasswordText}
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </Typography>
      </Box>

      <PasswordInput isNewPassword={true} />
      <PasswordValidation />
      <PasswordConfirmInput />
      <ButtonGeneral
        text="Save"
        onClick={handleSaveChangePassword}
        canClick={canChange}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default ChangePassword;

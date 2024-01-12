import { useNavigate, useLocation } from "react-router-dom";
import useUser from "@/hooks/user/useUser";
import { useState } from "react";
import { useToggleTwoFactorsByOTPMutation } from "@/features/user/userApiSlice";

import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

import Box from "@mui/material/Box";
import Loading from "@/components/admin/product/Loading";

import settingTheme from "@/theme/settingTheme";
import AuthError from "@/components/auth/AuthError";

function TwoFactorAuthSetting() {
  const { user } = useUser();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [toggleTwoFactorsByOTP, { isLoading }] =
    useToggleTwoFactorsByOTPMutation();

  const curLocation = { state: { from: location }, replace: true };
  let action;
  const handleChange = async () => {
    if (!user?.enable2FA) {
      action = "enable";
      if (user?.signupMethod === "email") {
        navigate(
          `/setting/${action}/two-step-verification/password`,
          curLocation
        );
      } else {
        try {
          const response = await toggleTwoFactorsByOTP({ action }).unwrap();
          if (response?.status === "success") {
            navigate(
              `/setting/${action}/two-step-verification/OTP`,
              curLocation
            );
          }
        } catch (err) {
          if (err?.data.message) {
            setErrMsg(err?.data.message);
          } else {
            setErrMsg("Internal server error! Please try again later");
          }
        }
      }
    } else {
      action = "disable";
      if (user?.signupMethod === "email") {
        navigate(
          `/setting/${action}/two-step-verification/password`,
          curLocation
        );
      } else {
        try {
          const response = await toggleTwoFactorsByOTP({ action }).unwrap();
          if (response?.status === "success") {
            navigate(
              `/setting/${action}/two-step-verification/OTP`,
              curLocation
            );
          }
        } catch (err) {
          if (err?.data.message) {
            setErrMsg(err?.data.message);
          } else {
            setErrMsg("Internal server error! Please try again later");
          }
        }
        navigate(`/setting/${action}/two-step-verification/OTP`, curLocation);
      }
    }
  };

  return (
    <>
      <Box sx={settingTheme.boxContainer}>
        {errMsg && <AuthError errorMessage={errMsg} />}
        <Box sx={{ display: "flex", flexDirection: "column", width: "230px" }}>
          <Typography variant="body1">2-Step-Verification</Typography>
          <Typography variant="body2">
            For security purpose, we recommend to turn on this feature.
          </Typography>
        </Box>

        <Switch
          checked={user?.enable2FA || false}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
      {isLoading && <Loading />}
    </>
  );
}

export default TwoFactorAuthSetting;

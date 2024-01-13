import OTPContent from "@/components/auth/OTPContent";
import OTPInput from "@/components/auth/OTPInput";
import useUser from "@/hooks/user/useUser";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import useAuth from "@/hooks/auth/useAuth";
import {
  useStartEDTwoFactorsByOTPMutation,
  useUpdateEmailMutation,
} from "@/features/user/userApiSlice";
import {
  useResendOTPMutation,
  useVerifyTwoFactorsMutation,
} from "@/features/auth/authApiSlice";
import settingTheme from "@/theme/settingTheme";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import AuthError from "@/components/auth/AuthError";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

function ConfirmOTP({ isUpdateEmail, isTwoFactors, isEDTwoFactors }) {
  const { otp, setOtp, firstInputRef, setErrorRefresh } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessResent, setIsSuccessResent] = useState(false);
  const { action } = useParams();
  const [updateEmail, { isLoading }] = useUpdateEmailMutation();
  const [verifyTwoFactors, { isLoading: isLoadingVerify }] =
    useVerifyTwoFactorsMutation();
  const [resendOTP, { isLoading: isResendLoading }] = useResendOTPMutation();
  const [startEDTwoFactorsByOTP, { isLoading: isLoadingEDTwoFactors }] =
    useStartEDTwoFactorsByOTPMutation();
  const { user, handleUpdateStatus } = useUser();
  const loginMethod = JSON.parse(localStorage.getItem("loginMethod"));
  const email =
    user?.tempEmail ||
    JSON.parse(localStorage?.getItem("email")) ||
    user?.email;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location?.state?.from.pathname || "/";
  const canVerify = otp.length === 6 && otp.every((el) => el !== "");

  const handleClearValue = () => {
    setOtp([...otp.map(() => "")]);
    firstInputRef.current.focus();
  };

  const handleVerifyUpdateEmail = async () => {
    if (canVerify) {
      try {
        const response = await updateEmail({ OTP: otp.join("") }).unwrap();
        if (response?.status === "success") {
          handleUpdateStatus();
          navigate("/setting");
        }
      } catch (err) {
        if (err?.status === 500) {
          setErrorMessage("OTP is incorrect! Please try again.");
          handleClearValue();
        } else if (err?.status === 400) {
          setErrorMessage("OTP is expired! Please try resend the OTP.");
        } else {
          setErrorMessage("Something went wrong! Please try again later.");
        }
      }
    }
  };

  const handleVeriyTwoFactors = async () => {
    if (canVerify) {
      try {
        const response = await verifyTwoFactors({
          OTP: otp.join(""),
          loginMethod,
          email,
        }).unwrap();
        if (response?.status === "success") {
          const user = response?.data?.user;
          dispatch(setCredentials({ user }));
          const persist = true;
          localStorage.setItem("persist", persist);
          localStorage.removeItem("email");
          localStorage.removeItem("loginMethod");
          setErrorRefresh(false);
          navigate(from, { replace: true });
        }
      } catch (err) {
        if (err?.data.message) {
          setErrorMessage(err?.data.message);
          handleClearValue();
        } else {
          setErrorMessage("Internal server error! Please try again later");
        }
      }
    }
  };

  const handleToggleTwoFactors = async () => {
    if (canVerify) {
      try {
        const response = await startEDTwoFactorsByOTP({
          action,
          email,
          OTP: otp.join(""),
          loginMethod,
        }).unwrap();
        if (response?.status === "success") {
          handleUpdateStatus();
          navigate(from, { replace: true });
        }
      } catch (err) {
        if (err?.data.message) {
          setErrorMessage(err?.data.message);
          handleClearValue();
        } else {
          setErrorMessage("Internal server error! Please try again later");
        }
      }
    }
  };

  const handleResentOTP = async () => {
    const data = isUpdateEmail
      ? { email: user?.email, newEmail: user?.tempEmail }
      : { email };
    if (email) {
      try {
        const response = await resendOTP({ ...data }).unwrap();
        if (response?.status === "success") {
          setIsSuccessResent(true);
        }
      } catch (err) {
        if (err?.data.message) {
          setErrorMessage(err?.data.message);
        } else {
          setErrorMessage("Internal server error! Please try again later");
        }
      }
    }
  };

  return (
    <>
      <Box sx={settingTheme.OTPPageContainer}>
        {isSuccessResent && (
          <Alert severity="success">OTP successfully resent to {email}</Alert>
        )}
        {errorMessage && <AuthError errorMessage={errorMessage} />}
        {isUpdateEmail && (
          <OTPContent
            title="Verify Email Address"
            description={`Please enter 6 digits code that we have sent to ${
              email || "loading..."
            }`}
          />
        )}
        {isTwoFactors && (
          <OTPContent
            title="2-Step-Verification"
            description={`Please enter 6 digits code that we have sent to ${
              email || "loading..."
            }`}
          />
        )}
        {isEDTwoFactors && (
          <OTPContent
            title={`${action[0]
              .toUpperCase()
              .concat(action.slice(1))} 2-Step-Verification`}
            description={`Please enter 6 digits code that we have sent to ${
              email || "loading..."
            }`}
          />
        )}
        <OTPInput />
        <Box sx={settingTheme.OTPButtonContainer}>
          <ButtonGeneral
            text="clear"
            buttonBGColor="gray"
            buttonHover="#666666"
            fullWidth="100%"
            onClick={handleClearValue}
          />
          <ButtonGeneral
            text="verify"
            fullWidth="100%"
            onClick={
              isUpdateEmail
                ? handleVerifyUpdateEmail
                : isTwoFactors
                ? handleVeriyTwoFactors
                : isEDTwoFactors
                ? handleToggleTwoFactors
                : null
            }
            canClick={canVerify}
            isLoading={isLoading || isLoadingVerify || isLoadingEDTwoFactors}
          />
        </Box>

        <Button
          onClick={handleResentOTP}
          variant="body1"
          disabled={isResendLoading}
          sx={{ cursor: "pointer", color: "#3F7CAC" }}
        >
          Resent Email
        </Button>
      </Box>
    </>
  );
}

export default ConfirmOTP;

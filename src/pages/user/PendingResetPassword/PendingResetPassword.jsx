import AuthError from "@/components/auth/AuthError";
import PendingEmail from "@/components/auth/PendingEmail";
import { useResendEmailResetPWDMutation } from "@/features/auth/authApiSlice";
import ArrowBack from "@/components/user/ArrowBack";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import useUser from "@/hooks/user/useUser";

function PendingResetPassword() {
  const { user } = useUser();
  const [resendErr, setResendErr] = useState("");
  const [successResend, setSuccessResend] = useState(false);
  const [resendEmailResetPWD, { isLoading }] = useResendEmailResetPWDMutation();
  const email = JSON.parse(localStorage.getItem("email")) || user?.email;
  const handleResendEmail = async () => {
    if (email) {
      try {
        const response = await resendEmailResetPWD({ email }).unwrap();
        if (response?.status === "success") {
          setSuccessResend(true);
        }
      } catch (err) {
        if (err?.data.status === "fail") {
          setResendErr("Please provide your email address again.");
        }
      }
    } else {
      setResendErr("Email is undefined! Please provide email again.");
    }
  };
  return (
    <>
      <ArrowBack />
      {successResend && (
        <Alert severity="success">Email successfully resent to {email}.</Alert>
      )}
      {resendErr && <AuthError errorMessage={resendErr} />}
      <PendingEmail
        title="Reset Password"
        text="reset your password"
        onClick={handleResendEmail}
        isLoading={isLoading}
      />
    </>
  );
}

export default PendingResetPassword;

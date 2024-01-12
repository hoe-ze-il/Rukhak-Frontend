import { useResendEmailActivateMutation } from "@/features/auth/authApiSlice";
import { useState } from "react";

import PendingEmail from "@/components/auth/PendingEmail";
import ArrowBack from "@/components/user/ArrowBack";

function PendingActivate() {
  const [resendErr, setResentErr] = useState("");

  const [resendEmailActivate, { isLoading }] = useResendEmailActivateMutation();
  const emailSignup = localStorage.getItem("email");
  const hanldeResendEmail = async () => {
    const email = await JSON.parse(emailSignup);
    if (email) {
      try {
        await resendEmailActivate({ email }).unwrap();
      } catch (err) {
        if (err?.status === 400 || err?.status === 404) {
          setResentErr(err?.data.message);
        } else {
          setResentErr("Internal server error! Please try again later.");
        }
      }
    } else {
      setResentErr("Email is missing!");
    }
  };

  return (
    <>
      <ArrowBack />
      <PendingEmail
        onClick={hanldeResendEmail}
        isLoading={isLoading}
        resendErr={resendErr}
        title="Activate Account"
        text="activate your account"
      />
    </>
  );
}

export default PendingActivate;

import useAuth from "@/hooks/auth/useAuth";
import useUser from "@/hooks/user/useUser";
import { useConfirmUpdateEmailMutation } from "@/features/user/userApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

// MUI component
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Internal component
import EmailInput from "@/components/input/EmailInput";
import ButtonGeneral from "@/components/user/ButtonGeneral";

import settingTheme from "@/theme/settingTheme";

function NewEmail() {
  const { email, isEmail, setEmail } = useAuth();
  const { user } = useUser();
  const [errApi, setErrApi] = useState("");
  const [updateEmail, { isLoading }] = useConfirmUpdateEmailMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = user?.email;
  const canSend = email && isEmail && true;

  const handleClick = async () => {
    if (canSend) {
      try {
        const response = await updateEmail({
          currentEmail: userEmail,
          email,
        }).unwrap();
        if (response?.status === "success") {
          setEmail("");
          navigate("/setting/confirm-OTP/update-email", {
            state: { from: location },
            replace: true,
          });
        }
      } catch (err) {
        setErrApi(err?.data?.errors[0]);
      }
    }
  };
  return (
    <>
      <Box margin="50px auto" sx={{ padding: "16px" }}>
        <Box sx={settingTheme.newEmailContainer}>
          <Typography variant="h5">Update email address</Typography>
          <Typography variant="body1" textAlign="center">
            Please enter your new email address, we will send you an email to
            confirm.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <EmailInput newEmail={true} errAPI={errApi} />
          <ButtonGeneral
            text="send"
            canClick={canSend}
            onClick={handleClick}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </>
  );
}

export default NewEmail;

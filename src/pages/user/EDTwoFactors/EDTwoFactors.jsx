import Box from "@mui/material/Box";

import AuthHeader from "@/components/auth/AuthHeader";
import { useParams } from "react-router-dom";
import PasswordInput from "@/components/input/PasswordInput";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import useAuth from "@/hooks/auth/useAuth";
import { useToggleTwoFactorsByPwdMutation } from "@/features/user/userApiSlice";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthError from "@/components/auth/AuthError";
import useUser from "@/hooks/user/useUser";

function EDTwoFactors() {
  const [errorMessage, setErrorMessage] = useState();
  const { handleUpdateStatus } = useUser();
  const { action } = useParams();
  const { password } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from.pathname || "/setting";

  const [toggleTwoFactorsByPwd, { isLoading }] =
    useToggleTwoFactorsByPwdMutation();

  const handleToggleTwoFactors = async (e) => {
    e.preventDefault();
    if (password) {
      try {
        const response = await toggleTwoFactorsByPwd({
          action,
          password,
        }).unwrap();
        if (response?.status === "success") {
          handleUpdateStatus();
          navigate(from, { replace: true });
        }
      } catch (err) {
        if (err?.data.message) {
          setErrorMessage(err?.data.message);
        } else {
          setErrorMessage("Internal server error! Please try agian later");
        }
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleToggleTwoFactors}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "0 16px 16px 16px",
          marginTop: "100px",
        }}
      >
        <AuthHeader
          title={`${action[0]
            .toUpperCase()
            .concat(action.slice(1))} 2 Step Verification`}
          logo={false}
          description={`Please enter your password to ${action}`}
        />
        {errorMessage && <AuthError errorMessage={errorMessage} />}
        <PasswordInput isLogin={true} />
        <ButtonGeneral text="save" canClick={password} isLoading={isLoading} />
      </Box>
    </>
  );
}

export default EDTwoFactors;

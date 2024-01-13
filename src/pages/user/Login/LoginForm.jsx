// Component MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Internal Component
import ButtonGeneral from "@/components/user/ButtonGeneral";
import AuthError from "@/components/auth/AuthError";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";

import { useState } from "react";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth";

// SCSS
import authTheme from "@/theme/authTheme";

function LoginForm() {
  const { errGoogle, email, password, setErrorRefresh } = useAuth();
  const [errApi, setErrApi] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  const canLogin = email && password ? true : false;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (canLogin) {
        const response = await login({ email, password }).unwrap();
        if (
          response?.status === "success" &&
          response?.data?.user.accessToken
        ) {
          const user = response?.data?.user;
          dispatch(setCredentials({ user }));
          const persist = true;
          localStorage.setItem("persist", persist);
          setErrorRefresh(false);
        } else if (
          response?.status === "success" &&
          response?.data.user.loginMethod
        ) {
          localStorage.setItem(
            "loginMethod",
            JSON.stringify(response.data.user.loginMethod)
          );
          localStorage.setItem(
            "email",
            JSON.stringify(response.data.user.email)
          );
          navigate("/auth/two-step-verification");
        }
      }
    } catch (err) {
      console.log(err);
      const errorStatus = err?.status;
      if (errorStatus === 400) {
        setErrApi("Email or Password is incorrect. Please try again.");
      } else if (errorStatus === 401) {
        setErrApi("Please avtivate your account first.");
      } else {
        setErrApi("Internal server error. Please try again later.");
      }
    }
  };
  return (
    <section>
      <Box marginBottom={"24px"}>
        {errGoogle && <AuthError errorMessage={errGoogle} />}
        {errApi && <AuthError errorMessage={errApi} />}
      </Box>

      <Box component="form" onSubmit={handleLogin} sx={authTheme.loginForm}>
        <EmailInput isLogin={true} />
        <Box>
          <PasswordInput isLogin={true} />
          <Typography
            variant="body1"
            onClick={() =>
              navigate("/auth/forgot-password", {
                state: { from: location },
                replace: true,
              })
            }
            sx={authTheme.forgotPasswordText}
          >
            Forgot password?
          </Typography>
        </Box>
        <ButtonGeneral canClick={canLogin} text="Login" isLoading={isLoading} />
      </Box>
    </section>
  );
}

export default LoginForm;

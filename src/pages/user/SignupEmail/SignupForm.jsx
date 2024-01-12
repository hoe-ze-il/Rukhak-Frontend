// MUI Components
import Box from "@mui/material/Box";

// Internal Component
import PasswordValidation from "../../../components/auth/PasswordValidation";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import AuthError from "@/components/auth/AuthError";
import EmailInput from "@/components/input/EmailInput";
import FirstNameInput from "@/components/input/FirstNameInput";
import LastNameInput from "@/components/input/LastNameInput";
import PasswordInput from "@/components/input/PasswordInput";
import PasswordConfirmInput from "@/components/input/PasswordConfirmInput";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/features/auth/authApiSlice";

// Custom Hooks
import useAuth from "@/hooks/auth/useAuth";

// Style
import authTheme from "@/theme/authTheme";

function SignupForm() {
  const {
    email,
    setEmail,
    isEmail,
    firstName,
    setFirstName,
    isFirstName,
    lastName,
    isLastName,
    setLastName,
    password,
    isPassword,
    setPassword,
    setPasswordConfirm,
    isMatch,
  } = useAuth();

  const [errSignup, setErrSignup] = useState({ msg: "", path: "" });
  const [signup, { isLoading }] = useSignupMutation();

  const navigate = useNavigate();

  const canSubmit = [
    isEmail && isFirstName && isLastName && isPassword && isMatch,
  ].every(Boolean)
    ? true
    : false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrSignup({ path: "", msg: "" });
    try {
      if (canSubmit) {
        const result = await signup({
          email,
          firstName,
          lastName,
          password,
        }).unwrap();

        if (result?.status === "success") {
          localStorage.setItem("email", JSON.stringify(email));
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setPasswordConfirm("");
          navigate("/auth/pending/activate");
        }
      }
    } catch (err) {
      if (err?.data?.errors[0]) {
        const errData = err?.data?.errors[0];
        setErrSignup({ path: errData.path, msg: errData.msg });
      } else {
        setErrSignup({
          path: "",
          msg: "Sorry! There is a problem with sign up. Please try again later.",
        });
      }
    }
  };
  return (
    <section>
      {errSignup.msg.startsWith("Email recently signed up") && (
        <AuthError errorMessage={errSignup.msg} />
      )}
      <Box component="form" sx={authTheme.signupForm} onSubmit={handleSubmit}>
        <EmailInput errAPI={errSignup} />
        <Box sx={authTheme.nameInputContainer}>
          <FirstNameInput />
          <LastNameInput />
        </Box>
        <Box sx={authTheme.passwordInputContainer}>
          <PasswordInput errAPI={errSignup} />
          <PasswordValidation />
        </Box>
        <PasswordConfirmInput />
        <ButtonGeneral
          text="Sign up"
          canClick={canSubmit}
          isLoading={isLoading}
        />
      </Box>
    </section>
  );
}

export default SignupForm;

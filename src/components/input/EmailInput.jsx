import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import useAuth from "@/hooks/auth/useAuth";
import authValidators from "@/validators/authValidators";

function EmailInput({ errAPI, isLogin, newEmail }) {
  const { email, setEmail, isEmail, setIsEmail, setEmailFocus, emailFocus } =
    useAuth();

  useEffect(() => {
    const result = authValidators.EMAIL_REGEX.test(email);
    setIsEmail(result);
  }, [email]);

  return (
    <TextField
      required
      fullWidth
      id="email"
      label={newEmail ? "New Email Address" : "Email Address"}
      name="email"
      autoComplete="email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      onBlur={() => setEmailFocus(false)}
      error={
        !emailFocus && !email
          ? true
          : !emailFocus && !isEmail && !isLogin
          ? true
          : errAPI?.path === "email" &&
            !errAPI?.msg.startsWith("Email recently signed up") &&
            !isLogin
          ? true
          : false
      }
      helperText={
        (!email && !emailFocus && "Email is required.") ||
        (!isEmail && !emailFocus && !isLogin && "Invalid Email Address.") ||
        (errAPI?.path === "email" &&
          !errAPI?.msg.startsWith("Email recently signed up") &&
          !isLogin &&
          errAPI?.msg)
      }
    />
  );
}

export default EmailInput;

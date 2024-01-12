import TextField from "@mui/material/TextField";
import useAuth from "@/hooks/auth/useAuth";
import { useEffect } from "react";

function PasswordConfirmInput() {
  const {
    password,
    passwordConfirm,
    passwordConfirmFocus,
    setPasswordConfirm,
    setPasswordConfirmFocus,
    passwordFocusAfter,
    isMatch,
    setIsMatch,
  } = useAuth();

  useEffect(() => {
    const result = password && passwordConfirm === password;
    setIsMatch(result);
  }, [passwordConfirm]);
  return (
    <TextField
      type="password"
      required
      fullWidth
      id="password-confirm"
      label="Confirm Password"
      name="confirm password"
      color="success"
      onChange={(e) => setPasswordConfirm(e.target.value)}
      onFocus={() => setPasswordConfirmFocus(true)}
      value={passwordConfirm}
      error={
        passwordConfirmFocus && !password
          ? true
          : password && !isMatch && !passwordFocusAfter
          ? true
          : false
      }
      helperText={
        (passwordConfirmFocus && !password && "Enter password first.") ||
        (password &&
          !isMatch &&
          !passwordFocusAfter &&
          "Password is not match.")
      }
    />
  );
}

export default PasswordConfirmInput;

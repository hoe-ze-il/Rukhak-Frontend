import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import useAuth from "@/hooks/auth/useAuth";
import useShowPassword from "@/hooks/auth/useShowPassword";

function PasswordInput({ errAPI, isLogin, isNewPassword }) {
  const {
    password,
    setPassword,
    setPasswordForcusAfter,
    passwordFocusAfter,
    isPassword,
    setPasswordFocusStart,
  } = useAuth();
  const { handleClickShowPassword, showPassword } = useShowPassword();

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      label={isNewPassword ? "New Password" : "Password"}
      variant="outlined"
      color="success"
      required
      fullWidth
      onChange={(e) => setPassword(e.target.value)}
      onFocus={() => setPasswordFocusStart(true)}
      onBlur={() => setPasswordForcusAfter(false)}
      error={
        !password && !passwordFocusAfter
          ? true
          : !isPassword && !passwordFocusAfter && !isLogin
          ? true
          : errAPI?.path === "password" && !isLogin
          ? true
          : false
      }
      helperText={
        (!password && !passwordFocusAfter && "Password is required.") ||
        (errAPI?.path === "password" && !isLogin && errAPI?.msg)
      }
      value={password}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;

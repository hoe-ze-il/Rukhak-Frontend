import TextField from "@mui/material/TextField";
import useAuth from "@/hooks/auth/useAuth";

function CurrentPasswordInput({ errApi }) {
  const { curPassword, setCurPassword, curPasswordFocus, setCurPasswordFocus } =
    useAuth();
  return (
    <TextField
      required
      fullWidth
      name="current-password"
      label="Current Password"
      value={curPassword}
      onChange={(e) => setCurPassword(e.target.value)}
      onBlur={() => setCurPasswordFocus(true)}
      error={curPasswordFocus && !curPassword ? true : errApi ? true : false}
      helperText={
        (!curPassword && curPasswordFocus && "Enter current password.") ||
        (errApi && errApi)
      }
    />
  );
}

export default CurrentPasswordInput;

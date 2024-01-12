import SettingLineBreak from "@/components/setting/SettingLineBreak";
import PasswordSetting from "./PasswordSetting";
import TwoFactorAuthSetting from "./TwoFactorAuthSetting";
import useUser from "@/hooks/user/useUser";

import Box from "@mui/material/Box";
import DeleteAccountSetting from "./DeleteAccountSetting";

function LoginAndSecurity() {
  const { user } = useUser();
  const signupMethod = user?.signupMethod;
  return (
    <Box sx={{ marginTop: "16px" }}>
      <SettingLineBreak section="Login & Security" />
      {signupMethod === "email" && (
        <>
          <PasswordSetting />
          <SettingLineBreak />
        </>
      )}
      <TwoFactorAuthSetting />
      <SettingLineBreak />
      {signupMethod === "email" && (
        <>
          <DeleteAccountSetting />
          <SettingLineBreak />
        </>
      )}
    </Box>
  );
}

export default LoginAndSecurity;

import AuthHeader from "@/components/auth/AuthHeader";
import { useDeleteAccountMutation } from "@/features/user/userApiSlice";
import useAuth from "@/hooks/auth/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/features/auth/authSlice";

import Box from "@mui/material/Box";

import settingTheme from "@/theme/settingTheme";
import PasswordInput from "@/components/input/PasswordInput";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import AuthError from "@/components/auth/AuthError";

function DeleteAccount() {
  const { password } = useAuth();
  const [errMsg, setErrMsg] = useState();
  const userId = useSelector(selectCurrentUserId);
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const reasonDeleteAccount = JSON.parse(
    localStorage.getItem("reasonDeleteAccount")
  );
  const canDelete = password && reasonDeleteAccount && userId && true;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    if (canDelete) {
      try {
        await deleteAccount({
          userId,
          password,
          reasonDeleteAccount,
        }).unwrap();
        localStorage.clear();
        dispatch(logOut());
        navigate("/");
      } catch (err) {
        if (err?.data.message) {
          setErrMsg(err?.data.message);
        } else {
          setErrMsg("Internal server error! Please try again later.");
        }
      }
    }
  };

  return (
    <Box sx={settingTheme.settingHeader}>
      <AuthHeader
        logo={false}
        title="Confirm your password"
        description="Please confirm the password to delete account."
      />
      {errMsg && <AuthError errorMessage={errMsg} />}
      <PasswordInput />
      <ButtonGeneral
        text="Delete Account"
        buttonBGColor="error.main"
        buttonHover="error.light"
        canClick={canDelete}
        onClick={handleDeleteAccount}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default DeleteAccount;

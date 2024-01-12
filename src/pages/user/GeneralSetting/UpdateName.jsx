import FirstNameInput from "@/components/input/FirstNameInput";
import LastNameInput from "@/components/input/LastNameInput";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import { useUpdateUserMutation } from "@/features/user/userApiSlice";
import useAuth from "@/hooks/auth/useAuth";
import useUser from "@/hooks/user/useUser";
import { useState } from "react";
import AuthError from "@/components/auth/AuthError";
import Box from "@mui/material/Box";
import settingTheme from "@/theme/settingTheme";

function UpdateName() {
  const { isFirstName, isLastName, firstName, lastName } = useAuth();
  const { user, handleUpdateStatus } = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({});
  const userFirstName = user?.firstName;
  const userLastName = user?.lastName;
  const canSave =
    (isFirstName && firstName !== userFirstName) ||
    (isLastName && lastName !== userLastName && true);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const handleSaveClick = async () => {
    if (canSave) {
      if (firstName && !lastName) {
        setData((prev) => (prev.firstName = firstName));
      } else if (lastName && !firstName) {
        setData((prev) => (prev.lastName = lastName));
      } else if (firstName && lastName) {
        setData((prev) => {
          return (prev.firstName = firstName), (prev.lastName = lastName);
        });
      }
      try {
        const response = await updateUser({
          userId: user?._id,
          ...data,
        }).unwrap();
        if (response?.status === "success") {
          handleUpdateStatus();
        }
      } catch (err) {
        setErrorMsg("Changing Name is failed. Please try again later.");
      }
    }
  };
  return (
    <Box sx={settingTheme.boxContainer}>
      <Box sx={settingTheme.updateNameContainer}>
        {errorMsg && <AuthError errorMessage={errorMsg} />}
        <Box sx={settingTheme.updateNameInputContainer}>
          <FirstNameInput userFirstName={userFirstName} />
          <LastNameInput userLastName={userLastName} />
        </Box>
        <ButtonGeneral
          text="save"
          canClick={canSave}
          onClick={handleSaveClick}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
}

export default UpdateName;

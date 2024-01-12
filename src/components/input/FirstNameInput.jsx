import TextField from "@mui/material/TextField";
import authValidators from "@/validators/authValidators";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/auth/useAuth";

function FirstNameInput({ userFirstName }) {
  const {
    firstName,
    setFirstName,
    isFirstName,
    setIsFirstName,
    firstNameFocus,
    setFirstNameFocus,
  } = useAuth();
  const [nameStartChange, setNameStartChange] = useState(false);

  useEffect(() => {
    const result = authValidators.NAME_REGEX.test(firstName);
    setIsFirstName(result);
  }, [firstName]);

  return (
    <TextField
      required
      fullWidth
      id="firstName"
      label="First Name"
      name="firstName"
      onChange={(e) => setFirstName(e.target.value)}
      onFocus={() => {
        setNameStartChange(true),
          !nameStartChange && userFirstName && setFirstName(userFirstName);
      }}
      onBlur={() => {
        setFirstNameFocus(false), setFirstName(firstName);
      }}
      value={
        nameStartChange ? firstName : userFirstName ? userFirstName : firstName
      }
      error={
        !firstName && !firstNameFocus
          ? true
          : firstName && !isFirstName && !firstNameFocus
          ? true
          : false
      }
      helperText={
        (!firstName && !firstNameFocus && "First name is required.") ||
        (firstName && !isFirstName && !firstNameFocus && "Invalid First Name.")
      }
    />
  );
}

export default FirstNameInput;

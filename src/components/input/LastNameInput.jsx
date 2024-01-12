import TextField from "@mui/material/TextField";
import authValidators from "@/validators/authValidators";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/auth/useAuth";

function LastNameInput({ userLastName }) {
  const {
    lastName,
    setLastName,
    isLastName,
    setIsLastName,
    setLastNameFocus,
    lastNameFocus,
  } = useAuth();

  const [nameStartChange, setNameStartChange] = useState(false);

  useEffect(() => {
    const result = authValidators.NAME_REGEX.test(lastName);
    setIsLastName(result);
  }, [lastName]);

  return (
    <TextField
      required
      color="success"
      fullWidth
      id="lastName"
      label="Last Name"
      name="lastName"
      onChange={(e) => setLastName(e.target.value)}
      onFocus={() => {
        setNameStartChange(true),
          !nameStartChange && userLastName && setLastName(userLastName);
      }}
      onBlur={() => {
        setLastNameFocus(false), setLastName(lastName);
      }}
      value={
        nameStartChange ? lastName : userLastName ? userLastName : lastName
      }
      error={
        !lastName && !lastNameFocus
          ? true
          : lastName && !isLastName && !lastNameFocus
          ? true
          : false
      }
      helperText={
        (!lastName && !lastNameFocus && "Last name is required.") ||
        (lastName && !isLastName && !lastNameFocus && "Invalid Last Name.")
      }
    />
  );
}

export default LastNameInput;

// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Icons
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { useState, useEffect } from "react";
import authValidators from "../../validators/authValidators";
import useAuth from "@/hooks/auth/useAuth";

const styleBox = {
  display: "flex",
  gap: "0.5rem",
};

const styleText = {
  color: "text.primary",
};

function PasswordValidation() {
  const { setIsPassword, password, passwordFocusStart } = useAuth();

  const [isEightCharacters, setIsEightCharacters] = useState(false);
  const [isOneCapitalLetter, setIsOneCapitalLetter] = useState(false);
  const [isOneLowercaseLetter, setIsOneLowercaseLetter] = useState(false);
  const [isOneSpecialCharacter, setIsOneSpecialCharacter] = useState(false);
  const [isIncludeNum, setIsIncludeNum] = useState(false);
  const [isBeginOrEndWithSpace, setIsBeginOrEndWithSpace] = useState(false);

  useEffect(() => {
    const result1 = password.length >= 8;
    const result2 = authValidators.CAPITAL_LETTER_REGEX.test(password);
    const result3 = authValidators.LOWERCASE_LETTER_REGEX.test(password);
    const result4 = authValidators.SPECIAL_CHARACTER_REGEX.test(password);
    const result5 = authValidators.PASSWORD_NUMBER_REGEX.test(password);
    const result6 = !authValidators.SPACE_START_END_REGEX.test(password);

    setIsEightCharacters(result1);
    setIsOneCapitalLetter(result2);
    setIsOneLowercaseLetter(result3);
    setIsOneSpecialCharacter(result4);
    setIsIncludeNum(result5);
    setIsBeginOrEndWithSpace(result6);

    setIsPassword(
      result1 && result2 && result3 && result4 && result5 && result6
    );
  }, [password, setIsPassword]);
  return (
    <>
      <Box sx={{ paddingLeft: "8px" }}>
        <Box sx={styleBox}>
          {passwordFocusStart &&
            (!isEightCharacters ? (
              <CancelRoundedIcon fontSize="1px" color="error" />
            ) : (
              <CheckCircleRoundedIcon fontSize="1px" color="success" />
            ))}
          <Typography variant="body2" sx={styleText}>
            At least 8 characters
          </Typography>
        </Box>
        <Box sx={styleBox}>
          {passwordFocusStart &&
            (!isOneCapitalLetter ? (
              <CancelRoundedIcon fontSize="1px" color="error" />
            ) : (
              <CheckCircleRoundedIcon fontSize="1px" color="success" />
            ))}
          <Typography variant="body2" sx={styleText}>
            At least one capital letter
          </Typography>
        </Box>
        <Box sx={styleBox}>
          {passwordFocusStart &&
            (!isOneLowercaseLetter ? (
              <CancelRoundedIcon fontSize="1px" color="error" />
            ) : (
              <CheckCircleRoundedIcon fontSize="1px" color="success" />
            ))}
          <Typography variant="body2" sx={styleText}>
            At least one lowercase letter
          </Typography>
        </Box>
        <Box sx={styleBox}>
          {passwordFocusStart &&
            (!isOneSpecialCharacter ? (
              <CancelRoundedIcon fontSize="1px" color="error" />
            ) : (
              <CheckCircleRoundedIcon fontSize="1px" color="success" />
            ))}
          <Typography variant="body2" sx={styleText}>
            At least one special character (!@#$%)
          </Typography>
        </Box>
        <Box sx={styleBox}>
          {passwordFocusStart &&
            (!isIncludeNum ? (
              <CancelRoundedIcon fontSize="1px" color="error" />
            ) : (
              <CheckCircleRoundedIcon fontSize="1px" color="success" />
            ))}
          <Typography variant="body2" sx={styleText}>
            At least one number
          </Typography>
        </Box>
        <Box sx={styleBox}>
          {passwordFocusStart &&
            (!isBeginOrEndWithSpace ? (
              <CancelRoundedIcon fontSize="1px" color="error" />
            ) : (
              <CheckCircleRoundedIcon fontSize="1px" color="success" />
            ))}
          <Typography variant="body2" sx={styleText}>
            Must not begin or end with space
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default PasswordValidation;

import { useEffect } from "react";

import Box from "@mui/material/Box";
import settingTheme from "@/theme/settingTheme";
import useAuth from "@/hooks/auth/useAuth";

function OTPInput() {
  const { otp, setOtp, firstInputRef } = useAuth();
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleChange = (element, index, e) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (
      element.nextSibling &&
      e.nativeEvent.inputType !== "deleteContentBackward"
    ) {
      element.nextSibling.focus();
    }
  };

  return (
    <>
      <Box sx={settingTheme.boxOTPContainer}>
        <Box sx={settingTheme.OTPInputContainer}>
          {otp.map((el, i) => {
            return (
              <Box
                ref={i === 0 ? firstInputRef : null}
                sx={settingTheme.OTPInputs}
                component="input"
                autoFocus={i === 0}
                type="text"
                name="otp"
                maxLength="1"
                key={i}
                value={el}
                onChange={(e) => handleChange(e.target, i, e)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default OTPInput;

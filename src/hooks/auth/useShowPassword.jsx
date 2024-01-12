import { useState } from "react";

function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return { showPassword, handleClickShowPassword };
}

export default useShowPassword;

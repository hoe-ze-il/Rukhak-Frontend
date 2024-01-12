import Box from "@mui/material/Box";

import AuthSignupMethod from "@/components/auth/AuthSignupMethods";
import GoogleButton from "@/components/auth/GoogleButton";

import { useNavigate } from "react-router-dom";

function SignupOptions() {
  const navigate = useNavigate();

  const handleClcik = () => {
    navigate("/auth/signup/form");
  };
  return (
    <Box
      sx={{
        marginTop: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <AuthSignupMethod type="Email" process="signup" onClick={handleClcik} />
      <GoogleButton />
    </Box>
  );
}

export default SignupOptions;

// MUI Component
import Box from "@mui/material/Box";

// Internal Component
import LineBreak from "../../../components/user/LineBreak";
import GoogleButton from "../../../components/auth/GoogleButton";

function LoginMethod() {
  return (
    <section>
      <LineBreak />
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <GoogleButton />
      </Box>
    </section>
  );
}

export default LoginMethod;

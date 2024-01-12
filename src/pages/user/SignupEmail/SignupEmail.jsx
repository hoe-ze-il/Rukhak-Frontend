import AuthHeader from "@/components/auth/AuthHeader";
import SignupForm from "./SignupForm";
import AuthFooter from "@/components/auth/AuthFooter";
import Box from "@mui/material/Box";

function SignupEmail() {
  return (
    <Box>
      <AuthHeader
        title="Sign Up"
        description="Fill in the form to create an account"
      />
      <SignupForm />
      <AuthFooter type="signup" />
    </Box>
  );
}

export default SignupEmail;

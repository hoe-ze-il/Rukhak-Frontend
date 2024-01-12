import AuthHeader from "@/components/auth/AuthHeader";
import SignupOptions from "./SignupOptions";
import AuthFooter from "@/components/auth/AuthFooter";

function SignupMethod() {
  return (
    <>
      <AuthHeader title="Sign Up" description="Select a method to sign up" />
      <SignupOptions />
      <AuthFooter type="signup" />
    </>
  );
}

export default SignupMethod;

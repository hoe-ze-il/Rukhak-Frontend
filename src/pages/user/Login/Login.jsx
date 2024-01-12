import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "./LoginForm";
import AuthFooter from "@/components/auth/AuthFooter";
import LoginMethod from "./LoginMethod";

function Login() {
  return (
    <>
      <AuthHeader title="Login" description="Continue to Rukhak" />
      <LoginForm />
      <LoginMethod />
      <AuthFooter type="login" />
    </>
  );
}

export default Login;

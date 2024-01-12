import AuthHeader from "@/components/auth/AuthHeader";
import SignupSellerForm from "./SingupSellerForm";

function SignupSeller() {
  return (
    <>
      <AuthHeader
        title="Become a seller"
        description="Fill in the form below to continue"
      />
      <SignupSellerForm />
    </>
  );
}

export default SignupSeller;

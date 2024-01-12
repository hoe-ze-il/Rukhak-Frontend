import Box from "@mui/material/Box";

import PhoneNumberInput from "@/components/input/PhoneNumberInput";
import DateInput from "@/components/input/DateInput";
import GenderInput from "@/components/input/GenderInput";
import StoreNameInput from "@/components/input/StoreNameInput";
import AddLocation from "@/components/map/AddLocation";
import AddressInput from "@/components/input/AddressInput";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import useAuth from "@/hooks/auth/useAuth";
import { useSignupSellerMutation } from "@/features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authTheme from "@/theme/authTheme";
import AuthError from "@/components/auth/AuthError";

function SignupSellerForm() {
  const {
    address,
    storeName,
    phoneNumber,
    dateValue,
    gender,
    isAddress,
    isPhoneNumber,
    isDateValue,
  } = useAuth();
  const navigate = useNavigate();
  const [signupSeller, { isLoading }] = useSignupSellerMutation();
  const [errApi, setErrApi] = useState(null);

  const storeLongitude =
    JSON.parse(localStorage.getItem("storeLongitude")) || false;
  const storeLatitude =
    JSON.parse(localStorage.getItem("storeLatitude")) || false;
  const kHPhoneNumber = phoneNumber.startsWith("0")
    ? `+855 ${phoneNumber.slice(1)}`
    : `+855 ${phoneNumber}`;
  const canSubmit =
    [isAddress, isPhoneNumber, isDateValue].every(Boolean) &&
    storeName &&
    gender &&
    storeLongitude &&
    storeLatitude &&
    true;
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      try {
        const response = await signupSeller({
          phoneNumber: kHPhoneNumber,
          storeName,
          gender,
          dateOfBirth: dateValue,
          storeLocation: {
            coordinates: [storeLongitude, storeLatitude],
            address,
          },
        }).unwrap();
        if (response?.status === "success") {
          localStorage.removeItem("storeLongitude");
          localStorage.removeItem("storeLatitude");
          navigate("/auth/pending/seller");
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
        if (err?.status === 403) {
          setErrApi(err?.data);
        } else if (err?.data.status == "fail") {
          setErrApi(err?.data.errors[0]);
        }
      }
    }
  };
  return (
    <section>
      {errApi?.path === "storeLocation" && (
        <AuthError errorMessage={errApi?.msg} />
      )}
      {errApi?.message && <AuthError errorMessage={errApi?.message} />}
      <Box
        component="form"
        onSubmit={handleSubmitForm}
        sx={authTheme.signupSellerForm}
      >
        <AddLocation />
        <AddressInput />
        <PhoneNumberInput errApi={errApi} />
        <Box sx={authTheme.DateAndGenderContainer}>
          <DateInput errApi={errApi} />
          <GenderInput />
        </Box>
        <StoreNameInput errApi={errApi} />
        <ButtonGeneral
          text="Submit"
          canClick={canSubmit}
          isLoading={isLoading}
        />
      </Box>
    </section>
  );
}

export default SignupSellerForm;

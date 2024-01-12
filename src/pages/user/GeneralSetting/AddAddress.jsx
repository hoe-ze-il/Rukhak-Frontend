import { useCreateAddressMutation } from "@/features/address/addressApiSlice";
import useAuth from "@/hooks/auth/useAuth";
import useUser from "@/hooks/user/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// Internal component
import AuthHeader from "@/components/auth/AuthHeader";
import AddressInput from "@/components/input/AddressInput";
import FullNameInput from "@/components/input/FullNameInput";
import PhoneNumberInput from "@/components/input/PhoneNumberInput";
import AddLocation from "@/components/map/AddLocation";
import ButtonGeneral from "@/components/user/ButtonGeneral";

// MUI component
import Box from "@mui/material/Box";
import AuthError from "@/components/auth/AuthError";
import settingTheme from "@/theme/settingTheme";

function AddAddress() {
  const { address, isAddress, fullname, phoneNumber, isPhoneNumber } =
    useAuth();
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState(false);
  const userId = user?._id;
  const deliLatitude = JSON.parse(localStorage.getItem("deliLatitude"));
  const deliLongitude = JSON.parse(localStorage.getItem("deliLongitude"));

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  const [createAddress, { isLoading }] = useCreateAddressMutation();
  const canCreate =
    address &&
    isAddress &&
    fullname &&
    phoneNumber &&
    isPhoneNumber &&
    deliLatitude &&
    deliLongitude &&
    true;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (canCreate) {
      const realPhoneNumber = phoneNumber.startsWith("0")
        ? `+855 ${phoneNumber.slice(1)}`
        : `+855 ${phoneNumber}`;
      try {
        const response = await createAddress({
          userId,
          addressLine: address,
          fullname,
          phoneNumber: realPhoneNumber,
          pinPoint: [{ coordinates: [deliLatitude, deliLongitude] }],
        }).unwrap();
        if (response?.status === "success") {
          localStorage.removeItem("deliLatitude");
          localStorage.removeItem("deliLongitude");
          navigate(from, { replace: true });
        }
      } catch (err) {
        setErrorMessage("Fail to create new address. Please try again.");
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleCreate}
        sx={settingTheme.createAddressContainer}
      >
        <AuthHeader
          title="Create Delivery Address"
          description="Fill in the form belowe to add new address."
          logo={false}
        />
        {errorMessage && <AuthError errorMessage={errorMessage} />}
        <AddLocation title="Delivery Location" type="create" />
        <AddressInput />
        <FullNameInput />
        <PhoneNumberInput />
        <ButtonGeneral text="save" canClick={canCreate} isLoading={isLoading} />
      </Box>
    </>
  );
}

export default AddAddress;

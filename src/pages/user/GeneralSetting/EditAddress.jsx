import { useParams, useNavigate, useLocation } from "react-router-dom";
import AddLocation from "@/components/map/AddLocation";
import {
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from "@/features/address/addressApiSlice";
import { useState } from "react";
import settingTheme from "@/theme/settingTheme";
import AuthError from "@/components/auth/AuthError";
import useAuth from "@/hooks/auth/useAuth";
import useUser from "@/hooks/user/useUser";

import AddressInput from "@/components/input/AddressInput";
import FullNameInput from "@/components/input/FullNameInput";
import PhoneNumberInput from "@/components/input/PhoneNumberInput";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import AuthHeader from "@/components/auth/AuthHeader";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function EditAddress() {
  const { findDifferentValues, address, phoneNumber, fullname } = useAuth();
  const { handleGetCurDeliAddress } = useUser();
  const deliLatitude = JSON.parse(localStorage.getItem("deliLatitude"));
  const deliLongitude = JSON.parse(localStorage.getItem("deliLongitude"));

  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");

  const { addressId } = useParams();

  const [updateAddress, { isLoading: isLoadingUpdate }] =
    useUpdateAddressMutation();
  const [deleteAddress, { isLoading: isLoadingDelete }] =
    useDeleteAddressMutation();

  const from = location.state?.from?.pathname || "/";
  const curDeliAddress = handleGetCurDeliAddress(addressId);
  const curAddressLine = curDeliAddress?.addressLine;
  const curFullname = curDeliAddress?.fullname;
  const curPhoneNumber = curDeliAddress?.phoneNumber.slice(5);

  let newObj = {
    addressLine: address,
    phoneNumber,
    fullname,
    pinPoint: [
      {
        type: "Point",
        _id: addressId,
        coordinates: [deliLatitude, deliLongitude],
      },
    ],
  };

  const data = findDifferentValues(curDeliAddress, newObj);

  const canSave = Object.keys(data).length > 0;

  const handleUpdateAddress = async () => {
    if (canSave) {
      if (data?.phoneNumber) {
        let phoneNumber = data?.phoneNumber.startsWith("0")
          ? `+855 ${data?.phoneNumber.slice(1)}`
          : `+855 ${data?.phoneNumber}`;
        data.phoneNumber = phoneNumber;
      }
      try {
        const response = await updateAddress({
          ...data,
          id: addressId,
        }).unwrap();
        if (response?.status === "success") {
          if (deliLatitude && deliLongitude) {
            localStorage.removeItem("deliLatitude");
            localStorage.removeItem("deliLongitude");
          }
          newObj = {};
          navigate(from, { replace: true });
        }
      } catch (err) {
        setErrorMessage("Fail update address info! Please try again later.");
      }
    }
  };

  const handleDeleteAddress = async () => {
    try {
      const response = await deleteAddress({ id: addressId }).unwrap();
      if (response?.status === "success") {
        if (deliLatitude && deliLongitude) {
          localStorage.removeItem("deliLatitude");
          localStorage.removeItem("deliLongitude");
        }
        newObj = {};
        navigate(from, { replace: true });
      }
    } catch (err) {
      setErrorMessage("Fail to delete! Please try again later.");
    }
  };

  if (isLoadingDelete) {
    return <CircularProgress color="success" sx={settingTheme.loading} />;
  }

  return (
    <>
      <Box component="form" sx={settingTheme.editAddressContainer}>
        <AuthHeader
          title="Delivery Address"
          description="Update your delivery address"
          logo={false}
        />
        {errorMessage && <AuthError errorMessage={errorMessage} />}
        <AddLocation
          title="Delivery Location"
          describtion="Select your delivery location:"
          type="edit"
          curAddress={curDeliAddress}
        />
        <AddressInput curAddressLine={curAddressLine} />
        <FullNameInput curFullname={curFullname} />
        <PhoneNumberInput curPhoneNumber={curPhoneNumber} />
        <Box sx={settingTheme.editAddressButtonContainer}>
          <ButtonGeneral
            text="save"
            fullWidth="100%"
            onClick={handleUpdateAddress}
            canClick={canSave}
            isLoading={isLoadingUpdate}
          />
          <ButtonGeneral
            text="delete"
            buttonBGColor="error.main"
            buttonHover="error.light"
            onClick={handleDeleteAddress}
          />
        </Box>
      </Box>
    </>
  );
}

export default EditAddress;

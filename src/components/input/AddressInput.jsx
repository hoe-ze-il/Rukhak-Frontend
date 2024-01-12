import TextField from "@mui/material/TextField";
import useAuth from "@/hooks/auth/useAuth";
import { useEffect, useState } from "react";

function AddressInput({ curAddressLine }) {
  const {
    address,
    setAddress,
    isAddress,
    setIsAddress,
    addressFocus,
    setAddressFocus,
  } = useAuth();

  const [addressStartChange, setAddressStartChange] = useState(false);

  useEffect(() => {
    const result = address.length >= 8;
    setIsAddress(result);
  }, [address]);

  return (
    <TextField
      fullWidth
      name="address"
      label="Address Line"
      required
      value={
        addressStartChange ? address : curAddressLine ? curAddressLine : address
      }
      onFocus={() => {
        setAddressStartChange(true),
          !addressStartChange && curAddressLine && setAddress(curAddressLine);
      }}
      onBlur={() => {
        setAddressFocus(false), setAddress(address);
      }}
      onChange={(e) => setAddress(e.target.value)}
      error={
        !address && !addressFocus
          ? true
          : address && !isAddress && !addressFocus
          ? true
          : false
      }
      helperText={
        (!address && !addressFocus && "Enter address line.") ||
        (address && !isAddress && !addressFocus && "Address is incorrect.")
      }
    />
  );
}

export default AddressInput;

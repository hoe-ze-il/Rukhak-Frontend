import SettingLineBreak from "@/components/setting/SettingLineBreak";
import Box from "@mui/material/Box";
import useUser from "@/hooks/user/useUser";
import DeliveryAddresses from "./DeliveryAddresses";
import { Typography } from "@mui/material";

function UserAddress() {
  const { user } = useUser();
  const deliveryAddresses = user?.addresses;

  return (
    <Box sx={{ marginTop: "28px" }}>
      <SettingLineBreak section="Delivery Addresses" isDeliveryAddress={true} />
      {deliveryAddresses.length === 0 ? (
        <Typography variant="body1" textAlign="center" marginTop="16px">
          There is no delivery address added yet!
        </Typography>
      ) : (
        deliveryAddresses.map((address, index) => (
          <DeliveryAddresses
            key={address._id}
            address={address}
            index={index}
          />
        ))
      )}
    </Box>
  );
}

export default UserAddress;

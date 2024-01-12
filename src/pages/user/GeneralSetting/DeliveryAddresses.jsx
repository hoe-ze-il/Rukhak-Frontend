import settingTheme from "@/theme/settingTheme";
import SettingLineBreak from "@/components/setting/SettingLineBreak";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Radio from "@mui/material/Radio";
import { useUpdateAddressMutation } from "@/features/address/addressApiSlice";
import Loading from "@/components/admin/product/Loading";
import useUser from "@/hooks/user/useUser";

function DeliveryAddresses({ address, index }) {
  const { handleUpdateStatus } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [updateAddress, { isLoading }] = useUpdateAddressMutation();

  const truncatedAddressLine =
    address.addressLine.length > 30
      ? `${address.addressLine.substring(0, 30)}...`
      : address.addressLine;

  const handleUpdateCurrentAddress = async (addressId) => {
    if (!address?.currentlyUse) {
      try {
        const response = await updateAddress({
          id: addressId,
          currentlyUse: true,
        }).unwrap();
        if (response?.status === "success") {
          handleUpdateStatus();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <Box sx={settingTheme.boxContainer}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Radio
            checked={address.currentlyUse}
            size="small"
            onClick={() => handleUpdateCurrentAddress(address._id)}
          />
          <Box>
            <Box sx={settingTheme.addressFlexHeader}>
              <Typography variant="body2" fontWeight="700">
                Address #{index + 1}
              </Typography>
              {address.currentlyUse && (
                <Typography variant="body2" sx={settingTheme.currentlyUseText}>
                  Currently Use
                </Typography>
              )}
            </Box>

            <Typography variant="body2">{address.fullname}</Typography>
            <Typography variant="body2">{truncatedAddressLine}</Typography>
            <Typography variant="body2">{address.phoneNumber}</Typography>
          </Box>
        </Box>

        <EditIcon
          fontSize="medium"
          sx={{ color: "primary.main" }}
          onClick={() =>
            navigate(`/setting/edit-address/${address._id}`, {
              state: { from: location },
              replace: true,
            })
          }
        />
      </Box>
      <SettingLineBreak />
    </>
  );
}

export default DeliveryAddresses;

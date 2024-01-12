// Internal Component
import SettingLineBreak from "@/components/setting/SettingLineBreak";
import UploadImage from "./UploadImage";
import UpdateName from "./UpdateName";

// MUI Component
import Box from "@mui/material/Box";
import UpdateEmail from "./UpdateEmail";

function UserDetails() {
  return (
    <Box component="section" sx={{ marginTop: "16px" }}>
      <SettingLineBreak section="Detail" />
      <UploadImage />
      <SettingLineBreak />
      <UpdateName />
      <SettingLineBreak />
      <UpdateEmail />
      <SettingLineBreak />
    </Box>
  );
}

export default UserDetails;

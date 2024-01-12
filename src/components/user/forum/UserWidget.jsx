import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import PrivacySelector from "./PrivacyTypes";

const UserWidget = ({ userInfo }) => {
  return (
    <CardHeader
      avatar={<Avatar aria-label="author">U</Avatar>}
      title={`User`}
      subheader={<PrivacySelector />}
    />
  );
};
export default UserWidget;

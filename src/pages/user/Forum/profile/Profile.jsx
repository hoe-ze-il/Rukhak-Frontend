import ProfileHeader from "@/components/user/forum/ProfileHeader";
import TabInfo from "@/components/user/forum/FollowInfo";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <ProfileHeader user={state} />
      <TabInfo user={state} />
    </>
  );
};

export default Profile;

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonalPost from "@/pages/user/Forum/posts/PersonalPost";
import Followers from "@/pages/user/Forum/userList/Followers";
import Following from "@/pages/user/Forum/userList/Following";
const TabInfo = ({ user }) => {
  const [value, setValue] = useState("post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(user);
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="post" />
            <Tab label="Follower" value="follower" />
            <Tab label="Following" value="following" />
          </TabList>
        </Box>
        <TabPanel value="post" sx={{ padding: 2 }}>
          <PersonalPost userId={user._id} />
        </TabPanel>
        <TabPanel value="follower" sx={{ padding: 2 }}>
          <Followers userId={user._id} />
        </TabPanel>
        <TabPanel value="following" sx={{ padding: 2 }}>
          <Following userId={user._id} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default TabInfo;

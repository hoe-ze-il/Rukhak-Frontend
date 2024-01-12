import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@mui/material/styles/styled";

// MUI components
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// MUI icons
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import useUser from "@/hooks/user/useUser";

import Fab from "@mui/material/Fab";

const StyledBottomNavigationAction = styled(BottomNavigationAction)(() => ({
  padding: "0",
  minWidth: "56px",
}));

function ForumButtomBar() {
  const { user } = useUser();
  const [value, setValue] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Set the initial value based on the current route
    const pathname = location.pathname;
    if (pathname === "/forum") {
      setValue("Feed");
    } else if (pathname === "/forum/profile") {
      setValue("Profile");
    } else if (pathname === "/forum/new-post") {
      setValue("");
    } else {
      setValue("");
    }
  }, [location.pathname]);

  const menuItems = [
    { name: "Feed", icon: <HomeIcon />, path: "/forum" },
    {
      name: "",
      icon: (
        <Fab color="white" aria-label="add" size="small">
          <AddIcon />
        </Fab>
      ),
      path: "/forum/new-post",
    },
    {
      name: "Profile",
      icon: <AccountCircleOutlinedIcon />,
      path: "/forum/profile",
      state: user,
    },
  ];

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleChange}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        position: "sticky",
        bottom: 0,
        width: "100%",
        zIndex: 1100,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        mt: "2rem",
      }}
    >
      {menuItems.map((item) => (
        <StyledBottomNavigationAction
          key={item.name}
          value={item.name}
          label={item.name}
          icon={item.icon}
          sx={{ color: "text.primary" }}
          onClick={() => {
            navigate(item.path, { state: item.state });
          }}
        />
      ))}
    </BottomNavigation>
  );
}

export default ForumButtomBar;

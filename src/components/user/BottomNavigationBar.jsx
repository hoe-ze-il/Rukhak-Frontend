import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@mui/material/styles/styled";

// MUI components
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Badge from "@mui/material/Badge";


// MUI icons
import RestoreIcon from "@mui/icons-material/Restore";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";

import { useContext } from "react";
import { CartContext } from "@/contexts/user/CartContext";

const StyledBottomNavigationAction = styled(BottomNavigationAction)(() => ({
  padding: "0",
  minWidth: "56px",
}));

function BottomNavigationBar() {
  const [value, setValue] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantityCart, buyNowItems, dispatch } = useContext(CartContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Set the initial value based on the current route
    const pathname = location.pathname;
    if (pathname === "/forum") {
      setValue("Forum");
    } else if (pathname === "/") {
      setValue("Home");
    } else if (pathname === "/orderhistory") {
      setValue("Order");
    } else if (pathname === "/your-cart") {
      setValue("Cart");
    } else {
      setValue("");
    }
  }, [location.pathname]);

  const menuItems = [
    { name: "Forum", icon: <ForumIcon />, path: "/forum" },
    { name: "Order", icon: <RestoreIcon />, path: "/orderhistory" },
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Cart", icon: <Badge color="primary" badgeContent={totalQuantityCart} max={99}>
    <ShoppingCartIcon sx={{ color: "text.primary" }} />
  </Badge>, path: "/your-cart" },
    { name: "Setting", icon: <SettingsIcon />, path: "/setting" },
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
            navigate(item.path);
          }}
        />
      ))}
    </BottomNavigation>
  );
}

export default BottomNavigationBar;
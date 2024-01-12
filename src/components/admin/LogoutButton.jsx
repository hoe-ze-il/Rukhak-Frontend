import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [logout, { isLoading }] = useLogoutMutation();
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const persist = localStorage.getItem("persist" === "true" ? true : false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    if (token || persist) {
      await logout().unwrap();
    } else {
      navigate("/auth");
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        // id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // MenuListProps={{
        //   "aria-labelledby": "basic-button",
        // }}
      >
        <MenuItem onClick={handleLogout} sx={{ gap: "0.5rem" }}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

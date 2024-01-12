import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

import ListItemButton from "@mui/material/ListItemButton";

export function SidebarItem({ icon, text, alert, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <ListItemButton
      component={NavLink}
      to={to}
      sx={{
        borderRadius: "0.25rem",
        marginBottom: "0.25rem",
        "&.active": {
          background: "linear-gradient(to top right, #bfdbfe, #ebf4ff)",
          color: "#1e3a8a",
        },
        "&:hover": {
          backgroundColor: "#f0f5ff",
          color: "#4b5563",
        },
        ".MuiTouchRipple-child": {
          backgroundColor: "#42a5f5",
        },
      }}
      className={`${
        expanded ? "navigation-links" : "navigation-links collapsed"
      }`}
    >
      {icon}
      <span className={`item-title ${expanded ? "title-visible" : ""}`}>
        {text}
      </span>
      {alert && (
        <div className={`alert-circle ${!expanded && "alert-collapsed"}`} />
      )}

      {!expanded && <div className={`tooltip`}>{text}</div>}
    </ListItemButton>
  );
}

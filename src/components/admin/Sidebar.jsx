import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { createContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import useUser from "@/hooks/user/useUser";
import defaultImage from "@/assets/Default_image.jpg";
import LogoutButton from "./LogoutButton";
import rukhakLogo from "/rukhak-logo.png";
import { NavLink } from "react-router-dom";

export const SidebarContext = createContext();

function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user } = useUser();

  return (
    <aside>
      <nav className="navbar">
        <div className="header">
          <NavLink to="/">
            <img
              src={rukhakLogo}
              className={`logo ${expanded ? "expanded" : "collapsed"}`}
              alt=""
            />
          </NavLink>

          <IconButton
            sx={{
              backgroundColor: "#f5f5f5",
              "&:hover, &.Mui-focusVisible": { backgroundColor: "#eeeeee" },
            }}
            onClick={() => setExpanded((curr) => !curr)}
          >
            {expanded ? <ChevronLeft variant="contained" /> : <ChevronRight />}
          </IconButton>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="sidebar-items">{children}</ul>
        </SidebarContext.Provider>

        {user && (
          <div className="account">
            <img
              src={user?.imageURL || defaultImage}
              alt="User Profile"
              className="profile"
            />
            <div
              className={`information ${expanded ? "expanded" : "collapsed"}`}
            >
              <div className="user">
                <h4>{`${user?.lastName} ${user?.firstName}`}</h4>
                <span>{user?.email}</span>
              </div>
              <LogoutButton />
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;

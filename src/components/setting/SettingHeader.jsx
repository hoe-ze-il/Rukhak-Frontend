// MUI component
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ArrowBack from "../user/ArrowBack";

import { NavLink, useLocation, useParams } from "react-router-dom";

import "@/styles/setting.scss";

function SettingHeader() {
  const location = useLocation();
  const { addressId } = useParams();
  const pathName = location.pathname;
  return (
    <header>
      <Box
        padding={"16px"}
        sx={{
          boxShadow:
            "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <ArrowBack isSettingPage={true} />
          <Typography variant="h6">Setting</Typography>
        </Box>
      </Box>
      {pathName === "/setting/update-email" ||
      pathName === "/setting/confirm-OTP/update-email" ||
      pathName === `/setting/edit-address/${addressId}` ||
      pathName === "/setting/create-address" ||
      pathName === "/setting/edit-password" ||
      pathName === "/setting/enable/two-step-verification/password" ||
      pathName === "/setting/enable/two-step-verification/OTP" ||
      pathName === "/setting/disable/two-step-verification/password" ||
      pathName === "/setting/disable/two-step-verification/OTP" ||
      pathName === "/setting/reason-delete-account" ||
      pathName === "/setting/delete-account" ? null : (
        <nav>
          <Box sx={{ display: "flex", gap: "16px", padding: "8px 16px" }}>
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                (isActive && "active-link") || "nav-link"
              }
              end
            >
              General
            </NavLink>
            <NavLink
              to="/setting/security"
              className={({ isActive }) =>
                (isActive && "active-link") || "nav-link"
              }
              end
            >
              Log in & Security
            </NavLink>
          </Box>
        </nav>
      )}
    </header>
  );
}

export default SettingHeader;

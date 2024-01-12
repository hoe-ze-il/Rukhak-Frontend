import { useNavigate } from "react-router-dom";

// MUI components
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// MUI icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const txtPrimary = { color: "text.primary" };

const SecondaryTopNavigationBar = ({
  returnPrevLink = false,
  label = false,
  rightIcon,
  rightIconLink,
}) => {
  const navigate = useNavigate();

  const iconButtonSettings = {
    size: "large",
    color: "inherit",
    "aria-label": "menu",
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "background.default" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {returnPrevLink && (
            <IconButton
              onClick={() => navigate(returnPrevLink)}
              {...iconButtonSettings}
              edge="start"
            >
              <ArrowBackIcon sx={txtPrimary} />
            </IconButton>
          )}
          {label && (
            <Typography variant="h6" sx={txtPrimary}>
              {label}
            </Typography>
          )}
        </Box>
        <IconButton
          {...iconButtonSettings}
          edge="end"
          sx={txtPrimary}
          onClick={() => navigate(rightIconLink)}
        >
          {rightIcon}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default SecondaryTopNavigationBar;

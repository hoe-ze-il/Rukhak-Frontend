import { Link } from "react-router-dom";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// MUI icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const SectionHeader = ({ title, link }) => {
  const sectionTitleSetting = {
    variant: "subtitle1",
    textTransform: "capitalize",
    fontWeight: "medium",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.5rem",
      }}
    >
      <Typography {...sectionTitleSetting} sx={{ color: "text.primary" }}>
        {title}
      </Typography>
      {link && (
        <Link to={link}>
          <ArrowForwardIosIcon
            fontSize="inherit"
            sx={{ color: "text.secondary" }}
          />
        </Link>
      )}
    </Box>
  );
};

export default SectionHeader;

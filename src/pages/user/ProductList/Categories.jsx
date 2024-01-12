import { useContext } from "react";
import { CategoriesContext } from "@/contexts/user/CategoryContext";
import styled from "@mui/material/styles/styled";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const ListItem = styled("li")(({ theme }) => ({
  listStyleType: "none",
  marginRight: theme.spacing(1),
}));

function Categories() {
  const { categoryData, handleClick } = useContext(CategoriesContext);

  return (
    <Box
      display="flex"
      overflow="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for WebKit browsers
        },
        msOverflowStyle: "none", // Hide scrollbar for Internet Explorer
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        p: "1rem",
      }}
      component="ul"
    >
      {categoryData.map((data) => (
        <ListItem key={data.label}>
          <Chip
            readOnly
            label={data.label}
            onClick={handleClick(data)}
            sx={{
              borderRadius: "8px",
              px: "0.25rem",
              bgcolor: data.selected ? "primary.light" : "grey.300",
              ":hover": {
                bgcolor: data.selected ? "primary.light" : "grey.300",
              },
            }}
          />
        </ListItem>
      ))}
    </Box>
  );
}

export default Categories;

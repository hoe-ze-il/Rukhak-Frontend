import { useContext, useState } from "react";

// MUI components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// MUI icons
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Button from "@mui/material/Button";
import FilterRating from "./FilterRating";
import Stack from "@mui/material/Stack";
import FilterPrice from "./FilterPrice";
import { SearchProductsContext } from "@/contexts/user/SearchContext";

function FilterDrawer() {
  const [state, setState] = useState({
    left: false,
  });
  const { minmin, setMinmin, maxmax, setMaxmax, setChooseRate, setApply } =
    useContext(SearchProductsContext);

  const handleCloseDrawer = (anchor) => {
    setState({ ...state, [anchor]: false });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: anchor === "top" || anchor === "bottom" ? "auto" : 280,
        height: "100%",
        backgroundColor: "background.default",
        gap: "2rem",
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "0.5rem 1rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography>Filter</Typography>
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <CloseSharpIcon />
        </IconButton>
      </Box>

      {/* TODO: Filter Price and Rating */}
      <FilterPrice
        minmin={minmin}
        setMinmin={setMinmin}
        maxmax={maxmax}
        setMaxmax={setMaxmax}
      />
      <FilterRating setChooseRate={setChooseRate} />

      <Stack
        direction="row"
        spacing={2}
        alignSelf={"flex-end"}
        sx={{
          width: "100%",
          p: "1rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "50%" }}
          onClick={() => handleCloseDrawer(anchor)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={() => {
            handleCloseDrawer(anchor), setApply(true);
          }}
        >
          Apply
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      <FilterAltOutlinedIcon onClick={toggleDrawer("bottom", true)} />
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
        sx={{ height: "100%" }}
      >
        {list("bottom")}
      </Drawer>
    </>
  );
}

export default FilterDrawer;

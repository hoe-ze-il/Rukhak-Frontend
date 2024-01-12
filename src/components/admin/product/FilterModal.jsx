import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Filter } from "lucide-react";
import { useState, useContext } from "react";
import PriceRange from "./PriceRange";
import "@/styles/admin/filterModal.scss";
import { FilterContext } from "@/contexts/admin/FilterContext";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  p: 4,
};

export default function FilterModal() {
  const {
    setPage,
    setMinNum,
    setMaxNum,
    selectedCategories,
    setSelectedCategories,
    status,
    setStatus,
    queryParams,
    setIsFilterApplied,
  } = useContext(FilterContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const categories = useSelector(
    (state) => state.api.queries["getCategory(undefined)"]?.data
  );

  const handleClose = () => {
    setMinNum(parseInt(queryParams.unitPriceGte));
    setMaxNum(parseInt(queryParams.unitPriceLte));
    setSelectedCategories(queryParams.categories?.split(","));
    setStatus(queryParams.status);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Filter <Filter />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <section className="filter-sections">
              <p>
                <b>Price Range</b>
              </p>
              <PriceRange />
            </section>
            <section className="filter-sections">
              <p>
                <b>Categories</b>
              </p>
              <Autocomplete
                multiple
                options={categories}
                sx={{ width: "100%" }}
                getOptionLabel={(category) => category.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Select category"
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  value === undefined ||
                  value === "" ||
                  option.name === value.name
                }
                onChange={(event, values) => {
                  setSelectedCategories(values.map((value) => value.name));
                }}
                value={categories?.filter((category) =>
                  selectedCategories?.includes(category.name)
                )}
              />
            </section>
            <section className="filter-sections">
              <p>
                <b>Status</b>
              </p>

              <Select
                sx={{ width: "50%" }}
                variant="standard"
                value={status}
                displayEmpty={true}
                renderValue={(value) => (value !== "" ? value : "All")}
                onChange={(event) => setStatus(event.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Hidden">Hidden</MenuItem>
                <MenuItem value="Deleted">Deleted</MenuItem>
              </Select>
            </section>
            <footer className="filter-footer">
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                variant="contained"
                onClick={() => {
                  setPage(0);
                  setIsFilterApplied(true);
                  setOpen(false);
                }}
              >
                Apply
              </Button>
            </footer>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

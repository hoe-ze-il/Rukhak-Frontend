import { useState, useContext, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import { Filter } from "lucide-react";
import { ProductsFilterContext } from "@/contexts/seller/ProductsFilterContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const STATUSES = [
  {
    key: "Public",
    value: "Public",
  },
  { key: "Hidden", value: "Hidden" },
];

export default function ProductFilterModal() {
  const {
    CATEGORIES,
    isFilterMode,
    setIsFilterMode,
    filterObjInitState,
    filterObj,
    setFilterObj,
    setFilterBasedOnUrl,
    setIsFilterClicked,
    setPage,
  } = useContext(ProductsFilterContext);

  const [open, setOpen] = useState(false);

  const handleCategsChange = (e, newValue) => {
    const categoriesStr = newValue.join(",");

    setFilterObj({ ...filterObj, categsFilter: categoriesStr });
  };

  const handleStatusFilter = (e, newValue) => {
    setFilterObj({
      ...filterObj,
      statusFilter: newValue?.value || "",
    });
  };

  const handleSubmitFilter = () => {
    setIsFilterClicked(true);
    if (
      filterObj.isBasePriceFilter ||
      filterObj.isUnitPriceFilter ||
      filterObj.categsFilter ||
      filterObj.statusFilter
    ) {
      setIsFilterMode(true);
    } else setIsFilterMode(false);
    setPage(1);
    setOpen(false);
  };

  const handleClearAllFilter = () => {
    setIsFilterMode(false);
    setFilterObj(filterObjInitState);
    setPage(1);
    setOpen(false);
  };

  const handleClose = () => {
    setFilterBasedOnUrl();
    setOpen(false);
  };

  return (
    <>
      <Button
        sx={{
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        onClick={() => setOpen(true)}
        disableRipple
      >
        Filter
        <Badge variant="dot" invisible={!isFilterMode} color="error">
          <Filter />
        </Badge>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "1em" }}
          >
            Filter
          </Typography>

          <Typography>
            Base Price: ${filterObj.basePricesFilter[0]} - $
            {filterObj.basePricesFilter[1]}
            <Checkbox
              checked={filterObj.isBasePriceFilter}
              onChange={() =>
                setFilterObj({
                  ...filterObj,
                  isBasePriceFilter: !filterObj.isBasePriceFilter,
                })
              }
            />
          </Typography>
          <Slider
            value={filterObj.basePricesFilter}
            onChange={(e, newValue) =>
              setFilterObj({ ...filterObj, basePricesFilter: newValue })
            }
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={0}
            max={100}
            size="small"
            disabled={!filterObj.isBasePriceFilter}
          />

          <Divider sx={{ marginY: "1em" }} />

          <Typography>
            Unit Price: ${filterObj.unitPricesFilter[0]} - $
            {filterObj.unitPricesFilter[1]}
            <Checkbox
              checked={filterObj.isUnitPriceFilter}
              onChange={() =>
                setFilterObj({
                  ...filterObj,
                  isUnitPriceFilter: !filterObj.isUnitPriceFilter,
                })
              }
            />
          </Typography>
          <Slider
            value={filterObj.unitPricesFilter}
            onChange={(e, newValue) =>
              setFilterObj({ ...filterObj, unitPricesFilter: newValue })
            }
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={0}
            max={100}
            size="small"
            disabled={!filterObj.isUnitPriceFilter}
          />

          <Divider sx={{ marginY: "1em" }} />

          <Typography>Categories</Typography>
          <Autocomplete
            multiple
            id="tags-categories"
            options={CATEGORIES}
            getOptionLabel={(option) => option}
            value={filterObj.categsFilter
              .split(",")
              .filter((item) => CATEGORIES.includes(item))}
            onChange={handleCategsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select Categories..."
              />
            )}
            size="small"
          />

          <Divider sx={{ marginY: "1em" }} />

          <Typography>Status</Typography>
          <Autocomplete
            id="tags-standard"
            options={STATUSES}
            getOptionLabel={(option) => option.key}
            onChange={handleStatusFilter}
            value={STATUSES.find(
              (status) => status.value == filterObj.statusFilter
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select a Status"
              />
            )}
            size="small"
          />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleClearAllFilter}
              color="primary"
              sx={{ ml: 2 }}
            >
              Clear all filter
            </Button>
            <Button onClick={handleSubmitFilter} color="info" sx={{ ml: 2 }}>
              Apply
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Filter } from "lucide-react";
import { useState, useContext } from "react";
import "@/styles/admin/filterModal.scss";
import { SellerContext } from "@/contexts/admin/SellerContext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import _capitalize from "lodash/capitalize";
import Badge from "@mui/material/Badge";

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
    sellerStatus,
    setSellerStatus,
    queryParams,
    setIsFilterApplied,
  } = useContext(SellerContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setSellerStatus(queryParams.sellerStatus);
    setOpen(false);
  };

  return (
    <>
      <Badge color="primary" variant={sellerStatus !== "" ? "dot" : null}>
        <Button onClick={handleOpen} variant="outlined">
          Filter <Filter />
        </Button>
      </Badge>

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
                <b>Seller Status</b>
              </p>
              <Select
                sx={{ width: "50%" }}
                variant="standard"
                value={sellerStatus}
                displayEmpty={true}
                renderValue={(value) =>
                  value !== "" ? _capitalize(value) : "All"
                }
                onChange={(event) => setSellerStatus(event.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
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

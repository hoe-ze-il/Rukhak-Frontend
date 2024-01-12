import { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import useDebounce from "@/utils/useDebounce";
import { useNavigate } from "react-router-dom";
import { SearchProductsContext } from "@/contexts/user/SearchContext";
import { trim } from "@/utils/trim";

const style = {
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "56px",
  padding: "0 1rem",
  display: "flex",
  justifyContent: "center",
};

const inputStyle = {
  width: "100%",
  borderRadius: "8px 0 0 8px",
  backgroundColor: "transparent",
  color: "inherit",
  border: "1px solid black",
  borderRight: 0,
  paddingLeft: "16px",
  outline: "none",
  fontSize: "1em",
};

const cancelBtnStyle = {
  color: "text.primary",
  width: "20%",
  borderRadius: "0 8px 8px 0",
  border: "1px solid black",
  borderLeft: 0,
  maxWidth: "56px",
  padding: "0 0.5rem",
};

function SearchComponent() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const debouncedSearchValue = useDebounce(search, 500);
  const { setSearchData } = useContext(SearchProductsContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false), setSearch("");
  };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleCancelSearch = () => {
    setSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setOpen(false);

    if (trim(search)) {
      navigate(`/results?q=${encodeURIComponent(search)}`);
      setSearch("");
    } else {
      setSearch("");
      return;
    }

    if (inputRef.current) {
      inputRef.current.blur(); // Blur the input field after form submission
    }
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus(); // Focus on the input field when the modal opens
    }
  }, [open]);

  useEffect(() => {
    if (debouncedSearchValue && trim(debouncedSearchValue)) {
      setSearchData(debouncedSearchValue);
    }
  }, [setSearchData, debouncedSearchValue]);

  useEffect(() => {
    if (debouncedSearchValue && trim(debouncedSearchValue)) {
      navigate(`/results?q=${encodeURIComponent(debouncedSearchValue)}`);
    }
  }, [debouncedSearchValue, navigate]);

  return (
    <>
      <IconButton
        size="large"
        aria-label="search"
        edge="end"
        sx={{ color: "text.primary" }}
        onClick={handleOpen}
      >
        <SearchIcon />
      </IconButton>
      <Modal keepMounted open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                maxWidth: "500px",
                padding: "0.25rem 0",
              }}
            >
              <input
                type="text"
                placeholder="Search..."
                style={inputStyle}
                value={search}
                onChange={handleSearch}
                ref={inputRef}
              />
              <IconButton
                size="large"
                aria-label="search"
                sx={cancelBtnStyle}
                onClick={handleCancelSearch}
              >
                <CloseSharpIcon />
              </IconButton>
            </Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="search"
              sx={{ color: "text.primary", width: "20%", maxWidth: "64px" }}
              onClick={handleSubmit}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </form>
      </Modal>
    </>
  );
}

export default SearchComponent;

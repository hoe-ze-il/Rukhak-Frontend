import { useContext } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import { FilterContext } from "@/contexts/admin/FilterContext";

function ProductSearch() {
  const { setPage, productName, setProductName, setIsFilterApplied } =
    useContext(FilterContext);

  function handleSubmit(event) {
    event.preventDefault();
    setPage(0);
    setIsFilterApplied(true);
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <TextField
        label="Search product"
        size="small"
        value={productName}
        variant="standard"
        className="search-bar"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={(event) => {
                  handleSubmit(event);
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(event) => setProductName(event.target.value)}
      />
    </form>
  );
}

export default ProductSearch;

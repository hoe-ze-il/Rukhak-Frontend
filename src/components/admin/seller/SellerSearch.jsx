import { useContext } from "react";
import TextField from "@mui/material/TextField";
import { SellerContext } from "@/contexts/admin/SellerContext";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Search from "@mui/icons-material/Search";

function SellerSearch() {
  const { setPage, sellerName, setSellerName, setIsFilterApplied } =
    useContext(SellerContext);

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
        label="Search seller"
        size="small"
        value={sellerName}
        className="search-bar"
        variant="standard"
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
        onChange={(event) => setSellerName(event.target.value)}
      />
    </form>
  );
}

export default SellerSearch;

import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { FilterContext } from "@/contexts/admin/FilterContext";
import { SellerContext } from "@/contexts/admin/SellerContext";

export default function TablePaginate({ totalResults, pageTitle }) {
  const { page, setPage, rowsPerPage, setRowsPerPage } = useContext(
    pageTitle !== "seller" ? FilterContext : SellerContext
  );
  const [inputPage, setInputPage] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageSubmit = (event) => {
    event.preventDefault();
    setPage(parseInt(inputPage) - 1);
    setInputPage("");
  };

  const [invalidPage, setInvalidPage] = useState(false);

  useEffect(() => {
    if (
      parseInt(inputPage) > Math.ceil(totalResults / rowsPerPage) ||
      parseInt(inputPage) < 1
    ) {
      setInvalidPage(true);
    } else {
      setInvalidPage(false);
    }
  }, [inputPage]);

  const totalPages = Math.ceil(totalResults / rowsPerPage);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <form onSubmit={handlePageSubmit}>
          <TextField
            value={inputPage}
            placeholder={`${page + 1}`}
            type="number"
            className="input-page"
            size="small"
            InputProps={{
              inputProps: {
                min: 1,
                max:
                  totalResults > 0 && rowsPerPage > 0
                    ? Math.ceil(totalResults / rowsPerPage)
                    : 1,
              },
            }}
            onChange={(e) => setInputPage(e.target.value)}
            error={invalidPage}
          />
          <Typography variant="body" sx={{ marginLeft: "0.5rem" }}>
            / {isNaN(totalPages) ? 1 : totalPages}
          </Typography>
          <Button type="submit" variant="contained" sx={{ marginLeft: "1rem" }}>
            Go to page
          </Button>
        </form>
      </Box>
      {page !== undefined && totalResults !== undefined && (
        <TablePagination
          component="div"
          count={totalResults}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}

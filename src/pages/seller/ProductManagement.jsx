import { useGetOwnProductsQuery } from "@/features/seller/sellerProductSlice";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductsFilterContext } from "@/contexts/seller/ProductsFilterContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import ProductFilterModal from "@/components/seller/ProductFilterModal";
import { Search, ArrowDownUp, Plus } from "lucide-react";
import { useDebounce } from "@/hooks/seller/useDebounce";
import { useScreenAndSidebarWidth } from "@/hooks/admin/useScreenAndSidebarWidth";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const {
    page,
    setPage,
    limit,
    setLimit,
    orderBy,
    setOrderBy,
    order,
    setOrder,
    allColumns,
    selectedColumns,
    setSelectedColumns,
    searchTerm,
    setSearchTerm,
    filterQueryStr,
  } = useContext(ProductsFilterContext);
  const { screenWidth, sidebarWidth } = useScreenAndSidebarWidth();
  const debouncedLimit = useDebounce(limit, 500);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [inputError, setInputError] = useState();

  const {
    data: products,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetOwnProductsQuery(
    `page=${page}&limit=${debouncedLimit || 1}&sort=${
      (orderBy && (order == "desc" ? "-" : "")) || ""
    }${orderBy}&q=${debouncedSearchTerm}&${filterQueryStr}`,
    {
      skip: !!inputError,
    }
  );

  // Error handler
  let rowContents;
  let paginationComponent;
  if (error?.status == 404) {
    rowContents = (
      <TableRow>
        <TableCell>No results found</TableCell>
      </TableRow>
    );
    paginationComponent = <Pagination count={1} page={1} />;
  } else {
    rowContents = products?.ids.map((postId) => (
      <TableRow key={postId}>
        {selectedColumns.map((column) => {
          if (column == allColumns.categories.key)
            return (
              <TableCell>
                {products.entities[postId][allColumns.categories.key].join(
                  ", "
                )}
              </TableCell>
            );

          if (column == allColumns.title.key)
            return (
              <TableCell key={column}>
                <Link
                  to={`/seller/products/${postId}`}
                  className="product-links"
                >
                  {products.entities[postId][column]}
                </Link>
              </TableCell>
            );

          return (
            <TableCell key={column}>
              {products.entities[postId][column]}
            </TableCell>
          );
        })}
      </TableRow>
    ));

    paginationComponent = (
      <Pagination
        count={products?.metadata.totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        color="primary"
        siblingCount={2}
      />
    );
  }

  useEffect(() => {
    if (0 < limit && limit < 101) {
      setInputError();
    } else {
      setInputError("Minimum 1 rows and maximum 100 rows");
    }
  }, [limit]);
  const handleRowsPerPage = (e) => {
    const { value } = e.target;
    if (0 < value && value < 101) {
      setPage(1);
      setInputError();
    } else {
      setInputError("Minimum 1 rows and maximum 100 rows");
    }

    setLimit(value);
  };

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrderBy(columnId);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleColumnChange = (e) => setSelectedColumns(e.target.value);

  // When there's a search, reset Order and Page
  const handleSearchTermChange = (e) => {
    setOrderBy("");
    setPage(1);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="listing-container">
      <div className="listing-header">
        <div>
          <h1>Product Management</h1>
          <Link to="/seller/products/new">
            <Button variant="outlined">
              <Plus /> Add new
            </Button>
          </Link>
        </div>
        <div className="search-filter-div">
          <TextField
            label="Search Product..."
            value={searchTerm}
            size="small"
            onChange={handleSearchTermChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <ProductFilterModal />
        </div>
      </div>
      {debouncedSearchTerm && (
        <h3>Search Results for &quot;{debouncedSearchTerm}&quot;</h3>
      )}
      <div className="top-table-actions-div">
        <FormControl>
          <Select
            labelId="select-columns"
            multiple
            value={selectedColumns}
            onChange={handleColumnChange}
            renderValue={() =>
              `${selectedColumns.length} of ${
                Object.keys(allColumns).length
              } columns`
            }
            size="small"
          >
            {Object.values(allColumns).map((column) => (
              <MenuItem
                key={column.key}
                value={column.key}
                disabled={column.readOnly}
              >
                <Checkbox checked={selectedColumns.indexOf(column.key) > -1} />
                <ListItemText primary={column.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {orderBy && (
          <Button variant="outlined" onClick={() => setOrderBy("")}>
            Reset order <ArrowDownUp />
          </Button>
        )}
      </div>
      {(isLoading || isFetching) && <LinearProgress color="primary" />}
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "70vh",
          width: `${screenWidth - sidebarWidth - 72}px`,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {selectedColumns.map((column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === allColumns[column]["key"]}
                    direction={
                      orderBy === allColumns[column]["key"] ? order : "asc"
                    }
                    onClick={() => handleSort(allColumns[column]["key"])}
                  >
                    {allColumns[column]["label"]}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{rowContents}</TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <TextField
          label="Rows Per Page"
          type="number"
          value={limit}
          onChange={handleRowsPerPage}
          variant="outlined"
          size="small"
          error={Boolean(inputError)}
          helperText={inputError}
        ></TextField>

        {paginationComponent}
      </div>
    </div>
  );
};

export default ProductManagement;

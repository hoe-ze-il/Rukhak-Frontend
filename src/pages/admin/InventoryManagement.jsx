import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import TablePaginate from "@/components/admin/product/TablePaginate";
import { Link } from "react-router-dom";
import FilterModal from "@/components/admin/product/FilterModal";
import { useEffect, useState, useContext, useRef } from "react";
import { useScreenAndSidebarWidth } from "@/hooks/admin/useScreenAndSidebarWidth";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FilterContext } from "@/contexts/admin/FilterContext";
import ProductSearch from "@/components/admin/product/ProductSearch";
import TableSortLabel from "@mui/material/TableSortLabel";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Loading from "@/components/admin/product/Loading";
import ReactGA from "react-ga4";
import { useSelector } from "react-redux";
import {
  selectAllInventory,
  selectInventoryMetaData,
} from "@/features/admin/inventorySlice";

export default function InventoryManagement() {
  const { screenWidth, sidebarWidth } = useScreenAndSidebarWidth();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  const {
    page,
    rowsPerPage,
    sortState,
    applyFilter,
    handleSortChange,
    getSortDirection,
    allColumns,
    visibleColumns,
    selectedColumns,
    setSelectedColumns,
    resetFilterAndSort,
    queryParams,
    updateQueryParams,
    isSuccess,
    isFetching,
    isError,
    error,
    isFilterApplied,
    setIsFilterApplied,
  } = useContext(FilterContext);

  const columnNameRef = useRef(null);
  const inventoryData = useSelector((state) =>
    selectAllInventory(state, "", queryParams)
  );
  const inventoryMetaData = useSelector((state) =>
    selectInventoryMetaData(state, "", queryParams)
  );
  const [filterStateCount, setFilterStateCount] = useState(0);

  function handleFilterStateCount() {
    let cnt = 0;
    if (queryParams.unitPriceGte !== 0 || queryParams.unitPriceLte !== 100) {
      cnt += 1;
    }
    if (
      queryParams.categories?.split(",")?.filter((item) => item)?.length !== 0
    ) {
      cnt += 1;
    }
    if (queryParams.status !== "") {
      cnt += 1;
    }
    return cnt;
  }

  useEffect(() => {
    updateQueryParams();
    if (isFilterApplied) {
      setIsFilterApplied(false);
    }
  }, [page, rowsPerPage, sortState, isFilterApplied]);

  useEffect(() => {
    setFilterStateCount(() => handleFilterStateCount());
  }, [queryParams]);

  const unSortableFields = ["title", "categories", "status"];

  const [menuState, setMenuState] = useState({
    anchorEl: null,
    columnKey: null,
  });

  const handleChange = (event) => handleColumnChange(event.target.value);
  const handleColumnChange = (columns) => setSelectedColumns(columns);

  const handleMenuOpen = (event, columnKey) => {
    setMenuState({ anchorEl: event.currentTarget, columnKey });
  };

  const handleMenuClose = () => {
    setMenuState({ anchorEl: null, columnKey: null });
  };

  function handleResetFilterAndSort() {
    resetFilterAndSort();
    applyFilter();
  }

  return (
    <>
      {isFetching && <Loading />}
      {error && (error.status === "FETCH_ERROR" || error.status === 500) ? (
        <h1>Internal Sever Error</h1>
      ) : (
        inventoryData && (
          <div className="inventory-management overflow-a">
            <h1>Inventory Management</h1>

            <div className="filter-options pd-16">
              <div className="search-container">
                <ProductSearch />
              </div>
              <div className="filter-sort">
                <Link to="/admin/inventory/new">
                  <Button variant="contained">Create New</Button>
                </Link>
                <Badge badgeContent={filterStateCount} color="primary">
                  <FilterModal />
                </Badge>
              </div>
            </div>

            <div className="select-columns">
              {(!!filterStateCount || sortState.length !== 0) && (
                <Button
                  size="small"
                  color="error"
                  sx={{ marginRight: "1rem" }}
                  onClick={handleResetFilterAndSort}
                >
                  Reset all filter/sort
                </Button>
              )}
              <FormControl sx={{ width: "25%" }}>
                <InputLabel variant="standard" id="select-columns">
                  Selected columns
                </InputLabel>
                <Select
                  labelId="select-columns"
                  variant="standard"
                  multiple
                  value={selectedColumns}
                  onChange={handleChange}
                  renderValue={() =>
                    `${selectedColumns.length} / ${
                      Object.keys(allColumns).length
                    } columns`
                  }
                >
                  {Object.values(allColumns).map((column) => (
                    <MenuItem
                      key={column.key}
                      value={column.key}
                      disabled={column.readOnly}
                    >
                      <Checkbox
                        checked={selectedColumns.indexOf(column.key) > -1}
                      />
                      <ListItemText primary={column.label} />
                      {getSortDirection(column.key) !== undefined && (
                        <TableSortLabel
                          active
                          direction={getSortDirection(column.key)}
                        />
                      )}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div
              className="table-container"
              style={{ width: `${screenWidth - sidebarWidth}px` }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="product table" sx={{ borderBottom: "none" }}>
                  <TableHead>
                    <TableRow>
                      {visibleColumns.map((column) => (
                        <TableCell
                          ref={columnNameRef}
                          key={column.key}
                          sx={{
                            minWidth: column.width,
                            fontWeight: "bold",
                            cursor: "pointer",
                            position: "relative",
                            backgroundColor: "inherit",
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                              color: "#1976d2",
                              ".menuButton": {
                                visibility: "visible",
                              },
                            },
                          }}
                          sortDirection={getSortDirection(column.key)}
                          onClick={(event) => {
                            if (
                              !columnNameRef.current?.contains(event.target) ||
                              column.key
                            ) {
                              if (menuState.columnKey !== null) {
                                return;
                              } else {
                                handleSortChange(column.key);
                              }
                            }
                          }}
                        >
                          <div
                            className={
                              column.key !== "title"
                                ? "column-names justify-end"
                                : "column-names"
                            }
                          >
                            {!unSortableFields.includes(column.key) && (
                              <IconButton
                                className="menuButton"
                                size="small"
                                sx={{
                                  visibility: "hidden",
                                }}
                                onClick={(event) => {
                                  handleMenuOpen(event, column.key);
                                  event.stopPropagation();
                                }}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            )}
                            {column.label}
                            {getSortDirection(column.key) !== undefined && (
                              <TableSortLabel
                                active
                                direction={getSortDirection(column.key)}
                              />
                            )}
                          </div>
                          <Menu
                            anchorEl={menuState.anchorEl}
                            open={menuState.columnKey === column.key}
                            onClose={handleMenuClose}
                          >
                            <MenuItem
                              onClick={() => {
                                handleSortChange(column.key, "asc");
                                handleMenuClose();
                              }}
                            >
                              Sort in ascending
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleSortChange(column.key, "desc");
                                handleMenuClose();
                              }}
                            >
                              Sort in descending
                            </MenuItem>
                            {getSortDirection(column.key) !== undefined && (
                              <MenuItem
                                onClick={() => {
                                  console.log("Yoooo");
                                  handleSortChange(column.key, "clear");
                                  handleMenuClose();
                                }}
                              >
                                Clear sort
                              </MenuItem>
                            )}
                          </Menu>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {inventoryData && (
                    <TableBody>
                      {error && error.status === 404 ? (
                        <TableRow>
                          <TableCell
                            colSpan={visibleColumns.length}
                            align="center"
                          >
                            <p>No data found</p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        inventoryData?.map((data) => (
                          <TableRow key={data._id}>
                            {visibleColumns.map((column) =>
                              column.key === "title" ? (
                                <TableCell key={column.key} align="left">
                                  <Link
                                    className="product-links"
                                    to={`/admin/inventory/${data._id}`}
                                  >
                                    {data[column.key]}
                                  </Link>
                                </TableCell>
                              ) : (
                                <TableCell key={column.key} align="right">
                                  {column.key === "categories" &&
                                  Array.isArray(data[column.key])
                                    ? data[column.key].join(", ")
                                    : typeof data[column.key] !== "string" &&
                                      !Number.isInteger(data[column.key])
                                    ? parseFloat(data[column.key]).toFixed(2)
                                    : data[column.key]}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <div className="table-footer">
                <TablePaginate totalResults={inventoryMetaData.totalResults} />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  LinearProgress,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Pagination,
  Button,
  Typography,
} from "@mui/material";
import { Search, ArrowDownUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "@/features/seller/getOrderSliceSeller"; // Replace with the correct path

const OrderManagement = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery();
  const [isColumnClicked, setIsColumnClicked] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    "orderId",
    "products",
    "paymentMethod",
    "TotalPrice",
    "status",
    "Action",
  ]);

  const [orderBy, setOrderBy] = useState("");
  const [direction, setDirection] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputError, setInputError] = useState("");

  if (error) {
    return <div>Error loading data</div>;
  }
  const statusStyles = {
    pending: {
      backgroundColor: "#FFC43D",
    },
    approved: {
      backgroundColor: "#B191FF",
    },
    cancelled: {
      backgroundColor: "#EF476F",
    },
    shipped: {
      backgroundColor: "#118AB2",
    },
    delivered: {
      backgroundColor: "#06D6A0",
    },
  };
  const handleColumnChange = (e) => setSelectedColumns(e.target.value);

  const handleRowsPerPage = (e) => {
    const { value } = e.target;
    const newLimit = parseInt(value, 10);

    if (newLimit > 0 && newLimit < 101) {
      setPage(1);
      setInputError("");
      setLimit(newLimit);
    } else {
      setInputError("Minimum 1 row and maximum 100 rows");
    }
  };

  const handleResetOrder = () => {
    setOrderBy("");
    setDirection("asc");
    setIsColumnClicked(false);
  };

  const handleSearchTermChange = (e) => {
    setOrderBy("");
    setPage(1);
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    setOrderBy(column);
    setDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    setIsColumnClicked(true);
  };

  const calculateTotalPrice = (order) =>
    `$${order.Orders.reduce(
      (total, item) => total + item.itemPrice * item.quantity,
      0
    ).toFixed(2)}`;

  const renderColumnValue = (column, order) => {
    switch (column) {
      case "products":
        return order.title
          ? order.title.map((item, index) => (
              <React.Fragment key={index}>
                {item}
                <br />
              </React.Fragment>
            ))
          : null;
      case "TotalPrice":
        return calculateTotalPrice(order);
      case "status":
        return (
          <Typography
            variant="body"
            sx={{
              ...statusStyles[order.shipping.status.toLowerCase()],
              padding: "4px 8px 6px",
              borderRadius: "14px",
              color: "white",
            }}
          >
            {order.shipping.status}
          </Typography>
        );
      case "orderId":
        return (
          <Link className="product-links" to={`/seller/order/${order.orderId}`}>
            {order.orderId}
          </Link>
        );

      default:
        return order[column];
    }
  };

  const totalItems = orders?.data?.docs?.length || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);

  const paginatedOrders = [...(orders?.data?.docs || [])]
    .reverse()
    .slice(startIndex, endIndex);
  console.log(paginatedOrders);
  const rowContents = paginatedOrders.map((order) => (
    <TableRow key={order.orderId}>
      {selectedColumns.map((column) => (
        <TableCell key={column}>
          {column !== "Action" ? (
            renderColumnValue(column, order)
          ) : (
            <Button
              component={Link}
              to={`/seller/order/${order.orderId}`}
              variant="contained"
              size="small"
              sx={{ borderRadius: "10px", backgroundColor: "grey.600" }}
            >
              Edit
            </Button>
          )}
        </TableCell>
      ))}
    </TableRow>
  ));

  const paginationComponent = totalItems ? (
    <div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        color="primary"
        siblingCount={2}
      />
      <div style={{ marginTop: "10px" }}>
        Page {page} of {totalPages}
      </div>
    </div>
  ) : null;

  return (
    <div className="listing-container">
      <div className="listing-header">
        <h1>Order Management</h1>
        <div className="search-filter-div">
          <TextField
            label="Search Order..."
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
        </div>
      </div>
      {searchTerm && <h3>Search Results for "{searchTerm}"</h3>}
      <div className="top-table-actions-div">
        <FormControl>
          <Select
            labelId="select-columns"
            multiple
            value={selectedColumns}
            onChange={handleColumnChange}
            renderValue={() =>
              `${selectedColumns.length} of ${
                [
                  "orderId",
                  "paymentMethod",
                  "products",
                  "TotalPrice",
                  "status",
                  "Action",
                ].length
              } columns`
            }
            size="small"
          >
            {orders?.data?.docs?.[0] &&
              [
                "orderId",
                "paymentMethod",
                "products",
                "TotalPrice",
                "status",
                "Action",
              ].map((column) => (
                <MenuItem key={column} value={column}>
                  <Checkbox checked={selectedColumns.indexOf(column) > -1} />
                  <ListItemText primary={column} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {isColumnClicked && ( // Show the button only when a column is clicked
          <Button variant="outlined" onClick={handleResetOrder}>
            Reset order <ArrowDownUp />
          </Button>
        )}
      </div>
      {isLoading && <LinearProgress color="primary" />}
      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              {selectedColumns.map((column) => (
                <TableCell key={column}>
                  {column !== "Action" ? (
                    <TableSortLabel
                      active={orderBy === column}
                      direction={direction}
                      onClick={() => handleSort(column)}
                    >
                      {column}
                    </TableSortLabel>
                  ) : (
                    "Action"
                  )}
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
        />
        {paginationComponent}
      </div>
    </div>
  );
};

export default OrderManagement;

import { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  selectAllSeller,
  selectSellerMetaData,
} from "@/features/admin/sellerSlice";
import TablePaginate from "@/components/admin/product/TablePaginate";
import { useSelector } from "react-redux";
import { SellerContext } from "@/contexts/admin/SellerContext";
import FilterModal from "@/components/admin/seller/FilterModal";
import SellerSearch from "@/components/admin/seller/SellerSearch";
import SellerInfo from "@/components/admin/seller/SellerInfo";

function SellerManagement() {
  const {
    page,
    rowsPerPage,
    queryParams,
    updateQueryParams,
    isFilterApplied,
    setIsFilterApplied,
    debouncedSellerName,
  } = useContext(SellerContext);
  const sellers = useSelector((state) =>
    selectAllSeller(state, "", queryParams)
  );
  const sellerMetaData = useSelector((state) =>
    selectSellerMetaData(state, "", queryParams)
  );

  useEffect(() => {
    updateQueryParams();
    if (isFilterApplied) {
      setIsFilterApplied(false);
    }
  }, [page, rowsPerPage, isFilterApplied]);

  console.log();
  return (
    <>
      <div className="seller-approval overflow-a">
        <h1>Seller Management</h1>

        <div className="filter-options pd-16">
          <div className="search-container">
            <SellerSearch />
          </div>
          <div className="filter-sort">
            <FilterModal />
          </div>
        </div>
        {debouncedSellerName && (
          <b className="pd-16">Search Result for {debouncedSellerName}</b>
        )}
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Store Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sellers.map((row) => (
                  <SellerInfo key={row._id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="table-footer">
            <TablePaginate
              totalResults={sellerMetaData.totalResults}
              pageTitle={"seller"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerManagement;

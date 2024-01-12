import { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetSellerQuery } from "@/features/admin/sellerSlice";
import { useDebounce } from "@/hooks/admin/useDebounce";

const SellerContext = createContext();

function SellerContextProvider({ children }) {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const [skip, setSkip] = useState(true);
  const [sellerName, setSellerName] = useState(urlSearchParams.get("q") ?? "");
  const debouncedSellerName = useDebounce(sellerName, 500);

  const [page, setPage] = useState(
    Number(urlSearchParams.get("page")) - 1 === -1
      ? 0
      : Number(urlSearchParams.get("page")) - 1
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    Number(urlSearchParams.get("limit")) || 10
  );

  const [sellerStatus, setSellerStatus] = useState(
    urlSearchParams.get("sellerStatus") || ""
  );
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [queryParams, setQueryParams] = useState({
    limit: 10,
    page: 1,
  });

  function updateQueryParams() {
    const params = {
      limit: rowsPerPage,
      page: page + 1,
      q: sellerName,
      sellerStatus: sellerStatus,
    };
    setQueryParams(params);
  }

  const { data, isSuccess, isFetching, isError, error } = useGetSellerQuery(
    queryParams,
    {
      skip,
    }
  );

  useEffect(() => {
    updateQueryParams();
    setPage(0);
  }, [debouncedSellerName]);

  function applyFilter(params) {
    const filterParams = new URLSearchParams(params);
    history.pushState({}, "", `?${filterParams.toString()}`);
    if (!data) setSkip((prev) => !prev);
  }

  //   function resetFilterAndSort() {
  //     setStatus("");
  //   }

  useEffect(() => {
    applyFilter(queryParams);
  }, [queryParams]);

  return (
    <SellerContext.Provider
      value={{
        page,
        setPage,
        sellerName,
        setSellerName,
        rowsPerPage,
        setRowsPerPage,
        applyFilter,
        sellerStatus,
        setSellerStatus,
        queryParams,
        updateQueryParams,
        isSuccess,
        isFetching,
        isError,
        error,
        isFilterApplied,
        setIsFilterApplied,
        debouncedSellerName,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
}

export { SellerContextProvider, SellerContext };

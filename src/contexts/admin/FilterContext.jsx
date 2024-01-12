import { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetInventoryQuery } from "@/features/admin/inventorySlice";

const FilterContext = createContext();

function FilterContextProvider({ children }) {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);

  const allColumns = {
    basePrice: { key: "basePrice", label: "Base Price", width: "75px" },
    soldAmount: { key: "soldAmount", label: "Sold Amount", width: "75px" },
    stockAlert: { key: "stockAlert", label: "Stock Alert", width: "75px" },
    averageRating: { key: "averageRating", label: "Rating", width: "75px" },
    status: { key: "status", label: "Status", width: "75px" },
    categories: {
      key: "categories",
      label: "Categories",
      width: "125px",
    },
    availableStock: {
      key: "availableStock",
      label: "Available Stock",
      width: "75px",
      readOnly: true,
    },
    unitPrice: {
      key: "unitPrice",
      label: "Unit Price",
      width: "75px",
      readOnly: true,
    },
    title: { key: "title", label: "Title", width: "200px", readOnly: true },
  };

  const defaultColumns = [
    allColumns.title,
    allColumns.unitPrice,
    allColumns.basePrice,
    allColumns.availableStock,
    allColumns.categories,
    allColumns.soldAmount,
  ];

  const DEFAULT_MIN_NUM = 0;
  const DEFAULT_MAX_NUM = 100;

  const [selectedColumns, setSelectedColumns] = useState(
    urlSearchParams.get("selectedColumns")?.split(",") ||
      defaultColumns.map((column) => column.key)
  );

  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);

  useEffect(() => {
    setVisibleColumns(selectedColumns.map((item) => allColumns[item]));
  }, [selectedColumns]);

  const [page, setPage] = useState(
    Number(urlSearchParams.get("page")) - 1 === -1
      ? 0
      : Number(urlSearchParams.get("page")) - 1
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    Number(urlSearchParams.get("limit")) || 10
  );

  const [minNum, setMinNum] = useState(
    Number(urlSearchParams.get("unitPriceGte")) || DEFAULT_MIN_NUM
  );
  const [maxNum, setMaxNum] = useState(
    Number(urlSearchParams.get("unitPriceLte")) || DEFAULT_MAX_NUM
  );

  const [sortState, setSortState] = useState(
    urlSearchParams
      .get("sort")
      ?.split(",")
      .filter((item) => item) || []
  );

  const [productName, setProductName] = useState(
    urlSearchParams.get("q") ?? ""
  );
  const [selectedCategories, setSelectedCategories] = useState(
    urlSearchParams.get("categories")?.split(",") || []
  );
  const [status, setStatus] = useState(urlSearchParams.get("status") || "");
  const [skip, setSkip] = useState(true);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleSortChange = (columnKey, option) => {
    const unSortableFields = ["title", "categories", "status"];
    if (!unSortableFields.includes(columnKey)) {
      if (!option) {
        setSortState((prev) => {
          // remove any invalid entries, such as empty strings
          const cleanedPrev = prev.filter((item) => item);

          // check if the column is already in the sort state
          const existingSort = cleanedPrev.find((item) =>
            item.includes(columnKey)
          );

          if (existingSort) {
            // determine the next sort state
            const isDescending = existingSort.startsWith("-");
            if (isDescending) {
              // currently 'desc', so remove to represent 'none'
              return cleanedPrev.filter((item) => item !== existingSort);
            } else {
              // currently 'asc', so change to 'desc'
              return cleanedPrev.map((item) =>
                item === columnKey ? `-${columnKey}` : item
              );
            }
          } else {
            // not currently sorted, so add as 'asc'
            return [...cleanedPrev, columnKey];
          }
        });
      } else {
        setSortState((prev) => {
          return [
            ...prev.filter((item) => !item.includes(columnKey)),
            option === "asc" ? columnKey : option === "desc" && `-${columnKey}`,
          ].filter((item) => item);
        });
      }
    }
  };

  const getSortDirection = (columnKey) => {
    const sortItem = sortState.find((item) => item.includes(columnKey));
    if (!sortItem) return undefined;
    return sortItem.startsWith("-") ? "desc" : "asc";
  };

  const [queryParams, setQueryParams] = useState({
    limit: 10,
    page: 1,
    unitPriceGte: DEFAULT_MIN_NUM,
    unitPriceLte: DEFAULT_MAX_NUM,
  });

  function updateQueryParams() {
    const params = {
      limit: rowsPerPage,
      page: page + 1,
      unitPriceGte: minNum < maxNum ? minNum : maxNum,
      unitPriceLte: maxNum < minNum ? minNum : maxNum,
      categories: selectedCategories?.join(","),
      sort: sortState?.join(","),
      q: productName,
      status: status,
    };
    setQueryParams(params);
  }

  const { data, isSuccess, isFetching, isError, error } = useGetInventoryQuery(
    queryParams,
    {
      skip,
    }
  );

  function applyFilter(params) {
    const filterParams = new URLSearchParams(params);
    if (selectedColumns) {
      filterParams.set("selectedColumns", selectedColumns?.join(","));
    }
    history.pushState({}, "", `?${filterParams.toString()}`);
    if (!data) setSkip((prev) => !prev);
  }

  useEffect(() => {
    applyFilter(queryParams);
  }, [queryParams, selectedColumns]);

  function resetFilterAndSort() {
    setSelectedCategories([]);
    setSortState([]);
    setProductName("");
    setMinNum(0);
    setMaxNum(100);
    setStatus("");
  }

  return (
    <FilterContext.Provider
      value={{
        minNum,
        setMinNum,
        maxNum,
        setMaxNum,
        sortState,
        handleSortChange,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        selectedCategories,
        setSelectedCategories,
        productName,
        setProductName,
        applyFilter,
        getSortDirection,
        allColumns,
        visibleColumns,
        selectedColumns,
        setSelectedColumns,
        status,
        setStatus,
        resetFilterAndSort,
        queryParams,
        updateQueryParams,
        isSuccess,
        isFetching,
        isError,
        error,
        isFilterApplied,
        setIsFilterApplied,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContextProvider, FilterContext };

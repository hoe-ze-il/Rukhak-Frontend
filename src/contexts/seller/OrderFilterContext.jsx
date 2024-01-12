import { useState, createContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OrderFilterContext = createContext();

function FilterContextProvider({ children }) {
  let [urlQueryStr, setUrlQueryStr] = useSearchParams();
  const CATEGORIES = ["waterplant", "landplant", "tools", "fruit"];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(urlQueryStr.get("limit") || 2);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const [isFilterMode, setIsFilterMode] = useState(false);
  const [filterQueryStr, setFilterQueryStr] = useState("");
  const filterObjInitState = {
    isBasePriceFilter: false,
    isUnitPriceFilter: false,
    basePricesFilter: [12, 88],
    unitPricesFilter: [0, 78],
    categsFilter: "",
    statusFilter: "",
  };

  const [filterObj, setFilterObj] = useState(filterObjInitState);

  function setFilterBasedOnUrl() {
    if (urlQueryStr.size > 0) {
      const localFilterObj = { ...filterObjInitState };
      if (urlQueryStr.get("isBasePriceFilter") === "true") {
        localFilterObj.isBasePriceFilter = JSON.parse(
          urlQueryStr.get("isBasePriceFilter")
        );
        localFilterObj.basePricesFilter = JSON.parse(
          urlQueryStr.get("basePricesFilter")
        );
      }
      if (urlQueryStr.get("isUnitPriceFilter") === "true") {
        localFilterObj.isUnitPriceFilter = JSON.parse(
          urlQueryStr.get("isUnitPriceFilter")
        );
        localFilterObj.unitPricesFilter = JSON.parse(
          urlQueryStr.get("unitPricesFilter")
        );
      }

      if (urlQueryStr.get("categsFilter")) {
        localFilterObj.categsFilter = urlQueryStr.get("categsFilter");
      }

      if (urlQueryStr.get("statusFilter")) {
        localFilterObj.statusFilter = urlQueryStr.get("statusFilter");
      }

      if (
        localFilterObj.isBasePriceFilter ||
        localFilterObj.isUnitPriceFilter ||
        localFilterObj.categsFilter ||
        localFilterObj.statusFilter
      ) {
        console.log("===== in filter mode====");
        setIsFilterMode(true);
        setFilterObj(localFilterObj);
      } else {
        console.log("===== not in filter mode====");
        setIsFilterMode(false);
        setFilterObj(filterObjInitState);
      }
    } else {
      setFilterObj(filterObjInitState);
    }
  }

  function setPageBasedOnUrl() {
    if (urlQueryStr.size > 0) {
      if (urlQueryStr.get("page")) {
        setPage(Number(urlQueryStr.get("page")));
      }
    }
  }

  function setSortBasedOnUrl() {
    if (urlQueryStr.size > 0) {
      if (
        ["asc", "desc"].includes(urlQueryStr.get("order")) &&
        urlQueryStr.get("orderBy")
      ) {
        setOrderBy(urlQueryStr.get("orderBy"));
        setOrder(urlQueryStr.get("order"));
      }
    }
  }

  function setLimitBasedOnUrl() {
    if (urlQueryStr.size > 0) {
      if (urlQueryStr.get("limit")) {
        setLimit(Number(urlQueryStr.get("limit")));
      }
    }
  }

  function setSearchTermBasedOnUrl() {
    if (urlQueryStr.size > 0) {
      if (urlQueryStr.get("q")) {
        setSearchTerm(urlQueryStr.get("q"));
      }
    }
  }

  // From URL => states
  useEffect(() => {
    setFilterBasedOnUrl();
    setPageBasedOnUrl();
    setLimitBasedOnUrl();
    setSortBasedOnUrl();
    setSearchTermBasedOnUrl();
  }, []);

  // If in filter mode (ie get from URL or from click apply)
  function convertFilterObjToFilterQueryStrAndUrlQueryStr() {
    if (isFilterMode) {
      const queryStrChunks = [];
      if (filterObj.isBasePriceFilter)
        queryStrChunks.push(
          `basePrice[gte]=${filterObj.basePricesFilter[0]}&basePrice[lte]=${filterObj.basePricesFilter[1]}`
        );
      if (filterObj.isUnitPriceFilter)
        queryStrChunks.push(
          `unitPrice[gte]=${filterObj.unitPricesFilter[0]}&unitPrice[lte]=${filterObj.unitPricesFilter[1]}`
        );

      if (filterObj.categsFilter)
        queryStrChunks.push(`categories=${filterObj.categsFilter}`);
      if (filterObj.statusFilter)
        queryStrChunks.push(`status=${filterObj.statusFilter}`);

      setFilterQueryStr(queryStrChunks.join("&"));

      const customUrlQueryStr = {
        ...filterObj,
        basePricesFilter: JSON.stringify(filterObj.basePricesFilter),
        unitPricesFilter: JSON.stringify(filterObj.unitPricesFilter),
        page,
        limit,
        order,
        orderBy,
        q: searchTerm,
      };
      setUrlQueryStr(customUrlQueryStr);
    } else {
      setFilterQueryStr("");
      setUrlQueryStr({ page, limit, order, orderBy, q: searchTerm });
    }
  }

  const [isFilterClicked, setIsFilterClicked] = useState(false);
  useEffect(() => {
    convertFilterObjToFilterQueryStrAndUrlQueryStr();
    setIsFilterClicked(false);
  }, [isFilterMode, isFilterClicked]);

  // Set other states to URL Query String
  useEffect(() => {
    setUrlQueryStr({
      ...filterObj,
      basePricesFilter: JSON.stringify(filterObj.basePricesFilter),
      unitPricesFilter: JSON.stringify(filterObj.unitPricesFilter),
      page,
      limit,
      order,
      orderBy,
      q: searchTerm,
    });
  }, [page, order, orderBy, limit, searchTerm]);

  const allColumns = {
    basePrice: { key: "basePrice", label: "Base Price", width: "75px" },
    soldAmount: { key: "soldAmount", label: "Sold Amount", width: "75px" },
    stockAlert: { key: "stockAlert", label: "Stock Alert", width: "75px" },
    averageRating: { key: "averageRating", label: "Rating", width: "75px" },
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
    unit: {
      key: "unit",
      label: "Unit",
      width: "75px",
      readOnly: true,
    },
    title: { key: "title", label: "Title", width: "200px", readOnly: true },
    status: { key: "status", label: "Status", width: "75px", readOnly: true },
  };
  const defaultColumns = [
    allColumns.title,
    allColumns.basePrice,
    allColumns.unitPrice,
    allColumns.unit,
    allColumns.availableStock,
    allColumns.categories,
    allColumns.soldAmount,
    allColumns.status,
  ];

  const [selectedColumns, setSelectedColumns] = useState(
    defaultColumns.map((column) => column.key)
  );

  return (
    <OrderFilterContext.Provider
      value={{
        CATEGORIES,
        page,
        setPage,
        limit,
        setLimit,
        orderBy,
        setOrderBy,
        order,
        setOrder,
        selectedColumns,
        setSelectedColumns,
        allColumns,
        searchTerm,
        setSearchTerm,
        isFilterMode,
        setIsFilterMode,
        filterObjInitState,
        filterObj,
        setFilterObj,
        filterQueryStr,
        setFilterQueryStr,
        setUrlQueryStr,
        urlQueryStr,
        setFilterBasedOnUrl,
        convertFilterObjToFilterQueryStr:
          convertFilterObjToFilterQueryStrAndUrlQueryStr,
        setIsFilterClicked,
      }}
    >
      {children}
    </OrderFilterContext.Provider>
  );
}

export { OrderFilterContext, FilterContextProvider };
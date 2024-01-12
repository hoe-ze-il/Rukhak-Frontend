import { useGetAllProductsQuery } from "@/features/api/getProductsSlice";
import { trim } from "@/utils/trim";
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchProductsContext = createContext();

function SearchProductsContextProvider({ children }) {
  const [searchData, setSearchData] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState("");
  const [minNum, setMinNum] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const [rating, setRating] = useState("");
  const [minmin, setMinmin] = useState("");
  const [maxmax, setMaxmax] = useState("");
  const [chooseRate, setChooseRate] = useState("");
  const [apply, setApply] = useState(false);
  const [allResults, setAllResults] = useState([]);

  const navigate = useNavigate();

  // Reload the page when the URL changes
  // useEffect(() => {
  //   const handleLocationChange = () => {
  //     window.location.reload();
  //   };

  //   window.addEventListener("popstate", handleLocationChange);

  //   return () => {
  //     window.removeEventListener("popstate", handleLocationChange);
  //   };
  // }, []);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const minNum = searchParams.get("unitPrice[gte]") || "";
    const maxNum = searchParams.get("unitPrice[lte]") || "";
    const chooseRate = searchParams.get("averageRating[gte]") || "";

    setQ(q);
    setSearchData(q);
    setMinNum(minNum);
    setMaxNum(maxNum);
    setChooseRate(chooseRate);
  }, [searchParams]);

  useEffect(() => {
    if (apply) {
      if (minmin === "" || maxmax === "") {
        // If either minmin or maxmax is empty, update URL with current values
        setMinNum(minmin);
        setMaxNum(maxmax);

        navigate(
          `/results?q=${encodeURIComponent(
            q
          )}&unitPrice%5Bgte%5D=${minmin}&unitPrice%5Blte%5D=${maxmax}&averageRating%5Bgte%5D=${chooseRate}`
        );
      } else {
        // Swap logic
        const [newMin, newMax] =
          minmin > maxmax ? [maxmax, minmin] : [minmin, maxmax];
        setMinNum(newMin);
        setMaxNum(newMax);

        setMinmin(newMin);
        setMaxmax(newMax);

        navigate(
          `/results?q=${encodeURIComponent(
            q
          )}&unitPrice%5Bgte%5D=${newMin}&unitPrice%5Blte%5D=${newMax}&averageRating%5Bgte%5D=${chooseRate}`
        );
      }

      setRating(chooseRate);
      setApply(false);
      setPage(1);
      setAllResults([]);
    }
  }, [apply, minmin, maxmax, chooseRate, maxNum, minNum, navigate, q, rating]);

  useEffect(() => {
    // Parsing URL search params
    const qParam = searchParams.get("q") || "";
    const minNumParam = searchParams.get("unitPrice[gte]") || "";
    const maxNumParam = searchParams.get("unitPrice[lte]") || "";
    const chooseRateParam = searchParams.get("averageRating[gte]") || "";

    setQ(qParam);
    setSearchData(qParam);

    if (qParam !== q) {
      setMinNum("");
      setMaxNum("");
      setRating("");
    } else {
      setMinNum(minNumParam);
      setMaxNum(maxNumParam);
      setRating(chooseRateParam);
    }
  }, [searchParams, q]);

  const { data, isLoading, isError, isFetching } = useGetAllProductsQuery(
    {
      q: searchData,
      page,
      categories,
      unitPriceGte: minNum,
      unitPriceLte: maxNum,
      averageRatingGte: rating,
    },
    { skip: !searchData }
  );

  const uniqueData = useMemo(() => data?.data || [], [data?.data]);

  useEffect(() => {
    if (trim(searchData)) {
      setQ(searchData);
      setPage(1);
      setAllResults([]);
    }
  }, [searchData, setPage, setQ, setAllResults]);

  // Update the data when new data arrives
  useEffect(() => {
    if (uniqueData && uniqueData.length > 0) {
      // Concatenate the new data with the existing data
      setAllResults((prevData) => [...prevData, ...uniqueData]);
    }
  }, [uniqueData, setAllResults]);

  return (
    <SearchProductsContext.Provider
      value={{
        searchData,
        setSearchData,
        data: uniqueData,
        isLoading,
        isError,
        isFetching,
        setPage,
        setQ,
        setCategories,
        minNum,
        setMinNum,
        maxNum,
        setMaxNum,
        minmin,
        setMinmin,
        maxmax,
        setMaxmax,
        setApply,
        setChooseRate,
        allResults,
        setAllResults,
      }}
    >
      {children}
    </SearchProductsContext.Provider>
  );
}

export { SearchProductsContextProvider, SearchProductsContext };

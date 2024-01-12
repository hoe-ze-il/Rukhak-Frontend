import { SearchProductsContext } from "@/contexts/user/SearchContext";
import { useCallback, useContext, useRef } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ProductListSkeleton from "@/components/skeleton/ProductListSkeleton";
import ProductCard from "@/components/user/ProductCard";
import ProgressLoading from "@/components/user/ProgressLoading";
import FilterDrawer from "@/pages/user/SearchProductsPage/FilterDrawer";
import NotFound from "../NotFound/NotFound";

const SearchResult = () => {
  const {
    searchData,
    data,
    isLoading,
    isFetching,
    isError,
    allResults,
    setPage,
  } = useContext(SearchProductsContext);

  const observer = useRef();

  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoading || !data || data.length === 0) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, data, setPage]
  );

  if (isLoading) {
    return <ProductListSkeleton numberOfCards={8} />;
  }

  if (isError || !data) {
    return <NotFound message={"Data"} btnName={"Back"} toPage={-1} />;
  }

  return (
    <main className="page">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: "0.5rem",
          mx: "1rem",
        }}
      >
        <Typography>
          Result for: <strong>{searchData}</strong>
        </Typography>
        <IconButton
          size="large"
          edge="end"
          aria-label="filter"
          sx={{ color: "text.primary" }}
        >
          <FilterDrawer />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: "0.5rem",
          gridTemplateColumns: "repeat(2, 1fr)",
          px: "1rem",
        }}
      >
        {allResults.map((product, index) => {
          const isLastProduct = allResults.length === index + 1;

          return (
            <div
              key={product._id}
              ref={isLastProduct ? lastProductElementRef : null}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <ProductCard product={product} />
                {isLastProduct && <div ref={lastProductElementRef} />}
              </Box>
            </div>
          );
        })}
      </Box>

      {isFetching ? <ProgressLoading /> : null}
    </main>
  );
};

export default SearchResult;

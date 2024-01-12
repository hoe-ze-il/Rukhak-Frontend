import { useGetAllProductsQuery } from "@/features/api/getProductsSlice";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { CategoriesContext } from "@/contexts/user/CategoryContext";
import ProductListSkeleton from "@/components/skeleton/ProductListSkeleton";
import ProductCard from "@/components/user/ProductCard";
import Box from "@mui/material/Box";
import ProgressLoading from "@/components/user/ProgressLoading";
import NotFound from "../NotFound/NotFound";

function ProductList() {
  const [page, setPage] = useState(1);
  const { categoryData } = useContext(CategoriesContext);
  const [query, setQuery] = useState("all");
  const [categories, setCategories] = useState("");
  const [hasData, setHasData] = useState(false);
  const [count, setCount] = useState(0);
  const { data, isLoading, isError, isFetching } = useGetAllProductsQuery(
    {
      query,
      page,
      categories,
    },
    { skip: hasData }
  );
  const [allProducts, setAllProducts] = useState([]);

  const uniqueData = useMemo(() => data?.data || [], [data?.data]);
  const totalResults = data?.metadata?.totalResults || 0;

  useEffect(() => {
    if (count > totalResults) {
      setHasData(true);
    }
  }, [count, totalResults]);

  useEffect(() => {
    const selectedCategory = categoryData.find((d) => d.selected === true);

    if (selectedCategory) {
      const q = selectedCategory.label.toLowerCase();
      setPage(1);
      setAllProducts([]);
      setCount(0);
      setHasData(false);

      if (selectedCategory?.type === "special") {
        setQuery(q);
      } else {
        setQuery("");
        setCategories(q);
      }
    }
  }, [categoryData]);

  useEffect(() => {
    if (uniqueData) {
      setAllProducts((prevProducts) => {
        const uniqueIds = new Set(prevProducts.map((product) => product._id));
        const filteredNewProducts = uniqueData.filter(
          (product) => !uniqueIds.has(product._id)
        );
        return [...prevProducts, ...filteredNewProducts];
      });
      setCount((prevCount) => prevCount + uniqueData.length);
    }
  }, [uniqueData]);

  const observer = useRef();

  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoading || !uniqueData || uniqueData.length === 0) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, uniqueData, setPage]
  );

  if (isLoading) {
    return <ProductListSkeleton numberOfCards={8} />;
  }

  if (isError || !data) {
    return <NotFound message={"Data"} btnName={"Home"} toPage={"/"} />;
  }

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gap: "0.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          px: "1rem",
        }}
      >
        {allProducts.map((product, index) => {
          const isLastProduct = allProducts.length === index + 1;

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
                {/* Check if it's the last product, then handle pagination */}
                {isLastProduct && <div ref={lastProductElementRef} />}
              </Box>
            </div>
          );
        })}
      </Box>

      {isFetching ? <ProgressLoading /> : null}
    </>
  );
}

export default ProductList;

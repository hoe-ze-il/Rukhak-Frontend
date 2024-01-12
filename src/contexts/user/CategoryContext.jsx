import { useGetCategoryQuery } from "@/features/api/getProductsSlice";
import { createContext, useEffect, useState } from "react";

const CategoriesContext = createContext();

const initialCategories = [
  {
    label: "All",
    selected: true,
    type: "special",
  },
  {
    label: "Top",
    selected: false,
    type: "special",
  },
  {
    label: "Hot",
    selected: false,
    type: "special",
  },
];

function CategoriesContextProvider({ children }) {
  const { data: category } = useGetCategoryQuery();
  const [categoryData, setCategoryData] = useState(initialCategories);

  useEffect(() => {
    if (category) {
      const updatedCategories = category.map((cat) => ({
        label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
        selected: false,
        type: "normal",
      }));

      const mergedCategories = [...initialCategories, ...updatedCategories];
      setCategoryData(mergedCategories);
    }
  }, [category]);

  const handleClick = (clickedChip) => () => {
    const updatedCategories = categoryData.map((cat) => ({
      ...cat,
      selected: cat.label === clickedChip.label,
    }));
    setCategoryData(updatedCategories);
  };

  return (
    <CategoriesContext.Provider value={{ categoryData, handleClick }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesContextProvider, CategoriesContext };

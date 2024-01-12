import { useEffect, useContext } from "react";
import { CategoriesContext } from "@/contexts/user/CategoryContext";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

const CategoriesSlider = ({ categories }) => {
  const { categoryData, handleClick } = useContext(CategoriesContext);
  const navigate = useNavigate();

  useEffect(() => {
    categoryData.map((data) => (data.selected = false));
  }, [categoryData]);

  const handleSelectCategory = (categories) => {
    handleClick((categories.selected = true));
    navigate("/store");
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          gap: "0.5rem",

          overflowX: "auto",
        }}
        component="div"
        className="hide-scrollbar"
      >
        {categories.slice(1).map((el, index) => (
          <Box key={index} onClick={() => handleSelectCategory(el)}>
            <Chip
              label={el.label}
              sx={{
                borderRadius: "0.5rem",
                backgroundColor: "grey.300",
                cursor: "pointer",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoriesSlider;

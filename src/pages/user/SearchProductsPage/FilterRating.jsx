import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

const ratings = [
  { value: "3.5", label: "3.5\u2197" },
  { value: "4.0", label: "4.0\u2197" },
  { value: "4.5", label: "4.5\u2197" },
];

const FilterRating = ({ setChooseRate }) => {
  const [selectedRating, setSelectedRating] = useState("");

  const handleRatingChange = (event) => {
    const value = event.target.value;
    // Toggle selection: If the clicked rating is already selected, deselect it
    setSelectedRating((prevSelected) => (prevSelected === value ? "" : value));
  };

  useEffect(() => {
    setChooseRate(selectedRating);
  }, [selectedRating, setChooseRate]);

  return (
    <FormControl
      sx={{ p: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
    >
      <Box sx={{ alignSelf: "start" }}>
        <FormLabel id="product-rating">Average Rating</FormLabel>
      </Box>
      <FormGroup row aria-labelledby="product-rating" name="position">
        {ratings.map((rating, index) => (
          <FormControlLabel
            key={index}
            value={rating.value}
            control={
              <Checkbox
                checked={selectedRating === rating.value}
                onChange={handleRatingChange}
              />
            }
            label={rating.label}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default FilterRating;

import { useState, useContext } from "react";
import { Stack, Typography, Slider, TextField } from "@mui/material";
import { FilterContext } from "@/contexts/admin/FilterContext";

export default function PriceRange() {
  const { minNum, setMinNum, maxNum, setMaxNum } = useContext(FilterContext);

  const minmin = 0;
  const maxmax = 100;
  const [priceRangeValue, setPriceRangeValue] = useState([0, 100]);

  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };

  return (
    <>
      <Slider
        sx={{ width: "100%" }}
        getAriaLabel={() => "Price range"}
        value={[minNum, maxNum]}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={minmin}
        max={maxmax}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={"0.5rem"}
      >
        <TextField
          label={maxNum > minNum ? "Min Price $" : "Max Price $"}
          type="number"
          variant="standard"
          size="small"
          value={minNum}
          onChange={(e) => {
            setMinNum(Number(e.target.value));
            setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
          }}
        />
        <Typography>—</Typography>
        <TextField
          label={maxNum < minNum ? "Min Price $" : "Max Price $"}
          type="number"
          variant="standard"
          size="small"
          value={maxNum}
          onChange={(e) => {
            setMaxNum(Number(e.target.value));
            setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
          }}
        />
      </Stack>
    </>
  );
}

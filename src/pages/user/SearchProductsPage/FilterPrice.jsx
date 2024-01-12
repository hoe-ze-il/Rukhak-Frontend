import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const FilterPrice = ({ minmin, setMinmin, maxmax, setMaxmax }) => {
  const handleMinChange = (e) => {
    const inputValue = e.target.value;
    setMinmin(inputValue === 0 ? "" : inputValue);
  };

  const handleMaxChange = (e) => {
    const inputValue = e.target.value;
    setMaxmax(inputValue === 0 ? "" : inputValue);
  };

  return (
    <FormControl
      sx={{ p: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
    >
      <Box sx={{ alignSelf: "start" }}>
        <FormLabel id="product-price">Price</FormLabel>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={"0.5rem"}
        maxWidth={"480px"}
      >
        <Typography>From</Typography>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Min</InputLabel>
          <OutlinedInput
            type="number"
            inputMode="numeric"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Min"
            value={minmin}
            onChange={handleMinChange}
          />
        </FormControl>

        <Typography>to</Typography>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Max</InputLabel>
          <OutlinedInput
            type="number"
            inputMode="numeric"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Max"
            value={maxmax}
            onChange={handleMaxChange}
          />
        </FormControl>
      </Stack>
    </FormControl>
  );
};

export default FilterPrice;

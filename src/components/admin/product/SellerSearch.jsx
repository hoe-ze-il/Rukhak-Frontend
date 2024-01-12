import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  selectAllSeller,
  useGetSellerQuery,
} from "@/features/admin/sellerSlice";
import { shallowEqual, useSelector } from "react-redux";
import { useDebounce } from "@/hooks/admin/useDebounce";

function SellerSearch({
  attemptedSubmit,
  validSellerId,
  setValidSellerId,
  sellerId,
  setSellerId,
  validateField,
}) {
  const [sellerName, setSellerName] = useState("");
  const debouncedSellerName = useDebounce(sellerName, 500);
  console.log(sellerId);

  const { isSuccess } = useGetSellerQuery(
    { q: debouncedSellerName, sellerStatus: "active" },
    { skip: !debouncedSellerName || debouncedSellerName.length < 3 }
  );

  const sellerList = useSelector(
    (state) =>
      selectAllSeller(state, "", {
        q: debouncedSellerName,
        sellerStatus: "active",
      }),
    shallowEqual
  );

  const highlightMatch = (text, query) => {
    const words = query.split(/\s+/)?.filter(Boolean);
    let highlightedText = text;

    words.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      highlightedText = highlightedText.replace(regex, "<strong>$1</strong>");
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  useEffect(() => {
    validateField(sellerId, setValidSellerId);
  }, [sellerId]);

  return (
    <Autocomplete
      options={sellerList ?? []}
      getOptionLabel={(option) => option.storeAndSellerName || ""}
      freeSolo
      style={{ width: "100%" }}
      renderOption={(props, option) => (
        <li {...props}>
          {highlightMatch(option.storeAndSellerName, sellerName)}
        </li>
      )}
      filterOptions={(options) => options}
      onChange={(event, option) => setSellerId(option?._id)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder="Enter Seller ID *"
          onChange={(event) => {
            setSellerName(event.target.value);
          }}
          // onBlur={() => setSellerId("")}
          error={attemptedSubmit && !validSellerId}
          helperText={
            attemptedSubmit && !validSellerId ? "Seller ID is required" : ""
          }
        />
      )}
    />
  );
}

export default SellerSearch;

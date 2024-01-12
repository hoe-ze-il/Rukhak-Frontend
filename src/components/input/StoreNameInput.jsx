import TextField from "@mui/material/TextField";
import useAuth from "@/hooks/auth/useAuth";

function StoreNameInput({ errApi }) {
  const { storeName, setStoreName, storeNameFocus, setStoreNameFocus } =
    useAuth();
  return (
    <TextField
      fullWidth
      type="text"
      id="store-name"
      name="store-name"
      label="Store Name"
      onChange={(e) => setStoreName(e.target.value)}
      value={storeName}
      onBlur={() => setStoreNameFocus(false)}
      error={
        !storeName && !storeNameFocus
          ? true
          : errApi?.path === "storeName"
          ? true
          : false
      }
      helperText={
        (!storeName && !storeNameFocus && "Enter a store name.") ||
        (errApi?.path === "storeName" && errApi?.msg)
      }
      required
    />
  );
}

export default StoreNameInput;

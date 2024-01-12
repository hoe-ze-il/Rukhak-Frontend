import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import useAuth from "@/hooks/auth/useAuth";
import { useEffect } from "react";

dayjs.extend(localizedFormat);

function DateInput({ errApi }) {
  const {
    dateValue,
    setDateValue,
    dateValueFocus,
    setDateValueFocus,
    isDateValue,
    setIsDateValue,
  } = useAuth();
  const handleSetDateValue = (newValue) => {
    setDateValue(`${newValue?.$y}-${newValue?.$M + 1}-${newValue?.$D}`);
  };
  useEffect(() => {
    const year = Number(dateValue.split("-")[0]);
    const currentYear = new Date().getFullYear();
    if (currentYear - year < 18 || !dateValue) {
      setIsDateValue(false);
    } else {
      setIsDateValue(true);
    }
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date of Birth"
        value={dayjs(dateValue)}
        onChange={handleSetDateValue}
        slotProps={{
          textField: {
            required: true,
            variant: "outlined",
            error:
              !dateValueFocus && !dateValue
                ? true
                : dateValue && !isDateValue
                ? true
                : errApi?.path === "dateOfBirth"
                ? true
                : false,
            onBlur() {
              setDateValueFocus(false);
            },
            helperText:
              (dateValue && !isDateValue && "You must be over 18.") ||
              (errApi?.path === "dateOfBirth" && errApi?.msg),
          },
        }}
        sx={{ width: "100%" }}
      />
    </LocalizationProvider>
  );
}

export default DateInput;

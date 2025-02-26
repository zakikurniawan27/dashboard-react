import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const DatepickerContent = ({ selectedDate, handleDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        slotProps={{
          TextField: {
            variant: "standard",
            id: "mui-pickers-date",
            label: "Date picker",
            size: "small"
          }
        }}
        format="yyyy-MM-dd"
        sx={{ width: "100%" }}
      />
    </LocalizationProvider>
  );
};

export default DatepickerContent;

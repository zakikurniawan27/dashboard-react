import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const SelectContent = ({ option, title, handleChange, selectedOption }) => {
  return (
    <FormControl fullWidth size="small">
      <Select displayEmpty id="demo-simple-select" value={selectedOption} onChange={handleChange}>
        <MenuItem value="" selected disabled hidden>
          {title}
        </MenuItem>
        {option?.map((item, index) => (
          <MenuItem key={index} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectContent;

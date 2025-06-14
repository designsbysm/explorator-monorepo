import {
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";

const FilterSelect = ({ defaultValue = [], label, onChange, options }) => {
  const [selectedValues, setSelectedValues] = useState(defaultValue);

  useEffect(() => {
    setSelectedValues(defaultValue);
  }, [defaultValue]);

  const handleChange = (newValue) => {
    setSelectedValues(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        endAdornment={
          selectedValues.length > 0 && (
            <InputAdornment position="end" sx={{ marginRight: "30px" }}>
              <IconButton onClick={() => handleChange([])} edge="end">
                <CancelIcon />
              </IconButton>
            </InputAdornment>
          )
        }
        multiple
        onChange={(e) => {
          const {
            target: { value },
          } = e;

          handleChange(typeof value === "string" ? value.split(",") : value);
        }}
        renderValue={(s) => s.sort().join(", ")}
        value={selectedValues}
      >
        {options.map((value) => (
          <MenuItem key={value} value={value}>
            <Checkbox checked={selectedValues.includes(value)} />
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;

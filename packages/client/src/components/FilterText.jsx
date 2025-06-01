import CancelIcon from "@mui/icons-material/Cancel";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const FilterText = ({ defaultValue = "", label, onChange }) => {
  const [value, setValue] = useState(defaultValue);

  const hanldeChange = (newValue) => {
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FormControl sx={{ mb: 2, width: "100%" }} variant="filled">
      <InputLabel>{label}</InputLabel>
      <FilledInput
        endAdornment={
          value && (
            <InputAdornment position="end">
              <IconButton onClick={() => hanldeChange("")} edge="end">
                <CancelIcon />
              </IconButton>
            </InputAdornment>
          )
        }
        onChange={(e) => {
          hanldeChange(e.target.value);
        }}
        value={value}
      />
    </FormControl>
  );
};

export default FilterText;

import CancelIcon from "@mui/icons-material/Cancel";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

const FilterText = ({ defaultValue = "", label, onChange }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const hanldeChange = (newValue) => {
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
      <InputLabel>{label}</InputLabel>
      <Input
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

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function BasicSelect(props) {
  const { title, options, value, onChange } = props;

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <Box sx={{ minWidth: "30vw" }}>
      <FormControl fullWidth>
        <InputLabel id="input-label" style={{ color: "black" }}>
          {title}
        </InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={value}
          label={title}
          onChange={handleChange}
          sx={{
            "& .MuiSelect-icon": {
              color: "#ee78a2", // Customize select icon color
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#ee78a2",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ee78a2",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "purple",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

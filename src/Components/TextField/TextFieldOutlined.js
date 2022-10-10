import { TextField } from "@mui/material";
import React from "react";

function TextFieldOutlined({label, value, onChange, type}) {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      fullWidth
      sx={{m:1}}
      onChange={onChange}
      type={type}
      required
    />
  );
}

export default TextFieldOutlined;
